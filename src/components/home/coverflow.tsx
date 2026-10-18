import { ImageCarousel, type CarouselSlide } from "@/components/home/image-carousel";
import { PillButton } from "@/components/ui/pill-button";

/** Numbered files in /public/images/services, in the order supplied. */
const serviceSlides: CarouselSlide[] = [
  { src: "/images/services/1.png", title: "Web Development" },
  { src: "/images/services/2.png", title: "Mobile Development" },
  { src: "/images/services/3.png", title: "AI Apps & Automation" },
  { src: "/images/services/4.png", title: "Custom Software" },
  { src: "/images/services/5.png", title: "UI/UX Designs" },
  { src: "/images/services/6.png", title: "Cloud & DevOps" },
];

export function Coverflow({
  kicker,
  close,
}: {
  kicker: [string, string, string];
  close?: { title: string; body: string; cta: string; href: string };
}) {
  return (
    <section id="work" className="overflow-hidden bg-white py-20 text-[var(--color-ink)] lg:py-28">
      <div className="shell">
        <p className="mx-auto max-w-3xl text-center font-[family-name:var(--font-display)] text-3xl leading-[1.25] sm:text-4xl lg:text-5xl">
          <span className="block">{kicker[0]}</span>
          <span className="block">{kicker[1]}</span>
          <span className="mt-1 block text-[var(--color-primary-deep)]">{kicker[2]}</span>
        </p>

        <div className="mt-14">
          <ImageCarousel images={serviceSlides} label="Services" />
        </div>

        {close && (
          <div className="mx-auto mt-16 max-w-2xl text-center lg:mt-20">
            <h2 className="text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem]">
              {close.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
              {close.body}
            </p>
            <div className="mt-8 flex justify-center">
              <PillButton href={close.href}>{close.cta}</PillButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
