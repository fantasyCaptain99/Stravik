import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Signature pill control from the reference layout.
 *
 * The fill stays the brand gradient; the arrow disc is always cool black
 * (`--color-ink`) with a mint arrow, which reads identically on light and
 * dark surfaces and gives the control one consistent signature sitewide.
 */
export function PillButton({
  href,
  children,
  size = "md",
  className,
}: {
  href: string;
  children: React.ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center overflow-hidden rounded-full bg-[linear-gradient(100deg,var(--color-mint),var(--color-primary))] font-medium text-[var(--color-ink)]",
        size === "lg" ? "gap-5 py-3 pr-3 pl-7 text-lg" : "gap-4 py-2 pr-2 pl-5 text-base",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 animate-member-shine bg-linear-to-r from-transparent via-white/55 to-transparent"
      />
      <span className="relative">{children}</span>
      <span
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-full bg-[var(--color-ink)] text-[var(--color-mint)]",
          size === "lg" ? "size-12" : "size-9",
        )}
      >
        <ArrowUpRight
          className={cn(
            "transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            size === "lg" ? "size-5" : "size-4",
          )}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
