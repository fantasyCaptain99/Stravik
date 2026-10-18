export type NavItem = {
  label: string;
  href: string;
};

/** Primary header navigation. Mirrors the reference information architecture. */
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/solutions" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

/** Footer column: quick links. */
export const footerQuick: NavItem[] = [
  { label: "Ways to work", href: "/features" },
  { label: "How it works", href: "/#process" },
  { label: "Our work", href: "/work" },
  { label: "Start a project", href: "/contact" },
];

/**
 * Footer column: services.
 *
 * These previously pointed at `/services#<slug>`. That path is redirected to
 * `/solutions` by next.config.ts, which dropped the hash and landed visitors
 * at the top of a page with no matching anchor — six dead links. They now
 * point at the capabilities section on /solutions, which is a real target.
 */
export const footerServices: NavItem[] = [
  { label: "Web Development", href: "/solutions#capabilities" },
  { label: "Mobile Apps", href: "/solutions#capabilities" },
  { label: "AI & Automation", href: "/solutions#capabilities" },
  { label: "Custom SaaS", href: "/solutions#capabilities" },
  { label: "UI/UX Design", href: "/solutions#capabilities" },
  { label: "Cloud & Support", href: "/solutions#capabilities" },
];
