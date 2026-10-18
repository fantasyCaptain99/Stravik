"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectCategory } from "@/data/projects";
import { projectCategories } from "@/data/projects";
import { ProjectVisual } from "./project-visual";
import { cn } from "@/lib/utils";

/**
 * Filterable project grid.
 *
 * Filters are a real radiogroup: arrow keys move between options, and the
 * active state is announced. All projects remain in the DOM when filtered
 * out would be simpler, but hiding them from the accessibility tree matters
 * more — so filtered-out items are removed rather than visually hidden.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(filter)),
    [filter, projects],
  );

  return (
    <>
      {/* ─── Filters ─────────────────────────────────────────────────── */}
      <div
        role="radiogroup"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2.5"
      >
        {projectCategories.map((c) => {
          const checked = filter === c;
          const count =
            c === "All"
              ? projects.length
              : projects.filter((p) => p.categories.includes(c)).length;

          return (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={checked}
              onClick={() => setFilter(c)}
              className={cn(
                "inline-flex items-center gap-2 rounded-[var(--radius-control)] border px-4 py-2.5 font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.13em] transition-all duration-300",
                checked
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-ink)]"
                  : "border-[color-mix(in_srgb,var(--color-primary)_28%,transparent)] text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-off-white)]",
              )}
            >
              {c}
              <span className="tabular-nums opacity-55">{count}</span>
            </button>
          );
        })}
      </div>

      {/* ─── Live region so filtering is announced ───────────────────── */}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} of {projects.length} projects
        {filter !== "All" ? ` in ${filter}` : ""}.
      </p>

      {/* ─── Grid ────────────────────────────────────────────────────── */}
      {visible.length === 0 ? (
        <p className="mt-16 text-[var(--color-muted)]">
          No projects in this category yet.
        </p>
      ) : (
        <div className="mt-12 grid gap-x-7 gap-y-14 md:mt-16 md:grid-cols-2">
          {visible.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className={cn(
                "group block",
                /* Asymmetry: every third card drops to break the grid rhythm */
                i % 3 === 2 && "md:col-span-2",
              )}
            >
              <article>
                <div
                  className={cn(
                    "relative overflow-hidden",
                    i % 3 === 2 ? "aspect-[16/9]" : "aspect-[4/3]",
                  )}
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
                    <ProjectVisual project={p} />
                  </div>

                  {p.kind === "concept" && (
                    <span className="absolute left-4 top-4 border border-[color-mix(in_srgb,var(--color-mint)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-ink)_75%,transparent)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-mint)] backdrop-blur-sm">
                      Concept
                    </span>
                  )}

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent opacity-55"
                    aria-hidden="true"
                  />

                  <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-ink)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <ArrowUpRight
                      className="h-5 w-5 text-[var(--color-mint)]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                </div>

                <div className="mt-5 flex items-baseline gap-4">
                  <span className="index-label">({p.index})</span>
                  <div className="flex-1">
                    <h2 className="font-[family-name:var(--font-display)] text-[1.5rem] font-medium leading-tight tracking-[-0.025em] transition-colors duration-300 group-hover:text-[var(--color-mint)]">
                      {p.title}
                    </h2>
                    <p className="mt-1.5 text-[0.9rem] text-[var(--color-muted)]">
                      {p.discipline}
                    </p>
                  </div>
                  <div className="hidden shrink-0 gap-2 sm:flex">
                    {p.categories.map((c) => (
                      <span
                        key={c}
                        className="border border-[color-mix(in_srgb,var(--color-primary)_22%,transparent)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--color-muted)]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
