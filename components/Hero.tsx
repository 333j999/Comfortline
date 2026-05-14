import { Glyph } from "./Glyph";
import { BookButton } from "./BookButton";

export function Hero() {
  return (
    <section className="gradient-bg gradient-bg-hero relative px-6 md:px-12 pt-[120px] pb-[140px]">
      <div className="hero-intro relative z-10 mx-auto max-w-[980px]">
        <div className="mb-7 animate-breath">
          <Glyph size={64} />
        </div>
        <h1
          className="font-display italic font-normal m-0 max-w-[900px] text-fg-1"
          style={{
            fontSize: "clamp(56px, 9vw, 104px)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            textWrap: "balance",
          }}
        >
          you do not have to carry everything alone.
        </h1>
        <p
          className="font-sans text-fg-2 mt-7 max-w-[520px]"
          style={{ fontSize: 19, lineHeight: 1.55, textWrap: "pretty" }}
        >
          anonymous text, voice note, and 1-to-1 calls — for the nights you
          just need someone to listen. no therapy. no labels. no fixing.
        </p>
        <div className="flex flex-wrap gap-3.5 mt-10">
          <BookButton>Start a session</BookButton>
          <BookButton variant="ghost">how it works</BookButton>
        </div>
        <div className="flex items-center gap-2.5 mt-12 font-sans text-[13px] text-fg-3">
          <div
            className="w-2 h-2 rounded-full soft-pulse"
            style={{ background: "#F4C7A1" }}
          />
          <span style={{ letterSpacing: "0.08em" }}>
            4 listeners online · average wait under a minute
          </span>
        </div>
      </div>
    </section>
  );
}
