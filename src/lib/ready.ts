/**
 * The hero's opening sequence must not play behind the preloader. This is the
 * one handshake between them: the preloader resolves it, the hero awaits it.
 */

let release: () => void = () => {};

export const pageReady = new Promise<void>((resolve) => {
  release = resolve;
});

export function markPageReady() {
  release();
}
