import Image from "next/image";
import { PillButton } from "./pill-button";

/** Closing two-column band used at the bottom of most pages. */
export function SplitClose({
  title,
  body,
  cta,
  href,
  image = "/images/hero/hero-4.webp",
}: {
  title: string;
  body: string;
  cta: string;
  href: string;
  image?: string;
}) {
  return (
    <section className="bg-[var(--color-soft-mint)] py-20 lg:py-24">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div data-reveal="up" className="max-w-lg">
          <h2 className="text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          <p className="mt-6 leading-relaxed text-[var(--color-muted)] sm:text-lg">{body}</p>
          <div className="mt-8">
            <PillButton href={href}>{cta}</PillButton>
          </div>
        </div>
        <div
          data-reveal="up"
          className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] lg:aspect-[9/10]"
        >
          <Image src={image} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
