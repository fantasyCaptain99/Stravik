import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { PillButton } from "@/components/ui/pill-button";

export function HomeHero() {
  return (
    <section
      id="top"
      className="grid min-h-[calc(100svh-4rem)] grid-rows-[auto_minmax(16rem,1fr)] overflow-hidden bg-[var(--color-ink)] text-white lg:h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:grid-rows-1"
    >
      <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center sm:px-10 lg:px-12">
        <p className="mb-5 text-sm font-medium tracking-[0.22em] text-[var(--color-primary)] uppercase lg:mb-6 lg:text-base">
          Now taking new projects
        </p>
        <h1 className="max-w-2xl text-5xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]">
          Software your business can <span className="text-[var(--color-primary)]">rely on</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/72 lg:mt-7 lg:text-xl">
          We design and build websites, mobile apps and custom platforms for companies that need the work to hold up after launch — scoped in writing and delivered by a senior team.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <PillButton href="/contact" size="lg">{site.cta.primary}</PillButton>
          <Link
            href="/work"
            className="group inline-flex items-center gap-4 rounded-full border border-white/20 py-3 pr-3 pl-7 text-lg font-medium text-white transition-colors hover:border-white/45"
          >
            See our work
            <span className="flex size-12 items-center justify-center rounded-full border border-white/25 transition-colors group-hover:bg-white group-hover:text-[var(--color-ink)]">
              <ArrowUpRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>

      <figure className="relative min-h-0">
        <div
          aria-hidden="true"
          className="absolute inset-y-[6%] left-0 z-0 hidden w-24 rounded-l-[5rem] bg-[linear-gradient(180deg,var(--color-mint),var(--color-primary))] shadow-[0_0_36px_color-mix(in_srgb,var(--color-primary)_70%,transparent)] lg:block"
        />
        <div className="absolute inset-0 left-0 z-10 overflow-hidden lg:left-3 lg:rounded-l-[4.75rem]">
          <Image
            src="/images/hero/leaders.jpg"
            alt="Stravik leadership team working together"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover object-[center_40%]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-28 bg-linear-to-l from-[color-mix(in_srgb,var(--color-ink)_62%,transparent)] to-transparent lg:block"
          />
          <p className="pointer-events-none absolute top-8 right-5 hidden text-[11px] font-medium tracking-[0.24em] text-white/80 uppercase [writing-mode:vertical-rl] lg:block">
            {site.tagline}
          </p>
        </div>
      </figure>
    </section>
  );
}
