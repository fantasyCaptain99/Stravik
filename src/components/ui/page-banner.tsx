import Image from "next/image";
import Link from "next/link";

/** Inner-page hero: photograph, mint wash, column rules, breadcrumb, one headline. */
export function PageBanner({
  crumb,
  title,
  lead,
}: {
  crumb: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)] text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src="/images/hero/hero-1.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[color-mix(in_srgb,var(--color-ink)_80%,transparent)] via-[color-mix(in_srgb,var(--color-ink)_70%,transparent)] to-[var(--color-ink)]" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_80%_0%,color-mix(in_srgb,var(--color-primary)_22%,transparent),transparent_70%)]"
      />
      <div aria-hidden="true" className="diagonal-field absolute inset-0 -z-10 opacity-70" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 grid grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="border-r border-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] last:border-r-0"
          />
        ))}
      </div>

      <div className="shell pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
        <div className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-[var(--color-mint)]">
              Home
            </Link>
            <span aria-hidden="true" className="text-[color-mix(in_srgb,var(--color-primary)_60%,transparent)]">
              /
            </span>
            <span aria-current="page" className="text-[var(--color-mint)]">
              {crumb}
            </span>
          </nav>
          <h1 className="text-4xl leading-[1.1] font-normal text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {lead}
          </p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="h-px bg-linear-to-r from-transparent via-[color-mix(in_srgb,var(--color-primary)_60%,transparent)] to-transparent"
      />
    </section>
  );
}
