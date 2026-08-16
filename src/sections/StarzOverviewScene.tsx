"use client";

import DeviceScene from "@/components/motion/DeviceScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const project = PORTFOLIO_DATA.projects[0];

export default function StarzOverviewScene() {
  return (
    <DeviceScene
      project={project}
      beat={project.beats[0]}
      side="left"
      tone="base"
      focus={[
        { x: 0.5, y: 0.5, scale: 1.0, look: "The suite on a phone, whole" },
        { x: 0.5, y: 0.34, scale: 1.55, look: "Three agents, each running on its own card" },
        { x: 0.5, y: 0.15, scale: 1.5, look: "Onboarding into the workspace" },
        { x: 0.5, y: 0.72, scale: 1.55, look: "Shared telemetry, read across every agent" },
      ]}
    />
  );
}
