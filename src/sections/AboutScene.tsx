"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function AboutScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const creator = PORTFOLIO_DATA.creator;

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1
            }
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(textRef.current, { opacity: 1, y: 0 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-[70vh] bg-paper flex items-center justify-center py-20 px-6 sm:px-12 lg:px-24 z-10 overflow-hidden"
    >
      <div
        ref={textRef}
        className="w-full max-w-4xl space-y-8"
      >
        <div className="flex items-center space-x-3">
          <span className="font-sans text-xs text-ink/55 uppercase tracking-widest">
            ABOUT // PHILOSOPHY
          </span>
          <span className="w-8 h-[1px] bg-ink/20" />
        </div>

        <h3 className="display text-3xl sm:text-5xl lg:text-6xl text-ink leading-tight">
          Engineering systems that operate with{" "}
          <span className="italic font-light text-violet-300">
            autonomy, speed and craft.
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 text-ink/70 text-sm sm:text-base leading-relaxed">
          <p>
            I am a software engineer focused on building robust mobile applications, real-time voice & telephony pipelines, and coordinated multi-agent AI ecosystems.
          </p>
          <p>
            Whether architecting offline-first mobile databases, designing full-duplex conversational voice systems, or scaling verified real estate platforms, I prioritize direct execution and clean interfaces.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap gap-4 items-center">
          <a
            href={creator.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black font-sans text-xs font-medium uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href={creator.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-ink/25 text-ink font-sans text-xs font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            <span>GitHub Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
