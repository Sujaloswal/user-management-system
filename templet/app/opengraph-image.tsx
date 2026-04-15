import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "talksabout.tech - Curated Tech Talks"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        fontFamily: "monospace",
        border: "8px solid black",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "6px solid black",
          padding: "60px 80px",
          backgroundColor: "white",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "black",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            talksabout.tech
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "black",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Curated Tech Talks
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
