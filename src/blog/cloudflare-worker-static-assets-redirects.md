---
title: "A 36-Line Cloudflare Worker in Front of a Static Site"
description: "How this site runs on Cloudflare Workers static assets with a tiny Worker in front for the www to apex redirect, renamed pages, and security.txt, and why the redirects are 308 and not 301."
date: 2026-09-22
postTags: ["posts", "cloudflare", "hosting", "frontend"]
category: "Infrastructure"
keywords:
  [
    "Cloudflare Workers",
    "static assets",
    "www redirect",
    "308 redirect",
    "wrangler",
    "static site hosting",
    "canonical host",
    "security.txt",
  ]
# image: "/images/cloudflare-worker-static-site.png"
---

This site is a folder of static files. It still needs three things that plain file hosting does not give you: one canonical hostname, permanent redirects for pages I have renamed, and a `security.txt` at the standard location. I moved it to Cloudflare Workers with static assets and put a small Worker in front. The entire Worker is 36 lines.

## The configuration

**wrangler.jsonc**

```jsonc
{
  "name": "shrinath-portfolio",
  "main": "worker/index.js",
  "assets": {
    "directory": "./_site",
    "binding": "ASSETS",
    "html_handling": "auto-trailing-slash",
    "not_found_handling": "404-page",
    "run_worker_first": true
  },
  "routes": [
    { "pattern": "shrinath.me", "custom_domain": true },
    { "pattern": "www.shrinath.me", "custom_domain": true }
  ]
}
```

Four settings do most of the work:

- **`directory`** points at the Eleventy build output.
- **`html_handling: "auto-trailing-slash"`** serves `/work/index.html` at `/work/` and normalizes the other form to it, so each page has one URL.
- **`not_found_handling: "404-page"`** serves my `404.html` with a real 404 status for unknown paths.
- **`run_worker_first: true`** is the important one. By default a request that matches a static file is served directly and never reaches your code. With this flag the Worker sees every request first, which is the only way it can redirect a request for a file that exists.

## The Worker

**worker/index.js**

```js
const CANONICAL_HOST = "shrinath.me";

const REDIRECTS = {
  "/resume/SHRINATH_PRABHU_UPDATED_RESUME_2026.pdf":
    "/resume/SHRINATH_PRABHU_RESUME.pdf",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 308);
    }

    if (url.pathname === "/security.txt") {
      url.pathname = "/.well-known/security.txt";
      return Response.redirect(url.toString(), 308);
    }

    const redirect = REDIRECTS[url.pathname.replace(/\/$/, "")];
    if (redirect) {
      url.pathname = redirect;
      return Response.redirect(url.toString(), 308);
    }

    return env.ASSETS.fetch(request);
  },
};
```

Everything that is not a redirect falls through to `env.ASSETS.fetch(request)`, which serves the static file with the headers from my `_headers` file applied.

## Why one hostname

`www.shrinath.me` and `shrinath.me` serving the same pages is duplicate content. A canonical link tag tells search engines which one I prefer, but a redirect removes the question. It also keeps inbound links from being split across two hosts.

Because I mutate a `URL` object and redirect to its string form, the path and query string are preserved. `www.shrinath.me/work/?ref=x` goes to `shrinath.me/work/?ref=x`, not to the homepage. Redirecting everything to the root is the most common way this gets done badly.

## Why 308 and not 301

Both mean "moved permanently". The difference is what a client is allowed to do with the request method. With a 301, clients may change a POST into a GET when following the redirect, and in practice they do. A 308 requires the method and body to be preserved.

For a static site serving GET requests, the two behave the same. I use 308 because it says exactly what I mean and has no historical ambiguity. Search engines treat it as a permanent redirect.

## Renamed pages without breaking links

I renamed my resume PDF to a name without a year in it. The old URL had already been shared in applications and profiles, so it gets a permanent redirect.

The lookup strips a trailing slash before checking the map (`url.pathname.replace(/\/$/, "")`), so a page path with or without the trailing slash matches one entry. Without that, every renamed page needs two entries and one of them will eventually be forgotten.

## security.txt

[RFC 9116](https://www.rfc-editor.org/rfc/rfc9116) defines `security.txt` as the place to publish how to report a vulnerability, and puts it at `/.well-known/security.txt`. Many people and scanners still try the root path first, so the Worker redirects `/security.txt` to the standard location instead of hosting two copies that can drift apart.

## The tradeoff

With `run_worker_first`, every request invokes the Worker, including requests for images and fonts. That means every asset request counts as a Worker invocation. For a personal site the volume is small, but it is the first thing I would revisit for anything with real traffic, by narrowing which paths run the Worker first.

The other tradeoff is that redirects now live in code. I think that is a benefit. They are versioned, reviewed in a diff, and deployed with the pages they point to.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. More at [shrinath.me/work](https://shrinath.me/work/)._
