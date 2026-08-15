"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowDown } from "lucide-react";

export default function HeroScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        tl.to(headlineRef.current, {
          y: -40,
          opacity: 0.2,
          ease: "power1.inOut"
        })
        .to(subtextRef.current, {
          y: -20,
          opacity: 0.1,
          ease: "power1.inOut"
        }, "<")
        .to(promptRef.current, {
          opacity: 0,
          duration: 0.5
        }, "<");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([headlineRef.current, subtextRef.current, promptRef.current], { opacity: 1, y: 0 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen bg-ink flex flex-col justify-between py-24 px-6 sm:px-12 lg:px-24 z-10 overflow-hidden"
    >
      {/* Subtle Top Atmosphere */}
      <div className="flex items-center justify-between text-xs font-sans text-neutral-400 uppercase tracking-widest pt-8">
        <div>{PORTFOLIO_DATA.creator.name} — {PORTFOLIO_DATA.creator.role}</div>
        <div className="hidden sm:block">SELECTED WORKS (2024–2026)</div>
      </div>

      {/* Centerpiece Monologue (Pear-agency editorial style) */}
      <div className="my-auto max-w-5xl space-y-6">
        <h1
          ref={headlineRef}
          className="display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-[1.05]"
        >
          I build things that{" "}
          <span
            className="text-white/55"
            style={{ fontVariationSettings: '"wdth" 78', fontWeight: 400 }}
          >
            do things.
          </span>
        </h1>

        <div
          ref={subtextRef}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-lg sm:text-2xl font-sans text-neutral-300 tracking-wider pt-2"
        >
          <span className="text-white font-medium">Mobile.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
          <span className="text-white font-medium">Systems.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
          <span className="text-white font-medium">AI.</span>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div
        ref={promptRef}
        className="flex items-center justify-between border-t border-white/10 pt-6 text-xs font-sans text-neutral-400"
      >
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span>AUTONOMOUS AGENTS & PRODUCTION PLATFORMS</span>
        </div>
        <div className="flex items-center space-x-2 text-neutral-400">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
