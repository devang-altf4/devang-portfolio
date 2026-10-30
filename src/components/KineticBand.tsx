import { marquee } from "@/content/site";
import Marquee from "./Marquee";

/**
 * Straight out of the hero: what Devang builds in one solid line, his name
 * in a hollow one running the other way. Both answer the scroll.
 */
export default function KineticBand() {
  return (
    <section className="relative overflow-hidden bg-ink py-[9svh]" aria-label="Cinematic frontends, voice AI, multi-agent systems, mobile apps">
      <Marquee items={marquee.craft} className="text-[calc(16vw*var(--ds))] leading-[1.05] lg:text-[calc(10vw*var(--ds))]" />
      <Marquee items={marquee.self} reverse outline speed={55} className="mt-2 text-[calc(16vw*var(--ds))] leading-[1.05] text-paper/80 lg:text-[calc(10vw*var(--ds))]" />
    </section>
  );
}
