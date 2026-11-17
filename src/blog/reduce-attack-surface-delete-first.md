---
title: "The Cheapest Security Tool You Own Is the Delete Key"
description: "In 2024, a tiny script that over a hundred thousand websites had forgotten they were loading started serving malware. Nobody was hacked in the usual sense. The story of Polyfill.io, and why the first move in security is to remove things, not add them."
date: 2026-11-07
postTags: ["posts", "security", "architecture", "frontend"]
category: "Security"
keywords:
  [
    "reduce attack surface",
    "attack surface reduction",
    "polyfill.io attack",
    "third-party script risk",
    "dependency security",
    "frontend security",
    "supply chain security",
  ]
image: "/images/blog/reduce-attack-surface-delete-first.png"
faq:
  - q: "What is an attack surface?"
    a: "Everything an attacker could possibly touch: your pages, APIs, dependencies, third-party scripts, cloud accounts, employee logins and forgotten test servers. The larger it is, the more places there are for something to go wrong."
  - q: "What is the fastest way to reduce attack surface?"
    a: "Delete what you do not use. Remove unused dependencies, third-party scripts, old endpoints, stale accounts and forgotten subdomains. Something that does not exist cannot be exploited, and removal needs no budget."
  - q: "What happened with Polyfill.io?"
    a: "Polyfill.io was a free service many sites used to support old browsers. In 2024 the domain changed ownership and began serving malicious code to visitors of sites that still loaded it. More than a hundred thousand websites were reported as affected, most of which no longer needed the script at all."
---

Here is a security incident where nobody guessed a password, nobody found a bug in anyone's code, and nobody clicked a suspicious link.

For years, a free service called Polyfill.io helped websites work on old browsers. You added one line to your page, and it filled in whatever features an ancient browser was missing. Helpful. Free. Recommended in tutorials everywhere. So people added the line and, being people, forgot about it.

Browsers improved. The script stopped being needed. The line stayed.

In 2024, the domain was sold to a new owner. Shortly after, the script began sending malicious code to visitors on some of those sites, redirecting people to scam pages. Security researchers reported more than a hundred thousand websites affected. Most of them were loading a script they had not needed in years, from a domain they did not control, owned by someone they had never heard of.

Nobody broke in. The door had been left open by a line of HTML that no one remembered writing.

## What attack surface means

**Attack surface** is everything an attacker could possibly touch. Every dependency, every third-party script, every API endpoint, every admin login and every "temporary" test server adds to it.

Most security advice is about adding protection. This post is about having less to protect.

## Why adding is the instinct, and why it is backwards

When a team gets serious about security, it usually buys something: a scanner, a firewall, a monitoring service. Each of these is useful. Each is also more software, with its own access, its own bugs and its own login. You have added a guard and a new way in at the same time.

Deleting has none of those costs. Code that is not there has no vulnerabilities. A dependency you removed cannot be hijacked. An account you closed cannot be phished. It is the only security measure that also makes your product faster and your bills smaller.

So my order is always the same: **remove, then restrict, then monitor.**

## Remove: the things I look for first

**Third-party scripts.** Analytics, chat widgets, A/B testing tools, tag managers, that survey tool marketing tried once in 2022. Each one runs with full power on your page. It can read what users type. List them all, and ask of each: who owns this, and would anyone notice if it were gone? You will find a few nobody can explain.

**Dependencies.** A modern JavaScript project can pull in over a thousand packages to render a button. In September 2025, a maintainer of hugely popular npm packages was phished and malicious versions were published. Every package is a person you are trusting. Trust fewer people.

**Old endpoints.** Version one of the API, still running "in case someone uses it". Debug routes. The export feature for a customer who left.

**Forgotten infrastructure.** Staging servers with production data. Subdomains pointing at services you canceled, which an attacker can claim. Storage buckets from a migration.

**Stale access.** Accounts of people who left. API keys for integrations that ended. Admin rights granted during an emergency eighteen months ago.

**Data.** You cannot leak what you did not keep. If you do not need the date of birth, do not collect it.

A reliable rule: if nobody on the team can say what something is for, it is a liability and not an asset.

## Restrict: for what has to stay

Once you have deleted what you can, shrink what remains.

- **A strict Content Security Policy** that starts by denying everything and allows only what the page needs. Had those sites had one, a hijacked script would have been far less useful to the attacker.
- **Subresource Integrity** on any script you must load from elsewhere, so a changed file is refused.
- **Self-host** what you can. A file on your own domain cannot be sold to a stranger.
- **Least privilege** for every key, token and account.
- **Nothing sensitive in the frontend.** The browser is a public place.
- **Browser permissions** switched off by default: camera, microphone, location.

This site is a small example. It loads no third-party scripts at all, and its security policy denies everything by default. That was not hard. It only required deciding it at the start.

## Monitor: last, and smallest

Monitoring matters, and it is third for a reason. Watching everything is expensive. Watching what is left after a clean-up is manageable.

- Alerts when production files change outside a release
- Dependency alerts for known vulnerabilities
- A regular review of who has access to what
- A scheduled look at what scripts your pages actually load

## Making it a habit

The reason attack surface grows is that adding is easy and nobody is assigned to subtract. A few habits fix that:

- **Every new dependency or script needs a named owner** and a one-line reason.
- **A quarterly clean-up.** An hour, the whole team, deleting things. It is oddly satisfying.
- **"Temporary" gets a date.** If it has no removal date, it is permanent.
- **Celebrate deletions.** A pull request that removes two thousand lines deserves more applause than one that adds them.

## A twenty-minute audit

1. Open your site, open the browser's network tab, and list every domain it contacts. Can you explain each one?
2. Count your direct dependencies. When was each last used?
3. List everyone with admin access. Any surprises?
4. List your subdomains. Do they all point to something you still run?
5. Search for API keys that have not been rotated in over a year.

Almost every team that does this finds something to delete within the first ten minutes.

The Polyfill story has a simple moral. Those sites were not careless about what they added. They were careless about what they never removed. For the larger checklist this fits into, see [the security bare minimum](/blog/security-practices-every-company-needs/), and for what happens when the thing being swapped is the screen itself, read about [the Bybit hack](/blog/bybit-hack-frontend-security-lessons/).
