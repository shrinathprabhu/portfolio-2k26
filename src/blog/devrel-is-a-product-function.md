---
title: "Nobody Adopted a Database Because of a T-Shirt: DevRel Is a Product Job"
description: "Developers do not adopt a platform because of a conference booth. They adopt it because they got something working in ten minutes. What good developer relations actually consists of, how to measure it, and where teams waste the budget."
date: 2026-11-02
postTags: ["posts", "devrel", "developer-experience", "product"]
category: "DevRel & Developer Experience"
keywords:
  [
    "developer relations",
    "DevRel strategy",
    "developer experience",
    "time to first hello world",
    "developer onboarding",
    "SDK adoption",
    "DevRel metrics",
  ]
image: "/images/blog/devrel-is-a-product-function.png"
faq:
  - q: "What does developer relations actually do?"
    a: "Good DevRel makes it easy for developers to succeed with a product: clear documentation, working examples, fast onboarding, and a channel that carries developer feedback back to the engineering team. Events and content are tools for that goal, not the goal itself."
  - q: "How do you measure DevRel success?"
    a: "By developer outcomes, not reach. Useful measures include time from sign-up to a first working integration, the share of sign-ups that reach production, support questions per active developer, and how many product improvements came from developer feedback."
  - q: "What is time to first hello world?"
    a: "The time it takes a new developer to go from landing on your documentation to seeing your product work in their own environment. It is the most important number in developer adoption, because developers who do not succeed quickly rarely return."
---

A developer hears about your product at a conference. Great talk, nice booth, they even took a sticker. That evening in the hotel, they open the docs to try it.

Step one works. Step two refers to a setting that is not on the screen. The code sample throws an error, because it was written two versions ago. To get an API key they must "contact sales".

They close the laptop. They will never tell you why. The sticker goes on a water bottle, next to nine others.

You paid for the flight, the booth and the stickers. You lost the developer on step two.

That is why I say developer relations is the work of making developers successful with your product, and that it belongs next to product and engineering, not under marketing. Run as a marketing function, it produces impressions, stickers and a busy event calendar. Run as a product function, it produces integrations that reach production.

I have built for developers from the inside: the dashboard where teams configured Arcana's authentication and wallet SDKs, and at Avail the widgets and configurator that let an application add cross-chain swap, send and deposit flows without building them. The lesson from both was the same. Developers do not need to be convinced. They need to be unblocked.

## The misunderstanding

The marketing view of DevRel counts what is easy to count: talks given, followers gained, hackathons sponsored, videos published. Those activities can be useful. But none of them is the outcome.

The outcome is a developer who chose your platform, built something real, and stayed. Everything else is a means to that.

## The number that matters most

**Time to first hello world**: how long it takes a new developer to go from your landing page to seeing the product work in their own project.

Developers evaluate tools in short windows, often a spare half hour. If they get a working result in that window, they come back. If they hit a missing step, an outdated code sample or a sign-up wall, they close the tab and usually never tell you why.

Everything that shortens that time is DevRel work, whoever does it:

- A quickstart that works exactly as written when pasted
- Sensible defaults, so the first call needs minimal configuration
- Test credentials or a sandbox available immediately
- Error messages that say what went wrong and what to do about it
- One obvious path for beginners, with the advanced options out of the way

## Documentation is the product

For a developer tool, the documentation is the main interface. Most developers will spend more time reading your docs than using your dashboard.

Good documentation has four distinct kinds of content, and mixing them is why so many docs feel confusing:

- **A quickstart** that gets one thing working
- **Guides** that solve specific tasks
- **Reference** that lists everything precisely
- **Explanations** of concepts and architecture, for when people want to understand why

Two additions for the current moment. First, your docs are now read by AI coding agents on behalf of developers. Clean structure, complete examples and plain text matter even more, because an agent that cannot work out how to use your SDK will suggest a competitor's. Second, examples must be tested automatically. A sample that broke two versions ago does more damage than no sample.

## Let developers try before they read

The best thing I built for developer adoption was not documentation. It was a configurator: a page that runs the real widget in the browser, lets a developer change settings and see the result immediately, and then hands over the exact code for their configuration.

It works because it reverses the usual order. The developer sees the product working first, then decides it is worth integrating, and only then reads anything. A playground, a live demo with editable code or a one-click starter project all do the same job.

[TODO: one Nexus Widgets configurator number, for example integrations that started from it, or time to a first working widget.]

## Meet different developers where they are

Developers do not all want the same thing. When we shipped Avail's widgets, some teams wanted to install a package, set a few options and move on. Others wanted to own every line of the interface. We shipped both from one codebase: an npm package for the first group, and source components that the second group could copy into their own repository and edit.

A single "right way" to integrate serves one group and frustrates the other. Offering a quick path and a full-control path covers most real teams.

## The feedback loop is the job

The most valuable thing a DevRel person produces is not content. It is information flowing back into the product.

- Which step do people get stuck on?
- What do they try to do that the product does not support?
- Which error do they hit most?
- What did they expect that turned out not to be true?

A DevRel function that cannot change the roadmap is a support desk with a travel budget. The best teams I have seen treat developer friction as bugs, with the same priority as any other bug.

## What to measure

Replace reach metrics with outcome metrics.

- **Time to first successful call or integration**
- **Activation rate:** the share of sign-ups that reach a working integration
- **Production rate:** the share that go live
- **Retention:** are they still active after ninety days?
- **Support load per active developer**, which should fall as docs improve
- **Product changes driven by developer feedback**

Reach still matters for awareness. It is an input. If it is the only thing reported, nobody knows whether the work is succeeding.

## Where budgets are commonly wasted

- **Hackathons with no follow-through.** Hundreds of projects started, almost none maintained a month later. They are worth running only if you treat them as user research and stay in touch with the teams afterward.
- **Content for the algorithm.** Tutorials written to rank, not to help.
- **Community for its own sake.** A large Discord where questions go unanswered is worse than a small one where they are answered in an hour.
- **Swag.** Nobody adopted a database because of a T-shirt. I have been to events where the tote-bag TVL was definitely higher than most booths' user counts.

## Who should do it

The best developer advocates I have worked with are engineers first. They can read the SDK source, reproduce a bug and write a fix. Credibility with developers comes from being able to solve their actual problem, not from presentation skills.

In a small company, DevRel is not a hire. It is a habit: engineers answering questions in public, founders reading support threads, and docs treated as part of the definition of done.

## If you are starting from nothing

1. Watch five developers try to integrate your product without help. Do not intervene. Write down every place they stall.
2. Fix those places.
3. Write one quickstart that works when pasted.
4. Build one live demo or playground.
5. Open one public channel and answer every question within a day.
6. Review developer friction every week alongside the bug list.

That order matters. Fix the product experience before you spend anything on telling people about it. It also happens to be how you earn the kind of mentions that make a product [discoverable by AI assistants](/blog/aeo-geo-ai-discoverability/).
