"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COPY =
  "Anyone can ship a screen that looks right. We care about what happens at month eighteen — when traffic triples, when the team changes, when the requirement nobody planned for arrives. That is the difference between something built and something engineered.";

/**
 * Brand statement with scroll-linked word illumination.
 *
 * Words begin dim and brighten as the section passes through the viewport.
 * Under reduced motion every word renders at full brightness immediately.
 */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.17 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "bottom 58%",
            scrub: 0.6,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-[var(--color-forest)] py-28 md:py-40">
      <div className="shell">
        <div className="flex items-center gap-4">
          <span className="index-label">(01)</span>
          <span className="h-px w-8 bg-[color-mix(in_srgb,var(--color-primary)_45%,transparent)]" />
          <span className="eyebrow">Our Philosophy</span>
        </div>

        <h2
          data-reveal="up"
          className="mt-10 max-w-[18ch] text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-[-0.04em]"
        >
          Not just built.{" "}
          <span className="text-[var(--color-mint)]">Thoughtfully engineered.</span>
        </h2>

        <p
          ref={ref}
          className="mt-14 max-w-[42ch] text-[length:var(--text-card)] font-[family-name:var(--font-display)] leading-[1.32] tracking-[-0.02em] md:mt-20 md:max-w-[26ch]"
        >
          {COPY.split(" ").map((w, i) => (
            <span key={i} data-word className="inline-block">
              {w}
              {" "}
            </span>
          ))}
        </p>

        <div className="mt-16 grid gap-10 border-t border-[color-mix(in_srgb,var(--color-primary)_16%,transparent)] pt-10 sm:grid-cols-3 md:mt-24">
          {[
            {
              k: "Creative thinking",
              v: "We question the brief before we answer it. The best solution is often not the one that was asked for.",
            },
            {
              k: "User-centred design",
              v: "Interfaces are judged by whether people can use them, not by how they photograph.",
            },
            {
              k: "Engineering excellence",
              v: "Code written to be read, extended and handed over. Technical debt is a design decision.",
            },
          ].map((item, i) => (
            <div key={item.k} data-reveal="up" data-reveal-delay={String(i * 0.08)}>
              <h3 className="font-[family-name:var(--font-mono)] text-[0.8125rem] uppercase tracking-[0.14em] text-[var(--color-primary)]">
                {item.k}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.6] text-[var(--color-muted)]">
                {item.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
