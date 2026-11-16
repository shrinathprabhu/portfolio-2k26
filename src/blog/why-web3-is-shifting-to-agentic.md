---
title: "Web3 Didn't Find Product-Market Fit, So It Found a New Word: Agentic"
description: "Wallets, chains and protocols are rebranding around AI agents. Some of it is real: agents do need programmable money. Much of it is a narrative chasing capital. How to tell the difference, from someone who has built wallets and bridges for years."
date: 2026-11-15
postTags: ["posts", "web3", "ai", "opinion"]
category: "Web3"
keywords:
  [
    "web3 AI agents",
    "why crypto is pivoting to AI",
    "agentic web3",
    "x402",
    "ERC-8004",
    "agentic payments",
    "crypto narrative",
    "future of web3",
  ]
# image: "/images/web3-agentic.png"
faq:
  - q: "Why are Web3 companies pivoting to AI agents?"
    a: "Three reasons. Capital and attention moved to AI, so projects follow the funding. Many crypto products never found mainstream users, and agents offer a new customer who does not mind bad UX. And there is a real technical fit: software agents need a way to hold and move money without a bank account."
  - q: "Do AI agents actually need crypto?"
    a: "For some cases, yes. Stablecoin payments are programmable, global, and work for small machine-to-machine amounts that card networks handle poorly. But traditional payment companies are building agent payment rails too, so crypto is one option among several, not the inevitable winner."
  - q: "What are x402 and ERC-8004?"
    a: "x402 is an open protocol, introduced by Coinbase, that lets software pay for an API request with stablecoins using the HTTP 402 status code. ERC-8004 is an Ethereum standard for agent identity and reputation, so agents can discover and assess each other without a central registry."
---

Open any Web3 project's homepage from two years ago and then today. The product is often the same. The headline is not. "Decentralised" and "trustless" have been replaced by "agentic". I have spent most of my career building in this industry: wallets, bridges, chain abstraction, a consumer app with tens of thousands of users. I think the shift deserves a more honest explanation than either the believers or the cynics usually give it.

My view: about a fifth of it is a real technical fit, and the rest is an industry that did not find enough users going where the money went.

## Reason one: the capital moved

Crypto has always run on narratives, because narratives raise funding and move tokens. DeFi, NFTs, the metaverse, layer 2s, restaking: each was the word every pitch had to include for about eighteen months.

When the centre of gravity in technology moved to AI, the investors, the engineers and the attention moved with it. A project that needs to raise or hold a token price has a strong incentive to describe itself in the vocabulary that is being funded. That is not a conspiracy. It is how markets behave.

## Reason two: the users never came

This is the part the industry prefers not to say aloud. After more than a decade, most people still do not use a crypto product for anything other than holding or trading assets. The reasons are familiar to anyone who has built here: seed phrases, gas fees, bridging, a new chain every quarter, and a confirmation screen that asks a normal person to approve a hexadecimal string. I wrote about this in [why Web3 UX still loses users](/blog/why-web3-ux-still-loses-users/).

An AI agent is a very attractive customer for an industry with that problem. It does not need onboarding. It does not get confused by a wallet prompt. It reads the documentation. "Our user is an agent" quietly removes the hardest problem Web3 has, which is that people find it difficult.

It is fair to ask whether that is solving the problem or changing the subject.

## Reason three: there is a real fit

To be fair, the technical case is not empty.

A software agent that is going to act on someone's behalf needs to pay for things: an API call, a dataset, compute, another agent's service. It cannot open a bank account. Card payments assume a human, carry fixed fees that make tiny payments uneconomic, and settle slowly. A stablecoin transfer is programmable, works across borders, and can be a fraction of a cent.

Real infrastructure has been built on this idea:

- **x402**, from Coinbase, revives the unused HTTP 402 "Payment Required" status so a service can ask for payment and a client can pay in stablecoins within the same request.
- **ERC-8004** went live on Ethereum mainnet in early 2026, giving agents a standard way to register identity and reputation.
- Wallet infrastructure with spending limits and scoped permissions, which is exactly what you want before handing money to software.

That last point matters to me as someone who has built wallets. Bounded, revocable, auditable permissions are something this industry understands well.

## How to tell substance from rebrand

When a project says it is "agentic", I ask five questions.

1. **Would this work without a token?** If the answer is yes and there is a token anyway, the token is the product.
2. **Who is the customer today, with numbers?** Not projected agents. Actual usage.
3. **What can the agent do, and what stops it?** Real agent infrastructure talks about limits, permissions and what happens when the model is wrong.
4. **Why does this need a blockchain rather than a payments API?** Sometimes there is a good answer: open access, no gatekeeper, composability. Sometimes there is not.
5. **Did the product change, or only the homepage?**

Projects that answer these clearly are worth watching. Most cannot.

## The competition nobody mentions

The agentic story is often told as if crypto were the only way for software to pay. It is not. Established payment companies have been building agent payment products of their own, and they bring distribution, merchant relationships and regulatory standing that crypto lacks. Some reporting has already noted steep usage declines on early agent-payment infrastructure once the first wave of excitement passed.

It is entirely possible that agents do need programmable money and that most of the value is still captured by companies that are not crypto-native.

## What gets lost

What bothers me is not that projects are adopting AI. It is what they are dropping to do it.

The original promise was specific: you hold your own assets, nobody can freeze them, and the rules are open for anyone to verify. That is a real and unusual property. It took years of difficult engineering to make it usable.

An agent with authority over a wallet runs straight into that promise. If a model can be manipulated by text it reads, and it can, then giving it signing power creates a new way to lose funds. Self-custody now includes "and the software acting for you cannot be talked into draining it". I cover the mechanics in [securing AI features](/blog/securing-ai-features-prompt-injection/). The teams treating that as the central design problem are the ones doing real work.

## What I think happens next

- The word "agentic" will fade from most homepages within two years, as the previous words did.
- A small number of pieces will remain and matter: stablecoin payment rails, permissioned wallets, perhaps identity.
- The projects that survive will be the ones that had a user before they had a narrative.
- The unsolved problem will still be the one we started with: making self-custody usable and safe for people.

## If you are building in Web3 now

Do not pick the word first. Pick the user. If agents genuinely are your user, design for their failure modes: spending caps, allow-lists, human confirmation above a threshold, a full audit trail. If people are your user, the work is still the unglamorous kind, fewer steps, clearer confirmations, safer defaults.

The industry did not lose its way because it adopted AI. It loses its way each time it replaces a hard problem with a new word. The hard problems are still there.
