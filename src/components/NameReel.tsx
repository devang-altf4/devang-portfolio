"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { marquee } from "@/content/site";
import Marquee from "./Marquee";

/**
 * The run-up to contact: the name, cast in glass, under a spotlight, with
 * the five things it builds drifting round it at different depths. Scroll
 * tilts the name up into the light and carries the objects past; on a mouse,
 * the whole scene leans toward the pointer. Two lines of type run behind and
 * in front in opposite directions.
 *
 * Three layers per object so nothing fights over `transform`: the outer is
 * the scroll's, the middle the pointer's, the image its own idle bob (CSS).
 */
const OBJECTS = [
  { src: "code", depth: 1.4, side: -1, className: "left-[2%] top-[16%] w-[30vw] lg:left-[5%] lg:w-[17vw]" },
  { src: "ai-core", depth: 0.8, side: 1, className: "right-[-4%] top-[10%] w-[34vw] lg:right-[6%] lg:w-[15vw]" },
  { src: "phone", depth: 1.9, side: -1, className: "left-[4%] bottom-[16%] w-[22vw] lg:left-[12%] lg:bottom-[6%] lg:w-[10vw]" },
  { src: "wave", depth: 1.1, side: 1, className: "right-[2%] bottom-[24%] w-[40vw] lg:right-[8%] lg:bottom-[18%] lg:w-[22vw]" },
  { src: "windows", depth: 2.2, side: -1, className: "left-[-10%] top-[46%] w-[36vw] lg:left-[-3%] lg:top-[42%] lg:w-[17vw]" },
] as const;

export default function NameReel() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const q = gsap.utils.selector(section);

    const ctx = gsap.context(() => {
      const scroll = { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 };
      gsap.fromTo(
        q("[data-name]"),
        { scale: 0.62, rotationX: 38, yPercent: 30 },
        { scale: 0.98, rotationX: -14, yPercent: -12, ease: "none", scrollTrigger: scroll }
      );
      gsap.fromTo(q("[data-bg]"), { scale: 1.25, yPercent: -6 }, { scale: 1, yPercent: 6, ease: "none", scrollTrigger: scroll });
      q("[data-obj]").forEach((el, i) => {
        const { depth, side } = OBJECTS[i];
        gsap.fromTo(
          el,
          { yPercent: 160 * depth, xPercent: side * 40 * depth, rotation: -18 * side * depth },
          { yPercent: -160 * depth, xPercent: -side * 12 * depth, rotation: 18 * side * depth, ease: "none", scrollTrigger: scroll }
        );
      });
    }, section);

    // Pointer lean, desktop only.
    let off = () => {};
    if (window.matchMedia("(pointer: fine)").matches) {
      const leans = q("[data-lean]").map((el, i) => ({
        x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" }),
        d: OBJECTS[i].depth,
      }));
      const nameX = gsap.quickTo(q("[data-name-lean]"), "rotationY", { duration: 1.2, ease: "power3.out" });
      const nameY = gsap.quickTo(q("[data-name-lean]"), "rotationX", { duration: 1.2, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        leans.forEach((l) => {
          l.x(-nx * 60 * l.d);
          l.y(-ny * 40 * l.d);
        });
        nameX(nx * 18);
        nameY(-ny * 12);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      off = () => window.removeEventListener("pointermove", onMove);
    }

    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="signature" className="relative h-[200svh] bg-ink" aria-label="Devang Gupta">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-bg
          src="/media/obj/void.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover [object-position:72%_50%]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" aria-hidden />

        <Marquee
          items={marquee.craft}
          outline
          speed={50}
          className="absolute inset-x-0 top-[15svh] text-[calc(15vw*var(--ds))] leading-none opacity-70 lg:top-[11svh] lg:text-[calc(11vw*var(--ds))]"
        />

        <div className="absolute inset-0 flex items-center justify-center [perspective:1400px]">
          <div data-name className="w-[min(92vw,960px)]">
            <div data-name-lean>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/obj/name-3d.webp" alt="Devang Gupta" className="float-y w-full" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

        {OBJECTS.map((o, i) => (
          <div key={o.src} data-obj className={`pointer-events-none absolute ${o.className}`}>
            <div data-lean>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/media/obj/${o.src}.webp`}
                alt=""
                className="float-y w-full"
                style={{ animationDuration: `${5 + i * 1.3}s`, animationDelay: `${-i * 0.9}s` }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        ))}

        <Marquee
          items={marquee.close}
          reverse
          speed={60}
          className="absolute inset-x-0 bottom-[11svh] text-[calc(12vw*var(--ds))] leading-none lg:bottom-[8svh] lg:text-[calc(8vw*var(--ds))]"
        />
      </div>
    </section>
  );
}
