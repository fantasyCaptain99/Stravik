import { SectionHeader } from "@/components/ui/section-header";

const PILLARS = [
  {
    n: "01",
    title: "Product-focused thinking",
    body: "We start with the outcome you need, not the feature list you arrived with. Often the most valuable part of a project is the scope we talk you out of.",
  },
  {
    n: "02",
    title: "Design-driven engineering",
    body: "Design and development are not sequential here. The people building it are in the room when it is drawn, which is why the built result matches the intent.",
  },
  {
    n: "03",
    title: "Transparent collaboration",
    body: "You see progress continuously, not at milestone reveals. Direct access to the people doing the work, honest estimates, and bad news delivered early.",
  },
  {
    n: "04",
    title: "Built for future growth",
    body: "Architecture decisions are made against where the product is going, not only where it is today. Handover documentation is part of the deliverable, not an afterthought.",
  },
];

export function WhyStravik() {
  return (
    <section className="relative bg-[var(--color-forest)] py-28 md:py-40">
      <div className="shell">
        <SectionHeader index="04" eyebrow="Why Stravik">
          <h2
            data-reveal="up"
            className="max-w-[16ch] text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-[-0.04em]"
          >
            Different thinking.{" "}
            <span className="text-[var(--color-mint)]">Better digital products.</span>
          </h2>
        </SectionHeader>

        <div data-stagger className="mt-16 md:mt-24">
          {PILLARS.map((p, i) => (
            <div
              key={p.n}
              data-stagger-item
              className="group grid gap-5 border-t border-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] py-9 md:grid-cols-[auto_1fr_1.4fr] md:gap-12 md:py-12"
            >
              <span className="index-label text-[var(--color-primary)] md:w-16">
                ({p.n})
              </span>

              <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-card)] font-medium leading-[1.1] tracking-[-0.03em] transition-transform duration-500 ease-[var(--ease-out-expo)] md:group-hover:translate-x-2">
                {p.title}
              </h3>

              <p className="max-w-[52ch] text-[0.98rem] leading-[1.65] text-[var(--color-muted)]">
                {p.body}
              </p>
            </div>
          ))}
          <div className="border-t border-[color-mix(in_srgb,var(--color-primary)_18%,transparent)]" />
        </div>
      </div>
    </section>
  );
}
