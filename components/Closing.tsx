import { Glyph } from "./Glyph";
import { BookButton } from "./BookButton";

export function Closing() {
  return (
    <section
      id="start"
      className="gradient-bg gradient-bg-closing relative px-6 md:px-12 py-[160px] border-t text-center"
      style={{ borderTopColor: "rgba(237,231,218,0.08)" }}
    >
      <div className="relative z-10">
        <div className="mb-8 inline-block animate-breath">
          <Glyph size={88} />
        </div>
        <h2
          className="font-display italic text-fg-1 mx-auto max-w-[820px]"
          style={{
            fontSize: 72,
            letterSpacing: "-0.025em",
            lineHeight: 1.02,
            textWrap: "balance",
          }}
        >
          someone is here, tonight.
        </h2>
        <div className="mt-10">
          <BookButton style={{ fontSize: 17, padding: "16px 32px" }}>
            Start a session
          </BookButton>
        </div>
      </div>
    </section>
  );
}
