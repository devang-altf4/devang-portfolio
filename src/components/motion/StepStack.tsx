"use client";

import type { RefObject } from "react";
import { motion } from "framer-motion";

/**
 * The block that changes while a section is pinned. Steps are stacked in one
 * slot and wipe past each other under a clip — a crossfade would leave a
 * window where the slot reads empty. GSAP drives the wipe; `active` only
 * drives the icon, which is Framer Motion's.
 */

export interface Step {
  /** What the camera is framing here. */
  look: string;
  /** What was built in that region. Step one carries the narrative instead. */
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
  return (
    <div className="relative mt-9 pl-6">
      <span className="absolute left-0 top-0 h-full w-px bg-white/12" aria-hidden>
        <span ref={spineRef} className="block h-full w-px origin-top scale-y-0 bg-amethyst" />
      </span>

      <div ref={stepsRef} data-reveal className="relative h-[13rem] overflow-hidden lg:h-[12rem]">
        {steps.map((step, i) => (
          <div key={step.look} className="absolute inset-0">
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
                    active === i
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0.15, opacity: 0.45 }
                  }
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.svg>
              <p className="label tabular-nums text-amethyst-soft">
                {pad(i + 1)} / {pad(steps.length)}
              </p>
            </div>

            {/* `look` is set large above the plate, so it is not repeated here. */}
            <p className="mt-3 max-w-md text-[0.9375rem] leading-[1.65] text-white/75 lg:hidden">
              {step.look}
            </p>
            <p className="mt-3 max-w-md text-[0.875rem] leading-[1.75] text-white/60">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
