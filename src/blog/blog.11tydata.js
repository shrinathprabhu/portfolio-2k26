import { existsSync } from "node:fs";
import { join } from "node:path";

const imageExists = (path) => Boolean(path) && existsSync(join("src", path));

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
    // Covers live at /images/blog/<slug>.png. Until that file is added, fall
    // back to the post's previous cover (imageFallback) or to no cover at all.
    image: (data) => {
      if (imageExists(data.image)) return data.image;
      if (imageExists(data.imageFallback)) return data.imageFallback;
      return undefined;
    },
    ogImage: (data) => {
      if (data.image) {
        return `https://shrinath.me${data.image}`;
      }
      return undefined; // falls back to global meta.jpg
    },
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
