"use client";

import { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { markPageReady } from "@/lib/ready";

/**
 * The opening — a boot sequence in three acts, about 3.7s to the reveal:
 *
 * 1. Boot (0–2.4s). A giant counter climbs 000 → 100 while a log ticks
 *    through the projects, each line stamping a purple "ok" at the end of a
 *    dotted leader, and a bar fills along the bottom edge.
 * 2. Name (2.5–3.45s). The counter and log lift away and the name rises
 *    letter by letter, with the role and availability beneath it.
 * 3. Open (3.45s on). A purple seam flashes across the middle, then the
 *    screen splits — top half up, bottom half down — into the hero.
 *
 * The whole sequence, split included, is CSS animation timed from first
 * paint, so it plays identically however late React hydrates; the counter is
 * a registered integer property drawn through a CSS counter. JavaScript only
 * releases the page (scroll lock, hero entrance) on a timer read from the
 * CSS animation's own clock, and removes the overlay — its resting state never depends
 * on an animation callback. A CSS failsafe hides it at 7s if JavaScript never
 * runs at all. Timings are mirrored in globals.css (`.boot-*`).
 */

const { creator, projects } = PORTFOLIO_DATA;

const LOG: { verb: string; what: string; ok: boolean }[] = [
  { verb: "init", what: "runtime", ok: true },
  ...projects.map((p) => ({ verb: "load", what: p.title, ok: true })),
  { verb: "ready", what: `${creator.availability.toLowerCase()} — ${creator.location.split(",")[0]}`, ok: false },
];

/** Log rhythm, in ms from first paint. */
const LINE_START = 200;
const LINE_GAP = 360;
/** When the halves start to part; the hero's entrance starts here too. */
const SPLIT_MS = 3750;
const SPLIT_DURATION = 800;
/** Repeat visits in one session, and reduced motion, get a short fade instead. */
const QUICK_OUT_MS = 120;
const QUICK_FADE_MS = 380;

const SEEN_KEY = "dg-intro-seen";

export default function Preloader() {
  const [phase, setPhase] = useState<"boot" | "fade" | "gone">("boot");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === "1";
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage can be blocked; the full sequence is the safe fallback.
    }
    const fast = reduced || seen;

    const html = document.documentElement;
    html.style.overflow = "hidden";

    const release = () => {
      html.style.overflow = "";
      markPageReady();
    };

    const timers: number[] = [];
    if (fast) {
      timers.push(
        window.setTimeout(() => {
          release();
          setPhase("fade");
        }, QUICK_OUT_MS),
        window.setTimeout(() => setPhase("gone"), QUICK_OUT_MS + QUICK_FADE_MS + 60)
      );
    } else {
      // Read the CSS's own clock rather than navigation start. The CSS starts
      // when the page first renders, which on a slow connection (or the dev
      // server) is well after navigation — timing from navigation released
      // the page and pulled the overlay mid-sequence, before the split.
      // `currentTime` is how long the CSS has actually played. It is read off
      // the split itself, the longest-running animation: a shorter one (the
      // counter, 2.4s) stops its clock when it finishes, and a hydration that
      // late would read a stale time and release after the split.
      const clock = document.querySelector(".boot-top")?.getAnimations?.()[0]?.currentTime;
      const elapsed = typeof clock === "number" ? clock : performance.now();
      const splitAt = Math.max(150, SPLIT_MS - elapsed);
      timers.push(
        window.setTimeout(release, splitAt),
        window.setTimeout(() => setPhase("gone"), splitAt + SPLIT_DURATION + 100)
      );
    }

    return () => {
      timers.forEach(window.clearTimeout);
      html.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`boot fixed inset-0 z-[100] ${phase === "fade" ? "boot-fade" : ""}`} aria-hidden>
      <div className="boot-half boot-top" />
      <div className="boot-half boot-bottom" />

      {/* Act 1: the boot. */}
      <div className="boot-body absolute inset-0 flex flex-col justify-center px-6 sm:px-[6vw]">
        <div className="label absolute inset-x-6 top-7 flex justify-between text-white/55 sm:inset-x-[6vw]">
          <span>{creator.name} — Portfolio</span>
          <span className="hidden sm:block">devangbuilds.me</span>
        </div>

        <p className="boot-count">
          <span className="boot-num" />
          <small>%</small>
        </p>

        <div className="boot-log mt-7 w-full max-w-[30rem]">
          {LOG.map(({ verb, what, ok }, i) => (
            <div
              key={verb + what}
              className={ok ? "" : "boot-ready"}
              style={{ "--d": `${LINE_START + i * LINE_GAP}ms` } as React.CSSProperties}
            >
              <b>{verb}</b>
              <span className="boot-what">{what}</span>
              {ok ? (
                <>
                  <span className="boot-leader" />
                  <span className="boot-ok">ok</span>
                </>
              ) : (
                <span className="boot-caret" />
              )}
            </div>
          ))}
        </div>

        <span className="boot-bar" />
      </div>

      {/* Act 2: the name. */}
      <div className="boot-name absolute inset-0 flex flex-col justify-center px-6 sm:px-[6vw]">
        <p className="boot-name-line display-xl">
          {Array.from(creator.name).map((ch, i) => (
            <span key={i} style={{ "--i": i } as React.CSSProperties}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </p>
        <p className="boot-name-sub label mt-5 flex items-center gap-2.5 text-white/65 sm:mt-6">
          <span className="h-1.5 w-1.5 rounded-full bg-amethyst-soft" />
          {creator.role} — {creator.availability.toLowerCase()}
        </p>
      </div>

      {/* Act 3: the seam the screen splits along. */}
      <span className="boot-seam" />
    </div>
  );
}
