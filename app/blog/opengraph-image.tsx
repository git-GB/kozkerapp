import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "KozkerTech Blog - Latest Web Development & Power BI Insights"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 128,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 25% 25%, rgba(255, 110, 48, 0.2) 0%, transparent 50%)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <span style={{ color: "#FF6E30", fontWeight: "bold", marginRight: "16px" }}>Kozker</span>
        <span style={{ fontWeight: "bold" }}>Tech</span>
      </div>
      <div
        style={{
          fontSize: 48,
          marginTop: 24,
          color: "#374151",
          textAlign: "center",
          maxWidth: "80%",
          zIndex: 1,
        }}
      >
        Blog - Latest insights on mobile-first websites, 24/7 support solutions, and WhatsApp automation
      </div>
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  )
}
