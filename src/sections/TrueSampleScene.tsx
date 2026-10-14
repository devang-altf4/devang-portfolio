"use client";

import DeviceScene from "@/components/motion/DeviceScene";
import { projectById } from "@/data/portfolio";

const project = projectById("truesample");

export default function TrueSampleScene() {
  return (
    <DeviceScene
      project={project}
      beat={project.beats[0]}
      side="left"
      tone="base"
      focus={[
        { x: 0.5, y: 0.5, scale: 1.0, look: "The player, whole" },
        { x: 0.5, y: 0.3, scale: 1.4, look: "The DAC, claimed over USB" },
        { x: 0.5, y: 0.5, scale: 1.4, look: "A DAC mode for every song" },
        { x: 0.5, y: 0.7, scale: 1.4, look: "An EQ that never clips" },
      ]}
    />
  );
}
