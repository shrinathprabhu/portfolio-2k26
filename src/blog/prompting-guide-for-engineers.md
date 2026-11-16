---
title: "You Are Not Bad at Prompting. You Are Bad at Briefing"
description: "Good prompting is not a bag of magic phrases. It is the same skill as writing a clear ticket or briefing a new team member: context, goal, constraints, and a definition of done. A practical guide with the structure I use every day."
date: 2026-11-08
postTags: ["posts", "ai", "productivity", "engineering"]
category: "AI & Engineering"
keywords:
  [
    "prompting guide",
    "prompt engineering for developers",
    "how to write better prompts",
    "AI coding agent prompts",
    "context engineering",
    "Claude Code prompts",
  ]
# image: "/images/prompting-guide.png"
faq:
  - q: "What makes a good prompt?"
    a: "A good prompt gives the model what a capable new colleague would need: the goal and why it matters, the relevant context, the constraints, what done looks like, and what to do when something is unclear. Most poor results come from missing context, not from poor wording."
  - q: "Do prompt tricks like 'act as an expert' still work?"
    a: "They matter far less with current models. Role statements and emphatic capital letters add little. Specific context, clear success criteria and concrete examples of what you want add a lot."
  - q: "What is context engineering?"
    a: "Deciding what information the model has in front of it when it works: project instruction files, relevant code, documentation, examples and tool access. For coding agents it matters more than the wording of any single prompt."
---

You type "make the login page better" into an AI tool. It returns a purple gradient, three new animations and a mascot. You sigh, close the tab, and tell a colleague that AI is overhyped.

Now imagine saying the same five words to a human contractor on their first day. You would get the same purple gradient. The only difference is that the human would invoice you for it.

The problem was never the model. It was the brief.

The best prompt is the one you would give a smart colleague who joined the company this morning. They are capable, they will work hard, and they know absolutely nothing about your project. Almost every disappointing AI result I see comes from forgetting that last part.

This guide is the structure I use every day with coding agents and general assistants. There are no magic phrases in it.

## The mental model

A language model has broad knowledge and no knowledge of your situation. It does not know your codebase's conventions, what you tried yesterday, who the audience is, or which of five reasonable interpretations you meant. Where the brief is silent, it guesses, and it guesses the most generic answer.

So the job is not to "trick" the model into being smart. It is to transfer the context that is in your head and not on the page.

A useful check before sending: if I handed this exact text to a contractor, would they have to come back with questions? If yes, answer those questions in the prompt.

## The five parts of a good brief

**1. The goal, and the reason behind it.**
"Add rate limiting to the login endpoint" is a task. "Add rate limiting to the login endpoint because we saw credential-stuffing attempts last week" is a goal. The second version lets the model make sensible choices you did not specify, such as limiting by account as well as by IP.

**2. The context.**
What already exists, what you have tried and ruled out, and which files or documents matter. If a previous attempt failed, say how. This saves the model from rediscovering it.

**3. The constraints.**
What must not change. Which libraries to use or avoid. Performance limits, style conventions, backwards compatibility. Constraints are where your experience enters the result.

**4. What done looks like.**
Without a finish line, a model either stops too early or keeps going. "Done means the existing tests pass, there is a new test for the lockout case, and no public function signatures changed."

**5. What to do when unsure.**
"If the requirement is ambiguous, ask before writing code" or "make a reasonable assumption and list it at the end". Pick one. Otherwise the model decides for you.

## A before and after

A weak brief:

> Refactor the checkout module to be cleaner.

A strong one:

> The checkout module has grown to a point where adding a payment method means editing four files. I want to add two more methods next month, so the goal is to make that a one-file change. Keep the public interface used by the cart exactly as it is, since another team depends on it. Do not change behaviour: the existing tests must pass unmodified. Propose the structure first and wait for my approval before editing. If something in the current code looks like a bug, note it but do not fix it in this change.

The second takes ninety seconds longer to write. It removes an hour of correcting a result that was technically responsive and practically useless.

## Explain, do not shout

Older advice said to write rules in capitals: NEVER do this, ALWAYS do that. With current models this tends to backfire. They follow emphasised rules too rigidly, including in cases where the rule was never meant to apply.

A reason works better than a command. "Do not use ellipses, because this text is read aloud by a speech engine that cannot pronounce them" produces better behaviour than "NEVER use ellipses", because the model can generalise from the purpose.

## Examples are powerful, so use them carefully

Showing the model an example of what you want is one of the strongest signals you can give. It is also the easiest to overdo. Give one example and you will get back something very close to that example, including details you did not intend as requirements.

If you want a pattern rather than a copy, give two or three examples that differ from each other, and say what they have in common. Or describe the qualities you want in plain language and skip examples entirely.

## For coding agents: context beats phrasing

When an agent works across a repository for many steps, the wording of one message matters less than what it has access to.

- **A project instruction file.** Most agents read a file at the root of the repository on every session. Put the things you would otherwise repeat there: how to run tests, conventions, what never to touch. Keep it short and specific to what the agent gets wrong.
- **Plan before code.** For anything non-trivial, ask for a plan and review it. Correcting a plan costs a minute. Correcting an implementation costs an hour.
- **Give it a way to check its own work.** Tests, a type checker, a linter, a running preview. An agent that can verify converges on a correct result. One that cannot will tell you it is done.
- **Small, reviewable steps.** A change you can read in five minutes is a change you can trust.
- **Start fresh when the thread is confused.** A long conversation full of abandoned approaches degrades results. A new session with a clean summary is often faster.

## Ask for the right shape of answer

Say what format you want and who it is for. "Give me the recommendation first, then the reasoning, in under 200 words, for a manager who is not technical" gets a usable answer. Leaving it open gets a long one.

For decisions, ask for options with trade-offs, not a single answer. For reviews, ask it to report everything it finds and rank by severity. For research, ask it to separate what it verified from what it inferred.

## Treat the output as a draft from a capable stranger

A good brief raises the quality of what comes back. It does not remove the need to check it.

- Read generated code as you would a pull request from someone new: assume competence, verify correctness.
- Ask "what could be wrong with this" as a follow-up. Models are better at criticising a draft than at getting it perfect the first time.
- Never paste secrets, customer data or private keys into a prompt.
- Be careful with content the model reads from outside sources. Text in a web page or document can contain instructions aimed at the model. I cover this risk in [securing AI features](/blog/securing-ai-features-prompt-injection/).

## The short version

Write the goal and why. Give the context you have and it lacks. State the constraints. Define done. Say what to do when unsure. Then review the result as if a person wrote it.

This is the same skill as writing a good ticket or a good design note. Engineers who were already good at that are finding AI tools far more useful than those who were not, which says a lot about [which skills are being replaced and which are not](/blog/ai-will-replace-coders-not-software-engineers/).
