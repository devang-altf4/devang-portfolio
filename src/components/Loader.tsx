"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/site";
import { markPageReady } from "./ready";

/**
 * The opening (~2.8 s), then the reveal (~1 s).
 *
 * The intro footage pulls back from the monolith's glowing seam while a blade
 * of amber light sweeps across Devang's name. Then the seam opens: a gap
 * splits the opening from the seam outward, two amber beams riding its edges,
 * and the website is revealed inside it — the hero's footage starts on the
 * same frame and the name is already in the same place, so the page appears
 * through the light rather than after a fade.
 *
 * Timing is CSS from first paint. Release is a timer read off the overlay's
 * own animation clock, with a hard ceiling so a video that never plays still
 * hands over on time; a CSS failsafe hides the overlay at 6 s if JavaScript
 * never runs at all.
 */

const RELEASE_MS = 2800;
const CEILING_MS = 3500;
/** Length of the seam opening; mirrors `beam-open` in globals.css. */
const OPEN_MS = 1000;
const QUICK_MS = 120;
const SEEN_KEY = "dg-opening-seen";

export default function Loader() {
  const [phase, setPhase] = useState<"play" | "out" | "gone">("play");
  const [quick, setQuick] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage blocked: play the full opening.
    }
    const fast = reduced || seen;
    setQuick(fast);

    const html = document.documentElement;
    html.style.overflow = "hidden";

    let done = false;
    const timers: number[] = [];
    const release = () => {
      if (done) return;
      done = true;
      html.style.overflow = "";
      markPageReady();
      setPhase("out");
      timers.push(window.setTimeout(() => setPhase("gone"), (fast ? QUICK_MS : OPEN_MS) + 100));
    };

    if (fast) {
      timers.push(window.setTimeout(release, QUICK_MS));
    } else {
      // The failsafe animation on the overlay runs to 6 s, so its clock is
      // live for the whole opening; the name sweep's stops at 2 s.
      const failsafe = rootRef.current
        ?.getAnimations?.()
        .find((a) => (a as CSSAnimation).animationName === "loader-failsafe");
      const clock = failsafe?.currentTime;
      const elapsed = typeof clock === "number" ? clock : 0;
      timers.push(
        window.setTimeout(release, Math.max(100, RELEASE_MS - elapsed)),
        window.setTimeout(release, CEILING_MS)
      );
      videoRef.current?.addEventListener("ended", release, { once: true });
    }

    return () => {
      timers.forEach(window.clearTimeout);
      html.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      ref={rootRef}
      className={`loader fixed inset-0 z-[100] ${phase === "out" ? "loader-out" : ""} ${quick ? "loader-quick" : ""}`}
      aria-hidden
    >
      {/* Everything the seam splits. The mask that opens the gap lives here. */}
      <div className="loader-stage absolute inset-0 bg-ink">
        {!quick && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover [object-position:74%_50%]"
            src="/media/intro.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
          />
        )}

        {/* Same box as the hero headline, so the hand-off lands in place. */}
        <div className="hero-copy absolute inset-0">
          <p className="loader-name display hero-name">
            {profile.name}
            <span className="loader-blade" />
          </p>
          <p className="loader-role mt-6 text-base text-muted sm:text-lg">
            {profile.role} — {profile.location}
          </p>
        </div>
      </div>

      {/* The two beams that ride the gap's edges as it opens. */}
      <span className="loader-beam loader-beam-l" />
      <span className="loader-beam loader-beam-r" />
    </div>
  );
}
