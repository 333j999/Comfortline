import { Eyebrow } from "./Eyebrow";

const steps = [
  {
    n: "01",
    t: "tell us a little",
    d: "a name, a way to reach you, and what's weighing on you tonight. takes a minute. nothing is shared with your listener.",
  },
  {
    n: "02",
    t: "pick how to talk",
    d: "text if you can't speak. a voice note if you can't type. a call if you want a voice on the other end. switch any time.",
  },
  {
    n: "03",
    t: "someone listens",
    d: "an experienced listener — not a therapist — makes space for whatever you have to say. no advice unless you ask. for as long as you need.",
  },
];

export function How() {
  return (
    <section
      id="how"
      className="relative px-6 md:px-12 py-[120px] border-t"
      style={{ borderTopColor: "rgba(237,231,218,0.08)" }}
    >
      <div className="mx-auto max-w-[1080px]">
        <Eyebrow>how it works</Eyebrow>
        <h2
          className="font-display italic text-fg-1 mt-3 mb-16 max-w-[640px]"
          style={{
            fontSize: 52,
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            textWrap: "balance",
          }}
        >
          three steps. nothing to set up.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col gap-4">
              <div
                className="font-mono text-[13px]"
                style={{ color: "#F4C7A1", letterSpacing: "0.14em" }}
              >
                {s.n}
              </div>
              <div
                className="font-display italic text-fg-1"
                style={{ fontSize: 30, letterSpacing: "-0.02em", lineHeight: 1.15 }}
              >
                {s.t}
              </div>
              <div
                className="font-sans text-[15px] text-fg-2"
                style={{ lineHeight: 1.6 }}
              >
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
