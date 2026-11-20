---
title: "You Can't Keep Up With AI. Nobody Can. Build a Filter Instead"
description: "Every week brings a new model, a new framework and a thread announcing that everything you know is obsolete. Trying to follow all of it is how people burn out and still fall behind. The filter I use to decide what deserves my attention, and what can safely wait."
date: 2026-11-17
postTags: ["posts", "ai", "career", "learning"]
category: "AI & Engineering"
keywords:
  [
    "how to keep up with AI",
    "keeping up with tech trends",
    "AI news overload",
    "AI FOMO",
    "learning new technology",
    "staying relevant as an engineer",
  ]
image: "/images/blog/how-to-keep-up-with-ai.png"
faq:
  - q: "How do you keep up with AI news without burning out?"
    a: "Stop trying to follow everything. Separate news, which changes weekly, from capabilities, which change every few months, and fundamentals, which barely change. Give attention only to things that change what you can build or what it costs, that have survived more than one release, and that you can try on real work in under an hour."
  - q: "How much time should an engineer spend on new AI tools?"
    a: "A fixed, small budget works better than constant browsing. A couple of hours a week is enough for most people: a short scan of primary sources, an hour trying one thing on a real task, and a few minutes writing down what changed for you."
  - q: "Is it a mistake to wait before adopting new AI tools?"
    a: "Usually not. A launch is a claim, and the second release is evidence. Waiting a few weeks costs little for most tools, while switching your team's tools every month destroys the compounding that comes from getting good at one setup."
---

Monday morning. Three model launches over the weekend. A new agent framework with a logo and a waitlist. A thread with forty thousand likes explaining that everything you learned last year is now worthless, followed by a second thread explaining that the first thread is wrong.

By Wednesday there are two more launches. By Friday you have twenty-three tabs open, each one titled some version of "this changes everything". Everything has been changed several times this month, and you still have to finish the ticket you started on Monday.

If this feels like falling behind, I have good news and bad news. The bad news is that you cannot keep up. The good news is that nobody can, including the people posting the threads. The ones who look like they are keeping up are mostly better at ignoring things.

## The feed is not the field

Most of what arrives in your feed is news. News is real, but it has a very short half-life. A benchmark result, a funding round, a leaderboard shuffle and a viral demo will all be irrelevant within a month.

I sort what I see into three layers:

- **News** changes weekly. Launches, rankings, announcements, opinions about announcements.
- **Capabilities** change every few months. What a model can now do reliably, what it costs, how much it can read at once, which tasks moved from "impressive demo" to "boring and dependable".
- **Fundamentals** barely change. How to frame a problem, model data, design for failure, keep a system secure, reach a customer, write clearly.

The feeling of falling behind comes from treating the first layer as if it were the second. Almost all of your attention belongs to the second and third.

## Three questions before anything gets my time

Before a new tool or model gets more than a glance, it has to pass a short filter.

**Does it change what I can build, or what it costs?** A model that is slightly better at a benchmark changes nothing for me. A model that makes a task cheap enough to run on every request, or reliable enough to run without a human watching, changes my plans.

**Has it survived a second release?** A launch is a claim. The second release, and the people still using it a month later, are evidence. Most things that matter are still there in a month. Most things that are not still there did not matter.

**Can I try it on real work in under an hour?** Not a demo, not the example in the announcement. My actual task, with my actual mess. If the setup takes a day, it can wait until the setup takes an hour, which for useful tools tends to happen quickly.

Something that passes all three gets real time. Everything else gets a bookmark, and I rarely open the bookmarks, which is itself useful information.

## Hands over headlines

Reading about a tool tells you what its makers want you to believe. Using it for an hour tells you what it does.

So the rule I keep is one real experiment a week. Pick one thing that passed the filter and use it on a task I would have done anyway. Then write three lines in a running note: what I tried, what surprised me, and whether I would use it again.

After a few months that note is worth more than any newsletter. It is a record of what actually changed for me, in my work, and it makes the next decision faster because I can see which kinds of tools tend to earn a place and which tend to disappoint.

## Read the source, not the reaction

Most of the noise is commentary on commentary. The cheapest way to cut it is to go upstream.

- **Release notes and changelogs** say what changed, without the adjectives.
- **Documentation** says what a tool is actually for, and the limitations section is usually the most honest page on the site.
- **Model and system documentation** from the providers explains what a model is meant to do and where it is known to fail.
- **Research abstracts** for the occasional paper that everyone is arguing about. The abstract and the limitations section are often enough.
- **A handful of practitioners who show their work.** People who post what they built, what broke and what it cost, rather than what they predict.

And unfollow generously. An account that announces a revolution every week is not giving you information. It is giving you a mood.

## A budget, not a habit

Constant browsing feels like learning and mostly isn't. A fixed budget works better, because it forces the filter.

What works for me is roughly two hours a week:

- Thirty minutes scanning primary sources for anything that passes the three questions
- An hour trying one thing on real work
- A few minutes writing down what changed

The rest of the week I build. That is not a sacrifice. Building is where you find out which of the announcements were real.

## The quiet cost of being first

There is a social pressure to be the first person on the team using the new thing. Being early has a price that rarely gets mentioned.

Early versions break, change their interfaces and sometimes disappear. And for a team, switching tools every month means nobody ever gets good at any of them. Most of the productivity from a tool comes after the first few weeks, once people have learned its habits and built their workflow around it. A team that switches constantly pays the learning cost forever and never collects the return.

So I am happy to be early on my own time and deliberately a little late for the team. Let the new thing prove itself on my side projects. Bring it to the team once it has survived a second release and I can say exactly what it is better at.

## What to learn instead

If you want a durable advantage, put the saved hours into things that will still matter after the next ten launches:

- Understanding the domain you work in, deeply enough to know which problems are worth solving
- System design and failure handling
- Security, which every new capability makes more important, not less
- Writing, because every tool you use now runs on clear instructions
- Getting close to users

None of these trend on Monday morning. All of them were valuable before the current wave and will be after it. I make the longer version of this argument in [AI is coming for the coders](/blog/ai-will-replace-coders-not-software-engineers/).

## Close the tabs

You do not need to know everything released this week. You need to notice the few things that change your work, early enough to use them and late enough that they actually work.

That is a filter, not a feed. Build the filter, close the twenty-three tabs, and finish the ticket. When something matters, it will still be there next week, usually with better documentation.
