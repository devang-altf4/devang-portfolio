"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function MoreBuildsScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const moreBuilds = PORTFOLIO_DATA.moreBuilds;

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 40%",
              scrub: 1
            }
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cardRef.current, { opacity: 1, y: 0 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="more-builds"
      className="relative w-full min-h-[60vh] bg-paper flex items-center justify-center py-20 px-6 sm:px-12 lg:px-24 z-10 overflow-hidden"
    >
      <div
        ref={cardRef}
        className="w-full max-w-4xl p-8 sm:p-12 rounded-3xl bg-neutral-900/40 border border-ink/15 backdrop-blur-sm text-center space-y-6"
      >
        <div className="font-sans text-xs text-ink/55 uppercase tracking-widest">
          {moreBuilds.eyebrow}
        </div>

        <h3 className="display text-3xl sm:text-5xl text-ink leading-tight">
          {moreBuilds.heading}
        </h3>

        <div className="pt-4 flex justify-center">
          <a
            href={moreBuilds.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black font-sans text-xs font-medium uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            <span>{moreBuilds.ctaLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
