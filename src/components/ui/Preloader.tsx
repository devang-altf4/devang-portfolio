"use client";

import { useEffect, useRef, useState } from "react";
import { animate, createDrawable, createTimeline, stagger } from "animejs";
import { markPageReady } from "@/lib/ready";

/**
 * The screenshots are the whole argument of this site, so the first one is
 * never allowed to pop in half-decoded. These are fetched behind the loader.
 */
const CRITICAL = [
  "/assets/starz-app-overview.jpg",
  "/assets/starz-ai-rank.png",
  "/assets/starz-ai-post.png",
];

/** Floor so the sequence reads as deliberate; ceiling so a dead asset can't trap anyone. */
const MIN_MS = 1500;
const MAX_MS = 6000;

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.style.overflow = "hidden";

    // `shown` is what the reader sees: it eases toward `target` rather than
    // jumping, so a burst of three assets resolving at once still counts up.
    let target = 0;
    let shown = 0;
    let done = false;
    let raf = 0;

    const started = performance.now();

    const tick = () => {
      shown += (target - shown) * 0.08;
      setPct(Math.min(100, Math.round(shown)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let settled = 0;
    const bump = () => {
      settled += 1;
      target = Math.max(target, (settled / CRITICAL.length) * 100);
    };

    CRITICAL.forEach((src) => {
      const img = new Image();
      img.onload = bump;
      img.onerror = bump;
      img.src = src;
    });

    /**
     * Releasing the page is never allowed to depend on an animation callback.
     * If anime's timeline stalls or throws, the reader would be left staring
     * at a curtain with `overflow: hidden` and no way to scroll — so the
     * unlock runs off its own timer and the visuals are strictly decorative.
     */
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
      setGone(true);
      markPageReady();
    };

    const EXIT_MS = 1300;

    const finish = () => {
      if (done) return;
      done = true;
      target = 100;

      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      window.setTimeout(() => {
        setPct(100);
        spinners.forEach((s) => {
          try {
            s.pause();
          } catch {
            /* the spinner is cosmetic; never let it block the exit */
          }
        });

        if (reduced) {
          unlock();
          return;
        }

        try {
          createTimeline()
            .add(bodyRef.current!, { opacity: 0, scale: 0.94, duration: 420, ease: "inQuad" }, 0)
            .add(
              barsRef.current ? Array.from(barsRef.current.children) : [],
              {
                translateY: ["0%", "-101%"],
                duration: 780,
                ease: "inOutExpo",
                delay: stagger(55),
              },
              260
            );
        } catch (err) {
          console.error("[Preloader] exit animation failed; lifting anyway", err);
        }

        exitTimer = window.setTimeout(unlock, EXIT_MS);
      }, wait);
    };

    // Registered before the spinners, so a failure building those can never
    // strand the page without a way to finish.
    const poll = window.setInterval(() => {
      if (settled >= CRITICAL.length) finish();
    }, 80);
    window.addEventListener("load", finish);
    const ceiling = window.setTimeout(finish, MAX_MS);
    let exitTimer = 0;

    let spinners: { pause: () => void }[] = [];
    if (!reduced) {
      try {
        spinners = [
          // The arc sweeps open and closed while the ring turns under it.
          animate(createDrawable(arcRef.current!), {
            draw: ["0 0.06", "0 0.82", "0.94 1"],
            ease: "inOutQuad",
            duration: 1700,
            loop: true,
          }),
          animate(ringRef.current!, {
            rotate: 360,
            ease: "linear",
            duration: 2400,
            loop: true,
          }),
        ];
      } catch (err) {
        console.error("[Preloader] spinner unavailable", err);
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(poll);
      window.clearTimeout(ceiling);
      window.clearTimeout(exitTimer);
      window.removeEventListener("load", finish);
      spinners.forEach((s) => {
        try {
          s.pause();
        } catch {
          /* nothing to clean up */
        }
      });
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]" aria-hidden>
      {/* The curtain: panels that lift in sequence rather than one flat fade. */}
      <div ref={barsRef} className="absolute inset-0 flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="preloader-bar h-full flex-1 bg-ink" />
        ))}
      </div>

      <div
        ref={bodyRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-8"
      >
        <div className="relative h-24 w-24">
          <svg ref={ringRef} viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5" />
            <circle
              ref={arcRef}
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="var(--color-amethyst)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="label absolute inset-0 flex items-center justify-center tabular-nums text-white">
            {String(pct).padStart(3, "0")}
          </span>
        </div>

        <div className="text-center">
          <p className="display text-2xl text-white">Devang Gupta</p>
          <p className="label mt-2 text-amethyst-soft">Loading selected works</p>
        </div>
      </div>
    </div>
  );
}
