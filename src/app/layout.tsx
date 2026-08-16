import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollField from "@/components/motion/ScrollField";
import ProjectTransition from "@/components/motion/ProjectTransition";
import Navigation from "@/components/ui/Navigation";
import Preloader from "@/components/ui/Preloader";
import "./globals.css";

/**
 * Sora for display: a geometric sans drawn for technical subjects, with heavy
 * weights that stay clean at poster size instead of getting quirky. Inter
 * underneath handles running copy and the small uppercase labels, where its
 * tall x-height keeps 11px type legible.
 */
const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const sans = Inter({
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
