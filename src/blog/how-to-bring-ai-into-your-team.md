---
title: "Mandate AI Tools and Your Team Will Learn to Fake Using Them"
description: "Leaders who order AI adoption get usage dashboards and theater. Leaders who ignore it get people pasting company data into personal accounts. How to bring AI into a team gracefully: start with the work people hate, set guardrails early, measure outcomes and make room for the skeptics."
date: 2026-11-18
postTags: ["posts", "ai", "leadership", "teams"]
category: "Career & Leadership"
keywords:
  [
    "AI adoption in engineering teams",
    "how to introduce AI tools to a team",
    "AI mandate at work",
    "embracing AI at work",
    "engineering leadership AI",
    "shadow AI",
  ]
image: "/images/blog/how-to-bring-ai-into-your-team.png"
faq:
  - q: "Should companies mandate the use of AI tools?"
    a: "A mandate tied to usage numbers tends to produce usage, not results. People open the tool to keep the metric green. It works better to make approved tools easy to access, set clear data rules, start with tedious work and measure outcomes such as cycle time and quality."
  - q: "What is shadow AI?"
    a: "Employees using AI tools the company has not approved, often personal accounts, for work tasks. It is the usual result of a company having no AI policy at all, and the main risk is company or customer data being pasted into services nobody has vetted."
  - q: "How do you handle engineers who are skeptical of AI?"
    a: "Treat them as reviewers, not resisters. Skeptics are often the best at spotting where generated work is subtly wrong. Ask them to judge results on real tasks rather than arguing in the abstract, and keep the rule that everyone owns what they submit, whatever tool produced it."
---

The memo goes out on a Monday. Starting this week, every engineer uses AI tools. A dashboard will track adoption. Teams will be compared.

By the end of the month the dashboard looks wonderful. Usage is up everywhere. The number of prompts per engineer per day has a nice upward curve, and it goes in the board deck.

Delivery is exactly the same. Some people open the assistant, ask it something, close it, and get on with their work the way they always did, because the number needs to be green. A few use it for real and have found it helpful for some things and useless for others, which the dashboard has no way to show.

Economists have a name for this, Goodhart's law: when a measure becomes a target, it stops being a good measure. AI adoption is the latest place it applies, and it applies fast.

## The two ways to get this wrong

**The mandate.** Order adoption, measure usage, reward the number. You get theater, and you lose the honest feedback about where the tools help, because nobody wants to be the one whose bar is short.

**The shrug.** Say nothing, approve nothing, and assume people will figure it out. They will. They will use personal accounts, paste in whatever they are working on, including code, customer records and internal documents, and the company will have no idea which services hold its data. This has a name too: shadow AI. It is what happens in companies that have no policy.

The graceful path sits between the two. It treats AI as a change in how work gets done, which means it gets managed like any other change: deliberately, with guardrails, and with attention to the people doing the work.

## Start with the work people hate

The worst way to introduce AI is to point it at the part of the job people are proudest of. A senior engineer who loves designing systems does not want to be told a chatbot will do it now.

Start with the toil instead. Every team has a list:

- Writing tests around old code before anyone dares change it
- Upgrading a framework across hundreds of files
- Turning a meeting or an incident into a written summary
- Writing documentation nobody has time for
- Reading an unfamiliar codebase to answer one question

These are tasks people will happily hand over, the results are easy to check, and the time saved is visible. Adoption that starts with relief spreads on its own. Adoption that starts with threat has to be enforced.

## Permission and guardrails, on the same day

Teams need to hear two things at once: "you are allowed to use this" and "here is how".

The "how" does not need to be long:

- Which tools are approved, and how to get access to them
- What must never go into a prompt: secrets, credentials, customer data, anything under a confidentiality agreement
- That generated code gets reviewed exactly like human code
- That agents with access to email, files or production systems need extra care, because content they read can carry instructions

I cover the security side in more depth in [what I'd lock down on day one](/blog/security-practices-every-company-needs/) and [your AI feature is an intern who believes everything it reads](/blog/securing-ai-features-prompt-injection/).

The order matters. Guardrails published after people have already built habits are much harder to enforce than guardrails that arrive with the permission.

## Leaders go first, including the failures

People copy what leaders do, not what they announce.

The most useful thing a lead can do is use the tools in the open. Share the prompt that saved an afternoon. Share the one that produced confident nonsense, and how you caught it. Say which tasks you have stopped using it for.

That second half is the important part. If the only stories people hear are success stories, they assume their own disappointing results mean they are doing it wrong, and they go quiet. Honest failures give everyone permission to report what is actually happening.

## Measure outcomes, not usage

Usage is the easiest number to collect and the least useful one to have.

Look at the things you cared about before AI existed:

- How long work takes from start to production
- How much review effort each change needs
- How often changes cause incidents or get rolled back
- How the team feels about its workload

If those improve, adoption is working, whatever the usage chart says. If usage is high and these are flat or worse, the tools are being used for show, or used badly, and that is worth knowing early. Higher output with more rework is not a gain. It is the debt I describe in [tech debt got a cheaper interest rate](/blog/is-tech-debt-still-debt-in-the-age-of-ai/).

## Make room for the skeptics

Every team has a few people who are unimpressed. It is tempting to treat them as a problem to manage.

They are usually your best reviewers. Skeptics are good at spotting where generated work is subtly wrong, because they are looking for it. Give them real tasks to judge rather than arguments to win. Some will change their minds. Some will find the exact places where the tools should not be used, which is just as valuable.

The opposite type needs a boundary too. The enthusiast who submits large amounts of generated code they have not really read is a bigger risk than the skeptic. One rule covers both: you own what you submit, whatever produced it. "The AI wrote that" is not an explanation in a code review or an incident review.

## Protect how people learn

Juniors are the group most likely to be harmed by careless adoption, because the simple tasks they used to learn on are the first tasks AI absorbs.

That does not mean keeping juniors away from the tools. It means asking more of them: explain every line you submit, write the design note before the code, sit in on the incident call. I go into this in [AI is coming for the coders](/blog/ai-will-replace-coders-not-software-engineers/), along with why code review gets harder for the lead.

## For the individual: it is fine to feel strange about it

Most writing about AI adoption is aimed at managers. A word for the person on the receiving end.

If you built your identity around writing code well, watching a tool produce in a minute what used to take you a day is unsettling. That feeling is normal, and pretending it is not makes adoption worse, because people who feel threatened tend to either refuse the tools or overuse them to prove they are keeping up.

A distinction that helps: separate the part of the work you enjoy from the part that happened to be required. For most engineers the enjoyable part is solving problems. Typing was how the solutions got out of your head. The typing is now cheaper. The problems are not, and there are more of them, because more gets built.

## The signs it is working

- People mention specific tasks the tools are good and bad at, without being asked
- Review comments get more interesting, about design and edge cases rather than formatting
- Delivery and quality numbers improve, or at least the boring work stops piling up
- Nobody is pasting company data into personal accounts, because the approved option is easier
- The skeptics are still on the team and still being listened to

None of these show up on a usage dashboard. All of them show up if you talk to the team.
