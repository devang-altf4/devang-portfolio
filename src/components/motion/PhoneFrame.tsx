"use client";

import React from "react";

export default function PhoneFrame({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-[290px] sm:w-[320px] md:w-[350px] aspect-[9/19.5] rounded-[48px] p-3 bg-neutral-900 border-[3px] border-white/20 shadow-2xl backdrop-blur-2xl ${className}`}>
      {/* Top Pill */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-end px-2">
        <div className="w-2 h-2 rounded-full bg-neutral-800" />
      </div>

      {/* Screen Viewport */}
      <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black flex items-center justify-center">
        {children}
      </div>

      {/* Home Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-30" />
    </div>
  );
}
