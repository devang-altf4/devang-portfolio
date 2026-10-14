import HeroScene from "@/sections/HeroScene";
import AtAGlanceScene from "@/sections/AtAGlanceScene";
import StarzOverviewScene from "@/sections/StarzOverviewScene";
import StarzRankScene from "@/sections/StarzRankScene";
import StarzChatsScene from "@/sections/StarzChatsScene";
import StarzPagesScene from "@/sections/StarzPagesScene";
import StarzSummaryScene from "@/sections/StarzSummaryScene";
import CallingAgentScene from "@/sections/CallingAgentScene";
import ReadoraScene from "@/sections/ReadoraScene";
import TrueSampleScene from "@/sections/TrueSampleScene";
import MoreBuildsScene from "@/sections/MoreBuildsScene";
import AboutScene from "@/sections/AboutScene";
import ContactScene from "@/sections/ContactScene";
import ProjectCurtain, { CurtainMark } from "@/components/motion/ProjectCurtain";
import { projectById } from "@/data/portfolio";

/**
 * Scroll order is the argument: the flagship suite opens and walks through its
 * three agents, then the live voice agent a reader can actually talk to, then
 * the mobile and native builds. A scrubbed curtain sweeps in before each one.
 */
export default function PortfolioPage() {
  return (
    <main className="relative w-full">
      <ProjectCurtain />
      <HeroScene />
      <AtAGlanceScene />

      <CurtainMark project={projectById("starz")} />
      <StarzOverviewScene />
      <StarzRankScene />
      <StarzPagesScene />
      <StarzChatsScene />
      <StarzSummaryScene />

      <CurtainMark project={projectById("ai-calling")} />
      <CallingAgentScene />

      <CurtainMark project={projectById("readora")} />
      <ReadoraScene />

      <CurtainMark project={projectById("truesample")} />
      <TrueSampleScene />

      <MoreBuildsScene />
      <AboutScene />
      <ContactScene />
    </main>
  );
}
