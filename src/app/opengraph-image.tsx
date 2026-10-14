import { ImageResponse } from "next/og";
import { PORTFOLIO_DATA } from "@/data/portfolio";

/**
 * The card a link unfurls into on LinkedIn, WhatsApp, Discord and X — for a
 * recruiter it is often the first impression, before the site itself.
 * Same scheme as the page: black ground, purple accent, white type.
 */
export const alt = "Devang Gupta — Software Engineer, available now";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const { creator } = PORTFOLIO_DATA;

/**
 * The site's own faces — Unbounded headlines over Satoshi — so the card reads
 * as the same product. Satori needs TTF/OTF rather than the woff2 browsers get,
 * so both are fetched at build time (the card is static). A failed fetch falls
 * back to the default face instead of failing the build.
 */
async function ttfFrom(cssUrl: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(cssUrl).then((r) => r.text());
    const src = css.match(/url\(['"]?([^'")]+?\.ttf)['"]?\)/)?.[1] ?? css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
    if (!src) return null;
    return await fetch(src.startsWith("//") ? `https:${src}` : src).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [heavy, light, body] = await Promise.all([
    ttfFrom("https://fonts.googleapis.com/css2?family=Unbounded:wght@700"),
    ttfFrom("https://fonts.googleapis.com/css2?family=Unbounded:wght@300"),
    ttfFrom("https://api.fontshare.com/v2/css?f[]=satoshi@500&display=swap"),
  ]);
  const fonts = [
    heavy && { name: "Unbounded", data: heavy, weight: 700 as const, style: "normal" as const },
    light && { name: "Unbounded", data: light, weight: 300 as const, style: "normal" as const },
    body && { name: "Satoshi", data: body, weight: 500 as const, style: "normal" as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));
  const display = heavy ? "Unbounded" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 70% 80% at 85% 20%, rgba(139,92,246,0.35) 0%, rgba(29,11,54,0.25) 45%, #08080a 75%)",
          backgroundColor: "#08080a",
          color: "#ffffff",
          fontFamily: body ? "Satoshi" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 26, letterSpacing: 4, color: "rgba(255,255,255,0.6)" }}>
            DEVANG GUPTA
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 22px",
              borderRadius: 999,
              border: "1px solid rgba(201,184,255,0.45)",
              fontSize: 24,
              color: "#c9b8ff",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#c9b8ff" }} />
            {creator.availability}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: display, fontSize: 70, fontWeight: 700, letterSpacing: -3, lineHeight: 1.08 }}>
            I build things that
          </div>
          <div style={{ fontFamily: display, fontSize: 70, fontWeight: 300, letterSpacing: -3, lineHeight: 1.08, color: "#c9b8ff" }}>
            do things.
          </div>
          <div
            style={{
              marginTop: 36,
              width: 520,
              height: 3,
              background: "linear-gradient(90deg, #8b5cf6, rgba(139,92,246,0))",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
          <div>Software Engineer. Mobile, systems, AI.</div>
          <div>{creator.location}</div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
