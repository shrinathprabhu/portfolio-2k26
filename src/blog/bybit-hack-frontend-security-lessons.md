---
title: "The $1.5 Billion Lesson: The Biggest Crypto Heist Was a Frontend Hack"
description: "In February 2025, attackers stole roughly $1.5 billion from Bybit without breaking a smart contract or a hardware wallet. They changed the JavaScript the signers were looking at. What happened, and what every team shipping a web interface should take from it."
date: 2026-11-01
postTags: ["posts", "security", "web3", "frontend"]
category: "Security"
keywords:
  [
    "Bybit hack explained",
    "Bybit Safe wallet hack",
    "frontend security",
    "supply chain attack",
    "blind signing",
    "web3 security",
    "multisig security",
  ]
# image: "/images/bybit-frontend-hack.png"
faq:
  - q: "How was Bybit hacked?"
    a: "Attackers compromised a developer machine at Safe, the multisig wallet provider Bybit used, and replaced JavaScript served by Safe's web interface. The altered code showed Bybit's signers a normal-looking transfer while actually asking them to sign a transaction that handed control of the wallet to the attackers."
  - q: "Was the Bybit hack a smart contract exploit?"
    a: "No. The smart contracts and the hardware wallets worked as designed. The attack targeted the web interface between the human signers and the contract, which is why it is best understood as a frontend and supply chain compromise."
  - q: "What is blind signing?"
    a: "Approving a transaction on a hardware wallet when the device cannot show what the transaction does in readable form, only a hash or raw data. The signer has to trust whatever the computer screen says, which removes the protection the hardware wallet was meant to provide."
---

On 21 February 2025, about $1.5 billion in Ether left a Bybit cold wallet. It is widely described as the largest theft in the history of cryptocurrency, and the FBI attributed it to North Korean state-linked attackers. The part that should interest every engineer is what did not get broken. The smart contract was not exploited. The hardware wallets were not cracked. No private key was stolen.

The attackers changed what was on the screen. As a frontend engineer who has built wallet interfaces, I consider this the most important security case study of the decade for people in my job.

## What happened, in plain terms

Bybit kept the funds in a multisig wallet built on Safe, a widely used and respected product. Moving money required several authorised people to approve the same transaction, each using a hardware wallet. That is close to best practice.

According to the investigations published afterwards:

1. Attackers compromised the machine of a developer at Safe.
2. Using that access, they modified a JavaScript file served from Safe's cloud storage to users of its web application.
3. The malicious code was targeted. It stayed dormant for everyone except Bybit's specific wallet.
4. When Bybit's signers opened the interface to approve a routine transfer, the screen showed the routine transfer. The data sent to their hardware wallets was a different transaction, one that changed who controlled the wallet.
5. The hardware wallets could not display that transaction in readable form, so the signers approved what they believed they were seeing.
6. With control transferred, the attackers emptied the wallet. The malicious code was removed shortly afterwards.

Every individual control did its job. The multisig required several signatures and got them. The hardware wallets signed exactly what they were given. The system failed at the one layer everyone had treated as presentation.

## Lesson one: the interface is part of the security boundary

For years, security attention in this industry went to smart contract audits and key management. The frontend was "just the UI".

But when a person approves an action based on what a screen shows them, the code that draws the screen holds the same authority as the key. If I control what you see, I control what you sign. That applies well beyond crypto: a banking dashboard, an admin console, a deployment tool, an approval workflow.

If your product has a screen where a human confirms something that matters, the code path that renders it deserves the same scrutiny as your authentication.

## Lesson two: your deployment pipeline is production

The attackers did not need to defeat the application's logic. They needed write access to a file in a storage bucket.

Questions every team should be able to answer:

- Who, and which machines, can change what is served to users?
- Is that access protected by hardware-backed multi-factor authentication?
- Can one compromised laptop publish to production with no second person?
- Would anyone notice if a served file changed outside a release?

A release process where one developer's credentials can alter production assets has a single point of failure, however many signatures the product itself requires.

## Lesson three: verify what you serve

There are established defences against a file being swapped.

- **Subresource Integrity:** the page declares the expected hash of each script, and the browser refuses to run one that does not match.
- **A strict Content Security Policy:** limits where code can load from and where data can be sent.
- **Immutable, content-addressed assets:** files named by their hash, so a changed file is a different file.
- **Monitoring served assets:** an external check that compares what is live against what was built and alerts on any difference.
- **Reproducible builds and signed releases,** so there is a known-good artefact to compare with.

None of these is exotic. Most teams skip them because nothing has gone wrong yet.

## Lesson four: never ask a human to approve what they cannot read

The hardware wallet was meant to be the independent check, the one screen the attacker could not touch. It failed because it could only show an unreadable hash. The signers had two sources of truth, and the one they could understand was the one the attacker controlled.

The principle is simple: **the trusted device must show the meaning of the action, not just proof that some action exists.** In wallets, this is the push for clear signing. Elsewhere, it means confirmation steps that state the consequence: "this will delete 4,000 customer records", not "confirm operation 7f3a".

When we built the Arcana wallet, the confirmation screen got more design attention than any other. It is the last point where a person can catch a mistake, and it only works if they can read it.

## Lesson five: independent channels for high-value actions

For anything large enough to hurt, one interface should not be the only view.

- Check the transaction on a second device or with a separate tool that does not share code with the first.
- Simulate the transaction and review what it will actually change.
- Add a time delay to large or unusual transfers so there is a window to cancel.
- Put limits on what a single approval can move.
- Treat a change of ownership or permissions as a different class of action from a transfer, with its own alarms.

## Lesson six: your developers are the target

This attack started with one person's computer. That is now the normal route. Engineers hold the access attackers want, and they are approached through fake job offers, poisoned packages, malicious repositories and convincing messages.

Protecting developer machines and credentials is production security: hardware keys, short-lived credentials, separated environments, and care about what gets installed and run. I list the basics in [security practices every company needs](/blog/security-practices-every-company-needs/).

## A checklist for any team with a web interface

- Can a single compromised account change what users are served?
- Do we use integrity checks and a strict Content Security Policy?
- Would we detect a modified production file within minutes?
- Do our confirmation screens state consequences in plain language?
- Is there a second, independent check for high-value actions?
- Are critical actions rate-limited, delayed or capped?
- Are developer accounts protected with phishing-resistant authentication?

## Why this matters outside crypto

Crypto makes the cost visible, because the loss is immediate, public and irreversible. The same weakness exists wherever people act on what a web page tells them. As more operations run through browser-based tools, the frontend is no longer the safe, cosmetic layer. It is where trust is decided, and it has to be engineered that way. A good next step is [shrinking what an attacker can reach in the first place](/blog/reduce-attack-surface-delete-first/).
