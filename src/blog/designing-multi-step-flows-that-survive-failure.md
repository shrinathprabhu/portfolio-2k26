---
title: "What Happens When Your User Closes the Laptop at Step 3 of 5?"
description: "Checkouts, onboarding, bridges, payouts: every flow that takes more than one step can stop halfway. How I design multi-step flows so that a dropped connection, a closed tab or a failed service never leaves a user wondering where their money went."
date: 2026-11-03
postTags: ["posts", "system-design", "architecture", "frontend"]
category: "System Design"
keywords:
  [
    "multi-step flow design",
    "system design for frontend",
    "state machine UI",
    "idempotency",
    "resumable workflows",
    "designing transaction flows",
    "failure handling system design",
  ]
# image: "/images/step-3-of-5.png"
faq:
  - q: "How do you design a flow that can fail halfway?"
    a: "Write down every state the flow can be in, including the in-between ones. Save progress on the server after each step, make every step safe to retry, and decide in advance what happens at each point of failure: retry, resume, or undo. Then show the user exactly which state they are in."
  - q: "What is idempotency, in simple terms?"
    a: "An action is idempotent if doing it twice has the same effect as doing it once. Pressing a lift button five times still calls one lift. In software it means a retried payment request charges the customer once, not twice, usually by attaching a unique key to each attempt."
  - q: "Why use a state machine for a user flow?"
    a: "Because it forces you to list every state and every allowed move between them. Bugs in multi-step flows usually come from states nobody planned for, such as step two succeeding while step three never started. A state machine makes those cases visible before users find them."
---

A user wants to move money from one blockchain to another. It takes five steps behind the scenes. They click the button, watch it get to step three, and then their train goes into a tunnel.

Their funds have left the first chain. They have not arrived on the second. The app, when they reopen it, shows a cheerful empty form as if nothing ever happened.

That user is now having the worst five minutes of their week. And nothing actually went wrong. The system would have finished the job. We simply never told them, because we designed the flow for the day everything works.

I build cross-chain interfaces for a living, where this scenario is a normal Tuesday. But the same problem lives in every checkout, sign-up, file upload, booking and payout. Anything with more than one step can stop in the middle.

## Explain it like I am five

You order a pizza. You do not just want to know "ordered" and "delivered". You want the bit in between: being made, in the oven, on the bike, two streets away.

And if the delivery rider's phone dies, the pizza should not vanish from existence. The shop still knows about your order. When you call, they can say "it left ten minutes ago".

Three ideas are hiding in that pizza:

- **The steps in between are real** and deserve names.
- **The shop remembers**, not the rider. Progress is stored somewhere safe.
- **Calling twice does not get you two pizzas.**

That is most of system design for multi-step flows. The rest is detail.

## 1. Draw every state, especially the awkward ones

The first thing I do is list every state the flow can be in. Not the three on the designer's mockup. All of them.

For a transfer, the happy path has perhaps five. The real list is closer to fifteen: waiting for approval, approval rejected, submitted but unconfirmed, confirmed on the source, waiting on the destination, delivered, timed out, refund started, refunded.

Then for each state I answer:

- What does the user see?
- What can happen next?
- What if the user leaves now and comes back tomorrow?

The bugs are always in the states nobody drew. "Step two succeeded and step three never began" is not an edge case. On a mobile network it is a daily event.

This is all a **state machine** is: a list of states and the allowed moves between them. It sounds academic. In practice it is a table on a whiteboard that saves you months.

## 2. The browser is not where the truth lives

Early versions of flows often keep progress in the page's memory. Refresh the tab, and the app forgets everything.

My rule: **the server, or the chain, is the source of truth. The interface is a window onto it.**

So after each step, progress is recorded somewhere durable. When the user returns, on the same device or a different one, the app asks "is there anything in progress for this person?" and picks up from there. The user should be able to close the laptop at any point without consequences.

A good test: open the flow, get halfway, kill the browser, reopen it. If you see an empty form, the design is not finished.

## 3. Make every step safe to repeat

Networks fail in an annoying way. You send a request, and you get no reply. Did it fail on the way there, or succeed with the answer lost on the way back? You cannot know.

The only safe response is to try again, which is only safe if repeating the step does no harm. That property is called **idempotency**. A lift button is idempotent: press it five times, one lift arrives. A "pay" button must behave the same way.

The usual technique is to attach a unique key to each attempt. If the server sees the same key twice, it returns the first result and does not act again.

And yes, also disable the button after the first click. Users double-click. Impatient users triple-click. I have been that user.

## 4. Decide what "undo" means before you need it

With one database, a failed operation rolls back cleanly. Across several systems, a payment provider, a blockchain, an email service, there is no global undo.

So for each step I decide in advance: if a later step fails, what do we do about this one?

- **Retry** the failed step, if it is likely temporary.
- **Compensate**, meaning run a reverse action, such as a refund.
- **Park it** in a clearly labelled state for a human to resolve.

This pattern has a name, a saga, but the important thing is the habit. Never design a step without knowing what happens if the next one fails.

## 5. Tell the truth in the interface

This is where frontend work becomes system design.

- **Show the real step, not a generic spinner.** "Confirmed on Arbitrum, waiting for Base, usually under a minute" is a completely different experience from a circle going round.
- **Set expectations for time.** People wait calmly if they know how long.
- **Say what is safe.** "You can close this page. We will keep going."
- **Give them something to hold.** A reference, a link to track progress.
- **Be careful with optimistic updates.** Showing success before it is confirmed is fine for a like button. For money, never claim something is done until it is.
- **Write errors for humans.** What happened, whether their money is safe, and what to do next. In that order.

On a bridge interface, status changes arrive constantly. Getting those updates to render smoothly without lying about the current state was a large part of the engineering.

## 6. Plan for the slow failure

Outright errors are easy. The hard one is the step that just never finishes.

Every waiting state needs a time limit and a decision about what happens when it passes. Otherwise the user sits on "pending" forever. After a reasonable wait, move to a state that says "this is taking longer than normal, here is what we are doing".

## 7. Be able to see it from the inside

When a user writes in to say "my transfer is stuck", support should be able to look up that flow and see exactly which state it is in and why. That requires logging each move between states with a shared identifier.

If you cannot answer "where is this user's transaction right now" in under a minute, the flow is not production-ready, however good it looks.

## The checklist I use

- Every state listed, including partial and failed ones
- Progress stored outside the browser
- Refresh, back button and a second tab all handled
- Each step safe to retry
- A defined reaction to failure at every step
- Timeouts on every waiting state
- Honest, specific progress shown to the user
- A way for support to look up any flow

## Why this is the senior part of the job

Building the five steps is the easy bit, and AI will happily write them for you now. Deciding what happens between them is design work, and it is where users either trust a product or leave it. It is also a good example of why I say [frontend is a distributed systems problem](/blog/frontend-distributed-systems-problem/), and why Web3 products in particular [lose users to uncertainty](/blog/why-web3-ux-still-loses-users/).

Design for the tunnel. The train always goes into the tunnel.
