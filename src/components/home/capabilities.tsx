"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

/**
 * Capabilities accordion.
 *
 * Implemented as a proper disclosure pattern: each row is a real <button>
 * with aria-expanded and aria-controls, and the panel is a region labelled
 * by its trigger. Keyboard and screen-reader usable, and the content is in
 * the DOM at all times so it remains indexable.
 *
 * On desktop, hovering a row also previews it — but hover never *replaces*
 * click, so the interaction works on every input type.
 */
export function Capabilities() {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <section className="relative bg-[var(--color-off-white)] py-28 text-[var(--color-ink)] md:py-40">
      <div className="shell">
        <SectionHeader index="02" eyebrow="Capabilities">
          <h2
            data-reveal="up"
            className="max-w-[14ch] text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-[-0.04em]"
          >
            What we do best.
          </h2>
        </SectionHeader>

        <div className="mt-16 md:mt-20">
          {services.map((service, i) => {
            const open = openIndex === i;
            const panelId = `${baseId}-panel-${i}`;
            const btnId = `${baseId}-trigger-${i}`;

            return (
              <div
                key={service.slug}
                data-reveal="up"
                data-reveal-delay={String(i * 0.05)}
                className={cn(
                  "border-t border-[var(--color-rule)] transition-colors duration-500",
                  i === services.length - 1 && "border-b",
                  open && "bg-[var(--color-pure)]",
                )}
                onMouseEnter={() => setOpenIndex(i)}
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="group flex w-full items-center gap-5 px-1 py-7 text-left md:gap-10 md:py-9"
                  >
                    <span
                      className={cn(
                        "font-[family-name:var(--font-mono)] text-[0.8125rem] tabular-nums transition-colors duration-300",
                        open
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-muted)]",
                      )}
                    >
                      ({service.index})
                    </span>

                    <span
                      className={cn(
                        "flex-1 font-[family-name:var(--font-display)] text-[length:var(--text-card)] font-medium leading-[1.1] tracking-[-0.03em] transition-all duration-500 ease-[var(--ease-out-expo)]",
                        open
                          ? "translate-x-1.5 text-[var(--color-ink)]"
                          : "text-[color-mix(in_srgb,var(--color-ink)_62%,transparent)] group-hover:text-[var(--color-ink)]",
                      )}
                    >
                      {service.title}
                    </span>

                    <Plus
                      className={cn(
                        "h-5 w-5 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)]",
                        open
                          ? "rotate-45 text-[var(--color-primary)]"
                          : "text-[var(--color-muted)]",
                      )}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-600 ease-[var(--ease-out-expo)]",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-8 pb-10 pl-1 md:grid-cols-[1fr_1fr] md:gap-14 md:pb-12 md:pl-[5.5rem]">
                      <div>
                        <p className="max-w-[46ch] text-[0.98rem] leading-[1.65] text-[color-mix(in_srgb,var(--color-ink)_72%,transparent)]">
                          {service.body}
                        </p>

                        <Link
                          href={`/services#${service.slug}`}
                          tabIndex={open ? 0 : -1}
                          className="group/link mt-6 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.8125rem] uppercase tracking-[0.14em] text-[var(--color-primary-deep)]"
                        >
                          <span className="relative">
                            Explore service
                            <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-[var(--color-primary-deep)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:origin-left group-hover/link:scale-x-100" />
                          </span>
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </Link>
                      </div>

                      <ul className="flex flex-col gap-2.5">
                        {service.deliverables.map((d) => (
                          <li
                            key={d}
                            className="flex items-start gap-3 text-[0.9rem] leading-[1.5] text-[color-mix(in_srgb,var(--color-ink)_60%,transparent)]"
                          >
                            <span
                              className="mt-[0.55em] h-px w-3 shrink-0 bg-[var(--color-primary)]"
                              aria-hidden="true"
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
