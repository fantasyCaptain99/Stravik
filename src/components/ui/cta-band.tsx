import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

/** Reusable closing CTA for internal pages. */
export function CtaBand({
  heading = "Let's build something together.",
  body = "Tell us what you're working on. We'll tell you honestly whether we're the right fit.",
  label,
}: {
  heading?: string;
  body?: string;
  label?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--color-primary)_16%,transparent)] bg-[var(--color-forest)] py-24 md:py-32">
      <div
        className="glow-emerald pointer-events-none absolute left-1/2 top-full h-[60vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 opacity-25"
        aria-hidden="true"
      />

      <div className="shell relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <div>
          <h2
            data-reveal="up"
            className="max-w-[16ch] text-[length:var(--text-section)] font-semibold leading-[0.98] tracking-[-0.04em]"
          >
            {heading}
          </h2>
          <p
            data-reveal="up"
            data-reveal-delay="0.08"
            className="mt-5 max-w-[48ch] text-[0.98rem] leading-[1.65] text-[var(--color-muted)]"
          >
            {body}
          </p>
        </div>

        <div data-reveal="up" data-reveal-delay="0.16" className="shrink-0">
          <Button href="/contact" variant="solid">
            {label ?? site.cta.primary}
          </Button>
        </div>
      </div>
    </section>
  );
}
