---
title: "My Blog Images Were 1 MB Each. Fixing It in Eleventy With 40 Lines of sharp"
description: "The cover images on my blog were 1.0 to 1.4 MB PNGs served at full size to every device. Here is the small build step that turned 12.6 MB of images into under 200 KB for the blog index."
date: 2026-11-13
postTags: ["posts", "performance", "eleventy", "images"]
category: "Performance"
keywords:
  [
    "responsive images",
    "WebP",
    "sharp",
    "Eleventy image optimization",
    "srcset",
    "Largest Contentful Paint",
    "Cumulative Layout Shift",
    "page speed",
  ]
# image: "/images/responsive-webp-images.png"
---

I wrote a post claiming this site scores close to 100 on Lighthouse because there is nothing to optimise. Then I looked at the network tab on my own blog index.

Eleven cover images. Each one a PNG, 1672 by 941 pixels, between 1.0 and 1.4 MB. In total, 12.6 MB of images, displayed in cards about 500 pixels wide. They were lazy loaded, which hid the problem from a quick test, and it was still an absurd amount of data to send a phone.

## What was wrong, specifically

1. **Wrong format.** PNG is lossless. For illustrated cover art, WebP at a moderate quality is visually the same at a fraction of the size.
2. **Wrong dimensions.** One 1672 pixel file was sent to every screen, including ones that would display it at 340 pixels.
3. **No `width` or `height`.** The browser could not reserve space, so the layout depended on CSS to avoid shifting.
4. **The post cover was lazy loaded.** On an article page the cover is the largest element on screen. Marking it `loading="lazy"` tells the browser to deprioritise the most important image on the page.

## The build step

`sharp` was already a dependency, because I use it for [blur placeholders](/blog/build-time-blur-placeholders-eleventy/). I added one function that produces WebP variants at a list of widths:

**eleventy.config.js**

```js
async function imageVariants(src, widths) {
  const full = join("src", src);
  const sharp = (await import("sharp")).default;
  const meta = await sharp(full).metadata();
  const hash = fileHash(full);
  const name = basename(src, extname(src));
  const usable = widths.filter((w) => w <= meta.width);
  if (usable.length === 0) usable.push(meta.width);

  const variants = [];
  for (const w of usable) {
    const file = `${name}-${hash}-${w}.webp`;
    const cached = join(".cache", "img", file);
    if (!existsSync(cached)) {
      mkdirSync(join(".cache", "img"), { recursive: true });
      await sharp(full).resize(w).webp({ quality: 76 }).toFile(cached);
    }
    mkdirSync(join("_site", "img"), { recursive: true });
    copyFileSync(cached, join("_site", "img", file));
    variants.push({
      url: `/img/${file}`,
      width: w,
      height: Math.round((meta.height * w) / meta.width),
    });
  }
  return variants;
}
```

The decisions inside it:

- **Never upscale.** Widths larger than the source are dropped.
- **The content hash is in the filename.** My images are served with a one year `immutable` cache header. If I replace an image, the hash changes and so does the URL. I explain why that matters in [immutable caching without a bundler](/blog/cache-busting-static-site-immutable-headers/).
- **Variants are cached on disk.** An image is encoded once. Later builds only copy files, so the build stays under a second.
- **The original PNG is kept** and still used for Open Graph previews, where broad format support matters more than size.

## The shortcode

Templates call a shortcode with a preset, so the widths and `sizes` live in one place:

{% raw %}
```
{% img post.data.image, "", "card", loop.index <= 2 %}
```
{% endraw %}

Which outputs:

```html
<img
  src="/img/vite-seo-0fc253c016-480.webp"
  srcset="/img/vite-seo-0fc253c016-480.webp 480w,
          /img/vite-seo-0fc253c016-960.webp 960w"
  sizes="(max-width: 640px) 100vw, 500px"
  width="480" height="270"
  alt="" loading="lazy" decoding="async" />
```

`srcset` with `sizes` lets the browser choose. A standard display gets the 480 pixel file. A high-density display gets the 960 pixel one. The `width` and `height` attributes give the browser the aspect ratio before a single byte of the image arrives.

The last argument marks an image as eager. The first two cards on the index, and the cover on every article, are emitted with `loading="eager" fetchpriority="high"`, because they are likely to be the largest thing in the viewport. Everything else is lazy.

The card images have an empty `alt` on purpose. Each card is a link that already contains the post title as text, so describing the image again would make a screen reader read every title twice.

## The numbers

Measured on the built site:

| | Before | After |
| --- | --- | --- |
| Source images | 11 PNGs, 12.6 MB | unchanged, used for social previews only |
| All 11 covers at card size, high-density | 12.6 MB | 184 KB |
| A single cover at 960 px | 1.0 to 1.4 MB | roughly 15 to 20 KB |
| All 44 generated variants | | 697 KB total |

The whole set of generated files, every image at every width, is smaller than one of the original PNGs.

## What I took from it

I had measured the homepage, which has no images, and assumed the result applied to the whole site. It did not. A performance score describes one page, on the day you measured it.

The other lesson is about lazy loading. It is a good default and a bad blanket rule. It made a 12 MB page look fine in a casual test while still costing that much to anyone who scrolled, and it was actively hurting the one image that should load first.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. This site is built with Eleventy._
