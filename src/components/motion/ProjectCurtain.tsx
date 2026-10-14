"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PORTFOLIO_DATA, type ProjectData } from "@/data/portfolio";
import { initGsap } from "@/lib/motion";
import { pageReady } from "@/lib/ready";

/**
 * The chapter break between projects: purple-edged panels sweep up over the
 * screen, the project's name holds in the middle, and the panels lift away to
 * reveal it.
 *
 * The original version of this played on a 2.5s timer once the next project
 * was already on screen, so it arrived late and hid the section while its
 * entrance played underneath. This one is scrubbed: each sweep is tied to a
 * `CurtainMark` placed just before a project, and its progress *is* that
 * mark's travel from the bottom of the viewport to the top. The curtain covers
 * exactly while the next project scrolls in and has lifted the moment it
 * settles — it cannot arrive late, and scrolling back plays it in reverse.
 */

const PANELS = 7;
/** Off-screen below. Inline, not Tailwind: v4's `translate` composes with GSAP's transform. */
const REST = "translateY(101%)";

const markId = (id: string) => `curtain-${id}`;

/** A zero-height anchor placed in the page flow right before a project. */
export function CurtainMark({ project }: { project: ProjectData }) {
  return <div id={markId(project.id)} aria-hidden className="relative z-10 h-0 w-full" />;
}

export default function ProjectCurtain() {
  const panelsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    // Built after the preloader lifts, so every pinned section above has
    // already inserted its spacer and these starts are measured correctly.
    pageReady.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(panelsRef.current?.children ?? []);
        const cards = gsap.utils.toArray<HTMLElement>(cardsRef.current?.children ?? []);

        // GSAP parses the inline `translateY(101%)` above as a *pixel* `y` and
        // would then add `yPercent` on top of it, parking the panels a whole
        // screen low — they covered the page after the project had arrived.
        // Hand the offset over to `yPercent` alone before anything animates.
        gsap.set(panels, { y: 0, yPercent: 101 });

        PORTFOLIO_DATA.projects.forEach((project, i) => {
          const mark = document.getElementById(markId(project.id));
          const card = cards[i];
          if (!mark || !card) return;

          // Both ends of every tween are stated. Several timelines share the
          // panels, and each one's resting states (progress 0 below the
          // screen, progress 1 above it) are both off-screen, so whichever
          // timeline last crossed a boundary leaves them invisible.
          gsap
            .timeline({
              scrollTrigger: {
                trigger: mark,
                start: "top bottom",
                end: "top top",
                scrub: 0.5,
                refreshPriority: -1,
              },
            })
            .fromTo(
              panels,
              { yPercent: 101 },
              { yPercent: 0, duration: 0.42, ease: "power3.out", stagger: 0.035 },
              0
            )
            .fromTo(
              card,
              { autoAlpha: 0, y: 56 },
              { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out", immediateRender: false },
              0.3
            )
            .fromTo(
              card,
              { autoAlpha: 1, y: 0 },
              { autoAlpha: 0, y: -44, duration: 0.14, ease: "power2.in", immediateRender: false },
              0.66
            )
            .fromTo(
              panels,
              { yPercent: 0 },
              { yPercent: -101, duration: 0.42, ease: "power3.in", stagger: 0.035, immediateRender: false },
              0.62
            );
        });
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    // Under the nav (z-50), over every section (z-10): the nav stays usable.
    <div className="pointer-events-none fixed inset-0 z-[45]" aria-hidden>
      <div ref={panelsRef} className="absolute inset-0 flex">
        {Array.from({ length: PANELS }).map((_, i) => (
          <div
            key={i}
            // Four panels on phones, seven from `sm` up.
            className={`relative h-full flex-1 border-r border-amethyst/25 bg-ink ${i >= 4 ? "hidden sm:block" : ""}`}
            style={{ transform: REST }}
          >
            {/* The leading edge, so the sweep reads as a cut rather than a fade. */}
            <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amethyst-deep via-amethyst to-amethyst-soft" />
          </div>
        ))}
      </div>

      <div ref={cardsRef} className="absolute inset-0">
        {PORTFOLIO_DATA.projects.map((project) => (
          <div
            key={project.id}
            className="invisible absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0"
          >
            <span className="label tabular-nums text-amethyst-soft">{project.projectNumber}</span>
            <span className="display mt-4 text-[clamp(1.9rem,6.4vw,4.8rem)] text-white">{project.title}</span>
            <span className="label mt-5 text-white/55">{project.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
