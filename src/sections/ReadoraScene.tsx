"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import PhoneFrame from "@/components/motion/PhoneFrame";
import { ArrowUpRight } from "lucide-react";

export default function ReadoraScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const project = PORTFOLIO_DATA.projects[1]; // readora
  const beat = project.beats[0];

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        tl.fromTo(
          textRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 1 }
        )
        .fromTo(
          phoneRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2 },
          "<0.2"
        )
        .to(phoneRef.current, {
          scale: 1.05,
          yPercent: -10,
          duration: 1.5,
          ease: "power1.inOut"
        });
      });

      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        });

        tl.fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
          .fromTo(phoneRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 }, "<0.2");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([textRef.current, phoneRef.current], { opacity: 1, x: 0, y: 0, scale: 1 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="readora-main"
      className="relative w-full min-h-screen bg-paper-warm flex items-center justify-center py-20 px-6 sm:px-12 lg:px-24 z-10 overflow-hidden"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Narrative Copy */}
        <div ref={textRef} className="lg:col-span-7 space-y-6">
          <div className="flex items-center space-x-3">
            <span className="font-sans text-xs text-ink/55 tracking-wider">
              {project.projectNumber}
            </span>
            <span className="w-8 h-[1px] bg-ink/20" />
            <span className="font-sans text-xs uppercase tracking-widest text-ink/55">
              {beat.eyebrow}
            </span>
          </div>

          <h2 className="display text-4xl sm:text-6xl lg:text-7xl text-ink leading-tight">
            {project.title}{" "}
            <span className="italic font-light text-ink/70 block text-3xl sm:text-5xl lg:text-6xl mt-2">
              {project.subtitleItalic}
            </span>
          </h2>

          <p className="font-sans text-base sm:text-xl text-ink/80 leading-relaxed max-w-2xl">
            {beat.narrative}
          </p>

          {/* Key Contributions */}
          <div className="pt-4 border-t border-ink/20 max-w-2xl">
            <div className="font-sans text-[11px] uppercase tracking-widest text-ink/55 mb-3">
              Key Contributions
            </div>
            <ul className="space-y-2">
              {beat.contribution.map((item, i) => (
                <li key={i} className="flex items-start space-x-2 text-sm text-ink/70">
                  <span className="font-sans text-ink/55 text-xs mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-sans bg-neutral-900 border border-ink/20 text-ink/70"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="pt-4 flex flex-wrap gap-4">
            {beat.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black font-sans text-xs font-medium uppercase tracking-wider hover:bg-neutral-200 transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Phone Frame playing Video */}
        <div ref={phoneRef} className="lg:col-span-5 flex justify-center">
          <PhoneFrame>
            <div className="relative w-full h-full bg-black">
              <video
                ref={videoRef}
                src={beat.asset.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
