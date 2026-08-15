"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "starz-overview", counter: "01" },
  { id: "starz-rank", counter: "01.1" },
  { id: "starz-post", counter: "01.2" },
  { id: "starz-chats", counter: "01.3" },
  { id: "starz-pages", counter: "01.4" },
  { id: "starz-ads", counter: "01.5" },
  { id: "starz-summary", counter: "01" },
  { id: "readora-main", counter: "02" },
  { id: "calling-main", counter: "03" },
  { id: "estatex-main", counter: "04" },
  { id: "reel-main", counter: "05" },
  { id: "peerly-main", counter: "06" },
  { id: "more-builds", counter: "—" },
  { id: "about", counter: "—" },
  { id: "contact", counter: "—" },
];

/** Relative luminance of a computed `rgb(...)` string. */
function isLight(color: string) {
  const m = color.match(/\d+/g);
  if (!m) return false;
  const [r, gr, b] = m.map(Number);
  return (0.2126 * r + 0.7152 * gr + 0.0722 * b) / 255 > 0.55;
}

export default function Navigation() {
  const [counter, setCounter] = useState("00");
  const [onLight, setOnLight] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    const read = () => {
      frame.current = 0;

      // Which numbered beat are we in?
      let next = "00";
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          next = SECTIONS[i].counter;
          break;
        }
      }
      setCounter(next);

      // Read the ground directly beneath the bar so the bar can invert on paper.
      const under = document
        .elementsFromPoint(window.innerWidth / 2, 28)
        .find((el) => el instanceof HTMLElement && el.tagName === "SECTION") as HTMLElement | undefined;
      if (under) setOnLight(isLight(getComputedStyle(under).backgroundColor));
    };

    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const tone = onLight ? "text-ink" : "text-white";
  const muted = onLight ? "text-ink/50" : "text-white/50";
  const rule = onLight ? "bg-ink/25" : "bg-white/25";

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-colors duration-300 sm:px-10 ${tone}`}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="label pointer-events-auto cursor-pointer border-none bg-transparent p-0 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
      >
        Devang Gupta
      </button>

      <div className="pointer-events-auto flex items-center gap-5">
        <span className={`label tabular-nums ${muted}`}>{counter}</span>
        <span className={`hidden h-3 w-px sm:block ${rule}`} />
        <a
          href="https://github.com/devang-altf4"
          target="_blank"
          rel="noopener noreferrer"
          className="label hidden transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current sm:inline"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/devang-gupta-267475343/"
          target="_blank"
          rel="noopener noreferrer"
          className="label hidden transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current sm:inline"
        >
          LinkedIn
        </a>
        <a
          href="mailto:maybedevang29@gmail.com"
          className={`label rounded-full border px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
            onLight
              ? "border-ink/30 hover:bg-ink hover:text-paper"
              : "border-white/35 hover:bg-white hover:text-ink"
          }`}
        >
          Email
        </a>
      </div>
    </header>
  );
}
