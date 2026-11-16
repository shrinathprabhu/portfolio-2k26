# Blog cover image prompts

Not published (this file lives outside `src/`). One shared style so all 27 covers read as a series and match the aqua site theme.

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
| `choosing-a-tech-stack.png` | I pick the tech stack last | Pick the stack **last** | A row of five simple blocks; the first four are outlined decisions (person, calendar, shield, door), the last is a small aqua stack of three layers. |
| `nobody-cares-about-your-stack.png` | Nobody cancelled because of PHP | Nobody cares about your **stack** | A tall, complicated tower of many small boxes faded pale on the left; on the right one single aqua box with a small coin above it. |
| `technical-decisions.png` | Decisions made at the wrong speed | Right decision, wrong **speed** | Two doors side by side: one a swing door with a two-way arrow, the other a solid aqua door with a padlock. |
| `coders-vs-engineers.png` | AI is coming for the coders | Coders out, **engineers** in | A simple robot arm laying a row of bricks on the left; on the right a blueprint sheet with a compass and one aqua line. |
| `tech-debt-ai.png` | Tech debt in the age of AI | A new kind of **debt** | A cupboard with its door ajar and neat boxes inside, next to a second cupboard overflowing with identical pale boxes. |
| `prompting-guide.png` | Bad at briefing, not prompting | Brief it like a **colleague** | A clipboard with five short checklist lines, the first ticked in aqua, and a small four-point sparkle beside it. |
| `ship-products-2027.png` | How to ship in 2027 | Building got **cheap** | A small paper plane on a dotted path over a crowd of many identical pale paper planes on the ground. |
| `first-customers.png` | Your first customer | Customer number **one** | A row of ten empty circles with the first one filled aqua, and a small handshake icon above it. |
| `cold-email-2026.png` | Cold email is not dead | Send **fewer** emails | A large pile of identical pale envelopes on the left; on the right a single aqua envelope with a small reply arrow. |
| `aeo-geo.png` | Will ChatGPT mention you | Be the **answer** | A chat bubble containing three short lines, the middle line aqua, with a thin line connecting it to a small page sheet. |
| `writing-in-public.png` | Your best work is invisible | Make the work **visible** | A closed box on the left with a dotted outline; on the right the same box open, with a page sheet rising out of it in aqua. |
| `devrel-product-function.png` | DevRel is a product job | Unblock the **developer** | A simple path of five steps with a gap at step two; a small aqua plank bridges the gap. |
| `web3-agentic.png` | Web3 found a new word | The new word is **agentic** | A row of five identical pale label tags, each blank, with a sixth tag in aqua being attached on top of the others. |
| `web3-ux-step-count.png` | The step count problem | Eleven steps is too **many** | A staircase of eleven small steps descending left to right, each step with fewer tiny dots on it than the last; the final step has one aqua dot. |
| `bybit-frontend-hack.png` | The $1.5 billion frontend hack | They changed the **screen** | A browser window outline showing a tick mark, with a second offset window behind it in aqua showing a different shape. |
| `security-bare-minimum.png` | The security bare minimum | Twelve **no-brainers** | A simple checklist of twelve short lines in two columns with a key icon at the top; three ticks are aqua. |
| `delete-key-security.png` | The delete key | Delete it **first** | A large keyboard key outline labelled with a small bin icon, with several small pale boxes fading away beside it. |
| `ai-intern-security.png` | The intern who believes everything | It believes **everything** | A sheet of paper with a few lines and one aqua line marked with a small warning triangle; a simple desk lamp over it. |
| `step-3-of-5.png` | Laptop closed at step 3 of 5 | Stuck at step **three** | A horizontal progress track of five dots; the first two filled ink, the third aqua with a small pause mark, the last two empty. |
| `stop-nodding.png` | Stop nodding in meetings | Stop **nodding** | A simple table seen from the side with five identical round heads as circles; one circle is aqua with a small speech bubble. |
| `senior-vs-staff.png` | Senior vs staff | A different **job** | Two ladders side by side, the second starting where the first ends, the second ladder in aqua. |
| `hiring-ai-era.png` | Everyone passes the coding test | Hire for **judgment** | A stack of identical pale document sheets, with one sheet pulled out and marked with an aqua magnifying glass. |

## Existing posts (regenerate into the same filenames)

| File (`src/images/`) | Post | Headline (aqua word in **bold**) | Illustration |
| --- | --- | --- | --- |
| `frontend-distributed-systems.png` | Frontend is a distributed systems problem | Frontend is **distributed** | A central aqua node connected by thin lines to a phone, a laptop, a tablet and a watch outline, the lines of different lengths. |
| `ai-lead.png` | Leading a team in 2026 | Lead the **humans** | Five simple circles in a loose group, one aqua and slightly forward, with a small sparkle icon floating beside the group. |
| `chrome-extension-wallet.png` | Architecture decisions behind a 10-chain wallet | A wallet in the **sidebar** | A browser window outline with a tall narrow panel docked on its right side filled aqua, a small wallet icon inside the panel. |
| `agrostar-mvp.png` | Delivering an MVP in a week | An MVP in a **week** | A row of seven small calendar squares, the seventh aqua with a check mark, and a small sprouting plant beside it. |
| `shipping-skizzle.png` | Shipping an extension in your first month | Shipped in month **one** | An envelope with a paperclip and a small padlock on the clip, a short dotted trail behind it suggesting motion. |

## Social preview images (JPG, 1200×630)

Same style block, but ask for `1200x630 pixels` and export as JPG.

| File (`src/images/`) | Headline | Illustration |
| --- | --- | --- |
| `meta.jpg` | I turn messy ideas into **fast, polished** products | No illustration. Under the headline, a smaller line in ink: "Shrinath Prabhu · Senior Staff Frontend Engineer". A short aqua waveform of about 20 bars at the bottom right. |
| `blog-meta.jpg` | Writing on frontend, security and **shipping** | Three stacked page sheets, offset, the front one with a few text bars and one aqua bar. |
