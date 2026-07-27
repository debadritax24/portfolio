import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const alt = siteConfig.og.imageAlt;
export const size = {
  width: siteConfig.og.imageWidth,
  height: siteConfig.og.imageHeight,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 30% 30%, rgba(246, 196, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(52, 211, 153, 0.08) 0%, transparent 50%)",
          }}
        />

        {/* Grid Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            padding: "60px 80px",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f6c400, #34d399)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 32,
              boxShadow: "0 0 40px rgba(246, 196, 0, 0.3)",
            }}
          >
            <span
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#000000",
              }}
            >
              DG
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            {siteConfig.name}
          </h1>

          {/* Title */}
          <p
            style={{
              fontSize: 24,
              color: "#f6c400",
              margin: "16px 0 0 0",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Full Stack Developer & Open Source Contributor
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: 18,
              color: "#a1a1aa",
              margin: "24px 0 0 0",
              textAlign: "center",
              maxWidth: 600,
              lineHeight: 1.5,
            }}
          >
            {siteConfig.description}
          </p>

          {/* Tech Stack */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 32,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"].map(
              (tech) => (
                <span
                  key={tech}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #f6c400, #34d399, #b084f5)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
