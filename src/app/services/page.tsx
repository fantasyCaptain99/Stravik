import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { CtaBand } from "@/components/ui/cta-band";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { ServiceNav } from "@/components/services/service-nav";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Web development, mobile applications, AI and automation, custom SaaS, product design, and cloud support — delivered by a senior team.",
  path: "/solutions",
  index: false,
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="Services"
        lines={["From ambitious ideas", "to extraordinary", "digital products."]}
        lead="Six capabilities, one team. Most projects draw on several — we scope them together rather than selling them separately."
      />

      <ServiceNav services={services} />

      {/* ─── Service detail sections ───────────────────────────────────── */}
      {services.map((service, i) => {
        const light = i % 2 === 0;

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={cn(
              "relative scroll-mt-24 py-24 md:py-36",
              light
                ? "bg-[var(--color-off-white)] text-[var(--color-ink)]"
                : "bg-[var(--color-forest)] text-[var(--color-off-white)]",
            )}
          >
            <div className="shell">
              <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                {/* Left: number + title */}
                <div>
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "font-[family-name:var(--font-mono)] text-[0.8125rem] tabular-nums",
                        light
                          ? "text-[var(--color-primary-deep)]"
                          : "text-[var(--color-primary)]",
                      )}
                    >
                      ({service.index})
                    </span>
                    <span
                      className={cn(
                        "h-px w-8",
                        light
                          ? "bg-[var(--color-rule)]"
                          : "bg-[color-mix(in_srgb,var(--color-primary)_45%,transparent)]",
                      )}
                    />
                  </div>

                  <h2
                    data-reveal="up"
                    className="mt-7 max-w-[12ch] text-[length:var(--text-section)] font-semibold leading-[0.98] tracking-[-0.04em]"
                  >
                    {service.title}
                  </h2>

                  <p
                    data-reveal="up"
                    data-reveal-delay="0.06"
                    className={cn(
                      "mt-6 max-w-[42ch] text-[length:var(--text-body)] leading-[1.7]",
                      light
                        ? "text-[color-mix(in_srgb,var(--color-ink)_70%,transparent)]"
                        : "text-[var(--color-muted)]",
                    )}
                  >
                    {service.body}
                  </p>

                  <div data-reveal="up" data-reveal-delay="0.12" className="mt-9">
                    <Button
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      variant={light ? "solid" : "outline"}
                      className={
                        light ? "!bg-[var(--color-ink)] !text-[var(--color-off-white)] hover:!bg-[var(--color-forest)]" : undefined
                      }
                    >
                      Discuss this
                    </Button>
                  </div>
                </div>

                {/* Right: outcomes + deliverables */}
                <div className="grid gap-10 sm:grid-cols-2">
                  <div data-reveal="up">
                    <h3
                      className={cn(
                        "font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.16em]",
                        light
                          ? "text-[var(--color-primary-deep)]"
                          : "text-[var(--color-primary)]",
                      )}
                    >
                      What you get
                    </h3>
                    <ul className="mt-5 flex flex-col gap-3.5">
                      {service.outcomes.map((o) => (
                        <li
                          key={o}
                          className={cn(
                            "flex items-start gap-3 text-[0.95rem] leading-[1.55]",
                            light
                              ? "text-[color-mix(in_srgb,var(--color-ink)_68%,transparent)]"
                              : "text-[color-mix(in_srgb,var(--color-off-white)_76%,transparent)]",
                          )}
                        >
                          <span
                            className="mt-[0.6em] h-px w-3 shrink-0 bg-[var(--color-primary)]"
                            aria-hidden="true"
                          />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div data-reveal="up" data-reveal-delay="0.08">
                    <h3
                      className={cn(
                        "font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.16em]",
                        light ? "text-[var(--color-muted)]" : "text-[var(--color-muted)]",
                      )}
                    >
                      Deliverables
                    </h3>
                    <ul className="mt-5 flex flex-col gap-3.5">
                      {service.deliverables.map((d) => (
                        <li
                          key={d}
                          className={cn(
                            "text-[0.95rem] leading-[1.55]",
                            light
                              ? "text-[color-mix(in_srgb,var(--color-ink)_58%,transparent)]"
                              : "text-[var(--color-muted)]",
                          )}
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand
        heading="Not sure which of these you need?"
        body="That's a normal place to start. Describe the problem and we'll help you work out the shape of the solution."
        label="Start the conversation"
      />
    </>
  );
}
