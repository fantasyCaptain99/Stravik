"use client";

import { useRef, useEffect, createElement, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  /** Each string is one visual line. Line breaks are deliberate, not reflowed. */
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Start on mount (hero) rather than waiting for scroll. */
  immediate?: boolean;
  delay?: number;
  /** Optional per-line decoration, e.g. a mint accent on one word. */
  renderLine?: (line: string, index: number) => ReactNode;
};

/**
 * Per-character kinetic headline — the signature motion of this design
 * direction. Characters rise out of a clipped line box in sequence.
 *
 * Accessibility: the full text is exposed as a single accessible string via
 * aria-label, and the split characters are hidden from assistive tech. A
 * screen reader hears "We turn bold ideas into digital reality.", never
 * individual letters.
 *
 * Reduced motion: the split is skipped entirely and plain text renders.
 */
export function KineticHeading({
  lines,
  as = "h2",
  className,
  immediate = false,
  delay = 0,
  renderLine,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const label = lines.join(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = el.querySelectorAll<HTMLElement>(".kinetic-char");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          ease: "expo.out",
          stagger: 0.016,
          delay,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start: "top 85%", once: true } }),
        },
      );
    }, el);

    return () => ctx.revert();
  }, [immediate, delay, lines]);

  return createElement(
    as,
    { ref, className: cn(className), "aria-label": label },
    lines.map((line, li) => (
      <span key={li} className="kinetic-line block" aria-hidden="true">
        {renderLine
          ? renderLine(line, li)
          : line.split("").map((ch, ci) => (
              <span key={ci} className="kinetic-char">
                {ch === " " ? " " : ch}
              </span>
            ))}
      </span>
    )),
  );
}

/**
 * Splits a line into characters, wrapping a chosen substring in an accent.
 * Used where one word in a headline should carry the mint highlight.
 */
export function accentLine(line: string, accent: string, accentClass: string) {
  const at = line.indexOf(accent);
  if (at === -1) {
    return line.split("").map((ch, i) => (
      <span key={i} className="kinetic-char">
        {ch === " " ? " " : ch}
      </span>
    ));
  }

  const segments: { text: string; accent: boolean }[] = [
    { text: line.slice(0, at), accent: false },
    { text: accent, accent: true },
    { text: line.slice(at + accent.length), accent: false },
  ];

  let key = 0;
  return segments.flatMap((seg) =>
    seg.text.split("").map((ch) => (
      <span
        key={key++}
        className={cn("kinetic-char", seg.accent && accentClass)}
      >
        {ch === " " ? " " : ch}
      </span>
    )),
  );
}
