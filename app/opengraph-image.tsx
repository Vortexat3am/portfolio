import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Romeo Culp — Web Developer & Digital Artist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`
  ).then((res) => res.text());
  const match = css.match(/src: url\(([^)]+)\)/);
  if (!match) throw new Error(`Could not find font URL for ${family}`);
  return fetch(match[1]).then((res) => res.arrayBuffer());
}

async function toDataUri(path: string) {
  const buf = await readFile(join(process.cwd(), "public", path));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

export default async function Image() {
  const [antonFont, logo, img1, img2] = await Promise.all([
    loadGoogleFont("Anton", 400).catch(() => null),
    toDataUri("images/RCLOGO.png"),
    toDataUri("images/projects/EyeHeartGFX.png"),
    toDataUri("images/projects/FallingintoEyeGFX.png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
          padding: "64px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={logo} width={48} height={48} style={{ opacity: 0.9 }} />
          <span
            style={{
              fontSize: 20,
              letterSpacing: 6,
              color: "#f3f1ea",
              opacity: 0.5,
              textTransform: "uppercase",
            }}
          >
            Romeo Culp
          </span>
        </div>

        <div style={{ position: "absolute", right: 64, top: 90, display: "flex" }}>
          <img
            src={img1}
            width={210}
            height={210}
            style={{ objectFit: "cover", borderRadius: 14, transform: "rotate(-4deg)" }}
          />
          <img
            src={img2}
            width={210}
            height={210}
            style={{
              objectFit: "cover",
              borderRadius: 14,
              transform: "rotate(3deg)",
              marginLeft: -20,
              marginTop: 50,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", maxWidth: 760 }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#f3f1ea",
              opacity: 0.4,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Portfolio
          </span>
          <span
            style={{
              fontFamily: antonFont ? "Anton" : undefined,
              fontWeight: 400,
              fontSize: 92,
              lineHeight: 0.95,
              color: "#f3f1ea",
              textTransform: "uppercase",
            }}
          >
            Web Development & Digital Art
          </span>
          <span
            style={{
              fontSize: 26,
              fontStyle: "italic",
              color: "#f3f1ea",
              opacity: 0.6,
              marginTop: 24,
            }}
          >
            Interfaces that hold up on the clock. Halftones and poster edits off it.
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: antonFont ? [{ name: "Anton", data: antonFont, style: "normal", weight: 400 }] : [],
    }
  );
}
