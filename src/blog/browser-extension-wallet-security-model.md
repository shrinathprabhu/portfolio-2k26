---
title: "The Security Model of a Browser Extension Wallet: Where the Trust Boundaries Are"
description: "A browser wallet runs in four separate contexts with different privileges. Knowing which ones an attacker controls explains almost every wallet security decision, from provider injection to the confirmation screen."
date: 2026-06-10
postTags: ["posts", "security", "chrome-extensions", "web3"]
category: "Security"
keywords:
  [
    "browser extension security",
    "wallet security",
    "Manifest V3",
    "content script",
    "provider injection",
    "EIP-6963",
    "blind signing",
    "non-custodial wallet",
    "Chrome extension architecture",
  ]
# image: "/images/extension-wallet-security.png"
---

A browser extension wallet holds keys that control real money and runs inside the same browser as every website the user visits. The reason this is workable at all is that an extension is not one program. It is several, running in separate contexts with different privileges, passing messages across boundaries.

I built a non-custodial wallet extension supporting 10+ chains. Almost every security decision came down to one question: which side of which boundary is this code on?

## The four contexts

**1. The web page (main world).** The site's own JavaScript. A wallet has to assume this is hostile. It might be a phishing site, or a legitimate site with a compromised dependency.

**2. The injected provider.** To be usable, a wallet exposes an object to the page, traditionally `window.ethereum`. That script runs in the page's own JavaScript world, with the page's privileges. The page can read it, wrap it, and replace its functions. It is untrusted code that happens to be yours.

**3. The content script.** It runs in an isolated world: it shares the page's DOM but not its JavaScript variables, and it can talk to the extension. It is the bridge, and it is the first place where you hold any privilege.

**4. The extension itself.** The background service worker and the wallet UI. This is the only place that should ever touch key material.

The trust boundary is not between the extension and the website. It runs through the middle of your own code, between the injected provider and the content script.

## Rule 1: Everything from the page is untrusted

A request such as "send this transaction" travels from the page to the provider, to the content script, to the service worker. By the time it arrives it looks like an internal message from your own code. It is not. The page chose every byte.

So the privileged side validates everything as if it came from the internet:

- Check the method against an allow-list.
- Validate the type and shape of every parameter.
- Take the requesting origin from the browser's message sender information, never from a field in the message. The page can write any origin it likes into the payload.

## Rule 2: Keys never cross the boundary

The page asks for outcomes: an address, a signature. It never receives a key, and there is no message type that returns one. If no code path exists, no bug or injected instruction can trigger it.

Inside the extension, key material is never stored in plain form, and it is only ever usable in memory while the wallet is unlocked.

## Rule 3: Manifest V3 changes how you hold state

Under Manifest V3 the background page is a service worker that the browser can stop at any time and restart on the next event. Global variables do not survive. For a wallet this has a direct consequence: the unlocked state disappears when the worker is terminated.

The naive fix, writing the decrypted key to persistent storage so it survives a restart, is the worst possible choice. Unlocked secrets belong in session-scoped, in-memory storage that is cleared when the browser closes. The design goal is that a restart costs the user an unlock prompt, never their security.

Manifest V3 also forbids remotely hosted code. Everything the extension executes ships in the reviewed package. That is a constraint and a real protection: a compromised server cannot push new logic into installed wallets.

## Rule 4: The confirmation screen is the security control

Cryptography is rarely where users lose funds. They approve something they did not understand. So the approval screen carries more weight than any other part of the interface.

- It is rendered by the extension, in the extension's own context. The page cannot draw over it or change its text.
- It is built from the decoded transaction, not from a description supplied by the site. A site that says "Claim reward" while the data says "approve unlimited spending" should produce a screen that says the second thing.
- It shows the verified origin of the request, so a lookalike domain is visible.
- When the wallet cannot decode what is being signed, it says so plainly. An honest "we cannot tell what this does" is safer than a confident summary.

Blind signing, approving opaque data, is the root of most wallet-draining attacks. A wallet's job is to make the true action legible at the moment of consent.

## Rule 5: Ask for the minimum

Every permission in the manifest is surface an attacker inherits. A wallet needs to inject a provider broadly, which is already a significant grant, so everything else should be narrow: no optional capability requested up front, and as few files exposed to pages as possible. Resources that are web-accessible can also be probed by sites to detect that the extension is installed.

## Provider discovery

For years wallets competed to own `window.ethereum`, each overwriting the last. Besides being fragile, it meant a page could not be sure which wallet it was talking to. The newer discovery approach has each wallet announce itself through events, with a name, an icon, and its own provider object, and lets the user choose. Supporting both keeps a wallet compatible with older dApps without depending on winning a race.

## The general lesson

Draw the contexts first. For each one, write down who controls it and what it can reach. Then make sure that the least trusted context can only request, and the most trusted one decides, validates, and shows the user the truth. That applies well beyond wallets, including to any product where an AI agent sits between untrusted content and a privileged action.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. The architecture of the wallet itself is in [how I built a Chrome extension wallet for 10+ blockchains](/blog/chrome-extension-wallet/)._
