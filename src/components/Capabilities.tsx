"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capabilities as chapters } from "@/content/site";

/** Scroll per chapter, in svh. */
const STEP = 85;
/** Seconds for one chapter change. */
const CUT = 1.3;

/**
 * What Devang builds, as four chapters on one held screen.
 *
 * Scroll only chooses the chapter; the change between two is a fixed,
 * timed cut, so the screen is never caught halfway between scenes. The
 * outgoing scene recedes into a rounded card and dims; the next Flow loop
 * rises over it behind a line of amber light (the opening's seam, again);
 * the word's letters drop out and the new word's rise in, and the copy
 * follows line by line. Scrolling back plays it the other way.
 *
 * A change requested mid-cut waits for the cut to land, then goes straight
 * to wherever the reader has scrolled to.
 */
export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<"pin" | "list">("pin");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMode("list");
  }, []);

  useEffect(() => {
    if (mode !== "pin") return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    const n = chapters.length;
    const q = gsap.utils.selector(section);
    const layers = q("[data-layer]");
    const videos = q("[data-layer] video") as HTMLVideoElement[];
    const words = q("[data-word]");
    const copies = q("[data-copy]");
    const bars = q("[data-bar]");
    const edge = q("[data-edge]")[0];
    const chars = (i: number) => words[i].querySelectorAll("[data-ch]");
    const lines = (i: number) => copies[i].querySelectorAll("[data-line]");

    let current = 0;
    let wanted = 0;
    let busy = false;
    let inView = false;

    const play = () =>
      videos.forEach((v, i) => {
        if (inView && i === current) void v.play().catch(() => {});
        else v.pause();
      });

    /** Lay chapter `i` out at rest: full frame, word and copy in place. */
    const rest = (i: number) => {
      layers.forEach((l, j) => {
        gsap.set(l, {
          zIndex: j === i ? 2 : 1,
          autoAlpha: j === i ? 1 : 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 0px)",
        });
      });
      gsap.set(videos, { scale: 1 });
      words.forEach((w, j) => gsap.set(w, { autoAlpha: j === i ? 1 : 0 }));
      copies.forEach((c, j) => gsap.set(c, { autoAlpha: j === i ? 1 : 0 }));
      gsap.set(q("[data-ch], [data-line]"), { yPercent: 0 });
      bars.forEach((b, j) => gsap.set(b, { scaleX: j <= i ? 1 : 0 }));
      gsap.set(edge, { autoAlpha: 0 });
    };

    const cut = (to: number) => {
      const from = current;
      const dir = to > from ? 1 : -1;
      busy = true;
      current = to;
      play();

      const h = window.innerHeight;
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          rest(to);
          busy = false;
          if (wanted !== current) cut(wanted);
        },
      });

      // Old scene backs away into the dark.
      tl.to(layers[from], { scale: 0.86, clipPath: "inset(6% 6% 6% 6% round 28px)", autoAlpha: 0.35, duration: CUT }, 0);
      tl.to(chars(from), { yPercent: -110 * dir, duration: 0.45, ease: "power3.in", stagger: 0.018 * dir }, 0);
      tl.to(lines(from), { yPercent: -110 * dir, duration: 0.4, ease: "power3.in", stagger: 0.04 }, 0);

      // New scene rises over it, its leading edge lit.
      gsap.set(layers[to], {
        zIndex: 3,
        autoAlpha: 1,
        scale: 1,
        clipPath: dir > 0 ? "inset(100% 0% 0% 0% round 0px)" : "inset(0% 0% 100% 0% round 0px)",
      });
      tl.to(layers[to], { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: CUT * 0.85, ease: "power4.inOut" }, 0.1);
      tl.fromTo(videos[to], { scale: 1.35 }, { scale: 1, duration: CUT, ease: "power3.out" }, 0.1);
      tl.fromTo(
        edge,
        { y: dir > 0 ? h : 0, autoAlpha: 1 },
        { y: dir > 0 ? 0 : h, duration: CUT * 0.85, ease: "power4.inOut" },
        0.1
      );
      tl.to(edge, { autoAlpha: 0, duration: 0.25 }, CUT * 0.75);

      // New word and copy rise in behind the edge.
      tl.set([words[to], copies[to]], { autoAlpha: 1 }, 0.45);
      tl.fromTo(
        chars(to),
        { yPercent: 110 * dir },
        { yPercent: 0, duration: 0.85, ease: "power4.out", stagger: 0.035 * dir },
        0.5
      );
      tl.fromTo(lines(to), { yPercent: 110 * dir }, { yPercent: 0, duration: 0.75, ease: "power4.out", stagger: 0.06 }, 0.65);
      tl.set([words[from], copies[from]], { autoAlpha: 0 }, 0.5);
      bars.forEach((b, j) => tl.to(b, { scaleX: j <= to ? 1 : 0, duration: 0.6, ease: "power2.out" }, 0.3));
    };

    rest(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          wanted = Math.min(n - 1, Math.floor(self.progress * n));
          if (busy || wanted === current) return;
          // Off screen (a jump, or arriving from below), just be there.
          if (!inView) {
            current = wanted;
            rest(current);
            return;
          }
          cut(wanted);
        },
      });
      // The words drift slowly across the whole hold, so the screen is never still.
      gsap.fromTo(
        q("[data-words]"),
        { xPercent: 4 },
        { xPercent: -4, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: true } }
      );
    }, section);

    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      play();
    });
    io.observe(section);

    // Each word is sized to fill the width it has, whatever the typeface.
    const fit = () =>
      words.forEach((w) => {
        const inner = w.firstElementChild as HTMLElement;
        inner.style.fontSize = "100px";
        const size = (100 * window.innerWidth * 0.9) / inner.scrollWidth;
        inner.style.fontSize = `${Math.min(size, window.innerHeight * 0.3)}px`;
      });
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener("resize", fit);

    return () => {
      ctx.revert();
      io.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [mode]);

  if (mode === "list") {
    return (
      <section id="capabilities" className="bg-ink px-5 py-24 sm:px-10 lg:px-[6vw]">
        <p className="eyebrow text-amber">What I build</p>
        <div className="mt-10 grid gap-16">
          {chapters.map((c, i) => (
            <article key={c.word} className="grid gap-6 lg:grid-cols-2 lg:items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/media/flow/${c.video}.jpg`} alt="" className="aspect-video w-full rounded-lg object-cover" />
              <div>
                <ChapterCopy c={c} i={i} />
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative bg-ink"
      style={{ height: `${chapters.length * STEP + 100}svh` }}
      aria-label="What I build"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ink">
        {chapters.map((c, i) => (
          <div
            key={c.video}
            data-layer
            className="absolute inset-0 overflow-hidden will-change-transform"
            style={i ? { opacity: 0, visibility: "hidden" } : undefined}
          >
            <video
              className="h-full w-full object-cover"
              poster={`/media/flow/${c.video}.jpg`}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
            >
              <source src={`/media/flow/${c.video}-m.mp4`} media="(max-width: 639px) and (orientation: portrait)" type="video/mp4" />
              <source src={`/media/flow/${c.video}.mp4`} type="video/mp4" />
            </video>
          </div>
        ))}

        {/* The light on the incoming scene's leading edge. */}
        <div
          data-edge
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] -mt-px bg-[#fff4e6] opacity-0 [box-shadow:0_0_22px_6px_rgba(226,176,124,0.85),0_0_90px_24px_rgba(226,176,124,0.35)]"
          aria-hidden
        />

        {/* Legibility: dark under the copy (bottom on phones, left on desktop), and a fade out at the foot. */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/25 lg:bg-gradient-to-r lg:from-ink/95 lg:via-ink/55 lg:via-35% lg:to-transparent lg:to-70%" aria-hidden />
        <div className="absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-ink to-transparent" aria-hidden />

        <div data-words className="pointer-events-none absolute inset-x-0 top-[13svh] z-10 lg:top-auto lg:bottom-[7svh]" aria-hidden>
          {chapters.map((c, i) => (
            <div
              key={c.word}
              data-word
              className="absolute inset-x-0 top-0 flex justify-center lg:top-auto lg:bottom-0"
              style={i ? { opacity: 0, visibility: "hidden" } : undefined}
            >
              <p className="display flex overflow-hidden whitespace-nowrap pb-[0.06em] pt-[0.04em] leading-[0.9] text-paper">
                {Array.from(c.word).map((ch, k) => (
                  <span key={k} data-ch className="inline-block">
                    {ch}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute inset-x-5 bottom-[9svh] z-10 grid sm:inset-x-10 lg:inset-x-auto lg:bottom-auto lg:left-[6vw] lg:top-[24svh] lg:w-[34rem]">
          {chapters.map((c, i) => (
            <div key={c.word} data-copy className="[grid-area:1/1]" style={i ? { opacity: 0, visibility: "hidden" } : undefined}>
              <ChapterCopy c={c} i={i} />
            </div>
          ))}
        </div>

        <div className="absolute left-5 right-5 top-[5.5rem] z-10 flex items-center gap-4 sm:left-10 sm:right-10 lg:left-[6vw] lg:right-[6vw]">
          <p className="eyebrow shrink-0 text-amber">What I build</p>
          <div className="flex flex-1 gap-1.5">
            {chapters.map((c, i) => (
              <span key={c.word} className="h-px flex-1 overflow-hidden bg-line">
                <span data-bar className={`block h-full w-full origin-left bg-amber ${i ? "scale-x-0" : ""}`} />
              </span>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[14svh] bg-gradient-to-t from-ink to-transparent" aria-hidden />
      </div>
    </section>
  );
}

/** Each line sits in its own mask so it can rise in and drop out. */
function ChapterCopy({ c, i }: { c: (typeof chapters)[number]; i: number }) {
  const line = (key: string, node: React.ReactNode) => (
    <div key={key} className="overflow-hidden">
      <div data-line>{node}</div>
    </div>
  );
  return (
    <>
      {line(
        "eyebrow",
        <p className="eyebrow">
          {String(i + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")} · {c.word}
        </p>
      )}
      {line("title", <h3 className="display mt-3 pb-1 text-[calc(clamp(2rem,4.2vw,3.6rem)*var(--ds))]">{c.title}</h3>)}
      {line("body", <p className="mt-3 max-w-md text-paper/80">{c.body}</p>)}
      {line(
        "tools",
        <ul className="mt-5 flex flex-wrap gap-2 text-xs text-paper/80">
          {c.tools.map((t) => (
            <li key={t} className="rounded-full border border-line bg-ink/40 px-3 py-1.5">
              {t}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
