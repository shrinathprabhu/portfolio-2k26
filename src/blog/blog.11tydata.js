import { resolveCover } from "../../lib/blog-cover.js";

// Open Graph copies and blur placeholders come from `npm run images`, which
// records them in src/_data/blogImages.json (global data: blogImages).

export default {
  layout: "post.njk",
  tags: ["posts"],
  ogType: "article",
  author: "Shrinath Prabhu",
  authorRole: "Senior Staff Engineer at Avail",
  eleventyComputed: {
    permalink: (data) => {
      if (data.draft) {
        return false;
      }
      return undefined; // use default permalink
    },
    eleventyExcludeFromCollections: (data) => {
      if (data.draft) {
        return true;
      }
      return false;
    },
    // See lib/blog-cover.js for how a post's cover is chosen.
    image: (data) => resolveCover(data.image, data.imageFallback),
    // Social cards use the 1200x630 copy. If `npm run images` has not run for
    // this cover yet, fall back to the master rather than to no image.
    ogImage: (data) => {
      if (!data.image) return undefined; // falls back to global meta.jpg
      const og = data.blogImages?.[data.image]?.og;
      return `https://shrinath.me${og || data.image}`;
    },
    coverPlaceholder: (data) =>
      data.blogImages?.[data.image]?.placeholder || "",
    readingTime: (data) => {
      if (data.readingTime) return data.readingTime; // manual override
      const content = data.page?.rawInput || "";
      const text = content
        .replace(/---[\s\S]*?---/, "") // strip frontmatter
        .replace(/```[\s\S]*?```/g, "") // strip code blocks
        .replace(/`[^`]*`/g, "")
        .replace(/[#*>\-\[\]()!|]/g, "") // strip markdown syntax
        .trim();
      const words = text.split(/\s+/).filter(Boolean).length;
      const minutes = Math.max(1, Math.round(words / 200));
      return `${minutes} min read`;
    },
  },
};
