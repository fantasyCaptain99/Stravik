import Image from "next/image";
import type { TeamMember } from "@/data/team";

/**
 * Team portrait.
 *
 * Renders the real photo when `member.photo` is set; otherwise draws a
 * designed geometric placeholder derived from the Stravik emblem's angular
 * language. The placeholder is intentional art direction, not a grey box —
 * and critically, it is not a stock photo of a stranger standing in for a
 * real person.
 *
 * Aspect ratio is fixed at 4:5 in both states, so dropping in a real photo
 * causes no layout shift.
 */
export function Portrait({
  member,
  caption = true,
  fill = false,
  className,
}: {
  member: TeamMember;
  caption?: boolean;
  /** Fill the positioned parent instead of forcing a 4:5 box. */
  fill?: boolean;
  className?: string;
}) {
  const frame = fill ? "absolute inset-0" : "relative aspect-[4/5]";

  if (member.photo) {
    return (
      <div className={`${frame} overflow-hidden bg-[var(--color-forest)]`}>
        <Image
          src={member.photo}
          alt={member.name ? `${member.name}, ${member.role}` : member.role}
          fill
          sizes="(min-width: 1024px) 22vw, 70vw"
          className={`object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 ${className ?? "object-[center_18%]"}`}
        />
      </div>
    );
  }

  return (
    <div className={`${frame} overflow-hidden bg-[var(--color-forest)]`}>
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`pg-${member.id}`}
            x1="0"
            y1="0"
            x2="0.8"
            y2="1"
          >
            <stop offset="0%" stopColor="#20C997" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#09251F" stopOpacity="0.1" />
          </linearGradient>
          <pattern
            id={`pp-${member.id}`}
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M22 0H0V22"
              fill="none"
              stroke="#20C997"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="400" height="500" fill="#09251F" />
        <rect width="400" height="500" fill={`url(#pp-${member.id})`} />

        {/* Angular folded form echoing the emblem's geometry */}
        <path
          d="M200 120 L286 260 L200 212 L114 260 Z"
          fill={`url(#pg-${member.id})`}
        />
        <path
          d="M200 212 L286 260 L200 400 L114 260 Z"
          fill="#061511"
          fillOpacity="0.55"
        />
        <path
          d="M200 120 L286 260 L200 212 Z"
          fill="#6BE8BD"
          fillOpacity="0.28"
        />
        <line
          x1="114"
          y1="260"
          x2="286"
          y2="260"
          stroke="#20C997"
          strokeOpacity="0.4"
        />
      </svg>

      {caption && (
        <div className="absolute inset-0 flex items-end justify-between p-5">
          <span className="font-[family-name:var(--font-display)] text-[2.75rem] font-semibold leading-none tracking-[-0.04em] text-[color-mix(in_srgb,var(--color-off-white)_28%,transparent)]">
            {member.abbr}
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-muted)]">
            Photo to follow
          </span>
        </div>
      )}
    </div>
  );
}
