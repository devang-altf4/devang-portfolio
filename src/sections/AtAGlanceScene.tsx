"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { EASE, ENTER_START, initGsap } from "@/lib/motion";

/**
 * The ten-second read. A recruiter who never scrolls past this point should
 * still leave knowing what Devang builds, in what, what has shipped, and that
 * he can start now. Plain facts only — no invented metrics.
 */
const creator = PORTFOLIO_DATA.creator;

const FACTS = [
  {
    term: "Builds",
    detail: "Multi-agent AI products, real-time voice agents, Android apps and native audio drivers.",
  },
  {
    term: "Stack",
    detail: "TypeScript, Next.js, React Native, Python, FastAPI, Kotlin and C++.",
  },
  {
    term: "Shipped",
    detail: "An Android app on Google Play, a voice agent you can call from the browser, and an open-source USB audio driver.",
  },
  {
    term: "Status",
    detail: `${creator.availability} for full-time roles. ${creator.location}, open to remote or on-site.`,
  },
];

export default function AtAGlanceScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDListElement>(null);

  useGSAP(
    () => {
      initGsap();
      const mm = gsap.matchMedia();
      const rows = () => listRef.current?.children ?? [];

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          rows(),
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: EASE.soft,
            scrollTrigger: { trigger: sectionRef.current, start: ENTER_START },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(rows(), { opacity: 1, y: 0 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="at-a-glance"
      aria-label="At a glance"
      className="relative z-10 w-full bg-ink/88 px-6 py-16 sm:px-12 lg:px-[5vw] lg:py-24"
    >
      <dl
        ref={listRef}
        className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {FACTS.map(({ term, detail }) => (
          <div key={term} className="border-t border-white/12 pt-5">
            <dt className="label flex items-center gap-2 text-amethyst-soft">
              {term === "Status" && (
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amethyst opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amethyst-soft" />
                </span>
              )}
              {term}
            </dt>
            <dd className="mt-3 max-w-xs text-[0.9375rem] leading-[1.65] text-white/80">{detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
