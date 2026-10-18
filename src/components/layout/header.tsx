"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { Brandmark } from "@/components/ui/brandmark";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-ink)] text-white">
      <div className="shell grid h-16 grid-cols-[1fr_auto] items-center xl:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label="Stravik home" className="inline-flex items-center gap-2.5 whitespace-nowrap">
          <Brandmark size={32} priority decorative />
          <span className="text-mint-gradient font-[family-name:var(--font-display)] text-xl font-medium tracking-[0.02em]">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-7 xl:flex" aria-label="Primary">
          {navigation.map((item) => {
            const on = active(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "relative py-1 text-sm transition-colors hover:text-white",
                  on
                    ? "text-white after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-[var(--color-primary)]"
                    : "text-white/70",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <ProjectLink className="hidden text-sm xl:inline-flex" />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative flex size-10 flex-col items-center justify-center gap-1.5 xl:hidden"
          >
            <span className={cn("h-px w-5 bg-white transition-all", open && "translate-y-[7px] rotate-45")} />
            <span className={cn("h-px w-5 bg-white transition-opacity", open && "opacity-0")} />
            <span className={cn("h-px w-5 bg-white transition-all", open && "-translate-y-[7px] -rotate-45")} />
          </button>
        </div>
      </div>

      {open && (
        <div id="site-menu" className="border-t border-white/10 bg-[var(--color-ink)] xl:hidden">
          <nav aria-label="Mobile" className="shell flex flex-col py-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active(item.href) ? "page" : undefined}
                className={cn(
                  "border-b border-white/10 py-3.5 text-lg",
                  active(item.href) ? "text-[var(--color-mint)]" : "text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
            <ProjectLink className="mt-4 mb-2 inline-flex text-lg" />
          </nav>
        </div>
      )}
    </header>
  );
}

function ProjectLink({ className }: { className?: string }) {
  return (
    <Link
      href="/contact"
      className={cn(
        "group items-center gap-1.5 bg-transparent font-medium text-white transition-colors hover:text-[var(--color-mint)]",
        className,
      )}
    >
      {site.cta.primary}
      <ArrowUpRight
        className="size-[1.05em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2}
        aria-hidden="true"
      />
    </Link>
  );
}
