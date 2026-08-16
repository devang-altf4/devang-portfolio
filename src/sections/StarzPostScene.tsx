"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const project = PORTFOLIO_DATA.projects[0];

export default function StarzPostScene() {
  return (
    <ScreenScene
      project={project}
      beat={project.beats[2]}
      mode="bleed"
      tone="raised"
      side="right"
      focus={[
        { x: 0.55, y: 0.45, scale: 1.06, look: "The creative agent workspace, whole" },
        { x: 0.5, y: 0.46, scale: 1.5, look: "Four variants generated in one pass" },
        { x: 0.74, y: 0.46, scale: 1.85, look: "Scheduling straight out to the channels" },
        { x: 0.32, y: 0.46, scale: 1.85, look: "The live preview canvas" },
      ]}
    />
  );
}
