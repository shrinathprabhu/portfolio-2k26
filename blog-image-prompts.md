# Blog cover image prompts

Not published (this file lives outside `src/`). One shared style so all 29 covers read as a series and match the aqua site theme.

## How to use

1. Start a ChatGPT image chat and paste the **Style block** once.
2. For each post, send: `Same style. Headline: "<HEADLINE>". Illustration: <ILLUSTRATION>.`
3. Export as PNG, 16:9 (the current covers are 1672×941). Save to `src/images/<file>`.
4. New posts: uncomment the `# image: "/images/<file>"` line in the post's frontmatter.
   Existing posts: overwrite the same filename. The build regenerates the WebP variants and their hashed URLs.

## Style block (paste once)

```
Create a 16:9 blog cover image, 1672x941 pixels.

Style: minimal editorial tech illustration, flat vector, generous empty space.
Background: solid cool off-white #F7FAFB. No gradient, no texture, no glow, no drop shadows.
Palette, strictly: ink #172B33 for type and line work, aqua #007F87 as the single accent,
soft aqua #B7E5E6 for fills, pale blue-grey #DCE7EA for hairlines and secondary shapes.
No other colours.

Layout: the headline sits on the left half, set in a heavy geometric sans-serif
(similar to DM Sans Bold), ink colour, tight letter spacing, 2 to 3 lines, left aligned.
Exactly one word or short phrase of the headline is in aqua.
On the right half, one simple flat illustration built from basic geometric shapes and
2px ink outlines, with aqua and soft-aqua fills.
A thin 1px pale blue-grey rule runs along the bottom with the small text "shrinath.me"
at the bottom left in ink.

Rules: spell the headline exactly as given. No other text anywhere. No logos or brand marks.
No people's faces. No 3D, no photorealism, no neon, no robots, no glowing orbs.
Keep a 6% safe margin on all sides so nothing is cut off when cropped to 16:9.
```

## New posts

| File (`src/images/`) | Post | Headline (aqua word in **bold**) | Illustration |
| --- | --- | --- | --- |
| `audio-captions-sync.png` | Syncing captions to audio | Captions in **sync** | A row of vertical waveform bars, the left third aqua and the rest pale blue-grey, with a short caption line beneath where one word has a soft-aqua highlight. |
| `responsive-webp-images.png` | 1 MB blog images | 12.6 MB to **184 KB** | A large outlined picture frame shrinking through three steps into a small aqua one, joined by thin arrows. |
| `sitemap-lastmod-seo-bugs.png` | Sitemap lastmod and SEO bugs | Your sitemap is **lying** | A simple site-tree diagram of boxes joined by lines; each box has a tiny calendar icon and one calendar is aqua with a question mark. |
| `cache-busting-immutable.png` | Immutable caching | Cache it **forever** | A file icon with a padlock, and a short hash-like tag `?v=3f9a1c` drawn as a small aqua label attached to it. |
| `strict-csp-static-site.png` | Strict CSP | Deny by **default** | A browser window outline with a shield in the centre; several small arrows approach from outside and stop at the edge, one aqua arrow passes through a small gate. |
| `cloudflare-worker-static-site.png` | Cloudflare Worker | 36 lines at the **edge** | A small aqua diamond node in front of a stack of three flat page sheets; two arrows enter the node and merge into one. |
| `404-canvas-game.png` | 404 runner game | A game on my **404** | A tiny blocky pixel character mid-jump over a small rectangular obstacle on a single ground line, with two flat clouds. |
| `eleventy-code-blocks.png` | Eleventy code blocks | Better code **blocks** | A rounded code window with a filename tab on top; the lines inside are short bars of varying length, a few of them aqua. |
| `llms-txt-ai-discoverability.png` | llms.txt and AI discoverability | Readable by **machines** | A document sheet with a few text lines, a magnifying glass over it, and three thin lines connecting the sheet to three small circles. |
| `mermaid-on-demand.png` | Loading Mermaid on demand | Load it when **needed** | A simple three-box flowchart with arrows; one box is aqua, and a small dashed outline of a package sits to the side with an arrow pointing into the chart. |
| `blur-placeholders.png` | Blur placeholders | Blur first, then **sharp** | Two picture frames side by side: the left one filled with large soft-aqua mosaic squares, the right one a clean outlined mountain-and-sun icon. |
| `securing-frontends-ai.png` | Securing frontends in the age of AI | Never trust the **output** | A chat bubble with a small warning triangle inside, and a shield standing between the bubble and a browser window outline. |
| `reducing-attack-surface.png` | Reducing attack surface | Ship **less** surface | A large outlined cube with several faces drawn as dashed, faded lines, leaving a small solid aqua cube at its core. |
| `extension-wallet-security.png` | Extension wallet security model | Know your **boundaries** | Four nested rounded rectangles, the innermost aqua with a small key icon; a thin arrow from outside stops at the second boundary. |
| `chain-abstraction-frontend.png` | Chain abstraction | One **balance** | Four small circles on the left, each a different outline pattern, with lines converging into one large aqua circle on the right. |
| `developers-vs-engineers-ai.png` | Developers vs engineers | Developers, not **engineers** | Two simple desks seen from the front: on the left a keyboard with a stream of small code bars, on the right a blueprint sheet with a compass and one aqua decision arrow. |
| `adapting-to-ai-engineer.png` | Adapting to AI | Work with the **machine** | A pencil and a small four-point sparkle side by side, joined by a looping arrow that forms a circle between them. |
| `web3-spark-agentic.png` | Web3 losing its spark | Where did the **spark** go | A single aqua spark shape on the left; to the right, a row of five identical pale label tags, all blank and the same size. |
| `ship-products-2027.png` | Shipping products in 2027 | Ship in **2027** | A small paper plane on a dotted flight path that passes three milestone dots, the last dot aqua. |

