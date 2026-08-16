"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { DUR, EASE, ENTER_START, initGsap, splitWords } from "@/lib/motion";

/** The transaction lifecycle, in the order a Peerly user meets it. */
const STEPS = ["Talent discovery", "Real-time chat", "Razorpay checkout"];

export default function PeerlyScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);

  const project = PORTFOLIO_DATA.projects[5];
  const beat = project.beats[0];

  useGSAP(
    () => {
      initGsap();
      const mm = gsap.matchMedia();

      const steps = () => gsap.utils.toArray<HTMLElement>(stepsRef.current?.children ?? []);

      const settle = () => {
        gsap.set([eyebrowRef.current, dashboardRef.current, chatRef.current, paymentRef.current], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
        gsap.set(detailRef.current?.querySelectorAll("[data-reveal]") ?? [], { opacity: 1, y: 0 });
        gsap.set(splitWords(titleRef.current), { yPercent: 0 });
        gsap.set(steps(), { opacity: 1 });
      };

      // This copy column runs ~670px and cannot shrink further, so the pin is
      // gated on a viewport tall enough to hold it. A section that is pinned
      // while overflowing puts its own call-to-action below the fold with no
      // way to scroll to it.
      mm.add(
        "(min-width: 1024px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)",
        () => {
        const words = splitWords(titleRef.current);
        const rows = detailRef.current?.querySelectorAll("[data-reveal]") ?? [];
        const marks = steps();

        gsap.set(marks.slice(1), { opacity: 0.3 });

        // The copy and the first surface arrive before the section takes the
        // screen. The pin exists only to stack the two that follow.
        gsap
          .timeline({
            scrollTrigger: { trigger: sectionRef.current, start: ENTER_START },
            defaults: { ease: EASE.enter },
          })
          .fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0)
          .fromTo(words, { yPercent: 118 }, { yPercent: 0, duration: DUR.word, stagger: 0.04 }, 0.1)
          .fromTo(
            dashboardRef.current,
            { opacity: 0, y: 56, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 1.3 },
            0.15
          )
          .fromTo(
            rows,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: DUR.copy, stagger: 0.06, ease: EASE.soft },
            0.35
          );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
          defaults: { ease: EASE.enter },
        });

        tl.fromTo(
          chatRef.current,
          { opacity: 0, x: 70, y: 50, scale: 0.92 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.2 },
          0.2
        )
          .to(marks[1], { opacity: 1, duration: 0.3 }, 0.4)
          .fromTo(
            paymentRef.current,
            { opacity: 0, y: 90, scale: 0.88 },
            { opacity: 1, y: 0, scale: 1, duration: 1.2 },
            1.5
          )
          .to(marks[2], { opacity: 1, duration: 0.3 }, 1.7);
        }
      );

      // Narrow screens, and short ones where the pin was refused above: the
      // three surfaces still arrive in sequence, they just do it in flow.
      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference), (max-height: 799px) and (prefers-reduced-motion: no-preference)",
        () => {
          settle();
          gsap
            .timeline({
              scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
              defaults: { ease: EASE.enter },
            })
            .fromTo(
              splitWords(titleRef.current),
              { yPercent: 118 },
              { yPercent: 0, duration: 0.8, stagger: 0.035 },
              0
            )
            .fromTo(
              [dashboardRef.current, chatRef.current, paymentRef.current],
              { opacity: 0, y: 34 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.14 },
              0.15
            );
        }
      );

      mm.add("(prefers-reduced-motion: reduce)", settle);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="peerly-main"
      className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden bg-ink-raised/88 px-6 py-24 sm:px-12 lg:px-24 lg:py-16"
    >
      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-6 lg:col-span-5">
          <div ref={eyebrowRef} className="label flex flex-wrap items-center gap-3 text-white/50">
            <span>{project.projectNumber}</span>
            <span className="h-3 w-px bg-white/25" />
            <span className="text-white">{project.title}</span>
            <span className="h-3 w-px bg-white/25" />
            <span>Talent marketplace</span>
          </div>

          <h2 ref={titleRef} className="display text-3xl leading-tight text-white sm:text-5xl lg:text-6xl">
            {beat.title}
          </h2>

          <div ref={detailRef} className="space-y-6">
            <p data-reveal className="text-sm leading-relaxed text-white/70 sm:text-base">
              {beat.narrative}
            </p>

            {/*
              The three surfaces, each paired with what was built for it. These
              were two separate lists saying the same thing twice, which pushed
              the copy column past the height of the pin on a laptop screen.
              Each entry lights as its card lands.
            */}
            <ol data-reveal ref={stepsRef} className="space-y-4 border-t border-white/15 pt-5">
              {STEPS.map((step, i) => (
                <li key={step}>
                  <div className="label flex items-center gap-3 text-amethyst-soft">
                    <span className="tabular-nums text-amethyst-soft">0{i + 1}</span>
                    <span className="h-px w-5 bg-amethyst/40" />
                    {step}
                  </div>
                  <p className="mt-1.5 pl-11 text-xs leading-[1.6] text-white/60 sm:text-[0.8125rem]">
                    {beat.contribution[i]}
                  </p>
                </li>
              ))}
            </ol>

            <ul data-reveal className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="label rounded-full border border-white/15 bg-transparent px-2.5 py-1 text-[0.625rem] text-amethyst-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {beat.links.length > 0 && (
              <div data-reveal className="flex flex-wrap gap-4">
                {beat.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-flex items-center gap-2 rounded-full bg-amethyst-deep px-5 py-3 text-white transition-colors hover:bg-amethyst-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/*
          Height-driven on desktop: each card takes a share of a viewport-relative
          container and derives its width from its aspect ratio, so the stack can
          never outgrow the pin on a short laptop screen.
        */}
        <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center space-y-6 lg:col-span-7 lg:h-[58vh] lg:min-h-0 lg:space-y-0">
          <div
            ref={dashboardRef}
            className="relative aspect-[1920/1003] w-full overflow-hidden rounded-xl border border-white/15 bg-neutral-950 shadow-2xl lg:h-[46%] lg:w-auto lg:max-w-full"
          >
            <Image
              src="/assets/peerly-dashboard.jpg"
              alt="Peerly Talent Discovery Dashboard"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="select-none object-cover"
            />
          </div>

          <div
            ref={chatRef}
            className="relative z-20 aspect-[1920/948] w-full overflow-hidden rounded-xl border border-white/12 bg-neutral-950 shadow-2xl lg:-mt-[7%] lg:h-[40%] lg:w-auto lg:max-w-full"
          >
            <Image
              src="/assets/peerly-chat.jpg"
              alt="Peerly Real-time Chat Interface"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="select-none object-cover"
            />
          </div>

          <div
            ref={paymentRef}
            className="relative z-30 aspect-[800/408] w-full max-w-[480px] overflow-hidden rounded-xl border border-amethyst/35 bg-neutral-950 shadow-2xl lg:-mt-[6%] lg:h-[27%] lg:w-auto lg:max-w-full"
          >
            <Image
              src="/assets/peerly-payment.jpg"
              alt="Peerly Razorpay Payment Checkout"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="select-none object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
