import Negotiator from 'negotiator';
import contentIndex from '../_site/content-index.json' with { type: 'json' };

const HTML = 'text/html; charset=utf-8';
const MARKDOWN = 'text/markdown; charset=utf-8';
export const pages = new Map(contentIndex.pages.map(page => [new URL(page.url).pathname, page]));
const markdownPages = new Map(contentIndex.pages.map(page => [new URL(page.markdown).pathname, page]));
const recovery = {
  guide: 'https://shrinath.me/agents/',
  llms: 'https://shrinath.me/llms.txt',
  sitemap: 'https://shrinath.me/sitemap.xml',
  blog: 'https://shrinath.me/blog/',
};
const errors = {
  404: { title: 'Not Found', code: 'NOT_FOUND', detail: 'This resource does not exist. Use the site guide to find a published URL.' },
  405: { title: 'Method Not Allowed', code: 'METHOD_NOT_ALLOWED', detail: 'Use GET or HEAD to read public content.' },
  406: { title: 'Not Acceptable', code: 'NOT_ACCEPTABLE', detail: 'Request text/html or text/markdown to read this page.' },
  429: { title: 'Too Many Requests', code: 'RATE_LIMITED', detail: 'The shared public API request limit has been reached.' },
  503: { title: 'Service Unavailable', code: 'REPRESENTATION_UNAVAILABLE', detail: 'The requested content is temporarily unavailable.' },
};

export function negotiate(accept, types = [HTML, MARKDOWN]) {
  const headers = accept === null ? {} : { accept };
  return new Negotiator({ headers }).mediaType(types);
}

function varyAccept(headers) {
  const vary = (headers.get('Vary') || '').split(',').map(value => value.trim()).filter(Boolean);
  if (!vary.some(value => ['accept', '*'].includes(value.toLowerCase()))) vary.push('Accept');
  headers.set('Vary', vary.join(', '));
}

function representationHeaders(source, page, type) {
  const headers = new Headers(source);
  varyAccept(headers);
  headers.set('Content-Type', type);
  headers.set('X-Content-Type-Options', 'nosniff');
  // The asset binding caches the two physical files separately. Do not allow
  // an outer CDN rule that ignores Accept to cache a negotiated URL as one body.
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  headers.set('CDN-Cache-Control', 'no-store');
  headers.set('Cloudflare-CDN-Cache-Control', 'no-store');
  headers.set('Link', `<${page.url}>; rel="canonical", <${page.markdown}>; rel="alternate"; type="text/markdown", <https://shrinath.me/llms.txt>; rel="describedby"`);
  return headers;
}

export function errorResponse(request, status, original, details = {}) {
  const url = new URL(request.url);
  const { title, code } = errors[status];
  const detail = details.detail ?? errors[status].detail;
  const isApi = /^\/api(?:\/|$)/.test(url.pathname);
  const type = isApi ? 'application/problem+json'
    : negotiate(request.headers.get('Accept'), [HTML, MARKDOWN, 'application/problem+json', 'application/json']) || 'application/problem+json';
  const headers = new Headers(original?.headers);
  varyAccept(headers);
  headers.set('Content-Type', type);
  headers.set('Cache-Control', 'no-store');
  headers.set('CDN-Cache-Control', 'no-store');
  headers.set('Cloudflare-CDN-Cache-Control', 'no-store');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Robots-Tag', 'noindex');
  headers.set('Link', '<https://shrinath.me/llms.txt>; rel="describedby", <https://shrinath.me/agents/>; rel="help"');
  for (const name of ['Content-Length', 'Content-Encoding', 'ETag', 'Last-Modified', 'Location']) headers.delete(name);
  if (status === 405) headers.set('Allow', 'GET, HEAD');
  let body;
  if (type === HTML && original) body = original.body;
  else if (type === HTML) body = `<!doctype html><html lang="en"><meta charset="utf-8"><title>${status} ${title}</title><h1>${status} ${title}</h1><p>${detail}</p><p><a href="/agents/">Site access guide</a> · <a href="/sitemap.xml">Sitemap</a> · <a href="/llms.txt">llms.txt</a></p></html>`;
  else if (type === MARKDOWN) body = `# ${status} ${title}\n\n${detail}\n\n- [Site access guide](${recovery.guide})\n- [Agent index](${recovery.llms})\n- [Sitemap](${recovery.sitemap})\n- [Blog](${recovery.blog})\n`;
  else body = JSON.stringify({
    type: 'about:blank', title, status, detail, instance: url.pathname,
    code,
    resolution: details.resolution ?? 'Consult the agent guide for supported URLs, methods, and response formats.',
    links: recovery,
  });
  return new Response(request.method === 'HEAD' ? null : body, { status, headers });
}

export async function serveContent(request, env) {
  if (!['GET', 'HEAD'].includes(request.method)) return errorResponse(request, 405);
  const url = new URL(request.url);
  const directMarkdown = markdownPages.get(url.pathname);
  const page = pages.get(url.pathname) || directMarkdown;
  if (page) {
    const assetUrl = new URL(request.url);
    let type;
    if (url.pathname === '/' && url.searchParams.get('mode') === 'agent') {
      type = 'application/json; charset=utf-8';
      assetUrl.pathname = '/agent-home.json';
      assetUrl.search = '';
    } else {
      type = negotiate(request.headers.get('Accept'), directMarkdown ? [MARKDOWN] : [HTML, MARKDOWN]);
      if (!type) return errorResponse(request, 406);
      assetUrl.pathname = new URL(type === MARKDOWN ? page.markdown : page.url).pathname;
    }
    const headers = new Headers(request.headers);
    headers.set('Accept', type);
    const asset = await env.ASSETS.fetch(new Request(assetUrl, { method: request.method, headers }));
    if (asset.status === 404) return errorResponse(request, 503);
    if (![200, 206, 304].includes(asset.status)) return asset;
    return new Response(request.method === 'HEAD' || asset.status === 304 ? null : asset.body, {
      status: asset.status,
      headers: representationHeaders(asset.headers, page, type),
    });
  }
  // auto-trailing-slash serves 404.html at /404 with status 200 and redirects
  // /404.html to it. Keep all forms an actual error, with the full recovery UI.
  const errorPage = ['/404', '/404/', '/404.html'].includes(url.pathname);
  let assetRequest = request;
  if (errorPage) {
    url.pathname = '/404';
    const headers = new Headers(request.headers);
    for (const name of ['If-None-Match', 'If-Modified-Since', 'Range']) headers.delete(name);
    assetRequest = new Request(url, { method: request.method, headers });
  }
  const response = await env.ASSETS.fetch(assetRequest);
  if (response.status === 404 || errorPage) return errorResponse(request, 404, response);
  return response;
}
