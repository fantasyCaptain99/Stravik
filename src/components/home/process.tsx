"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "We learn the business before the brief. Who the users are, what the constraints actually are, and which assumptions need testing before anyone commits budget.",
  },
  {
    n: "02",
    title: "Strategize",
    body: "Scope, architecture and sequencing. We decide what ships first and what deliberately waits — and we write down why, so the decision survives the project.",
  },
  {
    n: "03",
    title: "Design",
    body: "Interface and interaction design, prototyped early. The hard questions get answered in a prototype where changes are cheap, not in production where they are not.",
  },
  {
    n: "04",
    title: "Develop",
    body: "Engineering in reviewable increments. You see working software continuously, with tests and documentation written alongside rather than retrofitted.",
  },
  {
    n: "05",
    title: "Launch & Evolve",
    body: "Deployment, monitoring and the first weeks of real usage — where the actual priorities reveal themselves. Then we keep improving against data.",
  },
];

/**
 * Process timeline with a scroll-linked progress indicator.
 *
 * The list is a semantic <ol> that reads correctly with no JavaScript. The
 * progress line and active-step highlighting are enhancements layered on top.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const line = lineRef.current;
    if (!el || !line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(line, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 62%",
            end: "bottom 78%",
            scrub: 0.5,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 62%",
          end: "bottom 62%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-[var(--color-off-white)] py-28 text-[var(--color-ink)] md:py-40">
      <div className="shell">
        <SectionHeader index="05" eyebrow="The Process">
          <h2
            data-reveal="up"
            className="max-w-[18ch] text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-[-0.04em]"
          >
            From the first conversation to the final pixel.
          </h2>
        </SectionHeader>

        <div ref={ref} className="relative mt-16 md:mt-24">
          {/* Progress rail */}
          <div
            className="absolute bottom-0 left-[7px] top-2 hidden w-px bg-[var(--color-rule)] md:block"
            aria-hidden="true"
          >
            <span
              ref={lineRef}
              className="absolute inset-x-0 top-0 h-full origin-top bg-[var(--color-primary)]"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <ol className="flex flex-col">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                data-step
                data-reveal="up"
                data-reveal-delay={String(i * 0.04)}
                className="relative grid gap-4 py-8 md:grid-cols-[auto_1fr_1.5fr] md:gap-12 md:py-11 md:pl-0"
              >
                {/* Node */}
                <span
                  className={cn(
                    "absolute left-0 top-[2.6rem] hidden h-[15px] w-[15px] rounded-full border-2 bg-[var(--color-off-white)] transition-colors duration-500 md:block",
                    i <= active
                      ? "border-[var(--color-primary)]"
                      : "border-[var(--color-rule)]",
                  )}
                  aria-hidden="true"
                />

                <span
                  className={cn(
                    "font-[family-name:var(--font-mono)] text-[0.8125rem] tabular-nums transition-colors duration-500 md:ml-12 md:w-10",
                    i <= active
                      ? "text-[var(--color-primary-deep)]"
                      : "text-[var(--color-muted)]",
                  )}
                >
                  ({s.n})
                </span>

                <h3
                  className={cn(
                    "font-[family-name:var(--font-display)] text-[length:var(--text-card)] font-medium leading-[1.1] tracking-[-0.03em] transition-colors duration-500",
                    i <= active
                      ? "text-[var(--color-ink)]"
                      : "text-[color-mix(in_srgb,var(--color-ink)_45%,transparent)]",
                  )}
                >
                  {s.title}
                </h3>

                <p className="max-w-[54ch] text-[0.98rem] leading-[1.65] text-[color-mix(in_srgb,var(--color-ink)_65%,transparent)]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
