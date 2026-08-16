"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const project = PORTFOLIO_DATA.projects[2];

export default function CallingAgentScene() {
  return (
    <ScreenScene
      project={project}
      beat={project.beats[0]}
      mode="bleed"
      tone="raised"
      side="right"
      focus={[
        { x: 0.5, y: 0.42, scale: 1.06, look: "The outbound calling workspace, whole" },
        { x: 0.55, y: 0.5, scale: 1.75, look: "Audio moving both ways over one socket" },
        { x: 0.5, y: 0.72, scale: 1.7, look: "Turn-taking as the agent holds a call" },
        { x: 0.45, y: 0.32, scale: 1.8, look: "A CSV of leads becoming a dial queue" },
      ]}
    />
  );
}
