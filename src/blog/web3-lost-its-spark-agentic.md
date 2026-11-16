---
title: "Web3 Is Losing Its Spark, and \"Agentic\" Is Not the Fix"
description: "I have built wallets, bridges, and cross-chain tools for years. My honest view of why so much of Web3 now feels like it is chasing one keyword, what was worth keeping from the original idea, and where AI agents and crypto really do fit."
date: 2026-11-10
postTags: ["posts", "web3", "ai", "opinion"]
category: "Web3"
keywords:
  [
    "Web3",
    "agentic AI",
    "AI agents crypto",
    "future of Web3",
    "self-custody",
    "crypto UX",
    "Web3 narrative",
    "agentic payments",
  ]
# image: "/images/web3-spark-agentic.png"
---

I have worked in Web3 since 2021. I built a non-custodial wallet, a transfer app that reached 65K+ accounts, a bridge, and now cross-chain widgets. I say that so the next sentence is read as criticism from inside the room: a lot of this industry has stopped building toward its own idea and started building toward a keyword.

This year the keyword is "agentic".

These are my personal views, not my employer's.

## What the spark was

The original pitch was specific and a little radical:

- **You hold your own assets.** No company can freeze them or lose them for you.
- **Anyone can build.** No platform owner decides who gets access.
- **Rules are open.** You can read the code that holds your money.
- **Systems compose.** One team's contract becomes another team's building block, without a partnership deal.

You can disagree about whether that matters to most people. It was at least a clear idea, and it attracted people who wanted to build something that could not be built otherwise.

## What it looks like now

Open almost any project site and count how many are suddenly agentic. Agentic wallets, agentic chains, agentic payments, agentic everything. Many of them were something else a year ago, under the previous keyword.

I understand why. Attention and funding moved to AI, and a project that needs both has to be in that conversation. It is rational for each team. Added up, it produces an industry whose roadmaps are set by whatever is fashionable elsewhere.

My test is simple: remove the word from the pitch and see what is left. If the product makes no sense without it, there may be something real. If the product is unchanged, the word is decoration.

## The problems that are still not solved

Rotating narratives has a cost. The unglamorous problems stay open.

After all these years, it is still too hard to:

- know what you are approving before you sign it,
- recover an account without a single point of total loss,
- move value between networks without understanding networks,
- tell a real application from a convincing copy of it.

I have spent most of my career on exactly these. They are slow, difficult, and they do not trend. They are also the reasons a normal person cannot comfortably use any of this. A wallet that explains a transaction truthfully does more for adoption than any narrative.

## Where agents and crypto really do fit

I do not think the combination is empty. There are a few places where it is a real fit.

**Machines need a way to pay.** Software that acts for you will need to pay for data, compute, and services, often in tiny amounts, across borders, with no card and no human at a checkout. Programmable money with open rails is a reasonable answer to that.

**Scoped, revocable permission.** The important question about an agent is what it is allowed to do. "This key may spend up to this amount, on this service, until this date" is something on-chain accounts can express and enforce, and the user can revoke it. That is a better primitive than handing over a password.

**A verifiable record.** When software acts autonomously, a tamper-evident log of what it did has real value.

Notice that all three are infrastructure. None of them needs a token named after an agent.

## And where it gets dangerous

Giving an AI agent a wallet combines two things that each fail badly on their own.

A language model can be steered by text it reads. Blockchain transactions are irreversible. Put them together and an injected instruction can have permanent financial consequences. There is no chargeback and no support line.

So the questions that matter are boring and specific. What is the spending limit? Who confirms a large transfer? What can the agent read, and can any of that content instruct it? Can the permission be revoked in one action? A project that leads with the vision and cannot answer these has not started the real work. I cover that threat model in [securing frontends in the age of AI](/blog/securing-frontends-in-the-age-of-ai/).

## What I would like to see instead

- **Fewer narratives, more finished products.** Something people use weekly because it is better, not because of an incentive.
- **Honest interfaces.** Show the user the truth at the moment of consent, every time.
- **AI used where it helps the user.** Explaining a transaction in plain language. Flagging a suspicious approval. Those are real improvements, and they need no rebrand.
- **Patience.** The valuable work in this space takes years, and it does not fit a cycle.

## Why I am still here

I would not write this if I thought the idea was finished. Self-custody, open access, and composability are still worth building toward, and they matter more if software agents are going to move money on our behalf. An autonomous system acting for you is exactly the situation where you want rules you can verify and permissions you can revoke.

The spark was never a keyword. It was the claim that people could own and verify what they depend on. That is still worth more than whatever the next word turns out to be.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. Opinions are my own. More at [shrinath.me/work](https://shrinath.me/work/)._
