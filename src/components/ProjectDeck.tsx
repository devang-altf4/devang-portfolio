"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseStep, CaseStudy, FrontendWork } from "@/content/site";
import LazyVideo from "./LazyVideo";
import { getLenis } from "./SmoothScroll";

/**
 * Every project as one full-screen deck: one scroll, one project.
 *
 * When the reader scrolls into the deck the page locks to it, and each
 * gesture — a wheel notch, one touchpad swipe (its trailing momentum is
 * ignored), a finger swipe, an arrow or Page key — brings in exactly one
 * project. Projects alternate between entering from the right and from the
 * left while the previous one recedes the other way. Past the last project,
 * or above the first, the deck lets go and the page carries on.
 *
 * Under reduced motion the deck is a plain list: no lock, no sliding.
 */

type Media =
  | { kind: "composite"; back: CaseStep; front: CaseStep }
  | { kind: "screen"; shot: CaseStep }
  | { kind: "site"; work: FrontendWork }
  | { kind: "phone"; video: string; poster: string };

interface Slide {
  id: string;
  name: string;
  kicker: string;
  summary: string;
  extra?: string;
  stack?: string[];
  links: { label: string; href: string }[];
  media: Media;
}

export interface ReadoraSlide {
  name: string;
  summary: string;
  stack: readonly string[];
  video: string;
  repo: string;
}

function buildSlides(cases: CaseStudy[], works: FrontendWork[], readora: ReadoraSlide): Slide[] {
  const caseSlides: Slide[] = cases.map((c) => ({
    id: c.id,
    name: c.name,
    kicker: c.kicker,
    summary: c.summary,
    extra: c.extra,
    stack: c.stack,
    links: c.links,
    // STARZ shows its phone in front of one dashboard; the agent, one screen.
    media:
      c.steps.length > 1 && c.steps[0].aspect === "9/20"
        ? { kind: "composite", front: c.steps[0], back: c.steps[1] }
        : { kind: "screen", shot: c.steps[0] },
  }));
  const workSlides: Slide[] = works.map((w) => ({
    id: w.id,
    name: w.name,
    kicker: w.pair ? "Frontend · one brief, two concepts" : "Frontend",
    summary: w.line,
    links: [{ label: "Visit live", href: w.url }],
    media: { kind: "site", work: w },
  }));
  return [
    ...caseSlides,
    ...workSlides,
    {
      id: "readora",
      name: readora.name,
      kicker: "Mobile · offline-first e-reader",
      summary: readora.summary,
      stack: [...readora.stack],
      links: [{ label: "Source on GitHub", href: readora.repo }],
      media: { kind: "phone", video: readora.video, poster: "/media/readora-poster.jpg" },
    },
  ];
}

const pad = (n: number) => String(n).padStart(2, "0");
const host = (url: string) => new URL(url).host.replace(/^www\./, "");

/* ── Frames ─────────────────────────────────────────────── */

function BrowserFrame({ address, children, aspect }: { address: string; children: React.ReactNode; aspect: string }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/12 bg-black shadow-[0_50px_140px_-50px_rgba(226,176,124,0.5)]">
      <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-ink-2 px-3" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-[11px] text-muted">{address}</span>
      </div>
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        {children}
      </div>
    </div>
  );
}

/**
 * `className` must carry the position: when the composite passes `absolute`,
 * a built-in `relative` would win in Tailwind's class order and drop the
 * phone back into the flow at full size.
 */
