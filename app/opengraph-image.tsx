import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

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

async function toDataUri(buf: Buffer) {
  return `data:image/png;base64,${buf.toString("base64")}`;
}

// Grayscales the source image, fades it out radially toward the edges, and
// caps its peak opacity low — baked into the pixels ahead of time since
// Satori (the OG image renderer) doesn't support mix-blend-mode, CSS
// filters, or mask-image the way a real browser does. This mirrors the
// Hero section's atmospheric background-image treatment.
async function atmosphericImage(publicPath: string, dim: number) {
  const src = await readFile(join(process.cwd(), "public", publicPath));
  const base = await sharp(src)
    .resize(dim, dim, { fit: "cover" })
    .grayscale()
    .blur(4)
    .ensureAlpha()
    .toBuffer();

  const maskSvg = `<svg width="${dim}" height="${dim}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="g" cx="50%" cy="50%" r="40%">
        <stop offset="0%" stop-color="white" stop-opacity="0.2" />
        <stop offset="100%" stop-color="white" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)" />
  </svg>`;
  const mask = await sharp(Buffer.from(maskSvg)).png().toBuffer();

  // Flatten onto opaque black so the fade is baked into RGB values, not left
  // as alpha transparency for Satori to (mis)composite.
  const faded = await sharp(base)
    .composite([{ input: mask, blend: "dest-in" }])
    .flatten({ background: "#0a0a0a" })
    .png()
    .toBuffer();

  return toDataUri(faded);
}

export default async function Image() {
  const [antonFont, logo, atmosphere] = await Promise.all([
    loadGoogleFont("Anton", 400).catch(() => null),
    readFile(join(process.cwd(), "public/images/RCLOGO.png")).then((b) => toDataUri(b)),
    atmosphericImage("images/projects/FallingintoEyeGFX.png", 900),
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
          position: "relative",
        }}
      >
        <img
          src={atmosphere}
          width={900}
          height={900}
          style={{ position: "absolute", right: -180, bottom: -220, objectFit: "cover" }}
        />

        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "64px" }}>
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
              Making digital things feel a little more human, with details that make them worth remembering.
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: antonFont ? [{ name: "Anton", data: antonFont, style: "normal", weight: 400 }] : [],
    }
  );
}
