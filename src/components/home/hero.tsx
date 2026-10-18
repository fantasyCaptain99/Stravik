"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import { KineticHeading, accentLine } from "@/components/animations/kinetic-heading";
import { Button } from "@/components/ui/button";
import { HeroTile } from "./hero-tile";
import { heroImages, available as heroImagesAvailable } from "@/data/hero-images";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Time each slide holds before advancing. */
const SLIDE_MS = 5600;

/**
 * Homepage hero.
 *
 * Background is a full-bleed carousel: one image at a time, cross-fading with
 * a slow scale drift so the frame never feels static. A dark scrim keeps the
 * headline contrast high regardless of which image is showing.
 *
 * Behaviour:
 *  - Auto-advances every 5.6s, pausing while the tab is hidden so slides do
 *    not pile up unseen, and while the pointer is over the indicators.
 *  - Indicator buttons jump directly to a slide and are keyboard operable.
 *  - Under prefers-reduced-motion the carousel does not auto-advance and
 *    there is no cross-fade; manual selection still works, instantly.
 *
 * To supply real photography see /src/data/hero-images.ts.
 */
export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);

  const count = heroImages.length;

  // Cross-fade to the active slide whenever it changes.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", stage);
    if (!slides.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = reduced;

    const ctx = gsap.context(() => {
      slides.forEach((slide, i) => {
        const active = i === index;

        if (reduced) {
          gsap.set(slide, { opacity: active ? 1 : 0 });
          gsap.set(slide.firstElementChild, { scale: 1 });
          return;
        }

        gsap.to(slide, {
          opacity: active ? 1 : 0,
          duration: 1.3,
          ease: "power2.inOut",
          overwrite: "auto",
        });

        // Slow drift on the active frame only — restarts each time it enters.
        if (active) {
          gsap.fromTo(
            slide.firstElementChild,
            { scale: 1.02 },
            {
              scale: 1.12,
              duration: SLIDE_MS / 1000 + 2,
              ease: "none",
              overwrite: "auto",
            },
          );
        }
      });
    }, stage);

    return () => ctx.revert();
  }, [index]);

  // Auto-advance. Skipped entirely under reduced motion.
  useEffect(() => {
    if (reducedRef.current || paused || count < 2) return;

    const tick = () => setIndex((i) => (i + 1) % count);
    const id = window.setInterval(tick, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  // Don't advance while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const goTo = useCallback((i: number) => setIndex(i), []);

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-[var(--color-ink)] pt-[var(--header-h)] md:min-h-screen md:pt-[var(--header-h-md)]">
      {/* ─── Background carousel ───────────────────────────────────────── */}
      <div ref={stageRef} className="absolute inset-0" aria-hidden="true">
        {heroImages.map((img, i) => (
          <div
            key={img.src}
            data-slide
            className="hero-slide absolute inset-0 overflow-hidden"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className="absolute inset-0">
              <HeroTile
                image={img}
                available={heroImagesAvailable}
                /* Only the first slide is LCP-critical; the rest load lazily. */
                priority={i === 0}
                /* Sources are 1672px wide. Capping the hint at 1920px stops
                   the optimizer from generating a 3840px variant that is
                   pure upscale — larger file, no extra detail. */
                sizes="(min-width: 1920px) 1920px, 100vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ─── Scrim ──────────────────────────────────────────────────────
          One gradient, no fully-opaque stops — the photography must stay
          visible across the whole frame, including behind the headline.

          Measured against the supplied images: the headline zone peaks at
          luminance ~184 (p90) and ~221 (p99) in the brightest frames. At
          68% ink those become 8.2–9.8:1 against the off-white text, well
          clear of the 4.5:1 AA requirement, while the scene still reads. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,color-mix(in_srgb,var(--color-ink)_72%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_68%,transparent)_34%,color-mix(in_srgb,var(--color-ink)_46%,transparent)_66%,color-mix(in_srgb,var(--color-ink)_30%,transparent)_100%)]"
        aria-hidden="true"
      />
      {/* Light vertical grounding: lifts the top edge away from the fixed
          header and keeps the bottom controls legible. Deliberately subtle
          so it does not re-darken the centre of the image. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-ink)_34%,transparent)_0%,transparent_18%,transparent_74%,color-mix(in_srgb,var(--color-ink)_62%,transparent)_100%)]"
        aria-hidden="true"
      />

      {/* ─── Content ───────────────────────────────────────────────────── */}
      <div className="shell relative w-full py-16 lg:py-0">
        {/* Width is set in `em` of the display font, not `ch` of the body
            font — the headline renders in Space Grotesk, so a ch-based box
            is measured against the wrong typeface and forces mid-phrase
            wrapping. `max-w-full` keeps it inside the gutter on small
            screens. */}
        <div className="max-w-full lg:max-w-[14em] lg:text-[length:var(--text-hero)]">
          <div className="hero-eyebrow flex items-center gap-4">
            <span className="h-px w-10 bg-[var(--color-primary)]" />
            <span className="eyebrow">Independent Digital Product Studio</span>
          </div>

          <KineticHeading
            as="h1"
            immediate
            delay={0.3}
            lines={["We turn bold", "ideas into", "digital reality."]}
            className="mt-7 text-[length:var(--text-hero)] font-semibold leading-[0.94] tracking-[-0.04em] md:mt-9"
            renderLine={(line, i) =>
              i === 2
                ? accentLine(line, "digital", "text-[var(--color-mint)]")
                : line.split("").map((ch, ci) => (
                    <span key={ci} className="kinetic-char">
                      {ch === " " ? " " : ch}
                    </span>
                  ))
            }
          />
        </div>

        <p
          data-reveal="up"
          data-reveal-delay="0.75"
          className="mt-7 max-w-[46ch] text-[length:var(--text-lead)] leading-[1.6] text-[color-mix(in_srgb,var(--color-off-white)_74%,transparent)] md:mt-9"
        >
          {site.description}
        </p>

        <div
          data-reveal="up"
          data-reveal-delay="0.9"
          className="mt-9 flex flex-wrap items-center gap-4 md:mt-11"
        >
          <Button href="/work" variant="solid">
            {site.cta.secondary}
          </Button>
          <Button href="/contact" variant="outline">
            {site.cta.primary}
          </Button>
        </div>
      </div>

      {/* ─── Carousel controls ─────────────────────────────────────────── */}
      <div
        className="absolute bottom-8 right-[var(--gutter)] z-10 flex items-center gap-5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <span className="index-label tabular-nums">
          {String(index + 1).padStart(2, "0")}
          <span className="mx-1 opacity-50">/</span>
          {String(count).padStart(2, "0")}
        </span>

        <div
          role="group"
          aria-label="Choose hero image"
          className="flex items-center gap-2.5"
        >
          {heroImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1} of ${count}`}
              aria-current={i === index ? "true" : undefined}
              className="group relative h-4 w-9 p-0"
            >
              <span
                className={cn(
                  "absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 transition-colors duration-400",
                  i === index
                    ? "bg-[var(--color-mint)]"
                    : "bg-[color-mix(in_srgb,var(--color-off-white)_28%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--color-off-white)_55%,transparent)]",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Announce slide changes without interrupting the user */}
      <p aria-live="polite" className="sr-only">
        Hero image {index + 1} of {count}
      </p>

      {/* ─── Scroll indicator ──────────────────────────────────────────── */}
      <div
        data-reveal
        data-reveal-delay="1.2"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 md:flex"
      >
        <span className="index-label tracking-[0.2em]">Scroll</span>
        <ArrowDown
          className="h-4 w-4 animate-bounce text-[var(--color-primary)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
