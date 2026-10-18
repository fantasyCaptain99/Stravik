import Link from "next/link";
import { navigation, footerQuick } from "@/data/navigation";
import { site, activeSocials } from "@/data/site";
import { Brandmark } from "@/components/ui/brandmark";
import { PillButton } from "@/components/ui/pill-button";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-[var(--color-ink)] text-white">
      <div className="shell pt-20 pb-10 lg:pt-28">
        <div className="max-w-3xl">
          <h2 className="text-4xl leading-[1.1] font-medium sm:text-5xl">
            Ready to see what comes next?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Tell us about the project and we&rsquo;ll walk you through how we&rsquo;d approach it, what it would take and what it would cost.
          </p>
          <div className="mt-8">
            <PillButton href="/contact">
              {site.cta.primary}
            </PillButton>
          </div>
        </div>

        <div className="mt-16 grid gap-12 border-t border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-medium tracking-wide text-[var(--color-mint)] uppercase">About us</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{site.positioning}</p>
          </div>

          <nav aria-label="Footer">
            <p className="text-sm font-medium tracking-wide text-[var(--color-mint)] uppercase">Explore</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/75 transition-colors hover:text-[var(--color-mint)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Quick links">
            <p className="text-sm font-medium tracking-wide text-[var(--color-mint)] uppercase">Quick links</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerQuick.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/75 transition-colors hover:text-[var(--color-mint)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-medium tracking-wide text-[var(--color-mint)] uppercase">Contact</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/75">
              {site.email ? (
                <li>
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-[var(--color-mint)]">
                    {site.email}
                  </a>
                </li>
              ) : (
                <li>
                  <Link href="/contact" className="transition-colors hover:text-[var(--color-mint)]">
                    Contact form
                  </Link>
                </li>
              )}
              {site.phone && (
                <li>
                  <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="transition-colors hover:text-[var(--color-mint)]">
                    {site.phone}
                  </a>
                </li>
              )}
              {activeSocials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--color-mint)]">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-primary)_42%,transparent),transparent_68%)] blur-2xl sm:size-96"
            />
            <Brandmark size={220} decorative sizes="220px" className="relative" />
          </div>
          <p
            aria-hidden="true"
            className="text-mint-gradient pointer-events-none mt-2 text-center font-[family-name:var(--font-display)] text-6xl leading-none font-black tracking-tight select-none sm:text-7xl lg:text-8xl"
          >
            {site.wordmark}
          </p>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] pt-6 text-sm text-white/55 sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <Link href="/privacy" className="transition-colors hover:text-[var(--color-mint)]">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
