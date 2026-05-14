// Ambient drifting "spores" — small warm dust motes that float slowly
// upward across the viewport. Pure CSS animation, no JS.
// Mounted once at the layout level so they exist behind every section.

type Spore = {
  left: string;
  top: string;
  size: number;
  dur: number;
  delay: number;
  path: 1 | 2 | 3;
  glow?: boolean;
};

const SPORES: Spore[] = [
  { left: "5%",  top: "85%", size: 3, dur: 52, delay: 0,  path: 1, glow: true },
  { left: "12%", top: "70%", size: 2, dur: 68, delay: 12, path: 2 },
  { left: "22%", top: "92%", size: 4, dur: 45, delay: 4,  path: 1, glow: true },
  { left: "34%", top: "62%", size: 2, dur: 80, delay: 22, path: 3 },
  { left: "45%", top: "88%", size: 3, dur: 58, delay: 8,  path: 2 },
  { left: "55%", top: "75%", size: 4, dur: 50, delay: 16, path: 1, glow: true },
  { left: "65%", top: "92%", size: 2, dur: 72, delay: 6,  path: 3 },
  { left: "72%", top: "65%", size: 3, dur: 55, delay: 14, path: 2 },
  { left: "80%", top: "88%", size: 2, dur: 65, delay: 2,  path: 1 },
  { left: "88%", top: "72%", size: 3, dur: 75, delay: 18, path: 3, glow: true },
  { left: "95%", top: "90%", size: 2, dur: 48, delay: 10, path: 2 },
  { left: "8%",  top: "50%", size: 2, dur: 70, delay: 24, path: 3 },
  { left: "28%", top: "40%", size: 3, dur: 60, delay: 5,  path: 1 },
  { left: "50%", top: "30%", size: 2, dur: 78, delay: 15, path: 2 },
  { left: "68%", top: "45%", size: 3, dur: 52, delay: 11, path: 3, glow: true },
  { left: "85%", top: "38%", size: 2, dur: 66, delay: 20, path: 1 },
  { left: "18%", top: "22%", size: 2, dur: 74, delay: 7,  path: 2 },
  { left: "40%", top: "16%", size: 3, dur: 56, delay: 13, path: 3 },
  { left: "78%", top: "22%", size: 2, dur: 62, delay: 19, path: 1 },
  { left: "60%", top: "10%", size: 2, dur: 70, delay: 26, path: 2, glow: true },
];

export function Spores() {
  return (
    <div className="spores" aria-hidden="true">
      {SPORES.map((s, i) => (
        <span
          key={i}
          className={`spore spore-path-${s.path}${s.glow ? " spore-glow" : ""}`}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDuration: `${s.dur}s`,
            animationDelay: `-${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
