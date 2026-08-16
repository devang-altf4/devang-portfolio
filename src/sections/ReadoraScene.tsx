"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import PhoneFrame from "@/components/motion/PhoneFrame";
import { ArrowUpRight } from "lucide-react";
import { DUR, EASE, ENTER_START, initGsap, splitWords } from "@/lib/motion";

export default function ReadoraScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const project = PORTFOLIO_DATA.projects[1];
  const beat = project.beats[0];

  useGSAP(
    () => {
      initGsap();
      const mm = gsap.matchMedia();

      // The demo only runs while it's on screen. An autoplaying video decoding
      // off screen for the whole page is the cheapest frame budget to give back.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          const v = videoRef.current;
          if (!v) return;
          if (self.isActive) void v.play().catch(() => {});
          else v.pause();
        },
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = splitWords(titleRef.current);
        const rows = detailRef.current?.querySelectorAll("[data-reveal]") ?? [];

        gsap
          .timeline({
            scrollTrigger: { trigger: sectionRef.current, start: ENTER_START },
            defaults: { ease: EASE.enter },
          })
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
        gsap.set([eyebrowRef.current, phoneRef.current], { opacity: 1, x: 0, y: 0, yPercent: 0 });
        gsap.set(detailRef.current?.querySelectorAll("[data-reveal]") ?? [], { opacity: 1, y: 0 });
        gsap.set(splitWords(titleRef.current), { yPercent: 0 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="readora-main"
      className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden bg-ink px-6 py-28 sm:px-12 lg:px-24"
    >
      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-6 lg:col-span-7">
          <div ref={eyebrowRef} className="label flex flex-wrap items-center gap-3 text-white/55">
            <span>{project.projectNumber}</span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-white">{project.title}</span>
            <span className="h-3 w-px bg-white/20" />
            <span>Mobile architecture</span>
          </div>

          <h2 ref={titleRef} className="display text-4xl leading-tight text-white sm:text-6xl lg:text-7xl">
            {beat.title}{" "}
            <span className="mt-2 block text-2xl font-light italic text-white/55 sm:text-4xl lg:text-5xl">
              {project.subtitleItalic}
            </span>
          </h2>

          <div ref={detailRef} className="space-y-6">
            <p data-reveal className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              {beat.narrative}
            </p>

            <div data-reveal className="max-w-2xl border-t border-white/15 pt-4">
              <div className="label mb-3 text-white/55">Key contributions</div>
              <ul className="space-y-2">
                {beat.contribution.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                    <span aria-hidden className="mt-0.5 text-xs text-white/55">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ul data-reveal className="flex max-w-2xl flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="label rounded-full border border-white/15 px-3 py-1.5 text-[0.625rem] text-white/55"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div data-reveal className="flex flex-wrap gap-4">
              {beat.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label inline-flex items-center gap-2 rounded-full bg-amethyst-deep px-5 py-3 text-white transition-colors hover:bg-amethyst-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst"
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
            <div className="relative h-full w-full bg-black">
              <video
                ref={videoRef}
                src={beat.asset.src}
                loop
                muted
                playsInline
                preload="metadata"
                className="pointer-events-none h-full w-full select-none object-cover"
              />
            </div>
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
