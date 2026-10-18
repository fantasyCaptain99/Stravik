"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      className="group inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-mint)]"
    >
      Back to top
      <ArrowUp
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </button>
  );
}
