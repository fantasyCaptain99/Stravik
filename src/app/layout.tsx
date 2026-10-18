import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/animations/motion-provider";

/**
 * Fonts are self-hosted via Fontsource (npm) rather than `next/font/google`.
 *
 * `next/font/google` downloads font files from fonts.googleapis.com at build
 * time. On networks where that host is slow or blocked the request times out,
 * the font module fails to resolve, and every route 500s. Fontsource ships
 * the same families as npm packages, so the build never touches the network
 * and is reproducible offline and in CI.
 *
 * The files are still self-hosted in the final bundle — no runtime requests
 * to Google, same privacy and performance characteristics.
 */
import "@fontsource-variable/outfit";
import "@fontsource-variable/inter";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/brand/icon-180.png", type: "image/png", sizes: "180x180" },
    ],
    apple: [{ url: "/brand/icon-180.png", sizes: "180x180" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#061511",
  colorScheme: "dark",
};

/**
 * Sets `.js-motion` on <html> before first paint. CSS only hides
 * animation targets when this class is present, so if JavaScript is
 * unavailable every section renders fully visible instead of blank.
 */
const MOTION_BOOTSTRAP = `
try {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-motion');
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* Organization + WebSite structured data. Deliberately minimal: no ratings,
     no review counts, no address, no employee numbers — nothing unverified. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        description: site.positioning,
        logo: `${site.url}/brand/icon-180.png`,
        ...(activeSocialUrls().length > 0 && { sameAs: activeSocialUrls() }),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return (
    /* `suppressHydrationWarning` is required here: the inline bootstrap
       script below adds `js-motion` to this element before React hydrates,
       so the server HTML and the live DOM intentionally differ. Without it
       React reports a mismatch and can discard and re-render the tree.
       `data-scroll-behavior` tells Next.js that smooth scrolling is
       deliberate, so it disables it during route transitions instead of
       warning. */
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: MOTION_BOOTSTRAP }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <MotionProvider />

        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function activeSocialUrls(): string[] {
  return site.socials.filter((s) => s.url.length > 0).map((s) => s.url);
}
