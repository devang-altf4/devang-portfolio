import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollField from "@/components/motion/ScrollField";
import Navigation from "@/components/ui/Navigation";
import Preloader from "@/components/ui/Preloader";
import "./globals.css";

/**
 * Unbounded for display: wide, rounded-square letterforms that read as
 * engineered without going cold — Devang picked it on a full-size specimen
 * after eleven other faces were turned down. Headlines step down in size from
 * the old Sora values because it sets much wider.
 *
 * Satoshi carries running copy and the small uppercase labels. It is not on
 * Google Fonts, so it loads from Fontshare's CSS in <head> below; the
 * fallback stack keeps text visible while it arrives (`display=swap`).
 */
const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["300", "400", "500", "600", "700"],
});

const SATOSHI_CSS = "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap";

const DESCRIPTION =
  "Devang Gupta, software engineer in Mumbai, available now. Multi-agent AI products, real-time voice agents, Android apps and native audio drivers.";

export const metadata: Metadata = {
  metadataBase: new URL("https://devangbuilds.me"),
  title: "Devang Gupta — Software Engineer",
  description: DESCRIPTION,
  openGraph: {
    title: "Devang Gupta — Software Engineer, available now",
    description: DESCRIPTION,
    url: "https://devangbuilds.me",
    siteName: "Devang Gupta",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devang Gupta — Software Engineer, available now",
    description: DESCRIPTION,
  },
  alternates: {
    canonical: "https://devangbuilds.me",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href={SATOSHI_CSS} />
      </head>
      <body className="bg-ink text-white antialiased">
        <Preloader />
        <ScrollField />
        <SmoothScroll>
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
