import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

export const SITE_URL = 'https://shrinath.me';
export const markdownPath = (url) => url.endsWith('/') ? `${url}index.md` : `${url}.md`;

export function pageToMarkdown(html, path) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!main) throw new Error(`Missing main content in ${path}`);
  const canonical = new URL(path, SITE_URL).href;
  const converter = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
  converter.use(gfm);
  const absolute = (value) => new URL(value, canonical).href.replace(/\(/g, '%28').replace(/\)/g, '%29');
  converter.addRule('omitInterface', {
    filter: (node) => ['SCRIPT', 'STYLE', 'SVG', 'BUTTON', 'INPUT', 'CANVAS', 'NAV', 'ASIDE'].includes(node.nodeName.toUpperCase())
      || node.hasAttribute('hidden') || node.getAttribute('aria-hidden') === 'true'
      || node.classList.contains('post-outline') || node.classList.contains('blog-post__cover'),
    replacement: () => '',
  });
  converter.addRule('absoluteLinks', {
    filter: (node) => node.nodeName === 'A' && node.hasAttribute('href'),
    replacement: (content, node) => {
      const href = absolute(node.getAttribute('href'));
      if (!/^(https?:|mailto:)/i.test(href)) return content;
      // Cards contain headings and paragraphs: keep their structure instead of
      // turning an entire multi-paragraph card into one invalid Markdown link.
      if (node.querySelector('h1, h2, h3, p, div')) return `${content}\n\n[Read more](${href})\n\n`;
      return `[${content.trim()}](${href})`;
    },
  });
  converter.addRule('absoluteImages', {
    filter: 'img',
    replacement: (_content, node) => {
      const alt = node.getAttribute('alt');
      return alt ? `![${alt.replace(/[[\]]/g, '\\$&')}](${absolute(node.getAttribute('src'))})` : '';
    },
  });
  converter.addRule('definitionTerms', {
    filter: 'dt',
    replacement: (content) => `\n\n**${content.trim()}**\n`,
  });
  converter.addRule('definitionValues', {
    filter: 'dd',
    replacement: (content) => `\n${content.trim()}\n\n`,
  });
  converter.addRule('namedItems', {
    filter: (node) => node.classList.contains('uses-item__name'),
    replacement: (content) => `**${content}**: `,
  });
  const title = new TurndownService().turndown(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || path);
  const content = converter.turndown(main).trim();
  return { title, content: `Source: [${title}](${canonical})\n\n${content}\n\n---\n\n[Site guide](${SITE_URL}/llms.txt) · [All pages](${SITE_URL}/sitemap.xml)\n` };
}

// Generate both representations from the final HTML so FAQ answers, transcripts,
// dates, and links cannot drift into a separately maintained copy.
export function writeAgentContent({ results, dir }) {
  const output = dir.output;
  const indexFile = join(output, 'content-index.json');
  let previous = [];
  try { previous = JSON.parse(readFileSync(indexFile, 'utf8')).pages; } catch {}
  const pages = [];
  for (const result of results) {
    if (!result.outputPath?.endsWith('.html')) continue;
    const html = readFileSync(result.outputPath, 'utf8');
    if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) continue;
    const { title, content } = pageToMarkdown(html, result.url);
    const markdown = markdownPath(result.url);
    const file = join(output, markdown);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, content);
    pages.push({ title, url: new URL(result.url, SITE_URL).href, markdown: new URL(markdown, SITE_URL).href });
  }
  pages.sort((a, b) => a.url.localeCompare(b.url));
  const current = new Set(pages.map(page => page.markdown));
  for (const page of previous) {
    if (!current.has(page.markdown)) rmSync(join(output, new URL(page.markdown).pathname), { force: true });
  }
  writeFileSync(indexFile, JSON.stringify({ site: SITE_URL, apiAvailable: false, pages }, null, 2) + '\n');
}
