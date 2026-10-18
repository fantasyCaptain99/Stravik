import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  light = false,
  className,
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-4 flex items-center gap-3 text-sm font-medium tracking-wide uppercase",
        light ? "text-[var(--color-mint)]" : "text-[var(--color-primary-deep)]",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-[var(--color-primary)]" />
      {children}
    </p>
  );
}
