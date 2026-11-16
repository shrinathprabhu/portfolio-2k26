---
title: "Your Next Customer Will Ask ChatGPT, Not Google. Will It Mention You?"
description: "People now ask ChatGPT, Perplexity, Gemini and Google's AI Overviews before they click anything. A practical guide to answer engine optimisation and generative engine optimisation: what the research supports, what is hype, and what to do first."
date: 2026-11-13
postTags: ["posts", "seo", "ai", "growth"]
category: "Sales & Growth"
keywords:
  [
    "AEO",
    "GEO",
    "answer engine optimization",
    "generative engine optimization",
    "AI discoverability",
    "how to rank in ChatGPT",
    "AI search optimization",
    "llms.txt",
  ]
# image: "/images/aeo-geo.png"
faq:
  - q: "What is the difference between SEO, AEO and GEO?"
    a: "SEO is about ranking pages in a list of search results. AEO, answer engine optimisation, is about being the source of a direct answer. GEO, generative engine optimisation, is about being cited or mentioned when an AI model writes a response. In practice they overlap heavily and share the same foundations."
  - q: "How do you get cited by ChatGPT or Perplexity?"
    a: "Publish clear, specific, well-structured answers to questions people actually ask, support them with data and named sources, make sure AI crawlers can access your pages, and earn mentions on other reputable sites. Engines cite content that is easy to extract and that other sources corroborate."
  - q: "Does llms.txt improve AI visibility?"
    a: "There is no solid public evidence that it changes how often AI engines cite a site, and major providers have not committed to using it. It is cheap to add and harmless, but it should be the last item on the list, well after content quality, crawlability and off-site mentions."
---

Watch how someone under thirty looks for a product now. They do not type three keywords into a search box and open ten tabs. They ask a full question to an AI assistant, "what is the best tool for X if I am a small team with no budget", and they read one answer.

That answer names three or four options. If you are one of them, you are in the running. If you are not, you do not exist, and no amount of being on page one of Google helps, because nobody went to page one.

That shift is what the acronyms are about. **AEO** is answer engine optimisation. **GEO** is generative engine optimisation. Both mean roughly the same thing: getting AI systems to find you, understand you and mention you.

The short version of how: answer real questions clearly and early in the page, back your claims with specifics that can be checked, and be mentioned by sources other than yourself. Most of the rest is detail, and a fair amount of what is sold as "GEO" is ordinary good publishing with a new name.

I rebuilt my own site with this in mind, so this guide separates what the evidence supports from what is speculation.

## The terms, briefly

- **SEO, search engine optimisation:** ranking in a list of links.
- **AEO, answer engine optimisation:** being the direct answer, in a featured snippet, a voice reply or an AI summary.
- **GEO, generative engine optimisation:** being cited or mentioned when a language model composes a response, in ChatGPT, Perplexity, Gemini, Claude or Google's AI Overviews.

They are less different than the vocabulary suggests. AI engines with web access usually run a search, retrieve a handful of pages, and write from those. If you are not retrievable, you cannot be cited. Classic SEO is the foundation of the other two.

## How answer engines choose what to cite

A simplified version of what happens when someone asks a question:

1. The engine turns the question into one or more searches.
2. It retrieves candidate pages.
3. It extracts the passages that answer the question.
4. It writes a response and cites some of the sources.

Each step is a place where you can drop out. You need to be found in step 2, be easy to extract from in step 3, and be credible enough to keep in step 4.

### Explain it like I am five

Think of the AI as a student writing an essay the night before it is due. They grab a few books, flip to the pages that answer the question, copy the clearest sentences, and list the books at the end.

Which books get used? The ones that were on the shelf, that answered the question on the first page, and that sounded like they knew what they were talking about.

Your job is to be that book.

## What the research supports

The most cited study is from researchers at Princeton and collaborators, published at KDD in 2024, which coined the term GEO. In controlled tests it found that certain changes increased how visible a source was in generated answers, by up to around 40 percent in their benchmark:

