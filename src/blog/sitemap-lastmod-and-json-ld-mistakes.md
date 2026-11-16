---
title: "Your Sitemap lastmod Is Probably Lying, and Four Other SEO Bugs I Found on My Own Site"
description: "An audit of my own portfolio turned up a sitemap that claimed every page changed today, structured data that could break on a quotation mark, and hidden text written for crawlers. Here is each bug and its fix."
date: 2026-11-04
dateModified: 2026-11-16
postTags: ["posts", "seo", "eleventy", "structured-data"]
category: "SEO & AI Discoverability"
keywords:
  [
    "sitemap lastmod",
    "JSON-LD",
    "structured data errors",
    "technical SEO",
    "BlogPosting schema",
    "Eleventy SEO",
    "SEO audit",
  ]
# image: "/images/sitemap-lastmod-seo-bugs.png"
---

I audited the SEO plumbing on this site expecting to find nothing. I found five problems. None of them produced an error, a warning, or a visible symptom, which is exactly why they had survived for months.

## 1. Every page claimed it was modified today

My sitemap template wrote the build time into every entry:

{% raw %}
```xml
<url>
  <loc>https://shrinath.me{{ page.url }}</loc>
  <lastmod>{{ "now" | isoDate }}</lastmod>
</url>
```
{% endraw %}

Every deploy told search engines that every page on the site had just changed, including a post I had not touched since April.

`lastmod` is only useful if it is true. A crawler that sees the field change on every fetch while the content stays the same learns that the field carries no information for this site, and stops using it. I was not gaming anything. I had just made a real signal worthless.

The fix is to emit a date only when I know one:

{% raw %}
```xml
<url>
  <loc>https://shrinath.me{{ page.url }}</loc>
  {%- if page.data.dateModified or page.data.category %}
  <lastmod>{{ (page.data.dateModified or page.date) | ymd }}</lastmod>
  {%- endif %}
</url>
```
{% endraw %}

Posts get their `dateModified` if they have one, otherwise their publish date. Pages with no trustworthy date get no `lastmod` at all. An absent field is honest. A wrong one is not.

## 2. Structured data built by string concatenation

My post template produced JSON-LD like this:

{% raw %}
```
"headline": "{{ title }}",
"description": "{{ description }}",
```
{% endraw %}

A title containing a double quote would close the string early and produce invalid JSON. Parsers do not report this. They discard the block, and the page quietly loses its structured data.

Every value now goes through a serializer:

{% raw %}
```
"headline": {{ title | dump | safe }},
```
{% endraw %}

```js
eleventyConfig.addFilter("dump", (obj) =>
  JSON.stringify(obj ?? null).replace(/</g, "\\u003c"),
);
```

`JSON.stringify` handles quotes, backslashes, and newlines. The extra replace escapes `<`, so a value containing `</script>` cannot end the script block early.

## 3. A trailing comma waiting to happen

The same template ended like this:

{% raw %}
```
{% if keywords %}
"keywords": {{ keywords | dump | safe }},
{% endif %}
{% if category %}
"articleSection": "{{ category }}"
{% endif %}
```
{% endraw %}

A post with keywords and no category would end with a comma before the closing brace. That is invalid JSON. Every post happened to have a category, so it had never triggered. I reordered the object so the last property is always present.

Conditional fields at the end of a hand-written JSON object are a bug you have not met yet.

## 4. Schema that said something untrue

My `Person` markup listed my current employer under both `worksFor` and `alumniOf`. `alumniOf` means an organisation the person used to belong to. Two properties were making contradictory claims about the same company. I removed it from `alumniOf`.

The posts were also missing fields that are cheap to provide: `image`, `mainEntityOfPage`, a `dateModified` that is always present, and an `author` that points to the same `@id` as the person described on the homepage. That shared identifier is what connects every post to one author entity.

## 5. Text hidden from people and shown to crawlers

The homepage had a visually hidden block of biography with a comment saying it was for machine readers. However good the intent, content that is hidden from visitors and exposed to crawlers is the pattern search engines treat as deceptive. I turned it into a visible About section. I wrote more about that in [making a personal site readable to AI](/blog/llms-txt-humans-json-ai-discoverability/).

## How to catch these

None of these fail a build. So I added a check that does. After building, a short script extracts every JSON-LD block from every generated page and parses it:

```python
import re, json, glob

for f in glob.glob("_site/**/*.html", recursive=True):
    html = open(f).read()
    for block in re.findall(
        r'<script type="application/ld\+json">(.*?)</script>', html, re.S
    ):
        json.loads(block)  # raises on the first invalid block
```

It does not prove the markup is semantically right. It proves it is parseable, which is the failure that is otherwise invisible.

For the sitemap, the check is simpler: open the generated file and ask whether each date is one you could defend.

## The pattern

All five bugs came from the same place. I wrote the SEO layer once, saw it produce plausible output, and never read that output again. Metadata is code that only machines read, so nobody tells you when it is wrong. You have to go and look.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. More at [shrinath.me/work](https://shrinath.me/work/)._
