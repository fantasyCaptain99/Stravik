import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#061511",
          color: "#f7faf7",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "999px",
              background: "#20c997",
            }}
          />
          <div style={{ fontSize: "28px", letterSpacing: "0.08em", color: "#6be8bd" }}>
            {site.name.toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
          <div style={{ fontSize: "72px", lineHeight: 1.05, fontWeight: 600 }}>
            {site.tagline}
          </div>
          <div style={{ marginTop: "28px", fontSize: "28px", lineHeight: 1.4, color: "#d9e8e0" }}>
            {site.positioning}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
