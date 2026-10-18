import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/ui/page-banner";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureCard } from "@/components/ui/feature-card";
import { FaqList } from "@/components/ui/faq-list";
import { SplitClose } from "@/components/ui/split-close";
import { PillButton } from "@/components/ui/pill-button";
import { benefits, comparison, faqs } from "@/data/pages";
import { steps } from "@/data/homepage";
import { site } from "@/data/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { MessageSquare, ClipboardList, Rocket } from "lucide-react";

const ICONS = [MessageSquare, ClipboardList, Rocket];

export const metadata: Metadata = pageMetadata({
  title: "Features",
  description:
    "How a Stravik engagement works: written scope, senior delivery, fixed-fee phases and a handover you can actually use.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Features", path: "/features" }])} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageBanner
        crumb="Features"
        title="Everything a serious build needs, without the theatre"
        lead="A Stravik engagement is designed to be clear, senior and easy to continue after we leave. Here is what that looks like in practice."
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="shell">
          <div className="max-w-2xl">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem]">
              Built around the product, not a process deck
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-[var(--color-off-white)] py-20 lg:py-28">
        <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
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
                      <h3 className="text-lg">{step.title}</h3>
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
            <Image src="/images/hero/hero-2.webp" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-ink)] py-20 text-white lg:py-28">
        <div className="shell">
          <div data-reveal="up" className="max-w-2xl">
            <Eyebrow light>Compare engagements</Eyebrow>
            <h2 className="text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem]">
              Three ways to work. Pick the one that fits.
            </h2>
          </div>

          <div data-reveal="up" className="mt-14 hidden overflow-hidden rounded-card border border-[color-mix(in_srgb,var(--color-primary)_25%,transparent)] md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Three ways to work with Stravik</caption>
              <thead>
                <tr className="bg-[var(--color-forest)]">
                  <th scope="col" className="w-1/4 px-6 py-5"><span className="sr-only">Detail</span></th>
                  {comparison.columns.map((col) => (
                    <th key={col} scope="col" className="text-mint-gradient px-6 py-5 font-[family-name:var(--font-display)] text-xl font-medium">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.label} className="border-t border-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-forest)_60%,transparent)]">
                    <th scope="row" className="px-6 py-5 text-sm font-medium tracking-wide text-[var(--color-mint)] uppercase">{row.label}</th>
                    {row.cells.map((cell) => (
                      <td key={cell} className="px-6 py-5 text-white/80">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid gap-5 md:hidden">
            {comparison.columns.map((col, i) => (
              <div key={col} className="rounded-card border border-[color-mix(in_srgb,var(--color-primary)_25%,transparent)] bg-[var(--color-forest)] p-6">
                <h3 className="text-mint-gradient font-[family-name:var(--font-display)] text-2xl">{col}</h3>
                <dl className="mt-4 divide-y divide-[color-mix(in_srgb,var(--color-primary)_15%,transparent)]">
                  {comparison.rows.map((row) => (
                    <div key={row.label} className="flex justify-between gap-6 py-3">
                      <dt className="text-sm text-[var(--color-mint)]">{row.label}</dt>
                      <dd className="text-right text-sm text-white/80">{row.cells[i]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div data-reveal="up">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="max-w-sm text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem]">
              Questions clients often ask
            </h2>
          </div>
          <div data-reveal="up">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <SplitClose
        title="Start with a conversation"
        body="Tell us what you're building. We'll help you see the next step, including whether we're the right studio for it."
        cta={site.cta.primary}
        href="/contact"
      />
    </>
  );
}
