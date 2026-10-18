import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Generated project visual.
 *
 * Concept projects have no real screenshots, and using stock photography
 * would misrepresent them as delivered software. Instead each project renders
 * an original abstract composition derived from its discipline — an interface
 * skeleton, a device frame, a data shape — so the grid is visually rich
 * without claiming to show real client work.
 *
 * When a real screenshot exists (project.image), it takes precedence; see
 * the consuming components.
 */

const ACCENT: Record<Project["accent"], { a: string; b: string }> = {
  emerald: { a: "#20C997", b: "#15A67B" },
  mint: { a: "#6BE8BD", b: "#20C997" },
  forest: { a: "#15A67B", b: "#09251F" },
  steel: { a: "#81958C", b: "#20C997" },
};

export function ProjectVisual({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const c = ACCENT[project.accent];
  const kind = project.categories[0] ?? "Web";

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[var(--color-forest)]",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={`g-${project.slug}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c.a} stopOpacity="0.9" />
            <stop offset="100%" stopColor={c.b} stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id={`r-${project.slug}`} cx="70%" cy="20%">
            <stop offset="0%" stopColor={c.a} stopOpacity="0.28" />
            <stop offset="100%" stopColor={c.a} stopOpacity="0" />
          </radialGradient>
          <pattern
            id={`p-${project.slug}`}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 0H0V28"
              fill="none"
              stroke={c.a}
              strokeOpacity="0.1"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="800" height="600" fill="#09251F" />
        <rect width="800" height="600" fill={`url(#p-${project.slug})`} />
        <rect width="800" height="600" fill={`url(#r-${project.slug})`} />

        {kind === "Mobile" ? (
          <MobileComposition slug={project.slug} c={c} />
        ) : kind === "AI" ? (
          <AiComposition slug={project.slug} c={c} />
        ) : kind === "Design" ? (
          <DesignComposition slug={project.slug} c={c} />
        ) : (
          <DashboardComposition slug={project.slug} c={c} />
        )}
      </svg>
    </div>
  );
}

type CProps = { slug: string; c: { a: string; b: string } };

/** Dashboard / SaaS: a metric rail with chart forms. */
function DashboardComposition({ slug, c }: CProps) {
  const bars = [60, 104, 78, 132, 96, 158, 120, 186];
  return (
    <g>
      <rect
        x="90"
        y="110"
        width="620"
        height="380"
        rx="2"
        fill="#061511"
        fillOpacity="0.72"
        stroke={c.a}
        strokeOpacity="0.22"
      />
      <rect x="90" y="110" width="620" height="44" fill={c.a} fillOpacity="0.07" />
      <circle cx="114" cy="132" r="4" fill={c.a} fillOpacity="0.5" />
      <circle cx="130" cy="132" r="4" fill={c.a} fillOpacity="0.28" />
      <circle cx="146" cy="132" r="4" fill={c.a} fillOpacity="0.28" />

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={118 + i * 196}
            y={184}
            width="166"
            height="70"
            rx="2"
            fill={c.a}
            fillOpacity="0.06"
            stroke={c.a}
            strokeOpacity="0.16"
          />
          <rect
            x={134 + i * 196}
            y={206}
            width="54"
            height="7"
            rx="1"
            fill={c.a}
            fillOpacity="0.4"
          />
          <rect
            x={134 + i * 196}
            y={224}
            width="92"
            height="14"
            rx="1"
            fill={`url(#g-${slug})`}
          />
        </g>
      ))}

      {bars.map((h, i) => (
        <rect
          key={i}
          x={122 + i * 72}
          y={450 - h}
          width="36"
          height={h}
          rx="1"
          fill={`url(#g-${slug})`}
          fillOpacity={i === 5 ? 1 : 0.42}
        />
      ))}
      <line
        x1="118"
        y1="452"
        x2="690"
        y2="452"
        stroke={c.a}
        strokeOpacity="0.25"
      />
    </g>
  );
}

