"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectVisual } from "@/components/portfolio/project-visual";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

/**
 * Selected work — horizontal scroll track on desktop.
 *
 * Progressive enhancement, deliberately:
 *  - The markup is a normal horizontally-scrollable flex row. With no JS it
 *    scrolls natively (trackpad, shift+wheel, touch) and remains fully usable.
 *  - On large viewports with motion allowed, GSAP pins the section and maps
 *    vertical scroll onto horizontal travel.
 *  - Below 1024px, or under reduced motion, the pin never initialises and the
 *    track stays a native swipeable carousel.
 *
 * Scroll is never hijacked outside the pinned range, and the pin releases
 * cleanly at both ends.
 */
export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect, not useEffect: ScrollTrigger's pin wraps this section
  // in a spacer that React does not know about. Layout-effect cleanup runs
  // before React detaches the node, so matchMedia can unwrap the pin first.
  // A passive effect runs too late and navigation throws removeChild.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (!context.conditions?.isDesktop) return;

        const distance = () => track.scrollWidth - window.innerWidth;
        if (distance() <= 0) return;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-ink)] py-28 md:py-32 lg:py-0"
    >
      <div className="grid-field absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <div className="shell">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeader index="03" eyebrow="Selected Work">
              <h2
                data-reveal="up"
                className="max-w-[16ch] text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-[-0.04em]"
              >
                Built to stand out.{" "}
                <span className="text-[var(--color-mint)]">Designed to perform.</span>
              </h2>
            </SectionHeader>

            <div className="hidden shrink-0 lg:block">
              <Button href="/work" variant="outline">
                View all work
              </Button>
            </div>
          </div>
        </div>

        {/* ─── Track ───────────────────────────────────────────────────── */}
        <div className="mt-14 overflow-x-auto lg:mt-16 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            ref={trackRef}
            className="flex w-max gap-5 px-[var(--gutter)] md:gap-7"
          >
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group block w-[78vw] shrink-0 sm:w-[58vw] md:w-[46vw] lg:w-[38vw] xl:w-[32vw]"
              >
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
                      <ProjectVisual project={p} />
                    </div>

                    {/* Concept label — never presented as delivered client work */}
                    {p.kind === "concept" && (
                      <span className="absolute left-4 top-4 border border-[color-mix(in_srgb,var(--color-mint)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-ink)_75%,transparent)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-mint)] backdrop-blur-sm">
                        Concept
                      </span>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent opacity-60" />

                    <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-ink)] opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:opacity-100">
                      <ArrowUpRight
                        className="h-5 w-5 text-[var(--color-mint)]"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <div className="mt-5 flex items-baseline gap-4">
                    <span className="index-label">({p.index})</span>
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-display)] text-[1.5rem] font-medium leading-tight tracking-[-0.025em] transition-colors duration-300 group-hover:text-[var(--color-mint)]">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-[0.9rem] text-[var(--color-muted)]">
                        {p.discipline}
                      </p>
                    </div>
                    <span className="index-label">{p.year}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <div className="shell mt-12 lg:hidden">
          <Button href="/work" variant="outline">
            View all work
          </Button>
        </div>
      </div>
    </section>
  );
}
