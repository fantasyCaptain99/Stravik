import type { Metadata } from "next";
import { HomeHero } from "@/components/home/home-hero";
import { ProcessSplit } from "@/components/home/process-split";
import { EngagementTabs } from "@/components/home/engagement-tabs";
import { Coverflow } from "@/components/home/coverflow";
import { site } from "@/data/site";
import { closingBlock } from "@/data/homepage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProcessSplit />
      <EngagementTabs />
      <Coverflow
        kicker={["Our team turns ideas", "into software that", "changes what comes next"]}
        close={{
          title: closingBlock.heading,
          body: closingBlock.body,
          cta: closingBlock.cta,
          href: "/contact",
        }}
      />
    </>
  );
}
