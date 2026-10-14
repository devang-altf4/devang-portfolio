"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EMAIL_HREF, PORTFOLIO_DATA } from "@/data/portfolio";
import { EASE, initGsap, splitWords } from "@/lib/motion";
import { pageReady } from "@/lib/ready";

const creator = PORTFOLIO_DATA.creator;

export default function HeroScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const hireRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      initGsap();
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = splitWords(headlineRef.current);
        const pills = subtextRef.current?.children ?? [];

        // Built paused and held until the preloader lifts, so the opening
        // sequence is never spent behind a curtain.
        const intro = gsap
          .timeline({ paused: true, defaults: { ease: EASE.enter } })
          .fromTo(metaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9 }, 0)
          .fromTo(words, { yPercent: 120 }, { yPercent: 0, duration: 1.2, stagger: 0.05 }, 0.1)
          .fromTo(ruleRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.1 }, 0.55)
          .fromTo(pills, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 }, 0.7)
          .fromTo(hireRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.85)
          .fromTo(promptRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.95);

        pageReady.then(() => intro.play());

        // Leaving. No pin: the hero drifts up slower than the page so the
        // next ground climbs over it.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          })
          .to(headlineRef.current, { yPercent: -24, opacity: 0.3, ease: "none" }, 0)
          .to(subtextRef.current, { yPercent: -14, opacity: 0.18, ease: "none" }, 0)
          // Both ends stated for anything the intro also animates. A lazy
          // `.to()` records its start when first rendered — which is while the
          // intro still holds these at opacity 0 — so scrolling back to the top
          // used to restore them invisible. `immediateRender: false` keeps this
          // from fighting the intro before the preloader lifts.
          .fromTo(
            hireRef.current,
            { yPercent: 0, opacity: 1 },
            { yPercent: -10, opacity: 0.2, ease: "none", immediateRender: false },
            0
          )
          .fromTo(
            promptRef.current,
            { opacity: 1 },
            { opacity: 0, ease: "none", duration: 0.35, immediateRender: false },
            0
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [metaRef.current, headlineRef.current, subtextRef.current, hireRef.current, promptRef.current, ruleRef.current],
          { opacity: 1, y: 0, yPercent: 0, scaleX: 1 }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 flex min-h-screen w-full flex-col justify-between overflow-hidden bg-ink/80 px-6 py-24 sm:px-12 lg:px-24"
    >
      <div ref={metaRef} className="label flex items-center justify-between pt-8 text-white/55">
        <span>
          {creator.name} — {creator.role}
        </span>
        <span className="hidden sm:block">Selected works, 2024–2026</span>
      </div>

      <div className="my-auto max-w-6xl">
        <h1 ref={headlineRef} className="display-xl text-[clamp(2.1rem,6.6vw,6rem)] text-white">
          I build things that{" "}
          <span className="display-soft text-amethyst-soft">do things.</span>
        </h1>

        <span
          ref={ruleRef}
          className="mt-10 block h-px w-full origin-left bg-gradient-to-r from-amethyst via-amethyst/40 to-transparent"
          aria-hidden
        />

        <div
          ref={subtextRef}
          className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-lg tracking-wide text-white/65 sm:text-2xl"
        >
          <span className="font-medium text-white">Mobile.</span>
          <span className="h-1.5 w-1.5 rounded-full bg-amethyst" />
          <span className="font-medium text-white">Systems.</span>
          <span className="h-1.5 w-1.5 rounded-full bg-amethyst" />
          <span className="font-medium text-white">AI.</span>
        </div>

        {/* The ask, above the fold: who can hire, and the two ways to do it. */}
        <div
          ref={hireRef}
          className="mt-9 flex flex-col gap-5 sm:mt-11 lg:flex-row lg:items-center lg:gap-8"
        >
          <p className="max-w-md text-[0.9375rem] leading-[1.6] text-white/65 sm:text-base">
            <span className="font-medium text-white">{creator.availability}</span> for full-time
            engineering roles. Based in {creator.location}, open to remote or on-site.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={EMAIL_HREF}
              className="label inline-flex items-center gap-2 rounded-full bg-amethyst-deep px-5 py-3 text-white transition-colors hover:bg-amethyst-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst"
            >
              Email me
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={creator.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-white transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
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
        <span className="flex items-center gap-3">
          Scroll to explore
          {/* A mouse wheel that keeps travelling — the one looping cue on the page. */}
          <motion.svg viewBox="0 0 16 26" className="h-6 w-4 text-amethyst" fill="none" aria-hidden>
            <rect
              x="0.75"
              y="0.75"
              width="14.5"
              height="24.5"
              rx="7.25"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <motion.circle
              cx="8"
              cy="8"
              r="2"
              fill="currentColor"
              initial={{ cy: 8, opacity: 0 }}
              animate={{ cy: [8, 17, 8], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>
        </span>
      </div>
    </section>
  );
}
