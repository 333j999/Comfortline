import { Glyph } from "./Glyph";
import { FooterActions } from "./FooterActions";

export function Footer() {
  return (
    <footer
      className="px-6 md:px-12 pt-12 pb-16 border-t"
      style={{ borderTopColor: "rgba(237,231,218,0.08)" }}
    >
      <div className="mx-auto max-w-[1080px] flex flex-wrap justify-between items-start gap-8">
        <div className="flex items-center gap-3">
          <Glyph size={28} />
          <span
            className="font-display italic text-[18px] text-fg-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            comfort line
          </span>
        </div>
        <div
          className="font-sans text-[13px] text-fg-3 max-w-[380px]"
          style={{ lineHeight: 1.6 }}
        >
          comfort line is not a substitute for therapy, counselling, or
          emergency mental health services. if you are in crisis, please
          contact your local emergency services or crisis line.
        </div>
        <FooterActions />
      </div>
    </footer>
  );
}
