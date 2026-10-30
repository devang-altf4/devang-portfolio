"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * A video whose playhead is the scroll position: the camera pushes into the
 * monolith exactly as fast as the reader scrolls, in either direction. The
 * file is encoded all-keyframe so any seek lands instantly.
 *
 * The section is `heightVh` tall with the video stuck to the screen inside
 * it; progress 0→1 across that height maps to 0→duration.
 */
export default function ScrubVideo({
  id,
  src,
  heightVh = 160,
  children,
}: {
  id?: string;
  src: string;
  heightVh?: number;
  children?: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = 0;
    let raf = 0;
    const seek = () => {
      raf = 0;
      if (video.readyState >= 1 && Number.isFinite(video.duration)) {
        video.currentTime = Math.min(video.duration - 0.05, target * video.duration);
      }
    };

    // Some mobile browsers won't seek a video that has never played; a
    // play-then-pause primes it without showing motion.
    const prime = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };
    video.addEventListener("loadedmetadata", prime, { once: true });

    if (reduced) {
      // One still from the middle of the push, no scrubbing.
      const still = () => {
        video.currentTime = video.duration * 0.45;
      };
      if (video.readyState >= 1) still();
      else video.addEventListener("loadedmetadata", still, { once: true });
      gsap.set(captionRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          target = self.progress;
          if (!raf) raf = requestAnimationFrame(seek);
        },
      });
      gsap.fromTo(
        captionRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "55% bottom", end: "85% bottom", scrub: true },
        }
      );
    });

    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id={id} className="relative bg-ink" style={{ height: `${heightVh}svh` }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
        {/* Soft joins into the black above and below. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink to-transparent" aria-hidden />
        <div ref={captionRef} className="absolute inset-0 flex items-center justify-center px-6 opacity-0">
          {children}
        </div>
      </div>
    </section>
  );
}
