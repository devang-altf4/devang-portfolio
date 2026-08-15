"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function StarzPagesScene() {
  return (
    <ScreenScene
      beat={PORTFOLIO_DATA.projects[0].beats[4]}
      mode="object"
      ground="paper"
      side="right"
      focus={[
        { x: 0.45, y: 0.5, scale: 1.06 },
        { x: 0.33, y: 0.52, scale: 2.0 },   // the generated landing page
        { x: 0.8, y: 0.36, scale: 1.7 },    // captured leads rail
      ]}
    />
  );
}
