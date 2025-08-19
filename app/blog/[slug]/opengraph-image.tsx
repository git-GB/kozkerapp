import { ImageResponse } from "next/og"
import { getPost } from "@/lib/ghost"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Blog Post"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    return new ImageResponse(
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Post not found
      </div>,
      { ...size },
    )
  }

  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 48,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: 50,
        position: "relative",
      }}
    >
      {post.feature_image && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${post.feature_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
            opacity: 0.3,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.8) 100%)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 20,
          zIndex: 2,
        }}
      >
        <span style={{ color: "#FF6E30", fontWeight: "bold", marginRight: "16px", fontSize: 36 }}>Kozker</span>
        <span style={{ fontWeight: "bold", color: "#000", fontSize: 36 }}>Tech</span>
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: "bold",
          color: "#fff",
          maxWidth: "100%",
          zIndex: 2,
          lineHeight: 1.2,
        }}
      >
        {post.title}
      </div>
      <div
        style={{
          fontSize: 24,
          color: "#fff",
          marginTop: 20,
          zIndex: 2,
        }}
      >
        By {post.primary_author.name}
      </div>
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  )
}
