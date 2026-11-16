---
title: "Build-Time Blur Placeholders in Eleventy with sharp"
description: "How this site shows a blurred preview of every blog image before the real file loads, using a 20px JPEG generated at build time and inlined as a data URI. No client-side library, no layout shift."
date: 2026-05-20
dateModified: 2026-11-16
postTags: ["posts", "eleventy", "performance", "images"]
category: "Performance"
keywords:
  [
    "LQIP",
    "blur placeholder",
    "Eleventy",
    "sharp",
    "image performance",
    "low quality image placeholder",
    "data URI",
    "static site",
  ]
# image: "/images/blur-placeholders.png"
---

A blur placeholder (often called LQIP, low quality image placeholder) is a tiny, blurred version of an image that is shown while the full image downloads. On this site it is a 20 pixel wide JPEG, generated at build time and inlined into the HTML as a base64 data URI. There is no runtime library and no extra request.

## Why bother on a static site

The blog listing shows a cover image on every card. Without a placeholder, each card paints as an empty grey box and then pops to the image when the file arrives. A blurred preview makes the page feel finished on first paint, and it costs a few hundred bytes per image.

## The filter

Eleventy lets you register async filters. This one takes an image path, shrinks the image with [sharp](https://sharp.pixelplumbing.com/), and returns a data URI:

**eleventy.config.js**

```js
eleventyConfig.addAsyncFilter("blurPlaceholder", async function (imagePath) {
  if (!imagePath) return "";
  const fullPath = join("src", imagePath);

  try {
    const mtime = statSync(fullPath).mtimeMs.toString();
    const cacheKey = `${imagePath}:${mtime}`;
    if (placeholderCache[cacheKey]) return placeholderCache[cacheKey];

    const sharp = (await import("sharp")).default;
    const buffer = await sharp(fullPath)
      .resize(20)
      .jpeg({ quality: 20 })
      .toBuffer();

    const dataUri = `data:image/jpeg;base64,${buffer.toString("base64")}`;
    placeholderCache[cacheKey] = dataUri;
    return dataUri;
  } catch {
    return "";
  }
});
```

Three decisions are worth explaining.

**20 pixels wide, JPEG quality 20.** The placeholder is going to be scaled up and blurred, so detail is wasted. At this size each placeholder is a few hundred bytes of base64.

**The cache key includes the file's modified time.** Results are stored in `.cache/blur-placeholders.json` and written back in the `eleventy.after` event. An unchanged image is never processed twice, and replacing an image invalidates its entry automatically.

**Failure returns an empty string.** A missing image should not break the build. The card simply renders without a placeholder.

## Using it in a template

The data URI is passed to CSS through a custom property, so the markup stays small:

{% raw %}
```html
<div
  class="blog-card__image"
  style="--placeholder: url('{{ post.data.image | blurPlaceholder }}')"
>
  <img src="..." alt="" loading="lazy" />
</div>
```
{% endraw %}

```css
.blog-card__image {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg-tag) var(--placeholder) center / cover no-repeat;
}
```

The `aspect-ratio` reserves the space before anything loads, which is what prevents layout shift. The browser stretches the 20px image across the box, and bilinear scaling gives a soft blur for free.

## What I got wrong the first time

My first version painted the placeholder on a `::before` pseudo-element with `filter: blur(20px)`, kept the real `<img>` at `opacity: 0`, and used a script to add an `is-loaded` class on the image's `load` event so it could fade in.

It looked good, and it had a real bug: with JavaScript disabled or blocked, the class was never added and every image stayed invisible. A decorative effect had become a hard dependency.

The current version has no script at all. The placeholder is the container's background and the image simply paints over it when it arrives. I lost a half-second cross-fade and removed an entire JavaScript file from the blog page.

## One requirement: your Content Security Policy

Inline placeholders are `data:` URLs, so the policy has to allow them for images:

```
img-src 'self' data:;
```

If you run a strict policy and forget this, the placeholders silently fail. I cover the rest of that policy in [a strict CSP for a static site](/blog/strict-content-security-policy-static-site/).

## When not to do this

If a page has hundreds of images, the inlined base64 adds up and belongs in a separate request. For a blog index with a few dozen cards it is the cheapest perceived-performance win I know.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. This site is built with Eleventy._
