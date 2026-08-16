"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { BeatData, ProjectData } from "@/data/portfolio";
import PhraseBand from "@/components/motion/PhraseBand";
import StepStack from "@/components/motion/StepStack";
import {
  DUR,
  EASE,
  ENTER_START,
  NO_PIN_SHORT,
  PIN_DESKTOP,
  PIN_MOBILE,
  STOP_UNIT,
  aspectToNumber,
  initGsap,
  liveLayer,
  splitWords,
} from "@/lib/motion";

/**
 * One stop on the scroll. `look` names what the focus frame is around, and the
 * matching contribution line says what was built there, so the two always
 * describe the same pixels.
 */
export interface Focus {
  x: number;
  y: number;
  /** Tightness of the focus frame. 1 = the whole plate, 2 = a quarter of it. */
  scale: number;
  look: string;
}

/** Two blacks a hair apart, so neighbouring sections read as layers. */
export type Tone = "base" | "raised";

/** Longest a plate may stand, so a near-square screenshot can't outgrow its section. */
const PLATE_MAX_H = "52vh";

interface ScreenSceneProps {
  project: ProjectData;
  beat: BeatData;
  tone?: Tone;
  /** Which side the copy takes on desktop. */
  side: "left" | "right";
  /** Stops in order. The first is the whole view; the rest are regions. */
  focus: Focus[];
}

