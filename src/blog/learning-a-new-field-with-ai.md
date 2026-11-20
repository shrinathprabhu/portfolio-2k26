---
title: "I Learned Web3 the Slow Way in 2021. Here's How I'd Learn It Now"
description: "AI makes it possible to get fluent in an unfamiliar field in days instead of months, if you use it as a tutor rather than an oracle. The method I'd use today: get the map first, learn from a real problem, build a toy early, and check everything against primary sources."
date: 2026-11-20
postTags: ["posts", "ai", "learning", "career"]
category: "AI & Engineering"
keywords:
  [
    "learning with AI",
    "how to learn a new field fast",
    "AI as a tutor",
    "learning new technology with ChatGPT",
    "switching industries as an engineer",
    "self-learning with AI",
  ]
image: "/images/blog/learning-a-new-field-with-ai.png"
faq:
  - q: "Can you learn a new technical field with AI?"
    a: "Yes, much faster than before, if you use it to build understanding rather than to get answers. Ask it for a map of the field, learn by working on a real problem, explain concepts back and ask where you are wrong, and verify anything important against documentation, specifications or source code."
  - q: "What are the risks of learning from AI?"
    a: "Models can state outdated or invented details with complete confidence, such as functions that do not exist or rules that changed. They also give you the consensus view and miss the edge cases experts argue about. Primary sources and people with real experience fill both gaps."
  - q: "How long does it take to learn a new domain as an engineer?"
    a: "Enough to contribute usefully can take days to a few weeks with good tools and a real problem to work on. Judgment, knowing what goes wrong and why, still takes longer, because it mostly comes from shipping things and living with the consequences."
---

In January 2021 I joined a startup in an industry I had never worked in. I had built Chrome extensions before. I had never built anything in Web3.

I learned it the way everyone learned a new field then: documentation, source code, and the people around me. That works, but it is slow, and a lot of the time goes into simply finding out which questions to ask.

If I joined that company today, I would learn it differently. Not because I would read faster, but because I would have a patient tutor available at any hour, one that never sighs at the fifth "sorry, what does that mean?" The catch is that this tutor is sometimes confidently wrong. The method below is mostly about getting the speed without inheriting the mistakes.

## Get the map before the territory

The slowest part of entering a new field is not learning the details. It is not knowing what the details are, or how they connect.

So the first thing I would ask for is a map, not an answer:

- What are the ten concepts everything else depends on?
- What vocabulary will I hear in my first week, and what does each word actually mean?
- What do experienced people in this field disagree about?
- What do newcomers usually get wrong?

The last two are the valuable ones. Disagreements show you where the field is still unsettled. Common newcomer mistakes are a list of traps you can avoid instead of discovering.

An hour on this gives you a skeleton to hang everything else on. Every new thing you read afterward has a place to go.

## Learn from your problem, not a curriculum

Courses teach a field in the order that is convenient to teach it. Your job needs it in a different order.

Bring a real task. "I have to build a screen that asks a user to approve a transaction. What do I need to understand to do that safely?" pulls in exactly the concepts you need, in the order you need them, with a reason to remember each one.

When a concept comes up that you don't understand, go one level down, then come back to the task. The task keeps you from wandering into the parts of the field you won't need for months.

## Make it explain, then make yourself explain

Reading an explanation feels like understanding. Often it isn't.

The check that works is teaching it back. Explain the concept in your own words and ask the model where your explanation is wrong or incomplete. Ask it to quiz you, with questions that need reasoning, not recall. Ask for an example where the rule you just learned does not apply.

This is where AI is better than any textbook. A book cannot read your explanation and tell you which sentence gives away the misunderstanding.

## Build a toy in the first two days

Nothing exposes a gap in understanding like trying to make something work.

The toy should be small and real: a script that does one thing in the new domain, end to end. It will break in ways no explanation prepared you for, and each break teaches you something specific. In Web3 that might be sending a transaction on a test network. In payments, a test charge and a refund. In a new framework, one screen that loads real data.

AI makes the toy much faster to build, which is the point. The hours you save on setup go into the part that teaches you: figuring out why it broke.

## Check everything that matters against the source

Here is the catch. Models produce fluent, confident answers whether they are right or not. In a field you don't know, you cannot tell the difference by tone.

The usual failures:

- **Invented details.** A function, setting or rule that sounds right and does not exist.
- **Outdated facts.** Something that was true two versions ago, presented as current.
- **The average view.** A smooth summary of what most sources say, missing the important exception.

So anything you are going to rely on gets checked against a primary source: the official documentation, the specification, the source code, the actual error message. Use the model to understand the source faster, not to replace it. "Here is the documentation for this function, explain the part about retries" is a much safer question than "how do retries work in this library?"

## Find the people

AI gives you the consensus. Experienced people give you the scars.

The most valuable lessons in any field come from people who have already shipped something and can say "we tried that, and here is what went wrong". No model has your colleagues' context, and none of them can tell you which part of the official advice everyone quietly ignores.

The difference now is that you arrive at those conversations better prepared. You can skip the basics and spend their time on the questions only they can answer.

## Keep a learning log

Write down what you learned each day, in a few lines. What surprised you, what you got wrong, what you still don't understand.

It sounds like homework. It is the fastest way to notice your own misconceptions, and it gives you something to share. A newcomer's notes on what was confusing are often more useful to the next newcomer than an expert's documentation. That is also the cheapest way to start [writing in public](/blog/why-engineers-should-write-in-public/).

## What still takes time

AI compresses the part of learning that is about information. It does not compress the part that is about judgment.

Knowing which approach will hurt you in six months, which risk is worth taking, which edge case will actually happen in production: that still comes from shipping things and owning the results. What builds judgment is not more explanations. It is consequences.

So use the speed to get to the consequences sooner. Get fluent in days, start contributing in a week, and let the real lessons start arriving earlier than they used to. The way you brief the tool matters as much as what you ask it, which is the subject of [my brief was wrong](/blog/prompting-guide-for-engineers/).
