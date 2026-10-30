import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { profile } from "@/content/site";

/**
 * The card a shared link unfurls into (LinkedIn, WhatsApp, Discord, X). It is
 * the monolith still from the site's own footage, with the name and
 * availability on its dark left — the same frame the site opens on.
 */
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The site's display face. */
const DISPLAY_FONT = "Cinzel";

/*
 * Satori needs TTF; fetched at build time, falling back to the default face.
 * Text is passed as single template strings: Satori requires display:flex on
 * any element with more than one child, and "{a} — {b}" is three children.
 */
async function ttf(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [bg, display, body] = await Promise.all([
    readFile(path.join(process.cwd(), "public/media/og-background.jpg")),
    ttf(DISPLAY_FONT, 600),
    ttf("Hanken Grotesk", 500),
  ]);
  const fonts = [
    display && { name: DISPLAY_FONT, data: display, weight: 600 as const, style: "normal" as const },
    body && { name: "Hanken Grotesk", data: body, weight: 500 as const, style: "normal" as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#050505" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${bg.toString("base64")}`}
          width={1200}
          height={630}
          style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }}
          alt=""
        />
        <div
          style={{
            // Satori has no `inset`; explicit box so centring and the scrim apply.
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
            background: "linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.55) 50%, rgba(5,5,5,0) 75%)",
            color: "#f2ede6",
            fontFamily: body ? "Hanken Grotesk" : "sans-serif",
          }}
        >
          <div style={{ fontFamily: display ? DISPLAY_FONT : "serif", fontSize: 104, lineHeight: 0.95, letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div style={{ marginTop: 28, maxWidth: 620, fontSize: 30, lineHeight: 1.35, color: "rgba(242,237,230,0.8)" }}>
            {`${profile.role} — cinematic frontends, voice AI, multi-agent products`}
          </div>
          <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#e2b07c" }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#e2b07c" }} />
            {`${profile.availability} · ${profile.location}`}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
