"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function StarzPostScene() {
  return (
    <ScreenScene
      beat={PORTFOLIO_DATA.projects[0].beats[2]}
      mode="bleed"
      ground="ink-soft"
      side="right"
      focus={[
        { x: 0.55, y: 0.45, scale: 1.06 },
        { x: 0.32, y: 0.46, scale: 1.85 },  // first pair of generated posts
        { x: 0.74, y: 0.46, scale: 1.85 },  // sweep to the last pair
      ]}
    />
  );
}
