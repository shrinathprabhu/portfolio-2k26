#!/usr/bin/env node
// Prepares blog cover images before a deploy. Run with `npm run images`.
//
// 1. Masters: a cover dropped into src/images/blog as a PNG (or an oversized
//    JPG) becomes a full-resolution, high-quality JPG under 1MB. The page cuts
//    its responsive WebP sizes from this master at build time.
// 2. Open Graph: each post's cover gets a 1200x630 copy under 200KB in
//    src/images/og. The name carries a content hash because images are cached
//    for a year, so replacing a cover also changes its URL.
// 3. Blur placeholders: a tiny inline image per cover, shown blurred behind
//    the card and post cover until the real image loads.
// 4. Site-wide social images: og-image (every page) and blog-og-image (the
//    blog index), dropped as PNG or JPG into src/images or src/images/blog,
//    become src/images/<name>.jpg at 1200x630 and under 200KB.
//
// Results are recorded in src/_data/blogImages.json, which the build reads.
// Unchanged covers are skipped, so running it again is quick.
//
//   npm run images            generate anything missing or out of date
//   npm run images -- --check exit 1 if anything is out of date (for CI)

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  statSync,
  unlinkSync,
} from "node:fs";
import { join, basename, extname } from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { resolveCover } from "../lib/blog-cover.js";

const POSTS_DIR = "src/blog";
const MASTERS_DIR = "src/images/blog";
const OG_DIR = "src/images/og";
const MANIFEST = "src/_data/blogImages.json";
const SITE_DIR = "src/images";
const SITE_IMAGES = ["og-image", "blog-og-image"]; // referenced by templates

const MASTER_MAX_BYTES = 1024 * 1024;
const MASTER_MAX_WIDTH = 2400; // plenty for a 672px cover on a 3x screen
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const OG_MAX_BYTES = 200 * 1024;
const PLACEHOLDER_WIDTH = 24;
const BACKGROUND = "#F7FAFB"; // site background, for covers with transparency

const check = process.argv.includes("--check");
const problems = [];
const log = (msg) => console.log(`  ${msg}`);
const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;
const hashOf = (file) =>
  createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 10);

// Encode, stepping the quality down only if the file would go over budget.
async function encodeJpeg(pipeline, out, maxBytes, qualities) {
  let buffer;
  for (const quality of qualities) {
    buffer = await pipeline
      .clone()
      .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:4:4", progressive: true })
      .toBuffer();
    if (buffer.length <= maxBytes) break;
  }
  writeFileSync(out, buffer);
  return buffer.length;
}

// ── 4. Site-wide social images (run first, so they are not taken for covers) ──
async function prepareSiteImages() {
  for (const name of SITE_IMAGES) {
    const out = join(SITE_DIR, `${name}.jpg`);
    const dropped = [
      ...[".png", ".jpg", ".jpeg"].map((ext) => join(MASTERS_DIR, name + ext)),
      join(SITE_DIR, `${name}.png`),
      join(SITE_DIR, `${name}.jpeg`),
    ].find((path) => existsSync(path));

    let src = dropped;
    if (!src && existsSync(out)) {
      // Already converted: only redo it if it is the wrong size or too heavy.
      const meta = await sharp(out).metadata();
      const ok =
        meta.width === OG_WIDTH && meta.height === OG_HEIGHT && statSync(out).size <= OG_MAX_BYTES;
      if (ok) continue;
      src = out;
    }
    if (!src) {
      problems.push(`${out} is missing; the site's social previews point to it`);
      continue;
    }
    if (check) {
      problems.push(`${src} needs converting to ${out}`);
      continue;
    }

    const pipeline = sharp(readFileSync(src))
      .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", kernel: "lanczos3" })
      .flatten({ background: BACKGROUND });
    const size = await encodeJpeg(pipeline, out, OG_MAX_BYTES, [92, 88, 84, 80, 75, 70]);
    if (src !== out) unlinkSync(src);
    log(`site    ${src} → ${out} (${kb(size)})`);
  }
}

