---
title: "The Security Bare Minimum: 12 No-Brainers Before You Hire a Security Team"
description: "Most breaches do not involve brilliant hacking. They involve a missing second factor, a leaked key or a help desk that reset a password for a stranger. The twelve practices every company should have in place, in priority order, with the incidents that prove each one."
date: 2026-11-05
postTags: ["posts", "security", "startups", "leadership"]
category: "Security"
keywords:
  [
    "security best practices for startups",
    "security checklist for companies",
    "basic cybersecurity practices",
    "startup security",
    "MFA passkeys",
    "secrets management",
    "supply chain security",
  ]
# image: "/images/security-bare-minimum.png"
faq:
  - q: "What are the most important security practices for a small company?"
    a: "Phishing-resistant multi-factor authentication on every account, a password manager, secrets kept out of code, least-privilege access, automatic updates, tested backups and a simple incident plan. These seven address the causes of the large majority of real breaches."
  - q: "When should a startup start thinking about security?"
    a: "Before the first customer. The basics cost little when the company is five people and a great deal when it is fifty. Retrofitting access controls and secret handling into a grown organisation is much harder than starting with them."
  - q: "Is multi-factor authentication enough?"
    a: "It is the single most effective control, but the type matters. Codes sent by SMS or typed from an app can be phished. Passkeys and hardware security keys cannot be, because they are bound to the real website. Use those for email, code hosting, cloud and finance accounts."
---

Most companies are not breached by a clever exploit. They are breached through a password reused from another site, an account with no second factor, an API key committed to a repository, or a support agent who was talked into resetting someone's access. The fixes are well known, cheap, and frequently skipped.

This is the list I would put in place at any company, in this order, before buying a single security product. I have ordered it by how much risk each one removes for the effort involved.

## 1. Phishing-resistant MFA everywhere

If you do one thing, do this. Stolen credentials are consistently among the top ways attackers get in, year after year, in Verizon's breach reports.

In 2024, attackers used stolen passwords to access customer accounts on the Snowflake data platform that did not have multi-factor authentication turned on. Data from very large companies, including Ticketmaster and AT&T, was taken. That same year, the attack on Change Healthcare, which disrupted US healthcare payments for weeks, began through a remote access portal without MFA, as the parent company's CEO told the US Congress.

Use passkeys or hardware security keys, not SMS codes, for email, code hosting, cloud consoles, domain registrars and banking. Enforce it centrally. Do not leave it to each person.

## 2. A password manager and single sign-on

People reuse passwords because they cannot remember two hundred of them. A password manager removes the reason. Single sign-on means that when someone leaves, one switch removes their access to everything.

## 3. Secrets never live in code

API keys and credentials end up in repositories, chat messages, screenshots and, now, AI prompts. Automated scanners find leaked keys in public repositories within minutes.

- Keep secrets in a secrets manager or your platform's encrypted settings.
- Turn on secret scanning with push protection in your code host.
- Use short-lived credentials wherever possible.
- When a secret leaks, rotate it. Deleting the commit is not enough.
- Never put a secret in frontend code. Anything shipped to a browser is public.

## 4. Least privilege, reviewed regularly

Everyone gets the access they need and no more. Access granted "temporarily" is the kind that stays for years.

- No shared accounts.
- Admin rights are the exception, and time-limited where possible.
- Review access every quarter and on every role change.
- Remove access the day someone leaves.

## 5. Protect the people who can be talked into things

In 2023, attackers reportedly got into MGM Resorts by phoning the IT help desk and impersonating an employee. The disruption cost the company around $100 million by its own estimate. With voice cloning now cheap, this is easier than it was.

- Identity checks for password and MFA resets that do not rely on information an attacker could find online.
- A callback rule for any request involving money or access.
- A culture where "let me verify that" is normal, including when the request appears to come from the CEO.

## 6. Patch automatically

Most exploited vulnerabilities already have a fix available. Turn on automatic updates for operating systems, browsers and dependencies, and treat critical security updates as urgent work.

## 7. Take your software supply chain seriously

You run far more code written by strangers than by your own team.

In September 2025, a maintainer of widely used npm packages, including `chalk` and `debug`, was phished, and malicious versions of packages with billions of weekly downloads were published. In 2024, a backdoor was found in the `xz` compression library after a patient, multi-year effort to gain a maintainer's trust.

- Commit lockfiles and install from them.
- Do not adopt brand-new package versions the hour they are published.
- Remove dependencies you do not need. I go deeper on this in [the cheapest security control is the delete key](/blog/reduce-attack-surface-delete-first/).
- Limit what build scripts and CI jobs can access.

## 8. Secure the path to production

The 2025 Bybit theft, about $1.5 billion, began with one compromised developer machine that could change files served to users. I wrote up [what that incident teaches](/blog/bybit-hack-frontend-security-lessons/).

- Protected branches and required review.
- No single person or laptop able to publish to production alone.
- CI credentials that are scoped and short-lived.
- Alerts when production assets change outside a release.

## 9. Backups that you have actually restored

A backup you have never restored is a hope. Keep copies that ransomware cannot reach from your main systems, and rehearse a restore at least twice a year.

## 10. Logging you can use

When something goes wrong, the first question is "what did they access". Without logs, the honest answer is "we do not know", which is the worst thing to tell customers and regulators.

Record sign-ins, permission changes, administrative actions and access to sensitive data. Keep the logs somewhere an intruder cannot easily delete them.

## 11. A one-page incident plan

It does not need to be elaborate. It needs to exist before the bad day.

- Who decides
- Who to call: legal, hosting provider, insurer
- How to communicate if email and chat are compromised
- How to revoke access and rotate secrets quickly
- Who tells customers, and when

## 12. Rules for AI tools

This one is new, and most companies have no policy.

- Decide which AI tools are approved and what data may be entered into them.
- Never paste secrets, customer data or private keys into a prompt.
- Review generated code as carefully as human code. It reproduces common vulnerabilities.
- Be cautious with agents that have access to email, files or production systems. Content they read can contain instructions. See [securing AI features](/blog/securing-ai-features-prompt-injection/).

## Why these are skipped

- **Nothing has happened yet**, so it does not feel urgent.
- **Nobody owns it.** Security is assumed to be someone else's job.
- **It adds friction**, and friction is easy to argue against in a planning meeting.
- **It is invisible when it works.** Nobody is praised for the breach that did not happen.

The fix is ownership. One named person, not necessarily a security specialist, who is responsible for this list and reports on it.

## Where to start this week

1. Turn on enforced MFA with passkeys or security keys for email and code hosting.
2. Roll out a password manager.
3. Enable secret scanning and rotate anything it finds.
4. List who has admin access to what, and remove what is not needed.
5. Write the one-page incident plan.

That is a few days of work for a small company. It will not make you unbreakable, since nothing does, but it removes you from the large group of easy targets, which is where most attackers spend their time.
