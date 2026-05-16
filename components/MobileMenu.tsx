"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useBooking } from "./BookingProvider";

const LINKS = [
  { href: "#how", label: "how it works" },
  { href: "#sessions", label: "sessions" },
  { href: "#pricing", label: "pricing" },
  { href: "#faq", label: "questions" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { open: openBooking } = useBooking();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="open menu"
        className="md:hidden grid place-items-center w-10 h-10 rounded-full transition-colors"
        style={{
          background: "transparent",
          color: "#EDE7DA",
          border: "1px solid rgba(237, 231, 218, 0.16)",
          cursor: "pointer",
        }}
      >
        <Menu size={18} strokeWidth={1.5} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden overlay-in flex flex-col"
          style={{
            background:
              "linear-gradient(180deg, rgba(8, 9, 27, 0.6) 0%, rgba(27, 31, 58, 0.6) 100%)",
            backdropFilter: "blur(28px) saturate(140%)",
          }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="navigation menu"
        >
          <div className="flex items-center justify-end px-6 py-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="close menu"
              className="grid place-items-center w-10 h-10 rounded-full"
              style={{
                background: "transparent",
                color: "#8A8478",
                border: "1px solid rgba(237, 231, 218, 0.16)",
                cursor: "pointer",
              }}
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div
            className="sheet-in flex-1 flex flex-col justify-center items-center gap-7 px-6 pb-20"
            onClick={(e) => e.stopPropagation()}
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display italic text-fg-1 no-underline"
                style={{
                  fontSize: 36,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {link.label}
              </a>
            ))}

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBooking();
              }}
              className="mt-6 inline-flex items-center gap-2.5 font-sans text-base font-medium rounded-full px-7 py-3.5 cursor-pointer"
              style={{
                background: "#F4C7A1",
                color: "#2A1A0E",
                boxShadow: "0 0 40px rgba(244, 199, 161, 0.22)",
                border: "none",
                transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0.32, 1)",
              }}
            >
              Start a session
            </button>
          </div>
        </div>
      )}
    </>
  );
}
