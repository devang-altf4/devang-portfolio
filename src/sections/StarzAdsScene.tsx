"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function StarzAdsScene() {
  return (
    <ScreenScene
      beat={PORTFOLIO_DATA.projects[0].beats[5]}
      mode="bleed"
      ground="indigo"
      side="left"
      focus={[
        { x: 0.55, y: 0.5, scale: 1.06 },
        { x: 0.35, y: 0.52, scale: 1.85 },  // the four ad variants
        { x: 0.55, y: 0.87, scale: 1.9 },   // review bar before launch
      ]}
    />
  );
}
