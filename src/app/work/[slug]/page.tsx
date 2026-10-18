import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { projects, projectBySlug, nextProject } from "@/data/projects";
import { ProjectVisual } from "@/components/portfolio/project-visual";
import { CtaBand } from "@/components/ui/cta-band";
import { KineticHeading } from "@/components/animations/kinetic-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

/** Pre-render every project at build time. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Project not found" };

  const label = project.kind === "concept" ? " (Concept)" : "";

  return pageMetadata({
    title: `${project.title}${label}`,
    description: project.excerpt,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const next = nextProject(project.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: `/work/${project.slug}` },
        ])}
      />

      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="page-top relative overflow-hidden bg-[var(--color-ink)] pb-16 text-white md:pb-20">
        <div className="grid-field absolute inset-0 opacity-40" aria-hidden="true" />

        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mb-9">
            <ol className="flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[length:var(--text-micro)] uppercase tracking-[0.13em] text-[var(--color-muted)]">
              <li>
                <Link href="/work" className="transition-colors hover:text-[var(--color-mint)]">
                  Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--color-off-white)]">{project.title}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            {project.kind === "concept" && (
              <span className="border border-[color-mix(in_srgb,var(--color-mint)_45%,transparent)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-mint)]">
                Concept
              </span>
            )}
            {project.categories.map((c) => (
              <span
                key={c}
                className="border border-[color-mix(in_srgb,var(--color-primary)_22%,transparent)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.1em] text-[var(--color-muted)]"
              >
                {c}
              </span>
            ))}
            <span className="index-label ml-auto">{project.year}</span>
          </div>

          <KineticHeading
            as="h1"
            immediate
            delay={0.15}
            lines={[project.title]}
            className="mt-7 text-[length:var(--text-hero)] font-semibold leading-[0.92] tracking-[-0.045em]"
          />

          <p
            data-reveal="up"
            data-reveal-delay="0.3"
            className="mt-6 max-w-[56ch] text-[length:var(--text-lead)] leading-[1.55] text-[var(--color-muted)]"
          >
            {project.discipline}
          </p>
        </div>
      </section>

      {/* ─── Hero visual ───────────────────────────────────────────────── */}
      <div className="shell">
        <div data-reveal="mask" className="aspect-[16/9] overflow-hidden">
          <ProjectVisual project={project} />
        </div>
      </div>

      {/* ─── Overview ──────────────────────────────────────────────────── */}
      <section className="relative bg-[var(--color-ink)] py-24 text-white md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <span className="eyebrow">Overview</span>
          </div>
          <p
            data-reveal="up"
            className="text-[length:var(--text-card)] font-[family-name:var(--font-display)] leading-[1.32] tracking-[-0.02em]"
          >
            {project.overview}
          </p>
        </div>
      </section>

      {/* ─── Challenge / Approach / Execution ──────────────────────────── */}
      <section className="relative bg-[var(--color-forest)] py-24 text-white md:py-32">
        <div className="shell flex flex-col gap-16 md:gap-20">
          {[
            { label: "The challenge", body: project.challenge, n: "01" },
            { label: "Our approach", body: project.approach, n: "02" },
            { label: "Design & development", body: project.execution, n: "03" },
          ].map((block) => (
            <div
              key={block.n}
              data-reveal="up"
              className="grid gap-6 border-t border-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] pt-9 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20"
            >
              <div className="flex items-start gap-4">
                <span className="index-label text-[var(--color-primary)]">
                  ({block.n})
                </span>
                <h2 className="font-[family-name:var(--font-mono)] text-[0.8125rem] uppercase tracking-[0.16em] text-[var(--color-primary)]">
                  {block.label}
                </h2>
              </div>
              <p className="max-w-[62ch] text-[length:var(--text-body)] leading-[1.7] text-[color-mix(in_srgb,var(--color-off-white)_78%,transparent)]">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Technologies + outcomes ───────────────────────────────────── */}
      <section className="relative bg-[var(--color-ink)] py-24 text-white md:py-32">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal="up">
            <h2 className="eyebrow">Technologies</h2>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {project.technologies.map((t) => (
                <li
                  key={t}
                  className="border border-[color-mix(in_srgb,var(--color-primary)_25%,transparent)] px-4 py-2 font-[family-name:var(--font-display)] text-[0.95rem] tracking-[-0.01em] text-[color-mix(in_srgb,var(--color-off-white)_82%,transparent)]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal="up" data-reveal-delay="0.08">
            <h2 className="eyebrow">Outcomes</h2>
            {project.outcomes.length > 0 ? (
              <dl className="mt-7 grid grid-cols-2 gap-8">
                {project.outcomes.map((o) => (
                  <div key={o.label}>
                    <dd className="font-[family-name:var(--font-display)] text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-[var(--color-mint)]">
                      {o.value}
                    </dd>
                    <dt className="mt-2 text-[0.875rem] text-[var(--color-muted)]">
                      {o.label}
                    </dt>
                  </div>
                ))}
              </dl>
            ) : (
              /* No invented metrics for concept work. */
              <p className="mt-7 max-w-[46ch] text-[0.95rem] leading-[1.65] text-[var(--color-muted)]">
                This is a concept piece, so there are no production metrics to
                report. We publish outcome figures only when a client has
                verified and approved them.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─── Next project ──────────────────────────────────────────────── */}
      <section className="relative border-t border-[color-mix(in_srgb,var(--color-primary)_16%,transparent)] bg-[var(--color-ink)] text-white">
        <Link href={`/work/${next.slug}`} className="group block">
          <div className="shell flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
            <div>
              <span className="index-label">Next project</span>
              <h2 className="mt-3 text-[length:var(--text-section)] font-semibold leading-[0.98] tracking-[-0.04em] transition-colors duration-300 group-hover:text-[var(--color-mint)]">
                {next.title}
              </h2>
              <p className="mt-2 text-[0.95rem] text-[var(--color-muted)]">
                {next.discipline}
              </p>
            </div>

            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] transition-colors duration-500 group-hover:bg-[var(--color-ink)]"
              aria-hidden="true"
            >
              <ArrowRight
                className="h-6 w-6 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:text-[var(--color-mint)]"
                strokeWidth={1.25}
              />
            </span>
          </div>
        </Link>
      </section>

      <CtaBand />
    </>
  );
}
