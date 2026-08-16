"use client";

import { useEffect, useRef } from "react";

/**
 * A WebGL point field lying under the whole page. It carries one job: make the
 * move between projects feel like travelling somewhere. Each project owns a
 * formation, and the field reforms into the next one as you cross into it.
 *
 * Everything here is gated — desktop, motion allowed, WebGL present — and
 * three.js is imported dynamically so it never lands in the first bundle.
 */

const COUNT = 4200;

/** Formations, in scroll order. Each fills `out` with COUNT * 3 coordinates. */
const FORMATIONS: ((out: Float32Array) => void)[] = [
  // Sphere — the opening, evenly distributed by golden angle.
  (out) => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const t = golden * i;
      out[i * 3] = Math.cos(t) * r * 30;
      out[i * 3 + 1] = y * 30;
      out[i * 3 + 2] = Math.sin(t) * r * 30;
    }
  },
  // Double helix — the agent suite, two strands running in parallel.
  (out) => {
    for (let i = 0; i < COUNT; i++) {
      const t = (i / COUNT) * Math.PI * 14;
      const strand = i % 2 === 0 ? 0 : Math.PI;
      const r = 14 + (i % 7) * 0.6;
      out[i * 3] = Math.cos(t + strand) * r;
      out[i * 3 + 1] = (i / COUNT) * 80 - 40;
      out[i * 3 + 2] = Math.sin(t + strand) * r;
    }
  },
  // Rippled plane — a grid seen almost edge on.
  (out) => {
    const side = Math.ceil(Math.sqrt(COUNT));
    for (let i = 0; i < COUNT; i++) {
      const x = (i % side) / side - 0.5;
      const z = Math.floor(i / side) / side - 0.5;
      out[i * 3] = x * 90;
      out[i * 3 + 1] = Math.sin(x * 12) * Math.cos(z * 12) * 7;
      out[i * 3 + 2] = z * 90;
    }
  },
  // Torus — a closed loop, for the platform work.
  (out) => {
    for (let i = 0; i < COUNT; i++) {
      const u = (i / COUNT) * Math.PI * 2;
      const v = ((i * 7.13) % COUNT) / COUNT * Math.PI * 2;
      const R = 26;
      const r = 9;
      out[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
      out[i * 3 + 1] = r * Math.sin(v);
      out[i * 3 + 2] = (R + r * Math.cos(v)) * Math.sin(u);
    }
  },
  // Spiral — arms sweeping out, for the pipeline work.
  (out) => {
    for (let i = 0; i < COUNT; i++) {
      const arm = i % 3;
      const t = (i / COUNT) * 5;
      const a = t * 2.4 + (arm * Math.PI * 2) / 3;
      const r = t * 9;
      out[i * 3] = Math.cos(a) * r;
      out[i * 3 + 1] = (Math.random() - 0.5) * 6 * (1 - t / 5);
      out[i * 3 + 2] = Math.sin(a) * r;
    }
  },
  // Lattice — a cube of nodes, for the closing sections.
  (out) => {
    const side = Math.ceil(Math.cbrt(COUNT));
    for (let i = 0; i < COUNT; i++) {
      const x = i % side;
      const y = Math.floor(i / side) % side;
      const z = Math.floor(i / (side * side));
      out[i * 3] = (x / side - 0.5) * 62;
      out[i * 3 + 1] = (y / side - 0.5) * 62;
      out[i * 3 + 2] = (z / side - 0.5) * 62;
    }
  },
];

export default function ScrollField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const allowed =
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!allowed) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    import("three").then((mod) => {
      if (disposed) return;

      // Interop guard: depending on how the bundler emits the ESM build, the
      // constructors can arrive on the namespace or nested under `default`.
      const THREE = ("WebGLRenderer" in mod ? mod : (mod as unknown as { default: typeof mod }).default) as typeof mod;
      if (!THREE?.WebGLRenderer) {
        console.error("[ScrollField] three.js loaded but WebGLRenderer is missing", Object.keys(mod).slice(0, 8));
        return;
      }

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      } catch (err) {
        console.error("[ScrollField] WebGL context unavailable", err);
        return; // The page is complete without this layer.
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 400);
      camera.position.z = 88;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);

      // Soft round sprite, drawn once. Square points read as dust, not light.
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 64;
      const sx = sprite.getContext("2d")!;
      const grad = sx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.35, "rgba(255,255,255,0.55)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      sx.fillStyle = grad;
      sx.fillRect(0, 0, 64, 64);
      const dot = new THREE.CanvasTexture(sprite);

      const current = new Float32Array(COUNT * 3);
      const target = new Float32Array(COUNT * 3);
      const scratch = new Float32Array(COUNT * 3);
      FORMATIONS[0](current);
      target.set(current);

      const colors = new Float32Array(COUNT * 3);
      const deep = new THREE.Color(0x6d28d9);
      const soft = new THREE.Color(0xc9b8ff);
      const mix = new THREE.Color();
      for (let i = 0; i < COUNT; i++) {
        mix.copy(deep).lerp(soft, Math.random() ** 2);
        colors[i * 3] = mix.r;
        colors[i * 3 + 1] = mix.g;
        colors[i * 3 + 2] = mix.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(current, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Grounds sit at 88% opacity over this, so roughly an eighth of it
      // reaches the reader — it is drawn bright to survive that.
      const material = new THREE.PointsMaterial({
        size: 0.85,
        sizeAttenuation: true,
        map: dot,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const resize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      let formation = 0;
      let lastScroll = window.scrollY;
      let velocity = 0;
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        velocity += Math.abs(window.scrollY - lastScroll);
        lastScroll = window.scrollY;

        const next = Math.min(
          FORMATIONS.length - 1,
          Math.floor(progress * FORMATIONS.length)
        );
        if (next !== formation) {
          formation = next;
          FORMATIONS[next](scratch);
          target.set(scratch);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      const onPointer = (e: PointerEvent) => {
        pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      let frame = 0;
      const loop = () => {
        frame = requestAnimationFrame(loop);

        // Ease every point toward its slot in the current formation.
        const pos = geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < pos.length; i++) {
          pos[i] += (target[i] - pos[i]) * 0.035;
        }
        geometry.attributes.position.needsUpdate = true;

        velocity *= 0.92;
        pointer.x += (pointer.tx - pointer.x) * 0.04;
        pointer.y += (pointer.ty - pointer.y) * 0.04;

        // Scroll speed spins the field and pulls the camera back a little,
        // so fast scrolling reads as travel rather than a jump cut.
        points.rotation.y += 0.0009 + Math.min(velocity, 90) * 0.00007;
        points.rotation.x = pointer.y * 0.16;
        points.rotation.z += 0.00018;
        camera.position.x += (pointer.x * 9 - camera.position.x) * 0.04;
        camera.position.y += (-pointer.y * 6 - camera.position.y) * 0.04;
        camera.position.z += (88 + Math.min(velocity, 120) * 0.12 - camera.position.z) * 0.05;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("pointermove", onPointer);
        geometry.dispose();
        material.dispose();
        dot.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }).catch((err) => console.error("[ScrollField] three.js failed to load", err));

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={hostRef} className="scroll-field" aria-hidden />;
}
