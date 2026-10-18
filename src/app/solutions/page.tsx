import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/page-banner";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureCard } from "@/components/ui/feature-card";
import { CapabilityTabs } from "@/components/home/capability-tabs";
import { Coverflow } from "@/components/home/coverflow";
import { SplitClose } from "@/components/ui/split-close";
import { industries, delivery } from "@/data/pages";
import { site } from "@/data/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description:
    "Websites, mobile apps, custom software, product design and cloud support — shaped around how a business actually works.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }])} />
      <PageBanner
        crumb="Solutions"
        title="Software that moves a business forward"
        lead="From a first website to a platform the company runs on, we design, build and support software around the work it has to do."
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="shell">
          <div className="max-w-2xl">
            <Eyebrow>Industries we serve</Eyebrow>
            <h2 className="text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem]">
              Solutions shaped around how each business works
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <CapabilityTabs heading="What our studio builds" cta={site.cta.primary} href="/contact" />

      <section className="bg-[var(--color-off-white)] py-20 lg:py-28">
        <div className="shell">
          <div data-reveal="up" className="max-w-2xl">
            <Eyebrow>How we deliver</Eyebrow>
            <h2 className="text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem]">
              A clear process from idea to launch
            </h2>
          </div>
          <div className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span
              aria-hidden="true"
              className="absolute top-6 right-0 left-0 hidden h-px bg-linear-to-r from-transparent via-[color-mix(in_srgb,var(--color-primary)_60%,transparent)] to-transparent lg:block"
            />
            {delivery.map((step) => (
              <div key={step.n} data-reveal="up" className="relative">
                <span className="relative flex size-12 items-center justify-center rounded-full bg-[var(--color-ink)] font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-mint)] ring-4 ring-[var(--color-off-white)]">
                  {step.n}
                </span>
                <h3 className="mt-6 text-xl">{step.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-[var(--color-muted)]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Coverflow kicker={["Our team turns ideas", "into software that", "changes what comes next"]} />

      <SplitClose
        title="Have something that needs building?"
        body="Tell us about the product. We'll walk through how we'd approach it, what it would take and what it would cost."
        cta={site.cta.primary}
        href="/contact"
      />
    </>
  );
}
