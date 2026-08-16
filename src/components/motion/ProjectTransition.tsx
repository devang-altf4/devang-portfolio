"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, createTimeline, stagger, utils } from "animejs";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { initGsap } from "@/lib/motion";
import { pageReady } from "@/lib/ready";

/** The section that opens each project — crossing into it is a chapter break. */
const OPENERS = [
  { id: "starz-overview", project: PORTFOLIO_DATA.projects[0] },
  { id: "readora-main", project: PORTFOLIO_DATA.projects[1] },
  { id: "calling-main", project: PORTFOLIO_DATA.projects[2] },
  { id: "estatex-main", project: PORTFOLIO_DATA.projects[3] },
  { id: "reel-main", project: PORTFOLIO_DATA.projects[4] },
  { id: "peerly-main", project: PORTFOLIO_DATA.projects[5] },
];

const PANELS = 7;
const REST = "translateY(101%)";
/** Sweep in, carry the card, sweep out. */
const TOTAL_MS = 1400;

export default function ProjectTransition() {
  const [card, setCard] = useState({ number: "", title: "" });
  const panelsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const running = useRef(false);
  const resetTimer = useRef(0);

  useEffect(() => {
    initGsap();
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    const panels = () => (panelsRef.current ? Array.from(panelsRef.current.children) : []);

    /**
     * The panels cover the whole viewport mid-sweep, so their resting position
     * is driven by a timer rather than the timeline's onComplete. If anime
     * stalls — an empty target set is enough — a callback-driven reset would
     * strand an opaque curtain over the page with no way to clear it.
     */
    const rest = () => {
      utils.set(panels(), { transform: REST });
      utils.set(cardRef.current!, { opacity: 0 });
      running.current = false;
      setCard({ number: "", title: "" });
    };

    const play = (number: string, title: string) => {
      if (running.current) return;
      running.current = true;
      setCard({ number, title });

      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(rest, TOTAL_MS);

      try {
        createTimeline()
          .add(
            panels(),
            { translateY: ["101%", "0%"], duration: 420, ease: "inOutExpo", delay: stagger(38) },
            0
          )
          .add(
            panels(),
            { translateY: ["0%", "-101%"], duration: 500, ease: "inOutExpo", delay: stagger(38) },
            700
          );

        // The card is animated separately: it is rendered from state, so it
        // only exists in the DOM on the render after `setCard`.
        animate(cardRef.current!, {
          opacity: [0, 1, 1, 0],
          translateY: [18, 0, 0, -10],
          duration: 1000,
          ease: "outExpo",
          delay: 320,
        });
      } catch (err) {
        console.error("[ProjectTransition] sweep failed; resetting", err);
        rest();
      }
    };

    // Arm only once the preloader is gone, so the first project doesn't fire
    // a chapter break the reader never sees.
    pageReady.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        OPENERS.forEach(({ id, project }) => {
          const el = document.getElementById(id);
          if (!el) return;
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            onEnter: () => play(project.projectNumber, project.title),
            onEnterBack: () => play(project.projectNumber, project.title),
          });
        });
      });
    });

    return () => {
      cancelled = true;
      window.clearTimeout(resetTimer.current);
      ctx?.revert();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden>
      <div ref={panelsRef} className="absolute inset-0 flex">
        {/*
          The resting offset is an inline `transform`, not Tailwind's
          `translate-y-full`. Tailwind v4 emits the standalone `translate`
          property, which composes with the `transform` anime.js writes rather
          than being overridden by it — the two stack, and the panels settle
          over the viewport instead of off it.
        */}
        {Array.from({ length: PANELS }).map((_, i) => (
          <div
            key={i}
            className="pt-panel h-full flex-1 border-r border-amethyst/25 bg-ink"
            style={{ transform: REST }}
          />
        ))}
      </div>

      {/* Always mounted, so anime always has something to resolve. */}
      <div
        ref={cardRef}
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ opacity: 0 }}
      >
        <span className="label tabular-nums text-amethyst-soft">{card.number}</span>
        <span className="display mt-3 text-[clamp(2rem,6vw,4.5rem)] text-white">{card.title}</span>
      </div>
    </div>
  );
}
