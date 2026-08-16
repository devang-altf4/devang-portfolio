import HeroScene from "@/sections/HeroScene";
import StarzOverviewScene from "@/sections/StarzOverviewScene";
import StarzRankScene from "@/sections/StarzRankScene";
import StarzPostScene from "@/sections/StarzPostScene";
import StarzChatsScene from "@/sections/StarzChatsScene";
import StarzPagesScene from "@/sections/StarzPagesScene";
import StarzAdsScene from "@/sections/StarzAdsScene";
import StarzSummaryScene from "@/sections/StarzSummaryScene";
import ReadoraScene from "@/sections/ReadoraScene";
import CallingAgentScene from "@/sections/CallingAgentScene";
import EstateXScene from "@/sections/EstateXScene";
import ReelAgentScene from "@/sections/ReelAgentScene";
import PeerlyScene from "@/sections/PeerlyScene";
import MoreBuildsScene from "@/sections/MoreBuildsScene";
import AboutScene from "@/sections/AboutScene";
import ContactScene from "@/sections/ContactScene";

/**
 * Scroll order is the argument: the flagship suite opens, walks through its five
 * agents, closes on a summary, then the standalone builds follow by scale.
 */
export default function PortfolioPage() {
  return (
    <main className="relative w-full">
      <HeroScene />
      <StarzOverviewScene />
      <StarzRankScene />
      <StarzPostScene />
      <StarzChatsScene />
      <StarzPagesScene />
      <StarzAdsScene />
      <StarzSummaryScene />
      <ReadoraScene />
      <CallingAgentScene />
      <EstateXScene />
      <ReelAgentScene />
      <PeerlyScene />
      <MoreBuildsScene />
      <AboutScene />
      <ContactScene />
    </main>
  );
}
