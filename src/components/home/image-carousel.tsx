"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDE_MS = 5600;

export type CarouselSlide = {
  src: string;
  title?: string;
};

export function ImageCarousel({
  images,
  label,
  eager = false,
}: {
  images: CarouselSlide[];
  label: string;
  /** Preload the first frame. Use only for the hero, which is the first paint. */
  eager?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tick, setTick] = useState(0);
  const count = images.length;
  const paused = held || hovering || hidden;
  const current = images[index];
  const wasPaused = useRef(false);

  const go = useCallback((next: number) => {
    setIndex(((next % count) + count) % count);
  }, [count]);

  useEffect(() => {
    if (wasPaused.current && !paused) setTick((n) => n + 1);
    wasPaused.current = paused;
  }, [paused]);

  useEffect(() => {
    if (paused || count < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [paused, index, count, tick]);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div
      className="flex flex-col gap-4"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="flex h-[18rem] gap-2 sm:h-[22rem] lg:h-[26rem]">
        {images.map((img, i) => {
          const active = i === index;
          return (
            <button
              key={img.src}
              type="button"
              aria-label={img.title ? `Show ${img.title}` : `Show image ${i + 1} of ${count}`}
              aria-current={active ? "true" : undefined}
              onClick={() => go(i)}
              className={cn(
                "relative min-w-8 overflow-hidden rounded-[1.75rem] border transition-[flex-grow,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:min-w-11",
                active
                  ? "flex-[7] border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)]"
                  : "flex-1 border-[var(--color-rule)] hover:border-[color-mix(in_srgb,var(--color-primary)_55%,transparent)]",
              )}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes={active ? "(min-width: 1024px) 60vw, 75vw" : "12vw"}
                loading={eager ? "eager" : "lazy"}
                fetchPriority={eager && i === 0 ? "high" : "low"}
                className={cn(
                  "object-cover transition-[filter,transform] duration-700",
                  active ? "hero-drift brightness-100" : "scale-110 brightness-75",
                )}
              />
              {active && img.title && (
                <span className="absolute inset-x-0 bottom-0 hidden bg-linear-to-t from-black/75 to-transparent px-4 pt-12 pb-4 text-left font-[family-name:var(--font-display)] text-lg leading-tight font-medium text-white sm:block sm:text-xl" aria-hidden="true">
                  {img.title}
                </span>
              )}
              <span
                className={cn(
                  "absolute bottom-3 left-3 font-[family-name:var(--font-display)] text-sm tracking-widest",
                  active && img.title && "sm:hidden",
                  active ? "text-white" : "text-white/70",
                )}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {active && (
                <span
                  key={`${index}-${tick}`}
                  className={cn(
                    "hero-progress absolute inset-x-0 bottom-0 h-0.5 bg-[var(--color-primary)]",
                    paused && "[animation-play-state:paused]",
                  )}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <p className="flex min-w-0 items-baseline gap-3 font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-[var(--color-muted)] tabular-nums">
          <span className="shrink-0">
            {String(index + 1).padStart(2, "0")}
            <span className="mx-1.5 opacity-50">/</span>
            {String(count).padStart(2, "0")}
          </span>
          {current?.title && (
            <span className="truncate font-[family-name:var(--font-display)] text-sm tracking-normal text-[var(--color-ink)] sm:text-base">
              {current.title}
            </span>
          )}
        </p>
        <div className="flex items-center gap-2">
          <Round icon={held ? Play : Pause} label={held ? "Play slideshow" : "Pause slideshow"} onClick={() => setHeld((v) => !v)} />
          <Round icon={ChevronLeft} label="Previous image" onClick={() => go(index - 1)} />
          <Round icon={ChevronRight} label="Next image" onClick={() => go(index + 1)} />
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {current?.title ? `${current.title}, ` : ""}image {index + 1} of {count}
      </p>
    </div>
  );
}

function Round({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Pause;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-primary)_45%,transparent)] text-[var(--color-primary-deep)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-mint)]"
    >
      <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
