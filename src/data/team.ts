/**
 * Leadership team — single source of truth for /team and the homepage preview.
 *
 * ─── HOW TO ADD A REAL TEAM MEMBER ──────────────────────────────────────────
 * 1. Drop the photo at the `photo` path below (see /public/images/team/).
 *    Portrait orientation, 4:5 ratio, ideally 1000×1250px or larger, .webp.
 * 2. Fill in `name` and optionally `bio` and `links`.
 * 3. That's it. No JSX changes needed.
 *
 * Any member with an empty `name` renders as a designed placeholder card —
 * the layout is built for it, not patched around it. Nothing is invented:
 * no names, no biographies, no employment history, no stock-photo stand-ins
 * presented as real people.
 */

export type TeamLink = {
  label: string;
  url: string;
};

export type TeamMember = {
  /** Stable key — also used for the placeholder monogram. */
  id: string;
  /** Role title. Always shown. */
  role: string;
  /** Short role abbreviation for the placeholder graphic, e.g. "CEO". */
  abbr: string;
  /** NEEDS OWNER INPUT — leave "" until confirmed. */
  name: string;
  /** NEEDS OWNER INPUT — optional. */
  bio: string;
  /** NEEDS OWNER INPUT — path under /public. Leave "" to show placeholder. */
  photo: string;
  /** NEEDS OWNER INPUT — only non-empty urls are rendered. */
  links: TeamLink[];
};

export const team: TeamMember[] = [
  {
    id: "founder-ceo",
    role: "Founder & CEO",
    abbr: "CEO",
    name: "Honchar Maksym",
    bio: "",
    photo: "/images/team/founder-ceo.jpg",
    links: [],
  },
  {
    id: "coo",
    role: "Chief Operating Officer",
    abbr: "COO",
    name: "Jake Heller",
    bio: "",
    photo: "/images/team/coo.jpg",
    links: [],
  },
  {
    id: "cto",
    role: "Chief Technology Officer",
    abbr: "CTO",
    name: "Adam Szmyt",
    bio: "",
    photo: "/images/team/cto.jpg",
    links: [],
  },
  {
    id: "cfo",
    role: "Chief Financial Officer",
    abbr: "CFO",
    name: "Edison Miller",
    bio: "",
    photo: "/images/team/cfo.jpg",
    links: [],
  },
];

/** True once the owner has supplied at least one real name. */
export const hasNamedMembers = team.some((m) => m.name.length > 0);