export default function ScreenScene({
  project,
  beat,
  tone = "base",
  side,
  focus,
}: ScreenSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLSpanElement>(null);

  const [active, setActive] = useState(0);

  const moves = focus.slice(1);
  const copyLeft = side === "left";

  // The eyebrow already carries the beat number, so it is never printed twice.
  // What it doesn't carry is which product this is — that goes beside it.
  const kicker = beat.eyebrow.split("—").pop()?.trim() ?? beat.eyebrow;

  // Step one says what the product is. Every step after says what was built
  // in the region the frame just moved to.
  const steps = focus.map((f, i) => ({
    look: f.look,
    body: i === 0 ? beat.narrative : beat.contribution[i - 1] ?? beat.interfaceCallout,
  }));

  useGSAP(
    () => {
      initGsap();
      const mm = gsap.matchMedia();

      const marksOf = () => gsap.utils.toArray<HTMLElement>(stepsRef.current?.children ?? []);
      const phrasesOf = () =>
        gsap.utils
          .toArray<HTMLElement>(bandRef.current?.children ?? [])
          .map((el) => splitWords(el));

      /** Everything legible, nothing mid-flight. The state every branch lands in. */
      const settle = () => {
        gsap.set(plateRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(driftRef.current, { scale: 1 });
        gsap.set([eyebrowRef.current, glowRef.current].filter(Boolean), { opacity: 1, y: 0 });
        gsap.set(detailRef.current?.querySelectorAll("[data-reveal]") ?? [], { opacity: 1, y: 0 });
        gsap.set(splitWords(titleRef.current), { yPercent: 0 });
      };

      mm.add(PIN_DESKTOP, () => {
        const words = splitWords(titleRef.current);
        const rows = detailRef.current?.querySelectorAll("[data-reveal]") ?? [];
        const marks = marksOf();
        const phraseWords = phrasesOf();

        gsap.set(marks.slice(1), { yPercent: 110 });

        // Each phrase is split into masked words. Only the opening one rests
        // in the band; the others wait below their own clip.
        phraseWords.slice(1).forEach((w) => gsap.set(w, { yPercent: 110 }));
        gsap.set(phraseWords[0], { yPercent: 0 });

        // ── Entrance. Fires while the section is still travelling up into view,
        // so by the time it pins at the top it is already fully readable.
        const enter = gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: ENTER_START,
              toggleActions: "play none none reverse",
            },
            defaults: { ease: EASE.enter },
          })
          .fromTo(
            plateRef.current,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: DUR.plate, ease: EASE.wipe },
            0
          )
          .fromTo(driftRef.current, { scale: 1.05 }, { scale: 1, duration: 1.7 }, 0)
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

        if (glowRef.current) {
          enter.fromTo(glowRef.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.8 }, 0);
        }

        // ── The pin. The focus frame walks the interface and the step beside
        // it changes to match. Nothing here makes content appear — it advances
        // content that is already on screen.
        const total = 0.3 + moves.length * STOP_UNIT;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${70 + moves.length * 62}%`,
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            onToggle: (self) => liveLayer(driftRef.current, self.isActive),
          },
        });

        // Deliberately nothing scales the plate here. Any scale at all crops
        // the screenshot, and the entrance already owns `drift` — two
        // timelines on one property is what desynced the camera last time.
        tl.fromTo(spineRef.current, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: total }, 0)
          .call(() => setActive(0), [], 0);

        if (glowRef.current) {
          tl.to(glowRef.current, { xPercent: copyLeft ? -8 : 8, ease: "none", duration: total }, 0);
        }

        moves.forEach((_f, j) => {
          const at = 0.3 + j * STOP_UNIT;

          // Both ends are stated, so a reader scrubbing backward gets the same
          // result as one scrolling forward.
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

      /*
       * Phones pin too, so scrolling changes the text there exactly as it does
       * on a desktop. The one difference is the phrase band, which is
       * desktop-only — on a phone the step block carries its own `look` line.
       */
      mm.add(PIN_MOBILE, () => {
        const marks = marksOf();
        gsap.set(marks.slice(1), { yPercent: 110 });
        settle();

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: ENTER_START,
              toggleActions: "play none none reverse",
            },
            defaults: { ease: EASE.enter },
          })
          .fromTo(
            plateRef.current,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: EASE.wipe },
            0
          )
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

        const total = 0.3 + moves.length * STOP_UNIT;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=" + (60 + moves.length * 55) + "%",
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
          },
        });

        tl.fromTo(spineRef.current, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: total }, 0)
          .call(() => setActive(0), [], 0);

        moves.forEach((_f, j) => {
          const at = 0.3 + j * STOP_UNIT;
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

      // Too short to hold a pinned section. The steps are listed instead.
      mm.add(NO_PIN_SHORT, () => {
        settle();
        gsap
          .timeline({
            scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
            defaults: { ease: EASE.enter },
          })
          .fromTo(
            plateRef.current,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: EASE.wipe },
            0
          )
          .fromTo(
            splitWords(titleRef.current),
            { yPercent: 118 },
            { yPercent: 0, duration: 0.8, stagger: 0.035 },
            0.1
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        settle();
      });
    },
    { scope: sectionRef }
  );

  // The plate always carries the interface's own proportions, at every
  // breakpoint, capped by height so a near-square screenshot can't outgrow
  // the section it lives in.
  const plateVars = {
    "--plate-ar": beat.asset.aspectRatio,
    "--plate-arn": aspectToNumber(beat.asset.aspectRatio),
    "--plate-mh": PLATE_MAX_H,
  } as React.CSSProperties;

  return (
    <section
      ref={sectionRef}
      id={beat.id}
      className={`relative z-10 min-h-[100svh] w-full overflow-hidden lg:h-screen lg:min-h-0 ${
        tone === "raised" ? "bg-ink-raised/88" : "bg-ink/88"
      }`}
    >
      <div
        ref={glowRef}
        className={`glow top-1/2 hidden h-[64vh] w-[42vw] -translate-y-1/2 lg:block ${
          copyLeft ? "right-[3vw]" : "left-[3vw]"
        }`}
        aria-hidden
      />

      <div className="flex min-h-[100svh] flex-col justify-center gap-6 px-6 pb-10 pt-20 sm:px-10 lg:grid lg:h-full lg:min-h-0 lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:px-[5vw] lg:pb-0 lg:pt-0">
        <div
          className={`order-1 flex flex-col items-center justify-center gap-4 lg:order-none lg:col-span-7 lg:row-start-1 ${
            copyLeft ? "lg:col-start-6" : "lg:col-start-1"
          }`}
        >
          <PhraseBand
            phrases={focus.map((f) => f.look)}
            bandRef={bandRef}
            align={copyLeft ? "right" : "left"}
          />

          <div
            ref={plateRef}
            className="relative aspect-[var(--plate-ar)] w-full max-w-[calc(28svh*var(--plate-arn))] overflow-hidden rounded-sm shadow-[0_40px_120px_-30px_rgba(139,92,246,0.4)] ring-1 ring-white/12 lg:max-w-[calc(var(--plate-mh)*var(--plate-arn))]"
            style={plateVars}
          >
            <div ref={driftRef} className="absolute inset-0 origin-center transform-gpu">
              <Image
                src={beat.asset.src}
                alt={beat.asset.alt}
                fill
                sizes="(max-width: 1023px) 92vw, 58vw"
                className="select-none object-cover"
              />
              {/* Solid, not backdrop-blur: a backdrop filter re-samples what is
                  behind it every composited frame, and these sit on top of a plate
                  that animates. A solid panel also redacts more completely. */}
              {beat.asset.redactionZones?.map((z) => (
                <div
                  key={z.label}
                  aria-label={z.label}
                  className="pointer-events-none absolute rounded-[2px] bg-[#141118]"
                  style={{ top: z.top, left: z.left, width: z.width, height: z.height }}
                />
              ))}
            </div>

            {/*
              The focus frame. Its outer shadow is what dims the rest of the
              plate, so one element both marks the region and darkens around it.
            */}
          </div>
        </div>

        <div
          ref={copyRef}
          className={`relative order-2 lg:order-none lg:col-span-5 lg:row-start-1 ${
            copyLeft ? "lg:col-start-1" : "lg:col-start-8"
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
            className="display text-[clamp(1.6rem,5.4vw,2.4rem)] text-white lg:mt-7 lg:text-[clamp(2rem,2.9vw,3rem)]"
          >
            {beat.title}
          </h2>

          <div ref={detailRef} className="mt-4 lg:mt-6">
            {beat.subtitleItalic && (
              <p data-reveal className="hidden max-w-md text-[0.9375rem] leading-[1.6] text-white/60 lg:block">
                {beat.subtitleItalic}
              </p>
            )}

            <StepStack steps={steps} active={active} stepsRef={stepsRef} spineRef={spineRef} />

            <ul data-reveal className="mt-6 flex max-w-md flex-nowrap gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-8 lg:flex-wrap lg:overflow-visible">
              {beat.techStack.map((tech) => (
                <li
                  key={tech}
                  className="label rounded-full border border-white/15 px-3 py-1.5 text-[0.625rem] text-white/55"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {beat.links.length > 0 && (
              <div data-reveal className="mt-5 flex flex-nowrap gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-7 lg:flex-wrap lg:overflow-visible">
                {beat.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-flex shrink-0 items-center gap-2 rounded-full border border-amethyst/50 px-5 py-2.5 text-amethyst-soft lg:px-6 lg:py-3 transition-colors hover:bg-amethyst hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst"
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
