---
title: "Chain Abstraction, Explained for Frontend Engineers"
description: "Chain abstraction means a user sees one balance and takes one action, and the system works out which chains are involved. What that changes in the interface, what gets harder, and how drop-in widgets fit in."
date: 2026-10-01
postTags: ["posts", "web3", "frontend", "ux"]
category: "Web3"
keywords:
  [
    "chain abstraction",
    "unified balance",
    "cross-chain UX",
    "Web3 frontend",
    "bridge UI",
    "Avail Nexus",
    "Avail Widgets",
    "dApp integration",
  ]
# image: "/images/chain-abstraction-frontend.png"
---

**Chain abstraction** is a design goal: a person using a crypto application should not need to know which blockchain their assets are on. They see one balance, take one action, and the system works out the routing.

I have spent the last few years on the interface side of this, first on a wallet that showed a unified balance across 10+ chains, and now on the Nexus products at Avail. This is the explanation I wish I had been given as a frontend engineer coming to it new.

## The problem it removes

Without abstraction, doing one thing in a DeFi app often looks like this:

1. Notice your funds are on the wrong network.
2. Find a bridge. Decide whether to trust it.
3. Switch networks in your wallet.
4. Bridge, and wait.
5. Realise you have no gas token on the destination chain.
6. Get some, switch networks again, and finally do the thing you came for.

Every step is a place to make a mistake or give up. None of it is the user's goal. It is plumbing that leaked into the interface.

With abstraction the same task is: choose the amount, confirm, done.

## What "unified balance" means on screen

The core interface idea is a single balance. If someone holds the same token on four networks, they see one number, the total, and can spend from it as if it were in one place.

That sounds like a display trick. It is not, and treating it as one is where implementations go wrong:

- **The total has to be spendable.** Showing a sum the user cannot actually use in one action is worse than showing four separate balances.
- **The breakdown must be one tap away.** People still want to know where their funds are. Abstraction hides it by default. It should never make it unavailable.
- **Balances arrive at different times.** Each network answers at its own speed. The interface needs a clear partial state, not a total that silently climbs as slower networks respond.

## What gets harder for the frontend

Abstraction moves complexity out of the user's head and into your state management.

**One action, several transactions.** A single confirm can become several steps on different networks. The interface has to show one coherent progress view while tracking each leg underneath.

**Partial failure.** Step one succeeds and step two does not. The user must be told exactly where their funds are and what happens next. "Something went wrong" is not acceptable when money is in transit.

**Time.** Some steps take seconds, some take minutes. A spinner with no information reads as a lost transaction. Show named steps and say what is happening.

**Quotes go stale.** Routes and fees change between quoting and confirming. The interface must refresh and re-confirm instead of executing an out-of-date quote.

**Constant updates.** Status polling, balance refreshes, and network changes all happen at once. If each one re-renders the whole view, the app feels broken. Isolating the fast-changing state is most of the engineering work in a bridge interface.

I think about this as a distributed systems problem that happens to be drawn in a browser, which I wrote about in [frontend is a distributed systems problem](/blog/frontend-distributed-systems-problem/).

## Abstraction must not hide the truth

There is a real tension here. Hiding the chain is good for usability. Hiding what the user is approving is dangerous.

My rule: abstract the mechanics, never the consequences. A user does not need the route. They do need the exact amount leaving, the exact amount arriving, the fees, and the destination, in plain language, before they confirm. If something fails midway, they need the specifics immediately.

## Why this ends up as widgets

When I joined this work, every team integrating the underlying SDK had to build the same interfaces again: swap, send, deposit. Each one re-solved progress tracking, partial failure, and quote refresh, with varying success.

That is why I proposed what became [Avail Widgets](/work/#widgets): prebuilt React components for those flows that an app can drop in. The useful design decision was shipping them two ways from one codebase:

- **An npm package** for teams that want to configure and go.
- **A shadcn registry** for teams that want the source in their own repository, to edit every line.

Teams differ in how much control they want, and choosing one model would have excluded half of them. There is also a live configurator that runs the real widget and outputs the exact code for the chosen settings, because the fastest documentation is a working example you can change.

## If you are building this

1. Design the failure states first. The success path is the easy part.
2. Make every amount explicit before confirmation.
3. Keep the per-network breakdown reachable.
4. Treat a multi-step action as one resumable operation, so a closed tab does not strand the user.
5. Test on a slow connection with one network timing out. That is the normal case, not the edge case.

Chain abstraction succeeds when the user stops thinking about chains. It only stays trustworthy if the interface is honest at the moments that matter.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer at [Avail Project](https://availproject.org). Case studies at [shrinath.me/work](https://shrinath.me/work/)._
