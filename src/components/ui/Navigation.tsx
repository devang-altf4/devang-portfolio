"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initGsap } from "@/lib/motion";

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

export default function Navigation() {
  const [counter, setCounter] = useState("00");
  const barRef = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    initGsap();

    // The counter is driven by ScrollTrigger, not by reading positions on a
    // scroll event. Half these sections pin, and pins are applied on the GSAP
    // ticker — a scroll handler can read a section's box *before* it is pinned
    // and land on the wrong beat, with no later event to correct it.
    const ctx = gsap.context(() => {
      SECTIONS.forEach(({ id, counter: value }) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setCounter(value),
          onEnterBack: () => setCounter(value),
        });
      });
    });

    // Page progress needs no element geometry, so a plain scroll listener is
    // enough. Written straight to the node — this runs on every scroll frame.
    const read = () => {
      frame.current = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
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
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Progress across the whole page — the one thread that never breaks. */}
      <span
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px origin-left bg-amethyst"
        ref={barRef}
        style={{ transform: "scaleX(0)" }}
        aria-hidden
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 text-white sm:px-10">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="label pointer-events-auto cursor-pointer border-none bg-transparent p-0 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          Devang Gupta
        </button>

        <div className="pointer-events-auto flex items-center gap-5">
          <span className="label tabular-nums text-amethyst-soft">{counter}</span>
          <span className="hidden h-3 w-px bg-white/25 sm:block" />
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
            className="label rounded-full border border-amethyst/50 px-4 py-2 text-amethyst-soft transition-colors hover:bg-amethyst hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst"
          >
            Email
          </a>
        </div>
      </header>
    </>
  );
}
