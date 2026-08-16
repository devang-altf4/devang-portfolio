"use client";

import { useEffect, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { STACKED_STEPS } from "@/lib/motion";

/**
 * The block that changes while a section is pinned.
 *
 * Two layouts, and the difference matters. Wherever the section pins — desktop
 * and any phone tall enough — the steps are stacked in one slot and wipe past
 * each other as the scroll advances. Where it cannot pin (very short
 * viewports) nothing would drive them, and stacked blocks with nothing to
 * offset them all render on top of one another, so those fall back to a list.
 *
 * `STACKED_STEPS` is the single source of truth shared with the GSAP branches.
 */

export interface Step {
  /** What the scene is showing here. Set large above the plate on desktop. */
  look: string;
  /** What was built there. Step one carries the narrative instead. */
  body: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** One line-drawn glyph per step position, redrawn each time the step lands. */
const GLYPHS = [
  // Whole view: a frame.
  "M4 5.5h16v13H4z",
  // A region: crosshair on a box.
  "M4 6h9v9H4z M15 12h5 M17.5 9.5v5 M8.5 15v5 M6 17.5h5",
  // A measure: stepped bars.
  "M4 19V13 M9.3 19V9 M14.6 19v-8 M20 19V5",
  // A flow: nodes joined.
  "M5 8h5v4H5z M14 12h5v4h-5z M10 10h4 M12 10v4",
];

/** Only the pinned layout has an "active" step; the list shows them all. */
function useStacked() {
  // Defaults to stacked, which is what almost every viewport resolves to —
  // the correction below only fires on genuinely short screens.
  const [stacked, setStacked] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia(STACKED_STEPS);
    const sync = () => setStacked(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return stacked;
}

export default function StepStack({
  steps,
  active,
  stepsRef,
  spineRef,
}: {
  steps: Step[];
  active: number;
  stepsRef: RefObject<HTMLDivElement | null>;
  spineRef: RefObject<HTMLSpanElement | null>;
}) {
  const stacked = useStacked();

  return (
    <div className="relative mt-6 pl-5 sm:mt-8 sm:pl-6">
      <span className="absolute left-0 top-0 h-full w-px bg-white/12" aria-hidden>
        <span ref={spineRef} className="block h-full w-px origin-top scale-y-0 bg-amethyst" />
      </span>

      <div
        ref={stepsRef}
        data-reveal
        className={
          stacked
            ? "relative h-[9.5rem] overflow-hidden sm:h-[11rem] lg:h-[12rem]"
            : "relative space-y-7"
        }
      >
        {steps.map((step, i) => (
          <div key={step.look} className={stacked ? "absolute inset-0" : ""}>
            <div className="flex items-center gap-3">
              <motion.svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-amethyst"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <motion.path
                  d={GLYPHS[i % GLYPHS.length]}
                  initial={false}
                  animate={
                    stacked && active !== i
                      ? { pathLength: 0.15, opacity: 0.45 }
                      : { pathLength: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.svg>
              <p className="label tabular-nums text-amethyst-soft">
                {pad(i + 1)} / {pad(steps.length)}
              </p>
            </div>

            {/* `look` is set large above the plate on desktop, so it is only
                printed here on the narrow layout where that band is hidden. */}
            <p className="mt-3 text-[0.9375rem] leading-[1.55] text-white lg:hidden">{step.look}</p>
            <p className="mt-2 max-w-md text-[0.8125rem] leading-[1.7] text-white/60 sm:text-[0.875rem] sm:leading-[1.75]">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
