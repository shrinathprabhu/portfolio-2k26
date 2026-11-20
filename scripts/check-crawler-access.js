import assert from 'node:assert/strict';

const crawlerNames = ['ChatGPT-User', 'OAI-SearchBot', 'Claude-User', 'PerplexityBot'];

// Each request uses an ordinary client IP. A 403 here describes this request,
// and does not establish whether the operator's verified crawler is blocked.
export async function checkCrawlerAccess(get) {
  const failures = [];
  for (const name of crawlerNames) {
    for (const type of ['text/html', 'text/markdown']) {
      let response;
      try {
        response = await get('/', type, { headers: { 'User-Agent': name } });
        const body = await response.text();
        if (response.headers.get('cf-mitigated') === 'challenge') throw new Error('Cloudflare challenge page');
        if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
        assert.equal(response.headers.get('Content-Type')?.split(';')[0], type, 'unexpected Content-Type');
        assert.match(response.headers.get('Vary') || '', /(?:^|,)\s*Accept\s*(?:,|$)/i, 'missing Vary: Accept');
        if (type === 'text/markdown') {
          assert.match(body, /^# .+/m, 'missing Markdown heading');
        } else {
          const main = body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
          const visibleText = main.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
            .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          assert.match(main, /<h1\b/i, 'missing homepage heading');
          assert.ok(visibleText.length >= 500, 'less than 500 characters of raw homepage text');
        }
      } catch (error) {
        const ray = response?.headers.get('cf-ray');
        failures.push(`${name} GET / (${type}): ${error.message}${ray ? ` · CF-Ray ${ray}` : ''}`);
      }
    }
  }
  return failures;
}
