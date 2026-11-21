import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRss from "@11ty/eleventy-plugin-rss";
import mila from "markdown-it-link-attributes";
import { markdownPath, writeAgentContent } from "./lib/agent-content.js";
import { blogSummaries, publicProfile } from "./lib/api-data.js";
import {
  readFileSync,
  existsSync,
  mkdirSync,
  copyFileSync,
} from "fs";
import { join, basename, extname } from "path";
import { createHash } from "crypto";
import { execFileSync } from "child_process";

// Last time a source file changed, for sitemap <lastmod> on pages that have
// no hand-written dateModified. Uncommitted edits count as today; a file git
// does not know (or no git at all) gives no date, so no lastmod is emitted.
const editDateCache = new Map();
function lastEdited(inputPath) {
  if (!inputPath) return undefined;
  if (editDateCache.has(inputPath)) return editDateCache.get(inputPath);
  let date;
  try {
    const run = (args) =>
      execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (run(["status", "--porcelain", "--", inputPath])) date = new Date();
    else {
      const committed = run(["log", "-1", "--format=%cI", "--", inputPath]);
      if (committed) date = new Date(committed);
    }
  } catch {}
  editDateCache.set(inputPath, date);
  return date;
}

// Build cache for generated WebP variants.
const CACHE_DIR = ".cache";

function fileHash(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex").slice(0, 10);
}

// ── Responsive WebP variants for raster images ──
// Sources stay as PNG/JPG in src/images (still used for Open Graph).
// Variants are content-hashed, so the immutable cache header is safe.
const IMG_DIR = "img";
// High enough that cover text and soft gradients stay crisp (no banding).
const WEBP_QUALITY = 88;
const variantCache = new Map();

async function imageVariants(src, widths) {
  const key = `${src}:${widths.join(",")}`;
  if (variantCache.has(key)) return variantCache.get(key);

  const full = join("src", src);
  const sharp = (await import("sharp")).default;
  const meta = await sharp(full).metadata();
  const hash = fileHash(full);
  const name = basename(src, extname(src));
  const usable = widths.filter((w) => w <= meta.width);
  // A requested width larger than the source falls back to the source's own
  // width, so high-density screens still get the sharpest version available.
  if (usable.length < widths.length && !usable.includes(meta.width)) {
    usable.push(meta.width);
  }

  const variants = [];
  for (const w of usable) {
    const file = `${name}-${hash}-${w}-q${WEBP_QUALITY}.webp`;
    const cached = join(CACHE_DIR, IMG_DIR, file);
    if (!existsSync(cached)) {
      mkdirSync(join(CACHE_DIR, IMG_DIR), { recursive: true });
      await sharp(full)
        .resize(w, null, { kernel: "lanczos3" })
        .webp({ quality: WEBP_QUALITY, smartSubsample: true, effort: 6 })
        .toFile(cached);
    }
    mkdirSync(join("_site", IMG_DIR), { recursive: true });
    copyFileSync(cached, join("_site", IMG_DIR, file));
    variants.push({
      url: `/${IMG_DIR}/${file}`,
      width: w,
      height: Math.round((meta.height * w) / meta.width),
    });
  }
  variantCache.set(key, variants);
  return variants;
}

const IMG_PRESETS = {
  card: { widths: [480, 960], sizes: "(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 360px" },
  cover: { widths: [720, 1440], sizes: "(max-width: 720px) 100vw, 672px" },
};

