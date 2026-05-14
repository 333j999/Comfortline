import { Eyebrow } from "./Eyebrow";
import { BookButton } from "./BookButton";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="gradient-bg gradient-bg-pricing relative px-6 md:px-12 py-[120px] border-t"
      style={{ borderTopColor: "rgba(237,231,218,0.08)" }}
    >
      <div className="relative z-10 mx-auto max-w-[720px] text-center">
        <Eyebrow>what it costs</Eyebrow>
        <h2
          className="font-display italic text-fg-1 mt-3 mb-6"
          style={{
            fontSize: 56,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            textWrap: "balance",
          }}
        >
          pay what feels right.
        </h2>
        <p
          className="font-sans text-fg-2 max-w-[560px] mx-auto mb-10"
          style={{ fontSize: 17, lineHeight: 1.6 }}
        >
          a 30-minute session starts at £15. no subscriptions, no
          auto-renewals, no contracts. show up once, or come back when you
          need to.
        </p>
        <div
          className="inline-flex items-baseline gap-2 px-7 py-3.5 rounded-full mb-8"
          style={{
            background: "rgba(18, 21, 42, 0.85)",
            border: "1px solid rgba(237,231,218,0.16)",
          }}
        >
          <span
            className="font-mono text-[13px] text-fg-3 uppercase"
            style={{ letterSpacing: "0.14em" }}
          >
            from
          </span>
          <span
            className="font-display italic text-fg-1"
            style={{ fontSize: 36, letterSpacing: "-0.02em" }}
          >
            £15
          </span>
          <span className="font-sans text-sm text-fg-3">/ 30 min</span>
        </div>
        <div>
          <BookButton>Start your first session</BookButton>
        </div>
      </div>
    </section>
  );
}
