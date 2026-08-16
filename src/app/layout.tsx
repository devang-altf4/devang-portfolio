import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollField from "@/components/motion/ScrollField";
import ProjectTransition from "@/components/motion/ProjectTransition";
import Navigation from "@/components/ui/Navigation";
import Preloader from "@/components/ui/Preloader";
import "./globals.css";

/**
 * Bricolage Grotesque for display: a grotesque with actual quirks — flared
 * stems, a tight throat — so headlines read as chosen rather than defaulted.
 * Manrope underneath it is geometric and quiet, and stays out of the way.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "wdth"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devangbuilds.me"),
  title: "Devang Gupta — Software Engineer",
  description:
    "Portfolio of Devang Gupta. I build things that do things. Mobile. Systems. AI.",
  openGraph: {
    title: "Devang Gupta — Software Engineer",
    description: "I build things that do things. Mobile. Systems. AI.",
    url: "https://devangbuilds.me",
    siteName: "Devang Gupta Portfolio",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://devangbuilds.me",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-ink text-white antialiased">
        <Preloader />
        <ScrollField />
        <SmoothScroll>
          <Navigation />
          <ProjectTransition />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
