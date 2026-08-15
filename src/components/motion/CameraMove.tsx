"use client";

import React, { forwardRef } from "react";
import Image from "next/image";

export interface CameraMoveProps {
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: string;
  children?: React.ReactNode;
}

export const CameraMove = forwardRef<
  HTMLDivElement,
  CameraMoveProps & React.HTMLAttributes<HTMLDivElement>
>(({ src, alt, priority = false, aspectRatio = "16/9", children, className = "", ...props }, ref) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ aspectRatio }}
      {...props}
    >
      <div
        ref={ref}
        className="relative w-full h-full will-change-transform transform-gpu origin-center"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 90vw"
          className="object-cover object-top select-none"
        />
        {children}
      </div>
    </div>
  );
});

CameraMove.displayName = "CameraMove";
