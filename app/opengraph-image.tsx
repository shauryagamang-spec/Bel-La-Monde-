import { ImageResponse } from "next/og";

export const alt = "Bel-la Monde Riverside — on the Kosi, near Jim Corbett";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded default OG image (no photography needed). Per-route files can override.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background:
            "radial-gradient(120% 120% at 50% -10%, #2d5743 0%, #102018 58%, #0a140f 100%)",
          color: "#f9f5ec",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 10,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Kosi River · Jim Corbett
        </div>
        <div style={{ fontSize: 104, lineHeight: 1.02, marginTop: 20 }}>
          Bel-la Monde Riverside
        </div>
        <div style={{ fontSize: 34, marginTop: 22, opacity: 0.85 }}>
          The wilderness is the luxury.
        </div>
      </div>
    ),
    { ...size },
  );
}
