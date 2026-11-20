import { errorResponse, negotiate, pages } from './content.js';

const policy = '"public-api";q=12;w=60';

function apiError(request, status, detail, resolution) {
  const response = errorResponse(request, status, undefined, { detail, resolution });
  response.headers.set('RateLimit-Policy', policy);
  if (status === 429 || status === 503) response.headers.set('Retry-After', '60');
  return response;
}

export async function serveApi(request, env, url) {
  try {
    // Cloudflare supplies this header at the edge. Clients behind one IP share an allowance.
    const key = 'portfolio-api:' + (request.headers.get('CF-Connecting-IP') || 'unknown');
    const { success } = await env.PORTFOLIO_API_LIMIT.limit({ key });
    if (!success) return apiError(request, 429, undefined, 'Wait 60 seconds before retrying.');
  } catch {
    return apiError(request, 503, 'API rate limiting is temporarily unavailable.', 'Retry after 60 seconds.');
  }
  if (!['GET', 'HEAD'].includes(request.method)) return apiError(request, 405);

  const path = url.pathname.replace(/\/$/, '');
  let assetPath = path + '.json';
  let type = 'application/json';
  if (path !== '/api/blogs' && path !== '/api/me') {
    const match = /^\/api\/blog\/([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(path);
    const post = match && pages.get(`/blog/${match[1]}/`);
    if (!post) return apiError(request, 404, 'Unknown API route or blog slug.', 'Read /api/blogs and follow an apiUrl from the list.');
    assetPath = new URL(post.markdown).pathname;
    type = 'text/markdown';
  }
  const contentType = type + '; charset=utf-8';
  if (!negotiate(request.headers.get('Accept'), [contentType])) {
    return apiError(request, 406, `This resource is served as ${type}.`, `Send Accept: ${type} or omit the header.`);
  }
  const headers = new Headers({ Accept: contentType });
  const validator = request.headers.get('If-None-Match');
  if (validator) headers.set('If-None-Match', validator);
  try {
    const asset = await env.ASSETS.fetch(new Request(new URL(assetPath, url), { method: request.method, headers }));
    if (![200, 304].includes(asset.status)) return apiError(request, 503);
    const response = new Response(request.method === 'HEAD' ? null : asset.body, asset);
    response.headers.set('Content-Type', contentType);
    response.headers.set('Vary', 'Accept, Accept-Encoding');
    const maxAge = type === 'text/markdown' ? 604800 : 86400;
    response.headers.set('Cache-Control', `private, max-age=${maxAge}, stale-while-revalidate=86400, stale-if-error=604800`);
    response.headers.set('CDN-Cache-Control', 'no-store');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'no-store');
    response.headers.set('RateLimit-Policy', policy);
    response.headers.set('Link', '<https://shrinath.me/openapi.json>; rel="service-desc", <https://shrinath.me/agents/>; rel="service-doc"');
    return response;
  } catch {
    return apiError(request, 503);
  }
}
