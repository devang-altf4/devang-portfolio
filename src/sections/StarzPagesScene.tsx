"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const project = PORTFOLIO_DATA.projects[0];

export default function StarzPagesScene() {
  return (
    <ScreenScene
      project={project}
      beat={project.beats[4]}
      tone="raised"
      side="right"
      focus={[
        { x: 0.45, y: 0.5, scale: 1.06, look: "The web agent builder, whole" },
        { x: 0.33, y: 0.52, scale: 2.0, look: "A landing page compiled on the canvas" },
        { x: 0.8, y: 0.36, scale: 1.7, look: "Leads landing in the capture rail" },
        { x: 0.5, y: 0.62, scale: 1.75, look: "The mobile-first preview container" },
      ]}
    />
  );
}
