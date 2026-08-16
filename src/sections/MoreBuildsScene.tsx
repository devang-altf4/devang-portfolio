"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { DUR, EASE, ENTER_START, initGsap, splitWords } from "@/lib/motion";

export default function MoreBuildsScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const moreBuilds = PORTFOLIO_DATA.moreBuilds;

  useGSAP(
    () => {
      initGsap();
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = splitWords(titleRef.current);
        const rows = bodyRef.current?.querySelectorAll("[data-reveal]") ?? [];

        gsap
          .timeline({
            scrollTrigger: { trigger: sectionRef.current, start: ENTER_START },
            defaults: { ease: EASE.enter },
          })
          .fromTo(words, { yPercent: 118 }, { yPercent: 0, duration: DUR.word, stagger: 0.045 }, 0)
          .fromTo(
            rows,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: DUR.copy, stagger: 0.08, ease: EASE.soft },
            0.2
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(bodyRef.current?.querySelectorAll("[data-reveal]") ?? [], { opacity: 1, y: 0 });
        gsap.set(splitWords(titleRef.current), { yPercent: 0 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="more-builds"
      className="relative z-10 flex min-h-[60vh] w-full items-center justify-center overflow-hidden bg-ink/88 px-6 py-24 sm:px-12 lg:px-24"
    >
      <div ref={bodyRef} className="w-full max-w-4xl space-y-8 text-center">
        <div data-reveal className="label text-white/55">
          {moreBuilds.eyebrow}
        </div>

        <h3 ref={titleRef} className="display text-3xl leading-tight text-white sm:text-5xl">
          {moreBuilds.heading}
        </h3>

        <div data-reveal className="flex justify-center">
          <a
            href={moreBuilds.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-2 rounded-full bg-amethyst-deep px-6 py-3 text-white transition-colors hover:bg-amethyst-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst"
          >
            {moreBuilds.ctaLabel}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
