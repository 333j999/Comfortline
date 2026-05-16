"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type InfoDialogProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  onClose: () => void;
};

export function InfoDialog({ eyebrow, title, paragraphs, onClose }: InfoDialogProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overlay-in"
      style={{
        background: "rgba(5, 6, 18, 0.78)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      onClick={onClose}
    >
      <div
        className="sheet-in relative w-full max-w-[560px] max-h-[92vh] overflow-y-auto rounded-[28px] p-8 md:p-10"
        style={{
          background: "rgba(20, 23, 46, 0.96)",
          border: "1px solid rgba(237, 231, 218, 0.10)",
          boxShadow:
            "0 24px 60px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(237, 231, 218, 0.04)",
          contain: "layout style paint",
          overscrollBehavior: "contain",
          transform: "translateZ(0)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="close"
          className="absolute top-5 right-5 grid place-items-center w-9 h-9 rounded-full transition-colors"
          style={{
            background: "transparent",
            color: "#8A8478",
            border: "1px solid rgba(237, 231, 218, 0.08)",
          }}
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        <div className="flex flex-col gap-5">
          <div
            className="font-sans text-xs uppercase"
            style={{ color: "#F4C7A1", letterSpacing: "0.14em" }}
          >
            {eyebrow}
          </div>
          <h2
            id="info-title"
            className="font-display italic text-fg-1"
            style={{ fontSize: 34, lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            {title}
          </h2>

          <div className="flex flex-col gap-4 mt-2">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-sans text-fg-2 m-0"
                style={{ fontSize: 15, lineHeight: 1.65 }}
              >
                {p}
              </p>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="self-start font-sans text-sm rounded-full px-5 py-2.5 mt-4"
            style={{
              background: "transparent",
              color: "#EDE7DA",
              border: "1px solid rgba(237, 231, 218, 0.16)",
              cursor: "pointer",
            }}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}
