import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";

type PrimaryProps = {
  children: ReactNode;
  href?: string;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function Primary({
  children,
  href = "#",
  glow = true,
  className = "",
  style,
}: PrimaryProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 font-sans text-base font-medium rounded-full px-[26px] py-[14px] no-underline transition-all duration-[240ms] ${className}`}
      style={{
        background: "#F4C7A1",
        color: "#2A1A0E",
        boxShadow: glow ? "0 0 40px rgba(244,199,161,0.18)" : "none",
        transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0.32, 1)",
        ...style,
      }}
    >
      {children}
    </Link>
  );
}
