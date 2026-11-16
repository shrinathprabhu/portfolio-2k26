---
title: "How to Reduce Your Frontend's Attack Surface: Remove, Restrict, Then Monitor"
description: "Attack surface is everything an attacker can reach. On the frontend that means dependencies, third-party scripts, browser permissions, exposed endpoints, and anything in the bundle. A practical order of operations for shrinking it."
date: 2026-08-27
postTags: ["posts", "security", "frontend", "architecture"]
category: "Security"
keywords:
  [
    "attack surface",
    "frontend security",
    "third-party scripts",
    "supply chain security",
    "Content Security Policy",
    "Subresource Integrity",
    "least privilege",
    "dependency security",
  ]
# image: "/images/reducing-attack-surface.png"
---

Attack surface is the sum of everything an attacker can reach and try to misuse. On the backend people picture open ports. On the frontend it is less visible and usually larger: every dependency in the bundle, every script from another origin, every permission the app requests, and every endpoint the client knows about.

Most security advice is about adding defences. Reducing attack surface is about having less to defend. I work through it in three steps, in this order: remove, restrict, monitor.

## Step 1: Remove

The safest code is code you do not ship.

**Dependencies.** Each package is code you did not write, running with full access to your page, maintained by someone who can be compromised. Before adding one, ask whether the platform already does the job. Date formatting, deep cloning, fetching, and UUIDs all have native answers now. On my own site I removed an entire script by replacing a JavaScript image fade with CSS.

**Third-party scripts.** Analytics, chat widgets, tag managers, and A/B testing tools run with the same privileges as your own code. A tag manager is, by design, a way to run code that never went through your review. List every external script and ask who owns it and what happens if it is compromised tomorrow. Anything without a clear owner goes.

**Dead features.** An unused route, an old admin panel still in the bundle, a debug flag that still works in production. Each one is reachable.

**Secrets and internals.** Anything in the bundle is public. That includes keys, internal hostnames, unreleased feature names, and, if you publish them, source maps that hand over your original source.

## Step 2: Restrict

For what remains, grant the minimum.

**Content Security Policy.** Start from `default-src 'none'` and allow only what the app uses. A good policy means an injected script cannot run and stolen data has nowhere to go. I wrote up [the exact policy this site uses](/blog/strict-content-security-policy-static-site/).

**Subresource Integrity.** If you must load a script from another origin, pin it with an `integrity` hash so a changed file is refused:

```html
<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>
```

Self-hosting the file is better still. It removes the third party from the trust chain.

**Permissions.** Send a `Permissions-Policy` header that switches off the browser features you do not use: camera, microphone, geolocation. If your code is ever compromised, it cannot ask for them.

**Framing.** `frame-ancestors 'none'` stops other sites embedding yours for clickjacking. If you embed third-party content, put it in a sandboxed iframe with only the capabilities it needs.

**Cross-window messaging.** Every `message` listener is an API anyone can call. Check `event.origin` against an allow-list, and validate the shape of the data before using it. I have seen more real bugs here than anywhere else, because the handler looks like internal code.

**Storage.** Anything in `localStorage` is readable by any script on the origin. Session tokens are safer in `HttpOnly`, `Secure`, `SameSite` cookies that JavaScript cannot read.

**The API.** The frontend is not a security boundary. Every rule enforced only in the client is a suggestion. Hiding a button does not protect the endpoint behind it.

## Step 3: Monitor

Surface grows back. New dependencies arrive, someone adds a script for a campaign.

- **CSP reporting.** A `report-to` endpoint tells you when the policy blocks something. That is either an attack or a change nobody told you about.
- **Dependency review.** Treat lockfile changes as code changes. A new transitive dependency deserves a look.
- **A script inventory.** Periodically load the production site and list every origin it contacts. Compare with the list you expect.

## What browser extensions taught me

I have shipped four Chrome extensions, and extensions make this discipline unavoidable. Every permission is declared in the manifest, shown to the user at install, and examined in store review. Asking for access to all sites when you need one is both a review risk and a liability: it is the access an attacker inherits if the extension is ever compromised.

Web apps have no such forcing function, so the surface grows unexamined. Writing your app's "manifest" by hand, a list of the origins it talks to, the browser features it uses, and the data it stores, is a useful exercise. Most teams are surprised by what is on it.

## The order matters

Teams usually start with step 3, buy a scanner, and get a long report. Start with step 1. Every item you remove is one you never have to restrict, monitor, patch, or explain in an incident review.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. More at [shrinath.me/work](https://shrinath.me/work/)._
