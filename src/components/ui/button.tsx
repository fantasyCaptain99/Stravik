import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/animations/magnetic";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center gap-2.5 rounded-[var(--radius-control)] font-[family-name:var(--font-mono)] text-[0.8125rem] uppercase tracking-[0.14em] transition-colors duration-300";

const variants: Record<Variant, string> = {
  solid:
    "bg-[var(--color-primary)] text-[var(--color-ink)] px-7 py-4 hover:bg-[var(--color-mint)]",
  outline:
    "border border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] px-7 py-4 text-[var(--color-off-white)] hover:border-[var(--color-primary)] hover:text-[var(--color-mint)]",
  ghost: "text-[var(--color-off-white)] hover:text-[var(--color-mint)] py-2",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Magnetic drift on fine pointers. Off for dense/inline usage. */
  magnetic?: boolean;
  withArrow?: boolean;
};

export function Button({
  href,
  children,
  variant = "solid",
  className,
  magnetic = true,
  withArrow = true,
}: Props) {
  const external = href.startsWith("http") || href.startsWith("mailto:");

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}
    </>
  );

  const classes = cn(base, variants[variant], className);

  const link = external ? (
    <a href={href} className={classes} rel="noopener noreferrer" target="_blank">
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );

  return magnetic ? <Magnetic strength={0.22}>{link}</Magnetic> : link;
}
