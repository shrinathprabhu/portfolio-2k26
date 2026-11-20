# Blog cover image prompts

Not published (this file lives outside `src/`). Every prompt below is self-contained: paste one into a new ChatGPT image chat and you get one cover. Each cover is also the post's social preview, so all of them use the Open Graph size: **1.91:1, 1200x630 pixels**, PNG or JPG.

They match the site's glass theme: a cool off-white background with soft aqua and blue glows in the top-right corner (the same glows the site shows behind its pages), and illustrations built from frosted, liquid-glass panels. Each category keeps its own accent so the blog index reads as a series.

## How to use

1. Paste one prompt into ChatGPT and generate.
2. ChatGPT often returns 1536x1024 instead of 1200x630. If it does, crop to 1.91:1 from the center and resize. On a Mac:

   ```bash
   sips -c 804 1536 cover.png --out cover.png && sips -z 630 1200 cover.png --out cover.png
   ```

3. Save it as `src/images/blog/<slug>.png` or `src/images/blog/<slug>.jpg`, using the slug shown above each prompt. Both extensions are picked up automatically.
4. No frontmatter edit is needed. Until the file exists, the post shows its old cover or none.

The blog cards show covers at 16:9, which trims about 3.5% off each side of a 1200x630 image. The prompts keep an 8% side margin so nothing important is cut.

## Color schemes

Shared by every cover:

| Role | Value |
| --- | --- |
| Background | `#F7FAFB` (cool off-white) |
| Ambient glows, top right | aqua `#55BAC3` at 25%, blue `#6898D8` at 19% |
| Glass base | white and `#F3F9FA` at 70 to 90% opacity, white rim and top highlight |
| Ink: type and line work | `#172B33` |
| Hairlines | `#DCE7EA` |

One accent per category, each with a matching soft fill for tinted glass:

| Category | Accent | Soft fill |
| --- | --- | --- |
| AI & Engineering | Aqua `#007F87` | `#B7E5E6` |
| Security | Brick `#B4432C` | `#F4D6CF` |
| Web3 | Indigo `#4B4FC4` | `#DADBF6` |
| System Design | Cobalt `#1F6FB2` | `#CFE3F3` |
| Career & Leadership | Amber `#B7791F` | `#F5E3C2` |
| Product & Architecture / Shipping | Forest `#2F7D4F` | `#CDE8D6` |
| Sales & Growth / DevRel & Developer Experience | Plum `#8E3A7E` | `#EFD5EA` |

## Prompts

### aeo-geo-ai-discoverability

File: `src/images/blog/aeo-geo-ai-discoverability.png` (or `.jpg`) · Category: Sales & Growth · Scheme: Plum

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #8E3A7E (plum) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #EFD5EA for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "SEO with better PR"
Only the words "PR" are in the accent color #8E3A7E; the rest is ink.

Right side illustration: A large chat bubble containing three short text bars, the middle bar in the accent color. A thin line runs from that bar to a small plain web page sheet on the right, which carries a tiny accent checkmark.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### ai-will-replace-coders-not-software-engineers

File: `src/images/blog/ai-will-replace-coders-not-software-engineers.png` (or `.jpg`) · Category: AI & Engineering · Scheme: Aqua

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #007F87 (aqua) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #B7E5E6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Coders out, engineers in"
Only the words "engineers" are in the accent color #007F87; the rest is ink.

Right side illustration: On the left, a neat row of identical small bricks being stacked by a simple mechanical arm drawn as two straight segments and a hinge. On the right, a large blueprint sheet with a compass and a single accent-colored line marking where a wall should go.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### bybit-hack-frontend-security-lessons

File: `src/images/blog/bybit-hack-frontend-security-lessons.png` (or `.jpg`) · Category: Security · Scheme: Brick

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #B4432C (brick) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #F4D6CF for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "They changed the screen"
Only the words "screen" are in the accent color #B4432C; the rest is ink.

Right side illustration: Two overlapping browser window outlines. The front window shows a large simple checkmark. The window behind it, slightly offset and filled with the soft accent color, shows a different shape: a key leaving through an open door.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### chrome-extension-wallet

