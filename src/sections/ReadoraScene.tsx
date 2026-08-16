"use client";

import DeviceScene from "@/components/motion/DeviceScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const project = PORTFOLIO_DATA.projects[1];

export default function ReadoraScene() {
  return (
    <DeviceScene
      project={project}
      beat={project.beats[0]}
      side="right"
      tone="raised"
      focus={[
        { x: 0.5, y: 0.5, scale: 1.0, look: "The reader running, whole" },
        { x: 0.5, y: 0.32, scale: 1.35, look: "A local library, parsed and indexed on device" },
        { x: 0.5, y: 0.52, scale: 1.4, look: "State held in SQLite, no network in the loop" },
        { x: 0.5, y: 0.7, scale: 1.35, look: "Gestural page turns and theme inversion" },
      ]}
    />
  );
}
