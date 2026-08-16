"use client";

import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, stagger } from "animejs";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { markPageReady } from "@/lib/ready";

/**
 * The screenshots are the whole argument of this site, so the first one is
 * never allowed to pop in half-decoded. These are fetched behind the curtain.
 */
const CRITICAL = [
  "/assets/starz-app-overview.jpg",
  "/assets/starz-ai-rank.png",
  "/assets/starz-ai-post.png",
];

/** The manifest that counts itself in while the assets land. */
const MANIFEST = PORTFOLIO_DATA.projects.map((p) => ({
  number: p.projectNumber,
  title: p.title,
}));

/** Long enough to read as a sequence, capped so a dead asset can't trap anyone. */
const MIN_MS = 4200;
const MAX_MS = 8000;
/**
 * One beat per project, and the reveal must be a good deal shorter than the
 * beat — at 460ms of travel inside a 620ms beat the title was in motion three
 * quarters of the time and never sat still long enough to read.
 */
const STEP_MS = 700;
const REVEAL_MS = 300;

export default function Preloader() {
  const barRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [entry, setEntry] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.style.overflow = "hidden";

    /**
     * Releasing the page never depends on an animation callback. If a timeline
     * stalls or throws, a callback-driven unlock would leave the reader staring
     * at a curtain with `overflow: hidden` and no way to scroll.
     */
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      document.documentElement.style.overflow = "";
      setGone(true);
      markPageReady();
    };

    if (reduced) {
      window.setTimeout(unlock, 300);
      return () => {
        document.documentElement.style.overflow = "";
      };
    }

    const started = performance.now();
    let done = false;
    let settled = 0;

    /*
     * The bar and the readout are written straight to their nodes rather than
     * through state. They update every frame, and re-rendering the component
     * sixty times a second to move one number is wasted work — this also keeps
     * the bar and the number mathematically identical, since both read the
     * same value in the same frame.
     */
    let raf = requestAnimationFrame(function tick() {
      const byTime = Math.min(1, (performance.now() - started) / MIN_MS);
      const byAsset = settled / CRITICAL.length;
      const p = Math.min(byTime, 0.35 + byAsset * 0.65);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (numRef.current) numRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      raf = requestAnimationFrame(tick);
    });

    const bump = () => {
      settled += 1;
    };
    CRITICAL.forEach((src) => {
      const img = new Image();
      img.onload = bump;
      img.onerror = bump;
      img.src = src;
    });

    // The manifest counts itself in, one project per beat.
    const cycle = window.setInterval(() => {
      setEntry((i) => {
        const next = Math.min(i + 1, MANIFEST.length - 1);
        if (lineRef.current) {
          animate(lineRef.current, {
            translateY: ["62%", "0%"],
            opacity: [0, 1],
            duration: REVEAL_MS,
            ease: "outExpo",
          });
        }
        return next;
      });
    }, STEP_MS);

    let exitTimer = 0;
    const EXIT_MS = 1250;

    const finish = () => {
      if (done) return;
      done = true;

      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      window.setTimeout(() => {
        cancelAnimationFrame(raf);
        window.clearInterval(cycle);
        if (barRef.current) barRef.current.style.transform = "scaleX(1)";
        if (numRef.current) numRef.current.textContent = "100";
        setEntry(MANIFEST.length - 1);

        try {
          createTimeline()
            .add(bodyRef.current!, { opacity: 0, translateY: -24, duration: 460, ease: "inQuad" }, 0)
            .add(
              barsRef.current ? Array.from(barsRef.current.children) : [],
              {
                translateY: ["0%", "-101%"],
                duration: 820,
                ease: "inOutExpo",
                delay: stagger(58),
              },
              300
            );
        } catch (err) {
          console.error("[Preloader] exit animation failed; lifting anyway", err);
        }

        exitTimer = window.setTimeout(unlock, EXIT_MS);
      }, wait);
    };

    const poll = window.setInterval(() => {
      if (settled >= CRITICAL.length) finish();
    }, 100);
    window.addEventListener("load", finish);
    const ceiling = window.setTimeout(finish, MAX_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(poll);
      window.clearInterval(cycle);
      window.clearTimeout(ceiling);
      window.clearTimeout(exitTimer);
      window.removeEventListener("load", finish);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  const current = MANIFEST[entry] ?? MANIFEST[0];

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden>
      {/* The curtain: panels that lift in sequence rather than one flat fade. */}
      <div ref={barsRef} className="absolute inset-0 flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="preloader-bar h-full flex-1 bg-ink" />
        ))}
      </div>

      <div
        ref={bodyRef}
        className="absolute inset-0 flex flex-col justify-between px-6 py-10 sm:px-12 sm:py-14 lg:px-20"
      >
        <div className="label flex items-center justify-between text-white/55">
          <span>Devang Gupta — Software Engineer</span>
          <span className="hidden sm:block">Selected works</span>
        </div>

        <div className="flex flex-col gap-10">
          {/*
            The mask height is in rem, not em. `em` resolved against this
            container's own inherited 16px rather than the display type inside
            it, which clipped the project titles through their middle. It is
            taller on narrow screens, where the longest title wraps to two lines.
          */}
          <div className="h-[4.75rem] overflow-hidden sm:h-[3.75rem]">
            <div ref={lineRef} className="flex items-baseline gap-4">
              <span className="label tabular-nums text-amethyst-soft">{current.number}</span>
              <span className="display text-[clamp(1.4rem,3.6vw,2.4rem)] leading-[1.2] text-white">
                {current.title}
              </span>
            </div>
          </div>

          <div className="flex items-end gap-6 sm:gap-10">
            <div className="flex-1">
              <div className="label mb-3 flex items-center justify-between text-white/45">
                <span>Loading interfaces, video and telemetry</span>
                <span className="hidden sm:block">{MANIFEST.length} projects</span>
              </div>

              {/* The progress bar. Scaled on the compositor, never re-laid out. */}
              <span className="relative block h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <span
                  ref={barRef}
                  className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-amethyst-deep via-amethyst to-amethyst-soft"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>
            </div>

            <span
              ref={numRef}
              className="display tabular-nums text-[clamp(1.6rem,4vw,2.6rem)] leading-none text-white"
            >
              000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