File: `src/images/blog/chrome-extension-wallet.png` (or `.jpg`) · Category: Web3 · Scheme: Indigo

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #4B4FC4 (indigo) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #DADBF6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "A wallet in the sidebar"
Only the words "sidebar" are in the accent color #4B4FC4; the rest is ink.

Right side illustration: A wide browser window outline with a tall, narrow panel docked on its right edge, filled with the soft accent color. Inside the panel, a simple wallet icon and one large number bar in the accent color. Faint thin lines connect the panel to four small circles (chains) floating outside the window.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### delivering-mvp-in-a-week

File: `src/images/blog/delivering-mvp-in-a-week.png` (or `.jpg`) · Category: Shipping · Scheme: Forest

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #2F7D4F (forest) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #CDE8D6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Scope is the speed"
Only the words "speed" are in the accent color #2F7D4F; the rest is ink.

Right side illustration: A row of seven small calendar squares. The seventh square is filled with the accent color and holds a checkmark. Above the row, a pair of scissors has just cut a long ribbon of pale feature tags, most of which fall away to the right.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### designing-multi-step-flows-that-survive-failure

File: `src/images/blog/designing-multi-step-flows-that-survive-failure.png` (or `.jpg`) · Category: System Design · Scheme: Cobalt

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #1F6FB2 (cobalt) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #CFE3F3 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Stuck at step three"
Only the words "three" are in the accent color #1F6FB2; the rest is ink.

Right side illustration: A horizontal progress track of five dots joined by a line. Dots one and two are filled with ink, dot three is filled with the accent color and carries a small pause mark, dots four and five are empty outlines. Below the track, a simple tunnel arch that the line passes into.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### devrel-is-a-product-function

File: `src/images/blog/devrel-is-a-product-function.png` (or `.jpg`) · Category: DevRel & Developer Experience · Scheme: Plum

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #8E3A7E (plum) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #EFD5EA for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Unblock the developer"
Only the words "developer" are in the accent color #8E3A7E; the rest is ink.

Right side illustration: A simple path of five stepping stones from left to right with a gap at stone two. A plank in the accent color bridges the gap. A small T-shirt outline lies discarded and pale beside the path.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### frontend-distributed-systems-problem

File: `src/images/blog/frontend-distributed-systems-problem.png` (or `.jpg`) · Category: System Design · Scheme: Cobalt

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #1F6FB2 (cobalt) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #CFE3F3 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Staff it like a system"
Only the words "system" are in the accent color #1F6FB2; the rest is ink.

Right side illustration: A central node filled with the accent color connected by thin lines of different lengths to a phone, a laptop, a tablet and a watch, each drawn as a simple outline. Two of the lines are dashed to suggest an unreliable connection.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### hiring-engineers-in-the-ai-era

File: `src/images/blog/hiring-engineers-in-the-ai-era.png` (or `.jpg`) · Category: Career & Leadership · Scheme: Amber

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #B7791F (amber) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #F5E3C2 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Hire for judgment"
Only the words "judgment" are in the accent color #B7791F; the rest is ink.

Right side illustration: A stack of identical pale document sheets. One sheet is pulled out to the side and examined under a magnifying glass whose lens is the accent color.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### how-i-choose-a-tech-stack

File: `src/images/blog/how-i-choose-a-tech-stack.png` (or `.jpg`) · Category: Product & Architecture · Scheme: Forest

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #2F7D4F (forest) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #CDE8D6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Pick the stack last"
Only the words "last" are in the accent color #2F7D4F; the rest is ink.

Right side illustration: A row of five simple outlined tiles: a person, a calendar, a shield, a door, and finally a small three-layer stack filled with the accent color, which is the last tile in the row.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### how-i-make-technical-decisions

File: `src/images/blog/how-i-make-technical-decisions.png` (or `.jpg`) · Category: System Design · Scheme: Cobalt

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #1F6FB2 (cobalt) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #CFE3F3 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Right call, wrong speed"
Only the words "speed" are in the accent color #1F6FB2; the rest is ink.

Right side illustration: Two doors side by side. The left door is a light swing door with a small two-way arrow above it. The right door is solid, filled with the accent color, with a padlock and a one-way arrow above it.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### how-startups-get-their-first-customers

