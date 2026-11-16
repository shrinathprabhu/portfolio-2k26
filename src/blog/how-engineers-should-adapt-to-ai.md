---
title: "How to Adapt as an Engineer Now That AI Writes Most of the Code"
description: "A practical playbook for working with AI coding tools without losing your skills: what to delegate, what to keep, how to review generated code, and the habits that separate leverage from dependence."
date: 2026-07-28
postTags: ["posts", "ai", "career", "productivity"]
category: "AI & Engineering"
keywords:
  [
    "AI coding tools",
    "AI-augmented development",
    "working with AI",
    "Claude Code workflow",
    "code review AI",
    "engineering productivity",
    "software engineer skills",
    "adapting to AI",
  ]
# image: "/images/adapting-to-ai-engineer.png"
---

The useful question is no longer whether to use AI tools for software work. It is how to use them without becoming worse at the job. I use them daily and lead a team that does the same. This is the working method I have settled on.

## Start by sorting the work

Not all tasks benefit equally. I sort them into three groups.

**Delegate freely.** Boilerplate, test scaffolding, format conversions, documentation, one-off scripts, and first drafts of well-understood components. Mistakes here are cheap and easy to see.

**Delegate with a plan.** Features inside an existing system. Here I write down the approach first: which files, which existing patterns, what done looks like. The tool executes a plan I already believe in. Without the plan, I am reviewing a design I did not choose.

**Keep.** Architecture decisions, security-sensitive code, anything involving money or user data, and debugging where I do not yet understand the cause. I will use a model as a sounding board for these. I do not hand them over.

The mistake is treating all three the same, in either direction: refusing help with boilerplate, or accepting generated authentication code without reading it.

## The specification is the work

The quality of the output tracks the quality of the request. Vague requests produce plausible, generic code. So the skill that matters most has moved upstream: stating the problem precisely.

A good request includes the constraint that is not obvious from the code, the pattern to follow, and what must not change. If I cannot write that down, I do not understand the problem well enough to build it by any method, and that is worth finding out before any code exists.

## Review like it was written by a confident stranger

Generated code has a particular failure mode: it looks finished. Clean names, sensible structure, tests included. That polish is not evidence of correctness.

What I check:

- **Does it belong here?** Does it duplicate an existing utility or ignore a convention the codebase relies on?
- **What did it assume?** Models fill gaps with reasonable defaults. Reasonable in general is often wrong for this system.
- **Do the tests test anything?** Generated tests frequently assert what the code does, not what it should do. A passing test written from the implementation proves very little.
- **What happens on failure?** Empty input, timeouts, partial responses. The happy path is nearly always right. The edges are where I find problems.
- **Did it invent anything?** A function, an option, or a package that does not exist.

If I could not explain a change to a colleague, it does not go in, whoever wrote it.

## Verify by running it

Reading is not verification. The most valuable habit I have built is running the thing and looking at the real result.

While auditing my own site, I found that the diagrams in three blog posts had never rendered. The code that loaded the library looked correct and had been in place for months. Opening the page and counting the diagrams took thirty seconds and showed zero. That is true of human-written code too. It matters more when code arrives faster than anyone can read it carefully.

## Protect the skills you are not using

Skills you stop exercising fade. Three things I do on purpose:

- **Debug by hand first, sometimes.** Forming my own hypothesis before asking keeps the diagnostic habit alive.
- **Read the generated code properly.** It is a steady source of techniques I did not know. Skimming throws that away.
- **Go one layer down.** When a tool uses an API I do not know, I read the documentation for it. The tool being right does not mean I understand it.

Speed is real. On well-defined tasks my own estimate is that I am roughly 50 to 60 percent faster. The risk is spending all of that on more output and none on understanding.

## Change how you spend the saved time

If implementation is cheaper, the constraint moves. I now spend more time on:

- **Exploring alternatives.** Building three approaches and comparing them used to be a luxury. Now it is an afternoon.
- **The parts users feel.** Loading states, error messages, keyboard support, performance. They were always cut for time.
- **Removing things.** Deleting code and dependencies is still entirely a human decision, and it is still where much of the quality comes from.

## For people leading teams

- Make "I do not understand this change" an acceptable thing to say in review. It is the most useful sentence in an AI-heavy codebase.
- Review plans, not only diffs. Catching a wrong approach before the code exists is far cheaper.
- Keep ownership individual. "The assistant wrote it" is not an answer in an incident review. Whoever merged it owns it.
- Teach judgment on purpose, especially to juniors, who no longer get it from years of small tickets.

## The short version

Use the tools for what is cheap to check. Do the thinking before you ask. Read what comes back as if a stranger wrote it. Run it. And keep exercising the understanding that makes you able to tell when the output is wrong, because that ability is the job now.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. Related: [AI will replace developers, not engineers](/blog/ai-will-replace-developers-not-engineers/)._
