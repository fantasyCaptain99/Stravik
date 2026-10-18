import Image from "next/image";
import { MessageSquare, ClipboardList, Rocket } from "lucide-react";
import { steps, transparency } from "@/data/homepage";
import { site } from "@/data/site";
import { PillButton } from "@/components/ui/pill-button";

const ICONS = [MessageSquare, ClipboardList, Rocket];

export function ProcessSplit() {
  return (
    <section id="process" className="bg-[var(--color-off-white)] py-20 lg:py-28">
      <div className="shell flex flex-col gap-20 lg:gap-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div data-reveal="up" className="order-2 lg:order-1">
            <h2 className="max-w-lg text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem]">
              Getting started is simple
            </h2>
            <ul className="mt-10 space-y-8">
              {steps.map((step, i) => {
                const Icon = ICONS[i] ?? MessageSquare;
                return (
                  <li key={step.n} className="flex gap-5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-mint)]">
                      <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg">{step.title}</h3>
                      <p className="mt-2 max-w-md leading-relaxed text-[var(--color-muted)]">{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-10">
              <PillButton href="/contact">{site.cta.primary}</PillButton>
            </div>
          </div>
          <div data-reveal="up" className="relative order-1 aspect-[4/3] overflow-hidden rounded-card lg:order-2 lg:aspect-[5/4]">
            <Image src="/images/hero/hero-3.webp" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-4">
          <div data-reveal="up" className="relative aspect-[4/3] overflow-hidden rounded-card lg:aspect-square">
            <Image src="/images/hero/hero-1.webp" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div data-reveal="up" className="lg:pl-8">
            <h2 className="max-w-lg text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem]">
              {transparency.heading}
            </h2>
            <hr className="my-8 border-[color-mix(in_srgb,var(--color-primary)_50%,transparent)]" />
            <p className="leading-relaxed">{transparency.intro}</p>
            <ul className="mt-6 list-disc space-y-1.5 pl-5 marker:text-[var(--color-primary)]">
              {transparency.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="mt-8">
              <PillButton href={transparency.link.href}>{transparency.link.label}</PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
