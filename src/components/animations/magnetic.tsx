"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";

type Props = {
  children: ReactNode;
  /** Pull distance in px at the edge of the hit area. */
  strength?: number;
  className?: string;
};

/**
 * Magnetic hover wrapper — the element drifts toward the pointer.
 *
 * Gated to fine pointers only. Touch devices never attach the listener, so
 * there is no cost on mobile and no stuck transforms after a tap.
 * Disabled entirely under prefers-reduced-motion.
 */
export function Magnetic({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}
