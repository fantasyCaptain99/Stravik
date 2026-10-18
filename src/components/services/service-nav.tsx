"use client";

import { useState, useEffect } from "react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Sticky in-page service navigation.
 *
 * These are real anchor links, so they work without JavaScript and respect
 * browser history. The scroll-spy highlighting is an enhancement on top —
 * IntersectionObserver tracks which section is in view.
 */
export function ServiceNav({ services }: { services: Service[] }) {
  const [active, setActive] = useState(services[0]?.slug ?? "");

  useEffect(() => {
    const sections = services
      .map((s) => document.getElementById(s.slug))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [services]);

  return (
    <nav
      aria-label="Services"
      className="sticky top-[var(--header-h)] z-[60] border-y border-[color-mix(in_srgb,var(--color-primary)_16%,transparent)] bg-[color-mix(in_srgb,var(--color-ink)_88%,transparent)] backdrop-blur-xl md:top-[var(--header-h-md)]"
    >
      <div className="shell">
        <ul className="flex gap-6 overflow-x-auto py-4 [scrollbar-width:none] md:gap-9 [&::-webkit-scrollbar]:hidden">
          {services.map((s) => (
            <li key={s.slug} className="shrink-0">
              <a
                href={`#${s.slug}`}
                aria-current={active === s.slug ? "true" : undefined}
                className={cn(
                  "group relative inline-flex items-baseline gap-2 py-1 font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.13em] transition-colors duration-300",
                  active === s.slug
                    ? "text-[var(--color-mint)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-off-white)]",
                )}
              >
                <span className="tabular-nums opacity-60">{s.index}</span>
                {s.title}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-[var(--color-mint)] transition-all duration-400 ease-[var(--ease-out-expo)]",
                    active === s.slug ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
