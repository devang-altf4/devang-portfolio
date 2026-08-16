import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The motion vocabulary for the whole page. Two rules hold everywhere:
 *
 * 1. Entrances are time-based and fire while a section is still travelling up
 *    into view. They are never scrubbed from progress 0 of a pin — that leaves
 *    a pinned section sitting blank until the reader scrolls it open.
 * 2. Scrubbed timelines only move things that are already legible: phrases,
 *    parallax offsets, progress rules, step swaps. Nothing scales a
 *    screenshot — see PhraseBand for why.
 */

let registered = false;

export function initGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export const EASE = {
  /** Display type and plates arriving: fast off the mark, long settle. */
  enter: "expo.out",
  /** Secondary copy. Softer, so it reads as following the headline. */
  soft: "power3.out",
  /** Camera pushes. Symmetrical — no snap at either end. */
  camera: "power2.inOut",
  /** Masks wiping open. */
  wipe: "power4.inOut",
} as const;

export const DUR = {
  plate: 1.1,
  word: 0.9,
  copy: 0.7,
} as const;

/** Where a section starts revealing itself, measured against the viewport. */
export const ENTER_START = "top 78%";

/**
 * Media queries for the two ways a section can behave. They are declared once
 * because three places must agree: the GSAP branch that walks the steps, the
 * GSAP branch that doesn't, and the React layout that decides whether the step
 * blocks are stacked in one slot or listed in flow. If those disagree, steps
 * either pile on top of each other or never move.
 *
 * Phones pin too — the scroll should change the text there exactly as it does
 * on a desktop — but only when the viewport is tall enough to hold a pinned
 * section. Below that the section scrolls normally and lists its steps.
 */
export const PIN_DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
export const PIN_MOBILE =
  "(max-width: 1023px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";
export const NO_PIN_SHORT =
  "(max-width: 1023px) and (max-height: 639px) and (prefers-reduced-motion: no-preference)";
/** Matches whenever either pinned branch is live. */
export const STACKED_STEPS = "(min-width: 1024px), (min-height: 640px)";

const WORD = "reveal-word";
const INNER = "reveal-word-i";

/**
 * Wrap every word in a two-span mask so headlines can rise from behind a clip
 * instead of fading. Walks text nodes rather than rewriting innerHTML, so
 * nested spans (italic clauses, colour shifts) survive intact.
 *
 * Idempotent: a second call returns the spans made by the first, which matters
 * because matchMedia contexts can build more than once.
 */
export function splitWords(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];

  const existing = root.querySelectorAll<HTMLElement>(`.${INNER}`);
  if (existing.length) return Array.from(existing);

  const texts: Text[] = [];
  const walk = (node: Node) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        if (child.textContent?.trim()) texts.push(child as Text);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(root);

  const inners: HTMLElement[] = [];

  texts.forEach((textNode) => {
    const frag = document.createDocumentFragment();

    // Keep the whitespace runs as real text nodes so words don't glue together
    // and the browser can still break lines wherever it likes.
    textNode.textContent!.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
        return;
      }
      const outer = document.createElement("span");
      outer.className = WORD;
      const inner = document.createElement("span");
      inner.className = INNER;
      inner.textContent = part;
      outer.appendChild(inner);
      frag.appendChild(outer);
      inners.push(inner);
    });

    textNode.parentNode?.replaceChild(frag, textNode);
  });

  return inners;
}

/** Scrub seconds each stop owns: the move, then a beat to read it. */
export const STOP_UNIT = 1.7;

/**
 * `Focus.scale` is retained in the data as a hint of how tight a region a step
 * is about, but nothing scales or crops the screenshot any more — the step's
 * phrase says what to look at instead. See PhraseBand.
 */

/** Hex to an rgba() string, for building ground-aware gradients. */
export function hexA(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** "1920/1751" -> 1.0965. Used to cap a plate by height without distorting it. */
export function aspectToNumber(ratio: string) {
  const [w, h] = ratio.split("/").map(Number);
  return h ? w / h : 1;
}

/**
 * Compositing hint, applied only while a section is on screen. Ten plates all
 * holding a layer at once is what makes a scroll page stutter.
 */
export function liveLayer(el: Element | null, on: boolean) {
  if (el instanceof HTMLElement) el.style.willChange = on ? "transform" : "auto";
}