function PhoneFrame({ children, className = "relative" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[2.2rem] border border-white/15 bg-black p-2 shadow-[0_40px_120px_-40px_rgba(226,176,124,0.5)] ${className}`}
      style={{ aspectRatio: "9/20" }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">{children}</div>
    </div>
  );
}

function Shot({ step }: { step: CaseStep }) {
  return (
    <>
      <Image src={step.image} alt={step.alt} fill sizes="(min-width: 1024px) 55vw, 90vw" className="object-contain" />
      {step.redactions?.map((r, i) => (
        <span
          key={i}
          aria-label="Redacted customer details"
          className="absolute rounded-sm bg-[#141210]"
          style={{ top: r.top, left: r.left, width: r.width, height: r.height }}
        />
      ))}
    </>
  );
}

/** Media sized by the space it has: landscape frames capped by height via their ratio. */
function SlideMedia({ media }: { media: Media }) {
  const cap = (ratio: number) => ({ maxWidth: `min(100%, calc(var(--media-h) * ${ratio.toFixed(3)}))` });

  if (media.kind === "site") {
    return (
      <div className="w-full" style={cap(1280 / 800)}>
        <a href={media.work.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${media.work.name} live`}>
          <BrowserFrame address={host(media.work.url)} aspect="1280/800">
            <LazyVideo
              src={media.work.preview}
              poster={media.work.poster}
              label={`${media.work.name} preview`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </BrowserFrame>
        </a>
      </div>
    );
  }

  if (media.kind === "screen") {
    const [w, h] = media.shot.aspect.split("/").map(Number);
    return (
      <div className="w-full" style={cap(w / h)}>
        <BrowserFrame address="callingagent · live demo" aspect={media.shot.aspect}>
          <Shot step={media.shot} />
        </BrowserFrame>
      </div>
    );
  }

  if (media.kind === "composite") {
    const [w, h] = media.back.aspect.split("/").map(Number);
    return (
      // The dashboard behind, the phone in front of its lower-left corner.
      <div className="relative w-full pb-[8%] pl-[14%]" style={cap((w / h) * 1.12)}>
        <BrowserFrame address="crm.starz.vip" aspect={media.back.aspect}>
          <Shot step={media.back} />
        </BrowserFrame>
        <PhoneFrame className="absolute bottom-0 left-0 h-[78%]">
          <Shot step={media.front} />
        </PhoneFrame>
      </div>
    );
  }

  return (
    <PhoneFrame className="relative h-[var(--media-h)]">
      <LazyVideo src={media.video} poster={media.poster} label="Readora running on a phone" className="absolute inset-0 h-full w-full object-cover" />
    </PhoneFrame>
  );
}

