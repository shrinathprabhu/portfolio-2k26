export default {
  layout: "post.njk",
  tags: ["posts"],
  ogType: "article",
  author: "Shrinath Prabhu",
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
    ogImage: (data) => {
      if (data.image) {
        return `https://shrinath.me${data.image}`;
      }
      return undefined; // falls back to global meta.jpg
    },
  },
};
