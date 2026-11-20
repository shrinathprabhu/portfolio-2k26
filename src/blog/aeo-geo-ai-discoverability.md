---
title: "AEO Is SEO With Better PR. Here's What I Actually Did"
description: "Answer engine optimization and generative engine optimization are mostly good publishing with new names. A first-hand account of how this site is built to be read by AI crawlers, what I skipped, and the part no build step can do for you."
date: 2026-11-13
dateModified: 2026-11-20
postTags: ["posts", "seo", "ai", "architecture"]
category: "Sales & Growth"
keywords:
  [
    "AEO",
    "GEO",
    "answer engine optimization",
    "generative engine optimization",
    "AI discoverability",
    "llms.txt",
    "static site SEO",
  ]
image: "/images/blog/aeo-geo-ai-discoverability.png"
---

Somewhere in the last two years, SEO hired a publicist. The work is now called AEO, answer engine optimization, or GEO, generative engine optimization, and it comes with new tools, new consultants and new invoices.

The underlying shift is real. People ask an assistant a full question and read one answer that names three or four options. If you are not one of them, ranking on page one does not help, because nobody visited page one.

What you do about it is less new than the vocabulary. An assistant with web access runs a search, fetches a handful of pages, pulls out the passages that answer the question, and cites some of them. So you need to be fetchable, easy to extract from, and credible enough to keep. Two of those three are things you build. This is what I built on this site, with each item checked against the repository and not against a guide.

## The page is finished before it leaves the server

This site is static HTML, generated at build time by Eleventy and served as files. There is no client-side rendering of content. A crawler that does not run JavaScript, which describes many AI crawlers, receives the same article a browser does.

I did not choose this for AEO. I chose it because a blog post does not change per visitor, so nothing needs to compute it per request. It turns out that the cheapest architecture is also the most readable one for a machine.

The same rule applied on a harder project. Nexus Fastbridge is a React single-page app, and each chain needed a page that search engines could index. I did not move the app to a server-rendering framework. I wrote a build step that generates static HTML for each chain, and the app hydrates on top of it.

If your content only exists after a script runs, fix that before anything else in this post.

## Crawlers are allowed in

The `robots.txt` here allows everything except the error page and points to the sitemap. That sounds too obvious to mention. It is worth checking anyway, because the usual way sites block AI crawlers is by accident, through a bot-protection setting somebody enabled once.

The sitemap only includes a last-modified date for pages where a real edit date is known. Stamping every URL with the build time teaches crawlers to ignore the field.

## A strict security policy and one third-party script

Every page is served with a Content Security Policy that starts from `default-src 'none'` and allows scripts, fonts, images and requests only from this origin, with one exception: cookie-free analytics from Cloudflare, which already serves the site. Fonts are self-hosted. There is no marketing tag, no chat widget and no embed from anyone else's domain.

This is a security decision first, and I explain the reasoning in [the cheapest security tool you own is the delete key](/blog/reduce-attack-surface-delete-first/). It has two side effects that matter here. The pages are small and fast, because almost nothing loads that I did not write. And nothing on the page rewrites the content after it loads, so what a crawler reads is what I published.

The analytics is deliberately small: page views, referrers and page speed, with no cookies and nothing that follows a person between visits. That is enough to see whether AI products send anyone here, without loading a full marketing tag.

## Structured data that matches the visible page

Each post carries JSON-LD describing the article: title, dates, author and section. Posts with a questions section also carry FAQ markup, generated from the same data that renders the visible questions, so the markup cannot say something the page does not.

I do not expect this to raise citations by itself. Industry studies so far suggest structured data alone has little measurable effect. What it does is help a machine work out who is speaking, which is why every post also has a named author, a role and a link to work that can be checked.

## llms.txt, with low expectations

There is an `llms.txt` at the root. It is generated at build time and lists the main pages and every post with its description.

It took a few lines of template. There is no solid public evidence that it changes how often an assistant cites a site, and the major providers have not committed to reading it. I added it because it was nearly free, and I would not have spent an afternoon on it.

## Writing so a passage can be lifted

The build makes the site readable. It does not make it worth quoting.

The most cited research here is a paper from Princeton and collaborators, presented at KDD in 2024, which coined the term GEO. In their benchmark, adding statistics, quotations from credible sources and citations made a source more visible in generated answers, by up to around 40 percent. Keyword stuffing did not help. Treat the number as directional. It is an experiment, not a promise.

What I took from it for my own writing:

- Get to the point early. An engine extracts passages, and a page that takes 300 words to arrive is harder to quote.
- Make each section stand alone, with no "as mentioned above".
- Prefer a specific that can be checked over an adjective.
- Say whose experience it is. First-hand experience is the one thing a model cannot generate for itself.

That last point is the reason this post is a case study and not a playbook. The earlier draft was a playbook. It said nothing a model did not already have.

## What I skipped

- Buying a visibility tool before fixing the basics
- Mass-producing pages for long-tail questions
- Hidden text and stuffed question blocks written for a model and not a reader
- Treating `llms.txt` as a ranking factor

## The part a build step cannot do

Everything above happens on my own domain, and that is the smaller half.

Models learn about a person or a product from the whole web. Studies of brand citations keep finding that most of them point to pages the brand does not own: reviews, forums, articles, other people's posts. No template fixes that. It comes from doing work that other people mention, and from being present where your subject is discussed.

So I am not going to claim results here. What I can say is that none of this was a trick, and most of it I would have done anyway. Static pages, a strict policy, visible authorship and specific writing are just a well-built site. AEO is the reason people are finally willing to pay for one. The rest of the answer is [writing in public](/blog/why-engineers-should-write-in-public/) for long enough that other people mention you.
