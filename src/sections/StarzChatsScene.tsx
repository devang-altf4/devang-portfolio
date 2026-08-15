"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function StarzChatsScene() {
  return (
    <ScreenScene
      beat={PORTFOLIO_DATA.projects[0].beats[3]}
      mode="bleed"
      ground="ink"
      side="left"
      focus={[
        { x: 0.5, y: 0.5, scale: 1.06 },
        { x: 0.5, y: 0.56, scale: 1.85 },   // live conversation thread
        { x: 0.84, y: 0.42, scale: 1.9 },   // lead qualification score
      ]}
    />
  );
}
