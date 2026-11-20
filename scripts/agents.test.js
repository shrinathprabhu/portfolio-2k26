import assert from 'node:assert/strict';
import { readFileSync, existsSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import worker from '../worker/index.js';
import { negotiate } from '../worker/content.js';
import { checkCrawlerAccess } from './check-crawler-access.js';
import { pageToMarkdown, writeAgentContent } from '../lib/agent-content.js';

const index = JSON.parse(readFileSync('_site/content-index.json', 'utf8'));
const read = path => readFileSync(`_site${path}`, 'utf8');
const htmlPath = url => `${new URL(url).pathname}index.html`;

function assets() {
  const requests = [];
  return {
    requests,
    PORTFOLIO_API_LIMIT: { limit: async () => ({ success: true }) },
    ASSETS: { async fetch(request) {
      requests.push(request);
      const path = new URL(request.url).pathname;
      const file = path === '/404' ? '_site/404.html' : `_site${path.endsWith('/') ? `${path}index.html` : path}`;
      const found = existsSync(file);
      const body = found ? readFileSync(file) : readFileSync('_site/404.html');
      const etag = `"${createHash('sha256').update(body).digest('hex')}"`;
      const type = path.endsWith('.md') ? 'text/markdown' : path.endsWith('.json') ? 'application/json' : path.endsWith('.css') ? 'text/css' : 'text/html';
      const headers = { 'Content-Type': type, 'Vary': 'Accept-Encoding', ETag: etag };
      if (found && request.headers.get('If-None-Match') === etag) return new Response(null, { status: 304, headers });
      return new Response(request.method === 'HEAD' ? null : body, { status: found ? 200 : 404, headers });
    } },
  };
}
const request = (path, accept, options = {}) => new Request(`https://shrinath.me${path}`, {
  ...options, headers: { ...(accept === undefined ? {} : { Accept: accept }), ...options.headers },
});

test('crawler checks distinguish edge denials, challenge pages and incorrect negotiation', async () => {
  const env = assets();
  const visited = [];
  const failures = await checkCrawlerAccess(async (path, accept, { headers }) => {
    const name = headers['User-Agent'];
    visited.push([name, accept]);
    if (name === 'PerplexityBot') return new Response('Denied', { status: 403, headers: { 'cf-ray': 'example-ray' } });
    if (name === 'Claude-User' && accept === 'text/html') return new Response('', { headers: { 'cf-mitigated': 'challenge' } });
    const response = await worker.fetch(request(path, accept, { headers }), env);
    if (name === 'OAI-SearchBot' && accept === 'text/markdown') response.headers.set('Vary', 'Accept-Encoding');
    return response;
  });
  assert.equal(new Set(visited.map(pair => pair.join(' '))).size, 8);
  assert.equal(failures.length, 4);
  assert.ok(failures.some(message => message.includes('OAI-SearchBot') && message.includes('missing Vary: Accept')));
  assert.ok(failures.some(message => message.includes('Claude-User') && message.includes('Cloudflare challenge')));
  assert.equal(failures.filter(message => message.includes('PerplexityBot') && message.includes('HTTP 403') && message.includes('example-ray')).length, 2);
});

test('Accept negotiation honors quality, specificity, exclusions, wildcards, and charset', () => {
  const cases = [
    [null, 'text/html'], ['*/*', 'text/html'], ['text/*', 'text/html'], ['', undefined],
    ['text/markdown', 'text/markdown'], ['text/html', 'text/html'],
    ['text/markdown;q=0.4,text/html;q=0.9', 'text/html'],
    ['text/html;q=0.4,text/markdown;q=0.9', 'text/markdown'],
    ['text/markdown;q=0,*/*;q=1', 'text/html'],
    ['text/html;q=0,*/*;q=1', 'text/markdown'],
    ['text/*;q=0.9,text/html;q=0.1', 'text/markdown'],
    ['text/html;q=0,text/markdown;q=0', undefined],
    ['application/json', undefined], ['image/png', undefined],
    ['TEXT/MARKDOWN; charset=UTF-8', 'text/markdown'],
    ['text/markdown; charset=iso-8859-1', undefined],
    ['text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,*/*;q=0.8', 'text/html'],
  ];
  for (const [accept, expected] of cases) assert.equal(negotiate(accept)?.split(';')[0], expected, String(accept));
});

test('all indexed pages serve HTML, negotiated Markdown, and explicit Markdown', async () => {
  const env = assets();
  for (const page of index.pages) {
    const path = new URL(page.url).pathname;
    for (const [target, accept, contentType] of [[path, 'text/html', 'text/html'], [path, 'text/markdown', 'text/markdown'], [new URL(page.markdown).pathname, '*/*', 'text/markdown']]) {
      const response = await worker.fetch(request(target, accept), env);
      assert.equal(response.status, 200, target);
      assert.ok(response.headers.get('Content-Type').startsWith(contentType), target);
      assert.match(response.headers.get('Vary'), /Accept-Encoding, Accept/i);
      assert.equal(response.headers.get('CDN-Cache-Control'), 'no-store');
      assert.match(response.headers.get('Link'), /rel="canonical"/);
      assert.match(response.headers.get('Link'), /rel="describedby"/);
      const body = await response.text();
      assert.ok(body.includes(page.url), target);
      if (contentType === 'text/markdown') assert.doesNotMatch(body, /<script|<style|class="theme-selector"/i);
    }
  }
});

test('negotiated variants keep separate validators, HEAD metadata, and 304 bodies', async () => {
  const env = assets();
  const html = await worker.fetch(request('/', 'text/html'), env);
  const md = await worker.fetch(request('/', 'text/markdown'), env);
  assert.notEqual(html.headers.get('ETag'), md.headers.get('ETag'));
  const head = await worker.fetch(request('/', 'text/markdown', { method: 'HEAD' }), env);
  assert.equal(await head.text(), '');
  assert.equal(head.headers.get('Content-Type'), md.headers.get('Content-Type'));
  const notModified = await worker.fetch(request('/', 'text/markdown', { headers: { 'If-None-Match': md.headers.get('ETag') } }), env);
  assert.equal(notModified.status, 304);
  assert.equal(await notModified.text(), '');
  assert.match(notModified.headers.get('Vary'), /Accept/);
  const other = await worker.fetch(request('/', 'text/html', { headers: { 'If-None-Match': md.headers.get('ETag') } }), env);
  assert.equal(other.status, 200);
});

test('only the homepage agent query selects JSON, including for browser navigation', async () => {
  const env = assets();
  const agentUrl = '/?utm_source=test&mode=agent';
  const agent = await worker.fetch(request(agentUrl, 'text/html'), env);
  assert.equal(agent.status, 200);
  assert.match(agent.headers.get('Content-Type'), /^application\/json\b/);
  const view = await agent.json();
  assert.deepEqual(view.api.endpoints, Object.keys(JSON.parse(read('/openapi.json')).paths));
  assert.equal(view.api.available, index.apiAvailable);
  assert.equal(view.authentication.required, false);
  assert.equal(view.authentication.documentation, index.site + '/auth.md');
  assert.deepEqual(view.methods, ['GET', 'HEAD']);
  assert.ok(view.capabilities.length > 0);
  for (const capability of view.capabilities) {
    const url = new URL(capability.url);
    assert.equal(url.origin, index.site);
    const target = await worker.fetch(request(url.pathname, capability.type, { method: 'HEAD' }), env);
    assert.equal(target.status, 200, capability.url);
  }
  const head = await worker.fetch(request(agentUrl, '*/*', { method: 'HEAD' }), env);
  assert.equal(head.headers.get('ETag'), agent.headers.get('ETag'));
  assert.equal(await head.text(), '');
  const headers = { 'If-None-Match': agent.headers.get('ETag') };
  const cached = await worker.fetch(request(agentUrl, 'application/json', { headers }), env);
  assert.equal(cached.status, 304);
  for (const path of ['/', '/?mode=reader', '/blog/?mode=agent']) {
    const html = await worker.fetch(request(path, 'text/html', { headers }), env);
    assert.equal(html.status, 200);
    assert.match(html.headers.get('Content-Type'), /^text\/html\b/);
  }
  const write = await worker.fetch(request(agentUrl, 'application/json', { method: 'POST' }), env);
  assert.equal(write.status, 405);
});

test('unknown API paths return problem details for all media preferences', async () => {
  const env = assets();
  for (const path of ['/api', '/api/', '/api/nonexistent']) {
    for (const accept of [undefined, '*/*', 'text/html']) {
      const response = await worker.fetch(request(path, accept), env);
      assert.equal(response.status, 404);
      assert.equal(response.headers.get('Content-Type'), 'application/problem+json');
      assert.equal((await response.json()).code, 'NOT_FOUND');
    }
  }
  const ordinary = await worker.fetch(request('/missing', '*/*'), env);
  assert.equal(ordinary.headers.get('Content-Type'), 'text/html; charset=utf-8');
});

test('agents can follow every published blog summary to Markdown and validate the API contracts', async () => {
  const env = assets();
  const spec = JSON.parse(read('/openapi.json'));
  const ajv = new Ajv2020();
  addFormats(ajv);
  const validateBlog = ajv.compile(spec.components.schemas.BlogSummary);
  const validateProfile = ajv.compile(spec.components.schemas.Profile);
  const ids = new Set();
  for (const path of Object.values(spec.paths)) {
    for (const op of [path.get, path.head]) {
      assert.ok(op.operationId && op.description);
      assert.ok(!ids.has(op.operationId));
      ids.add(op.operationId);
    }
  }
  const list = await worker.fetch(request('/api/blogs', '*/*'), env);
  const blogs = await list.json();
  const expected = index.pages.filter(page => /^\/blog\/[^/]+\/$/.test(new URL(page.url).pathname));
  assert.equal(blogs.length, expected.length);
  assert.deepEqual(new Set(blogs.map(post => post.url)), new Set(expected.map(page => page.url)));
  assert.deepEqual(blogs.map(post => post.postedAt), blogs.map(post => post.postedAt).sort().reverse());
  assert.match(list.headers.get('Cache-Control'), /private, max-age=86400\b/);
  assert.equal(list.headers.get('RateLimit-Policy'), '"public-api";q=12;w=60');
  for (const post of blogs) {
    assert.ok(validateBlog(post), JSON.stringify(validateBlog.errors));
    assert.ok(existsSync('_site' + new URL(post.imageUrl).pathname));
    const path = new URL(post.apiUrl).pathname;
    assert.equal(path, '/api/blog/' + post.slug);
    const article = await worker.fetch(request(path, 'text/markdown'), env);
    assert.equal(article.status, 200);
    assert.match(article.headers.get('Content-Type'), /^text\/markdown/);
    assert.match(article.headers.get('Cache-Control'), /private, max-age=604800\b/);
    assert.equal(await article.text(), read(new URL(post.url).pathname + 'index.md'));
  }
  const me = await worker.fetch(request('/api/me', 'application/json'), env);
  const profile = await me.json();
  assert.ok(validateProfile(profile), JSON.stringify(validateProfile.errors));
  assert.equal(profile.name, 'Shrinath Prabhu');
  for (const path of ['/api/blogs', new URL(blogs[0].apiUrl).pathname, '/api/me']) {
    const head = await worker.fetch(request(path, '*/*', { method: 'HEAD' }), env);
    assert.equal(await head.text(), '');
    assert.ok(head.headers.get('ETag'));
    const cached = await worker.fetch(request(path, '*/*', { headers: { 'If-None-Match': head.headers.get('ETag') } }), env);
    assert.equal(cached.status, 304);
    assert.equal(cached.headers.get('Cache-Control'), head.headers.get('Cache-Control'));
  }
});

test('API routes share one client quota and fail closed with documented problem details', async () => {
  const env = assets();
  const keys = [];
  env.PORTFOLIO_API_LIMIT.limit = async ({ key }) => {
    keys.push(key);
    return { success: keys.length <= 3 };
  };
  const options = { headers: { 'CF-Connecting-IP': '192.0.2.1' } };
  const spec = JSON.parse(read('/openapi.json'));
  const ajv = new Ajv2020();
  addFormats(ajv);
  const validate = ajv.compile(spec.components.schemas.Problem);
  for (const [path, accept, method, status, code] of [
    ['/api/blog/missing', '*/*', 'GET', 404, 'NOT_FOUND'],
    ['/api/blogs', 'text/html', 'GET', 406, 'NOT_ACCEPTABLE'],
    ['/api/me', '*/*', 'PUT', 405, 'METHOD_NOT_ALLOWED'],
    ['/api/me', '*/*', 'GET', 429, 'RATE_LIMITED'],
    ['/api/blogs', '*/*', 'GET', 503, 'REPRESENTATION_UNAVAILABLE'],
  ]) {
    if (status === 503) env.PORTFOLIO_API_LIMIT.limit = async () => { throw new Error('binding unavailable'); };
    const res = await worker.fetch(request(path, accept, { ...options, method }), env);
    assert.equal(res.status, status);
    assert.equal(res.headers.get('Content-Type'), 'application/problem+json');
    assert.equal(res.headers.get('Cache-Control'), 'no-store');
    if (status === 429 || status === 503) assert.equal(res.headers.get('Retry-After'), '60');
    if (status === 405) assert.equal(res.headers.get('Allow'), 'GET, HEAD');
    const problem = await res.json();
    assert.equal(problem.code, code);
    assert.ok(validate(problem), JSON.stringify(validate.errors));
  }
  assert.deepEqual(keys, Array(4).fill('portfolio-api:192.0.2.1'));
  const html = await worker.fetch(request('/blog/', 'text/html'), env);
  assert.equal(html.status, 200);
});

test('404 page recovery negotiates Markdown and structured JSON', async () => {
  const env = assets();
  const md = await worker.fetch(request('/missing-agent-test', 'text/markdown'), env);
  assert.equal(md.status, 404);
  assert.match(await md.text(), /# 404 Not Found[\s\S]*sitemap\.xml/);
  for (const type of ['application/json', 'application/problem+json']) {
    const response = await worker.fetch(request('/missing', type), env);
    assert.equal(response.status, 404);
    assert.equal(response.headers.get('Content-Type'), type);
    const problem = await response.json();
    assert.equal(problem.type, 'about:blank');
    assert.equal(problem.status, 404);
    assert.equal(problem.code, 'NOT_FOUND');
    assert.match(problem.detail, /does not exist/);
    assert.equal(problem.links.sitemap, 'https://shrinath.me/sitemap.xml');
  }
  const html = await worker.fetch(request('/missing', 'text/html'), env);
  assert.equal(html.status, 404);
  assert.match(await html.text(), /id="game"/);
  const head = await worker.fetch(request('/missing', 'text/markdown', { method: 'HEAD' }), env);
  assert.equal(head.status, 404);
  assert.equal(await head.text(), '');
});

test('explicit 404 page aliases retain the recovery UI and never return 200 or 304', async () => {
  const env = assets();
  for (const path of ['/404', '/404/', '/404.html']) {
    const response = await worker.fetch(request(path, 'text/html', { headers: { 'If-None-Match': '*', Range: 'bytes=0-10' } }), env);
    assert.equal(response.status, 404);
    const body = await response.text();
    assert.match(body, /id="game"/);
    assert.match(body, /sitemap\.xml/);
    assert.equal(response.headers.get('Location'), null);
    assert.equal(env.requests.at(-1).headers.get('If-None-Match'), null);
    assert.equal(env.requests.at(-1).headers.get('Range'), null);
  }
});

test('unsupported formats and methods are explicit, uncacheable errors', async () => {
  const env = assets();
  for (const accept of ['image/png', 'text/html;q=0,text/markdown;q=0', 'application/json']) {
    const response = await worker.fetch(request('/', accept), env);
    assert.equal(response.status, 406);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.match(response.headers.get('Vary'), /Accept/);
    assert.equal((await response.json()).status, 406);
  }
  const response = await worker.fetch(request('/work/', 'application/json', { method: 'POST' }), env);
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('Allow'), 'GET, HEAD');
  assert.match((await response.json()).detail, /GET or HEAD/);
});

test('missing built representations fail honestly rather than sending HTML as Markdown', async () => {
  const response = await worker.fetch(request('/', 'text/markdown'), { ASSETS: { fetch: async () => new Response('missing', { status: 404 }) } });
  assert.equal(response.status, 503);
  assert.match(await response.text(), /temporarily unavailable/);
});

test('canonical host, retired paths, security alias, and docs alias preserve redirects', async () => {
  const env = assets();
  const www = await worker.fetch(new Request('https://www.shrinath.me/work/?source=test', { method: 'POST' }), env);
  assert.equal(www.status, 308);
  assert.equal(www.headers.get('Location'), 'https://shrinath.me/work/?source=test');
  for (const [from, to] of [['/security.txt', '/.well-known/security.txt'], ['/docs/', '/agents/'], ['/blog/vite-seo-without-nextjs', '/blog/aeo-geo-ai-discoverability/']]) {
    const response = await worker.fetch(request(from, 'text/markdown'), env);
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get('Location')).pathname, to);
  }
  const css = await worker.fetch(request('/styles.css', '*/*'), env);
  assert.equal(css.headers.get('Content-Type'), 'text/css');
});

