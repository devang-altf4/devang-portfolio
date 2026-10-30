/**
 * The one handshake between the opening and the page: the loader resolves it
 * when it releases, and the hero starts its entrance (and its footage) on it.
 */
let release: () => void = () => {};

export const pageReady = new Promise<void>((resolve) => {
  release = resolve;
});

export function markPageReady() {
  release();
}
