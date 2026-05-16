"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  X,
  MessageCircle,
  Mic,
  Phone,
  ArrowRight,
  ChevronDown,
  Check,
} from "lucide-react";

type Platform = "text" | "voice" | "call";
type Gender = "female" | "male" | "non-binary" | "prefer not to say";
type Duration = "30" | "60" | "90" | "120";

const PLATFORMS: { id: Platform; label: string; Icon: typeof MessageCircle }[] = [
  { id: "text", label: "text", Icon: MessageCircle },
  { id: "voice", label: "voice note", Icon: Mic },
  { id: "call", label: "call", Icon: Phone },
];

const GENDERS: Gender[] = ["female", "male", "non-binary", "prefer not to say"];

const DURATIONS: { id: Duration; label: string }[] = [
  { id: "30", label: "30 min" },
  { id: "60", label: "1 hour" },
  { id: "90", label: "1h 30" },
  { id: "120", label: "2 hours" },
];

const TOPICS = [
  "loneliness",
  "anxiety",
  "relationship stress",
  "feeling unheard",
  "school or work",
  "just need to talk",
  "depression",
  "abuse",
  "addiction",
  "self harm",
  "impulsive or dark thoughts",
  "eating disorder",
  "insecurity",
  "family issues",
  "bullying",
  "anger issues",
  "love life",
  "sexuality confusion",
  "identity issues",
  "low drive",
  "panic attacks",
  "dissociation",
  "insomnia",
  "lack of direction",
  "something else",
];

// Reusable inline styles for chips — no backdrop-filter (kept on the
// modal overlay only) so scrolling doesn't re-rasterize 12+ blurred
// surfaces per frame.
const chipBase = {
  background: "rgba(8, 9, 27, 0.55)",
  border: "1px solid rgba(237, 231, 218, 0.10)",
  color: "#BFB8AB",
  transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0.32, 1)",
};
const chipActive = {
  background: "rgba(244, 199, 161, 0.14)",
  border: "1px solid rgba(244, 199, 161, 0.38)",
  color: "#F4C7A1",
  transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0.32, 1)",
};
const fieldBox = {
  background: "rgba(8, 9, 27, 0.55)",
  border: "1px solid rgba(237, 231, 218, 0.10)",
};

