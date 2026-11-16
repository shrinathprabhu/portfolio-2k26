---
title: "Loading Mermaid Only on Pages That Have a Diagram"
description: "Mermaid is a large library and most of my posts have no diagrams. Here is the dynamic import pattern that loads it only when a page needs it, and the self-hosting mistake that silently broke every diagram."
date: 2026-06-03
dateModified: 2026-11-16
postTags: ["posts", "javascript", "performance", "eleventy"]
category: "Performance"
keywords:
  [
    "Mermaid",
    "dynamic import",
    "code splitting",
    "self-hosting",
    "Eleventy",
    "ES modules",
    "lazy loading JavaScript",
  ]
# image: "/images/mermaid-on-demand.png"
---

Three posts on this blog contain a Mermaid diagram. The rest do not. Loading a diagram library on every post to serve three of them is the kind of cost that never shows up in a code review and always shows up in a performance trace.

The fix is a dynamic `import()` behind a DOM check. It takes about ten lines.

## The pattern

Markdown fenced code blocks tagged `mermaid` come out of the build as `<pre><code class="language-mermaid">`. The post script looks for those, and only if it finds one does it import the library:

**src/js/post.js**

```js
const mermaidBlocks = document.querySelectorAll("pre > code.language-mermaid");

if (mermaidBlocks.length > 0) {
  import("/js/mermaid.esm.min.mjs").then(({ default: mermaid }) => {
    mermaid.initialize({ startOnLoad: false, theme: "dark" });

    for (const codeEl of mermaidBlocks) {
      const container = document.createElement("div");
      container.className = "mermaid";
      container.textContent = codeEl.textContent;
      codeEl.parentElement.replaceWith(container);
    }

    mermaid.run({ querySelector: ".mermaid" });
  });
}
```

A few details matter here.

**`textContent`, not `innerHTML`.** The syntax highlighter may wrap parts of the diagram source in `<span>` tags. Reading `textContent` strips them and decodes entities, so Mermaid receives the plain source.

**`startOnLoad: false`.** By the time the module arrives, the page has long finished loading. I call `mermaid.run()` myself after swapping the elements.

**The script tag is `type="module"`.** Module scripts are deferred by default, so the check runs after the document is parsed without a `DOMContentLoaded` listener.

On a post with no diagram, the cost of this feature is one `querySelectorAll` call.

## Why I self-host it

My Content Security Policy only allows scripts from my own origin (`script-src 'self'`), so a CDN import is not an option, and I would not want a third-party request on a blog post anyway. Eleventy copies the file from `node_modules` at build time:

```js
eleventyConfig.addPassthroughCopy({
  "node_modules/mermaid/dist/mermaid.esm.min.mjs": "js/mermaid.esm.min.mjs",
});
```

## The mistake: the ESM build is not one file

That passthrough copy is what I shipped, and it was broken for months.

`mermaid.esm.min.mjs` is an entry point of roughly 27 KB. It imports its shared code and each diagram type from sibling files, using relative paths like `./chunks/mermaid.esm.min/chunk-267PNR3T.mjs`. I copied the entry file and none of the chunks.

The result: the entry file loaded with a 200, every chunk request returned a 404, the dynamic import rejected, and my code had no `.catch()`. The diagram stayed as a plain code block. Nothing looked broken unless you knew a diagram was supposed to be there.

The fix is one more passthrough copy:

```js
eleventyConfig.addPassthroughCopy({
  "node_modules/mermaid/dist/chunks/mermaid.esm.min": "js/chunks/mermaid.esm.min",
});
```

That directory is large on disk, about 15 MB across 162 files, but it is only deployed, not downloaded. A browser fetches the entry and the chunks that the diagram on the page actually needs.

## What I took from it

Two things.

First, when you self-host an ES module build, read its import statements before you copy it. A file named `something.esm.min.mjs` is very often an entry point, not a bundle.

Second, verify the feature in the built site, not in your head. I found this by opening a post in the browser and counting rendered diagrams: zero SVGs, one raw code block, seventeen failed requests in the network tab. Thirty seconds of checking would have caught it on the day I shipped it.

There is a third, smaller trap. My static asset headers mark `.mjs` files as `immutable` for a year, and that header was applied to the 404 responses too. While testing the fix, my browser kept serving the cached 404s. If you serve long-lived cache headers by file extension, make sure error responses are not included.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. More at [shrinath.me/work](https://shrinath.me/work/)._
