"use client";

import { useEffect, useState } from "react";

const DURATION_MS = 4200;

export function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(false), DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      className="intro-overlay"
      onClick={() => setShow(false)}
      role="presentation"
      aria-hidden="true"
    >
      <div className="intro-text">someone&apos;s here to listen.</div>
    </div>
  );
}
