import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-sans text-xs text-fg-3 uppercase" style={{ letterSpacing: "0.14em" }}>
      {children}
    </div>
  );
}
