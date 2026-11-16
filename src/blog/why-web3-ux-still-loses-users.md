---
title: "Your Web3 App Doesn't Have a Marketing Problem. It Has a Step Count Problem"
description: "Most Web3 products lose people before the first transaction: at the wallet install, the seed phrase, the bridge, the gas token. Lessons from building a wallet, a transfer app with 65K+ accounts and cross-chain widgets, and the design rules I now follow."
date: 2026-10-31
postTags: ["posts", "web3", "ux", "product"]
category: "Web3"
keywords:
  [
    "web3 UX",
    "web3 onboarding",
    "why web3 adoption is slow",
    "chain abstraction",
    "wallet UX",
    "crypto user experience",
    "account abstraction UX",
  ]
# image: "/images/web3-ux-step-count.png"
faq:
  - q: "Why is Web3 user experience so difficult?"
    a: "Because the user is asked to do the system's work: install a wallet, protect a seed phrase, hold the right gas token on the right chain, bridge assets and approve transactions they cannot read. Each step loses a share of users, and the losses multiply."
  - q: "What is chain abstraction?"
    a: "An approach where the user sees one balance and takes one action, while the system works out which chains and tokens are involved behind the scenes. The goal is that a user never has to know which network their funds are on."
  - q: "How do you improve onboarding in a Web3 app?"
    a: "Count the steps between arriving and getting value, then remove them. Let people start with an email or social login, sponsor or hide gas where you can, remove manual bridging, and write confirmation screens in plain language that states what will leave the wallet and what will arrive."
---

When a Web3 product struggles to grow, the team usually reaches for marketing: a points programme, an airdrop, a campaign. In my experience the problem is nearly always earlier and simpler. Count the steps between a new person arriving and that person getting any value. The number is usually above ten. Every one of those steps is a place where people leave.

I have worked on this problem from three sides: a non-custodial browser wallet at Arcana, SendIt, a transfer app that reached over 65,000 accounts, and the cross-chain widgets I lead at Avail. This is what I have learned about where users are lost and what brings them back.

## The funnel nobody draws

Here is what a newcomer faces to use a typical decentralised application:

1. Learn that they need a wallet
2. Choose one and install it
3. Write down a seed phrase and understand why
4. Buy crypto on an exchange, including identity checks
5. Withdraw to the wallet, on the correct network
6. Discover the app is on a different chain
7. Find a bridge and trust it
8. Realise they need a different token to pay gas
9. Connect the wallet to the app
10. Approve a token allowance they do not understand
11. Finally sign the transaction they came for

If a generous 80 percent of people get through each step, about 9 percent reach the end. No campaign fixes that. Removing three steps does more than doubling the marketing budget.

## Lesson one: stop asking users to speak the system's language

SendIt started from a plain observation: nobody wants to copy a 42-character hexadecimal address. So we let people send tokens to an email address, an X username or an ENS name, and resolved the address behind the scenes.

Nothing about the blockchain changed. We changed what the person had to know. The product reached tens of thousands of accounts and around twenty thousand daily users at its peak, largely because the first action felt like something people already knew how to do.

The general rule: any time the interface shows a concept the user did not have before they arrived, such as chain IDs, gas, nonces or allowances, ask whether the system could handle it for them.

## Lesson two: the user should not know which chain they are on

A person with funds spread across five networks does not think "I have 40 USDC on Arbitrum and 60 on Base". They think "I have 100 dollars". The interface should agree with them.

That is the idea behind chain abstraction, and it is what I work on at Avail: show one balance, take one instruction, and let the system work out the routing. In the Arcana wallet we did an early version of this by aggregating balances across more than ten chains into a single value.

When it works, three of the eleven steps above disappear: finding the right chain, bridging, and sourcing the gas token.

## Lesson three: the confirmation screen is the most important screen

Every Web3 flow ends with a moment where the user must approve something irreversible. Most products present that moment as a wall of data.

A confirmation screen should answer three questions in plain words:

- What leaves my wallet?
- What do I receive, and where?
- What does it cost, and how long will it take?

This is usability, and it is also security. Many of the largest thefts in this industry happened because someone approved a transaction they could not read. I go through one of them in [what the Bybit hack teaches about frontend security](/blog/bybit-hack-frontend-security-lessons/).

We built the Arcana wallet as a sidebar and not a popup for this reason. A popup hides the application behind it. A sidebar lets the user see the application and the wallet together and check one against the other.

## Lesson four: design for the in-between state

Web2 actions mostly succeed or fail at once. Web3 actions have a long middle: submitted, pending, confirmed on one chain, waiting on another. Cross-chain actions can succeed halfway.

Most interfaces show a spinner and hope. A good one tells the user exactly where things stand, survives a page refresh, and has a clear answer for "what happens to my money if this stops now". I describe the design approach in [designing multi-step flows that survive failure](/blog/designing-multi-step-flows-that-survive-failure/).

People forgive slow. They do not forgive uncertain, especially about money.

## Lesson five: incentives bring users, they do not keep them

SendIt had a gamification layer: points for transactions, leaderboards, rewards for the top users. It drove real growth. It also taught me to design against abuse from the first day, with caps on what counted, because any rewarded action will be farmed.

Incentives are an acquisition tool. They get someone through the door once. Whether that person returns depends on whether the product was easy and useful when the reward was gone. Many Web3 products have large incentive-driven numbers that vanish with the programme.

## Lesson six: meet developers halfway too

Bad UX is often inherited. Each team integrating cross-chain functionality rebuilds the same swap, send and deposit screens, with different mistakes each time.

That was the reason I proposed a shared set of widgets at Avail: one well-tested flow that any application can drop in, which more than ten applications now use. If you run a platform, the fastest way to improve your users' experience is to make the good version the easy one for developers to adopt. More on that in [DevRel is a product function](/blog/devrel-is-a-product-function/).

## The rules I design by now

- **Count the steps, then cut.** Each removed step is worth more than a new feature.
- **Start with what the user knows.** Email, a username, a currency amount.
- **Hide the chain.** One balance, one action.
- **Hide or sponsor gas** wherever the economics allow.
- **Make confirmations readable.** What leaves, what arrives, what it costs.
- **Show progress honestly** and make every flow resumable.
- **Give safe defaults.** Limited approvals, clear warnings, no blind signing.
- **Test with someone who has never used crypto.** Watch without helping.

## The uncomfortable conclusion

The technology to remove most of these steps exists now: embedded wallets, account abstraction, gas sponsorship, intent-based routing. What is usually missing is the product discipline to use them, because it is less exciting than a new chain or a new narrative.

The industry keeps looking for the next thing that will bring users. I think users arrive when using the product stops feeling like work. That is also my main objection to the current rush [toward everything agentic](/blog/why-web3-is-shifting-to-agentic/).
