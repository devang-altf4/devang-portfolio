"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function StarzSummaryScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const project = PORTFOLIO_DATA.projects[0];

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1
            }
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(textRef.current, { opacity: 1, y: 0 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="starz-summary"
      className="relative w-full min-h-[70vh] bg-ink flex items-center justify-center py-20 px-6 sm:px-12 lg:px-24 z-10 overflow-hidden"
    >
      <div
        ref={textRef}
        className="w-full max-w-4xl text-center space-y-8 pointer-events-auto"
      >
        <div className="font-sans text-xs text-violet-400 uppercase tracking-widest">
          STARZ ECOSYSTEM CONCLUSION
        </div>

        <h3 className="display text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
          FIVE AI SYSTEMS.{" "}
          <span className="italic font-light text-violet-300 block text-2xl sm:text-4xl lg:text-5xl mt-2">
            ONE PRODUCT ECOSYSTEM.
          </span>
        </h3>

        <p className="font-sans text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          From autonomous local search rank auditing to real-time conversation lead qualification and Meta ad campaign creation — all unified within a single full-stack architecture.
        </p>

        {/* Disclaimer */}
        {project.disclaimer && (
          <div className="pt-4 text-xs font-sans text-neutral-400">
            {project.disclaimer}
          </div>
        )}

        <div className="pt-4 flex justify-center items-center space-x-4">
          <a
            href="https://crm.starz.vip"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black font-sans text-xs font-medium uppercase tracking-wider hover:bg-violet-200 transition-colors"
          >
            <span>Visit CRM Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
