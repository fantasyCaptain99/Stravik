/**
 * Homepage content, structured to mirror the MagicLife layout the owner
 * specified (section order, component types and interaction patterns).
 *
 * Copy here is Stravik's own. The reference site's marketing text, email
 * address and phone number are deliberately NOT reproduced — that text is
 * theirs, and their contact details belong to them.
 */

/** Section 2 — intro statement under the hero. */
export const intro = {
  body: "Stravik is a digital product studio that designs and builds software for companies with something real to ship. Websites, mobile apps, AI-assisted tools and custom platforms — delivered by a small senior team that stays close to the work.",
  cta: "Start a Project",
};

/** Section 3 — single feature block, image right. */
export const featureBlock = {
  heading: "Design and engineering, one team",
  body: "No handoff documents, no translation loss between disciplines.",
};

/** Section 4 — three numbered steps. */
export const steps = [
  {
    n: "1",
    title: "Tell us what you're building",
    body: "A short conversation about the problem, the constraints and what success actually looks like. No pitch deck required.",
  },
  {
    n: "2",
    title: "We scope it honestly",
    body: "You get a clear plan, a realistic timeline and a fixed understanding of what is in and out. If we're not the right studio, we say so.",
  },
  {
    n: "3",
    title: "We build and hand over",
    body: "Working software in reviewable increments, with documentation written alongside it rather than retrofitted at the end.",
  },
];

/** Section 5 — transparency / trust block with bullets. */
export const transparency = {
  heading: "Clear scope, clear pricing, code that stays yours",
  intro:
    "Software projects go wrong in predictable ways: unclear scope, surprise invoices, and a codebase nobody else can pick up. We work to remove all three.",
  bullets: [
    "A written scope and estimate before any work starts",
    "Fixed-fee phases, so the cost is known in advance",
    "You own the repository, the infrastructure and the accounts — always",
  ],
  link: { label: "Ask us anything", href: "/contact" },
};

/** Section 6 — three engagement models, tabbed selector. */
export const engagements = [
  {
    index: "01",
    label: "Build from scratch",
    body: "You have an idea, a business case or a problem that off-the-shelf tools do not solve. We take it from first conversation to a launched product — discovery, design, engineering and release.",
    bullets: [
      "Full product design and build",
      "Fixed-fee phases with defined deliverables",
      "Launch support and handover documentation",
    ],
  },
  {
    index: "02",
    label: "Extend your team",
    body: "You already have engineers but need specific capability or extra capacity. We work inside your process — your repo, your standups, your review standards — for an agreed period.",
    bullets: [
      "Senior designers and engineers, embedded",
      "Works with your existing stack and workflow",
      "Monthly commitment, no long lock-in",
    ],
  },
  {
    index: "03",
    label: "Fix or scale what exists",
    body: "Something is live but struggling: slow, fragile, hard to change, or built by a team that has moved on. We audit it, tell you honestly what we find, and fix what is worth fixing.",
    bullets: [
      "Technical audit with a written report",
      "Performance, reliability and security work",
      "Incremental rebuild where a rewrite is not justified",
    ],
  },
];

/** Section 7 — six capability cards with visuals. */
export const buildCards = [
  { title: "Business websites", slug: "web-development" },
  { title: "Mobile apps", slug: "mobile-apps" },
  { title: "E-commerce", slug: "web-development" },
  { title: "Custom dashboards", slug: "custom-saas" },
  { title: "SaaS platforms", slug: "custom-saas" },
  { title: "AI & automation", slug: "ai-automation" },
];

/** Section 9 — closing membership-equivalent CTA block. */
export const closingBlock = {
  heading: "Build something worth keeping",
  body: "Work with a studio that treats your product as something it will still be proud of in three years — not just something that shipped.",
  cta: "Start a Project",
};

/** Section 10 — final CTA band. */
export const finalBand = {
  heading: "Ready to see what comes next?",
  body: "Tell us about the project and we'll walk you through how we'd approach it, what it would take and what it would cost.",
  cta: "Start a Project",
};
