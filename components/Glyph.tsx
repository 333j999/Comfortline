type GlyphProps = { size?: number };

export function Glyph({ size = 80 }: GlyphProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className="relative grid place-items-center"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(244,199,161,0.18), transparent 70%)",
        }}
      />
      <svg
        width={size * 0.8}
        height={size * 0.8}
        viewBox="0 0 80 80"
        className="relative"
        aria-hidden="true"
      >
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
        <circle cx="40" cy="40" r="2.4" fill="#F4C7A1" />
      </svg>
    </div>
  );
}