- **Adding relevant statistics**
- **Adding quotations from credible sources**
- **Citing sources**
- **Writing fluently and clearly**

Keyword stuffing, the old SEO habit, did not help and sometimes hurt.

Treat the numbers as directional. They come from an experiment, not a guarantee for your site. But the direction matches common sense: models prefer content that is specific, attributable and easy to quote.

Later industry studies add two points worth knowing. Most citations for a brand point to pages the brand does not own, such as reviews, forums and articles. And adding structured data on its own has shown little measurable effect on citations. Both suggest that what others say about you matters more than markup.

## The practical playbook

### 1. Answer the question in the first paragraph

Engines extract passages. A page that takes 300 words to reach the point is harder to quote than one that opens with the answer. State the conclusion, then explain.

### 2. Write for one question per section

Use headings that match how people ask: "How much does X cost", "What is the difference between X and Y". Each section should make sense if lifted out of the page alone, without "as mentioned above".

### 3. Be specific

Numbers, dates, names, steps, comparisons. "Reduces load time" is not quotable. "Cut image weight from 12.6 MB to under 200 KB" is. Specifics are what a model can reuse, and they are what distinguishes you from generic generated text.

### 4. Show who is speaking and why they should be trusted

Named author, role, experience, and a way to verify it. First-hand experience is the one thing a model cannot produce for itself, so it is the most valuable thing you can publish.

### 5. Keep facts in visible text

Do not hide key information in images, in scripts that need to run, or in interface elements that require a click. If a plain text extraction of your page would miss it, assume the engine misses it.

### 6. Make the site technically easy to read

- Server-rendered or static HTML for content. Many AI crawlers do not run JavaScript.
- Check `robots.txt`. A surprising number of sites block AI crawlers by accident through a firewall or bot-protection setting.
- Fast responses, clean URLs, an accurate sitemap with honest modification dates.
- Structured data that matches what is visible on the page. It helps machines disambiguate who you are, even if it does not directly raise citations.

### 7. Earn mentions elsewhere

This is the part most guides skip, because it cannot be done on your own site. Models learn about entities from the whole web.

- Be present where your topic is discussed: communities, forums, industry publications.
- Get listed on comparison and review sites relevant to your field.
- Publish original data or opinions that others reference.
- Keep your name, role and description consistent across profiles, so the model connects them as one entity.

### 8. Keep content current

Engines with live search favour recent pages for questions where freshness matters. Update important pages and show the real date you did so.

## What I would not spend time on

- **Chasing llms.txt as a ranking factor.** I publish one because it is a few lines of work. There is no good evidence it affects citations.
- **Writing for the model in a way you would not write for a person.** Hidden text and stuffed FAQ blocks are the same mistake people made with search engines.
- **Mass-producing AI-generated pages.** They add nothing a model does not already have, so there is nothing to cite.
- **Buying a tool before fixing basics.** If your key pages do not answer a question in the first paragraph, no dashboard will help.

## How to measure it

Measurement is still immature, so keep it simple.

- Ask the engines the questions your customers ask, on a schedule, and record whether you appear and what is said.
- Watch referral traffic from AI products in your analytics.
- Track branded search volume. People who hear about you from an AI answer often search your name next.
- Ask new customers how they found you. "ChatGPT recommended you" is now a common answer.

Expect fewer clicks than search used to send, and better-qualified ones. Someone who arrives after an AI has already explained what you do is further along than someone skimming ten blue links.

## The order I would do it in

1. Make sure crawlers can reach and read your pages.
2. Rewrite your ten most important pages to answer one clear question each, starting with the answer.
3. Add specifics and named authorship.
4. Fix structured data and keep it truthful.
5. Spend the rest of your effort on being mentioned elsewhere.

None of this is a trick. The engines are trying to find the clearest trustworthy answer, so the reliable strategy is to be that. It is the same reasoning behind [why engineers should write in public](/blog/why-engineers-should-write-in-public/).
