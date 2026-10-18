"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { HeroTile } from "./hero-tile";
import { heroImages, available as heroImagesAvailable } from "@/data/hero-images";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const SLIDE_MS = 5600;

/**
 * Hero — mirrors the reference layout: full-bleed photographic background,
 * oversized single-word brand headline, a short supporting line, and one
 * dominant call to action. Centred composition rather than left-aligned.
 */
export function MlHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);
  const count = heroImages.length;

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
          return;
        }
        gsap.to(slide, {
          opacity: active ? 1 : 0,
          duration: 1.3,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        if (active) {
          gsap.fromTo(
            slide.firstElementChild,
            { scale: 1.03 },
            { scale: 1.12, duration: SLIDE_MS / 1000 + 2, ease: "none", overwrite: "auto" },
          );
        }
      });
    }, stage);

    return () => ctx.revert();
  }, [index]);

  useEffect(() => {
    if (reducedRef.current || paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const goTo = useCallback((i: number) => setIndex(i), []);

  return (
    <section className="relative flex min-h-[88svh] items-center justify-center overflow-hidden bg-[var(--color-ink)] pt-[var(--header-h)] md:min-h-[94vh] md:pt-[var(--header-h-md)]">
      <div ref={stageRef} className="absolute inset-0" aria-hidden="true">
        {heroImages.map((img, i) => (
          <div
            key={img.src}
            data-slide
            className="absolute inset-0 overflow-hidden"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className="absolute inset-0">
              <HeroTile
                image={img}
                available={heroImagesAvailable}
                priority={i === 0}
                sizes="(min-width: 1920px) 1920px, 100vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Even scrim — the reference centres its content over the image, so the
          darkening is uniform rather than weighted to one side. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--color-ink)_58%,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-ink)_62%,transparent)_0%,transparent_26%,transparent_62%,var(--color-ink)_100%)]"
        aria-hidden="true"
      />

      <div className="shell relative flex flex-col items-center text-center">
        <span
          data-reveal="up"
          className="eyebrow mb-7 border border-[color-mix(in_srgb,var(--color-primary)_45%,transparent)] px-4 py-2"
        >
          Now taking new projects
        </span>

        <h1
          data-reveal="up"
          data-reveal-delay="0.08"
          className="font-semibold leading-[0.84] tracking-[-0.05em] [font-size:clamp(4rem,17vw,15rem)]"
        >
          STRAVIK
        </h1>

        <p
          data-reveal="up"
          data-reveal-delay="0.16"
          className="mt-8 max-w-[46ch] text-[length:var(--text-lead)] leading-[1.5] text-[color-mix(in_srgb,var(--color-off-white)_82%,transparent)]"
        >
          Software that changes what comes next for your business.
        </p>

        <div data-reveal="up" data-reveal-delay="0.24" className="mt-10">
          <Button href="/contact" variant="solid" className="!px-9 !py-5">
            {site.cta.primary}
          </Button>
        </div>
      </div>

      {/* Slide indicators */}
      <div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {heroImages.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show image ${i + 1} of ${count}`}
            aria-current={i === index ? "true" : undefined}
            className="group h-4 w-8 p-0"
          >
            <span
              className={cn(
                "block h-[2px] w-full transition-colors duration-400",
                i === index
                  ? "bg-[var(--color-mint)]"
                  : "bg-[color-mix(in_srgb,var(--color-off-white)_30%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--color-off-white)_60%,transparent)]",
              )}
            />
          </button>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        Hero image {index + 1} of {count}
      </p>
    </section>
  );
}
