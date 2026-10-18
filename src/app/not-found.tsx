import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/ui/page-banner";
import { PillButton } from "@/components/ui/pill-button";
import { navigation } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist on the Stravik site.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageBanner
        crumb="404"
        title="This page doesn't exist"
        lead="The link may be out of date, or the address might have a typo. Here's the way back."
      />
      <section className="bg-white py-20">
        <div className="shell">
          <PillButton href="/">Back to home</PillButton>
          <nav aria-label="Site sections" className="mt-12">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary-deep)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
