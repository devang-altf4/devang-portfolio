"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import type { BeatData } from "@/data/portfolio";

/** A point of interest inside a screenshot, in 0..1 image coordinates. */
export interface Focus {
  x: number;
  y: number;
  scale: number;
}

/**
 * `bleed` puts the interface edge to edge on a dark ground with light type over it.
 * `object` sits it on a paper ground as a printed plate with dark type beside it.
 * Scenes alternate so the page never settles into one rhythm.
 */
export type Mode = "bleed" | "object";
export type Ground =
  | "ink"
  | "ink-soft"
  | "indigo"
  | "navy"
  | "forest"
  | "paper"
  | "paper-cool"
  | "paper-warm";

const GROUND: Record<Ground, { bg: string; light: boolean }> = {
  ink: { bg: "#0b0b0c", light: true },
  "ink-soft": { bg: "#101014", light: true },
  indigo: { bg: "#2323ee", light: true },
  navy: { bg: "#0a1f44", light: true },
  forest: { bg: "#04351f", light: true },
  paper: { bg: "#f1ede4", light: false },
  "paper-cool": { bg: "#e9edf1", light: false },
  "paper-warm": { bg: "#e8dfcb", light: false },
};

/**
 * Centre an image-space point in the frame. GSAP writes `translate(...) scale(...)`,
 * so the translation happens in unscaled parent space — hence the `* scale` term.
 * The point is clamped so the camera can never pan past an edge.
 */
function frame(f: Focus) {
  const limit = 0.5 / f.scale;
  const clamp = (v: number) => Math.min(Math.max(v, limit), 1 - limit);
  return {
    scale: f.scale,
    xPercent: -(clamp(f.x) - 0.5) * 100 * f.scale,
    yPercent: -(clamp(f.y) - 0.5) * 100 * f.scale,
  };
}

interface ScreenSceneProps {
  beat: BeatData;
  mode: Mode;
  ground: Ground;
  /** Which side the copy takes on desktop. */
  side: "left" | "right";
  /** Camera stops, in order. The first is the establishing shot. */
  focus: Focus[];
}

