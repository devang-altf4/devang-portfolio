"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function CallingAgentScene() {
  return (
    <ScreenScene
      beat={PORTFOLIO_DATA.projects[2].beats[0]}
      mode="bleed"
      ground="navy"
      side="right"
      focus={[
        { x: 0.5, y: 0.42, scale: 1.06 },
        { x: 0.45, y: 0.32, scale: 1.8 },   // CSV lead ingestion
        { x: 0.55, y: 0.76, scale: 1.7 },   // call outcome queue
      ]}
    />
  );
}
