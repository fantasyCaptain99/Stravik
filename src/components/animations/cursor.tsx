"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom cursor — a small mint ring that trails the pointer and expands
 * over interactive elements.
 *
 * Strictly opt-in by capability:
 *  - `(pointer: fine)` only — never renders on touch devices.
 *  - Disabled under prefers-reduced-motion.
 *  - The native cursor is NOT hidden. Hiding it harms users who rely on the
 *    system cursor's contrast settings, and the ring reads as an accent
 *    alongside it rather than a replacement.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    el.style.opacity = "1";

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Expand over anything interactive.
    const interactive = "a, button, [role='button'], input, textarea, select";

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.(interactive)) {
        gsap.to(el, { scale: 2.1, opacity: 0.55, duration: 0.3, ease: "power3.out" });
      }
    };

    const onOut = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.(interactive)) {
        gsap.to(el, { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out" });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-mint)] opacity-0 [@media(pointer:fine)]:block"
      style={{ mixBlendMode: "difference" }}
    />
  );
}
