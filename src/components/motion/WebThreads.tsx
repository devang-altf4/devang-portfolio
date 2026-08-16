"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

/**
 * Woven light threads, from React Bits (reactbits.dev/backgrounds/web-threads).
 * Ported to TypeScript and reduced to the props this page actually sets.
 *
 * This is the page's only ambient layer — every section ground sits translucent
 * over it, so the threads read faintly through the whole scroll rather than
 * only behind the hero.
 */

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return [1, 1, 1];
  return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255];
};

const FAN_MODE: Record<string, number> = { center: 0, left: 1, right: 2 };

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uThreadCount;
uniform float uFrequency;
uniform float uSpread;
uniform float uTaper;
uniform float uPosition;
uniform float uFanMode;
uniform float uGlow;
uniform float uFalloff;
uniform float uThickness;
uniform float uBrightness;
uniform float uOpacity;
uniform float uMirror;
uniform float uShimmer;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uEnableMouse;
uniform float uMouseActive;
out vec4 fragColor;

#define TAU 6.28318530718
#define MAX_THREADS 10

float glow(float x, float str, float dist) {
  return dist / pow(max(x, 1e-4), str);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float n = max(uThreadCount, 1.0);

  float pinchX = uFanMode < 0.5 ? 0.5 : (uFanMode < 1.5 ? 0.0 : 1.0);
  if (uEnableMouse > 0.5) {
    pinchX = mix(pinchX, uMouse.x, clamp(uMouseStrength, 0.0, 1.0) * uMouseActive);
  }

  float spreadDx = uSpread * abs(uv.x - pinchX);
  float baseT = iTime * uSpeed;
  float tauOverN = TAU / n;
  float mirror = uMirror > 0.5 ? sign(pinchX - uv.x) : 1.0;
  bool doShimmer = uShimmer > 0.5;
  float shimmerT = iTime * 1.7;
  float invThickness = 1.0 / max(uThickness, 0.01);
  float xFreq = uv.x * uFrequency;
  float yOff = uv.y - uPosition;
  float ciScale = n > 1.0 ? 1.0 / (n - 1.0) : 0.0;

  vec3 col = vec3(0.0);
  float gsum = 0.0;

  for (int idx = 0; idx < MAX_THREADS; idx++) {
    float i = float(idx);
    if (i >= n) break;

    float amplitude = spreadDx * (1.0 + i * uTaper);
    float shimmer = doShimmer ? sin(shimmerT + i * 1.3) * 0.35 : 0.0;
    float phase = (baseT + i * tauOverN) * mirror + shimmer;

    float sdf = abs(yOff + sin(xFreq + phase) * amplitude) * invThickness;

    float g = glow(sdf, uFalloff, uGlow);
    float ci = i * ciScale;
    vec3 threadCol = mix(uColor1, uColor2, ci);

    col += g * threadCol;
    gsum += g;
  }

  float coreAmt = smoothstep(0.5, 2.2, gsum);
  col = mix(col, uColor3 * gsum, coreAmt * 0.5);

  float bright = uBrightness;
  if (uEnableMouse > 0.5) {
    vec2 md = uv - uMouse;
    float d2 = dot(md, md);
    bright += clamp(uMouseStrength, 0.0, 1.0) * uMouseActive * exp(-d2 * 6.0) * 0.6;
  }
  col *= bright;

  float alpha = clamp(gsum, 0.0, 1.0) * uOpacity;

  vec3 outRgb = col * alpha;

  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    outRgb = clamp(outRgb + gv, 0.0, 1.0);
    alpha = clamp(alpha + gv, 0.0, 1.0);
  }

  fragColor = vec4(outRgb, alpha);
}
`;

export interface WebThreadsProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  threadCount?: number;
  frequency?: number;
  spread?: number;
  taper?: number;
  position?: number;
  fanMode?: "center" | "left" | "right";
  glow?: number;
  falloff?: number;
  thickness?: number;
  brightness?: number;
  opacity?: number;
  mirror?: boolean;
  shimmer?: boolean;
  grain?: boolean;
  grainIntensity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  className?: string;
}

export default function WebThreads({
  color1 = "#5227FF",
  color2 = "#FF9FFC",
  color3 = "#FFFFFF",
  speed = 0.2,
  threadCount = 6,
  frequency = 5.0,
  spread = 0.18,
  taper = 1.0,
  position = 0.5,
  fanMode = "center",
  glow = 0.02,
  falloff = 0.6,
  thickness = 1.1,
  brightness = 0.6,
  opacity = 1.0,
  mirror = true,
  shimmer = false,
  grain = true,
  grainIntensity = 0.05,
  mouseInteraction = true,
  mouseStrength = 0.3,
  className = "",
}: WebThreadsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Props are pushed into uniforms from a ref so changing them never rebuilds
  // the GL context.
  const propsRef = useRef({
    color1, color2, color3, speed, threadCount, frequency, spread, taper,
    position, fanMode, glow, falloff, thickness, brightness, opacity, mirror,
    shimmer, grain, grainIntensity, mouseInteraction, mouseStrength,
  });
  propsRef.current = {
    color1, color2, color3, speed, threadCount, frequency, spread, taper,
    position, fanMode, glow, falloff, thickness, brightness, opacity, mirror,
    shimmer, grain, grainIntensity, mouseInteraction, mouseStrength,
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /*
     * Resolution is the whole cost here: this is a full-screen fragment shader
     * running every frame, and each fragment loops over every thread doing a
     * `pow()`. At DPR 2 on a 1440x860 screen that is ~5M fragments a frame.
     * The effect is soft and out of focus by design, so it survives being
     * rendered below native resolution — 1.25x cuts the fragment count by
     * roughly 2.5x with no visible difference. Phones render at 1x.
     */
    const small = window.matchMedia("(max-width: 1023px)").matches;
    const DPR_CAP = small ? 1 : 1.25;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, DPR_CAP),
      });
    } catch (err) {
      console.error("[WebThreads] WebGL2 unavailable", err);
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: speed },
        uThreadCount: { value: Math.round(threadCount) },
        uFrequency: { value: frequency },
        uSpread: { value: spread },
        uTaper: { value: taper },
        uPosition: { value: position },
        uFanMode: { value: FAN_MODE[fanMode] ?? 0 },
        uGlow: { value: glow },
        uFalloff: { value: falloff },
        uThickness: { value: thickness },
        uBrightness: { value: brightness },
        uOpacity: { value: opacity },
        uMirror: { value: mirror ? 1 : 0 },
        uShimmer: { value: shimmer ? 1 : 0 },
        uGrain: { value: grain ? 1 : 0 },
        uGrainIntensity: { value: grainIntensity },
        uColor1: { value: new Float32Array(hexToRgb(color1)) },
        uColor2: { value: new Float32Array(hexToRgb(color2)) },
        uColor3: { value: new Float32Array(hexToRgb(color3)) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseStrength: { value: mouseStrength },
        uEnableMouse: { value: mouseInteraction ? 1 : 0 },
        uMouseActive: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
      const res = program.uniforms.iResolution.value as Float32Array;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    const current = [0.5, 0.5];
    const target = [0.5, 0.5];
    let currentActive = 0;
    let targetActive = 0;

    // The canvas is pointer-events:none behind the page, so the cursor is
    // tracked on the window rather than on the canvas itself.
    const onMove = (e: PointerEvent) => {
      target[0] = e.clientX / window.innerWidth;
      target[1] = 1 - e.clientY / window.innerHeight;
      targetActive = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = (t: number) => {
      const p = propsRef.current;
      const u = program.uniforms;

      u.iTime.value = (t - t0) * 0.001;
      current[0] += 0.05 * (target[0] - current[0]);
      current[1] += 0.05 * (target[1] - current[1]);
      currentActive += 0.05 * (targetActive - currentActive);
      (u.uMouse.value as Float32Array)[0] = current[0];
      (u.uMouse.value as Float32Array)[1] = current[1];
      u.uMouseActive.value = currentActive;

      u.uSpeed.value = p.speed;
      u.uThreadCount.value = Math.round(p.threadCount);
      u.uFrequency.value = p.frequency;
      u.uSpread.value = p.spread;
      u.uTaper.value = p.taper;
      u.uPosition.value = p.position;
      u.uFanMode.value = FAN_MODE[p.fanMode] ?? 0;
      u.uGlow.value = p.glow;
      u.uFalloff.value = p.falloff;
      u.uThickness.value = p.thickness;
      u.uBrightness.value = p.brightness;
      u.uOpacity.value = p.opacity;
      u.uMirror.value = p.mirror ? 1 : 0;
      u.uShimmer.value = p.shimmer ? 1 : 0;
      u.uGrain.value = p.grain ? 1 : 0;
      u.uGrainIntensity.value = p.grainIntensity;
      u.uMouseStrength.value = p.mouseStrength;
      u.uEnableMouse.value = p.mouseInteraction ? 1 : 0;

      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      try {
        container.removeChild(canvas);
      } catch {
        /* already detached */
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // Built once; live values are read from propsRef inside the loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className}`} />;
}