/** Mobile: two offset device frames. */
function MobileComposition({ slug, c }: CProps) {
  return (
    <g>
      <g opacity="0.45">
        <rect
          x="255"
          y="150"
          width="190"
          height="370"
          rx="26"
          fill="#061511"
          stroke={c.a}
          strokeOpacity="0.25"
        />
        <rect x="279" y="196" width="142" height="8" rx="2" fill={c.a} fillOpacity="0.3" />
        <rect x="279" y="216" width="104" height="8" rx="2" fill={c.a} fillOpacity="0.18" />
        <rect x="279" y="248" width="142" height="96" rx="3" fill={c.a} fillOpacity="0.1" />
      </g>

      <g>
        <rect
          x="380"
          y="106"
          width="208"
          height="400"
          rx="28"
          fill="#061511"
          stroke={c.a}
          strokeOpacity="0.4"
        />
        <rect x="452" y="122" width="64" height="7" rx="3.5" fill={c.a} fillOpacity="0.4" />
        <rect x="406" y="162" width="118" height="10" rx="2" fill={`url(#g-${slug})`} />
        <rect x="406" y="184" width="86" height="10" rx="2" fill={c.a} fillOpacity="0.22" />
        <rect
          x="406"
          y="218"
          width="156"
          height="112"
          rx="4"
          fill={`url(#g-${slug})`}
          fillOpacity="0.4"
        />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x="406"
              y={350 + i * 40}
              width="156"
              height="28"
              rx="3"
              fill={c.a}
              fillOpacity="0.08"
            />
            <circle cx="422" cy={364 + i * 40} r="6" fill={c.a} fillOpacity="0.35" />
            <rect
              x="438"
              y={360 + i * 40}
              width={88 - i * 16}
              height="7"
              rx="1"
              fill={c.a}
              fillOpacity="0.25"
            />
          </g>
        ))}
      </g>
    </g>
  );
}

/** AI: node graph with confidence bands. */
function AiComposition({ slug, c }: CProps) {
  const nodes = [
    [200, 300],
    [340, 190],
    [340, 410],
    [490, 250],
    [490, 370],
    [630, 300],
  ] as const;
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [1, 4],
    [3, 5],
    [4, 5],
  ] as const;

  return (
    <g>
      <rect
        x="100"
        y="120"
        width="600"
        height="360"
        rx="2"
        fill="#061511"
        fillOpacity="0.6"
        stroke={c.a}
        strokeOpacity="0.18"
      />
      {edges.map(([f, t], i) => {
        const a = nodes[f]!;
        const b = nodes[t]!;
        return (
          <line
            key={i}
            x1={a[0]}
            y1={a[1]}
            x2={b[0]}
            y2={b[1]}
            stroke={c.a}
            strokeOpacity={0.5 - i * 0.04}
            strokeWidth="1.5"
          />
        );
      })}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 5 ? 26 : 18} fill="#09251F" />
          <circle
            cx={x}
            cy={y}
            r={i === 5 ? 26 : 18}
            fill={`url(#g-${slug})`}
            fillOpacity={i === 5 ? 0.95 : 0.5}
            stroke={c.a}
            strokeOpacity="0.6"
          />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="140"
          y={430 + i * 14}
          width={180 - i * 46}
          height="5"
          rx="2.5"
          fill={c.a}
          fillOpacity={0.5 - i * 0.14}
        />
      ))}
    </g>
  );
}

/** Design / editorial: typographic grid composition. */
function DesignComposition({ slug, c }: CProps) {
  return (
    <g>
      <line x1="140" y1="90" x2="140" y2="510" stroke={c.a} strokeOpacity="0.18" />
      <line x1="400" y1="90" x2="400" y2="510" stroke={c.a} strokeOpacity="0.18" />
      <line x1="660" y1="90" x2="660" y2="510" stroke={c.a} strokeOpacity="0.18" />
      <line x1="120" y1="200" x2="680" y2="200" stroke={c.a} strokeOpacity="0.3" />
      <line x1="120" y1="404" x2="680" y2="404" stroke={c.a} strokeOpacity="0.3" />

      <rect x="160" y="236" width="212" height="30" rx="2" fill={`url(#g-${slug})`} />
      <rect x="160" y="278" width="168" height="30" rx="2" fill={c.a} fillOpacity="0.4" />
      <rect x="160" y="320" width="196" height="30" rx="2" fill={c.a} fillOpacity="0.2" />

      <rect
        x="424"
        y="236"
        width="212"
        height="114"
        rx="2"
        fill={`url(#g-${slug})`}
        fillOpacity="0.25"
        stroke={c.a}
        strokeOpacity="0.3"
      />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="424"
          y={430 + i * 12}
          width={200 - i * 40}
          height="4"
          rx="2"
          fill={c.a}
          fillOpacity={0.4 - i * 0.08}
        />
      ))}
      <circle cx="660" cy="200" r="5" fill={c.a} />
      <circle cx="140" cy="404" r="5" fill={c.a} />
    </g>
  );
}
