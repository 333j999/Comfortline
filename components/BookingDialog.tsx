"use client";

import { useEffect, useState, type FormEvent } from "react";
import { X, MessageCircle, Mic, Phone, ArrowRight } from "lucide-react";

type Platform = "text" | "voice" | "call";

const PLATFORMS: { id: Platform; label: string; Icon: typeof MessageCircle }[] = [
  { id: "text", label: "text", Icon: MessageCircle },
  { id: "voice", label: "voice note", Icon: Mic },
  { id: "call", label: "call", Icon: Phone },
];

const TOPICS = [
  "loneliness",
  "anxiety",
  "relationship stress",
  "feeling unheard",
  "school or work",
  "just need to talk",
  "something else",
];

export function BookingDialog({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [platform, setPlatform] = useState<Platform>("text");
  const [topics, setTopics] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

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

  const toggleTopic = (t: string) => {
    setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overlay-in"
      style={{
        background: "rgba(5, 6, 18, 0.78)",
        backdropFilter: "blur(20px)",
      }}
      onClick={onClose}
    >
      <div
        className="sheet-in relative w-full max-w-[540px] max-h-[92vh] overflow-y-auto rounded-[28px] p-8 md:p-10"
        style={{
          background: "rgba(18, 21, 42, 0.92)",
          border: "1px solid rgba(237, 231, 218, 0.10)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(237, 231, 218, 0.04)",
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

        {!submitted ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <div
                className="font-sans text-xs uppercase"
                style={{ color: "#8A8478", letterSpacing: "0.14em" }}
              >
                start a session
              </div>
              <h2
                id="booking-title"
                className="font-display italic text-fg-1"
                style={{ fontSize: 34, lineHeight: 1.1, letterSpacing: "-0.02em" }}
              >
                tell us a little. then someone listens.
              </h2>
              <p
                className="font-sans text-fg-3 mt-1"
                style={{ fontSize: 13, lineHeight: 1.6 }}
              >
                we ask only what we need. your details stay with us — not with the
                listener.
              </p>
            </div>

            <Field label="what should we call you?">
              <input
                required
                type="text"
                placeholder="a name, a nickname, anything"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none font-sans text-fg-1 placeholder:text-fg-4"
                style={{ fontSize: 15 }}
              />
            </Field>

            <Field label="email or phone">
              <input
                required
                type="text"
                placeholder="however we can reach you back"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-transparent outline-none font-sans text-fg-1 placeholder:text-fg-4"
                style={{ fontSize: 15 }}
              />
            </Field>

            <div className="flex flex-col gap-3">
              <FieldLabel>how do you want to talk?</FieldLabel>
              <div className="flex gap-2 flex-wrap">
                {PLATFORMS.map(({ id, label, Icon }) => {
                  const active = platform === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPlatform(id)}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-sans text-sm transition-all duration-[240ms]"
                      style={{
                        background: active ? "rgba(244, 199, 161, 0.14)" : "transparent",
                        color: active ? "#F4C7A1" : "#BFB8AB",
                        border: `1px solid ${active ? "rgba(244, 199, 161, 0.38)" : "rgba(237, 231, 218, 0.10)"}`,
                        transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0.32, 1)",
                      }}
                    >
                      <Icon size={14} strokeWidth={1.5} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <FieldLabel>what's weighing on you tonight?</FieldLabel>
              <div
                className="font-sans text-fg-3"
                style={{ fontSize: 12, lineHeight: 1.5 }}
              >
                pick anything that fits. or none.
              </div>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => {
                  const active = topics.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTopic(t)}
                      className="rounded-full px-3.5 py-2 font-sans text-[13px] transition-all duration-[240ms]"
                      style={{
                        background: active ? "rgba(184, 168, 212, 0.16)" : "transparent",
                        color: active ? "#EDE7DA" : "#BFB8AB",
                        border: `1px solid ${active ? "rgba(184, 168, 212, 0.38)" : "rgba(237, 231, 218, 0.10)"}`,
                        transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0.32, 1)",
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2.5 font-sans text-base font-medium rounded-full px-7 py-3.5 mt-2 cursor-pointer transition-all duration-[240ms]"
              style={{
                background: "#F4C7A1",
                color: "#2A1A0E",
                boxShadow: "0 0 40px rgba(244, 199, 161, 0.22)",
                border: "none",
                transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0.32, 1)",
              }}
            >
              hold space for me <ArrowRight size={16} strokeWidth={1.5} />
            </button>

            <div
              className="font-sans text-fg-4 text-center"
              style={{ fontSize: 12, lineHeight: 1.5 }}
            >
              by continuing, you agree this isn't therapy or emergency support.
              if you're in crisis, please reach out to a local helpline.
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-6 py-4">
            <div
              className="font-sans text-xs uppercase"
              style={{ color: "#F4C7A1", letterSpacing: "0.14em" }}
            >
              we're here
            </div>
            <h2
              className="font-display italic text-fg-1"
              style={{ fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              thank you, {name || "friend"}.
            </h2>
            <p
              className="font-sans text-fg-2"
              style={{ fontSize: 16, lineHeight: 1.6 }}
            >
              someone will reach out shortly. take your time. you don't have to
              prepare anything to say.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="self-start font-sans text-sm rounded-full px-5 py-2.5 mt-2"
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
        )}
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-sans text-xs uppercase"
      style={{ color: "#8A8478", letterSpacing: "0.14em" }}
    >
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <div
        className="rounded-2xl px-4 py-3"
        style={{
          background: "rgba(8, 9, 27, 0.55)",
          border: "1px solid rgba(237, 231, 218, 0.10)",
        }}
      >
        {children}
      </div>
    </label>
  );
}
