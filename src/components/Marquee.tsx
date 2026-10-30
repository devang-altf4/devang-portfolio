"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** The 3D objects that separate the phrases, in turn. */
const GLYPHS = ["code", "ai-core", "phone", "wave", "windows"];

/**
 * A line of display type that never ends. It drifts on its own, and the
 * scroll drives it: scrolling down speeds it on, scrolling up turns it round,
 * and a hard flick leans the letters into the motion before they settle.
 *
 * Driven by hand on GSAP's ticker rather than by a repeating tween, so a
 * direction change is just a sign flip, with no tween to reverse past zero.
 */
export default function Marquee({
  items,
  reverse = false,
  outline = false,
  speed = 70,
  className = "",
}: {
  items: readonly string[];
  /** Run left-to-right instead of right-to-left. */
  reverse?: boolean;
  /** Hollow letters, for a quieter second line under a solid one. */
  outline?: boolean;
  /** Resting drift, px per second. */
  speed?: number;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const leanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The track holds two identical copies; wrapping x over one copy's width
    // makes the seam invisible.
    let span = track.scrollWidth / 2;
    const ro = new ResizeObserver(() => {
      span = track.scrollWidth / 2;
    });
    ro.observe(track);

    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(root);

    const sign = reverse ? -1 : 1;
    let dir = 1;
    let boost = 0;
    let x = reverse ? -span : 0;
    const setX = gsap.quickSetter(track, "x", "px");
    const setLean = gsap.quickSetter(leanRef.current, "skewX", "deg");
    const wrap = (v: number) => gsap.utils.wrap(-span, 0, v);

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        dir = self.direction;
        boost = Math.max(boost, Math.min(Math.abs(self.getVelocity()) / 220, 9));
      },
    });

    const tick = (_t: number, dt: number) => {
      if (!visible) return;
      boost *= 0.93;
      x = wrap(x - (speed * dt) / 1000 * (1 + boost) * dir * sign);
      setX(x);
      setLean(-gsap.utils.clamp(-10, 10, boost * 1.6) * dir * sign);
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      ro.disconnect();
      io.disconnect();
    };
  }, [reverse, speed]);

  const copy = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {[...items, ...items].map((item, i) => (
        <span key={i} className="flex items-center">
          <span className={outline ? "text-outline" : undefined}>{item}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/media/obj/${GLYPHS[i % GLYPHS.length]}.webp`}
            alt=""
            className="mx-[0.35em] h-[0.72em] w-auto"
            loading="lazy"
            decoding="async"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div ref={rootRef} className={`overflow-hidden ${className}`}>
      <div ref={leanRef} className="will-change-transform">
        <div ref={trackRef} className="display flex w-max whitespace-nowrap will-change-transform [text-wrap:nowrap]">
          {copy(false)}
          {copy(true)}
        </div>
      </div>
    </div>
  );
}
