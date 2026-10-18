/**
 * Hero background carousel images.
 *
 * Shown one at a time, full-bleed, cross-fading every 5.6 seconds.
 *
 * ─── ADDING THE REAL IMAGES ─────────────────────────────────────────────────
 * Save four images into /public/images/hero/ using exactly these filenames:
 *
 *   hero-1.webp   hero-2.webp   hero-3.webp   hero-4.webp
 *
 * Then set `available: true` below. Nothing else needs to change.
 *
 * Recommended: landscape, at least 2000px wide (they fill the viewport), .webp.
 * Each sits behind a dark scrim with the headline over the left third, so
 * images that are calm on the left and more detailed on the right read best.
 * Darker source images need less scrim and look better.
 *
 * Keep the four visually related — they cross-fade into each other, so a
 * consistent palette and exposure makes the transition feel deliberate.
 *
 * Until `available` is true, each slide renders an original generated
 * composition instead — identical dimensions, so swapping in photography
 * causes no layout shift.
 */

export type HeroImage = {
  /** Path under /public. */
  src: string;
  /**
   * Alt text. The grid is decorative background behind the headline, so these are
   * empty by default — screen readers skip them rather than announcing four
   * images before the page's actual content. Fill in only if an image
   * carries meaning the headline does not.
   */
  alt: string;
  /** Drives the generated fallback composition. */
  variant: "grid" | "light" | "geometry" | "interface";
};

/**
 * Flip to `false` to fall back to the generated compositions (useful if the
 * photography is ever pulled and replacements are not ready).
 */
export const available = true;

export const heroImages: HeroImage[] = [
  { src: "/images/hero/hero-1.webp", alt: "", variant: "geometry" },
  { src: "/images/hero/hero-2.webp", alt: "", variant: "interface" },
  { src: "/images/hero/hero-3.webp", alt: "", variant: "light" },
  { src: "/images/hero/hero-4.webp", alt: "", variant: "grid" },
];
