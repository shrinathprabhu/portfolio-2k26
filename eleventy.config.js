import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRss from "@11ty/eleventy-plugin-rss";
import mila from "markdown-it-link-attributes";
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from "fs";
import { join } from "path";

// ── Blur placeholder cache (LQIP) ──
const CACHE_DIR = ".cache";
const CACHE_FILE = join(CACHE_DIR, "blur-placeholders.json");
let placeholderCache = {};

try {
  if (existsSync(CACHE_FILE)) {
    placeholderCache = JSON.parse(readFileSync(CACHE_FILE, "utf-8"));
  }
} catch {
  placeholderCache = {};
}

function savePlaceholderCache() {
  try {
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(CACHE_FILE, JSON.stringify(placeholderCache));
  } catch {
    // Silent fail — cache is optional
  }
}

export default function (eleventyConfig) {
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

  // ── LQIP: build-time blur placeholders for blog images ──
  eleventyConfig.addAsyncFilter(
    "blurPlaceholder",
    async function (imagePath) {
      if (!imagePath) return "";

      const fullPath = join("src", imagePath);

      try {
        const mtime = statSync(fullPath).mtimeMs.toString();
        const cacheKey = `${imagePath}:${mtime}`;

        if (placeholderCache[cacheKey]) {
          return placeholderCache[cacheKey];
        }

        const sharp = (await import("sharp")).default;
        const buffer = await sharp(fullPath)
          .resize(20) // 20px wide — produces ~300-500 byte JPEG
          .jpeg({ quality: 20 })
          .toBuffer();

        const dataUri = `data:image/jpeg;base64,${buffer.toString("base64")}`;
        placeholderCache[cacheKey] = dataUri;
        return dataUri;
      } catch {
        return "";
      }
    },
  );

  // Save placeholder cache after build completes
  eleventyConfig.on("eleventy.after", () => {
    savePlaceholderCache();
  });

  // ── Passthrough copy ──
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/blog.css");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  // Fontsource self-hosted fonts
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource-variable/outfit/files": "fonts/outfit",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource-variable/dm-sans/files": "fonts/dm-sans",
  });
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/llms.txt");
  eleventyConfig.addPassthroughCopy("src/humans.json");
  eleventyConfig.addPassthroughCopy("src/_headers");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy(
    "src/resume/SHRINATH_PRABHU_UPDATED_RESUME_2026.pdf",
  );
  eleventyConfig.addPassthroughCopy("src/blog/**/*.png");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.gif");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.webp");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy({
    "node_modules/mermaid/dist/mermaid.esm.min.mjs": "js/mermaid.esm.min.mjs",
  });

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

  eleventyConfig.addFilter("dump", (obj) => {
    return JSON.stringify(obj);
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
