# Shrinath Prabhu

**Senior Staff Frontend Engineer** with 8+ years building production web applications, Web3 wallets, and privacy-first tooling.

I have shipped **4 Chrome Extensions** to the Chrome Web Store with a **100% approval rate**, including a non-custodial multi-chain sidebar wallet rated 4.7 stars. Most frontend engineers never ship even one.

For detailed case studies on each project, visit [shrinath.me/work](https://shrinath.me/work/).

## What I've built

**Arcana Wallet** - Non-custodial sidebar wallet supporting 10+ blockchains, cross-chain transactions, dApp injection into Aave/Uniswap/Lido, transaction signing, and unified balance management. 750+ users, 4.7 stars during a crypto bear market. Built with Vue 3 and viem. [View on Chrome Web Store →](https://chromewebstore.google.com/detail/arcana-wallet/nieddmedbnibfkfokcionggafcmcgkpi)

**SendIt** - Cross-chain token transfer app replacing wallet addresses with email/X handles/ENS. Scaled to 65K+ accounts and 20K+ peak DAU. Frontend traffic exceeded Netlify Pro limits despite aggressive caching, migrated to self-managed AWS infrastructure.

**Skizzle** - Chrome + Firefox extension for encrypted email attachments using RSA keys via Web3Auth (Torus) and decentralized storage. ~1,000 users, 4.2 stars. Shipped in my first month at the company.

**Pricinger** - Privacy-focused pricing extension with multi-region VPN proxy system, automated site-specific optimization, geolocation blocking, and user agent spoofing. ~1,000 users, 4 star rating.

## Currently

🏗️ **Senior Staff Engineer** at [Avail Project](https://availproject.org) - leading frontend architecture across the Nexus product ecosystem. Shipped [Fastbridge](https://fastbridge.availproject.org) (15 EVM chains, ~$100K monthly volume), [Avail Widgets](https://github.com/availproject/widgets) (formerly Nexus One / Elements, [`@avail-project/widgets`](https://www.npmjs.com/package/@avail-project/widgets) + shadcn registry, used by 10+ dApps), and the [Widget Configurator](https://widgets.availproject.org).

## Previously

Led frontend engineering at **[Arcana Network](https://arcana.network)** for 4.5 years, from seed stage through [acquisition by Avail](https://blog.availproject.org/avail-acquires-arcana-to-accelerate-multichain-scalability/). Before that, full stack developer at **Hashbinary Services** building Chrome Extensions, analytics dashboards, and multilingual mobile apps across Node.js, Vue, and React.

## Technical writing

[Vue 3 Composition API: Basics and Patterns](https://medium.com/arcana-network-blog/vue-3-composition-api-basics-and-patterns-44813f2c785d) - Ranks on first page of Google for "Vue 3 composition API patterns"

## Stack

**Frontend:** Vue 3, Nuxt 3, React, TypeScript, Tailwind CSS, Chrome Extensions (Manifest V3).  
**Backend:** Node.js, Bun, Rust (Axum), Express, Fastify, Nest.js, Elysia.js.  
**Data:** MongoDB, PostgreSQL, ClickHouse, SQLite, Firebase/Firestore.  
**Web3:** Wallet architecture, cross-chain bridging, chain abstraction, viem, EIP-7702.  
**AI Tools:** Claude Code, OpenAI Codex, Google Gemini, Antigravity (Google).

## Let's connect

📧 hello@shrinath.me • 🌐 [shrinath.me](https://shrinath.me) • [LinkedIn](https://linkedin.com/in/shrinath-prabhu) • [Twitter](https://x.com/shrinath)

## UI credits

The appearance selector's miniature previews and selection interaction are inspired by [Rare UI's theme selector](https://www.rareui.com/components/themeselector), implemented here in HTML, CSS, and JavaScript with Light, Dark, and System preferences.

## Public content and agent access

The public REST API serves the published blog list at `/api/blogs`, article Markdown at `/api/blog/{slug}`, and a JSON profile at `/api/me`. Follow each list entry’s `apiUrl`. `/openapi.json` describes the operations, response schemas, and structured errors. Cloudflare’s `PORTFOLIO_API_LIMIT` binding shares 12 requests per IP per 60 seconds across these routes in each location. Clients can cache list and profile responses for a day and articles for a week.

The homepage footer links to the agent documentation at `/docs`, which redirects to the canonical guide at `/agents/`. It also links to `/about/` and `/privacy/`. `/llms.txt`, `/sitemap.xml`, and `/content-index.json` describe the published pages and blog posts. The site's identity is a `Person`, using the existing public location and professional contact details.

The Eleventy build generates an `index.md` alongside each indexable HTML page, preserving the article text, code, tables, FAQs, transcript, and canonical source links. Markdown comes from the final HTML; it is not a second copy of the content to maintain. The generated content index is also bundled into the Worker, so **build before starting Wrangler or deploying**. `npm run preview` and `npm run deploy` already do this.

The Worker negotiates HTML or Markdown at canonical page URLs using `Accept`, including quality values and exclusions. It returns `406` for unsupported page formats, `405` for write methods, and real `404` responses with HTML recovery links, concise Markdown, or structured JSON according to the request. HTML and Markdown use separate asset files and validators, `Vary: Accept`, and revalidation; negotiated responses disable outer CDN caching to prevent mixed representations.

```sh
npm test                                      # Build and behavior regressions
npm run preview                               # Local Cloudflare Worker
npm run check:agents -- http://127.0.0.1:8787  # All content and discovery routes
npm run report:agents                         # Latest Is Agentic report for shrinath.me
```

Eleventy's `npm run dev` serves static files only. Use the Worker preview to test content negotiation, status codes, redirects, and response headers. After deployment, verify the public origin with `npm run check:agents -- https://shrinath.me`. The report command reads the latest completed production audit and starts a scan if none exists. Use `npm run --silent report:agents -- --json` for machine-readable output. To refresh an existing score after a release, use **Rescan** on the [public report](https://is-agentic.com/scan/shrinath.me).
