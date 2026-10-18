import type { Metadata } from "next";
import { site } from "@/data/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import "@/styles/prose.css";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Stravik collects, uses and stores information submitted through this website.",
  path: "/privacy",
});

/**
 * Privacy policy.
 *
 * IMPORTANT: this is a plain-language starting point describing what this
 * website actually does. It has NOT been reviewed by a lawyer. Items marked
 * "Requires confirmation" need the owner's input before launch, and the whole
 * document should be checked against the jurisdictions you operate in.
 */
export default function PrivacyPage() {
  const updated = new Date().toISOString().slice(0, 10);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }])} />
      <section className="page-top relative overflow-hidden bg-[var(--color-ink)] pb-16 text-white md:pb-20">
        <div className="grid-field absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="shell relative">
          <div className="flex items-center gap-4">
            <span className="index-label">(01)</span>
            <span className="h-px w-8 bg-[color-mix(in_srgb,var(--color-primary)_45%,transparent)]" />
            <span className="eyebrow">Legal</span>
          </div>

          <h1 className="mt-9 max-w-[16ch] text-[length:var(--text-display)] font-semibold leading-[0.94] tracking-[-0.042em]">
            Privacy Policy
          </h1>

          <p className="mt-6 font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.13em] text-[var(--color-muted)]">
            Last updated {updated}
          </p>
        </div>
      </section>

      <section className="relative bg-[var(--color-off-white)] py-20 text-[var(--color-ink)] md:py-28">
        <div className="shell">
          {/* Honest status banner — this document needs legal review. */}
          <div className="mx-auto mb-14 max-w-[68ch] border-l-2 border-[var(--color-primary-deep)] bg-[color-mix(in_srgb,var(--color-primary)_9%,transparent)] px-6 py-5">
            <p className="text-[0.92rem] leading-[1.65] text-[color-mix(in_srgb,var(--color-ink)_75%,transparent)]">
              <strong className="font-semibold">Note for the site owner —</strong>{" "}
              This policy describes what this website technically does. It has
              not been reviewed by a legal professional. Before launch, confirm
              the items marked <em>requires confirmation</em> and have the
              document checked against the laws of the jurisdictions you operate
              in.
            </p>
          </div>

          <div className="prose-stravik mx-auto max-w-[68ch]">
            <h2>Who we are</h2>
            <p>
              This website is operated by {site.name}. If you have questions
              about this policy or about information we hold, please use the{" "}
              <a href="/contact">contact form</a>.
            </p>
            <p>
              <em>
                Requires confirmation: registered company name, company number,
                registered address, and the name or role of the person
                responsible for data protection enquiries.
              </em>
            </p>

            <h2>Information we collect</h2>
            <p>
              We collect information in two circumstances: when you submit the
              contact form, and through basic analytics if it is enabled.
            </p>

            <h3>Information you give us</h3>
            <p>
              When you submit the contact form we collect the details you enter
              into it:
            </p>
            <ul>
              <li>Your name and email address, which are required.</li>
              <li>
                Your company name, the service you are interested in, your
                estimated budget and your timeline, all of which are optional.
              </li>
              <li>The description of your project that you write.</li>
            </ul>
            <p>
              We use these details only to reply to your enquiry and to discuss
              potential work with you. We do not sell them, and we do not add
              you to a marketing list without asking.
            </p>

            <h3>Information collected automatically</h3>
            <p>
              If analytics is enabled on this site, aggregate information about
              visits is recorded — pages viewed, approximate region, referring
              site, and device type. This is used to understand which content is
              useful.
            </p>
            <p>
              <em>
                Requires confirmation: whether analytics is enabled, which
                provider is used, and whether it sets cookies. If a
                cookie-setting provider is used, a cookie banner is likely to be
                required in some jurisdictions.
              </em>
            </p>

            <h2>Spam protection</h2>
            <p>
              The contact form may use Cloudflare Turnstile to distinguish
              genuine submissions from automated ones. When active, Turnstile
              receives technical information from your browser in order to
              perform that check. Cloudflare processes this under its own
              privacy terms.
            </p>

            <h2>How your information is handled</h2>
            <p>
              Contact form submissions are delivered to us by email through
              Resend, an email delivery provider. The message passes through
              their systems in order to reach our inbox.
            </p>
            <p>
              This website does not operate a customer database. There is no
              account system, and submissions are not stored in a database by
              this site — they exist as email in our inbox.
            </p>

            <h2>How long we keep it</h2>
            <p>
              Enquiry emails are kept for as long as is useful for the business
              relationship, and are deleted when they are no longer needed.
            </p>
            <p>
              <em>
                Requires confirmation: a specific retention period, if your
                jurisdiction requires one to be stated.
              </em>
            </p>

            <h2>Your rights</h2>
            <p>
              Depending on where you live, you may have the right to request a
              copy of the information we hold about you, to ask us to correct
              it, or to ask us to delete it. To make such a request, contact us
              through the <a href="/contact">contact form</a>.
            </p>
            <p>
              <em>
                Requires confirmation: the specific framework that applies to
                you — for example UK GDPR, EU GDPR, or CCPA — and the
                corresponding rights language and response timeframes.
              </em>
            </p>

            <h2>Third parties</h2>
            <p>
              The following services may process information on our behalf:
            </p>
            <ul>
              <li>
                <strong>Resend</strong> — delivers contact form submissions to
                our inbox.
              </li>
              <li>
                <strong>Cloudflare Turnstile</strong> — spam protection on the
                contact form, when enabled.
              </li>
              <li>
                <strong>Vercel</strong> — hosts this website and may log
                requests as part of normal operation.
              </li>
            </ul>

            <h2>Changes to this policy</h2>
            <p>
              If this policy changes, the updated version will be published on
              this page with a revised date at the top.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy can be sent through the{" "}
              <a href="/contact">contact form</a>.
              {site.email ? ` You can also email ${site.email}.` : ""}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
