import { techGroups } from "@/data/technologies";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * Technology grid — restrained by design.
 *
 * Deliberately typographic rather than a wall of third-party logos: most
 * framework marks carry trademark usage restrictions, and a dense logo grid
 * reads as padding. Grouped by discipline so a technical reader can scan it.
 */
export function Technology() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] py-28 md:py-40">
      <div
        className="glow-emerald pointer-events-none absolute -right-1/4 top-0 h-[60vh] w-[60vh] opacity-20"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeader
            index="06"
            eyebrow="Technology"
            lead="We choose tools for the problem, not for the résumé. This is where our work is concentrated today."
          >
            <h2
              data-reveal="up"
              className="max-w-[12ch] text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-[-0.04em]"
            >
              The stack behind the work.
            </h2>
          </SectionHeader>

          <div data-stagger className="grid gap-px bg-[color-mix(in_srgb,var(--color-primary)_16%,transparent)] sm:grid-cols-2">
            {techGroups.map((g) => (
              <div
                key={g.label}
                data-stagger-item
                className="bg-[var(--color-ink)] p-7 md:p-9"
              >
                <h3 className="font-[family-name:var(--font-mono)] text-[0.8125rem] uppercase tracking-[0.16em] text-[var(--color-primary)]">
                  {g.label}
                </h3>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {g.items.map((t) => (
                    <li
                      key={t}
                      className="font-[family-name:var(--font-display)] text-[1.0625rem] tracking-[-0.015em] text-[color-mix(in_srgb,var(--color-off-white)_82%,transparent)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
