import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import { profile } from "@/content/site";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Loader from "@/components/Loader";
import "./globals.css";

/*
 * Cinzel (display) through next/font; Switzer (body) from Fontshare.
 */
const cinzel = Cinzel({ subsets: ["latin"], weight: ["600"], variable: "--font-cinzel" });

const FONTSHARE = "https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap";

const DESCRIPTION = `${profile.name}, ${profile.role.toLowerCase()} in Mumbai. Cinematic frontends, real-time voice AI and multi-agent products.`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: `${profile.name} — ${profile.role}`,
  description: DESCRIPTION,
  openGraph: { title: `${profile.name} — ${profile.role}`, description: DESCRIPTION, url: profile.site, type: "website" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: profile.site },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cinzel.variable}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTSHARE} />
      </head>
      <body className="bg-ink text-paper">
        <Loader />
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
