---
title: "Nobody Has Ever Canceled a Subscription Because You Used PHP"
description: "Customers buy outcomes, not frameworks. Pieter Levels runs million-dollar products on PHP and SQLite, and Marc Lou's best-known product was a stack, and even that sold because of who was selling it. What that means for how you build."
date: 2026-11-14
postTags: ["posts", "product", "indie-hacking", "architecture"]
category: "Product & Architecture"
keywords:
  [
    "simple tech stack",
    "does tech stack matter",
    "Pieter Levels tech stack",
    "Marc Lou ShipFast",
    "indie hacker tech stack",
    "boring technology",
    "overengineering",
  ]
image: "/images/blog/nobody-cares-about-your-tech-stack.png"
faq:
  - q: "Does your tech stack matter for a startup?"
    a: "Much less than founders think. Customers never see it. The stack matters only where it limits how fast you can ship, how reliably the product runs, and who you can hire. Most early products fail on demand and distribution long before they hit a technical limit."
  - q: "What tech stack does Pieter Levels use?"
    a: "By his own public accounts, plain PHP, jQuery and SQLite on a single VPS, with no frontend framework. He has run products such as Nomad List, Remote OK and Photo AI this way, reportedly earning millions of dollars a year with no employees."
  - q: "When does a simple stack stop being enough?"
    a: "When you can name a specific, measured limit: a query that cannot be made fast, a deploy that blocks several teams, a compliance requirement. Until you can name it, the complexity you add is a cost with no matching benefit."
---

Picture two founders.

The first spends three months on the perfect setup. Microservices, a message queue, Kubernetes, a design system, ninety-eight percent test coverage. It is a beautiful piece of engineering. It has zero users, because it is not finished yet.

The second puts a single PHP file on a cheap server, writes the database to one file on the same machine, and launches on a Tuesday. It makes money by Friday.

The second founder is real. His name is Pieter Levels, and the internet has been arguing about his stack for a decade while he keeps earning from it.

No customer has ever canceled because of the language a product was written in. They cancel because it is slow, confusing, broken or useless to them. The stack is invisible to the people who pay you, so the only question worth asking about it is whether it lets you ship useful things quickly and keep them running.

I say this as someone who enjoys the craft and has spent years on frontend architecture. The craft matters. It is just not what the market pays for.

## The evidence from people who publish their numbers

Indie founders are the cleanest test of this idea, because they share revenue publicly and have no team to hide behind.

**Pieter Levels** is the standard example for a reason. By his own descriptions, his products, including Nomad List, Remote OK and Photo AI, run on plain PHP, jQuery and SQLite on a single server. No React, no Kubernetes, no microservices. He started Nomad List as a public spreadsheet before writing any code. His portfolio is widely reported to earn in the millions of dollars a year with no employees. Whatever the exact figure, it is more than most venture-funded teams with a far more fashionable architecture.

What he optimized instead: speed of shipping, an audience built over a decade of posting in public, and picking problems people already pay for.

**Marc Lou** is the more interesting case, because his best-known product is a tech stack. ShipFast is a Next.js boilerplate. He has said he built more than a dozen products in two years before it, most of which went nowhere, and that he expected ShipFast to make almost nothing. It became a business that he reports has made over a million dollars.

But look at why people bought it. Not because Next.js is special. They bought it from a person they followed, who promised to save them weeks of setup. Then the numbers moved. By the figures he shares publicly, ShipFast went from about $126,000 a month in 2024 to about $2,000 a month in 2026. His own post about it gave no reason. Other people attribute the drop to AI tools: when a coding agent can scaffold authentication and payments in an afternoon, a boilerplate is worth less. That is a reasonable guess, and it is still a guess. Over the same period his newer products, including DataFast, an analytics tool that solves an ongoing problem for a recurring fee, grew and more than covered the gap.

That is the lesson stated twice. The stack was never the asset. The audience and the problem were.

## Why engineers over-invest in the stack anyway

I have done all of these, so this is not a lecture.

- **It is the part we control.** Choosing a database feels like progress. Finding ten people who will pay feels like rejection.
- **We build for our peers.** We picture another engineer reading the code and judging it. Customers will never read it.
- **We copy large companies.** Their architecture solves coordination between hundreds of engineers. Copying it gives you their overhead without their problem.
- **Resume-driven development.** Sometimes the new tool is chosen because it will look good later. That is a real incentive, and it is worth being honest about.

## What simple actually means

Simple does not mean old, and it does not mean careless. It means the fewest moving parts that meet the need.

- **One deployable unit** until a specific part must scale or ship separately.
- **One database** until a specific workload does not fit it.
- **Tools you already know**, so your attention goes to the product.
- **Managed services** for anything that is not your core business, such as auth, email and payments.
- **No abstraction for a second case that does not exist yet.**

A simple stack has a property that is easy to undervalue: one person can hold the whole thing in their head. That is what makes a Friday-night fix possible, and it is why small teams with boring stacks so often out-ship larger ones.

## Where the stack does matter

I do not want to overcorrect. There are cases where the choice is decisive.

- **When the technology is the product.** A database company, a real-time collaboration engine, a wallet handling private keys. Here the engineering is what customers are buying.
- **When the platform dictates it.** A browser extension, a mobile app, an embedded SDK that must be tiny.
- **Performance that users can feel.** Not benchmark numbers, but a page that takes four seconds on a mid-range phone. That is a product problem expressed through a stack choice.
- **Security boundaries.** Where secrets live and what code can touch them is architecture, and it is not negotiable. I cover this in [security practices every company should have](/blog/security-practices-every-company-needs/).
- **Hiring.** An obscure stack shrinks the pool of people who can help you.

Notice that every item here is a consequence the user or the business feels. None of them is "it is more elegant".

## The test I use

When I catch myself wanting a more sophisticated setup, I ask three things:

1. What specific problem, that we have today, does this solve?
2. What does it cost in setup, learning and ongoing maintenance?
3. If we skip it and I am wrong, how hard is it to add later?

Most of the time the honest answers are "none yet", "more than I want to admit" and "not very". So I skip it and go back to the product.

If you want the positive version of this argument, the process I follow when I do have to pick, read [how I choose a tech stack for a new product](/blog/how-i-choose-a-tech-stack/).
