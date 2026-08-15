"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function StarzRankScene() {
  return (
    <ScreenScene
      beat={PORTFOLIO_DATA.projects[0].beats[1]}
      mode="object"
      ground="paper"
      side="left"
      focus={[
        { x: 0.5, y: 0.45, scale: 1.06 },
        { x: 0.35, y: 0.28, scale: 1.9 },  // DIBIL gauge + reach stats
        { x: 0.55, y: 0.5, scale: 1.75 },  // keyword research + competitors
      ]}
    />
  );
}
