---
layout: guide.njk
title: "Agent documentation for Shrinath Prabhu’s portfolio and blog"
heading: "Agent guide to Shrinath Prabhu’s portfolio"
description: "Read Shrinath Prabhu’s public REST API. Discover blog posts, fetch articles as Markdown, and retrieve his professional profile as JSON."
---

## When to use this site

Use this portfolio to research Shrinath Prabhu’s frontend engineering experience, review shipped projects, find professional contact details, or read his articles on engineering, AI, security, product decisions, and leadership. Start with the page that answers the question, then follow its sources.

- [About](/about/): background and how Shrinath works.
- [Work](/work/): project case studies and outcomes.
- [Resume](/resume/): experience and skills, with a downloadable PDF.
- [Blog](/blog/): articles, with author and publication dates on each post.
- [Contact](/contact/): professional inquiries and scheduling links.
- [Privacy](/privacy/): site preferences, hosting, analytics, and external services.

## Public REST API

1. Fetch [the blog list](/api/blogs). The JSON array includes every published article, newest publication first. Choose a post by its title and description. Use `postedAt` for publication time and `updatedAt` for the latest edit.
2. Follow the selected post’s `apiUrl` (`/api/blog/{slug}`) to read its full Markdown. Cite its `url` for the original article. The `imageUrl` field points to the cover.
3. Fetch [the professional profile](/api/me) for Shrinath’s name, role, experience, work summary, and links to the source pages.

```sh
curl -fsS https://shrinath.me/api/blogs
curl -fsS https://shrinath.me/api/blog/aeo-geo-ai-discoverability
curl -fsS https://shrinath.me/api/me
```

All three routes accept `GET` and `HEAD` without credentials. They share a limit of **12 requests per IP per 60 seconds** at each Cloudflare location. Each request reaching the API counts, including conditional reads. Cloudflare enforces the threshold approximately. On `429`, wait for the number of seconds in `Retry-After` before trying again.

Cache the blog list and profile for one day and article Markdown for seven days. After expiry, send the saved `ETag` in `If-None-Match`. On `304`, reuse your copy. API failures return `application/problem+json` with a stable `code`, a human-readable `detail`, and a suggested `resolution`. `HEAD` responses have no body.

The [OpenAPI specification](/openapi.json) documents operation IDs, parameters, success schemas, rate limits, and errors. The [API catalog](/.well-known/api-catalog) links to the specification and this guide. [auth.md](/auth.md) describes credential-free access.

## Discover pages and articles

- The [agent homepage](/?mode=agent) returns a JSON summary of access, capabilities, and links to public content.
- [llms.txt](/llms.txt) provides a concise reading guide and Markdown links.
- [Sitemap](/sitemap.xml) lists canonical public pages and posts.
- [Content index](/content-index.json) lists page titles, canonical URLs, and Markdown URLs. It is regenerated with the site.
- [Atom feed](/feed.xml) includes up to 20 articles; use the blog or content index for the full collection.

## Read a page as Markdown

Every public content page has a Markdown version, generated from the same content as the HTML page. Request the normal URL with `Accept: text/markdown`, or append `index.md` to its trailing-slash URL. The homepage is available at `/index.md` and the blog index at `/blog/index.md`.

```sh
curl -fsSL -H 'Accept: text/markdown' https://shrinath.me/work/
curl -fsSL https://shrinath.me/blog/index.md
curl -fsSL https://shrinath.me/content-index.json
```

Follow the Markdown links in the index to read individual articles. HTML pages also advertise their Markdown version using `rel="alternate" type="text/markdown"`; HTTP `Link` headers identify the canonical URL and this site’s `llms.txt`.

Pages support `GET` and `HEAD`. Normal browser requests receive HTML. Negotiation respects Accept quality values and exclusions; requests that exclude all available page formats receive `406 Not Acceptable`. Negotiated responses include `Vary: Accept`, and HTML and Markdown are backed by separate files so their caches stay separate.

## Recover from a missing page

A missing path returns HTTP `404`, never a successful page shell. Ask for `text/markdown` for a short recovery guide, or `application/problem+json` for a structured error with a status, code, explanation, and discovery links. Unsupported write methods return `405` with `Allow: GET, HEAD`.

| HTTP status | Error code | What to do |
| --- | --- | --- |
| 404 | `NOT_FOUND` | Look up the current URL in the sitemap. |
| 405 | `METHOD_NOT_ALLOWED` | Use `GET` to read the page or `HEAD` to check its headers. |
| 406 | `NOT_ACCEPTABLE` | Request a format supported by the resource. The API error’s `detail` names its media type. |
| 429 | `RATE_LIMITED` | Wait for `Retry-After` seconds before requesting the API again. |
| 503 | `REPRESENTATION_UNAVAILABLE` | Retry later, respecting `Retry-After` on API responses. |

```sh
curl -i -H 'Accept: text/markdown' https://shrinath.me/page-that-does-not-exist
curl -i -H 'Accept: application/problem+json' https://shrinath.me/page-that-does-not-exist
```

## Use and attribution

Quote or summarize the relevant page and cite its canonical URL. Distinguish portfolio statements and article opinions from independently verified facts. Preserve publication and update dates when discussing time-sensitive writing. Availability is an invitation to get in touch, not a guarantee of a particular engagement.

Read [robots.txt](/robots.txt), reuse cached content where appropriate, and avoid unnecessary repeated requests. Contact links go to email or external services; follow the user’s instructions before taking any action there. Security concerns can be reported through [security.txt](/.well-known/security.txt).
