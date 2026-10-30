"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let instance: Lenis | null = null;

/**
 * The live smooth scroller, or null (reduced motion, not yet mounted).
 * Anything that moves the page programmatically — snapping, anchors — must go
 * through it: scrolling the window directly fights Lenis's own target and
 * overshoots.
 */
export function getLenis() {
  return instance;
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so there is one animation
 * loop, feeding ScrollTrigger on every scroll. Off under reduced motion — the
 * browser's own scrolling is the accessible default.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    instance = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Media decoding late changes section heights; pins must re-measure.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return <>{children}</>;
}
