import { team } from "@/data/team";
import { Portrait } from "@/components/team/portrait";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";

/**
 * Leadership preview.
 *
 * Shows the four leadership roles. Names and biographies render only when
 * the owner has supplied them in /src/data/team.ts — nothing is invented.
 */
export function Leadership() {
  return (
    <section className="relative bg-[var(--color-forest)] py-28 md:py-40">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            index="07"
            eyebrow="Leadership"
            lead="A small senior team, directly involved in the work. The people you meet are the people who build it."
          >
            <h2
              data-reveal="up"
              className="max-w-[14ch] text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-[-0.04em]"
            >
              The minds behind Stravik.
            </h2>
          </SectionHeader>

          <div className="hidden shrink-0 lg:block">
            <Button href="/team" variant="outline">
              Meet the team
            </Button>
          </div>
        </div>

        <div
          data-stagger
          className="mt-16 grid grid-cols-2 gap-5 md:gap-7 lg:grid-cols-4"
        >
          {team.map((m) => (
            <div key={m.id} data-stagger-item className="group">
              <Portrait member={m} />
              <div className="mt-4">
                {m.name ? (
                  <h3 className="font-[family-name:var(--font-display)] text-[1.125rem] font-medium leading-tight tracking-[-0.02em]">
                    {m.name}
                  </h3>
                ) : null}
                <p className="font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.13em] text-[var(--color-primary)]">
                  {m.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 lg:hidden">
          <Button href="/team" variant="outline">
            Meet the team
          </Button>
        </div>
      </div>
    </section>
  );
}
