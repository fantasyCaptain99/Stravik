import {
  Eye,
  Users,
  Gem,
  Scale,
  Handshake,
  Clock,
  Code2,
  CalendarClock,
  FileText,
  BadgeCheck,
  LineChart,
  ShieldCheck,
  ShoppingBag,
  HeartPulse,
  Building2,
  GraduationCap,
  Utensils,
  Briefcase,
} from "lucide-react";

export const values = [
  { icon: Eye, title: "Transparency", body: "Written scope, clear reporting and no surprise invoices — for every engagement." },
  { icon: Users, title: "Senior people", body: "The people you meet in the first conversation are the people who build the product." },
  { icon: Gem, title: "Craft", body: "Software we're willing to maintain: fast, readable and designed around real use." },
  { icon: Scale, title: "Fairness", body: "Fixed-fee phases so the cost is known before the work starts, and you own the result." },
  { icon: Handshake, title: "Directness", body: "If a deadline is unrealistic or a feature is a mistake, you hear it while there is still time." },
  { icon: Clock, title: "Focus", body: "We stay small on purpose. Fewer projects, fewer handoffs, more attention on the one in front of us." },
];

export const benefits = [
  { icon: Code2, title: "Senior delivery", body: "Design and engineering sit on the same team, so nothing is lost in a handoff." },
  { icon: CalendarClock, title: "A pace you can plan", body: "Working software in reviewable increments, not a reveal at the end of a long silence." },
  { icon: FileText, title: "Written scope", body: "A clear plan of what is in, what is out, and what it costs before anyone starts building." },
  { icon: BadgeCheck, title: "You own the work", body: "The repository, the infrastructure and the accounts stay in your name. Always." },
  { icon: LineChart, title: "Honest reporting", body: "Progress you can see, and a straight answer when something needs to change." },
  { icon: ShieldCheck, title: "Built to be handed over", body: "Documentation written alongside the code, so another team can continue without archaeology." },
];

export const industries = [
  { icon: ShoppingBag, title: "Retail & e-commerce", body: "Stores, catalogues and the operational tools behind them, built to stay fast as the catalogue grows." },
  { icon: HeartPulse, title: "Healthcare & wellness", body: "Booking, portals and records with privacy treated as a product requirement, not a footnote." },
  { icon: Building2, title: "Real estate", body: "Listing experiences, agent tools and client dashboards that match how a team actually works." },
  { icon: GraduationCap, title: "Education", body: "Course platforms and admin tools for schools and trainers who have outgrown a template." },
  { icon: Utensils, title: "Hospitality", body: "Ordering, reservations and guest-facing apps for restaurants, cafes and hotels." },
  { icon: Briefcase, title: "Professional services", body: "Client portals, quoting and internal systems for firms whose work no longer fits a spreadsheet." },
];

export const comparison = {
  columns: ["Build from scratch", "Extend your team", "Fix or scale"],
  rows: [
    { label: "Best for", cells: ["A new product or site", "A team that needs senior capacity", "Something live that is struggling"] },
    { label: "How it works", cells: ["Discovery through launch", "Embedded in your process", "Audit, then a focused fix"] },
    { label: "Commitment", cells: ["Fixed-fee phases", "Monthly, no long lock-in", "A written report, then a plan"] },
    { label: "What you get", cells: ["A launched product you own", "Senior design and engineering", "A codebase that can be changed"] },
    { label: "Handover", cells: ["Docs with the release", "Your repo, your standards", "Incremental, not a rewrite by default"] },
  ],
};

export const faqs = [
  { q: "Do we need a finished brief?", a: "No. A clear problem is enough to start. We use the first conversation to find out what is actually in scope, and we say so if we are not the right studio." },
  { q: "How is the work priced?", a: "In fixed-fee phases with a written scope. You know the cost before a phase starts. We don't run open-ended hourly surprises." },
  { q: "Who does the work?", a: "Senior people. The team you meet at the start stays on the project. We don't hand the build to a separate production line." },
  { q: "Will we own the code?", a: "Yes. The repository, the infrastructure and the accounts are yours. Handover is part of the deliverable." },
  { q: "Can you work with a team we already have?", a: "Yes. The embedded engagement is designed for that: your repo, your reviews, an agreed period, no long lock-in." },
  { q: "What if something is already built and struggling?", a: "We audit it and tell you what is worth fixing. A rewrite is the last option, not the first." },
];

export const delivery = [
  { n: "01", title: "Discover", body: "We learn the goals, the users and the constraints, and agree a scope and a budget before design begins." },
  { n: "02", title: "Design", body: "Interfaces and prototypes, tested while changes are still cheap." },
  { n: "03", title: "Build", body: "Engineering in reviewable increments, so you see working software continuously." },
  { n: "04", title: "Launch & support", body: "Deployment, monitoring and the first weeks of real use, then a handover you can actually use." },
];
