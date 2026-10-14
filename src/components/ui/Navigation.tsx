"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initGsap } from "@/lib/motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const SECTIONS = [
  { id: "hero", counter: "00" },
  { id: "at-a-glance", counter: "00" },
  { id: "starz-overview", counter: "01" },
  { id: "starz-rank", counter: "01.1" },
  { id: "starz-pages", counter: "01.2" },
  { id: "starz-chats", counter: "01.3" },
  { id: "starz-summary", counter: "01" },
  { id: "calling-main", counter: "02" },
  { id: "readora-main", counter: "03" },
  { id: "truesample-main", counter: "04" },
  { id: "more-builds", counter: "—" },
  { id: "about", counter: "—" },
  { id: "contact", counter: "—" },
];

const { creator } = PORTFOLIO_DATA;
/**
 * "Let's connect" scrolls to the contact section rather than opening a mail
 * client: email, LinkedIn and GitHub sit side by side there, and the reader
 * picks the channel. A plain #contact anchor underneath, so it still works
 * before hydration.
 */
function goToContact(e: React.MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById("contact");
  if (!target) return;
  e.preventDefault();
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
}

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

      {/*
        A scrim, not a blur. The bar is fixed and content scrolls under it —
        on a phone the section eyebrow ran straight through the wordmark. A
        gradient costs one paint pass; `backdrop-filter` would re-sample the
        page behind it on every composited frame.
      */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 bg-gradient-to-b from-ink via-ink/85 to-transparent lg:h-28"
        aria-hidden
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 text-white sm:px-10">
        <div className="pointer-events-none flex items-center gap-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="label pointer-events-auto cursor-pointer border-none bg-transparent p-0 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          Devang Gupta
        </button>

        {/* Beside the name, not centred: centred, it ran into the counter on tablets.
            Hidden on phones, where the connect button carries the same dot. */}
        <span className="label pointer-events-auto hidden items-center gap-2 rounded-full border border-white/12 bg-ink/70 px-3.5 py-1.5 text-white/80 md:inline-flex">
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amethyst opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amethyst-soft" />
          </span>
          {creator.availability}
        </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-5">
          <span className="label tabular-nums text-amethyst-soft">{counter}</span>
          <span className="hidden h-3 w-px bg-white/25 sm:block" />
          <a
            href={creator.github}
            target="_blank"
            rel="noopener noreferrer"
            className="label hidden transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current sm:inline"
          >
            GitHub
          </a>
          <a
            href={creator.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="label hidden transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current sm:inline"
          >
            LinkedIn
          </a>
          <a
            href="#contact"
            onClick={goToContact}
            className="label inline-flex items-center gap-2 rounded-full border border-amethyst/50 bg-ink/60 px-4 py-2 text-white transition-colors hover:border-amethyst hover:bg-amethyst-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amethyst-soft md:hidden" aria-hidden />
            Let&apos;s connect
          </a>
        </div>
      </header>
    </>
  );
}
