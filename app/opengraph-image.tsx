import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "comfort line — you do not have to carry everything alone.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          background: "#08091B",
          backgroundImage:
            "radial-gradient(circle at 78% 28%, rgba(244,199,161,0.26) 0%, transparent 50%), radial-gradient(circle at 22% 70%, rgba(72,50,100,0.55) 0%, transparent 55%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#F4C7A1",
            fontSize: 18,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            marginBottom: 36,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          comfort line
        </div>

        <svg
          width="120"
          height="120"
          viewBox="0 0 80 80"
          style={{ marginBottom: 44 }}
        >
          <circle cx="40" cy="40" r="22" fill="rgba(244,199,161,0.18)" />
          <path
            d="M22 22 Q12 40 22 58"
            fill="none"
            stroke="#EDE7DA"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M58 22 Q68 40 58 58"
            fill="none"
            stroke="#EDE7DA"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="40" cy="40" r="3" fill="#F4C7A1" />
        </svg>

        <div
          style={{
            display: "flex",
            fontStyle: "italic",
            fontSize: 78,
            lineHeight: 1.05,
            color: "#EDE7DA",
            textAlign: "center",
            maxWidth: 1000,
            letterSpacing: "-0.02em",
          }}
        >
          you do not have to carry everything alone.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 22,
            color: "#BFB8AB",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
            maxWidth: 760,
          }}
        >
          anonymous comfort calls. text, voice, or 1-to-1.
        </div>
      </div>
    ),
    size
  );
}
