import { KineticHeading } from "@/components/animations/kinetic-heading";

/**
 * Shared editorial hero for internal pages.
 *
 * Deliberately NOT the homepage hero: shorter, no emblem composition, no
 * full-viewport height. Internal pages should get to their content quickly
 * while still carrying the brand's typographic weight.
 */
export function PageHero({
  index,
  eyebrow,
  lines,
  lead,
}: {
  index: string;
  eyebrow: string;
  lines: string[];
  lead?: string;
}) {
  return (
    <section className="page-top relative overflow-hidden bg-[var(--color-ink)] pb-20 md:pb-28">
      <div className="grid-field absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="glow-emerald pointer-events-none absolute -right-[20%] -top-[30%] h-[70vh] w-[70vh] opacity-30"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="flex items-center gap-4">
          <span className="index-label">({index})</span>
          <span className="h-px w-8 bg-[color-mix(in_srgb,var(--color-primary)_45%,transparent)]" />
          <span className="eyebrow">{eyebrow}</span>
        </div>

        <KineticHeading
          as="h1"
          immediate
          delay={0.15}
          lines={lines}
          className="mt-9 max-w-[18ch] text-[length:var(--text-display)] font-semibold leading-[0.94] tracking-[-0.042em]"
        />

        {lead && (
          <p
            data-reveal="up"
            data-reveal-delay="0.35"
            className="mt-8 max-w-[58ch] text-[length:var(--text-lead)] leading-[1.55] text-[var(--color-muted)]"
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