File: `src/images/blog/how-startups-get-their-first-customers.png` (or `.jpg`) · Category: Sales & Growth · Scheme: Plum

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #8E3A7E (plum) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #EFD5EA for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Customer number one"
Only the words "one" are in the accent color #8E3A7E; the rest is ink.

Right side illustration: A row of ten empty circle outlines. The first circle is filled with the accent color. Above it, a simple speech bubble linking it to a small outlined figure-free chair, suggesting a one-to-one conversation.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### how-to-disagree-with-leadership

File: `src/images/blog/how-to-disagree-with-leadership.png` (or `.jpg`) · Category: Career & Leadership · Scheme: Amber

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #B7791F (amber) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #F5E3C2 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Stop nodding"
Only the words "nodding" are in the accent color #B7791F; the rest is ink.

Right side illustration: A simple table seen from the side with five identical round heads drawn as plain circles, no faces. Four circles are pale. One circle is filled with the accent color and has a small speech bubble rising from it.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### how-to-ship-products-in-2027

File: `src/images/blog/how-to-ship-products-in-2027.png` (or `.jpg`) · Category: Product & Architecture · Scheme: Forest

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #2F7D4F (forest) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #CDE8D6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Building got cheap"
Only the words "cheap" are in the accent color #2F7D4F; the rest is ink.

Right side illustration: A crowd of many identical pale paper planes resting on the ground. One paper plane in the accent color is in flight above them, following a dotted path toward a small flag.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### is-cold-email-still-worth-it

File: `src/images/blog/is-cold-email-still-worth-it.png` (or `.jpg`) · Category: Sales & Growth · Scheme: Plum

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #8E3A7E (plum) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #EFD5EA for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Send fewer emails"
Only the words "fewer" are in the accent color #8E3A7E; the rest is ink.

Right side illustration: A large untidy pile of identical pale envelopes on the left. On the right, one single envelope in the accent color with a small curved reply arrow coming back to it.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### is-tech-debt-still-debt-in-the-age-of-ai

File: `src/images/blog/is-tech-debt-still-debt-in-the-age-of-ai.png` (or `.jpg`) · Category: AI & Engineering · Scheme: Aqua

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #007F87 (aqua) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #B7E5E6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "A new kind of debt"
Only the words "debt" are in the accent color #007F87; the rest is ink.

Right side illustration: Two simple credit cards side by side. The left card is pale with a small downward arrow (cheaper). The right card is filled with the accent color and has a long receipt unrolling from it, covered in short lines.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### nobody-cares-about-your-tech-stack

File: `src/images/blog/nobody-cares-about-your-tech-stack.png` (or `.jpg`) · Category: Product & Architecture · Scheme: Forest

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #2F7D4F (forest) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #CDE8D6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Nobody sees your stack"
Only the words "stack" are in the accent color #2F7D4F; the rest is ink.

Right side illustration: On the left, a tall, over-complicated tower of many small boxes in pale tones. On the right, one single box in the accent color with a small coin resting on top of it.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### prompting-guide-for-engineers

File: `src/images/blog/prompting-guide-for-engineers.png` (or `.jpg`) · Category: AI & Engineering · Scheme: Aqua

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #007F87 (aqua) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #B7E5E6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "The brief was wrong"
Only the words "wrong" are in the accent color #007F87; the rest is ink.

Right side illustration: A clipboard holding a sheet with five short checklist lines, the first two ticked in the accent color. Next to it, a single crumpled sheet of paper with one short line, suggesting the old one-line brief.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### reduce-attack-surface-delete-first

File: `src/images/blog/reduce-attack-surface-delete-first.png` (or `.jpg`) · Category: Security · Scheme: Brick

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #B4432C (brick) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #F4D6CF for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Delete it first"
Only the words "first" are in the accent color #B4432C; the rest is ink.

Right side illustration: A large single keyboard key outline labelled with a simple backspace arrow, filled with the accent color. Beside it, several small pale boxes and script tags fading out to the right as if being removed.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### securing-ai-features-prompt-injection

