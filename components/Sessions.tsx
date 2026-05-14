import { MessageCircle, Mic, Phone, ArrowRight } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { BookButton } from "./BookButton";

const items = [
  {
    Icon: MessageCircle,
    meta: "text · 30 min",
    title: "a quiet chat",
    d: "just type. read at your own pace. nothing said aloud.",
  },
  {
    Icon: Mic,
    meta: "voice · async",
    title: "leave a voice note",
    d: "say it out loud, in your own voice. they'll listen back when you're done.",
  },
  {
    Icon: Phone,
    meta: "call · 45 min",
    title: "talk on the line",
    d: "one-to-one. anonymous. no video. for the nights you need a voice in the room.",
  },
];

export function Sessions() {
  return (
    <section
      id="sessions"
      className="gradient-bg gradient-bg-sessions relative px-6 md:px-12 py-[120px] border-t"
      style={{ borderTopColor: "rgba(237,231,218,0.08)" }}
    >
      <div className="relative z-10 mx-auto max-w-[1080px]">
        <Eyebrow>three ways to talk</Eyebrow>
        <h2
          className="font-display italic text-fg-1 mt-3 mb-16 max-w-[720px]"
          style={{
            fontSize: 52,
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            textWrap: "balance",
          }}
        >
          pick what feels right. switch any time.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map(({ Icon, meta, title, d }) => (
            <div
              key={title}
              className="flex flex-col gap-3.5 rounded-[20px] p-7 min-h-[280px]"
              style={{
                background: "rgba(18, 21, 42, 0.85)",
                border: "1px solid rgba(237,231,218,0.08)",
                boxShadow: "inset 0 1px 0 rgba(237,231,218,0.04)",
              }}
            >
              <div
                className="w-[52px] h-[52px] rounded-2xl grid place-items-center"
                style={{ background: "#1B1F3A" }}
              >
                <Icon size={24} color="#F4C7A1" strokeWidth={1.5} />
              </div>
              <Eyebrow>{meta}</Eyebrow>
              <div
                className="font-display italic text-fg-1"
                style={{ fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1.15 }}
              >
                {title}
              </div>
              <div
                className="font-sans text-fg-2"
                style={{ fontSize: 14.5, lineHeight: 1.55 }}
              >
                {d}
              </div>
              <BookButton variant="inline" className="mt-auto pt-4">
                start a session{" "}
                <ArrowRight size={14} color="#F4C7A1" strokeWidth={1.5} />
              </BookButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
