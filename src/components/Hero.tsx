"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/content/site";
import { pageReady } from "./ready";

/**
 * The monolith scene loops behind the name. Its first frame is the intro's
 * last, and the name sits exactly where the opening left it — the opening
 * dissolves into this rather than cutting to it.
 *
 * Phones get a vertical cut of the same loop (monolith centre-frame, name
 * beneath). On a fine pointer, a soft amber light follows the cursor.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Footage and supporting copy start when the opening hands over.
  useEffect(() => {
    let cancelled = false;
    pageReady.then(() => {
      if (cancelled) return;
      setReady(true);
      void videoRef.current?.play().catch(() => {});
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // The cursor light: transform only, eased toward the pointer each frame.
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const light = lightRef.current;
    if (!light) return;
    const target = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.5 };
    const pos = { ...target };
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      light.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Leaving: the copy drifts up and dims as the transition takes over.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(copyRef.current, {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover [object-position:74%_50%]"
        poster="/media/hero-poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src="/media/hero-loop-mobile.mp4" media="(max-width: 639px)" type="video/mp4" />
        <source src="/media/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Keeps the type legible over the footage: dark from the copy's side. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent lg:bg-gradient-to-r lg:from-ink/85 lg:via-ink/25 lg:to-transparent"
        aria-hidden
      />
      <div
        ref={lightRef}
        className="pointer-events-none absolute left-0 top-0 hidden h-[44rem] w-[44rem] rounded-full mix-blend-screen [@media(pointer:fine)]:block"
        style={{ background: "radial-gradient(closest-side, rgba(226,176,124,0.22), rgba(226,176,124,0.06) 55%, transparent)" }}
        aria-hidden
      />

      <div ref={copyRef} className="hero-copy relative h-full">
        <h1 className="display hero-name">{profile.name}</h1>

        <div className={`hero-follow mt-6 max-w-xl ${ready ? "is-ready" : ""}`}>
          <p className="text-lg text-paper/85 sm:text-xl">
            {profile.role} building cinematic frontends, real-time voice AI and multi-agent products.
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
            {profile.availability} — {profile.location}, {profile.workMode}.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={profile.emailHref} className="btn btn-solid">
              Email me
            </a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Résumé ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      <a
        href="#work-intro"
        className="absolute bottom-6 right-5 hidden items-center gap-3 text-xs text-muted sm:flex lg:right-[6vw]"
      >
        Scroll
        <span className="h-10 w-px bg-line" aria-hidden />
      </a>
    </section>
  );
}
