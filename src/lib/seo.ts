import type { Metadata } from "next";
import { site } from "@/data/site";

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
};

type PageSeo = {
  /** Page title. The layout template appends the site name unless `absoluteTitle` is set. */
  title: string;
  description: string;
  /** Path beginning with `/`. `/` is the homepage. */
  path: string;
  /** Use the title exactly, without the site-name template. */
  absoluteTitle?: boolean;
  index?: boolean;
};

/** Canonical URL, Open Graph and Twitter card for one route. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  index = true,
}: PageSeo): Metadata {
  const canonical = path === "/" ? "/" : path;
  const url = canonical === "/" ? site.url : `${site.url}${canonical}`;
  const socialTitle = absoluteTitle ? title : `${title} — ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    robots: { index, follow: true },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      title: socialTitle,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? site.url : `${site.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
