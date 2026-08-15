import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Navigation from "@/components/ui/Navigation";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["wdth"],
});

const inter = Inter({
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
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body className="bg-ink text-paper antialiased">
        <SmoothScroll>
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
