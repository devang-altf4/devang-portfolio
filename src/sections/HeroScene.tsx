"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowDown } from "lucide-react";
import { EASE, initGsap, splitWords } from "@/lib/motion";

export default function HeroScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      initGsap();
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = splitWords(headlineRef.current);
        const pills = subtextRef.current?.children ?? [];

        // Page load. Nothing waits on scroll — the first thing a reader sees
        // is the page assembling itself.
        gsap
          .timeline({ defaults: { ease: EASE.enter } })
          .fromTo(metaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9 }, 0.1)
          .fromTo(words, { yPercent: 120 }, { yPercent: 0, duration: 1.15, stagger: 0.055 }, 0.2)
          .fromTo(pills, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 }, 0.75)
          .fromTo(promptRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.95);

        // Leaving. No pin: the hero simply drifts up a little slower than the
        // page so the next ground can climb over it.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          })
          .to(headlineRef.current, { yPercent: -22, opacity: 0.35, ease: "none" }, 0)
          .to(subtextRef.current, { yPercent: -14, opacity: 0.2, ease: "none" }, 0)
          .to(promptRef.current, { opacity: 0, ease: "none", duration: 0.35 }, 0);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [metaRef.current, headlineRef.current, subtextRef.current, promptRef.current],
          { opacity: 1, y: 0, yPercent: 0 }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 flex min-h-screen w-full flex-col justify-between overflow-hidden bg-ink px-6 py-24 sm:px-12 lg:px-24"
    >
      <div
        ref={metaRef}
        className="label flex items-center justify-between pt-8 text-white/55"
      >
        <span>
          {PORTFOLIO_DATA.creator.name} — {PORTFOLIO_DATA.creator.role}
        </span>
        <span className="hidden sm:block">Selected works, 2024–2026</span>
      </div>

      <div className="my-auto max-w-5xl space-y-7">
        <h1
          ref={headlineRef}
          className="display text-5xl leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl"
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
          className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-lg tracking-wider text-white/65 sm:text-2xl"
        >
          <span className="font-medium text-white">Mobile.</span>
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
          <span className="font-medium text-white">Systems.</span>
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
          <span className="font-medium text-white">AI.</span>
        </div>
      </div>

      <div
        ref={promptRef}
        className="label flex items-center justify-between border-t border-white/10 pt-6 text-white/55"
      >
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amethyst" />
          Autonomous agents &amp; production platforms
        </span>
        <span className="flex items-center gap-2">
          Scroll to explore
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </span>
      </div>
    </section>
  );
}
