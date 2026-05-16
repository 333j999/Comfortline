"use client";

import type { ReactNode, CSSProperties } from "react";
import { useBooking } from "./BookingProvider";

type BookButtonProps = {
  children: ReactNode;
  glow?: boolean;
  variant?: "primary" | "ghost" | "inline";
  /** which modal to open. defaults to the booking form. */
  action?: "book" | "how";
  className?: string;
  style?: CSSProperties;
};

export function BookButton({
  children,
  glow = true,
  variant = "primary",
  action = "book",
  className = "",
  style,
}: BookButtonProps) {
  const { open, openHowItWorks } = useBooking();
  const onClick = action === "how" ? openHowItWorks : open;

  if (variant === "ghost") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-2 font-sans text-[15px] text-fg-1 rounded-full px-[22px] py-[12px] cursor-pointer transition-all duration-[240ms] ${className}`}
        style={{
          background: "rgba(18, 21, 42, 0.35)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(237,231,218,0.16)",
          transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0.32, 1)",
          ...style,
        }}
      >
        {children}
      </button>
    );
  }

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`bg-transparent border-none p-0 cursor-pointer font-sans text-sm inline-flex items-center gap-1.5 ${className}`}
        style={{ color: "#F4C7A1", ...style }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 font-sans text-base font-medium rounded-full px-[26px] py-[14px] cursor-pointer transition-all duration-[240ms] ${className}`}
      style={{
        background: "#F4C7A1",
        color: "#2A1A0E",
        boxShadow: glow ? "0 0 40px rgba(244,199,161,0.18)" : "none",
        border: "none",
        transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0.32, 1)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
