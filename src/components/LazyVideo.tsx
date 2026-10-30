"use client";

import { useEffect, useRef } from "react";

/**
 * A muted, looping clip that costs nothing until it is on screen: no preload,
 * the poster shows instead, and it plays only while at least 30 % visible.
 * Browsers suspend video in hidden tabs; coming back, it picks up again.
 */
export default function LazyVideo({
  src,
  poster,
  className = "",
  label,
}: {
  src: string;
  poster: string;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let onScreen = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.3 }
    );
    io.observe(v);
    const onVisible = () => {
      if (!document.hidden && onScreen) void v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}