File: `src/images/blog/securing-ai-features-prompt-injection.png` (or `.jpg`) · Category: Security · Scheme: Brick

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #B4432C (brick) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #F4D6CF for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "It believes everything"
Only the words "everything" are in the accent color #B4432C; the rest is ink.

Right side illustration: A sheet of paper with several text lines, one of which is highlighted in the accent color with a small warning triangle next to it. A simple desk lamp leans over the sheet.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### security-practices-every-company-needs

File: `src/images/blog/security-practices-every-company-needs.png` (or `.jpg`) · Category: Security · Scheme: Brick

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #B4432C (brick) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #F4D6CF for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Lock it down on day one"
Only the words "day one" are in the accent color #B4432C; the rest is ink.

Right side illustration: A simple calendar page showing the number 1. In front of it, a padlock filled with the accent color and a small key with a short checklist of three ticked lines beside it.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### shipping-chrome-extension-in-first-month

File: `src/images/blog/shipping-chrome-extension-in-first-month.png` (or `.jpg`) · Category: Shipping · Scheme: Forest

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #2F7D4F (forest) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #CDE8D6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Cut it to ship it"
Only the words "ship" are in the accent color #2F7D4F; the rest is ink.

Right side illustration: An envelope with a paperclip and a small padlock on the clip, moving right with a short dotted trail. Behind it, a pair of scissors and a few pale feature tags left behind on the ground.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### what-a-staff-engineer-actually-does

File: `src/images/blog/what-a-staff-engineer-actually-does.png` (or `.jpg`) · Category: Career & Leadership · Scheme: Amber

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #B7791F (amber) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #F5E3C2 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "A different job"
Only the words "job" are in the accent color #B7791F; the rest is ink.

Right side illustration: Two ladders side by side. The left ladder is pale and ends at the top. The right ladder, in the accent color, starts at the height where the first one ends and continues upward.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### why-engineers-should-write-in-public

File: `src/images/blog/why-engineers-should-write-in-public.png` (or `.jpg`) · Category: Career & Leadership · Scheme: Amber

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #B7791F (amber) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #F5E3C2 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Make the work visible"
Only the words "visible" are in the accent color #B7791F; the rest is ink.

Right side illustration: On the left, a closed box drawn with a dotted outline. On the right, the same box open, with a page sheet in the accent color rising out of it and three small lines radiating outward.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### why-web3-is-shifting-to-agentic

File: `src/images/blog/why-web3-is-shifting-to-agentic.png` (or `.jpg`) · Category: Web3 · Scheme: Indigo

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #4B4FC4 (indigo) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #DADBF6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "The new word is agentic"
Only the words "agentic" are in the accent color #4B4FC4; the rest is ink.

Right side illustration: A row of five identical pale label tags hanging on a string. A sixth tag in the accent color is being clipped on top of them, larger than the rest.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### why-web3-ux-still-loses-users

File: `src/images/blog/why-web3-ux-still-loses-users.png` (or `.jpg`) · Category: Web3 · Scheme: Indigo

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #4B4FC4 (indigo) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #DADBF6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Eleven steps is too many"
Only the words "many" are in the accent color #4B4FC4; the rest is ink.

Right side illustration: A staircase of eleven small steps descending from left to right. Each step holds fewer tiny dots than the one before it, and the last step holds a single dot in the accent color.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### how-to-keep-up-with-ai

File: `src/images/blog/how-to-keep-up-with-ai.png` (or `.jpg`) · Category: AI & Engineering · Scheme: Aqua

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #007F87 (aqua) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #B7E5E6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Build a filter, not a feed"
Only the words "filter" are in the accent color #007F87; the rest is ink.

Right side illustration: A tall frosted glass funnel catching a stream of many small pale glass tiles falling from the top edge. Only three tiles come out of the narrow end at the bottom, and one of them is tinted in the accent color.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### how-to-bring-ai-into-your-team

File: `src/images/blog/how-to-bring-ai-into-your-team.png` (or `.jpg`) · Category: Career & Leadership · Scheme: Amber

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #B7791F (amber) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #F5E3C2 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Outcomes, not theater"
Only the words "Outcomes" are in the accent color #B7791F; the rest is ink.

