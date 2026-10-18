import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Stravik emblem.
 *
 * ─── REPLACING THE LOGO ─────────────────────────────────────────────────────
 * This is the ONLY component that references the emblem file. To swap in a
 * new version, overwrite /public/brand/stravik-emblem.png and nothing else
 * needs to change.
 *
 * Current asset: derived from the owner-supplied stravik-logo.png, which
 * shipped as RGB with a flattened checkerboard (no alpha channel). The
 * checkerboard was removed by fitting its periodic grid (19.6px) and
 * subtracting it — geometry, gradients and metallic finish are untouched.
 * The original file is preserved unmodified at /public/brand/stravik-logo.png.
 *
 * KNOWN ISSUE: four small checker remnants remain on the outer silhouette
 * (upper-left blade tip, right spike inner elbow, far-left diamond edge,
 * bottom tip). They are not visible below ~120px. For large hero use at full
 * scale, a few minutes of manual cleanup in an image editor will finish it.
 */

const SRC = "/brand/stravik-emblem.webp";

/** Intrinsic dimensions of the trimmed asset. */
const INTRINSIC = { w: 1027, h: 1040 };

type Props = {
  size?: number;
  className?: string;
  priority?: boolean;
  /** Decorative instances (hero art) should not announce themselves twice. */
  decorative?: boolean;
  /**
   * Responsive `sizes` hint. Required whenever `className` overrides the
   * rendered width (e.g. the hero's viewport-relative sizing) — without it
   * Next.js cannot infer the display size and falls back to serving the
   * largest candidate, which is a large wasted download.
   */
  sizes?: string;
};

export function Brandmark({
  size = 32,
  className,
  priority = false,
  decorative = false,
  sizes,
}: Props) {
  const width = Math.round(size * (INTRINSIC.w / INTRINSIC.h));

  return (
    <Image
      src={SRC}
      alt={decorative ? "" : "Stravik emblem"}
      aria-hidden={decorative || undefined}
      width={width}
      height={size}
      priority={priority}
      // Cap the candidate set at ~2x the largest rendered width.
      sizes={sizes ?? `${width}px`}
      /* `w-auto h-auto` lets the rendered size follow whatever the caller
         sets through `className` (the hero, CTA and about page use
         viewport-relative widths) while keeping the intrinsic aspect ratio.
         Declaring both silences Next.js's "only one dimension modified"
         warning without an inline style, which would outrank the caller's
         responsive classes. */
      className={cn("select-none h-auto w-auto", className)}
    />
  );
}

/**
 * Full lockup: emblem + wordmark. Used in the header and footer.
 * The wordmark is live text, so it stays crisp and is selectable/indexable.
 */
export function Lockup({
  className,
  emblemSize = 26,
  priority = false,
}: {
  className?: string;
  emblemSize?: number;
  priority?: boolean;
}) {
  /* The wordmark reads best at roughly half the emblem's height — the emblem
     is a tall, visually dense form, so matching cap-height to it directly
     makes the type overpower the mark. */
  const wordmarkSize = Math.round(emblemSize * 0.46);

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Brandmark size={emblemSize} priority={priority} decorative />
      <span
        className="font-[family-name:var(--font-display)] font-semibold leading-none tracking-[0.2em]"
        style={{ fontSize: `${wordmarkSize}px` }}
      >
        STRAVIK
      </span>
    </span>
  );
}
