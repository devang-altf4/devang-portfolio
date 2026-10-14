"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { projectById } from "@/data/portfolio";

const project = projectById("ai-calling");

export default function CallingAgentScene() {
  return (
    <ScreenScene
      project={project}
      beat={project.beats[0]}
      tone="raised"
      side="right"
      focus={[
        { x: 0.5, y: 0.45, scale: 1.0, look: "The calling workspace, whole" },
        { x: 0.5, y: 0.34, scale: 1.6, look: "A live voice call, straight from the browser" },
        { x: 0.5, y: 0.5, scale: 1.7, look: "A CSV of leads becoming a call queue" },
        { x: 0.5, y: 0.76, scale: 1.6, look: "Every call's outcome, written back to the pipeline" },
      ]}
    />
  );
}
