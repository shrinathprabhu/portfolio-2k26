---
title: "Nobody Has Ever Canceled a Subscription Because You Used PHP"
description: "Customers buy outcomes, not frameworks. Solo founders run profitable products on PHP and a single server, and even a product that is literally a tech stack sells because of who is selling it. What that means for how you build."
date: 2026-11-14
postTags: ["posts", "product", "indie-hacking", "architecture"]
category: "Product & Architecture"
keywords:
  [
    "simple tech stack",
    "does tech stack matter",
    "solo founder tech stack",
    "boilerplate startup",
    "indie hacker tech stack",
    "boring technology",
    "overengineering",
  ]
image: "/images/blog/nobody-cares-about-your-tech-stack.png"
faq:
  - q: "Does your tech stack matter for a startup?"
    a: "Much less than founders think. Customers never see it. The stack matters only where it limits how fast you can ship, how reliably the product runs, and who you can hire. Most early products fail on demand and distribution long before they hit a technical limit."
  - q: "Can you build a profitable product on a simple stack?"
    a: "Yes. Several well-known solo founders publicly run profitable products on plain PHP, jQuery and a file-based database on one server, with no frontend framework and no employees. What they optimize is shipping speed, audience and problem choice, not architecture."
  - q: "When does a simple stack stop being enough?"
    a: "When you can name a specific, measured limit: a query that cannot be made fast, a deploy that blocks several teams, a compliance requirement. Until you can name it, the complexity you add is a cost with no matching benefit."
---

Picture two founders.

The first spends three months on the perfect setup. Microservices, a message queue, Kubernetes, a design system, ninety-eight percent test coverage. It is a beautiful piece of engineering. It has zero users, because it is not finished yet.

The second puts a single PHP file on a cheap server, writes the database to one file on the same machine, and launches on a Tuesday. It makes money by Friday.

The second founder is not hypothetical. There are solo founders running exactly this setup, and the internet has argued about their stacks for years while they keep earning from them.

No customer has ever canceled because of the language a product was written in. They cancel because it is slow, confusing, broken or useless to them. The stack is invisible to the people who pay you, so the only question worth asking about it is whether it lets you ship useful things quickly and keep them running.

I say this as someone who enjoys the craft and has spent years on frontend architecture. The craft matters. It is just not what the market pays for.

## The evidence from people who publish their numbers

Indie founders are the cleanest test of this idea, because they share revenue publicly and have no team to hide behind.

**The PHP founder.** Some of the most profitable solo businesses on the internet run on plain PHP, jQuery and a database that is a single file, on one server. No React, no Kubernetes, no microservices. Some of them started as a public spreadsheet before any code existed. They earn more than plenty of venture-funded teams with a far more fashionable architecture.

What these founders optimize instead: speed of shipping, an audience built over years of posting in public, and problems people already pay to solve.

**The boilerplate founder** is the more interesting case, because the product is a tech stack. A starter kit: authentication, payments and email wired together in a popular framework, sold to people who want to skip the setup. The pattern is common. Ship a dozen small products that go nowhere, then one of them, the starter kit, takes off.

But look at why people buy it. Not because the framework is special. They buy it from a person they already follow, who promises to save them weeks. And the market can move fast. At least one well-known starter kit went, by its founder's public numbers, from six figures a month to four figures a month within two years. The founder gave no reason. The common guess is AI: when a coding agent can scaffold authentication and payments in an afternoon, a boilerplate is worth less. It is a reasonable guess, and it is still a guess. Meanwhile the same founder's newer products, which solve an ongoing problem for a recurring fee, grew enough to cover the gap.

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
