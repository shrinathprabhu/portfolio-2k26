---
title: "llms.txt, JSON-LD and Visible Facts: Making a Personal Site Readable to AI"
description: "What I actually did to make my portfolio easy for answer engines and AI assistants to read: an llms.txt generated from my posts, structured data that validates, and facts in visible text instead of hidden blocks."
date: 2026-06-24
dateModified: 2026-11-16
postTags: ["posts", "seo", "ai", "eleventy"]
category: "SEO & AI Discoverability"
keywords:
  [
    "llms.txt",
    "generative engine optimization",
    "GEO",
    "answer engine optimization",
    "AEO",
    "JSON-LD",
    "structured data",
    "AI discoverability",
    "personal website SEO",
  ]
# image: "/images/llms-txt-ai-discoverability.png"
---

People now ask an AI assistant "who is this person and what have they built?" before they ever open a portfolio. Making a site easy for those systems to read goes by a few names: generative engine optimization (GEO), answer engine optimization (AEO), AI discoverability. They overlap almost completely with ordinary good SEO.

Here is what I did on this site, and what I would not claim about it.

## The honest caveat first

`llms.txt` is a proposal, not a standard. It suggests a Markdown file at the root of a site that gives language models a short description of the site and a curated list of links. I have no evidence of which AI crawlers read it, or whether any of them weigh it. I ship one because it costs almost nothing and because a clean, linked summary of a site is useful to anything that fetches it, including people.

If someone tells you `llms.txt` will get you cited by a chatbot, ask them how they measured that.

## 1. An llms.txt that cannot go stale

The format is simple: an H1 with the site name, a blockquote summary, then sections of links with one-line descriptions.

My first version was a hand-written static file. Within a few months the post titles in it no longer matched the real titles, because I had renamed posts and forgotten the file existed. A summary that is wrong is worse than no summary.

So the file is now a template, and the writing section is generated from the same collection that renders the blog:

**src/llms.njk**

{% raw %}
```
---
permalink: /llms.txt
eleventyExcludeFromCollections: true
---
# Shrinath Prabhu - shrinath.me

> Senior Staff Frontend Engineer with 8+ years of experience...

## Writing
{% for post in collections.posts %}
- [{{ post.data.title | safe }}](https://shrinath.me{{ post.url }}): {{ post.data.description | safe }}
{%- endfor %}
```
{% endraw %}

Publishing a post updates `llms.txt`, the sitemap, the RSS feed, and the blog index from one source of truth.

## 2. Structured data that actually parses

JSON-LD is the part with real, documented consumers. Search engines read it today.

On the homepage I describe a `Person` with a stable `@id`, a `ProfilePage` whose main entity is that person, and a `WebSite`. Every blog post is a `BlogPosting` whose `author` points back to the same `@id`, plus a `BreadcrumbList`. Reusing one identifier is what tells a parser that the author of every post and the subject of the homepage are the same entity.

The lesson I learned the hard way is that structured data fails silently. My post template built JSON by pasting values between quotes, and a title containing a double quote would have produced invalid JSON with no warning anywhere. I now serialize every value and validate every page in a script. I wrote that up in [your sitemap lastmod is probably lying](/blog/sitemap-lastmod-and-json-ld-mistakes/).

## 3. Facts in visible text

For a long time my homepage carried a visually hidden section: several paragraphs of third-person biography, clipped to one pixel, with a comment saying it was for LLMs and machine readers.

I removed it. Text that is hidden from people and shown to crawlers is the textbook description of what search engines penalize, and there was no reason to hide it. The same facts are now a normal About section, plus a short definition list:

```html
<dl class="facts">
  <div>
    <dt>Role</dt>
    <dd>Senior Staff Engineer, Avail Project</dd>
  </div>
  <div>
    <dt>Based in</dt>
    <dd>Mumbai, India</dd>
  </div>
</dl>
```

A label and a value in plain HTML is about the easiest thing in the world for a machine to extract. It is also easier for a recruiter to scan. Most of what gets sold as AI optimization is just this: say the fact once, clearly, where everyone can see it.

## 4. Answer the question at the top

Answer engines quote passages. A page that opens with three paragraphs of scene-setting gives them nothing to quote. Every post on this blog now shows its one-sentence summary directly under the title, and I try to make the first paragraph answer the question the title asks.

## 5. The boring parts

- `robots.txt` allows everything and points to the sitemap.
- The sitemap lists every indexable URL with an honest last-modified date.
- An Atom feed carries the full text of recent posts.
- The site is static HTML. There is no client-side rendering for a crawler to wait on.

That last point matters more than any file with "llm" in its name. A crawler that does not run JavaScript still gets every word.

## What I would skip

Stuffing keywords into hidden elements, generating pages of questions nobody asked, and adding schema types that do not describe what is on the page. If a human reader would find it strange, assume the machine will too.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. The live file is at [shrinath.me/llms.txt](https://shrinath.me/llms.txt)._
