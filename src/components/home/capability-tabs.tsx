"use client";

import { useState } from "react";
import Image from "next/image";
import { heroImages } from "@/data/hero-images";
import { services } from "@/data/services";
import { PillButton } from "@/components/ui/pill-button";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = {
  "web-development": "Web development",
  "mobile-apps": "Mobile apps",
  "custom-saas": "Custom software",
  "uiux-design": "UI and UX design",
  "cloud-support": "Cloud and maintenance",
};

const shown = services.filter((s) => s.slug in labels);

export function CapabilityTabs({
  heading,
  cta,
  href,
}: {
  heading: string;
  cta: string;
  href: string;
}) {
  const [active, setActive] = useState(0);
  const current = shown[active]!;
  const image = heroImages[active % heroImages.length]!;

  return (
    <section id="capabilities" className="bg-[var(--color-ink)] pb-20 text-white lg:pb-28">
      <div className="shell">
        <div className="border-t border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] pt-16 lg:pt-20">
          <div data-reveal="up" className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-md text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem]">
              {heading}
            </h2>
            <PillButton href={href}>
              {cta}
            </PillButton>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-4">
            <div data-reveal="up" className="order-2 lg:order-1 lg:pr-4">
              <div role="tabpanel" id="cap-panel" aria-labelledby={`cap-tab-${active}`}>
                <div className="relative aspect-[7/5] overflow-hidden rounded-card">
                  <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </div>
                <p className="mt-10 max-w-lg leading-relaxed text-white/90">{current.body}</p>
              </div>
            </div>
            <div data-reveal="up" className="order-1 lg:order-2">
              <div role="tablist" aria-label="Capabilities" aria-orientation="vertical" className="border-t border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]">
                {shown.map((service, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={service.slug}
                      id={`cap-tab-${i}`}
                      role="tab"
                      type="button"
                      aria-selected={on}
                      aria-controls="cap-panel"
                      onClick={() => setActive(i)}
                      className="relative flex w-full items-center justify-between gap-6 border-b border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] px-5 py-5 text-left font-[family-name:var(--font-display)]"
                    >
                      {on && (
                        <span className="absolute inset-0 border-l-2 border-[var(--color-primary)] bg-[var(--color-forest)]" />
                      )}
                      <span className="relative">{labels[service.slug]}</span>
                      <span className="relative tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
