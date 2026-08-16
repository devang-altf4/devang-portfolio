"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import type { BeatData, ProjectData } from "@/data/portfolio";
import PhoneFrame from "@/components/motion/PhoneFrame";
import PhraseBand from "@/components/motion/PhraseBand";
import StepStack from "@/components/motion/StepStack";
import {
  DUR,
  EASE,
  ENTER_START,
  STOP_UNIT,
  initGsap,
  liveLayer,
  splitWords,
} from "@/lib/motion";

/**
 * The phone counterpart to ScreenScene. Same grammar — pinned, stepped, one
 * camera stop per contribution — so the mobile projects read with the same
 * weight as the dashboard ones instead of scrolling past as a static slab.
 *
 * The extra move here is the frame itself: it turns in 3D across the pin, so
 * the device is handled rather than presented flat.
 */

export interface DeviceFocus {
  x: number;
  y: number;
  /** Tightness of the focus frame. 1 = the whole screen, 2 = a quarter of it. */
  scale: number;
  look: string;
}

interface DeviceSceneProps {
  project: ProjectData;
  beat: BeatData;
  side: "left" | "right";
  tone?: "base" | "raised";
  focus: DeviceFocus[];
}

export default function DeviceScene({
  project,
  beat,
  side,
  tone = "base",
  focus,
}: DeviceSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const pushRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [active, setActive] = useState(0);

  const moves = focus.slice(1);
  const copyLeft = side === "left";
  const isVideo = beat.asset.type === "video";
  const kicker = beat.eyebrow.split("—").pop()?.trim() ?? beat.eyebrow;

  const steps = focus.map((f, i) => ({
    look: f.look,
    body: i === 0 ? beat.narrative : beat.contribution[i - 1] ?? beat.interfaceCallout,
  }));

  useGSAP(
    () => {
      initGsap();
      const mm = gsap.matchMedia();

      if (isVideo) {
        // The demo only runs while it's on screen. An autoplaying video
        // decoding off screen all page is the cheapest budget to give back.
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
      }

      const settle = () => {
        gsap.set(pushRef.current, { scale: 1 });
        gsap.set(tiltRef.current, { rotateY: 0, rotateX: 0, y: 0 });
        gsap.set([eyebrowRef.current, glowRef.current], { opacity: 1, y: 0 });
        gsap.set(detailRef.current?.querySelectorAll("[data-reveal]") ?? [], { opacity: 1, y: 0 });
        gsap.set(splitWords(titleRef.current), { yPercent: 0 });
      };

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const words = splitWords(titleRef.current);
        const rows = detailRef.current?.querySelectorAll("[data-reveal]") ?? [];
        const marks = gsap.utils.toArray<HTMLElement>(stepsRef.current?.children ?? []);

        gsap.set(marks.slice(1), { yPercent: 110 });

        // Each phrase is split into masked words. Only the opening one rests
        // in the band; the others wait below their own clip.
        const phraseWords = gsap.utils
          .toArray<HTMLElement>(bandRef.current?.children ?? [])
          .map((el) => splitWords(el));
        phraseWords.slice(1).forEach((w) => gsap.set(w, { yPercent: 110 }));
        gsap.set(phraseWords[0], { yPercent: 0 });

        // ── Entrance, on approach. Readable before the section takes the screen.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: ENTER_START,
              toggleActions: "play none none reverse",
            },
            defaults: { ease: EASE.enter },
          })
          .fromTo(glowRef.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.8 }, 0)
          .fromTo(
            tiltRef.current,
            { opacity: 0, y: 70, rotateY: 26, rotateX: 12 },
            { opacity: 1, y: 0, rotateY: 16, rotateX: 6, duration: 1.5 },
            0
          )
          .fromTo(pushRef.current, { scale: 1.12 }, { scale: 1, duration: 1.6 }, 0)
          .fromTo(
            eyebrowRef.current,
            { yPercent: 130, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.7 },
            0.08
          )
          .fromTo(words, { yPercent: 118 }, { yPercent: 0, duration: DUR.word, stagger: 0.04 }, 0.16)
          .fromTo(
            rows,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: DUR.copy, stagger: 0.06, ease: EASE.soft },
            0.4
          );

        // ── The pin. The frame turns, the camera walks the screen, the step
        // beside it changes to match.
        const total = 0.3 + moves.length * STOP_UNIT;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${60 + moves.length * 50}%`,
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            onToggle: (self) => liveLayer(tiltRef.current, self.isActive),
          },
        });

        tl.fromTo(spineRef.current, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: total }, 0)
          .to(tiltRef.current, { rotateY: -16, rotateX: -5, ease: "none", duration: total }, 0)
          .to(glowRef.current, { xPercent: copyLeft ? -10 : 10, ease: "none", duration: total }, 0)
          .call(() => setActive(0), [], 0);

        moves.forEach((_f, j) => {
          const at = 0.3 + j * STOP_UNIT;

          if (phraseWords[j] && phraseWords[j + 1]) {
            tl.to(
              phraseWords[j],
              { yPercent: -110, duration: 0.6, ease: EASE.soft, stagger: 0.035 },
              at
            ).fromTo(
              phraseWords[j + 1],
              { yPercent: 110 },
              {
                yPercent: 0,
                duration: 0.7,
                ease: EASE.enter,
                stagger: 0.045,
                immediateRender: false,
              },
              at + 0.12
            );
          }
          tl.call(() => setActive(j + 1), [], at);

          if (marks[j] && marks[j + 1]) {
            tl.to(marks[j], { yPercent: -110, duration: 0.55, ease: EASE.soft }, at).fromTo(
              marks[j + 1],
              { yPercent: 110 },
              { yPercent: 0, duration: 0.55, ease: EASE.soft, immediateRender: false },
              at
            );
          }
        });
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        settle();

        gsap
          .timeline({
            scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
            defaults: { ease: EASE.enter },
          })
          .fromTo(tiltRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1 }, 0)
          .fromTo(
            splitWords(titleRef.current),
            { yPercent: 118 },
            { yPercent: 0, duration: 0.8, stagger: 0.035 },
            0.1
          )
          .fromTo(
            detailRef.current?.querySelectorAll("[data-reveal]") ?? [],
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: EASE.soft },
            0.25
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        settle();
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={beat.id}
      className={`relative z-10 w-full overflow-hidden lg:h-screen ${
        tone === "raised" ? "bg-ink-raised/88" : "bg-ink/88"
      }`}
    >
      <div
        ref={glowRef}
        className={`glow top-1/2 hidden h-[62vh] w-[36vw] -translate-y-1/2 lg:block ${
          copyLeft ? "right-[8vw]" : "left-[8vw]"
        }`}
        aria-hidden
      />

      <div className="flex flex-col lg:grid lg:h-full lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:px-[5vw]">
        <div
          className={`order-2 flex flex-col items-center justify-center gap-4 py-10 lg:order-none lg:col-span-5 lg:row-start-1 lg:py-0 ${
            copyLeft ? "lg:col-start-8" : "lg:col-start-1"
          }`}
          style={{ perspective: "1500px" }}
        >
          <PhraseBand
            phrases={focus.map((f) => f.look)}
            bandRef={bandRef}
            align={copyLeft ? "right" : "left"}
          />

          <div ref={tiltRef} className="transform-gpu" style={{ transformStyle: "preserve-3d" }}>
            <PhoneFrame>
              <div ref={pushRef} className="absolute inset-0 transform-gpu">
                <div className="absolute inset-0">
                  {isVideo ? (
                    <video
                      ref={videoRef}
                      src={beat.asset.src}
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="pointer-events-none h-full w-full select-none object-cover"
                    />
                  ) : (
                    <Image
                      src={beat.asset.src}
                      alt={beat.asset.alt}
                      fill
                      priority
                      sizes="(max-width: 1023px) 60vw, 30vw"
                      className="select-none object-cover object-top"
                    />
                  )}
                </div>

                {/*
                  The focus frame. Its outer shadow dims the rest of the screen,
                  so one element both marks the region and darkens around it.
                  The screenshot is never scaled — zooming a phone UI inside a
                  fixed frame cropped its own labels mid-word.
                */}
              </div>
            </PhoneFrame>
          </div>
        </div>

        <div
          className={`relative order-1 px-6 pb-14 pt-28 sm:px-10 lg:order-none lg:col-span-6 lg:row-start-1 lg:px-0 lg:pb-0 lg:pt-0 ${
            copyLeft ? "lg:col-start-1" : "lg:col-start-7"
          }`}
        >
          <div className="overflow-hidden">
            <p ref={eyebrowRef} className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-white/55">
              <span className="text-amethyst-soft">{project.projectNumber}</span>
              <span className="h-3 w-px bg-white/20" aria-hidden />
              <span className="text-white">{project.title}</span>
              <span className="h-3 w-px bg-white/20" aria-hidden />
              <span>{kicker}</span>
            </p>
          </div>

          <h2
            ref={titleRef}
            className="display mt-5 text-[clamp(2rem,7vw,3.5rem)] text-white lg:mt-7 lg:text-[clamp(2.25rem,3.5vw,3.6rem)]"
          >
            {beat.title}
          </h2>

          <div ref={detailRef} className="mt-5 lg:mt-6">
            {beat.subtitleItalic && (
              <p data-reveal className="max-w-lg text-[0.9375rem] leading-[1.6] text-white/60">
                {beat.subtitleItalic}
              </p>
            )}

            <StepStack steps={steps} active={active} stepsRef={stepsRef} spineRef={spineRef} />

            <ul data-reveal className="mt-8 flex max-w-lg flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="label rounded-full border border-white/15 px-3 py-1.5 text-[0.625rem] text-white/55"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {beat.links.length > 0 && (
              <div data-reveal className="mt-7 flex flex-wrap gap-3">
                {beat.links.map((link, i) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`label inline-flex items-center gap-2 rounded-full px-6 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst ${
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
