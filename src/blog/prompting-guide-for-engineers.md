---
title: "I Don't Suck at Prompting. My Brief Was Wrong"
description: "Briefing an AI agent is delegation, and delegation is a skill I learned from leading people, mostly by getting it wrong. What a lead already knows about handing over work, and why it transfers almost unchanged to a coding agent."
date: 2026-11-08
postTags: ["posts", "ai", "leadership", "engineering"]
category: "AI & Engineering"
keywords:
  [
    "prompting for engineers",
    "briefing an AI agent",
    "delegation",
    "context engineering",
    "AI coding agent prompts",
    "engineering leadership",
  ]
image: "/images/blog/prompting-guide-for-engineers.png"
---

Type "make the login page better" into an AI tool and you get a purple gradient, three animations and possibly a mascot. The usual conclusion is that the model is overhyped.

Give the same five words to a contractor on their first morning and you get the same purple gradient, plus an invoice.

So the model is not the problem, and neither is my prompting technique. The brief is. And writing a brief is a skill I did not learn from AI. I learned it from leading a team.

## Delegation is the skill

When you hand work to a person, you are transferring context. They are capable and willing, and they know nothing about what is in your head: why this matters, what was tried last quarter, which module nobody should touch, what the customer said on the call.

A new lead usually discovers this the expensive way. You assign something in one sentence, the result comes back technically correct and practically wrong, and your first instinct is to blame the person. It takes a while to accept that they built exactly what you asked for.

An AI agent is that situation with the feedback loop shortened from a week to a minute. It is the most literal new joiner you will ever work with. Where the brief is silent, it guesses, and it guesses the most generic answer available.

## What a good lead hands over

Nobody needs a framework for this. It is what you would say to a strong engineer who joined this morning.

**Why, not only what.** "Add rate limiting to the login endpoint" is a task. "We saw credential-stuffing attempts last week, so add rate limiting to the login endpoint" is a goal. With the reason, a person or a model makes sensible choices you did not specify, such as limiting per account as well as per IP.

**What already exists and what failed.** If you tried something and it did not work, say so. Otherwise they will rediscover it, on your time.

**What must not change.** The public interface another team depends on. The library you have standardized on. Constraints are where your experience gets into someone else's work.

**What done looks like.** Without a finish line, a junior stops too early and an agent never stops. "Existing tests pass unmodified, one new test for the lockout case, no public signatures changed."

**What to do when unsure.** "Ask me first" or "assume, and list your assumptions at the end". Pick one. If you do not, they pick for you.

My check before sending anything: would a contractor have to come back with questions? If yes, the answers belong in the brief.

## 30 lines of context beats 3 model switches

The common reaction to a bad result is to try a different model. Then another. Then conclude that none of them is any good.

It is the same mistake as reassigning a task to a different engineer without changing the one-line description. You will get a different wrong answer.

Thirty lines of context beats three model switches. For an agent working across a repository, that context is mostly not in the prompt at all. It is in what the agent can see and check:

- A short project instruction file with the things you would otherwise repeat: how to run the tests, the conventions, what never to touch.
- A plan before code, for anything non-trivial. Correcting a plan costs a minute. Correcting an implementation costs an hour.
- A way to verify its own work: tests, a type checker, a running preview. An agent that can check converges. One that cannot will tell you it is finished.

This is onboarding. A team with good onboarding documents gets useful work from a new hire in week one, and a team without them gets it in month three. The agent starts over every session, so the documents matter even more.

## Explain, do not shout

Older advice said to write rules in capitals. NEVER do this. ALWAYS do that.

It works about as well on models as it does on people. A rule with no reason gets applied rigidly, including in cases it was never meant for. "Do not use ellipses, because this text is read aloud by a speech engine that cannot pronounce them" produces better behavior than the capitalized version, because the purpose can be generalized.

People work the same way. The rules a team actually follows are the ones it can explain.

## Review it like work from someone new

A good brief raises the quality of what comes back. It does not make it correct.

I read generated code the way I read a pull request from a capable new colleague: assume competence, verify everything. I ask what could be wrong with it, because models, like people, are better at criticizing a draft than at getting it right the first time. And I do not paste secrets or customer data into a prompt, for the same reason I would not email them to a contractor. What agents can be tricked into doing with content they read is its own subject, in [your AI feature is an intern who believes everything it reads](/blog/securing-ai-features-prompt-injection/).

## Why this is good news for some engineers

The engineers getting the most from these tools are not the ones with the cleverest prompts. They are the ones who were already good at writing a ticket, a design note, a handover.

That was always a senior skill, and for years it was optional, because you could do the work yourself instead of explaining it. It is not optional now. It is most of [what remains of the job](/blog/ai-will-replace-coders-not-software-engineers/).