## Existing posts (regenerate into the same filenames)

| File (`src/images/`) | Post | Headline (aqua word in **bold**) | Illustration |
| --- | --- | --- | --- |
| `eleventy-over-nuxt.png` | Why I chose Eleventy over Nuxt | Simple **wins** | A large empty framework-style box on the left with many small gears faded pale, and a single clean HTML page sheet on the right in aqua outline. |
| `vite-seo.png` | SEO for Vite SPAs without Next.js | SEO without **Next.js** | One page sheet fanning out into five smaller sheets, each with a tiny tag icon, a magnifying glass over the fan. |
| `frontend-distributed-systems.png` | Frontend is a distributed systems problem | Frontend is **distributed** | A central aqua node connected by thin lines to a phone, a laptop, a tablet and a watch outline, the lines of different lengths. |
| `ai-lead.png` | Leading a team in 2026 | Lead the **humans** | Five simple circles in a loose group, one aqua and slightly forward, with a small sparkle icon floating beside the group. |
| `chrome-extension-wallet.png` | Chrome extension wallet for 10+ blockchains | A wallet in the **sidebar** | A browser window outline with a tall narrow panel docked on its right side filled aqua, a small wallet icon inside the panel. |
| `agrostar-mvp.png` | Delivering an MVP in a week | An MVP in a **week** | A row of seven small calendar squares, the seventh aqua with a check mark, and a small sprouting plant beside it. |
| `pricinger.png` | Privacy-first extension with VPN proxies | Fair prices, **private** | A price tag with a small globe behind it and four thin lines leading from the globe to four location pins, one pin aqua. |
| `shipping-skizzle.png` | Shipping an extension in your first month | Shipped in month **one** | An envelope with a paperclip and a small padlock on the clip, a short dotted trail behind it suggesting motion. |
| `vue-3-composition-api.png` | Vue 3 Composition API | Composition **API** | Three interlocking rounded blocks stacking into one shape, the middle block aqua. Do not draw the Vue logo. |
| `credenstore.png` | Zero-knowledge encrypted storage | Zero **knowledge** | A closed vault door outline with a key beside it, and a cloud above the vault filled with small unreadable squares. |

## Social preview images (JPG, 1200×630)

Same style block, but ask for `1200x630 pixels` and export as JPG.

| File (`src/images/`) | Headline | Illustration |
| --- | --- | --- |
| `meta.jpg` | I turn messy ideas into **fast, polished** products | No illustration. Under the headline, a smaller line in ink: "Shrinath Prabhu · Senior Staff Frontend Engineer". A short aqua waveform of about 20 bars at the bottom right. |
| `blog-meta.jpg` | Writing on frontend, security and **shipping** | Three stacked page sheets, offset, the front one with a few text bars and one aqua bar. |
