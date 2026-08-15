"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function ReelAgentScene() {
  return (
    <ScreenScene
      beat={PORTFOLIO_DATA.projects[4].beats[0]}
      mode="bleed"
      ground="ink"
      side="right"
      focus={[
        { x: 0.45, y: 0.42, scale: 1.06 },
        { x: 0.3, y: 0.28, scale: 1.9 },    // burned-in captions
        { x: 0.45, y: 0.62, scale: 1.8 },   // upload to render pipeline
        { x: 0.5, y: 0.86, scale: 1.7 },    // scene timeline
      ]}
    />
  );
}
