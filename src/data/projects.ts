/**
 * Portfolio data — drives /work, /work/[slug] and the homepage showcase.
 *
 * ─── IMPORTANT: CONCEPT vs. CLIENT WORK ─────────────────────────────────────
 * Every entry carries `kind`:
 *   "concept" → an illustrative concept piece created to demonstrate approach.
 *               Rendered with a visible "Concept" label across all surfaces.
 *   "client"  → real delivered work. Only use this once the engagement is
 *               confirmed AND the client has approved being named.
 *
 * All seeded entries below are CONCEPTS. They are not client engagements and
 * are labelled as such everywhere they appear. `outcomes` is intentionally
 * empty on concepts — no metrics are claimed without verification.
 *
 * ─── HOW TO ADD A REAL PROJECT ──────────────────────────────────────────────
 * 1. Copy an entry, set kind: "client", give it a unique `slug`.
 * 2. Add images under /public/images/projects/.
 * 3. Fill `outcomes` only with figures the client has verified and approved.
 */

export type ProjectCategory = "Web" | "Mobile" | "AI" | "SaaS" | "Design";

export type Project = {
  slug: string;
  index: string;
  title: string;
  /** Short descriptor shown under the title on cards. */
  discipline: string;
  categories: ProjectCategory[];
  kind: "concept" | "client";
  year: string;
  /** One-sentence hook for cards. */
  excerpt: string;
  overview: string;
  challenge: string;
  approach: string;
  execution: string;
  technologies: string[];
  /** Only populate for client work with verified, approved figures. */
  outcomes: { label: string; value: string }[];
  /**
   * Visual treatment. Concepts use generated CSS/SVG compositions rather than
   * stock photography, so nothing misrepresents real client software.
   * `accent` drives the composition's colour weighting.
   */
  accent: "emerald" | "mint" | "forest" | "steel";
  /** Optional real screenshot path once available. */
  image: string;
};

