"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const project = PORTFOLIO_DATA.projects[4];

export default function ReelAgentScene() {
  return (
    <ScreenScene
      project={project}
      beat={project.beats[0]}
      mode="bleed"
      tone="raised"
      side="right"
      focus={[
        { x: 0.45, y: 0.42, scale: 1.06, look: "The video pipeline workspace, whole" },
        { x: 0.45, y: 0.62, scale: 1.8, look: "Upload, transcribe, caption, render" },
        { x: 0.3, y: 0.28, scale: 1.9, look: "Whisper splitting speech word by word" },
        { x: 0.5, y: 0.86, scale: 1.7, look: "Captions burned to a 1080 × 1920 cut" },
      ]}
    />
  );
}
