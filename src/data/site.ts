/**
 * Central site configuration.
 *
 * Everything owner-specific lives here. Edit this file to change company
 * details across the entire site — no component edits required.
 *
 * Fields marked NEEDS OWNER INPUT are intentionally empty. Nothing has been
 * invented: no address, no founding year, no team size, no client counts.
 * Empty values are handled gracefully by every component that reads them.
 */

export const site = {
  name: "Stravik",
  /** Used in <title> templates and the footer wordmark. */
  wordmark: "STRAVIK",

  tagline: "We turn bold ideas into digital reality.",

  /** Short positioning line — footer, OG description fallback. */
  positioning:
    "An independent digital product studio designing and engineering websites, mobile apps, AI solutions and custom software.",

  description:
    "Stravik designs and develops exceptional websites, mobile applications, AI-powered solutions, and digital products built for what comes next.",

  /** Production origin, no trailing slash. Drives canonicals + sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stravik.com",

  /**
   * NEEDS OWNER INPUT — public contact address.
   * Left empty deliberately: no email is invented. When empty, the UI points
   * visitors to the contact form instead of showing a dead mailto link.
   *
   * Typed as `string` (not the literal "") so that components can branch on
   * it without TypeScript narrowing the empty case to `never`.
   */
  email: "" as string,

  /** NEEDS OWNER INPUT — optional public phone number. */
  phone: "" as string,

  /**
   * NEEDS OWNER INPUT — social profiles.
   * Only entries with a non-empty `url` are rendered anywhere on the site.
   * Add the profile URL and it appears in the footer and on the contact page.
   */
  socials: [
    { label: "LinkedIn", url: "" },
    { label: "X", url: "" },
    { label: "GitHub", url: "" },
    { label: "Dribbble", url: "" },
  ] as { label: string; url: string }[],

  /** Reusable CTA labels so wording stays consistent sitewide. */
  cta: {
    primary: "Start a Project",
    secondary: "Explore Our Work",
    contact: "Let's Talk",
    final: "Let's Build Together",
  },
} as const;

/** Socials that are actually configured. */
export const activeSocials = site.socials.filter((s) => s.url.length > 0);

export type Site = typeof site;
