import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";

type GhostProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  style?: CSSProperties;
};

export function Ghost({ children, href = "#", className = "", style }: GhostProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 font-sans text-[15px] text-fg-1 rounded-full px-[22px] py-[12px] no-underline transition-all duration-[240ms] ${className}`}
      style={{
        border: "1px solid rgba(237,231,218,0.16)",
        transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0.32, 1)",
        ...style,
      }}
    >
      {children}
    </Link>
  );
}