Right side illustration: Two frosted glass panels side by side. The left panel holds a tall bar chart of identical pale bars with a small pale stage curtain draped over its top corner. The right panel is smaller and holds one short accent-tinted bar with a checkmark above it.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### build-with-the-model-curve

File: `src/images/blog/build-with-the-model-curve.png` (or `.jpg`) · Category: Product & Architecture · Scheme: Forest

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #2F7D4F (forest) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #CDE8D6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Build with the curve"
Only the words "curve" are in the accent color #2F7D4F; the rest is ink.

Right side illustration: A smooth line rising from bottom left to top right across a large frosted glass panel. Two small pale glass blocks sit under the line and are being pressed flat by it, while one accent-tinted glass block rides on top of the line and rises with it.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### learning-a-new-field-with-ai

File: `src/images/blog/learning-a-new-field-with-ai.png` (or `.jpg`) · Category: AI & Engineering · Scheme: Aqua

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #007F87 (aqua) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #B7E5E6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Get the map first"
Only the words "map" are in the accent color #007F87; the rest is ink.

Right side illustration: A frosted glass map panel with a few connected nodes and winding paths. One route is drawn in the accent color and leads to a small flag. A round glass magnifying lens hovers over one node on the route.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

## Site-wide social previews

These replace the existing files in `src/images/` and keep their names. Export as JPG.

### meta.jpg (homepage and default)

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #007F87 (aqua) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #B7E5E6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "I turn messy ideas into fast, polished products"
Only the words "fast, polished" are in the accent color #007F87; the rest is ink.

Right side illustration: No illustration panel. Under the headline, a smaller ink line: "Shrinath Prabhu · Senior Staff Engineer at Avail". At the bottom right, a frosted glass pill holding a short waveform of about 20 bars in aqua.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```

### blog-meta.jpg (blog index)

```
Create a blog cover image in 1.91:1 landscape format, exactly 1200x630 pixels (the standard Open Graph size).

Style: calm, premium editorial tech illustration in a liquid glass and frosted glass look, like modern Apple and Samsung interface materials. Lots of empty space.

Background: cool off-white #F7FAFB. In the top-right corner, two very large, very soft blurred ambient glows: aqua #55BAC3 at about 25% opacity and blue #6898D8 at about 19% opacity. Keep the left side clean and light so the headline reads easily.

Glass material (use it for the illustration's main shapes):
- Translucent frosted glass panels and pills with rounded corners
- A 1px light rim around each panel (white at about 75% opacity) and a thin bright highlight along the top edge
- Panels softly blur and tint whatever sits behind them, with a faint soft shadow below (#172B33 at about 10% opacity)
- A gentle specular sheen on the top-left of larger panels. No rainbow edges, no chrome, no heavy reflections

Colors:
- Ink #172B33 for all type and fine 2px line work
- Accent #007F87 (aqua) for the single highlight, as a solid fill or a tinted glass panel
- Soft fill #B7E5E6 for tinted glass panels
- Glass base: white and #F3F9FA at 70 to 90% opacity
- Pale blue-grey #DCE7EA for hairlines
No other colors apart from the two background glows.

Layout: the headline sits on the left 45%, in a heavy geometric sans-serif
(similar to DM Sans Bold), ink color, tight letter spacing, 2 to 3 lines, left aligned, set directly on the background (not on glass).
Headline, spelled exactly: "Judgment, trade-offs and shipping"
Only the words "shipping" are in the accent color #007F87; the rest is ink.

Right side illustration: Three stacked frosted glass page panels, offset, the front one with a few short text bars and one aqua bar.
Render the main objects as layered frosted or liquid glass panels with slight depth, overlapping the ambient glow so the glass effect is visible. Use the accent and soft fill only where described.

The small text "shrinath.me" sits at the bottom left in ink.

Rules: no other text anywhere. No logos or brand marks. No faces or realistic people.
Soft 2.5D layering only: no photorealistic 3D, no neon, no robots, no glowing orbs.
Keep 8% clear margin on the left and right and 6% on the top and bottom, so nothing is cut off when the site crops the image to 16:9 on blog cards.
```
