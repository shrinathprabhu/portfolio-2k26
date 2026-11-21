---
title: "Tech Debt Got a Cheaper Interest Rate. Then AI Opened a New Credit Card"
seoTitle: "Tech Debt in the Age of AI: Cheaper Interest, New Credit Card"
description: "AI made some tech debt cheap to repay and made other kinds grow faster than ever. The useful question is no longer how much debt you have, but which kind: code you can regenerate, or decisions nobody understands any more."
date: 2026-11-09
postTags: ["posts", "ai", "architecture", "engineering"]
category: "AI & Engineering"
keywords:
  [
    "tech debt AI",
    "technical debt in the age of AI",
    "AI generated code quality",
    "refactoring with AI",
    "comprehension debt",
    "code maintainability",
  ]
image: "/images/blog/is-tech-debt-still-debt-in-the-age-of-ai.png"
faq:
  - q: "Does AI eliminate technical debt?"
    a: "No. AI makes local, mechanical debt cheap to fix: outdated syntax, missing tests, duplicated helpers, dependency upgrades. It does not fix structural debt such as a wrong data model or unclear system boundaries, and it creates a new kind, code that nobody on the team actually understands."
  - q: "What is comprehension debt?"
    a: "The gap between the code a team has shipped and the code the team understands. It grows when generated code is merged without anyone building a mental model of it. It is paid back during incidents, when someone has to reason about unfamiliar code under time pressure."
  - q: "Should you still refactor now that AI can rewrite code?"
    a: "Yes, but prioritize differently. Spend little effort polishing code inside a well-defined module, because that is cheap to regenerate later. Spend real effort on boundaries, data models, contracts and tests, because those decide whether regeneration is safe."
---

Every engineering team has the list. "Upgrade the framework." "Add tests to the billing module." "Remove the old API." It sits at the bottom of the backlog, grows a little each quarter, and gets discussed with the enthusiasm normally reserved for dental appointments.

Then coding agents arrived, and something odd happened. A migration that had been postponed for two years got done on a Thursday afternoon. Half the list simply evaporated.

So is tech debt over?

Partly. AI changed the interest rate on technical debt, and it changed it in both directions. Some debt that used to take a quarter to repay now takes an afternoon. Other debt is being created faster than any team has ever created it. And there is a brand new kind that barely existed three years ago. Treating all of it as one number, which most teams still do, leads to the wrong decisions.

## Tech debt was always a metaphor about interest

Ward Cunningham's original point was narrow: shipping something imperfect is like borrowing money. It is fine, even smart, as long as you repay it, because the interest is the extra effort every later change costs you.

So the right question was never "is this code ugly". It was "how much does this slow down the next change, and how often do we change it". Ugly code that nobody touches carries no interest. Clean-looking code built on the wrong model carries a great deal.

AI changes the cost of repayment for some debts and the rate of borrowing for others.

## The debt that got cheap

A large class of debt is mechanical: tedious, well-defined and easy to verify. Coding agents are very good at it.

- **Framework and dependency upgrades.** Migrating an API across hundreds of call sites.
- **Missing tests.** Writing characterization tests around existing behavior before changing it.
- **Inconsistent patterns.** Converting three ways of fetching data into one.
- **Dead code and duplication.** Finding and removing it.
- **Documentation.** Describing what a module does and how to run it.
- **Type coverage.** Adding types to an untyped codebase.

This is the work that used to sit in a backlog for years because it was never urgent enough. If your team still has a "tech debt sprint" full of items like these, most of it can now be done alongside normal work. For this category, the old dread is out of date.

## The debt that did not get cheaper

Structural debt lives in decisions, not in lines of code.

- **A data model that no longer matches the business.** An agent can rewrite every query, but it cannot tell you what the model should be, and migrating live data is as risky as it ever was.
- **Unclear boundaries.** When every module reaches into every other, no tool can change one part safely.
- **Contracts other people depend on.** A public API or SDK cannot be refactored unilaterally.
- **Operational debt.** No rollback path, no monitoring, deploys that depend on one person's memory.
- **Security debt.** Secrets in the wrong place, permissions that grew and were never reduced.

These were always the expensive kind. AI helps with the typing involved in fixing them, which was never the hard part.

## The new debt: code nobody understands

This is the kind I worry about most, and it barely existed three years ago.

When a person writes code, the team gains two things: the code and someone who understands it. When an agent writes code and a human approves it after a quick read, the team gains the code only. Repeat that for a year and you have a system that works, passes its tests, and that nobody can reason about.

Some people call this **comprehension debt**. It carries no interest on normal days. The whole bill arrives during an incident, when someone has to work out why a system is misbehaving while reading it for the first time.

Vibe coding is fine right up until someone has to debug it at 2 a.m. and the vibe was never written down.

There is supporting evidence that this is not just a feeling. Google's DORA research has reported that higher AI adoption was associated with lower delivery stability, and code-analysis firms have reported rising duplication and churn, meaning code rewritten shortly after being written. The exact numbers vary by study. The direction is consistent: more code, produced faster, with less of it understood.

## So is it still a massive debt?

My view, as plainly as I can state it:

- **Code-level debt inside a clear boundary is now cheap.** Do not spend senior time polishing it. If the module has a clear interface and good tests, it can be regenerated when needed.
- **Structural debt is exactly as expensive as before**, and matters more, because clean structure is what makes regeneration safe.
- **Comprehension debt is the new massive debt**, and most teams are not tracking it at all.

The balance has shifted from "how good is the code" to "how good are the boundaries, the tests and our understanding".

## What I do differently now

**Invest in seams, not polish.** Clear module boundaries, typed interfaces and contract tests are what let you replace an implementation without fear. That is where refactoring effort goes.

**Treat tests as the asset.** Code is becoming disposable. A test suite that describes what the system must do is not. I would take a mediocre implementation with strong tests over elegant code with none.

**Require an owner for every merge.** Whoever approves generated code must be able to explain it. If they cannot, it is not ready. This slows things down slightly and it is the single most effective control I know.

**Write down the why.** Agents can read code. They cannot read intentions that were never written. Short decision records and module-level notes are worth more than they used to be, both for people and for the agents working in the codebase. I describe the format in [how I make technical decisions](/blog/how-i-make-technical-decisions/).

**Pay mechanical debt continuously.** There is no longer a good reason to let upgrades and missing tests pile up.

**Slow down at one-way doors.** The speed of generation makes it tempting to move fast everywhere. Data models and public contracts still deserve a slow, written decision.

## A way to audit your own codebase

Ask three questions about each major area of the system:

1. If we deleted this module's implementation and kept only its interface and tests, could we rebuild it in a week?
2. Is there at least one person who can explain how it works without opening the code?
3. If it failed tonight, would we know within minutes, and could we roll back?

Three "yes" answers mean whatever debt is in there is cheap. Any "no" is where your real debt is, regardless of how the code looks.

Tech debt is not dead. It has moved out of the code and into structure and understanding, which is where the judgment in [software engineering](/blog/ai-will-replace-coders-not-software-engineers/) always was.
