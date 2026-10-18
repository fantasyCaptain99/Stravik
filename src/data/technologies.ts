/**
 * Technology groupings shown on the homepage.
 *
 * NEEDS OWNER REVIEW: confirm this list reflects technologies Stravik
 * actually works with. Remove anything unconfirmed — claiming expertise
 * you do not have is the fastest way to lose a technical buyer.
 */

export type TechGroup = {
  label: string;
  items: string[];
};

export const techGroups: TechGroup[] = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "REST & GraphQL"],
  },
  {
    label: "Mobile",
    items: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    label: "Cloud & AI",
    items: ["AWS", "Vercel", "Docker", "Modern AI APIs"],
  },
];