function escapeAttr(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

export default function (eleventyConfig) {
  eleventyConfig.addFilter("markdownPath", markdownPath);
  eleventyConfig.addFilter("blogSummaries", blogSummaries);
  eleventyConfig.addFilter("publicProfile", publicProfile);
  eleventyConfig.on("eleventy.after", writeAgentContent);
  // ── Plugins ──
  eleventyConfig.addPlugin(syntaxHighlight, {
    init: function ({ Prism }) {
      // Register Vue SFC as markup so ```vue code fences get syntax highlighting.
      // Vue SFCs are HTML with embedded JS (<script>) and CSS (<style>),
      // which Prism's markup grammar already handles.
      Object.defineProperty(Prism.languages, "vue", {
        get() {
          return Prism.languages.markup;
        },
        configurable: true,
      });
    },
  });
  eleventyConfig.addPlugin(pluginRss);

  // Blur placeholders (LQIP) are made by `npm run images` and read from
  // src/_data/blogImages.json; see scripts/blog-images.js.

  // ── Responsive image shortcode ──
  // {% img "/images/foo.png", "Alt text", "card" | "cover", eager %}
  eleventyConfig.addAsyncShortcode(
    "img",
    async function (src, alt, preset = "card", eager = false) {
      if (!src) return "";
      const { widths, sizes } = IMG_PRESETS[preset] || IMG_PRESETS.card;
      try {
        const variants = await imageVariants(src, widths);
        const fallback = variants[0];
        const srcset = variants.map((v) => `${v.url} ${v.width}w`).join(", ");
        const priority = eager
          ? 'loading="eager" fetchpriority="high"'
          : 'loading="lazy"';
        return `<img src="${fallback.url}" srcset="${srcset}" sizes="${sizes}" width="${fallback.width}" height="${fallback.height}" alt="${escapeAttr(alt)}" ${priority} decoding="async" />`;
      } catch {
        return `<img src="${src}" alt="${escapeAttr(alt)}" loading="lazy" decoding="async" />`;
      }
    },
  );

  // ── Passthrough copy ──
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/blog.css");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  // Fontsource self-hosted font: only the two files the CSS references
  for (const style of ["normal", "italic"]) {
    const file = `dm-sans-latin-wght-${style}.woff2`;
    eleventyConfig.addPassthroughCopy({
      [`node_modules/@fontsource-variable/dm-sans/files/${file}`]: `fonts/dm-sans/${file}`,
    });
  }
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/humans.json");
  eleventyConfig.addPassthroughCopy("src/openapi.json");
  eleventyConfig.addPassthroughCopy("src/agent-home.json");
  eleventyConfig.addPassthroughCopy({ "src/.well-known": ".well-known" });
  eleventyConfig.addPassthroughCopy({
    "src/.well-known/security.txt": "security.txt",
  });
  eleventyConfig.addPassthroughCopy("src/_headers");
  eleventyConfig.addPassthroughCopy(
    "src/resume/SHRINATH_PRABHU_RESUME.pdf",
  );
  eleventyConfig.addPassthroughCopy("src/blog/**/*.png");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.gif");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.webp");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/audio");
  eleventyConfig.addPassthroughCopy("src/js");
  // ── Collections ──
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/**/*.md")
      .filter((post) => !post.data.draft)
      .sort((a, b) => {
        const dateA = a.data.dateModified || a.date;
        const dateB = b.data.dateModified || b.date;
        return dateB - dateA;
      })
      .sort((a, b) => {
        const aFeatured = a.data.featured === true;
        const bFeatured = b.data.featured === true;

        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;
        return 0;
      });
  });

  // ── Filters ──
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    if (dateObj === "now") {
      return new Date().toISOString();
    }
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array)) return array;
    return array.slice(0, n);
  });

  eleventyConfig.addFilter("articleOutline", (html) => {
    const headings = [];
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
    const content = html.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi, (heading, attributes = "", body) => {
      const label = body.replace(/<[^>]+>/g, "").trim();
      if (!label) return heading;
      let id = attributes.match(/\sid="([^"]+)"/)?.[1];
      if (!id) {
        const slug = label.toLowerCase().replace(/&[a-z0-9#]+;/gi, " ")
          .replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || "section";
        const base = `section-${slug}`;
        id = base;
        for (let suffix = 2; ids.has(id); suffix++) id = `${base}-${suffix}`;
        ids.add(id);
        heading = `<h2${attributes} id="${id}" tabindex="-1">${body}</h2>`;
      }
      headings.push({ id, label });
      return heading;
    });
    return { content, headings };
  });

  // Cache-buster for files under src/ (/*.js is cached as immutable)
  eleventyConfig.addFilter("rev", (path) => fileHash(join("src", path)));

  // JSON.stringify that is also safe inside a <script> block
  eleventyConfig.addFilter("dump", (obj) => {
    return JSON.stringify(obj ?? null).replace(/</g, "\\u003c");
  });

  // YYYY-MM-DD, for sitemap <lastmod>
  eleventyConfig.addFilter("lastEdited", lastEdited);

  // Newest edit across posts, for the feed's own <updated>
  eleventyConfig.addFilter("newestEdit", (posts) =>
    posts.reduce((newest, post) => {
      const d = new Date(post.data.dateModified || post.date);
      return d > newest ? d : newest;
    }, new Date(0))
  );

  eleventyConfig.addFilter("ymd", (dateObj) => {
    return new Date(dateObj).toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    if (!content) return "1 min read";
    // Strip HTML tags and code blocks, then count words
    const text = content
      .replace(/<[^>]*>/g, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`]*`/g, "")
      .trim();
    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  });

  // ── Shortcodes ──
  // Inline a stylesheet from src/, minified. Comments and layout whitespace
  // are dropped; selectors and values are left untouched.
  eleventyConfig.addShortcode("inlineCss", function (file) {
    return readFileSync(join("src", file), "utf-8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{};,])\s*/g, "$1")
      .replace(/;}/g, "}")
      .trim();
  });

  eleventyConfig.addPairedShortcode(
    "callout",
    function (content, type = "info") {
      return `<div class="callout callout--${type}">
      <div class="callout__content">${content}</div>
    </div>`;
    },
  );

  eleventyConfig.addShortcode("youtube", function (id) {
    return `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:20px 0;border-radius:var(--radius);">
      <iframe src="https://www.youtube-nocookie.com/embed/${id}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen loading="lazy"></iframe>
    </div>`;
  });

  // ── Transforms ──
  eleventyConfig.addTransform("codeFilename", function (content) {
    if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) {
      return content;
    }
    // Detect <p><strong>filename.ext</strong></p> followed by <pre> and wrap
    // them in a titled code block. Requires a dot in the name to avoid
    // matching regular bold text that happens to precede a code block.
    return content.replace(
      /<p><strong>([^<]+\.[a-zA-Z]+)<\/strong><\/p>\s*(<pre\s[^>]*>[\s\S]*?<\/pre>)/g,
      '<div class="code-titled"><div class="code-titled__name">$1</div>$2</div>',
    );
  });

  // ── Markdown config ──
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.set({ html: true, linkify: true, typographer: true });
    mdLib.use(mila, {
      attrs: {
        target: "_blank",
        rel: "noopener",
      },
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
