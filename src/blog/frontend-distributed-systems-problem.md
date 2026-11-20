---
title: "Frontend Is a Distributed System. Staff It Like One"
description: "Your frontend runs on devices you do not own, in runtimes you did not choose, over networks you cannot see. Teams that plan it as 'the UI layer' and staff it one to four against backend are making a resourcing decision based on the wrong picture."
date: 2026-05-04
postTags: ["posts", "frontend", "architecture", "leadership"]
category: "System Design"
keywords:
  [
    "frontend architecture",
    "frontend team structure",
    "frontend to backend engineer ratio",
    "staff frontend engineer",
    "frontend complexity",
    "distributed systems",
    "web performance",
  ]
image: "/images/blog/frontend-distributed-systems-problem.png"
---

A common project plan: four backend engineers, one frontend engineer, and a line item that says "UI".

The reasoning is that the backend is the system and the frontend is its display. I think that picture is out of date, and the staffing ratio that follows from it is where a lot of late projects come from.

A service runs on machines the team chose, on a runtime it pinned, on a network it controls. A frontend is the same product deployed to thousands of machines nobody on the team has seen, each with its own runtime, its own network, and its own copy of state. That is a distributed system by any definition I know. The difference is that every node has a person watching it.

This is not an argument that frontend is harder than backend. Coordination between services, data consistency at scale and database performance are hard, and I am glad other people are good at them. My argument is narrower: if you plan the frontend as a layer, you will under-resource a system.

## The runtime is chosen by the user

A backend team picks a language version, tests against it and deploys to it.

A frontend runs wherever the user opens it: a current browser, one that has not been updated in a year, Safari with its own rendering behavior, Samsung Internet, which has a very large user base and which most teams never open, or a browser embedded inside another app. Each one differs in what it supports and how it fails.

The extreme case in my own work was the Arcana wallet, a Chrome extension whose code had to run inside other companies' websites: their security policies, their frameworks, their scripts competing for the same globals. "Does it work" meant "does it work inside every app our users visit". I cover the decisions behind it in [the wallet post](/blog/chrome-extension-wallet/).

For planning purposes: the test matrix is set by the users, and nobody on the team can prune it by decree.

## The network is the public internet

Services talk to each other over links the company controls. When those links fail, there are retries and circuit breakers, and nobody is watching.

A frontend talks over whatever the user has: fiber in Mumbai, 4G on a train, a corporate VPN that strips headers. And when it fails, a person is looking at the screen while it does.

On SendIt, which peaked at about 20,000 daily users, that turned into product work. "The server returned an error", "the request timed out" and "you are offline" are three different situations with three different screens and three different recovery paths. Showing a transfer as sent before it was confirmed was a decision with consequences on a slow connection, and it had to be made deliberately. Traffic at that scale also pushed us off our hosting plan, a story I tell in [how I make technical decisions](/blog/how-i-make-technical-decisions/).

## State lives in several places that disagree

A service usually has one source of truth, and consistency is the database's job.

A frontend holds state from the server, which may be stale, state in the page, state in the URL, state in browser storage, and state from the device itself, such as being offline. These disagree all the time, and the reconciliation happens while someone is clicking.

The CAP theorem shows up here in a small, familiar way. A backend can sometimes choose consistency and refuse to answer. A frontend rarely has that choice. It has to stay usable when one endpoint has timed out, which means it is constantly choosing availability and then repairing the inconsistency afterward. That is real design work, and it almost never appears in an estimate.

## Constraints that never reach the API

Some requirements exist only at the edge.

**Accessibility.** A button that works with a mouse and not a keyboard is a bug. So is a dialog that does not return focus when it closes, or a chart that carries its meaning only in color. This shapes every component, and it cannot be added in the last sprint.

**Internationalization.** On the server it is a string lookup. On the client it is layout, typography, media and persistence at once. The learning app I describe in [the one-week MVP post](/blog/delivering-mvp-in-a-week/) had to switch a video's audio and subtitles along with every label, and keep the layout intact in scripts where the same button text is twice as long.

**Perceived performance.** Server performance is response time. Frontend performance is what a person feels. A page can complete every operation quickly and still feel slow because the layout jumped. The Core Web Vitals, Largest Contentful Paint, Cumulative Layout Shift and Interaction to Next Paint, measure perception, which is why they are harder to move than a latency graph.

**Discoverability.** Nobody crawls your API. Search engines and AI crawlers read your frontend, and whether they can depends on rendering decisions made early. On Nexus Fastbridge, each chain needed its own indexable page. I solved it with a build-time script that generates static HTML per chain, with the React app hydrating on top, so we did not have to take on a server runtime. That was a build and deployment decision driven entirely by a frontend requirement.

## Testing is probabilistic

A unit test for a pure function is deterministic. A test of an interface depends on rendering timing, animation frames, network speed and input type. A layout that holds in one engine overflows in another. A drag interaction that works with a mouse fails with touch.

That is why frontend testing is layered: logic, components, user flows, visual regression. No single layer covers what "it works" means, and the flakiness people complain about is the environment being honest about itself.

## What this means for how you staff

Here is the organizational point, stated plainly.

**Ratios.** One frontend engineer to four backend engineers assumes the client is a thin layer. For an internal tool, it may be. For a consumer product, or anything where money moves, the client carries failure handling, state reconciliation, accessibility, performance and discoverability. Count those as systems when you plan.

**Estimates.** If a frontend estimate covers only the screens in the mockup, it covers the happy path. The states between the screens are where the time goes. I list them in [designing multi-step flows that survive failure](/blog/designing-multi-step-flows-that-survive-failure/).

**Seniority.** Teams put their most experienced people on the backend and their newest on the frontend, then wonder why the product feels unreliable when the services are fine. The edge is where users decide whether to trust you. Put someone senior there.

**Design reviews.** If architecture reviews cover services and data but not client state, offline behavior and error paths, half the system is not being reviewed.

**On-call.** Client failures do not page anyone. They show up as churn. Somebody should own watching for them.

None of this needs a bigger team. It needs the plan to describe the system that actually exists. When the line item says "UI", that is usually a sign the plan has not been thought through yet.
