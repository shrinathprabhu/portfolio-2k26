---
title: "Immutable Caching Without a Bundler: A One-Line Content Hash Filter"
description: "I cached my JavaScript for a year with the immutable directive and no version in the URL, which means returning visitors could never get an update. Here is the small Eleventy filter that fixed it."
date: 2026-10-20
dateModified: 2026-11-16
postTags: ["posts", "performance", "eleventy", "caching"]
category: "Performance"
keywords:
  [
    "cache busting",
    "Cache-Control immutable",
    "content hash",
    "Eleventy filter",
    "static site caching",
    "HTTP caching",
    "no bundler",
  ]
# image: "/images/cache-busting-immutable.png"
---

`Cache-Control: public, max-age=31536000, immutable` is the best cache header a static asset can have. It tells the browser to keep the file for a year and not even ask the server whether it changed. Repeat visits make zero requests for those files.

It is also a promise: the content at this URL will never change. I made that promise for every JavaScript file on this site and then kept editing the files.

## The bug

My headers file caches by extension:

```
/*.js
  Cache-Control: public, max-age=31536000, immutable
/*.css
  Cache-Control: public, max-age=31536000, immutable
```

And my templates referenced scripts by a fixed path:

```html
<script src="/js/nav.js" defer></script>
```

Anyone who had visited once would keep their copy of `nav.js` for a year. If I fixed a bug in it, new visitors would get the fix and returning visitors would not, and I would have no way to reach them. Nothing errors. The site just behaves differently for different people.

Tools like Vite solve this by putting a content hash in every filename. This site has no bundler, and I did not want to add one to rename five files.

## The fix

A filter that hashes the file's contents at build time:

**eleventy.config.js**

```js
import { createHash } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";

function fileHash(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex").slice(0, 10);
}

eleventyConfig.addFilter("rev", (path) => fileHash(join("src", path)));
```

And every script reference uses it:

{% raw %}
```html
<script src="/js/nav.js?v={{ '/js/nav.js' | rev }}" defer></script>
```
{% endraw %}

The output is `/js/nav.js?v=3f9a1c2b7e`. The query string is part of the cache key, so when the file changes, the hash changes, the URL changes, and the browser treats it as a file it has never seen. When the file does not change, the URL is identical across deploys and the cached copy keeps being used.

That last property is why this is a content hash and not a build timestamp. A timestamp would bust every cache on every deploy, including for files that are byte-for-byte the same.

## Query string or filename?

Putting the hash in the filename (`nav.3f9a1c2b7e.js`) is the stricter approach. Each version is a distinct file, so an old HTML page and a new one can be served at the same time, each pointing at the script version it was built with. During a deploy that matters.

The query string approach keeps one file on disk. A request for `nav.js?v=old` after a deploy returns the new file. For a personal site with atomic deploys I accept that. It also needs no file renaming and no manifest. If I were shipping an application with long-lived sessions, I would hash the filename.

## What does not get this treatment

- **HTML** is served with `max-age=0, must-revalidate`. It is the entry point that carries the versioned URLs, so it must always be fresh.
- **CSS** is inlined into the HTML, so it has no URL to version.
- **Fonts** keep a fixed path. They change so rarely that I treat a font swap as a rename.
- **Generated images** get the hash in the filename. The build already creates those files, so naming them by content costs nothing. I describe that pipeline in [responsive WebP images in Eleventy](/blog/responsive-webp-images-eleventy-sharp/).

## How I found it

I only had the filter on one script, the one I had edited most often and had been bitten by. Every other script was unversioned. When I changed the navigation script I realised it had the same year-long header and no version at all.

The rule I follow now: if a path is covered by an `immutable` header, every reference to it must include a content hash. A quick way to audit this is to search the built HTML for `src=` and `href=` values under those paths and look for any without a version.

There is one more trap, which I hit while testing. Header rules matched by file extension also apply to error responses. A 404 for a `.mjs` file went out with `immutable`, and my browser cached the 404. If your host lets you scope cache headers to successful responses, do it.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. More at [shrinath.me/work](https://shrinath.me/work/)._
