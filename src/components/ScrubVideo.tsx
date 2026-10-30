"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * A video whose playhead is the scroll position: the camera pushes into the
 * monolith exactly as fast as the reader scrolls, in either direction. The
 * file is encoded all-keyframe so any seek lands instantly.
 *
 * The section is `heightVh` tall with the video stuck to the screen inside
 * it; progress 0→1 across that height maps to 0→duration.
 *
 * Phones and tablets get `frames` instead: the same push as a numbered image
 * sequence drawn on a canvas. iOS Safari never preloads video and Low Power
 * Mode refuses to play it at all, so a scrubbed <video> stays black there;
 * images always load.
 */
export default function ScrubVideo({
  id,
  src,
  frames,
  heightVh = 160,
  children,
}: {
  id?: string;
  src: string;
  /** Portrait frame sequence for touch screens: `${dir}/001.webp` … */
  frames?: { dir: string; count: number };
  heightVh?: number;
  children?: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const [useFrames, setUseFrames] = useState(false);

  useEffect(() => {
    if (frames && window.matchMedia("(pointer: coarse), (max-width: 1023px)").matches) setUseFrames(true);
  }, [frames]);

  // Touch screens: draw the nearest loaded frame, cover-fit, on each scroll.
  useEffect(() => {
    if (!useFrames || !frames) return;
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const g = canvas?.getContext("2d");
    if (!canvas || !section || !g) return;

    const images: HTMLImageElement[] = [];
    const ready: boolean[] = [];
    let target = 0;
    let raf = 0;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
    };
    const draw = () => {
      raf = 0;
      const want = Math.round(target * (frames.count - 1));
      // Nearest frame that has arrived, so a fast scroll never shows black.
      let i = want;
      for (let d = 0; d < frames.count; d++) {
        if (ready[want - d]) { i = want - d; break; }
        if (ready[want + d]) { i = want + d; break; }
      }
      const img = images[i];
      if (!img || !ready[i]) return;
      const { width: cw, height: ch } = canvas;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      g.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    // Start fetching when the section is a screen or two away: first frame
    // first, then the rest in order.
    const load = () => {
      for (let i = 0; i < frames.count; i++) {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          ready[i] = true;
          request();
        };
        img.src = `${frames.dir}/${String(i + 1).padStart(3, "0")}.webp`;
        images[i] = img;
      }
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        load();
      },
      { rootMargin: "200% 0px" }
    );
    io.observe(section);

    size();
    const onResize = () => {
      size();
      request();
    };
    window.addEventListener("resize", onResize);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          target = self.progress;
          request();
        },
      });
      gsap.fromTo(
        captionRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: section, start: "55% bottom", end: "85% bottom", scrub: true },
        }
      );
    });

    return () => {
      ctx.revert();
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [useFrames, frames]);

  useEffect(() => {
    if (useFrames) return;
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
  }, [useFrames]);

  return (
    <section ref={sectionRef} id={id} className="relative bg-ink" style={{ height: `${heightVh}svh` }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {useFrames ? (
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={src}
            muted
            playsInline
            preload="auto"
            aria-hidden
          />
        )}
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
