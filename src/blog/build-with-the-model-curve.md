---
title: "Don't Build Anything the Next Model Release Will Give Away for Free"
description: "Many AI products are clever workarounds for what today's models can't do yet, and each new release quietly deletes a few of them. The question the teams pulling ahead keep asking: when the model gets twice as good, does my product get better or less necessary?"
date: 2026-11-19
postTags: ["posts", "ai", "product", "startups"]
category: "Product & Architecture"
keywords:
  [
    "AI startup strategy",
    "AI wrapper startups",
    "building AI products",
    "AI moat",
    "model agnostic architecture",
    "AI product strategy",
  ]
image: "/images/blog/build-with-the-model-curve.png"
faq:
  - q: "Is it risky to build a startup on top of an AI model?"
    a: "It depends on whether better models help or replace you. Products that work around a model's current weaknesses lose value with every release. Products built on proprietary data, deep workflow integration, distribution and trust in a specific domain get better as the models improve."
  - q: "What is an AI wrapper?"
    a: "A product whose main value is a prompt and an interface around someone else's model. Wrappers can find customers quickly, but they are easy to copy and easy for the model provider to absorb, unless they own something else, such as data, a workflow or a customer relationship."
  - q: "How do you stay independent of one AI model provider?"
    a: "Keep the model behind a thin interface in your own code, so switching is a change in one place. Build an evaluation set from real cases, so you can test a new model against your actual work in a day instead of guessing from benchmarks."
---

A small team spends six months on something genuinely clever. The model they use cannot read long documents, so they build a pipeline that splits documents into pieces, summarizes each piece, ranks the summaries and stitches the answer back together. It works. Customers like it. It is the heart of the product.

Then a model release arrives that reads the whole document at once and answers better than the pipeline did.

Nobody did anything wrong. The pipeline was good engineering. It was also a bet against the direction of the entire industry, and the industry won.

Versions of this story have played out repeatedly over the last few years. Context windows went from a few thousand tokens to hundreds of thousands, and in some models a million. Major providers added native structured output, so the elaborate code that coaxed models into returning valid data became optional. The main assistants started accepting file uploads, and a wave of "chat with your PDF" products lost much of their reason to exist.

## The one question

When I look at an AI product, my own or someone else's, I ask one thing:

**When the model gets twice as good and half the price, does this product get better, or less necessary?**

If the answer is "better", the product is building with the curve. Every release is a free upgrade. If the answer is "less necessary", it is building against the curve, and every release is a threat.

Most products have parts of both. The useful work is knowing which parts are which.

## What gets eaten

Some categories are consistently at risk:

- **Workarounds for model weaknesses.** Chunking around short context, retry loops around unreliable formats, prompt tricks to stop a model getting arithmetic wrong. All useful today, all on the list of things model makers are actively fixing.
- **Thin wrappers.** A prompt and an interface around someone else's model. Fast to launch, fast to copy, and one feature announcement away from irrelevance.
- **Generic assistants.** A general chat interface competes directly with the companies that make the models, who have more money, more users and the models themselves.
- **Whatever the platform will obviously ship next.** If it is the natural next feature for the model provider or the operating system, assume they are already building it.

None of these is forbidden. A wrapper can be a fine way to find customers and learn what they need. The mistake is treating it as the business rather than the first step.

## What gets better

The other side of the list is where better models act as a tailwind:

- **Data you own.** Your customers' history, outcomes and edge cases, which no model provider has. Better models get more out of it.
- **Deep workflow integration.** Living inside the tools and processes a specific kind of customer already uses, with the permissions, approvals and records that come with them. That is slow, unglamorous work, which is exactly why it holds.
- **Trust in a domain.** Compliance, audit trails, accuracy guarantees, someone accountable when it goes wrong. In regulated or high-stakes work, this is most of what customers pay for.
- **Distribution.** An audience, a community, a channel that already reaches your buyers. I go into how recent companies built that in [your first customer will not come from marketing](/blog/how-startups-get-their-first-customers/).
- **Evaluation and judgment.** Knowing what a good answer looks like for your customers, written down as tests. That knowledge is what lets you adopt each new model safely and quickly.

## What the people pulling ahead do differently

The teams that stay ahead are rarely the ones with the cleverest prompts. They tend to share a handful of habits.

**They plan for cheap intelligence.** They assume today's expensive capability will be cheap within a year, and design the product as if it already were. They prototype with the best model available now and expect to run on something cheaper later.

**They keep a kill list.** Every workaround they build for a model limitation is written down as temporary, with the condition that would remove it. When a release fixes the limitation, they delete their code happily instead of defending it.

**They own their evaluations.** A set of real cases with known good answers, run against every candidate model. When a new model launches, they know within a day whether it is better for their work, while everyone else is reading benchmark threads. This is the AI version of the point in [tech debt got a cheaper interest rate](/blog/is-tech-debt-still-debt-in-the-age-of-ai/): the tests are the asset.

**They keep the model behind a seam.** One small layer in their own code talks to the model. Swapping providers is a change in one place, not a rewrite. That flexibility is worth a lot when prices and quality shift every few months.

**They spend the saved time on customers.** Building got cheaper for everyone. The teams ahead put the difference into understanding one kind of customer better than anyone else, which is the one input the models cannot supply.

## Five questions for your own product

1. Which parts of the product exist only because the model cannot do something yet?
2. If the model provider shipped your main feature tomorrow, what would customers still pay you for?
3. What do you know about your customers that is not on the public internet?
4. How long would it take you to test a new model against your real work?
5. How many lines of code would change if you switched providers?

If the answers are "most of it", "not much", "nothing", "weeks" and "thousands", that is not a death sentence. It is a list of what to build next.

## Ride the curve

The capability curve is the most predictable thing in this industry right now. Models get better and cheaper, and they do it on a schedule nobody controls.

Building against that curve is like building a business on the price of something everyone knows is falling. Building with it means every release your competitors fear is an upgrade you get for free. The longer argument for where durable value sits is in [building got cheap, everything else did not](/blog/how-to-ship-products-in-2027/).