export default function ScreenScene({ beat, mode, ground, side, focus }: ScreenSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const g = GROUND[ground];
  const establishing = focus[0] ?? { x: 0.5, y: 0.5, scale: 1.06 };
  const stops = focus.slice(1);
  const copyLeft = side === "left";

  // One text colour system, flipped by ground.
  const t = g.light
    ? { head: "text-white", body: "text-white/70", mute: "text-white/45", rule: "bg-white/25", link: "text-white border-white/35 hover:bg-white hover:text-black" }
    : { head: "text-ink", body: "text-ink/70", mute: "text-ink/50", rule: "bg-ink/25", link: "text-ink border-ink/30 hover:bg-ink hover:text-paper" };

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(cameraRef.current, frame(establishing));

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=260%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Masked reveal: the plate wipes open, the line wipes up behind it.
        tl.fromTo(
          plateRef.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" },
          0
        ).fromTo(
          headRef.current,
          { clipPath: "inset(0% 0% 100% 0%)", y: 24 },
          { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1, ease: "power3.out" },
          0.25
        );

        stops.forEach((f, i) => {
          tl.to(cameraRef.current, { ...frame(f), duration: 1.8, ease: "power2.inOut" }, 1.3 + i * 1.8);
        });

        tl.fromTo(
          detailRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9 },
          1.3 + Math.max(stops.length - 1, 0) * 1.8
        );
      });

      // Phone and tablet: no pin, no camera drift. The crop is set once, on the
      // detail that matters, and the page simply scrolls.
      mm.add("(max-width: 1023px)", () => {
        const detail = stops[0] ?? establishing;
        gsap.set(cameraRef.current, frame({ ...detail, scale: Math.min(detail.scale, 1.6) }));
        gsap.set([headRef.current, plateRef.current], { clipPath: "inset(0% 0% 0% 0%)", y: 0 });
        gsap.set(detailRef.current, { opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cameraRef.current, frame(stops[0] ?? establishing));
        gsap.set([headRef.current, plateRef.current], { clipPath: "inset(0% 0% 0% 0%)", y: 0 });
        gsap.set(detailRef.current, { opacity: 1, y: 0 });
      });
    },
    { scope: sectionRef }
  );

  // On phones every plate is a 4:3 window cropped to the detail that matters —
  // a 1920px dashboard shown whole at 375px is unreadable. Desktop paper plates
  // return to the interface's true proportions.
  const plateAspect = { "--plate-ar": beat.asset.aspectRatio } as React.CSSProperties;

  const plateShell =
    mode === "bleed"
      ? "relative aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto"
      : "relative aspect-[4/3] w-full overflow-hidden lg:aspect-[var(--plate-ar)] lg:rounded-sm lg:shadow-[0_30px_80px_-20px_rgba(11,11,12,0.4)] lg:ring-1 lg:ring-ink/10";

  return (
    <section
      ref={sectionRef}
      id={beat.id}
      className="relative z-10 w-full overflow-hidden lg:h-screen"
      style={{ backgroundColor: g.bg }}
    >
      <div className="flex flex-col lg:grid lg:h-full lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:px-[5vw]">
        {/* The interface. Full bleed on dark grounds, a printed plate on paper. */}
        <div
          className={
            mode === "bleed"
              ? "order-2 lg:order-none"
              : `order-2 lg:order-none lg:col-span-7 lg:row-start-1 ${copyLeft ? "lg:col-start-6" : "lg:col-start-1"}`
          }
        >
          <div ref={plateRef} className={plateShell} style={plateAspect}>
            <div ref={cameraRef} className="absolute inset-0 origin-center transform-gpu will-change-transform">
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
                  className="pointer-events-none absolute bg-neutral-800/60 backdrop-blur-lg"
                  style={{ top: z.top, left: z.left, width: z.width, height: z.height }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Wash sits between plate and copy, desktop only. */}
        {mode === "bleed" && (
          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background: `linear-gradient(${copyLeft ? "90deg" : "270deg"},
                ${hexA(g.bg, 0.96)} 0%, ${hexA(g.bg, 0.94)} 24%, ${hexA(g.bg, 0.86)} 34%,
                ${hexA(g.bg, 0.7)} 44%, ${hexA(g.bg, 0.46)} 56%, ${hexA(g.bg, 0.22)} 68%,
                ${hexA(g.bg, 0.07)} 82%, ${hexA(g.bg, 0)} 94%)`,
            }}
          />
        )}

        <div
          className={`relative order-1 px-6 pb-12 pt-28 sm:px-10 lg:order-none lg:row-start-1 lg:px-0 lg:pb-0 lg:pt-0 ${
            mode === "bleed" ? "lg:col-span-5" : "lg:col-span-4"
          } ${copyLeft ? "lg:col-start-1" : "lg:col-start-8"}`}
        >
          <div ref={headRef}>
            <p className={`label ${t.mute}`}>
              {beat.beatIndex} — {beat.eyebrow}
            </p>
            <h2 className={`display mt-5 text-[clamp(2rem,7vw,3.5rem)] lg:mt-7 lg:text-[clamp(2.25rem,3.4vw,3.5rem)] ${t.head}`}>
              {beat.title}
            </h2>
            {beat.subtitleItalic && (
              <p className={`mt-5 max-w-md text-[0.9375rem] leading-[1.65] lg:mt-6 lg:text-base ${t.body}`}>
                {beat.subtitleItalic}
              </p>
            )}
          </div>

          <div ref={detailRef} className="mt-10 lg:mt-12">
            <p className={`max-w-md text-[0.875rem] leading-[1.8] ${t.body}`}>{beat.narrative}</p>
            <ul className={`mt-7 max-w-md space-y-2 border-t pt-6 ${g.light ? "border-white/15" : "border-ink/15"}`}>
              {beat.contribution.map((item) => (
                <li key={item} className={`text-[0.8125rem] leading-[1.65] ${t.mute}`}>
                  {item}
                </li>
              ))}
            </ul>
            {beat.links.length > 0 && (
              <div className="mt-9 flex flex-wrap gap-3">
                {beat.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`label inline-flex items-center gap-2 rounded-full border px-6 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${t.link}`}
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

/** Hex to rgba string, for building grounds-aware gradients. */
function hexA(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
