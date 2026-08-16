"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { DUR, EASE, initGsap, splitWords } from "@/lib/motion";

export default function ContactScene() {
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
            scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
            defaults: { ease: EASE.enter },
          })
          .fromTo(words, { yPercent: 118 }, { yPercent: 0, duration: 1.05, stagger: 0.045 }, 0)
          .fromTo(
            rows,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: DUR.copy, stagger: 0.09, ease: EASE.soft },
            0.3
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
      id="contact"
      className="relative z-10 flex min-h-screen w-full flex-col justify-between overflow-hidden bg-ink/88 px-6 py-24 sm:px-12 lg:px-24"
    >
      <div className="label flex items-center gap-3 pt-8 text-white/55">
        <span>Get in touch</span>
        <span className="h-px w-8 bg-white/20" />
      </div>

      <div ref={bodyRef} className="my-auto max-w-5xl space-y-8">
        <h2 ref={titleRef} className="display text-4xl leading-tight text-white sm:text-7xl lg:text-8xl">
          Have something worth building?{" "}
          <span className="mt-2 block text-3xl font-light italic text-amethyst-soft sm:text-6xl lg:text-7xl">
            Let&apos;s talk.
          </span>
        </h2>

        <p data-reveal className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-xl">
          Open to engineering roles, systems architecture, and high-impact software builds.
        </p>

        <div data-reveal className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href={`mailto:${creator.email}`}
            className="label inline-flex items-center gap-2 rounded-full bg-amethyst-deep px-6 py-3.5 text-white transition-colors hover:bg-amethyst-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst"
          >
            {creator.email}
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <a
            href={creator.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-white transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            LinkedIn
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <a
            href={creator.github}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-white transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
        <span>© {new Date().getFullYear()} Devang Gupta. All rights reserved.</span>
        
      </div>
    </section>
  );
}
