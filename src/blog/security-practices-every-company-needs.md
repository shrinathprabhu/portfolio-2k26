---
title: "What I'd Lock Down on Day One as a Startup's First Senior Engineer"
description: "Most breaches involve a missing second factor, a leaked key or a help desk that reset a password for a stranger. If I joined a ten-person startup tomorrow, this is the order I would work in, and what I would leave for later."
date: 2026-11-05
postTags: ["posts", "security", "startups", "leadership"]
category: "Security"
keywords:
  [
    "startup security",
    "security for early stage startups",
    "first engineer security checklist",
    "MFA passkeys",
    "secrets management",
    "least privilege",
    "incident response plan",
  ]
image: "/images/blog/security-practices-every-company-needs.png"
faq:
  - q: "What are the most important security practices for a small company?"
    a: "Phishing-resistant multi-factor authentication on every account, a password manager, secrets kept out of code, least-privilege access, automatic updates, tested backups and a one-page incident plan. These address the causes of the large majority of real breaches."
  - q: "When should a startup start thinking about security?"
    a: "Before the first customer. The basics cost little when the company is five people and a great deal when it is fifty. Retrofitting access controls and secret handling into a grown organization is much harder than starting with them."
  - q: "Is multi-factor authentication enough?"
    a: "It is the single most effective control, but the type matters. Codes sent by SMS or typed from an app can be phished. Passkeys and hardware security keys cannot be, because they are bound to the real website. Use those for email, code hosting, cloud and finance accounts."
---

Suppose I join a ten-person startup tomorrow as the first senior engineer. There is no security team and there will not be one for two years. Nobody has asked me to do security. It is mine anyway, because I am now the person who would be asked what happened.

Most companies are not breached by a clever exploit. They are breached through a reused password, an account with no second factor, a key in a repository, or a support agent who was talked into a reset. So the first week is not about buying anything. It is about closing the doors that are known to be open, in order of how much risk each closes for the effort.

## Day one: who can log in to what

Before anything else I want a list: every system that matters, and every person and machine that can get into it. Email, code hosting, cloud console, domain registrar, payments, the bank.

It takes a few hours and it always turns up surprises. A contractor who left in spring. A shared login in a spreadsheet. An admin role granted during an outage and never removed.

Then I close what should be closed that same day. No tool is needed, and nothing else I do matters while a former contractor can still deploy.

## Week one: logins that cannot be phished

If I could do only one thing, it would be this.

In 2024, attackers used stolen passwords to get into customer accounts on the Snowflake data platform that did not have multi-factor authentication turned on, and data from companies including Ticketmaster and AT&T was taken. The same year, the attack on Change Healthcare, which disrupted US healthcare payments for weeks, began through a remote access portal without MFA, as the parent company's CEO told the US Congress.

So: passkeys or hardware keys, not SMS codes, on email, code hosting, cloud, the registrar and banking. Enforced centrally, not left to each person's good intentions. A password manager for everyone, so that reuse stops being the path of least resistance. Single sign-on where the plan allows it, so that one switch removes a leaver from everything.

## Week one: secrets out of the code

Keys end up in repositories, chat messages, screenshots and now AI prompts. Automated scanners find leaked keys in public repositories within minutes.

- Secrets live in a secrets manager or the platform's encrypted settings.
- Secret scanning with push protection is on in the code host.
- Credentials are short-lived wherever possible.
- Nothing secret ships to a browser. Anything in frontend code is public.

When a secret leaks, it gets rotated. Deleting the commit does not undo anything. And rotation has to be possible before the bad day: if the rotation path is broken or undocumented, asking the team to rotate is like a bank saying "change your PIN" while the ATM is down.

## Month one: the path to production

This is the part most startups have never looked at. Who, and which laptops, can change what customers are served?

I want protected branches, a second person on anything that reaches production, and CI credentials that are scoped and short-lived. The Bybit theft is the case study for why, and I go through it in [the $1.5 billion lesson](/blog/bybit-hack-frontend-security-lessons/). Along the same lines, every dependency and third-party script is code from a stranger running with your permissions. The cheapest fix there is to remove things, which is its own post: [the delete key](/blog/reduce-attack-surface-delete-first/).

## Month one: the people who can be talked into things

In 2023, attackers reportedly got into MGM Resorts by phoning the IT help desk and impersonating an employee. The company put the cost at around $100 million. With cheap voice cloning, this is easier than it was.

A ten-person startup has no help desk, which means everyone is the help desk. Two rules cover most of it. A request involving money or access gets confirmed on a second channel. And "let me verify that" is a normal thing to say, including when the request appears to come from the founder.

## Month one: being able to recover

**Backups you have restored.** A backup that has never been restored is a hope. I want one copy that ransomware cannot reach from the main systems, and one rehearsed restore.

**Logs you can read.** After an incident the first question is "what did they access". Without logs the honest answer is "we do not know", which is the worst thing to tell a customer. Sign-ins, permission changes, admin actions and access to sensitive data, kept somewhere an intruder cannot easily wipe.

**A one-page plan.** Who decides. Who to call: legal, hosting, insurer. How to talk if email and chat are compromised. How to revoke and rotate quickly. Who tells customers, and when. It is one page, and it needs to be written before the incident, not during it.

**Automatic updates.** Most exploited vulnerabilities already had a fix available. Operating systems, browsers and dependencies update themselves, and critical patches are treated as urgent work.

## The new one: rules for AI tools

Most small companies have no policy here, and their engineers are pasting things into prompts all day.

- Decide which tools are approved and what data may go into them.
- No secrets, customer data or private keys in a prompt.
- Generated code is reviewed as carefully as human code. It reproduces common vulnerabilities.
- Agents with access to email, files or production get treated with suspicion, because content they read can contain instructions. See [your AI feature is an intern who believes everything it reads](/blog/securing-ai-features-prompt-injection/).

## What I would not do yet

- Buy a security product before the list above is done
- Start a compliance certification before a customer asks for one
- Commission a penetration test of a system with no MFA
- Write a forty-page policy nobody will open

All of these have their time. For a ten-person company, that time comes after the basics are in place.

## Why it gets skipped, and the fix

Nothing has happened yet, so it never feels urgent. It adds friction, and friction is easy to argue against in a planning meeting. It is invisible when it works: nobody is thanked for the breach that did not happen.

Mostly, though, nobody owns it. The fix is one named person, not necessarily a specialist, who is responsible for this list and reports on it. In a ten-person startup that is the first senior engineer, whether or not anyone said so in the interview.

None of this makes a company unbreakable. It moves it out of the large group of easy targets, which is where most attackers spend their time.
