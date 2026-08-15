"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function ContactScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const creator = PORTFOLIO_DATA.creator;

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
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
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen bg-ink flex flex-col justify-between py-24 px-6 sm:px-12 lg:px-24 z-10 overflow-hidden"
    >
      <div className="flex items-center space-x-3 text-xs font-sans text-neutral-400 uppercase tracking-widest pt-8">
        <span>GET IN TOUCH</span>
        <span className="w-8 h-[1px] bg-white/20" />
      </div>

      <div
        ref={contentRef}
        className="my-auto max-w-5xl space-y-8"
      >
        <h2 className="display text-4xl sm:text-7xl lg:text-8xl text-white leading-tight">
          Have something worth building?{" "}
          <span className="italic font-light text-violet-300 block text-3xl sm:text-6xl lg:text-7xl mt-2">
            Let&apos;s talk.
          </span>
        </h2>

        <p className="font-sans text-base sm:text-xl text-neutral-300 max-w-2xl leading-relaxed">
          Open to engineering leadership, systems architecture, and high-impact software builds.
        </p>

        <div className="pt-4 flex flex-wrap gap-4 items-center">
          <a
            href={`mailto:${creator.email}`}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-white text-black font-sans text-xs font-medium uppercase tracking-wider hover:bg-violet-200 transition-colors"
          >
            <span>{creator.email}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={creator.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-neutral-900 border border-white/20 text-white font-sans text-xs font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={creator.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-neutral-900 border border-white/20 text-white font-sans text-xs font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 text-xs font-sans text-neutral-400 gap-4">
        <div>© {new Date().getFullYear()} Devang Gupta. All rights reserved.</div>
        <div>Engineered with Next.js, TypeScript & GSAP.</div>
      </div>
    </section>
  );
}
