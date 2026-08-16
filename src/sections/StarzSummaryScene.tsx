"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { DUR, EASE, ENTER_START, initGsap, splitWords } from "@/lib/motion";

export default function StarzSummaryScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const project = PORTFOLIO_DATA.projects[0];

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
          .fromTo(words, { yPercent: 118 }, { yPercent: 0, duration: DUR.word, stagger: 0.04 }, 0)
          .fromTo(
            rows,
            { opacity: 0, y: 22 },
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
      id="starz-summary"
      className="relative z-10 flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-ink px-6 py-24 sm:px-12 lg:px-24"
    >
      <div ref={bodyRef} className="w-full max-w-4xl space-y-8 text-center">
        <div data-reveal className="label text-amethyst-soft">
          Starz ecosystem — conclusion
        </div>

        <h3 ref={titleRef} className="display text-3xl leading-tight text-white sm:text-5xl lg:text-6xl">
          Five AI systems.{" "}
          <span className="mt-2 block text-2xl font-light italic text-amethyst-soft sm:text-4xl lg:text-5xl">
            One product ecosystem.
          </span>
        </h3>

        <p data-reveal className="mx-auto max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
          From autonomous local search auditing to real-time lead qualification and paused Meta ad
          campaign creation — all unified in one full-stack architecture.
        </p>

        {project.disclaimer && (
          <p data-reveal className="text-xs text-white/60">
            {project.disclaimer}
          </p>
        )}

        <div data-reveal className="flex justify-center">
          <a
            href="https://crm.starz.vip"
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-2 rounded-full bg-amethyst-deep px-6 py-3 text-white transition-colors hover:bg-amethyst-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst"
          >
            Visit CRM portal
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
