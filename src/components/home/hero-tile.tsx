import Image from "next/image";
import type { HeroImage } from "@/data/hero-images";

/**
 * A single hero carousel slide.
 *
 * Renders the real photograph when one is available; otherwise draws an
 * original generated composition at the same dimensions, so adding the
 * photographs later causes no layout shift and nothing ever appears broken.
 */
export function HeroTile({
  image,
  available,
  priority,
  sizes,
}: {
  image: HeroImage;
  available: boolean;
  priority: boolean;
  sizes: string;
}) {
  if (available) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        /* Non-priority slides are off-screen (opacity 0) at first paint, but
           must be decoded before their turn in the carousel — eager loading
           keeps the first transition from showing an empty frame. */
        loading={priority ? undefined : "eager"}
        sizes={sizes}
        /* Source is 1672px wide. Slightly higher quality offsets the
           upscaling that happens on viewports wider than that. */
        quality={86}
        className="object-cover object-center"
      />
    );
  }

  return <GeneratedTile variant={image.variant} />;
}

/** Original abstract compositions — brand geometry, not stock imagery. */
function GeneratedTile({ variant }: { variant: HeroImage["variant"] }) {
  const id = `ht-${variant}`;

  return (
    <svg
      /* 16:9 — these now fill the viewport rather than a quarter of it, so a
         wide canvas keeps the composition from being cropped to its centre. */
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#20C997" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#09251F" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id={`${id}-r`} cx="60%" cy="30%">
          <stop offset="0%" stopColor="#6BE8BD" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6BE8BD" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`${id}-p`}
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M64 0H0V64"
            fill="none"
            stroke="#20C997"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="1600" height="900" fill="#0A2922" />
      <rect width="1600" height="900" fill={`url(#${id}-p)`} />
      <rect width="1600" height="900" fill={`url(#${id}-r)`} />

      {variant === "geometry" && (
        <g>
          {/* Angular folded planes echoing the emblem, weighted right so the
              headline (which sits left) stays clear of the busiest area. */}
          <path d="M1040 180 L1320 500 L1040 392 L760 500 Z" fill={`url(#${id}-g)`} />
          <path
            d="M1040 392 L1320 500 L1040 800 L760 500 Z"
            fill="#061511"
            fillOpacity="0.5"
          />
          <path d="M1040 180 L1320 500 L1040 392 Z" fill="#6BE8BD" fillOpacity="0.3" />
          <line x1="760" y1="500" x2="1320" y2="500" stroke="#20C997" strokeOpacity="0.45" />
          <line x1="1040" y1="120" x2="1040" y2="860" stroke="#20C997" strokeOpacity="0.16" />
        </g>
      )}

      {variant === "interface" && (
        <g>
          <rect
            x="700"
            y="150"
            width="760"
            height="600"
            rx="4"
            fill="#061511"
            fillOpacity="0.6"
            stroke="#20C997"
            strokeOpacity="0.3"
          />
          <rect x="700" y="150" width="760" height="56" fill="#20C997" fillOpacity="0.1" />
          <circle cx="734" cy="178" r="7" fill="#20C997" fillOpacity="0.55" />
          <circle cx="760" cy="178" r="7" fill="#20C997" fillOpacity="0.3" />
          <circle cx="786" cy="178" r="7" fill="#20C997" fillOpacity="0.3" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x={736 + i * 242}
                y={252}
                width="206"
                height="104"
                rx="3"
                fill="#20C997"
                fillOpacity="0.09"
                stroke="#20C997"
                strokeOpacity="0.22"
              />
              <rect
                x={762 + i * 242}
                y={286}
                width="72"
                height="9"
                rx="2"
                fill="#20C997"
                fillOpacity="0.4"
              />
              <rect
                x={762 + i * 242}
                y={310}
                width="118"
                height="18"
                rx="2"
                fill={`url(#${id}-g)`}
              />
            </g>
          ))}
          {[120, 212, 164, 282, 196, 248].map((hgt, i) => (
            <rect
              key={i}
              x={740 + i * 118}
              y={690 - hgt}
              width="68"
              height={hgt}
              rx="2"
              fill={`url(#${id}-g)`}
              fillOpacity={i === 3 ? 1 : 0.42}
            />
          ))}
          <line x1="736" y1="694" x2="1430" y2="694" stroke="#20C997" strokeOpacity="0.3" />
        </g>
      )}

      {variant === "light" && (
        <g>
          <circle cx="1020" cy="450" r="330" fill={`url(#${id}-r)`} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={i}
              x1={620 + i * 180}
              y1="60"
              x2={760 + i * 180}
              y2="840"
              stroke="#6BE8BD"
              strokeOpacity={0.28 - i * 0.035}
              strokeWidth="2"
            />
          ))}
          <path
            d="M740 620 Q1030 290 1320 620"
            fill="none"
            stroke="#20C997"
            strokeOpacity="0.5"
            strokeWidth="3"
          />
          <circle cx="1030" cy="432" r="12" fill="#6BE8BD" />
          <circle cx="1030" cy="432" r="42" fill="none" stroke="#6BE8BD" strokeOpacity="0.35" />
        </g>
      )}

      {variant === "grid" && (
        <g>
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={700 + c * 196}
                y={190 + r * 190}
                width="162"
                height="150"
                rx="3"
                fill="#20C997"
                fillOpacity={0.05 + ((r + c) % 3) * 0.07}
                stroke="#20C997"
                strokeOpacity="0.2"
              />
            )),
          )}
          <rect
            x="896"
            y="380"
            width="162"
            height="150"
            rx="3"
            fill={`url(#${id}-g)`}
            fillOpacity="0.85"
          />
        </g>
      )}
    </svg>
  );
}
