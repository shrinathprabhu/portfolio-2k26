---
title: "AI Is Coming for the Coders. The Engineers Are Going to Be Fine"
description: "Writing code and engineering software are different jobs that happened to be done by the same person. AI is taking over the first one quickly. Here is what the second one consists of, and how to tell which job you are actually doing."
date: 2026-11-10
postTags: ["posts", "ai", "career", "engineering"]
category: "AI & Engineering"
keywords:
  [
    "will AI replace software engineers",
    "will AI replace programmers",
    "developer vs engineer",
    "future of software engineering",
    "AI coding agents",
    "software engineering career 2026",
  ]
# image: "/images/coders-vs-engineers.png"
faq:
  - q: "Will AI replace software engineers?"
    a: "AI is replacing the task of translating a clear specification into code. It is not replacing the work of deciding what to build, weighing trade-offs, managing risk and being accountable for a system in production. People whose whole job is the first task are exposed. People who do the second are becoming more valuable."
  - q: "What is the difference between a coder and a software engineer?"
    a: "A coder turns a defined task into working code. A software engineer owns an outcome: they clarify the problem, choose what not to build, anticipate how the system fails, and stay responsible for it after it ships. Code is one of an engineer's tools, not the job itself."
  - q: "How can a developer stay relevant as AI improves?"
    a: "Move toward the parts of the work where judgment and accountability matter: understanding the business problem, system design, security, debugging production issues, reviewing generated code critically, and communicating trade-offs to non-engineers."
---

Calculators did not put mathematicians out of work. They put human computers out of work, which was a real job: rooms of people doing arithmetic by hand, all day. The arithmetic got automated. The people who knew which sums were worth doing got busier.

Software is having its calculator moment.

AI is already better than most people at turning a clear instruction into working code, and it improves every few months. If your job is to receive a ticket that says exactly what to build and hand back code that does it, that job is being automated. I use these tools daily and so does the team I lead, so I am not going to pretend otherwise.

But that was never the whole of software engineering. It was only the most visible part.

The distinction I use: **a coder is paid for output, an engineer is paid for outcomes.** Output can be generated. Someone still has to own the outcome.

## The two jobs

For decades these two jobs were bundled, because the only way to get code was to have a person type it.

**The coder's job:**

- Take a specification and implement it
- Know the syntax, the framework, the library APIs
- Produce something that passes the tests

**The engineer's job:**

- Work out what the specification should have said
- Decide what not to build
- Understand how the system fails and what it costs when it does
- Make trade-offs between speed, cost, safety and maintainability
- Stay accountable after it ships

AI unbundled them. The first list is now cheap. The second list is where all the remaining difficulty lives, and there is more of it than before, because so much more code is being produced.

## Explain it like I am five

Building a house needs a bricklayer and an architect.

The bricklayer puts bricks where the drawing says. The architect decides where the walls go, makes sure the roof will not fall in, and is the one who gets the phone call if it does.

Now imagine a robot that lays bricks perfectly, all night, for almost nothing. Wonderful. You still need someone to decide what to build, check the robot did not wall up the front door, and answer for the result.

AI is the brick robot. If laying bricks is all you do, it is time to learn some architecture.

## What AI is good at, stated plainly

I use coding agents every day, and so does the team I lead. It would be dishonest to pretend they are a toy.

They are excellent at boilerplate, at translating between languages and frameworks, at writing tests for existing behaviour, at explaining unfamiliar code, and at producing a working first version of something well understood. Work that took me a day now takes an hour. For a prototype, the improvement is larger.

A lot of that work was what junior developers used to do to learn. That is the uncomfortable part, and I will come back to it.

## What it is not good at

The limits are just as consistent.

**It does not know what you did not tell it.** A model works from the prompt and the files it can see. It does not know that the payments team is mid-migration, that this endpoint is called by a partner who cannot change their integration, or that the last time someone touched this module it caused an outage. Most real engineering mistakes come from missing context, not missing syntax.

**It optimises for plausible, not for correct.** Generated code compiles, reads well and passes the tests it wrote for itself. It can still do the wrong thing in a confident way. A well-known 2025 study by METR found that experienced open-source developers working in their own mature codebases were about 19 percent slower with AI tools, while believing they were faster. The tools have improved since, but the gap between feeling productive and being productive is real, and noticing it is an engineering skill.

**It cannot be accountable.** When the system loses customer data at 3 a.m., a person answers for it. Accountability is not a technical capability. It is a social and legal one, and organisations will keep attaching it to humans.

**It does not say no.** Ask a model for a feature and it will build it. A good engineer's most valuable sentence is often "we should not build this" or "there is a much smaller version that gets us the same result".

## A test you can apply to your own week

Look at your last five working days and sort the hours:

- Hours spent typing out something where you already knew exactly what was needed
- Hours spent figuring out what was needed, why something broke, or which of two approaches was safer

The first group is being automated. The second is the job that remains. If most of your week is in the first group, the answer is not to type faster. It is to move.

## Where the engineer's work is growing

Cheaper code means more code, and more code means more of everything around it.

- **Specification.** The clearer the brief, the better the output. Writing a precise brief is engineering. I wrote a [prompting guide for engineers](/blog/prompting-guide-for-engineers/) on this.
- **Review.** Someone has to decide whether generated code belongs in the system. That requires more architectural understanding than writing it did.
- **System design.** Agents build components well. Deciding how components fit together, and where the boundaries and failure points are, is still a human call.
- **Security.** Generated code inherits common vulnerabilities, and AI features add new ones such as [prompt injection](/blog/securing-ai-features-prompt-injection/).
- **Debugging in production.** Incidents involve partial information, time pressure and several systems interacting. This is where experience counts most.
- **Deciding what matters.** Understanding the user and the business well enough to choose the right problem.

## The honest problem: how juniors become seniors

The work AI absorbed first is the work people used to learn on. If nobody hires juniors to do the simple tasks, where do the next senior engineers come from?

I do not think the answer is to stop juniors using AI. It is to change what we ask of them: explain every line you submit, own a small system end to end, be on the incident call, write the design note before the code. On my team, the gap I watch is not between people who can and cannot produce code. It is between people who can and cannot judge it. I look for the same thing when [hiring engineers now](/blog/hiring-engineers-in-the-ai-era/).

## What I would tell an engineer early in their career

- Learn fundamentals that outlast tools: networking, data modelling, how browsers and databases actually work, security basics.
- Get close to users and to the business. Know why the thing you are building matters.
- Practise explaining trade-offs in plain language to people who are not engineers.
- Own something in production and stay with it through at least one bad incident.
- Use AI heavily, and never submit what you cannot explain.

The title on the job posting may stay the same. The job behind it has already changed, and it has moved toward the part that was always the hardest.
