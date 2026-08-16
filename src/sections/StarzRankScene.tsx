"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const project = PORTFOLIO_DATA.projects[0];

export default function StarzRankScene() {
  return (
    <ScreenScene
      project={project}
      beat={project.beats[1]}
      tone="base"
      side="left"
      focus={[
        { x: 0.5, y: 0.45, scale: 1.06, look: "The local search audit console, whole" },
        { x: 0.35, y: 0.28, scale: 1.9, look: "DIBIL visibility score and monthly reach" },
        { x: 0.55, y: 0.5, scale: 1.75, look: "Keyword audit against ranked competitors" },
        { x: 0.7, y: 0.3, scale: 1.8, look: "Map queries and action telemetry" },
      ]}
    />
  );
}
