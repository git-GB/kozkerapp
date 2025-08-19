import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "About KozkerTech | Our Story, Mission & Team"
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(to bottom, #f8fafc, #ffffff)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 48,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            background: "#fb923c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          K
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            background: "linear-gradient(to right, #f97316, #ea580c)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          KozkerTech
        </div>
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        About Our Company
      </div>
      <div
        style={{
          fontSize: 32,
          color: "#64748b",
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        Transforming Businesses Through Innovative Technology Solutions
      </div>
    </div>,
    {
      ...size,
    },
  )
}
