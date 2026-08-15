"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function PeerlyScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const dashboardCardRef = useRef<HTMLDivElement>(null);
  const chatCardRef = useRef<HTMLDivElement>(null);
  const paymentCardRef = useRef<HTMLDivElement>(null);

  const project = PORTFOLIO_DATA.projects[5]; // peerly
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
            end: "+=260%",
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        // Step 1: Text & Discovery Dashboard In
        tl.fromTo(
          textRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 1 }
        )
        .fromTo(
          dashboardCardRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2 },
          "<0.2"
        )
        // Step 2: Real-time Chat pops in on offset plane
        .fromTo(
          chatCardRef.current,
          { opacity: 0, x: 60, y: 40, scale: 0.9 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.2 },
          "+=0.3"
        )
        // Step 3: Razorpay Payment Modal flies in on top (capped at 720px)
        .fromTo(
          paymentCardRef.current,
          { opacity: 0, y: 80, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2 },
          "+=0.3"
        );
      });

      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1
          }
        });

        tl.fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
          .fromTo(dashboardCardRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 }, "<0.2")
          .fromTo(chatCardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, ">-0.1")
          .fromTo(paymentCardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, ">-0.1");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([textRef.current, dashboardCardRef.current, chatCardRef.current, paymentCardRef.current], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="peerly-main"
      className="relative w-full min-h-screen bg-forest flex items-center justify-center py-20 px-6 sm:px-12 lg:px-24 z-10 overflow-hidden"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Narrative Copy */}
        <div ref={textRef} className="lg:col-span-5 space-y-6">
          <div className="flex items-center space-x-3">
            <span className="font-sans text-xs text-emerald-400 tracking-wider">
              {project.projectNumber}
            </span>
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="font-sans text-xs uppercase tracking-widest text-neutral-400">
              {beat.eyebrow}
            </span>
          </div>

          <h2 className="display text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
            {project.title}{" "}
            <span className="italic font-light text-emerald-300 block text-2xl sm:text-4xl lg:text-5xl mt-2">
              {project.subtitleItalic}
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-neutral-200 leading-relaxed">
            {beat.narrative}
          </p>

          {/* Contributions */}
          <div className="pt-3 border-t border-white/15">
            <div className="font-sans text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
              Key Contributions
            </div>
            <ul className="space-y-1.5">
              {beat.contribution.map((item, i) => (
                <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-neutral-300">
                  <span className="font-sans text-emerald-400 text-xs mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full text-xs font-sans bg-emerald-950/60 border border-emerald-500/30 text-emerald-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          {beat.links.length > 0 && (
            <div className="pt-2 flex items-center space-x-4">
              {beat.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black font-sans text-xs font-medium uppercase tracking-wider hover:bg-emerald-200 transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Multi-Plane Visual Sequence */}
        <div className="lg:col-span-7 relative w-full flex flex-col space-y-6 lg:space-y-0 min-h-[400px] lg:min-h-[580px] justify-center items-center">
          {/* Visual 1: Dashboard */}
          <div
            ref={dashboardCardRef}
            className="w-full relative rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-950 aspect-[1920/1003]"
          >
            <Image
              src="/assets/peerly-dashboard.jpg"
              alt="Peerly Talent Discovery Dashboard"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover select-none"
            />
          </div>

          {/* Visual 2: WebSocket Chat Interface (Offset Plane) */}
          <div
            ref={chatCardRef}
            className="w-full lg:w-[85%] relative lg:-mt-24 rounded-xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-neutral-950 aspect-[1920/948] z-20"
          >
            <Image
              src="/assets/peerly-chat.jpg"
              alt="Peerly Real-time Chat Interface"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover select-none"
            />
          </div>

          {/* Visual 3: Razorpay Payment Modal (Hard capped at max-w-[720px]) */}
          <div
            ref={paymentCardRef}
            className="w-full max-w-[480px] relative lg:-mt-20 rounded-xl overflow-hidden border border-emerald-400/40 shadow-2xl bg-neutral-950 aspect-[800/408] z-30"
          >
            <Image
              src="/assets/peerly-payment.jpg"
              alt="Peerly Razorpay Payment Checkout"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
