"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const project = PORTFOLIO_DATA.projects[3];

export default function EstateXScene() {
  return (
    <ScreenScene
      project={project}
      beat={project.beats[0]}
      tone="base"
      side="left"
      focus={[
        { x: 0.5, y: 0.42, scale: 1.05, look: "The broker property dashboard, whole" },
        { x: 0.45, y: 0.5, scale: 1.8, look: "864 verified listings, filtered live" },
        { x: 0.72, y: 0.45, scale: 1.9, look: "Rupee packages, formatted to the lakh" },
        { x: 0.5, y: 0.22, scale: 1.7, look: "Type, category and locality controls" },
      ]}
    />
  );
}
