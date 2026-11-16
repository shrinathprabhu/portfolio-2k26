---
title: "Eleventy Code Blocks: Highlighting Vue Files and Adding Filename Tabs"
description: "Two small build-time tricks for technical blogs on Eleventy: making Prism highlight Vue single-file components, and turning a bold filename above a code block into a titled tab, with no client-side highlighter."
date: 2026-08-05
postTags: ["posts", "eleventy", "vue", "frontend"]
category: "Frontend Architecture"
keywords:
  [
    "Eleventy",
    "Prism",
    "syntax highlighting",
    "Vue SFC",
    "code blocks",
    "markdown-it",
    "Eleventy transform",
    "static site",
  ]
# image: "/images/eleventy-code-blocks.png"
---

This blog highlights code at build time. The HTML arrives with every token already wrapped in a `<span>`, so there is no highlighter to download and no flash of unstyled code. Eleventy's official syntax highlight plugin does this with Prism.

Two things did not work the way I wanted out of the box. Both took a few lines to fix.

## Problem 1: Vue code fences were not highlighted

I write about Vue, so many of my code blocks are fenced as `vue`. Prism has no grammar registered under that name, so those blocks rendered as plain, uncoloured text.

A Vue single-file component is HTML with a `<script>` and a `<style>` inside it, and Prism's `markup` grammar already knows how to highlight embedded JavaScript and CSS. So `vue` only needs to be an alias. The plugin exposes an `init` hook that receives the Prism instance:

**eleventy.config.js**

```js
eleventyConfig.addPlugin(syntaxHighlight, {
  init: function ({ Prism }) {
    Object.defineProperty(Prism.languages, "vue", {
      get() {
        return Prism.languages.markup;
      },
      configurable: true,
    });
  },
});
```

I used a getter instead of a plain assignment so the alias always resolves to the current `markup` grammar, even if another plugin extends it after mine runs.

It is not a full Vue grammar. Template directives like `v-if` are highlighted as ordinary attributes. For blog posts that is enough, and it avoids pulling in and maintaining a separate grammar.

## Problem 2: readers need to know which file a snippet belongs to

In a tutorial with three files, a code block with no label makes the reader guess. I wanted a filename tab above the block, and I did not want to invent custom Markdown syntax for it, because my posts should still read correctly anywhere else Markdown is rendered.

The convention I settled on is one I was already using by habit: a line with just the filename in bold, directly above the fence.

````markdown
**eleventy.config.js**

```js
export default function (eleventyConfig) {}
```
````

On GitHub or in an RSS reader that renders as a bold line followed by a code block, which is fine. On this site an Eleventy transform rewrites the generated HTML:

```js
eleventyConfig.addTransform("codeFilename", function (content) {
  if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) {
    return content;
  }
  return content.replace(
    /<p><strong>([^<]+\.[a-zA-Z]+)<\/strong><\/p>\s*(<pre\s[^>]*>[\s\S]*?<\/pre>)/g,
    '<div class="code-titled"><div class="code-titled__name">$1</div>$2</div>',
  );
});
```

The details that keep it from misfiring:

- **It only runs on HTML output.** The transform also sees the sitemap and the feed, and should leave them alone.
- **The bold text must contain a dot followed by letters.** That is what separates `post.js` from a sentence I happened to bold right before a snippet.
- **The paragraph must contain nothing but the bold text.** A bold phrase inside a longer sentence never matches.

The CSS then squares off the top corners of the `<pre>` and draws the name as a tab attached to it.

## Why a transform and not a shortcode

I could have written a paired shortcode and wrapped every block in it. That would have tied every post to this particular site generator. A transform keeps the source as plain Markdown and treats the nicer rendering as an enhancement applied at the last step. If I move generators again, the posts come with me unchanged.

## The copy button is the only runtime code

The one thing that needs JavaScript is copying to the clipboard. A small module script adds a button to each `<pre>` and calls `navigator.clipboard.writeText()` with the block's `textContent`. Highlighting, filenames, and layout are all finished before the page leaves the build.

That split is the rule I try to follow everywhere on this site: anything that can be decided at build time is decided at build time, and the browser only runs code for things that depend on the person using it.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. I also wrote [a guide to the Vue 3 Composition API](/blog/vue-3-composition-api-basics-and-patterns/)._
