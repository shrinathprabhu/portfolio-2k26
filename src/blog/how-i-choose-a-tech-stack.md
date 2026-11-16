---
title: "I Pick the Tech Stack Last. Here Is What I Decide First"
description: "The stack is rarely what kills a product, but a wrong choice can slow every later decision. Here is the order I decide things in, the questions I ask before picking anything, and the few choices that are expensive to reverse."
date: 2026-10-30
postTags: ["posts", "product", "architecture", "decision-making"]
category: "Product & Architecture"
keywords:
  [
    "how to choose a tech stack",
    "tech stack for startup",
    "tech stack for MVP",
    "choosing a framework",
    "boring technology",
    "software architecture decisions",
  ]
# image: "/images/choosing-a-tech-stack.png"
faq:
  - q: "What is the best tech stack for a new product?"
    a: "The one your team can ship and debug fastest today. For most products that means the language and framework you already know, one relational database, and a managed host. The stack matters far less than how quickly you can put a working product in front of users."
  - q: "Which tech stack decisions are hard to reverse?"
    a: "Your data model, your authentication and identity model, anything that stores customer data in a vendor's proprietary format, and public API contracts. Frameworks, hosting and UI libraries are far easier to replace than people expect."
  - q: "Should a startup use microservices?"
    a: "Almost never at the start. Microservices solve an organisational problem, many teams deploying independently, that a new product does not have yet. Start with one deployable unit and split only when a specific part needs to scale or ship on its own schedule."
---

Every new product starts with the same meeting. Someone opens a blank document, and within four minutes the room is arguing about React versus Svelte. Nobody has yet said who the customer is.

I understand why. Picking tools is the fun part. It feels like progress, and nobody can reject you for choosing Postgres.

But in eight years of building products, from browser wallets to a consumer app with tens of thousands of users, I have never seen one fail because it picked Vue over React. I have seen several slow to a crawl because someone chose a stack for the company they hoped to be in three years.

So my short answer is this: I choose the stack last. First I decide what the product must do in its first ninety days, who will maintain it, and which decisions I cannot undo. The stack falls out of those answers, and it is usually the most boring option on the table.

## The order I decide things in

Most people start with the framework. I start further up.

1. **What has to be true in ninety days?** A demo for investors, ten paying customers, or an internal tool that replaces a spreadsheet are three different products with three different stacks.
2. **Who is going to build and maintain this?** A stack is a hiring decision and an on-call decision. If I am the only engineer, I choose what I can debug at 2 a.m. without documentation.
3. **Where is the real risk?** If the risk is "will anyone want this", the stack should minimise time to a usable product. If the risk is technical, for example real-time sync or cryptography in the browser, the stack should be chosen around that one hard part.
4. **What is expensive to reverse?** I spend my thinking time here and almost none on the rest.
5. **Only then: which tools?**

## Explain it like I am five

You are moving into a new flat. Some choices are easy to change: the curtains, the sofa, where the TV goes. Pick quickly. If you hate it, swap it on Saturday.

Other choices are not: which city, which building, where the walls are. Get those wrong and you are living with it for years.

A tech stack is the same. Most of it is curtains. A few parts are walls. The trick is knowing which is which, and spending your worry accordingly.

## Reversible and irreversible choices

This is the single most useful lens I know for stack decisions, and it comes from how Amazon talks about one-way and two-way doors.

**Hard to reverse, so decide slowly:**

- **The data model.** Tables, relationships and what you treat as the source of truth. Every feature you build afterwards assumes it.
- **Identity.** How users, teams and permissions relate. Adding multi-tenancy to a product that assumed one user per account is one of the most painful migrations there is.
- **Where customer data lives.** A proprietary backend that holds your data in its own format is quick to start on and slow to leave.
- **Public contracts.** API shapes, URL structures, SDK interfaces. Once other people depend on them, they are no longer yours to change freely.

**Easy to reverse, so decide in minutes:**

- UI framework and component library
- Hosting provider, as long as you deploy standard artefacts
- CSS approach, build tool, linting, state management library
- Most third-party services behind a thin wrapper of your own

Teams routinely invert this. They hold a week of meetings about the frontend framework and then design the data model in an afternoon.

## My default answers

I do not start from zero each time. I keep defaults and only move off them with a reason I can write down in one sentence.

- **One language across the product** if the team is small. Context switching costs more than any performance difference.
- **One relational database.** Postgres handles relational data, JSON documents, full-text search and queues well enough for a very long time. A second datastore has to earn its place.
- **A monolith.** One repository, one deploy. Splitting later is a known, well-documented exercise. Merging a distributed system back together is not.
- **Managed everything** until the bill or a hard limit forces a change. On SendIt, a consumer app I led the frontend for, we stayed on a managed host until real traffic exhausted the plan limits, and only then moved to our own AWS setup. That was the right order. Doing it earlier would have cost weeks we needed for the product.
- **Static where possible.** If a page does not change per user, it should not need a server to render it. This site is plain static HTML for that reason.

## The questions that override a default

I move off a default when one of these is true:

- **The hard part demands it.** A browser extension has to respect the platform's rules. A high-frequency interface, like a bridge showing live transaction status, has different rendering needs from a marketing site.
- **The team already has deep expertise elsewhere.** A team of strong Django engineers should not be moved to Node because a blog post said so.
- **A customer requirement forces it.** Data residency, on-premise deployment, a compliance standard.
- **The ecosystem matters more than the tool.** If the libraries you need exist for one platform and not another, that settles it.

"It is newer" and "it is what large companies use" are not on this list. Large companies choose tools to solve coordination problems between hundreds of engineers. A new product has the opposite problem.

## The innovation budget

Dan McKinley's idea of "innovation tokens" has held up well for me: a team can afford to adopt perhaps one or two unfamiliar technologies at a time. Spend them where they give the product an advantage, not on the database or the deployment pipeline.

When I built a non-custodial wallet as a Chrome extension, the new and risky part was the provider injection and the multi-chain balance logic. Everything around it, the UI framework, the build setup, the testing approach, was deliberately familiar. All the uncertainty was in one place, where it was worth having.

## A short checklist before committing

Before I commit to a stack I write down answers to these:

- Can one engineer run the whole thing locally in under ten minutes?
- Can we deploy in one step and roll back in one step?
- If the main vendor doubled its price or shut down, how many weeks would it take to move?
- Which single component would fail first under ten times the load, and do we know what we would do about it?
- Is there anything here that only one person understands?

If the answers are comfortable, the stack is good enough. The rest of the energy belongs to the product. I have written separately about [why nobody cares about your tech stack](/blog/nobody-cares-about-your-tech-stack/) and about [how I make technical decisions in general](/blog/how-i-make-technical-decisions/).
