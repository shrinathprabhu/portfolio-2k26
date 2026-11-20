import assert from 'node:assert/strict';
import { checkCrawlerAccess } from './check-crawler-access.js';

// Run against Wrangler for release checks, or the public origin after deployment.
const base = new URL(process.argv[2] || 'http://127.0.0.1:8787');
let requests = 0;
async function get(path, accept = '*/*', options = {}) {
  requests++;
  return fetch(new URL(path, base), {
    redirect: 'manual', signal: AbortSignal.timeout(15000), ...options,
    headers: { Accept: accept, ...options.headers },
  });
}
function check(response, status, type) {
  assert.equal(response.status, status, `${response.url}: status`);
  if (type) assert.ok(response.headers.get('Content-Type')?.startsWith(type), `${response.url}: ${response.headers.get('Content-Type')}`);
}
function negotiated(response) {
  assert.match(response.headers.get('Vary') || '', /(?:^|,)\s*Accept\s*(?:,|$)/i);
  assert.equal(response.headers.get('CDN-Cache-Control'), 'no-store');
  assert.match(response.headers.get('Link') || '', /rel="describedby"/);
}

const crawlerFailures = await checkCrawlerAccess(get);
if (crawlerFailures.length) {
  process.exitCode = 1;
  console.error(crawlerFailures.join('\n'));
}
const inventory = await get('/content-index.json');
check(inventory, 200, 'application/json');
const index = await inventory.json();
assert.equal(index.apiAvailable, true);
assert.ok(index.pages.length > 0);
const canonicalUrls = new Set(index.pages.map(page => page.url));
for (const page of index.pages) {
  const path = new URL(page.url).pathname;
  for (const [target, accept, type] of [
    [path, 'text/html', 'text/html'],
    [path, 'text/markdown', 'text/markdown'],
    [new URL(page.markdown).pathname, '*/*', 'text/markdown'],
  ]) {
    const response = await get(target, accept);
    check(response, 200, type);
    negotiated(response);
    const body = await response.text();
    assert.ok(body.includes(page.url), `${target}: missing canonical source`);
    if (type === 'text/markdown') assert.doesNotMatch(body, /<!doctype|<script/i);
    else {
      if (path === '/') assert.match(body, /<a href="\/docs"[^>]*>Agent docs<\/a>/);
      for (const jsonLd of body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(jsonLd[1]);
      assert.ok(body.includes(`href="${new URL(page.markdown).pathname}"`));
    }
  }
  const head = await get(path, 'text/markdown', { method: 'HEAD' });
  check(head, 200, 'text/markdown');
  negotiated(head);
  assert.equal(await head.text(), '');
}

const files = new Map();
const catalogPath = '/.well-known/api-catalog';
const profile = 'application/linkset+json;profile="https://www.rfc-editor.org/info/rfc9727"';
for (const [path, type] of [
  ['/robots.txt', 'text/plain'], ['/llms.txt', 'text/plain'],
  ['/.well-known/security.txt', 'text/plain'], ['/sitemap.xml', 'application/xml'],
  ['/feed.xml', 'application/xml'], ['/openapi.json', 'application/json'],
  [catalogPath, profile], ['/auth.md', 'text/markdown'],
  ['/humans.json', 'application/json'], ['/audio/intro.json', 'application/json'],
]) {
  const response = await get(path);
  check(response, 200, type);
  const body = await response.text();
  if (type === 'application/json') JSON.parse(body);
  files.set(path, body);
}
const catalogHead = await get(catalogPath, profile, { method: 'HEAD' });
check(catalogHead, 200, profile);
assert.ok(catalogHead.headers.get('Link')?.includes(`<${catalogPath}>; rel="api-catalog"`));
assert.equal(await catalogHead.text(), '');
const catalog = JSON.parse(files.get(catalogPath));
const collection = catalog.linkset.find(entry => entry.anchor === index.site + catalogPath);
assert.ok(collection.item.some(link => link.href === index.site + '/openapi.json'));
assert.ok(collection.item.some(link => link.href === index.site + '/?mode=agent'));
const website = catalog.linkset.find(entry => entry.anchor === index.site + '/');
assert.ok(website?.['service-desc'].some(link => link.href === new URL('/openapi.json', index.site).href));
assert.ok(website?.['service-doc'].some(link => link.href === new URL('/agents/', index.site).href));
assert.match(files.get('/auth.md'), /^# .*auth\.md\b/im);
const agent = await get('/?mode=agent', 'text/html');
check(agent, 200, 'application/json');
const view = await agent.json();
assert.deepEqual(view.api.endpoints, ['/api/blogs', '/api/blog/{slug}', '/api/me']);
assert.equal(view.authentication.required, false);
for (const capability of view.capabilities) {
  const target = new URL(capability.url);
  assert.equal(target.origin, index.site);
  check(await get(target.pathname, capability.type, { method: 'HEAD' }), 200, capability.type);
}
const spec = JSON.parse(files.get('/openapi.json'));
assert.equal(spec.openapi, '3.1.1');
assert.deepEqual(Object.keys(spec.paths), view.api.endpoints);
assert.equal(spec.components.responses.PageError.content['application/problem+json'].schema.$ref, '#/components/schemas/Problem');
assert.deepEqual(spec.components.schemas.Problem.properties.status.enum, [404, 405, 406, 429, 503]);
assert.equal(spec['x-api-available'], true);
const list = await get('/api/blogs');
check(list, 200, 'application/json');
assert.match(list.headers.get('Cache-Control'), /max-age=86400\b/);
assert.equal(list.headers.get('RateLimit-Policy'), '"public-api";q=12;w=60');
const blogs = await list.json();
assert.deepEqual(new Set(blogs.map(post => post.url)), new Set([...canonicalUrls].filter(url => /\/blog\/[^/]+\/$/.test(url))));
const article = await get(new URL(blogs[0].apiUrl).pathname);
check(article, 200, 'text/markdown');
assert.match(article.headers.get('Cache-Control'), /max-age=604800\b/);
assert.ok((await article.text()).includes(blogs[0].url));
const me = await get('/api/me');
check(me, 200, 'application/json');
assert.equal((await me.json()).name, 'Shrinath Prabhu');
const sitemapUrls = [...files.get('/sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.deepEqual(new Set(sitemapUrls), canonicalUrls);
for (const page of index.pages) assert.ok(files.get('/llms.txt').includes(page.markdown), page.markdown);
for (const match of files.get('/feed.xml').matchAll(/<entry>[\s\S]*?<id>(.*?)<\/id>/g)) assert.ok(canonicalUrls.has(match[1]), match[1]);

for (const [accept, type] of [
  ['*/*', 'text/html'], ['text/markdown;q=0.2,text/html;q=0.9', 'text/html'],
  ['text/html;q=0.2,text/markdown;q=0.9', 'text/markdown'],
  ['text/markdown;q=0,*/*;q=1', 'text/html'], ['text/html;q=0,*/*;q=1', 'text/markdown'],
]) {
  const response = await get('/', accept);
  check(response, 200, type);
  negotiated(response);
  await response.text();
}
for (const path of ['/agent-check-missing', '/404.html', '/404', '/404/']) {
  for (const type of ['text/html', 'text/markdown', 'application/problem+json', 'application/json']) {
    const response = await get(path, type);
    check(response, 404, type);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    if (type.includes('json')) {
      const problem = await response.json();
      assert.equal(problem.status, 404);
      assert.equal(problem.code, 'NOT_FOUND');
      assert.ok(problem.links.sitemap);
    } else assert.match(await response.text(), /sitemap\.xml/, `${path}: recovery links`);
  }
}
const apiProbe = await get('/api/agent-check-missing');
check(apiProbe, 404, 'application/problem+json');
assert.equal((await apiProbe.json()).code, 'NOT_FOUND');
for (const accept of ['image/png', 'text/html;q=0,text/markdown;q=0']) {
  const response = await get('/', accept);
  check(response, 406, 'application/problem+json');
  assert.equal((await response.json()).status, 406);
}
const write = await get('/', 'application/json', { method: 'POST' });
check(write, 405, 'application/json');
assert.equal(write.headers.get('Allow'), 'GET, HEAD');
assert.equal((await write.json()).code, 'METHOD_NOT_ALLOWED');

const md = await get('/', 'text/markdown');
const etag = md.headers.get('ETag');
assert.ok(etag);
await md.text();
const cached = await get('/', 'text/markdown', { headers: { 'If-None-Match': etag } });
check(cached, 304, 'text/markdown');
negotiated(cached);
assert.equal(await cached.text(), '');
const html = await get('/', 'text/html', { headers: { 'If-None-Match': etag } });
check(html, 200, 'text/html');
assert.notEqual(html.headers.get('ETag'), etag);
await html.text();
for (const [from, to] of [['/docs', '/agents/'], ['/security.txt', '/.well-known/security.txt'], ['/work', '/work/'], ['/work/index.html', '/work/']]) {
  const response = await get(from);
  assert.ok([301, 307, 308].includes(response.status), `${from}: redirect (${response.status})`);
  assert.equal(new URL(response.headers.get('Location'), base).pathname, to);
}
console.log(`Verified ${index.pages.length} public pages in HTML and Markdown, HEAD, discovery/data files, JSON-LD, errors, redirects, and caching. ${requests} requests to ${base.origin}, including 8 crawler-name probes. ${crawlerFailures.length} failed.`);
