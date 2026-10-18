/**
 * Service definitions — single source of truth for the homepage capabilities
 * section, the /services page, and the contact form's service selector.
 *
 * Capabilities listed describe what the studio offers. Confirm this list
 * reflects what Stravik actually delivers before launch.
 */

export type Service = {
  /** URL fragment + stable key. */
  slug: string;
  /** Editorial index, e.g. "01". */
  index: string;
  title: string;
  /** One line, used in compact contexts. */
  summary: string;
  /** Two or three sentences for the services page. */
  body: string;
  /** Business outcomes — what the client actually gets. */
  outcomes: string[];
  /** Concrete deliverables. */
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    index: "01",
    title: "Web Development",
    summary:
      "Marketing sites, web applications and commerce experiences built for speed and longevity.",
    body: "We build websites and web applications that load fast, rank well and hold up under real traffic. Every build starts from the content and the conversion path, not from a template. The result is a site your team can actually maintain.",
    outcomes: [
      "Faster load times and better Core Web Vitals",
      "Higher conversion from the same traffic",
      "A codebase your team can extend without a rewrite",
    ],
    deliverables: [
      "Responsive marketing site or web app",
      "CMS or file-based content workflow",
      "Analytics, SEO and performance setup",
      "Deployment pipeline and documentation",
    ],
  },
  {
    slug: "mobile-apps",
    index: "02",
    title: "Mobile App Development",
    summary:
      "iOS, Android and cross-platform applications with interfaces people return to.",
    body: "Native and cross-platform apps built with React Native or Flutter, depending on what the product actually needs. We handle the full path from prototype to store release, including the parts teams usually underestimate — offline state, push, and review requirements.",
    outcomes: [
      "One codebase across iOS and Android where it makes sense",
      "Store-ready releases without last-minute surprises",
      "Interfaces that feel native on each platform",
    ],
    deliverables: [
      "iOS and Android applications",
      "Design system and component library",
      "App Store and Play Store submission support",
      "Release and update workflow",
    ],
  },
  {
    slug: "ai-automation",
    index: "03",
    title: "AI & Automation",
    summary:
      "AI-assisted workflows, intelligent integrations and agents wired into real business processes.",
    body: "We integrate language models and automation into products and internal operations where they measurably reduce work. The emphasis is on evaluation and guardrails — knowing when the system is wrong matters more than the demo.",
    outcomes: [
      "Manual processes reduced to reviewed, automated steps",
      "AI features with measurable accuracy, not guesswork",
      "Clear cost controls on model usage",
    ],
    deliverables: [
      "AI-integrated product features",
      "Workflow automation and agent pipelines",
      "Evaluation harness and quality monitoring",
      "Prompt and model configuration documentation",
    ],
  },
  {
    slug: "custom-saas",
    index: "04",
    title: "SaaS & Custom Software",
    summary:
      "Multi-user platforms, dashboards, APIs and internal systems that scale with the business.",
    body: "Custom platforms for teams whose work no longer fits off-the-shelf tools. We design the data model and permissions first, because those are the decisions that are expensive to change later.",
    outcomes: [
      "Software shaped around your actual operations",
      "Multi-tenant and permission models that hold up",
      "A foundation that survives the next growth stage",
    ],
    deliverables: [
      "Web platform with role-based access",
      "Admin dashboards and reporting",
      "Documented API surface",
      "Subscription and billing integration",
    ],
  },
  {
    slug: "uiux-design",
    index: "05",
    title: "UI/UX & Product Design",
    summary:
      "Research, interface design, prototypes and design systems that keep teams consistent.",
    body: "Design work grounded in what users are trying to accomplish. We prototype early to resolve the hard interaction questions before engineering begins, and leave behind a system rather than a set of screens.",
    outcomes: [
      "Interfaces validated before they are built",
      "Consistent product surface as the team grows",
      "Shorter design-to-development handoff",
    ],
    deliverables: [
      "User research and journey mapping",
      "Interactive prototypes",
      "Component-level design system",
      "Developer-ready specifications",
    ],
  },
  {
    slug: "cloud-support",
    index: "06",
    title: "Cloud & Technical Support",
    summary:
      "Deployment, integrations, performance work and ongoing maintenance after launch.",
    body: "Launch is the start of the work, not the end. We handle infrastructure, monitoring and the steady improvements that keep a product healthy — plus the integrations that connect it to everything else you run.",
    outcomes: [
      "Predictable deployments with rollback",
      "Issues surfaced by monitoring, not by customers",
      "Infrastructure cost kept proportionate",
    ],
    deliverables: [
      "Cloud infrastructure and CI/CD setup",
      "Monitoring, logging and alerting",
      "Third-party integrations",
      "Ongoing maintenance and support",
    ],
  },
];

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

/** Options for the contact form's service selector. */
export const serviceOptions = [
  ...services.map((s) => s.title),
  "Something else",
] as const;
