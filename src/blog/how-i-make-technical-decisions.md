---
title: "Most Bad Technical Decisions Were Made at the Wrong Speed"
description: "Most bad technical decisions were not wrong on the day. They were made at the wrong speed, by the wrong person, or with no record of why. The framework I use: classify the decision, write it down, set a tripwire, and commit."
date: 2026-10-31
postTags: ["posts", "architecture", "decision-making", "leadership"]
category: "System Design"
keywords:
  [
    "technical decision making",
    "architecture decision records",
    "one-way door decisions",
    "engineering trade-offs",
    "staff engineer decisions",
    "design doc",
  ]
image: "/images/blog/how-i-make-technical-decisions.png"
faq:
  - q: "What is an architecture decision record?"
    a: "A short document, usually under a page, that records one significant technical decision: the context, the options considered, the choice made and its consequences. Its value is that a year later anyone can see why the decision was made, not just what it was."
  - q: "How do you decide between two technical options quickly?"
    a: "First ask how hard the decision is to reverse. If it is easy to undo, pick the option you can ship soonest and move on. If it is hard to undo, write down the options, the trade-offs and what evidence would change your mind, then decide with the people who will live with the result."
  - q: "What is a one-way door decision?"
    a: "A decision that is very costly or impossible to reverse, such as a data model, a public API or a choice of where customer data is stored. The term comes from Amazon, which contrasts these with two-way door decisions that can be undone cheaply and should be made fast."
---

Two scenes from the same company.

Monday. Six engineers spend ninety minutes debating which date-formatting library to use. There is a slide deck. Someone says "let us take this offline". A follow-up is scheduled.

Tuesday. One engineer, alone, between two other tasks, decides how customer accounts will be structured in the database. It takes twenty minutes. Nobody else looks at it.

The library can be swapped in an afternoon. The account structure will shape every feature for the next five years. The team spent its care in exactly the wrong place.

That is how most bad technical decisions happen. Not through stupidity, but through speed: slow where it did not matter and fast where it did.

A good decision is not one that turns out right, because you do not control the future. It is one made at the right speed, by the right people, with the reasoning written down and a clear signal for when to look again. Those four things you do control. This is the process I have settled on, including for decisions I got wrong and had to live with.

## Step 1: Classify before you discuss

The first question is never "which option is better". It is "how expensive is it to be wrong".

- **Two-way doors** are cheap to reverse: a library, a folder structure, a hosting provider, a UI pattern. Decide in minutes. The person closest to the work decides. Being wrong costs a day or two.
- **One-way doors** are expensive to reverse: the data model, the identity model, a public API, a pricing structure baked into code, a cryptographic scheme. Decide slowly, in writing, with more than one person.

The most common failure I see in teams is treating everything as a one-way door. Every choice gets a meeting, nothing ships, and the team concludes it needs more process. The second most common failure is the reverse: a one-way door walked through casually on a Tuesday because nobody labeled it.

Classifying takes thirty seconds and removes most of the argument.

### The door test

Amazon has a nice way of putting this. Some doors swing both ways: walk through, and if you do not like the room, walk back. Other doors lock behind you.

Choosing lunch is a two-way door. Getting a tattoo of your startup's logo is a one-way door.

Walk through two-way doors quickly. Stop and think at one-way doors. Most of the skill is noticing which kind you are standing in front of.

## Step 2: Write the decision down, briefly

For anything that is not trivially reversible, I write a short record. One page at most:

- **Context.** What problem are we solving and what constraints apply?
- **Options.** At least two real ones, including "do nothing".
- **Decision.** What we chose.
- **Why.** The two or three reasons that actually tipped it.
- **Consequences.** What gets harder because of this choice.
- **Revisit when.** The condition that should make us look again.

Writing does two jobs. It forces clear thinking: a decision that cannot be explained in a page is usually not understood yet. And it protects the future team from relitigating. Without a record, every new joiner asks "why on earth did we do it this way", and nobody remembers.

## Step 3: Name what you are giving up

Every option costs something. If a proposal lists only benefits, it is a sales pitch.

Two examples from my own work have their own posts: choosing a sidebar over a popup for [the Arcana wallet](/blog/chrome-extension-wallet/), and shipping Avail's widgets as both a package and source components in [the DevRel post](/blog/devrel-is-a-product-function/). In both, the useful answer only appeared after the cost was stated out loud.

## Step 4: Set a tripwire

Most decisions are right for a while and then stop being right. The skill is noticing when.

So I attach a tripwire: a specific, observable condition that triggers a review.

- "We stay on the managed host until we hit its bandwidth limit or the bill passes X."
- "We keep one database until a single query cannot be brought under 200 ms with indexing."
- "We keep this as a monolith until two teams are blocked on each other's deploys more than once a sprint."

On SendIt, the tripwire for hosting was real traffic. When the app reached around twenty thousand daily users and exhausted our hosting plan's limits, we moved to a self-managed AWS setup. We did not move earlier out of anxiety, and we did not delay once the condition was met.

A tripwire turns "we should probably rethink this someday" into an event that actually happens.

## Step 5: Decide, then commit

Jeff Bezos has written that most decisions should be made with around 70 percent of the information you wish you had. Waiting for 90 percent usually means being slow, and being slow is its own kind of wrong.

Once the decision is made, the team commits, including the people who argued against it. "Disagree and commit" only works if the disagreement was genuinely heard first, which is why the written options matter. People will commit to a decision they lost if they can see their argument was considered.

What I will not do is pretend to agree in the meeting and reopen the question in a hallway. That is worse than either choice. I have written more about [how to disagree with leadership properly](/blog/how-to-disagree-with-leadership/).

## The traps I watch for in myself

- **Deciding by familiarity.** Preferring what I know and calling it judgment.
- **Deciding by novelty.** Preferring what is new and calling it vision.
- **Sunk cost.** Defending a past choice because it was mine.
- **False precision.** A weighted scoring matrix that produces the answer I wanted anyway.
- **Consensus as a goal.** If everyone must agree, the decision drifts toward whatever offends nobody, which is rarely the best option.
- **Solving for the demo.** Choosing what looks good next week over what holds up next year, or the reverse.

## What this looks like when it works

A year later, someone opens the record. They see the context, the options and the tripwire. Either the condition has not been met and the decision stands, or it has and the team changes course with no blame attached. In both cases the decision "looks right", because it was honest about what it knew.

The same thinking, applied to the first decision of any product, is in [how I choose a tech stack](/blog/how-i-choose-a-tech-stack/).