export const projects: Project[] = [
  {
    slug: "meridian-analytics",
    index: "01",
    title: "Meridian",
    discipline: "SaaS Analytics Dashboard",
    categories: ["SaaS", "Web", "Design"],
    kind: "concept",
    year: "2025",
    excerpt:
      "A concept dashboard exploring how dense operational data can stay readable under pressure.",
    overview:
      "Meridian is an internal concept piece exploring analytics interfaces for operations teams — the kind of screen someone stares at for eight hours, where density matters more than decoration.",
    challenge:
      "Analytics products tend to fail in one of two directions: they either bury the signal in chrome, or they strip away so much that users cannot drill into causes. The concept set out to hold both — scannable at a glance, deep on demand.",
    approach:
      "We started from the questions an operator actually asks at 9am, then worked backwards to the layout. Information hierarchy was resolved in greyscale before any colour was introduced, which forced the structure to carry the clarity.",
    execution:
      "A twelve-column grid with a fixed metric rail, progressive disclosure on every row, and a charting approach that uses one accent colour for the active series and neutral tones for context. Keyboard navigation covers every interactive element.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    outcomes: [],
    accent: "emerald",
    image: "",
  },
  {
    slug: "atlas-field",
    index: "02",
    title: "Atlas Field",
    discipline: "Cross-Platform Mobile Application",
    categories: ["Mobile", "Design"],
    kind: "concept",
    year: "2025",
    excerpt:
      "A field-operations app concept built around intermittent connectivity and gloved hands.",
    overview:
      "Atlas Field is a concept for teams working away from reliable networks — inspections, logistics, site surveys. The constraint driving every decision was that the device may be offline for hours.",
    challenge:
      "Most mobile tools assume connectivity and degrade badly without it. The concept required a data model where offline is the normal state and synchronisation is a background concern the user never has to think about.",
    approach:
      "Local-first architecture with an explicit conflict-resolution strategy. The interface surfaces sync status honestly rather than pretending everything saved — users in the field need to know what is actually on the server.",
    execution:
      "Large touch targets sized for gloved use, high-contrast typography for direct sunlight, and a capture flow that works one-handed. Every destructive action is reversible.",
    technologies: ["React Native", "TypeScript", "SQLite", "Node.js"],
    outcomes: [],
    accent: "mint",
    image: "",
  },
  {
    slug: "signal-intake",
    index: "03",
    title: "Signal",
    discipline: "AI-Assisted Document Pipeline",
    categories: ["AI", "SaaS"],
    kind: "concept",
    year: "2025",
    excerpt:
      "A concept exploring AI document processing where knowing the model is wrong matters most.",
    overview:
      "Signal is a concept for high-volume document intake — contracts, claims, applications — where language models do the first pass and humans review the uncertain cases.",
    challenge:
      "The hard part of applied AI is not extraction, it is calibration. A system that is confidently wrong is worse than no system. The concept focused on making uncertainty visible and routing it to a person.",
    approach:
      "Every extracted field carries a confidence signal and a link back to its source span in the original document. Reviewers verify rather than re-key. Low-confidence extractions escalate automatically.",
    execution:
      "A review queue ordered by uncertainty, side-by-side source and extraction panes, and an evaluation harness that tracks accuracy per field type over time so regressions surface before users find them.",
    technologies: ["Next.js", "Python", "Claude API", "PostgreSQL"],
    outcomes: [],
    accent: "forest",
    image: "",
  },
  {
    slug: "forma-studio",
    index: "04",
    title: "Forma",
    discipline: "Editorial Web Experience",
    categories: ["Web", "Design"],
    kind: "concept",
    year: "2025",
    excerpt:
      "A concept site exploring how far editorial typography can carry a brand without imagery.",
    overview:
      "Forma is a typography-led concept for a design practice — an exercise in building visual interest from type, rule weight and negative space rather than photography.",
    challenge:
      "Image-light sites usually read as unfinished. The concept tested whether a considered type system and strict grid could produce something that feels art-directed with almost no photographic content.",
    approach:
      "A three-weight display scale, a strict baseline grid, and horizontal rules used structurally rather than decoratively. Motion is reserved for transitions between sections, never applied to body content.",
    execution:
      "Scroll-linked type reveals, a horizontal project track, and a colour system of two neutrals plus one accent. The entire site carries a measured sub-100KB of CSS.",
    technologies: ["Next.js", "GSAP", "TypeScript", "Tailwind CSS"],
    outcomes: [],
    accent: "steel",
    image: "",
  },
  {
    slug: "cadence-billing",
    index: "05",
    title: "Cadence",
    discipline: "Subscription Platform",
    categories: ["SaaS", "Web"],
    kind: "concept",
    year: "2025",
    excerpt:
      "A billing platform concept where the hardest design problem is the edge cases.",
    overview:
      "Cadence is a concept for subscription management — proration, plan changes, failed payments, dunning. The unglamorous surface area where SaaS products actually lose revenue.",
    challenge:
      "Billing interfaces are usually designed for the happy path and then patched for everything else. The concept inverted that: the edge cases were designed first, and the simple case fell out of them.",
    approach:
      "Every state a subscription can occupy was enumerated before any screen was drawn. The interface then made each state legible to both the customer and the support team handling the exception.",
    execution:
      "A state-machine-backed subscription model, clear proration previews before confirmation, and a dunning flow that communicates without alarming. Audit trails on every change.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    outcomes: [],
    accent: "emerald",
    image: "",
  },
  {
    slug: "northwind-commerce",
    index: "06",
    title: "Northwind",
    discipline: "Commerce Experience",
    categories: ["Web", "Design"],
    kind: "concept",
    year: "2025",
    excerpt:
      "A commerce concept treating the product page as the entire storefront.",
    overview:
      "Northwind is a concept for a small-catalogue retailer, built on the premise that for most such brands the product page is where the decision happens and everything else is navigation.",
    challenge:
      "Catalogue-first templates spread attention thin across listings. For a brand with twelve products, that structure works against the product. The concept tested a depth-first alternative.",
    approach:
      "Product pages carry full editorial weight — long-form detail, considered photography placement, specification tables that answer the real purchase questions. Listings became a lightweight index.",
    execution:
      "Server-rendered product routes for fast first paint, an image strategy that prioritises the primary shot, and a checkout path reduced to the minimum required fields.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "AWS"],
    outcomes: [],
    accent: "mint",
    image: "",
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const projectCategories: (ProjectCategory | "All")[] = [
  "All",
  "Web",
  "Mobile",
  "AI",
  "SaaS",
  "Design",
];

/** Adjacent project for case-study navigation; wraps at the end. */
export const nextProject = (slug: string): Project => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length] ?? projects[0]!;
};

/** True while the portfolio contains only illustrative concept pieces. */
export const conceptsOnly = projects.every((p) => p.kind === "concept");
