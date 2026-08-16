"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { BeatData, ProjectData } from "@/data/portfolio";
import {
  DUR,
  EASE,
  ENTER_START,
  aspectToNumber,
  initGsap,
  liveLayer,
  splitWords,
} from "@/lib/motion";

/**
 * One stop on the scroll. The camera holds here while the step beside it is
 * on screen, so `look` (what you are seeing) and the matching contribution
 * line (what was built there) always describe the same pixels.
 */
export interface Focus {
  x: number;
  y: number;
  scale: number;
  /** What the camera is framing at this stop. */
  look: string;
}

/**
 * `bleed` puts the interface edge to edge behind the copy.
 * `framed` stands it off the ground as a lit plate.
 * Scenes alternate so the page never settles into one rhythm.
 */
export type Mode = "bleed" | "framed";
/** Two blacks a hair apart, so neighbouring sections read as layers. */
export type Tone = "base" | "raised";

/** Longest a plate may stand, so a near-square screenshot can't outgrow its section. */
const PLATE_MAX_H = "62vh";

/** Scrub seconds each camera stop owns: the push, then a beat to read it. */
const STOP_UNIT = 1.7;

/**
 * Centre an image-space point in the frame. GSAP writes `translate(...) scale(...)`,
 * so the translation happens in unscaled parent space — hence the `* scale` term.
 * The point is clamped so the camera can never pan past an edge.
 */
