"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqList({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState(0);

  return (
    <ul className="border-t border-[var(--color-rule)]">
      {items.map((item, i) => {
        const expanded = open === i;
        const panelId = `faq-a-${i}`;
        const buttonId = `faq-q-${i}`;
        return (
          <li
            key={item.q}
            className={cn(
              "border-b transition-colors",
              expanded
                ? "border-[var(--color-primary)]"
                : "border-[var(--color-rule)]",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-[family-name:var(--font-display)] text-lg sm:text-xl"
              >
                {item.q}
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    expanded
                      ? "rotate-45 bg-[var(--color-ink)] text-[var(--color-mint)]"
                      : "border border-[var(--color-rule)] text-[var(--color-ink)]",
                  )}
                >
                  <Plus className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 leading-relaxed text-[var(--color-muted)]">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
