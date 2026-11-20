import assert from 'node:assert/strict';
import { readFileSync, existsSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import worker from '../worker/index.js';
import { negotiate } from '../worker/content.js';
import { pageToMarkdown, writeAgentContent } from '../lib/agent-content.js';

const index = JSON.parse(readFileSync('_site/content-index.json', 'utf8'));
const read = path => readFileSync(`_site${path}`, 'utf8');
const htmlPath = url => `${new URL(url).pathname}index.html`;

function assets() {
  const requests = [];
  return {
    requests,
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

test('404 recovery negotiates Markdown and structured JSON without inventing an API', async () => {
  const env = assets();
  const md = await worker.fetch(request('/missing-agent-test', 'text/markdown'), env);
  assert.equal(md.status, 404);
  assert.match(await md.text(), /# 404 Not Found[\s\S]*sitemap\.xml[\s\S]*No API access/);
  for (const type of ['application/json', 'application/problem+json']) {
    const response = await worker.fetch(request('/api/missing', type), env);
    assert.equal(response.status, 404);
    assert.equal(response.headers.get('Content-Type'), type);
    const problem = await response.json();
    assert.equal(problem.type, 'about:blank');
    assert.equal(problem.status, 404);
    assert.equal(problem.code, 'NOT_FOUND');
    assert.match(problem.detail, /No API access/);
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
  assert.match((await response.json()).detail, /No API access/);
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
  assert.match(llms, /No API access/);
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
    assert.equal(inventory.apiAvailable, false);
    assert.deepEqual(inventory.pages, [{ title: 'Home', url: 'https://shrinath.me/', markdown: 'https://shrinath.me/index.md' }]);
    assert.match(readFileSync(join(output, 'index.md'), 'utf8'), /Published content/);
    assert.equal(existsSync(join(output, '404.html.md')), false);
    assert.equal(existsSync(join(output, 'retired.md')), false);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});

test('no-API specification and trust pages accurately describe this personal site', () => {
  const spec = JSON.parse(read('/openapi.json'));
  assert.equal(spec.openapi, '3.1.1');
  assert.deepEqual(spec.paths, {});
  assert.equal(spec['x-api-available'], false);
  assert.match(spec.info.description, /No API access/);
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
