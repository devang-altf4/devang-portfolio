"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import PhoneFrame from "@/components/motion/PhoneFrame";
import { ArrowUpRight } from "lucide-react";
import { DUR, EASE, ENTER_START, initGsap, splitWords } from "@/lib/motion";

export default function StarzOverviewScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const project = PORTFOLIO_DATA.projects[0];
  const beat = project.beats[0];

  useGSAP(
    () => {
      initGsap();
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = splitWords(titleRef.current);
        const rows = detailRef.current?.querySelectorAll("[data-reveal]") ?? [];

        // Entrance runs on approach, so the section is readable the moment it
        // owns the screen. No pin holds the reader in front of a blank ground.
        gsap
          .timeline({
            scrollTrigger: { trigger: sectionRef.current, start: ENTER_START },
            defaults: { ease: EASE.enter },
          })
          .fromTo(glowRef.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.8 }, 0)
          .fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0)
          .fromTo(words, { yPercent: 118 }, { yPercent: 0, duration: DUR.word, stagger: 0.04 }, 0.1)
          .fromTo(
            phoneRef.current,
            { opacity: 0, y: 60, rotateX: 8 },
            { opacity: 1, y: 0, rotateX: 0, duration: 1.4 },
            0.15
          )
          .fromTo(
            rows,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: DUR.copy, stagger: 0.07, ease: EASE.soft },
            0.35
          );

        // Passing. The phone travels slower than the copy beside it.
        gsap.fromTo(
          phoneRef.current,
          { yPercent: 6 },
          {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([eyebrowRef.current, phoneRef.current, glowRef.current], {
          opacity: 1,
          x: 0,
          y: 0,
          yPercent: 0,
          scale: 1,
        });
        gsap.set(detailRef.current?.querySelectorAll("[data-reveal]") ?? [], { opacity: 1, y: 0 });
        gsap.set(splitWords(titleRef.current), { yPercent: 0 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="starz-overview"
      className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden bg-ink px-6 py-28 sm:px-12 lg:px-24"
    >
      <div
        ref={glowRef}
        className="glow right-[6vw] top-1/2 hidden h-[64vh] w-[38vw] -translate-y-1/2 lg:block"
        aria-hidden
      />

      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-6 lg:col-span-7">
          <div ref={eyebrowRef} className="label flex flex-wrap items-center gap-3 text-white/55">
            <span className="text-amethyst-soft">{project.projectNumber}</span>
            <span className="h-3 w-px bg-white/20" aria-hidden />
            <span>Flagship suite</span>
          </div>

          <h2 ref={titleRef} className="display text-4xl leading-tight text-white sm:text-6xl lg:text-7xl">
            {project.title}{" "}
            <span className="mt-2 block text-3xl font-light italic text-amethyst-soft sm:text-5xl lg:text-6xl">
              {project.subtitleItalic}
            </span>
          </h2>

          <div ref={detailRef} className="space-y-6">
            <p data-reveal className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              {beat.narrative}
            </p>

            <div data-reveal className="max-w-2xl border-t border-white/12 pt-5">
              <div className="label mb-3 text-white/55">Core architecture</div>
              <ul className="space-y-2">
                {beat.contribution.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                    <span aria-hidden className="mt-0.5 text-xs text-amethyst">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ul data-reveal className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="label rounded-full border border-white/15 px-3 py-1.5 text-[0.625rem] text-white/55"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div data-reveal className="flex flex-wrap gap-3">
              {beat.links.map((link, i) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`label inline-flex items-center gap-2 rounded-full px-5 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst ${
                    i === 0
                      ? "bg-amethyst-deep text-white hover:bg-amethyst-soft hover:text-ink"
                      : "border border-amethyst/50 text-amethyst-soft hover:bg-amethyst hover:text-white"
                  }`}
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div ref={phoneRef} className="flex justify-center lg:col-span-5">
          <PhoneFrame>
            <div className="relative h-full w-full">
              <Image
                src={beat.asset.src}
                alt={beat.asset.alt}
                fill
                priority
                sizes="(max-width: 768px) 290px, 350px"
                className="select-none object-cover object-top"
              />
            </div>
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