function frame(f: { x: number; y: number; scale: number }) {
  const limit = 0.5 / f.scale;
  const clamp = (v: number) => Math.min(Math.max(v, limit), 1 - limit);
  return {
    scale: f.scale,
    xPercent: -(clamp(f.x) - 0.5) * 100 * f.scale,
    yPercent: -(clamp(f.y) - 0.5) * 100 * f.scale,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

interface ScreenSceneProps {
  project: ProjectData;
  beat: BeatData;
  mode: Mode;
  tone?: Tone;
  /** Which side the copy takes on desktop. */
  side: "left" | "right";
  /** Stops in order. The first is where the camera opens; the rest are moves. */
  focus: Focus[];
}

export default function ScreenScene({
  project,
  beat,
  mode,
  tone = "base",
  side,
  focus,
}: ScreenSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const pushRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLSpanElement>(null);

  const opening = focus[0];
  const moves = focus.slice(1);
  const copyLeft = side === "left";

  // The eyebrow already carries the beat number, so it is never printed twice.
  // What it doesn't carry is which product this is — that goes beside it.
  const kicker = beat.eyebrow.split("—").pop()?.trim() ?? beat.eyebrow;

  useGSAP(
    () => {
      initGsap();
      const mm = gsap.matchMedia();

      const steps = () => gsap.utils.toArray<HTMLElement>(stepsRef.current?.children ?? []);

      /** Everything legible, nothing mid-flight. The state every branch lands in. */
      const settle = () => {
        gsap.set(plateRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(pushRef.current, { scale: 1 });
        gsap.set([eyebrowRef.current, glowRef.current], { opacity: 1, y: 0 });
        gsap.set(detailRef.current?.querySelectorAll("[data-reveal]") ?? [], { opacity: 1, y: 0 });
        gsap.set(splitWords(titleRef.current), { yPercent: 0 });
      };

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const words = splitWords(titleRef.current);
        const rows = detailRef.current?.querySelectorAll("[data-reveal]") ?? [];
        const marks = steps();

        // Steps are stacked in one slot and wipe past each other under a clip.
        // A crossfade would leave a window where the slot reads empty.
        gsap.set(marks.slice(1), { yPercent: 110 });

        // The camera belongs to the pinned timeline alone. The entrance push
        // rides a separate wrapper, because a reader who reloads deep in the
        // page fires the entrance *late* — and if it shared this element it
        // would yank the camera back to the opening shot mid-walkthrough.
        gsap.set(cameraRef.current, frame(opening));

        // ── Entrance. Fires while the section is still travelling up into view,
        // so by the time it pins at the top it is already fully readable.
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
            { clipPath: "inset(0% 0% 0% 0%)", duration: DUR.plate, ease: EASE.wipe },
            0
          )
          .fromTo(pushRef.current, { scale: 1.16 }, { scale: 1, duration: 1.7 }, 0)
          .fromTo(glowRef.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.8 }, 0)
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

        // ── The pin. The camera walks the interface and the step beside it
        // changes to match. Nothing here is responsible for making content
        // appear — it advances content that is already on screen.
        const total = 0.3 + moves.length * STOP_UNIT;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${60 + moves.length * 50}%`,
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            onToggle: (self) => liveLayer(cameraRef.current, self.isActive),
          },
        });

        tl.fromTo(spineRef.current, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: total }, 0)
          .to(glowRef.current, { xPercent: copyLeft ? -8 : 8, ease: "none", duration: total }, 0);

        moves.forEach((f, j) => {
          const at = 0.3 + j * STOP_UNIT;

          // Both ends are stated. A plain .to() captures its start lazily, from
          // whatever the camera happened to be showing when the tween first
          // rendered — which under a scrub the reader can drive to anywhere.
          tl.fromTo(
            cameraRef.current,
            frame(focus[j]),
            { ...frame(f), duration: 1.15, ease: EASE.camera, immediateRender: false },
            at
          );

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

      // Phone and tablet: no pin, no camera. The crop is set once, on the
      // detail that matters, and every step is simply listed in order.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const detail = moves[0] ?? opening;
        gsap.set(cameraRef.current, frame({ ...detail, scale: Math.min(detail.scale, 1.55) }));
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
          )
          .fromTo(
            detailRef.current?.querySelectorAll("[data-reveal]") ?? [],
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: EASE.soft },
            0.25
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cameraRef.current, frame(moves[0] ?? opening));
        settle();
      });
    },
    { scope: sectionRef }
  );

  // On phones every plate is a 4:3 window cropped to the detail that matters —
  // a 1920px dashboard shown whole at 375px is unreadable. On desktop the plate
  // returns to the interface's true proportions, capped by height so a near
  // square screenshot can't outgrow the section it lives in.
  const plateVars = {
    "--plate-ar": beat.asset.aspectRatio,
    "--plate-arn": aspectToNumber(beat.asset.aspectRatio),
    "--plate-mh": PLATE_MAX_H,
  } as React.CSSProperties;

  const plateShell =
    mode === "bleed"
      ? "relative aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto"
      : "relative aspect-[4/3] w-full overflow-hidden rounded-sm lg:aspect-[var(--plate-ar)] lg:max-w-[calc(var(--plate-mh)*var(--plate-arn))] lg:shadow-[0_40px_120px_-30px_rgba(139,92,246,0.35)] lg:ring-1 lg:ring-white/12";

  return (
    <section
      ref={sectionRef}
      id={beat.id}
      className={`relative z-10 w-full overflow-hidden lg:h-screen ${
        tone === "raised" ? "bg-ink-raised" : "bg-ink"
      }`}
    >
      {/* The one light source in the room, sunk behind the interface. */}
      {mode === "framed" && (
        <div
          ref={glowRef}
          className={`glow hidden h-[70vh] w-[46vw] lg:block ${
            copyLeft ? "right-[2vw]" : "left-[2vw]"
          } top-1/2 -translate-y-1/2`}
          aria-hidden
        />
      )}

      <div className="flex flex-col lg:grid lg:h-full lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:px-[5vw]">
        {/* The interface. Edge to edge, or stood off the ground as a plate. */}
        <div
          className={
            mode === "bleed"
              ? "order-2 lg:order-none"
              : `order-2 flex justify-center lg:order-none lg:col-span-7 lg:row-start-1 ${
                  copyLeft ? "lg:col-start-6" : "lg:col-start-1"
                }`
          }
        >
          <div ref={plateRef} className={plateShell} style={plateVars}>
            {/* Two nested transforms: the entrance push, then the scrubbed camera. */}
            <div ref={pushRef} className="absolute inset-0 origin-center transform-gpu">
              <div ref={cameraRef} className="absolute inset-0 origin-center transform-gpu">
                <Image
                  src={beat.asset.src}
                  alt={beat.asset.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 60vw"
                  className="select-none object-cover"
                />
                {beat.asset.redactionZones?.map((z) => (
                  <div
                    key={z.label}
                    aria-label={z.label}
                    className="pointer-events-none absolute bg-neutral-900/70 backdrop-blur-lg"
                    style={{ top: z.top, left: z.left, width: z.width, height: z.height }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*
          Wash sits between plate and copy. It has to stay near-opaque across
          the whole copy column, not just its outer edge — the copy runs to
          roughly 47% of the width, and a screenshot's white panels showing
          through at even 30% drop this small type under 3.5:1.
        */}
        {mode === "bleed" && (
          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background: `linear-gradient(${copyLeft ? "90deg" : "270deg"},
                rgba(8,8,10,0.985) 0%, rgba(8,8,10,0.98) 34%, rgba(8,8,10,0.96) 46%,
                rgba(8,8,10,0.88) 56%, rgba(8,8,10,0.62) 68%, rgba(8,8,10,0.3) 80%,
                rgba(8,8,10,0.08) 90%, rgba(8,8,10,0) 97%)`,
            }}
          />
        )}

        <div
          ref={copyRef}
          className={`relative order-1 px-6 pb-14 pt-28 sm:px-10 lg:order-none lg:row-start-1 lg:px-0 lg:pb-0 lg:pt-0 ${
            mode === "bleed" ? "lg:col-span-5" : "lg:col-span-4"
          } ${copyLeft ? "lg:col-start-1" : "lg:col-start-8"}`}
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
            className="display mt-5 text-[clamp(2rem,7vw,3.5rem)] text-white lg:mt-7 lg:text-[clamp(2.25rem,3.3vw,3.4rem)]"
          >
            {beat.title}
          </h2>

          <div ref={detailRef} className="mt-5 lg:mt-6">
            {beat.subtitleItalic && (
              <p data-reveal className="max-w-md text-[0.9375rem] leading-[1.6] text-white/60">
                {beat.subtitleItalic}
              </p>
            )}

            {/*
              The signature: a spine that fills as the section plays, and beside
              it the one block that changes. Each step names what the camera is
              framing and what was built there — scroll advances both together.
            */}
            <div className="relative mt-9 pl-6">
              <span className="absolute left-0 top-0 h-full w-px bg-white/12" aria-hidden>
                <span
                  ref={spineRef}
                  className="block h-full w-px origin-top scale-y-0 bg-amethyst"
                />
              </span>

              <div ref={stepsRef} data-reveal className="relative h-[12rem] overflow-hidden lg:h-[11rem]">
                {focus.map((f, i) => (
                  <div key={f.look} className="absolute inset-0">
                    <p className="label tabular-nums text-amethyst-soft">
                      {pad(i + 1)} / {pad(focus.length)}
                    </p>
                    <p className="mt-3 max-w-md text-[0.9375rem] leading-[1.55] text-white">
                      {f.look}
                    </p>
                    {/* Step one says what the product is. Every step after says
                        what was built in the region the camera just moved to. */}
                    <p className="mt-2.5 max-w-md text-[0.8125rem] leading-[1.7] text-white/50">
                      {i === 0 ? beat.narrative : beat.contribution[i - 1] ?? beat.interfaceCallout}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <ul data-reveal className="mt-8 flex max-w-md flex-wrap gap-2">
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
              <div data-reveal className="mt-7 flex flex-wrap gap-3">
                {beat.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-flex items-center gap-2 rounded-full border border-amethyst/50 px-6 py-3 text-amethyst-soft transition-colors hover:bg-amethyst hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst"
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