// ── 1. Masters ──
async function prepareMasters() {
  if (!existsSync(MASTERS_DIR)) return;
  for (const file of readdirSync(MASTERS_DIR)) {
    const ext = extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
    if (SITE_IMAGES.includes(basename(file, extname(file)))) continue;

    const src = join(MASTERS_DIR, file);
    const meta = await sharp(src).metadata();
    const isPng = ext === ".png";
    const tooBig = statSync(src).size > MASTER_MAX_BYTES || meta.width > MASTER_MAX_WIDTH;
    if (!isPng && !tooBig) continue;

    const out = join(MASTERS_DIR, `${basename(file, extname(file))}.jpg`);
    if (check) {
      problems.push(`${src} needs converting to a compressed master`);
      continue;
    }
    if (isPng && existsSync(out)) {
      problems.push(`${src} and ${out} both exist; remove the one you don't want`);
      continue;
    }

    // Encoded in memory first, so an oversized JPG can be replaced in place.
    const pipeline = sharp(src)
      .resize({ width: MASTER_MAX_WIDTH, withoutEnlargement: true, kernel: "lanczos3" })
      .flatten({ background: BACKGROUND });
    const size = await encodeJpeg(pipeline, out, MASTER_MAX_BYTES, [95, 92, 88, 84, 80]);
    if (isPng) unlinkSync(src);
    log(`master  ${file} → ${basename(out)} (${kb(size)})`);
  }
}

// ── Which covers are in use ──
function coversInUse() {
  const covers = new Set();
  for (const file of readdirSync(POSTS_DIR)) {
    if (!file.endsWith(".md")) continue;
    const text = readFileSync(join(POSTS_DIR, file), "utf8");
    const front = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
    const field = (name) =>
      front.match(new RegExp(`^${name}:\\s*["']?([^"'\\n]+)["']?\\s*$`, "m"))?.[1];
    if (/^draft:\s*true/m.test(front)) continue;
    const cover = resolveCover(field("image"), field("imageFallback"));
    if (cover) covers.add(cover);
  }
  return [...covers].sort();
}

// ── 2 and 3. Open Graph copies and placeholders ──
async function prepareDerived(covers, previous) {
  mkdirSync(OG_DIR, { recursive: true });
  const manifest = {};

  for (const cover of covers) {
    const src = join("src", cover);
    const hash = hashOf(src);
    const old = previous[cover];
    const og = `/images/og/${basename(cover, extname(cover))}-${hash}.jpg`;

    if (old && old.hash === hash && existsSync(join("src", old.og))) {
      manifest[cover] = old;
      continue;
    }
    if (check) {
      problems.push(`${cover} has no up-to-date Open Graph copy or placeholder`);
      continue;
    }

    const meta = await sharp(src).metadata();
    const ogPipeline = sharp(src)
      .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", kernel: "lanczos3" })
      .flatten({ background: BACKGROUND });
    const ogSize = await encodeJpeg(ogPipeline, join("src", og), OG_MAX_BYTES, [92, 88, 84, 80, 75, 70]);

    const tiny = await sharp(src)
      .resize(PLACEHOLDER_WIDTH)
      .flatten({ background: BACKGROUND })
      .jpeg({ quality: 50 })
      .toBuffer();

    manifest[cover] = {
      hash,
      width: meta.width,
      height: meta.height,
      og,
      placeholder: `data:image/jpeg;base64,${tiny.toString("base64")}`,
    };
    log(`og      ${basename(og)} (${kb(ogSize)}), placeholder ${tiny.length}B`);
  }

  // Remove Open Graph copies nothing points to any more.
  const keep = new Set(Object.values(manifest).map((entry) => basename(entry.og)));
  for (const file of readdirSync(OG_DIR)) {
    if (keep.has(file)) continue;
    if (check) {
      problems.push(`${join(OG_DIR, file)} is stale`);
    } else {
      unlinkSync(join(OG_DIR, file));
      log(`removed ${join(OG_DIR, file)}`);
    }
  }
  return manifest;
}

const previous = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
console.log(check ? "Checking blog images…" : "Preparing blog images…");
await prepareSiteImages();
await prepareMasters();
const covers = coversInUse();
const manifest = await prepareDerived(covers, previous);

// A cover no post points to is usually a file named after an old slug.
for (const file of readdirSync(MASTERS_DIR)) {
  const path = `/images/blog/${file}`;
  if (/\.(jpe?g|png)$/i.test(file) && !covers.includes(path)) {
    problems.push(`${join(MASTERS_DIR, file)} is not used by any post (check the file name matches the post's slug)`);
  }
}

if (check) {
  if (problems.length) {
    console.error(problems.map((p) => `  ✗ ${p}`).join("\n"));
    console.error("Run `npm run images` and commit the result.");
    process.exit(1);
  }
  console.log("  All blog images are up to date.");
} else {
  mkdirSync("src/_data", { recursive: true });
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  if (problems.length) console.warn(problems.map((p) => `  ! ${p}`).join("\n"));
  console.log(`  ${Object.keys(manifest).length} covers ready.`);
}
