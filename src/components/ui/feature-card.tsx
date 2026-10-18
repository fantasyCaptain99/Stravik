import type { LucideIcon } from "lucide-react";

export function FeatureCard({
  icon: Icon,
  title,
  body,
  tone = "light",
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <article
      data-reveal="up"
      className={
        dark
          ? "group relative overflow-hidden rounded-card border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] bg-[var(--color-forest)] p-8 transition-colors duration-500 hover:border-[color-mix(in_srgb,var(--color-primary)_60%,transparent)]"
          : "group relative overflow-hidden rounded-card border border-[var(--color-rule)] bg-[var(--color-off-white)] p-8 transition-colors duration-500 hover:border-[color-mix(in_srgb,var(--color-primary)_60%,transparent)] hover:bg-white"
      }
    >
      <span
        aria-hidden="true"
        className="absolute -top-16 -right-16 size-40 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="relative flex size-12 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-mint)] ring-1 ring-[color-mix(in_srgb,var(--color-primary)_40%,transparent)]">
        <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3 className="relative mt-6 font-[family-name:var(--font-display)] text-xl">{title}</h3>
      <p className={dark ? "relative mt-3 leading-relaxed text-white/70" : "relative mt-3 leading-relaxed text-[var(--color-muted)]"}>
        {body}
      </p>
    </article>
  );
}
