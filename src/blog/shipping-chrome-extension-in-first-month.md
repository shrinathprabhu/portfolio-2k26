---
title: "New Job, New Industry, 30 Days: What I Cut to Ship"
description: "My first 30 days at a new company, in an industry I had never worked in, ended with a product in the Chrome Web Store. What I cut, why the riskiest integration went first, and the one scope fight I should have picked."
date: 2026-04-27
category: "Shipping"
keywords:
  [
    "first 30 days new job engineer",
    "shipping in your first month",
    "scoping an MVP",
    "startup engineering",
    "Gmail extension",
    "end-to-end encryption",
    "pushing back on scope",
  ]
postTags: ["posts", "shipping", "career", "decision-making"]
image: "/images/blog/shipping-chrome-extension-in-first-month.png"
imageFallback: "/images/shipping-skizzle.png"
---

In January 2021 I joined Newfang, a decentralized storage startup that later became Arcana Network, as a frontend engineer. I had never worked in Web3. I had built Chrome extensions before, but never one that lived inside Gmail.

Thirty days later Skizzle was in the Chrome Web Store: an extension that encrypted email attachments end to end, so that only the intended recipient could open them. It reached about 1,000 users and a 4.2-star rating before the company pivoted.

Nobody types three times faster in their first month. The 30 days came from what I left out, what I did first, and one thing I added late. There is also one thing I should have refused.

## What I walked into

The team had the idea and a nearly empty extension scaffold. The product was clear: a Gmail user attaches a file, it is encrypted in the browser, and the recipient decrypts it without either side managing keys by hand.

The encryption design already existed. Files were encrypted in the browser with keys issued through Web3Auth (called Torus at the time), stored as encrypted blobs on decentralized storage, and swapped in the email for a link. Plaintext never left the user's machine.

That is the whole pipeline, and it is the part that sounds hard. It was not the risk.

## The riskiest thing went first

The risk was Gmail.

Gmail has no API for "the user just attached a file to a draft". Its web interface is a large single-page app with obfuscated class names that change without notice. If I could not reliably detect an attachment and replace it before send, there was no product, however good the encryption was.

So the first days went to Gmail, not to cryptography. I evaluated two libraries. gmail.js is open source and lightweight, and breaks when Gmail changes its DOM. InboxSDK is maintained by Streak, a company whose own product depends on it, and is sturdier. I ended up using both: gmail.js to observe the compose flow, InboxSDK where its UI hooks were more reliable.

The order mattered more than the choice. Had I spent two weeks on the encryption pipeline and then found that Gmail integration was a dead end, those two weeks would have been a very thorough way to learn nothing.

## What I cut

Not in the first version:

- Attachment previews
- Group encryption, where each recipient has a different key
- Any email provider other than Gmail
- A mobile companion

All of these were on the roadmap. None was needed for one person to send one encrypted file to another, which was the entire promise.

## What I added in week three

I also added something that was not in the plan.

During testing it became obvious that the product was useless if both people needed the extension. Nobody installs software to open one attachment from a stranger. So I built a small web app: the recipient clicks the link, signs in, and the file is decrypted in the browser, no install required.

It probably doubled the number of people the product could reach, and it ran against the instinct to cut. Scoping removes whatever the promise does not need. It should not remove something the promise falls over without. A sender with the extension and a recipient without it is the normal case, so the fallback belonged in the first version.

## The fight I should have picked

The original plan was Chrome only. Then the company wanted Firefox as well, for the initial launch.

I said yes, with no counter-offer.

It cost days I did not have. The two browsers share most of the extension API but differ in permissions, background scripts and store review, so every feature was tested twice. InboxSDK was unreliable on Firefox, so that version leaned on gmail.js alone and was kept minimal.

[TODO: state whether the Firefox version shipped at launch, shipped later, or was dropped.]

What I should have said is "Chrome on day 30, Firefox two weeks after". That is not a refusal. It is the same work in a different order, and it would have given those days to polish and edge cases on the Chrome version. New joiners assume they have no standing to say this. They have more than they think, because they are the only person in the room who has just estimated the work. I wrote about how to say it in [stop nodding in meetings](/blog/how-to-disagree-with-leadership/).

## The last week

The core flow worked and the edges did not. Large files needed chunked uploads and honest progress. Gmail's DOM needed defensive handling everywhere, so that a missing element degraded quietly instead of breaking the compose window.

Chrome Web Store review took about three days and approved it on the first submission.

## What happened next

Skizzle was live for about three months. Then the company moved from decentralized storage to decentralized infrastructure, Newfang became Arcana Network, and the extension was discontinued.

Shipping it taught me less about extensions than about the order of work: riskiest integration first, the promise before the features, and the scope conversation while it is still cheap. Three years later the same habits went into [a ten-chain wallet](/blog/chrome-extension-wallet/), where the stakes were someone's money and not their attachment.
