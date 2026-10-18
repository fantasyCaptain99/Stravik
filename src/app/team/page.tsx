import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/page-banner";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SplitClose } from "@/components/ui/split-close";
import { Portrait } from "@/components/team/portrait";
import { team, type TeamMember } from "@/data/team";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const focus: Record<string, string> = {
  "founder-ceo": "object-[center_8%]",
  coo: "object-[center_12%]",
  cto: "object-[center_10%]",
  cfo: "object-[center_28%]",
};

export const metadata: Metadata = pageMetadata({
  title: "Team",
  description: "The leadership team behind Stravik — a small senior group directly involved in the work.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Team", path: "/team" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Stravik leadership",
          itemListElement: team
            .filter((member) => member.name)
            .map((member, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Person",
                name: member.name,
                jobTitle: member.role,
                image: `${site.url}${member.photo}`,
                worksFor: { "@id": `${site.url}/#organization` },
              },
            })),
        }}
      />
      <PageBanner
        crumb="Team"
        title="The people who stay close to the work"
        lead="Stravik is led by a small senior group. The people you meet in the first conversation are the people who build the product."
      />

      <section className="bg-white py-20 text-[var(--color-ink)] lg:py-28">
        <div className="mx-5 sm:mx-8 lg:mx-[90px]">
          <div className="max-w-2xl">
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem]">
              Guiding the studio
            </h2>
          </div>
          <div className="mt-14 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible">
            {team.map((member, index) => (
              <div key={member.id} className={cn(index % 2 === 1 && "lg:pt-14")}>
                <TeamCard member={member} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SplitClose
        title="Want to work with this team?"
        body="You don't need a finished brief. Tell us what you're trying to build and we'll take it from there."
        cta={site.cta.primary}
        href="/contact"
        image="/images/hero/hero-3.webp"
      />
    </>
  );
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <article className="group relative aspect-[3/4] w-[78vw] max-w-[20rem] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-[var(--color-forest)] lg:w-auto lg:max-w-none">
      <Portrait member={member} caption={false} fill className={focus[member.id]} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,color-mix(in_srgb,var(--color-ink)_88%,transparent)_100%)]" />
      <span className="absolute top-4 left-4 font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-white/80">
        0{index + 1}
      </span>
      <span className="absolute top-4 right-4 rounded-full bg-[var(--color-ink)]/70 px-2.5 py-1 text-[11px] font-medium tracking-[0.16em] text-[var(--color-mint)] uppercase">
        {member.abbr}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-display)] text-2xl leading-[1.05] tracking-[-0.03em] text-balance text-white sm:text-3xl">
          {member.name}
        </h3>
        <p className="mt-2 text-sm text-white/75">{member.role}</p>
      </div>
    </article>
  );
}
