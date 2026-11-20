// Which cover a blog post uses. Shared by the build (src/blog/blog.11tydata.js)
// and the image script (scripts/blog-images.js) so they never disagree.
//
// Covers live at /images/blog/<slug>.jpg (or .png before the script has
// converted it). Until one is added, a post falls back to its previous cover
// (imageFallback) or to no cover at all.
import { existsSync } from "node:fs";
import { join } from "node:path";

export const imageExists = (path) =>
  Boolean(path) && existsSync(join("src", path));

export function resolveCover(image, imageFallback) {
  if (imageExists(image)) return image;
  const asJpg = image?.replace(/\.png$/i, ".jpg");
  if (asJpg !== image && imageExists(asJpg)) return asJpg;
  if (imageExists(imageFallback)) return imageFallback;
  return undefined;
}
