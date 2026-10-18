"use client";

import { useState } from "react";
import Image from "next/image";
import { heroImages } from "@/data/hero-images";
import { engagements } from "@/data/homepage";
import { site } from "@/data/site";
import { PillButton } from "@/components/ui/pill-button";
import { cn } from "@/lib/utils";

export function EngagementTabs() {
  const [active, setActive] = useState(0);
  const current = engagements[active]!;
  const image = heroImages[active % heroImages.length]!;

  return (
    <section id="services" className="bg-[var(--color-forest)] py-20 text-white lg:py-28">
      <div className="shell">
        <div data-reveal="up" className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-4 text-sm font-medium tracking-wide text-[var(--color-mint)] uppercase">
              Ways to work with {site.name}
            </p>
            <h2 className="max-w-xl text-3xl leading-[1.15] text-balance text-white sm:text-4xl lg:text-[2.75rem]">
              Senior delivery for the stage you are in
            </h2>
          </div>
          <div className="flex flex-col gap-6 lg:items-end lg:text-right">
            <p className="max-w-md text-white/75">
              We design, build and support the software companies run on — websites, applications, AI-assisted tools and custom platforms. Start with a new product, add senior people to your team, or bring a live system back under control. Every engagement begins with a written scope.
            </p>
            <PillButton href="/contact">{site.cta.primary}</PillButton>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div data-reveal="up">
            <div role="tablist" aria-label="Engagements" className="flex flex-col border-t border-[color-mix(in_srgb,var(--color-primary)_28%,transparent)]">
              {engagements.map((item, i) => {
                const on = i === active;
                return (
                  <button
                    key={item.label}
                    id={`engage-tab-${i}`}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls="engage-panel"
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex items-center justify-between border-b border-[color-mix(in_srgb,var(--color-primary)_28%,transparent)] py-6 text-left font-[family-name:var(--font-display)] text-2xl transition-colors sm:text-3xl",
                      on ? "text-white" : "text-white/45 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span className={cn("font-sans text-sm tabular-nums", on ? "text-[var(--color-mint)]" : "text-white/40")}>
                      {item.index}
                    </span>
                  </button>
                );
              })}
            </div>
            <div id="engage-panel" role="tabpanel" aria-labelledby={`engage-tab-${active}`} className="mt-8 min-h-28">
              <p className="max-w-lg leading-relaxed text-white/75">{current.body}</p>
              <ul className="mt-5 list-disc space-y-1.5 pl-5 marker:text-[var(--color-mint)]">
                {current.bullets.map((b) => (
                  <li key={b} className="text-white">{b}</li>
                ))}
              </ul>
            </div>
          </div>
          <div data-reveal="up" className="relative aspect-[4/3] overflow-hidden rounded-card bg-[var(--color-off-white)]">
            <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