test('Markdown keeps code, tables, transcript, FAQ content, and absolute links', () => {
  const html = '<title>Test &amp; guide</title><main><nav>Skip me</nav><h1>Article</h1><details><summary>Transcript</summary><p>Spoken words</p></details><p><a href="../work/#wallet">Wallet</a></p><pre><code class="language-js">const x = 1;</code></pre><table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody><tr><td>A</td><td>B</td></tr></tbody></table><section><h2>FAQ</h2><p>An answer.</p></section><script>secret()</script><button>Copy</button><svg><title>Decoration</title></svg></main>';
  const result = pageToMarkdown(html, '/about/');
  assert.equal(result.title, 'Test & guide');
  assert.match(result.content, /https:\/\/shrinath.me\/work\/#wallet/);
  assert.match(result.content, /```js\nconst x = 1;\n```/);
  assert.match(result.content, /\| Name \| Value \|/);
  assert.match(result.content, /Spoken words[\s\S]*## FAQ[\s\S]*An answer/);
  assert.doesNotMatch(result.content, /Skip me|secret\(\)|Decoration|Copy/);
  assert.match(read('/index.md'), /65K\+ accounts/);
});

test('discovery inventory, sitemap, alternate links, and llms lists agree', () => {
  const sitemap = [...read('/sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]).sort();
  assert.deepEqual(index.pages.map(page => page.url).sort(), sitemap);
  for (const path of ['/', '/agents/', '/about/', '/privacy/', '/blog/', '/work/', '/resume/', '/contact/', '/uses/']) {
    assert.ok(index.pages.some(page => page.url === `https://shrinath.me${path}`), path);
  }
  assert.ok(!index.pages.some(page => /404|draft/.test(page.url)));
  const llms = read('/llms.txt');
  assert.match(llms, /## When to use this site/);
  assert.ok(llms.includes('https://shrinath.me/api/blogs'));
  for (const page of index.pages) {
    const html = read(htmlPath(page.url));
    assert.ok(html.includes(`href="${new URL(page.markdown).pathname}"`));
    assert.ok(llms.includes(page.markdown), page.url);
  }
  const feed = read('/feed.xml');
  assert.doesNotMatch(feed, /https:\/\/shrinath.me\/\/blog/);
  assert.match(feed, /<id>https:\/\/shrinath.me\/blog\//);
});

test('content generation excludes noindex pages and removes obsolete Markdown from its index', () => {
  const output = mkdtempSync(join(tmpdir(), 'portfolio-content-'));
  try {
    writeFileSync(join(output, 'index.html'), '<title>Home</title><main><h1>Home</h1><p>Published content.</p></main>');
    writeFileSync(join(output, '404.html'), '<meta name="robots" content="noindex, nofollow"><title>Error</title><main>Missing.</main>');
    writeFileSync(join(output, 'retired.md'), 'Old content');
    writeFileSync(join(output, 'content-index.json'), JSON.stringify({ pages: [{ markdown: 'https://shrinath.me/retired.md' }] }));
    writeAgentContent({ dir: { output }, results: [
      { outputPath: join(output, 'index.html'), url: '/' },
      { outputPath: join(output, '404.html'), url: '/404.html' },
      { outputPath: join(output, 'feed.xml'), url: '/feed.xml' },
    ] });
    const inventory = JSON.parse(readFileSync(join(output, 'content-index.json'), 'utf8'));
    assert.equal(inventory.apiAvailable, true);
    assert.deepEqual(inventory.pages, [{ title: 'Home', url: 'https://shrinath.me/', markdown: 'https://shrinath.me/index.md' }]);
    assert.match(readFileSync(join(output, 'index.md'), 'utf8'), /Published content/);
    assert.equal(existsSync(join(output, '404.html.md')), false);
    assert.equal(existsSync(join(output, 'retired.md')), false);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});

test('REST specification and trust pages accurately describe this personal site', () => {
  const spec = JSON.parse(read('/openapi.json'));
  assert.equal(spec.openapi, '3.1.1');
  assert.deepEqual(Object.keys(spec.paths), ['/api/blogs', '/api/blog/{slug}', '/api/me']);
  assert.equal(spec['x-api-available'], true);
  for (const path of ['/about/', '/privacy/', '/contact/']) {
    assert.ok(read(`${path}index.md`).length > 500, path);
    assert.ok(read('/index.html').includes(`href="${path}"`), path);
  }
  const person = JSON.parse(read('/index.html').match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]).find(entry => entry['@type'] === 'Person');
  assert.equal(person.address.addressLocality, 'Mumbai');
  assert.equal(person.contactPoint[0].email, 'hello@shrinath.me');
  const privacy = read('/privacy/index.md');
  assert.match(privacy, /Cloudflare Web Analytics/);
  assert.match(privacy, /portfolio-theme/);
  assert.match(privacy, /portfolio-motion/);
});

test('the catalog and auth.md lead agents to the published site and its access instructions', async () => {
  const env = assets();
  const catalogPath = '/.well-known/api-catalog';
  const catalog = await worker.fetch(request(catalogPath, 'application/linkset+json'), env);
  assert.equal(catalog.status, 200);
  const { linkset } = await catalog.json();
  const portfolio = linkset.find(entry => entry.anchor === index.site + '/');
  const collection = linkset.find(entry => entry.anchor === index.site + catalogPath);
  assert.deepEqual(collection.item.map(link => link.href), [
    'https://shrinath.me/api/blogs', 'https://shrinath.me/openapi.json', 'https://shrinath.me/?mode=agent',
  ]);
  const spec = JSON.parse(read('/openapi.json'));
  assert.equal(portfolio['service-desc'][0].href, 'https://shrinath.me/openapi.json');
  assert.equal(portfolio['service-doc'][0].href, spec.externalDocs.url);
  assert.ok(spec.paths['/api/blogs'].get);
  assert.ok(read('/index.html').includes(`rel="api-catalog" type="application/linkset+json" href="${catalogPath}"`));
  const auth = await worker.fetch(request('/auth.md', 'text/markdown'), env);
  assert.equal(auth.status, 200);
  const guide = await auth.text();
  assert.match(guide, /^# auth\.md\s/m);
  assert.match(guide, /without signing in/);
  for (const target of ['/auth.md', catalogPath]) {
    assert.ok(read('/agents/index.md').includes(index.site + target));
    assert.ok(read('/llms.txt').includes(index.site + target));
  }
});

test('the homepage links to the same agent guide in HTML, Markdown, and the OpenAPI document', async () => {
  const env = assets();
  const homepage = await worker.fetch(request('/', 'text/html'), env);
  const docsHref = (await homepage.text()).match(/<a href="([^"]+)"[^>]*>Agent docs<\/a>/)?.[1];
  assert.equal(docsHref, '/docs');
  const alias = await worker.fetch(request(docsHref, 'text/html'), env);
  assert.equal(alias.status, 308);
  const canonical = new URL(alias.headers.get('Location'));
  assert.equal(canonical.href, JSON.parse(read('/openapi.json')).externalDocs.url);
  const guide = await worker.fetch(request(canonical.pathname, 'text/html'), env);
  assert.equal(guide.status, 200);
  assert.match(await guide.text(), /<h1>Agent guide to Shrinath Prabhu’s portfolio<\/h1>/);
  const mdUrl = new URL('index.md', canonical);
  assert.ok(read('/index.md').includes(`[Agent docs](${mdUrl.href})`));
  assert.ok(read('/llms.txt').includes(mdUrl.href));
  assert.match(read(mdUrl.pathname), /apiUrl/);
});

test('the published Problem schema validates the Worker’s four JSON error responses', async () => {
  const spec = JSON.parse(read('/openapi.json'));
  const validator = new Ajv2020();
  addFormats(validator);
  const validate = validator.compile(spec.components.schemas.Problem);
  const content = spec.components.responses.PageError.content;
  const env = assets();
  const missingAsset = { ASSETS: { fetch: async () => new Response(null, { status: 404 }) } };
  for (const mime of ['application/problem+json', 'application/json']) {
    assert.equal(content[mime].schema.$ref, '#/components/schemas/Problem');
    for (const [req, status, code, assetEnv] of [
      [request('/missing', mime), 404, 'NOT_FOUND', env],
      [request('/work/', mime, { method: 'POST' }), 405, 'METHOD_NOT_ALLOWED', env],
      [request('/work/', mime), 406, 'NOT_ACCEPTABLE', env],
      // Accept the HTML page but prefer JSON if fetching its asset fails.
      [request('/work/', `${mime},text/html;q=0.5`), 503, 'REPRESENTATION_UNAVAILABLE', missingAsset],
    ]) {
      const response = await worker.fetch(req, assetEnv);
      assert.equal(response.status, status);
      assert.equal(response.headers.get('Content-Type'), mime);
      const problem = await response.json();
      assert.equal(problem.code, code);
      assert.equal(problem.status, status);
      assert.ok(validate(problem), JSON.stringify(validate.errors));
    }
  }
});
