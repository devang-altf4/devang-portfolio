"use client";

import type { RefObject } from "react";

/**
 * The line above the plate that says what you are looking at. Phrases are
 * stacked in one band and rise past each other word by word as the scroll
 * advances, over the threads background.
 *
 * This replaced a frame that moved around inside the screenshot. Marking a
 * region on the image meant the reader had to hunt for what changed; saying it
 * in words above the image reads immediately, and leaves the interface
 * completely untouched.
 */
export default function PhraseBand({
  phrases,
  bandRef,
  align = "left",
}: {
  phrases: string[];
  bandRef: RefObject<HTMLDivElement | null>;
  align?: "left" | "right";
}) {
  return (
    <div
      ref={bandRef}
      className="relative hidden h-[5.5rem] w-full lg:block"
      aria-hidden
    >
      {phrases.map((phrase) => (
        <p
          key={phrase}
          className={`display absolute inset-x-0 bottom-0 text-[clamp(1.1rem,2vw,1.75rem)] leading-[1.25] text-white ${
            align === "right" ? "text-right" : "text-left"
          }`}
        >
          {phrase}
        </p>
      ))}
    </div>
  );
}
