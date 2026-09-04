---
title: "Why I Am Building an Analytics Platform When Plausible Already Exists"
description: "There are already privacy-first analytics tools. Here is why I am building another one, what I think the market is missing, and an honest assessment of whether this is a good idea."
date: 2026-05-05
postTags: ["posts", "outline-analytics", "privacy", "startup"]
category: "Building"
keywords:
  [
    "web analytics",
    "privacy analytics",
    "Plausible",
    "Fathom",
    "Umami",
    "PostHog",
    "Google Tag Manager",
    "Outline Analytics",
    "cookie-free",
    "self-hosted",
    "TypeScript SDK",
    "rule-based tracking",
  ]
image: "/images/building-analytics.png"
featured: true
---

Plausible exists. Fathom exists. Umami exists. Simple Analytics exists. PostHog exists. The privacy-first analytics market has strong incumbents with real revenue, real users, and years of development behind them.

I am building Outline Analytics anyway.

[GitHub →](https://github.com/useoutline)

## What I think is missing

I have used Plausible, explored Fathom and Umami, and spent time in PostHog. Each is good at something. None does everything I want.

**Plausible is beautifully simple but too simple.** It tracks page views and basic custom events. If you want programmatic event tracking with typed APIs, rule-based tracking, or integration with anything beyond a web browser, you are out of scope. Plausible is a script tag you paste into your HTML. That is its strength and its ceiling.

**Fathom and Umami are web-only.** They are frontend analytics tools designed for websites. If you want to track events from a backend service, a mobile app, a CLI tool, or a CI/CD pipeline, they do not support it. I want a single analytics platform that tracks everything, web, mobile, backend, desktop, IoT through a unified SDK and API. If it can make an HTTP request, it should be able to send events to Outline.

**PostHog does almost everything I want, but the UX is overwhelming.** PostHog handles custom events, product analytics, feature flags, session replay, and A/B testing. It is genuinely powerful. But the UI is cluttered, the navigation is confusing, and the learning curve is steep. A marketing manager who needs to check yesterday's conversion funnel should not need a 30-minute onboarding session to find the right dashboard. I want PostHog's power with Plausible's clarity.

**Nobody lets marketers add tracking rules without developers, at least not without sacrificing privacy.** This is the specific gap that motivated Outline. Google Tag Manager solves the marketer-independence problem in the non-privacy world: marketers add tags and triggers from a console, and tracking starts without a code deploy. But GTM requires loading an additional script, it collects PIIs, it feeds data to Google's advertising ecosystem, and it is the single biggest privacy liability on most websites.

In every company I have worked at, adding a new tracking event without GTM requires a developer to write code, commit it, get it reviewed, and deploy it. If the marketing team wants to track "users who scroll past 50% of the pricing page," they file a ticket and wait for the next sprint.

Outline's rule-based tracking takes the GTM model and strips it down to what actually matters.

## The GTM model, rebuilt for privacy

Marketers define tracking rules from the Outline dashboard, "track when scroll depth exceeds 50% on /pricing," "track when a user clicks the signup CTA," "track when a form is abandoned before submission," "track when a user returns to the tab after being away for 60+ seconds."

These rules are downloaded by the SDK at runtime, no additional script injection, no code changes, no redeployment. The SDK evaluates the rules client-side and sends only the events that match. When a marketer adds a new rule in the dashboard, it takes effect on the next page load without anyone touching the codebase.

Developers can still add events programmatically through the SDK for cases where code-level precision is needed. But the dashboard becomes a self-serve tracking tool for everyone else, the way GTM is, minus everything that makes GTM a privacy nightmare.

The critical difference from GTM: Outline collects zero PIIs. No IP addresses, no user agent fingerprinting, no cross-site tracking, no advertising IDs. It tracks what the company needs to make product decisions, which pages are visited, which features are used, where users drop off and nothing beyond that. The data exists to improve the product, not to profile the user.

## The SDK is a library, not a script tag

Most analytics tools give you a `<script src="...">` tag to paste into your HTML. That works for basic page view tracking but falls apart when you want programmatic control, type safety, or integration with modern JavaScript frameworks.

Outline's SDK is a proper TypeScript package, under 4KB gzipped with zero dependencies. You install it from npm, import it into your application, and use typed APIs:

```typescript
import { useOutlineAnalytics } from "@useoutline/analytics";

const analytics = useOutlineAnalytics("your-site-id");

// Custom events with typed properties
analytics.track("signup_completed", {
  plan: "pro",
  source: "pricing_page",
});
```

Full IDE autocomplete. TypeScript inference on event properties. Tree-shakeable, if you only use page view tracking, the custom event code is not included in your bundle. This is how a modern SDK should work.

The script tag approach still exists for people who want the simplicity of Plausible's integration model. But the library-first design means Outline works natively in React, Vue, Nuxt, Next.js, Svelte, and any other JavaScript framework without wrapper libraries or adapter packages.

## Beyond web browsers

This is the differentiation I am most confident about. Plausible, Fathom, and Umami are web analytics tools. Their tracking runs in browsers. If you want to track events from a Node.js backend, a Python CLI, a React Native mobile app, or a Go microservice, you need a different tool entirely. Usually PostHog or Segment, both of which are complex and expensive.

Outline's API accepts events from any source. The TypeScript SDK is for web. But the underlying event ingestion endpoint is a simple HTTP POST, so any language, any platform, any runtime can send events. A backend service tracking API response times, a mobile app tracking screen transitions, a CI/CD pipeline tracking build durations, a hardware device tracking sensor readings, all feed into the same Outline instance, the same dashboard, the same rule engine.

The vision is not "web analytics with an API". It is "event tracking platform with a web analytics dashboard as the primary interface."

## Real-time by default

Most analytics tools show data with a delay. Plausible's real-time view shows current visitors but historical data has a processing lag. PostHog processes events in batches. For a developer monitoring a deployment or a product manager watching a product launch, waiting 15 minutes for updated numbers is painful.

Outline is designed to be as close to real-time as the architecture allows. Events are ingested through Bun and Elysia.js (chosen for high-throughput, low-latency request handling), stored in MongoDB timeseries collections for efficient time-bucketed writes, and queryable within seconds of ingestion.

The planned migration to ClickHouse for the analytical query layer will handle the aggregation side, fast GROUP BY queries over millions of events for dashboard charts and funnel analysis, while keeping the ingestion path low-latency.

## Self-hosting without DevOps

Umami is open source and self-hostable, which I respect. But deploying it requires configuring a PostgreSQL database, a Node.js server, environment variables, and a reverse proxy. For a developer who has done this before, it takes 30 minutes. For a startup founder who just wants analytics on their landing page, it is a blocker.

Outline's planned distribution model uses Bun's compile feature to produce a single binary. The goal is:

```bash
./outline-analytics --port 3000
```

One binary, one command, running. No Docker, no database configuration, no reverse proxy setup for the basic use case. For production deployments with higher throughput, a proper database (MongoDB or ClickHouse) can be configured. But for getting started, a single binary with an embedded data store should be enough.

This is the self-hosting experience I want: as simple as downloading a file and running it.

## Custom dashboards with PostHog's power and Plausible's clarity

The dashboard is where PostHog's clutter becomes Outline's opportunity. PostHog's interface tries to surface everything: analytics, feature flags, session replays, experiments, data pipelines in a single navigation. The result is a tool that can do anything but where finding anything takes experience.

Outline's dashboard prioritizes the three things that 90% of users check daily: traffic overview (visitors, page views, sources, countries), event tracking (custom events with breakdowns by property), and funnels (multi-step conversion paths). These three views are the defaults. Advanced capabilities (cohort analysis, retention curves, custom SQL queries) exist but are secondary, accessible when needed, invisible when not.

The design principle is: if a marketer cannot answer their question within 10 seconds of opening the dashboard, the dashboard has failed. Plausible understands this. PostHog does not. I want to build something that handles PostHog-level complexity while maintaining Plausible-level clarity.

## The honest assessment

Am I building this because the market needs it, or because I want to build it? Both. The market has room for a privacy-first analytics tool that combines Plausible's simplicity, PostHog's custom events, GTM's marketer independence, and cross-platform tracking, without the privacy violations of any of them. But I am also building it because I enjoy the architectural challenge.

Will it succeed? I do not know. The incumbents have multi-year head starts, established brands, and paying customers. Competing on features alone is insufficient. I need to compete on developer experience, self-hosting simplicity, and the specific niche of "track anything, not just web pages, with rules that non-developers can configure."

What I do know is that building Outline has made me a better engineer. Designing the SDK forced me to think about API ergonomics, bundle size, and zero-dependency architecture. The backend forced me to learn about timeseries databases, event ingestion patterns, and high-throughput request handling. The rule-based tracking system forced me to think about how to build a declarative configuration language that is powerful enough for developers and intuitive enough for marketers.

The modern AI generation requires better tracking tools, tools that provide meaningful insights for product decisions without invading user privacy, that work across every platform and runtime, and that do not require a developer for every new tracking event. Whether Outline becomes that tool or not, someone needs to build it.

I decided to be the someone.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. Case studies of my other work at [shrinath.me/work](https://shrinath.me/work/)._
