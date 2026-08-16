"use client";

import ScreenScene from "@/components/motion/ScreenScene";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const project = PORTFOLIO_DATA.projects[0];

export default function StarzChatsScene() {
  return (
    <ScreenScene
      project={project}
      beat={project.beats[3]}
      mode="bleed"
      tone="base"
      side="left"
      focus={[
        { x: 0.5, y: 0.5, scale: 1.06, look: "The conversational agent console, whole" },
        { x: 0.5, y: 0.56, scale: 1.85, look: "A live inbound thread, answered as it streams" },
        { x: 0.84, y: 0.42, scale: 1.9, look: "Lead qualification, scored 85 out of 100" },
        { x: 0.2, y: 0.5, scale: 1.7, look: "Threads syncing back to the CRM" },
      ]}
    />
  );
}
