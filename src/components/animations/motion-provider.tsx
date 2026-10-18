"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global motion runtime.
 *
 * Responsibilities:
 *  - Drive every `[data-reveal]` element on the page via one ScrollTrigger
 *    batch, rather than one instance per component.
 *  - Refresh triggers after route changes so measurements stay correct.
 *  - Disable all motion when the user prefers reduced motion. In that case
 *    nothing is hidden and nothing animates — the CSS handles visibility.
 *
 * The `.js-motion` class on <html> (set by the inline bootstrap in layout)
 * is what allows CSS to hide reveal targets. If this component never mounts,
 * that class is absent and all content is visible by default.
 */
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.documentElement.classList.remove("js-motion");
      return;
    }

    const ctx = gsap.context(() => {
      // ─── Standard reveals ───────────────────────────────────────────────
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      items.forEach((el) => {
        const kind = el.dataset.reveal;
        const delay = Number(el.dataset.revealDelay ?? 0);

        const from: gsap.TweenVars =
          kind === "mask"
            ? { clipPath: "inset(0 0 100% 0)" }
            : { opacity: 0, y: kind === "up" ? 40 : 0 };

        const to: gsap.TweenVars =
          kind === "mask"
            ? {
                clipPath: "inset(0 0 0% 0)",
                duration: 1.1,
                ease: "expo.out",
                delay,
              }
            : {
                opacity: 1,
                y: 0,
                duration: 0.95,
                ease: "expo.out",
                delay,
              };

        gsap.fromTo(el, from, {
          ...to,
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        });
      });

      // ─── Staggered groups ───────────────────────────────────────────────
      // A container marked [data-stagger] animates its direct children in
      // sequence. Children must carry [data-stagger-item].
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const children = group.querySelectorAll<HTMLElement>("[data-stagger-item]");
        if (!children.length) return;

        gsap.fromTo(
          children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: "top 84%", once: true },
          },
        );
      });
    });

    // Fonts shift layout; recompute trigger positions once they land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
