"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function EstateXScene() {
  return (
    <ScreenScene
      beat={PORTFOLIO_DATA.projects[3].beats[0]}
      mode="object"
      ground="paper-cool"
      side="left"
      focus={[
        { x: 0.5, y: 0.24, scale: 1.1 },
        { x: 0.5, y: 0.14, scale: 1.8 },    // filters and query controls
        { x: 0.45, y: 0.34, scale: 1.85 },  // priced inventory rows
      ]}
    />
  );
}
