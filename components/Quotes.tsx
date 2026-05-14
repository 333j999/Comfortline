const quotes = [
  {
    q: "i didn't know how badly i needed this. i just talked. they just listened.",
    m: "anonymous · 19",
  },
  {
    q: "i told them things i've never said out loud. nothing happened. and that was everything.",
    m: "anonymous · 24",
  },
  {
    q: "i hung up the call lighter than i've felt in months.",
    m: "anonymous · 31",
  },
];

export function Quotes() {
  return (
    <section
      className="px-6 md:px-12 py-[120px] border-t"
      style={{ borderTopColor: "rgba(237,231,218,0.08)" }}
    >
      <div className="mx-auto max-w-[1080px] grid grid-cols-1 md:grid-cols-3 gap-7">
        {quotes.map((q, i) => (
          <div key={i} className="flex flex-col gap-5">
            <div
              className="font-display italic text-fg-1"
              style={{
                fontSize: 26,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                textWrap: "pretty",
              }}
            >
              &ldquo;{q.q}&rdquo;
            </div>
            <div
              className="font-sans text-xs text-fg-3 uppercase"
              style={{ letterSpacing: "0.14em" }}
            >
              {q.m}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
