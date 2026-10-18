import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/ui/page-banner";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureCard } from "@/components/ui/feature-card";
import { SplitClose } from "@/components/ui/split-close";
import { PillButton } from "@/components/ui/pill-button";
import { values } from "@/data/pages";
import { transparency, closingBlock } from "@/data/homepage";
import { site } from "@/data/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Stravik is an independent digital product studio. We combine product thinking, design and engineering to build software that holds up over time.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageBanner
        crumb="About us"
        title="A software studio built to stay close to the work"
        lead="We design and engineer websites, mobile apps and custom platforms for teams who need the thing built properly — and handed over in a state someone else can continue."
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal="up" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card">
              <Image src="/images/hero/hero-3.webp" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div aria-hidden="true" className="absolute -right-4 -bottom-4 -z-10 h-2/3 w-2/3 rounded-card border border-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] sm:-right-6 sm:-bottom-6" />
          </div>
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem]">
              Built on a simple idea: most software fails for reasons that have nothing to do with code
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-[var(--color-muted)] sm:text-lg">
              <p>
                {site.name} works with founders and established teams who need software that solves the right problem and can still be maintained in two years. We stay small so senior people do the work rather than supervising it.
              </p>
              <p>
                That means fewer handoffs, direct access to whoever is building the product, and fewer projects than we could take. We are explicit that we are not the cheapest option. What we offer instead is work that does not need replacing in eighteen months.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-card border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] bg-[var(--color-ink)] p-6 text-white">
                <h3 className="text-mint-gradient mt-1 font-[family-name:var(--font-display)] text-xl">Our mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Build software that holds up — clear in purpose, careful in scope, and ready to be handed on.
                </p>
              </div>
              <div className="rounded-card border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] bg-[var(--color-ink)] p-6 text-white">
                <h3 className="text-mint-gradient mt-1 font-[family-name:var(--font-display)] text-xl">Our vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  A studio clients can return to because the last thing we built is still doing its job.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-ink)] py-20 text-white lg:py-28">
        <div className="shell">
          <div data-reveal="up" className="max-w-2xl">
            <Eyebrow light>What we stand for</Eyebrow>
            <h2 className="text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem]">
              The values behind every project
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((item) => (
              <FeatureCard key={item.title} tone="dark" {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-off-white)] py-20 lg:py-28">
        <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-4">
          <div data-reveal="up" className="relative aspect-[4/3] overflow-hidden rounded-card lg:aspect-square">
            <Image src="/images/hero/hero-4.webp" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
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
              <PillButton href="/contact">{transparency.link.label}</PillButton>
            </div>
          </div>
        </div>
      </section>

      <SplitClose
        title={closingBlock.heading}
        body={closingBlock.body}
        cta={closingBlock.cta}
        href="/contact"
        image="/images/hero/hero-2.webp"
      />
    </>
  );
}
