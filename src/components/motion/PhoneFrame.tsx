"use client";

import React from "react";

/**
 * Sized by height, never by width, and much shorter on phones — the mobile
 * layout pins the section and has to fit the device and the copy in one
 * viewport.
 *
 * Sized by height, never by width. A 350px-wide frame at 9/19.5 stands 758px
 * tall, which overflows any laptop viewport once section padding is counted —
 * the frame then pushes past the fold and the fixed nav lands on top of it.
 * Deriving the width from a capped height keeps it inside the screen at every
 * size, and `max-w` catches the narrow-phone case where 68vh is still too wide.
 */
export default function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto aspect-[9/19.5] h-[min(31svh,300px)] sm:h-[min(42svh,420px)] lg:h-[min(68vh,660px)] w-auto max-w-[82vw] rounded-[44px] border-[3px] border-white/15 bg-neutral-950 p-2.5 shadow-[0_40px_120px_-30px_rgba(139,92,246,0.45)] ${className}`}
    >
      <div className="absolute left-1/2 top-4 z-30 flex h-3.5 w-20 -translate-x-1/2 items-center justify-end rounded-full bg-black px-2">
        <div className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
      </div>

      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[34px] bg-black">
        {children}
      </div>

      <div className="absolute bottom-3 left-1/2 z-30 h-1 w-24 -translate-x-1/2 rounded-full bg-white/35" />
    </div>
  );
}
