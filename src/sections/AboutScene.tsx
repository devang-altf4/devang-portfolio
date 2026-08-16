"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { DUR, EASE, ENTER_START, initGsap, splitWords } from "@/lib/motion";

export default function AboutScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const creator = PORTFOLIO_DATA.creator;

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
          .fromTo(words, { yPercent: 118 }, { yPercent: 0, duration: DUR.word, stagger: 0.035 }, 0)
          .fromTo(
            rows,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: DUR.copy, stagger: 0.08, ease: EASE.soft },
            0.25
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
      id="about"
      className="relative z-10 flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-ink px-6 py-24 sm:px-12 lg:px-24"
    >
      <div ref={bodyRef} className="w-full max-w-4xl space-y-8">
        <div data-reveal className="label flex items-center gap-3 text-white/55">
          <span>About — philosophy</span>
          <span className="h-px w-8 bg-white/20" />
        </div>

        <h3 ref={titleRef} className="display text-3xl leading-tight text-white sm:text-5xl lg:text-6xl">
          Engineering systems that operate with{" "}
          <span className="font-light italic text-white/55">autonomy, speed and craft.</span>
        </h3>

        <div className="grid grid-cols-1 gap-8 pt-4 text-sm leading-relaxed text-white/60 sm:text-base md:grid-cols-2">
          <p data-reveal>
            I build mobile applications, real-time voice and telephony pipelines, and coordinated
            multi-agent AI systems.
          </p>
          <p data-reveal>
            Offline-first mobile databases, full-duplex conversational voice, verified property
            platforms at scale — different problems, one habit: direct execution and clean interfaces.
          </p>
        </div>

        <div data-reveal className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href={creator.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-2 rounded-full bg-amethyst-deep px-5 py-3 text-white transition-colors hover:bg-amethyst-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst"
          >
            Connect on LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={creator.github}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-white transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            GitHub profile
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
