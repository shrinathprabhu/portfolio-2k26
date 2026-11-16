---
title: "A Strict Content Security Policy for a Static Site, Starting From default-src 'none'"
description: "The exact Content-Security-Policy and security headers this site ships, why it starts by denying everything, what each directive allows, and the three times the policy broke a feature I had just built."
date: 2026-10-12
dateModified: 2026-11-16
postTags: ["posts", "security", "frontend", "cloudflare"]
category: "Security"
keywords:
  [
    "Content Security Policy",
    "CSP",
    "default-src none",
    "security headers",
    "static site security",
    "script-src self",
    "Cross-Origin-Embedder-Policy",
    "frame-ancestors",
  ]
# image: "/images/strict-csp-static-site.png"
---

A Content Security Policy (CSP) is a response header that tells the browser which sources a page may load scripts, styles, images, and other resources from. If an attacker manages to inject markup into your page, the policy decides whether that markup can do anything.

Most policies start permissive and add restrictions. Mine starts by denying everything and adds back only what the site uses. A static site is the easiest place to do this, because you know every resource it loads.

## The policy

```
Content-Security-Policy:
  default-src 'none';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  img-src 'self' data:;
  media-src 'self';
  connect-src 'self';
  manifest-src 'self';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none'
```

It is sent as one line from the `_headers` file, on every path.

## Directive by directive

**`default-src 'none'`** is the fallback for every resource type I have not listed. Anything I forget is blocked, not allowed. That is the whole point of starting here: a mistake fails closed.

**`script-src 'self'`** allows scripts only from files on my own origin. There is no `'unsafe-inline'` and no `'unsafe-eval'`, so an injected `<script>` tag or an `onclick` attribute does nothing. Getting here meant moving every inline script on the site into a file, which was a dedicated cleanup.

**`style-src 'self' 'unsafe-inline'`** is the one compromise. I inline my stylesheet into a `<style>` tag in every page so there is no render-blocking CSS request, and inline styles need this keyword. The strict alternative is a hash of the stylesheet in the header, which I may do later. Inline styles are a much smaller risk than inline scripts, but I will not pretend this line is strict.

**`font-src 'self'`** works because the fonts are self-hosted. With a hosted font service this would need a third-party origin.

**`img-src 'self' data:`** allows my own images plus `data:` URIs, which the [blur placeholders](/blog/build-time-blur-placeholders-eleventy/) on the blog depend on.

**`connect-src 'self'`** covers `fetch()` calls to my own origin.

**`base-uri 'self'`** stops an injected `<base>` tag from rewriting every relative URL on the page. **`form-action 'self'`** stops a form from posting somewhere else. Neither of these falls back to `default-src`, so they have to be set explicitly.

**`frame-ancestors 'none'`** forbids any site from embedding mine in a frame, which is the modern clickjacking defence.

## What about JSON-LD?

My pages contain inline `<script type="application/ld+json">` blocks for structured data, and they work under `script-src 'self'`. The policy governs script execution. A JSON-LD block is a data block: the browser never executes it, so there is nothing to block.

## Three times the policy broke something

A deny-by-default policy means new features fail until you allow them. That is a cost, and I think it is the right one.

1. **Audio.** I added a voice introduction to the homepage. With `default-src 'none'` and no `media-src`, the browser would refuse to load the MP3. I added `media-src 'self'` in the same change.
2. **Embeds.** My build has a YouTube shortcode. There is no `frame-src` in the policy, so any embed would be blocked. I have not needed one, and when I do it will be a deliberate decision to allow one specific origin.
3. **Placeholders.** Without `data:` in `img-src`, the inline blur placeholders silently disappear. No error on the page, only a line in the console.

That third one is the general lesson: CSP failures are quiet. Open the browser console after every change to the policy, and after every new feature.

## The other headers

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-site
Cross-Origin-Embedder-Policy: require-corp
X-XSS-Protection: 0
```

Two notes. `X-Frame-Options: DENY` duplicates `frame-ancestors 'none'` for older browsers. And `X-XSS-Protection` is set to `0` on purpose: the legacy XSS auditor it controlled has been removed from modern browsers, and where it still exists it has been a source of vulnerabilities itself. I shipped `1; mode=block` for months before I checked. The CSP is the real protection.

`Cross-Origin-Embedder-Policy: require-corp` is strict enough to block any third-party resource that does not opt in. It only works here because the site loads nothing from other origins.

## Is this overkill for a portfolio?

There is no login and no user data here, so the realistic threat is small. I do it anyway for two reasons. A strict policy forced me to know every resource the site loads, which is also why the site is fast. And I would rather learn where a policy bites on my own site than on a product with users.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. More at [shrinath.me/work](https://shrinath.me/work/)._
