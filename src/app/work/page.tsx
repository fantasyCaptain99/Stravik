import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageBanner } from "@/components/ui/page-banner";
import { projects, conceptsOnly } from "@/data/projects";
import { heroImages } from "@/data/hero-images";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected digital product work from Stravik — SaaS platforms, mobile applications, AI-assisted systems and editorial web experiences.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])} />
      <PageBanner
        crumb="Work"
        title="Selected work, thoughtfully made"
        lead="A look at how we approach product problems — the constraints we design around and the decisions behind the result."
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="shell">
          {conceptsOnly && (
            <p className="mb-12 max-w-3xl border-l-2 border-[var(--color-primary)] pl-5 text-[var(--color-muted)]">
              The projects below are concept pieces created in-house to show how we think. They are not client engagements, and no outcomes are claimed for them.
            </p>
          )}
          <div className="grid gap-8 sm:grid-cols-2">
            {projects.map((project, i) => {
              const image = heroImages[i % heroImages.length]!;
              return (
                <Link key={project.slug} href={`/work/${project.slug}`} className="group">
                  <article>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-card">
                      <Image src={image.src} alt="" fill sizes="(min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    </div>
                    <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl transition-colors group-hover:text-[var(--color-primary-deep)]">
                      {project.title}
                    </h2>
                    <p className="mt-1 text-[var(--color-muted)]">{project.discipline}</p>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
