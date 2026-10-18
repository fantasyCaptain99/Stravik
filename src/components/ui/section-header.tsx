import { cn } from "@/lib/utils";

/**
 * Shared editorial section header: index label, eyebrow, headline, optional
 * supporting line. Keeps vertical rhythm identical across every section
 * without forcing the same visual layout on them.
 */
export function SectionHeader({
  index,
  eyebrow,
  children,
  lead,
  className,
  align = "left",
}: {
  index?: string;
  eyebrow?: string;
  children: React.ReactNode;
  lead?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {(index || eyebrow) && (
        <div className="flex items-center gap-4">
          {index && <span className="index-label">({index})</span>}
          {index && eyebrow && (
            <span className="h-px w-8 bg-[color-mix(in_srgb,var(--color-primary)_45%,transparent)]" />
          )}
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </div>
      )}

      {children}

      {lead && (
        <p
          data-reveal="up"
          className="max-w-[58ch] text-[length:var(--text-lead)] leading-[1.55] text-[var(--color-muted)]"
        >
          {lead}
        </p>
      )}
    </div>
  );
}
