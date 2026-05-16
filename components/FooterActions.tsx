"use client";

import { useBooking } from "./BookingProvider";

export function FooterActions() {
  const { open, openPrivacy, openTerms, openCrisis } = useBooking();

  const cls =
    "font-sans text-[13px] text-fg-3 bg-transparent border-none p-0 cursor-pointer transition-colors hover:text-fg-1";

  return (
    <div className="flex flex-wrap gap-6">
      <button
        type="button"
        onClick={openCrisis}
        className={cls}
        style={{ color: "#F4C7A1" }}
      >
        crisis support
      </button>
      <button type="button" onClick={openPrivacy} className={cls}>
        privacy
      </button>
      <button type="button" onClick={openTerms} className={cls}>
        terms
      </button>
      <button type="button" onClick={open} className={cls}>
        contact
      </button>
    </div>
  );
}