export function BookingDialog({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [platform, setPlatform] = useState<Platform>("text");
  const [duration, setDuration] = useState<Duration>("30");
  const [date, setDate] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [detail, setDetail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!gender) {
      setError("please pick how you identify so we can match you well.");
      return;
    }
    setError(null);
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
        WebkitBackdropFilter: "blur(20px)",
      }}
      onClick={onClose}
    >
      <div
        className="sheet-in relative w-full max-w-[560px] max-h-[92vh] overflow-y-auto rounded-[28px] p-7 md:p-9"
        style={{
          background: "rgba(20, 23, 46, 0.96)",
          border: "1px solid rgba(237, 231, 218, 0.10)",
          boxShadow:
            "0 24px 60px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(237, 231, 218, 0.05)",
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
            background: "rgba(8, 9, 27, 0.55)",
            color: "#8A8478",
            border: "1px solid rgba(237, 231, 218, 0.10)",
          }}
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        {!submitted ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
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
              <FieldLabel>
                gender <span style={{ color: "#F4C7A1" }}>·</span>{" "}
                <span
                  style={{
                    color: "#8A8478",
                    letterSpacing: 0,
                    textTransform: "none",
                  }}
                >
                  required
                </span>
              </FieldLabel>
              <div className="flex flex-wrap gap-2">
                {GENDERS.map((g) => {
                  const active = gender === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className="rounded-full px-4 py-2 font-sans text-[13px] transition-colors duration-[240ms]"
                      style={active ? chipActive : chipBase}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <FieldLabel>how do you want to talk?</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map(({ id, label, Icon }) => {
                  const active = platform === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPlatform(id)}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-sans text-sm transition-colors duration-[240ms]"
                      style={active ? chipActive : chipBase}
                    >
                      <Icon size={14} strokeWidth={1.5} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <FieldLabel>how long?</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {DURATIONS.map(({ id, label }) => {
                  const active = duration === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setDuration(id)}
                      className="rounded-full px-4 py-2 font-sans text-[13px] transition-colors duration-[240ms]"
                      style={active ? chipActive : chipBase}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field label="when works best?">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent outline-none font-sans text-fg-1"
                style={{ fontSize: 15, colorScheme: "dark" }}
              />
            </Field>

            <div className="flex flex-col gap-2">
              <FieldLabel>what's weighing on you tonight?</FieldLabel>
              <div
                className="font-sans text-fg-3"
                style={{ fontSize: 12, lineHeight: 1.5 }}
              >
                pick anything that fits. or none.
              </div>
              <TopicsDropdown selected={topics} onChange={setTopics} />
            </div>

            <div className="flex flex-col gap-2">
              <FieldLabel>anything else?</FieldLabel>
              <div className="rounded-2xl px-4 py-3" style={fieldBox}>
                <textarea
                  rows={3}
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  placeholder="give your listener context so they can prepare. preferred time, what you'd like to focus on, anything that helps."
                  className="w-full bg-transparent outline-none font-sans text-fg-1 placeholder:text-fg-4 resize-none"
                  style={{ fontSize: 14.5, lineHeight: 1.55 }}
                />
              </div>
            </div>

            {error && (
              <div
                className="font-sans text-[13px] rounded-2xl px-4 py-3"
                style={{
                  color: "#D98A8A",
                  background: "rgba(217, 138, 138, 0.08)",
                  border: "1px solid rgba(217, 138, 138, 0.25)",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2.5 font-sans text-base font-medium rounded-full px-7 py-3.5 mt-1 cursor-pointer transition-colors duration-[240ms]"
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
                background: "rgba(8, 9, 27, 0.55)",
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

function FieldLabel({ children }: { children: ReactNode }) {
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
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="rounded-2xl px-4 py-3" style={fieldBox}>
        {children}
      </div>
    </label>
  );
}

function TopicsDropdown({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (t: string) =>
    onChange(
      selected.includes(t) ? selected.filter((x) => x !== t) : [...selected, t]
    );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="w-full flex items-start justify-between gap-3 rounded-2xl px-4 py-3 text-left transition-colors"
        style={{
          background: "rgba(8, 9, 27, 0.55)",
          border: `1px solid ${
            open ? "rgba(244, 199, 161, 0.32)" : "rgba(237, 231, 218, 0.10)"
          }`,
          cursor: "pointer",
        }}
      >
        <div className="flex-1 min-w-0">
          {selected.length === 0 ? (
            <span
              className="font-sans"
              style={{ color: "#5C574E", fontSize: 15 }}
            >
              select all that fit
            </span>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {selected.map((s) => (
                <span
                  key={s}
                  className="font-sans rounded-full px-2.5 py-0.5"
                  style={{
                    background: "rgba(184, 168, 212, 0.16)",
                    color: "#EDE7DA",
                    fontSize: 12.5,
                    border: "1px solid rgba(184, 168, 212, 0.30)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          color="#8A8478"
          style={{
            flexShrink: 0,
            marginTop: 2,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 240ms cubic-bezier(0.32, 0.72, 0.32, 1)",
          }}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-10 rounded-2xl p-1.5 max-h-[280px] overflow-y-auto"
          style={{
            background: "rgba(22, 26, 50, 0.98)",
            border: "1px solid rgba(237, 231, 218, 0.12)",
            boxShadow:
              "0 24px 60px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(237, 231, 218, 0.05)",
            overscrollBehavior: "contain",
          }}
        >
          {TOPICS.map((t) => {
            const active = selected.includes(t);
            return (
              <button
                key={t}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => toggle(t)}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
                style={{
                  background: active ? "rgba(184, 168, 212, 0.14)" : "transparent",
                  color: active ? "#EDE7DA" : "#BFB8AB",
                  cursor: "pointer",
                }}
              >
                <div
                  className="grid place-items-center rounded-md"
                  style={{
                    width: 16,
                    height: 16,
                    background: active
                      ? "rgba(184, 168, 212, 0.32)"
                      : "rgba(8, 9, 27, 0.5)",
                    border: `1px solid ${
                      active
                        ? "rgba(184, 168, 212, 0.6)"
                        : "rgba(237, 231, 218, 0.16)"
                    }`,
                    flexShrink: 0,
                  }}
                >
                  {active && <Check size={11} color="#EDE7DA" strokeWidth={2.4} />}
                </div>
                <span className="font-sans text-[14px]">{t}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
