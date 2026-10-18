import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, Clock } from "lucide-react";
import { PageBanner } from "@/components/ui/page-banner";
import { ContactForm } from "@/components/forms/contact-form";
import { site, activeSocials } from "@/data/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Tell us what you're building. Start a conversation with Stravik about your next digital product.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])}
      />
      <PageBanner
        crumb="Contact us"
        title="Let's talk about what comes next"
        lead="Whether you have a brief or just a problem, we'll get back to you and tell you honestly how we'd approach it."
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="shell grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          <div className="rounded-card border border-[var(--color-rule)] bg-[var(--color-off-white)] p-6 sm:p-10">
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl">Send us a message</h2>
            <p className="mt-2 mb-8 text-[var(--color-muted)]">
              Tell us a little about the project and how you'd like to work.
            </p>
            <Suspense fallback={<p className="text-[var(--color-muted)]">Loading form…</p>}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="relative isolate flex flex-col overflow-hidden rounded-card bg-[var(--color-ink)] p-8 text-white sm:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_100%_100%,color-mix(in_srgb,var(--color-primary)_20%,transparent),transparent_70%)]"
            />
            <h2 className="text-mint-gradient font-[family-name:var(--font-display)] text-2xl sm:text-3xl">
              Other ways to reach us
            </h2>
            <ul className="mt-8 space-y-7">
              <li className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] text-[var(--color-mint)]">
                  <Mail className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium tracking-wide text-[var(--color-mint)] uppercase">Email</p>
                  {site.email ? (
                    <a href={`mailto:${site.email}`} className="mt-1 inline-block text-white/85 transition-colors hover:text-[var(--color-mint)]">
                      {site.email}
                    </a>
                  ) : (
                    <p className="mt-1 text-white/85">Use the form — we read every message.</p>
                  )}
                </div>
              </li>
              {site.phone && (
                <li className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] text-[var(--color-mint)]">
                    <Phone className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium tracking-wide text-[var(--color-mint)] uppercase">Phone</p>
                    <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="mt-1 inline-block text-white/85 hover:text-[var(--color-mint)]">
                      {site.phone}
                    </a>
                  </div>
                </li>
              )}
              <li className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] text-[var(--color-mint)]">
                  <Clock className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium tracking-wide text-[var(--color-mint)] uppercase">Reply time</p>
                  <p className="mt-1 text-white/85">We aim to reply within two working days.</p>
                </div>
              </li>
            </ul>
            {activeSocials.length > 0 && (
              <div className="mt-12 border-t border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] pt-8 lg:mt-auto">
                <p className="text-sm text-white/60">Follow us</p>
                <ul className="mt-4 flex gap-3">
                  {activeSocials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 items-center rounded-full border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] px-4 text-sm text-[var(--color-mint)] transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-ink)]"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
