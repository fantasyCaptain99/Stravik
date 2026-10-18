"use client";

import { KineticHeading } from "@/components/animations/kinetic-heading";
import { Button } from "@/components/ui/button";
import { Brandmark } from "@/components/ui/brandmark";
import { site } from "@/data/site";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] py-28 text-[var(--color-ink)] md:py-40">
      {/* Layered depth: emblem ghosted into the field */}
      <div
        className="pointer-events-none absolute -right-[12%] top-1/2 -translate-y-1/2 opacity-[0.1] mix-blend-luminosity"
        aria-hidden="true"
      >
        <Brandmark
          size={620}
          decorative
          sizes="(min-width: 1024px) 620px, 70vw"
          className="h-auto w-[70vw] max-w-[620px]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #061511 1px, transparent 1px), linear-gradient(to bottom, #061511 1px, transparent 1px)",
          backgroundSize: "clamp(48px, 7vw, 96px) clamp(48px, 7vw, 96px)",
        }}
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-[var(--color-ink)]" />
          <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-micro)] uppercase tracking-[0.22em]">
            Start a conversation
          </span>
        </div>

        <KineticHeading
          as="h2"
          lines={["Your next big", "idea starts here."]}
          className="mt-10 max-w-[14ch] text-[length:var(--text-hero)] font-semibold leading-[0.92] tracking-[-0.045em]"
        />

        <p
          data-reveal="up"
          className="mt-8 max-w-[46ch] text-[length:var(--text-lead)] leading-[1.55] text-[color-mix(in_srgb,var(--color-ink)_72%,transparent)]"
        >
          Let&rsquo;s create something useful, beautiful, and built to last.
        </p>

        <div data-reveal="up" data-reveal-delay="0.1" className="mt-11">
          <Button
            href="/contact"
            variant="solid"
            className="!bg-[var(--color-ink)] !px-9 !py-5 !text-[var(--color-off-white)] hover:!bg-[var(--color-forest)]"
          >
            {site.cta.final}
          </Button>
        </div>
      </div>
    </section>
  );
}
