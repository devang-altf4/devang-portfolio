"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const project = PORTFOLIO_DATA.projects[0];

export default function StarzAdsScene() {
  return (
    <ScreenScene
      project={project}
      beat={project.beats[5]}
      tone="base"
      side="left"
      focus={[
        { x: 0.55, y: 0.5, scale: 1.06, look: "The paid ad studio, whole" },
        { x: 0.35, y: 0.52, scale: 1.85, look: "Four tailored campaign variants" },
        { x: 0.55, y: 0.87, scale: 1.9, look: "Created paused — activation stays with a human" },
        { x: 0.72, y: 0.35, scale: 1.8, look: "Audience and copy selection" },
      ]}
    />
  );
}