function SlideBody({ slide, index, total, mediaFirst }: { slide: Slide; index: number; total: number; mediaFirst: boolean }) {
  return (
    <div
      className={`flex h-full flex-col justify-center gap-6 px-5 pb-20 pt-24 sm:px-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-[6vw] lg:pb-16 lg:pt-24`}
    >
      <div
        className={`flex min-h-0 items-center justify-center lg:col-span-7 ${mediaFirst ? "lg:order-1" : "lg:order-2"}`}
        data-media
      >
        <SlideMedia media={slide.media} />
      </div>
      <div className={`lg:col-span-5 ${mediaFirst ? "lg:order-2" : "lg:order-1"}`}>
        <p className="eyebrow" data-in>
          <span className="text-amber">
            {pad(index + 1)} / {pad(total)}
          </span>
          &nbsp; {slide.kicker}
        </p>
        <h3 className="display mt-3 text-[calc(clamp(2.1rem,5vw,4.75rem)*var(--ds))]" data-in>
          {slide.name}
        </h3>
        <p className="mt-4 max-w-md text-paper/75 max-lg:line-clamp-3" data-in>
          {slide.summary}
        </p>
        {slide.extra && (
          <p className="mt-3 max-w-md text-sm text-paper/55 max-lg:hidden" data-in>
            {slide.extra}
          </p>
        )}
        {slide.stack && (
          <p className="eyebrow mt-4 max-lg:hidden" data-in>
            {slide.stack.join(" / ")}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3" data-in>
          {slide.links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${i === 0 ? "btn-solid" : "btn-ghost"}`}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── The deck ───────────────────────────────────────────── */

/** Odd slides enter from the right, even from the left. */
const sideOf = (i: number) => (i % 2 === 1 ? 100 : -100);
/** One transition. Input is ignored until it has finished. */
const SLIDE_S = 0.95;
/** Wheel events closer together than this belong to the same gesture. */
const GESTURE_GAP_MS = 180;

export default function ProjectDeck({
  cases,
  works,
  readora,
}: {
  cases: CaseStudy[];
  works: FrontendWork[];
  readora: ReadoraSlide;
}) {
  const slides = buildSlides(cases, works, readora);
  const total = slides.length;
  const sectionRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mode, setMode] = useState<"list" | "deck">("list");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMode("deck");
  }, []);

  useEffect(() => {
    if (mode !== "deck") return;
    gsap.registerPlugin(ScrollTrigger);
    const els = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    const last = els.length - 1;
    let current = 0;
    let animating = false;
    let active = false;

    const show = (i: number) => {
      els.forEach((el, k) => gsap.set(el, { xPercent: 0, scale: 1, autoAlpha: k === i ? 1 : 0 }));
      current = i;
      setIndex(i);
    };
    show(0);

    const go = (next: number) => {
      const dir = next > current ? 1 : -1;
      const cur = els[current];
      const nxt = els[next];
      animating = true;
      const tl = gsap.timeline({
        defaults: { duration: SLIDE_S, ease: "power3.inOut" },
        onComplete: () => {
          animating = false;
        },
      });
      if (dir > 0) {
        const from = sideOf(next);
        tl.fromTo(nxt, { xPercent: from, scale: 1, autoAlpha: 1 }, { xPercent: 0 }, 0).to(
          cur,
          { xPercent: -from * 0.3, scale: 0.92, autoAlpha: 0 },
          0
        );
      } else {
        const back = sideOf(current);
        tl.to(cur, { xPercent: back }, 0).fromTo(
          nxt,
          { xPercent: -back * 0.3, scale: 0.92, autoAlpha: 0 },
          { xPercent: 0, scale: 1, autoAlpha: 1 },
          0
        );
        tl.set(cur, { autoAlpha: 0 });
      }
      // The incoming copy lands a beat after its frame.
      tl.fromTo(
        nxt.querySelectorAll("[data-in]"),
        { y: 26, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", stagger: 0.05 },
        SLIDE_S * 0.45
      );
      current = next;
      setIndex(next);
    };

    let lockY = 0;
    const html = document.documentElement;

    const step = (dir: 1 | -1) => {
      if (animating) return;
      const next = current + dir;
      if (next < 0) return release(-1);
      if (next > last) return release(1);
      go(next);
    };

    /* Input while locked. */
    let lastWheel = 0;
    let gestureUsed = false;
    let acc = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (now - lastWheel > GESTURE_GAP_MS) {
        gestureUsed = false;
        acc = 0;
      }
      lastWheel = now;
      if (gestureUsed || animating) return;
      acc += e.deltaY;
      if (Math.abs(acc) > 24) {
        gestureUsed = true;
        step(acc > 0 ? 1 : -1);
      }
    };
    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchY === null) return;
      const dy = touchY - e.changedTouches[0].clientY;
      touchY = null;
      if (Math.abs(dy) > 40) step(dy > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      const down = ["ArrowDown", "PageDown", " ", "ArrowRight"].includes(e.key);
      const up = ["ArrowUp", "PageUp", "ArrowLeft"].includes(e.key);
      if (!down && !up) return;
      e.preventDefault();
      step(down ? 1 : -1);
    };
    const hold = () => {
      if (active && Math.abs(window.scrollY - lockY) > 1) window.scrollTo(0, lockY);
    };
    // A click on an in-page link (Contact, Work) lets the deck go first, and
    // the jump it makes may cross the deck without being caught by it.
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!a) return;
      if (active) release(0);
      ignoreEntryUntil = performance.now() + 1600;
    };
    // A jump (anchor, restored scroll position) lands far past the deck in
    // one step; scrolling never does. Only scrolling into the deck locks it.
    const jumpedPast = (self: ScrollTrigger) =>
      Math.abs(self.scroll() - self.start) > window.innerHeight * 0.75;

    let ignoreEntryUntil = 0;

    const lock = (y: number) => {
      active = true;
      lockY = y;
      // The gesture that scrolled into the deck is still producing momentum
      // events; treat it as spent so it can't also advance a project.
      lastWheel = performance.now();
      gestureUsed = true;
      const lenis = getLenis();
      lenis?.scrollTo(y, { immediate: true, force: true });
      lenis?.stop();
      window.scrollTo(0, y);
      html.style.overflow = "hidden";
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
      window.addEventListener("keydown", onKey);
      window.addEventListener("scroll", hold);
    };

    const unlisten = () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", hold);
    };

    /** dir 1: carry on down the page; -1: back up; 0: just let go. */
    function release(dir: -1 | 0 | 1) {
      if (!active) return;
      active = false;
      // The release scroll itself crosses the deck's trigger, which would
      // read as entering again and lock straight back on.
      ignoreEntryUntil = performance.now() + 1600;
      unlisten();
      html.style.overflow = "";
      const lenis = getLenis();
      lenis?.start();
      if (dir === 0) return;
      const target = dir > 0 ? st.end + window.innerHeight * 0.9 : st.start - window.innerHeight * 0.9;
      if (lenis) lenis.scrollTo(target, { duration: 1.1 });
      else window.scrollTo({ top: target, behavior: "smooth" });
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=1",
      pin: true,
      // Locking snaps the scroll back to the deck's start. A fast swipe has
      // usually carried it past the 1px trigger by then, so that snap-back
      // reads as "entering back" from below — which would jump to the last
      // project. Entry events are ignored while already locked.
      onEnter: (self) => {
        if (active || performance.now() < ignoreEntryUntil || jumpedPast(self)) return;
        show(0);
        lock(self.start);
      },
      onEnterBack: (self) => {
        if (active || performance.now() < ignoreEntryUntil || jumpedPast(self)) return;
        show(last);
        lock(self.start);
      },
    });
    document.addEventListener("click", onAnchor, true);

    return () => {
      document.removeEventListener("click", onAnchor, true);
      if (active) {
        unlisten();
        html.style.overflow = "";
        getLenis()?.start();
      }
      st.kill();
    };
  }, [mode, total]);

  if (mode === "list") {
    return (
      <section id="work" className="relative w-full bg-ink">
        {slides.map((s, i) => (
          <div key={s.id} className="relative min-h-[100svh] [--media-h:min(52svh,520px)]">
            <SlideBody slide={s} index={i} total={total} mediaFirst={i % 2 === 0} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative h-[100svh] w-full overflow-hidden bg-ink [--media-h:min(40svh,360px)] lg:[--media-h:calc(100svh-260px)]"
    >
      {/* A soft amber floor glow, so the deck reads as the same stage. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-70"
        style={{ background: "radial-gradient(60% 70% at 50% 100%, rgba(226,176,124,0.14), transparent 70%)" }}
        aria-hidden
      />

      {slides.map((s, i) => (
        <div
          key={s.id}
          ref={(el) => {
            slideRefs.current[i] = el;
          }}
          className="absolute inset-0 will-change-transform"
          style={{ visibility: i === 0 ? "visible" : "hidden" }}
          aria-hidden={i !== index}
        >
          <SlideBody slide={s} index={i} total={total} mediaFirst={i % 2 === 0} />
        </div>
      ))}

      {/* Where you are in the deck, and what the next scroll does. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-between px-5 sm:px-10 lg:px-[6vw]">
        <div className="flex items-center gap-3">
          <span className="eyebrow tabular-nums text-paper">
            {pad(index + 1)} / {pad(total)}
          </span>
          <span className="relative h-px w-28 bg-line sm:w-40">
            <span
              className="absolute inset-y-0 left-0 bg-amber transition-[width] duration-700"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </span>
        </div>
        <span className="eyebrow hidden sm:inline">
          {index < total - 1 ? "Scroll for the next project" : "Scroll to get in touch"}
        </span>
      </div>
    </section>
  );
}
