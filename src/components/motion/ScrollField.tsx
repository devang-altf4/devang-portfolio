"use client";

import WebThreads from "@/components/motion/WebThreads";

/**
 * The page's ambient layer, fixed behind every section. Section grounds are
 * translucent so the threads read faintly the whole way down and clearly
 * behind the hero, which is the most transparent ground on the page.
 */
export default function ScrollField() {
  return (
    <div className="scroll-field" aria-hidden>
      <WebThreads
        color1="#5227FF"
        color2="#C9B8FF"
        color3="#FFFFFF"
        speed={0.18}
        threadCount={5}
        frequency={4.2}
        spread={0.2}
        taper={1.0}
        position={0.5}
        fanMode="center"
        glow={0.022}
        falloff={0.6}
        thickness={1.1}
        brightness={0.62}
        opacity={1}
        mirror
        shimmer={false}
        grain
        grainIntensity={0.04}
        mouseInteraction
        mouseStrength={0.3}
      />
    </div>
  );
}
