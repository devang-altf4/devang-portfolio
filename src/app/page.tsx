import { caseStudies, frontendWork, readora } from "@/content/site";
import Hero from "@/components/Hero";
import KineticBand from "@/components/KineticBand";
import Capabilities from "@/components/Capabilities";
import ScrubVideo from "@/components/ScrubVideo";
import ProjectDeck from "@/components/ProjectDeck";
import NameReel from "@/components/NameReel";
import Contact from "@/components/Contact";

/**
 * The showreel: the opening opens onto the hero, a band of moving type, what
 * Devang builds (four Flow loops on one held screen), the camera pushes into
 * the monolith, every project as one deck — one scroll, one project, in his
 * order (STARZ, the calling agent, six frontend sites, Readora) — the name
 * under the spotlight, and the close.
 */
export default function Page() {
  return (
    <main>
      <Hero />
      <KineticBand />
      <Capabilities />
      <ScrubVideo id="work-intro" src="/media/transition.mp4">
        <h2 className="display text-center text-[calc(clamp(3rem,9vw,8rem)*var(--ds))]">Selected work</h2>
      </ScrubVideo>
      <ProjectDeck cases={caseStudies} works={frontendWork} readora={readora} />
      <NameReel />
      <Contact />
    </main>
  );
}
