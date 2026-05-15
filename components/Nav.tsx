import Link from "next/link";
import { Glyph } from "./Glyph";
import { BookButton } from "./BookButton";
import { MobileMenu } from "./MobileMenu";

export function Nav() {
  return (
    <nav
      className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 md:px-12 border-b"
      style={{
        background: "rgba(8, 9, 27, 0.7)",
        backdropFilter: "blur(20px)",
        borderBottomColor: "rgba(237,231,218,0.08)",
      }}
    >
      <Link href="#" className="flex items-center gap-3 no-underline">
        <Glyph size={36} />
        <span
          className="font-display italic text-2xl text-fg-1"
          style={{ letterSpacing: "-0.02em" }}
        >
          comfort line
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="#how"
          className="font-sans text-sm text-fg-2 no-underline hover:text-fg-1 transition-colors"
        >
          how it works
        </Link>
        <Link
          href="#sessions"
          className="font-sans text-sm text-fg-2 no-underline hover:text-fg-1 transition-colors"
        >
          sessions
        </Link>
        <Link
          href="#pricing"
          className="font-sans text-sm text-fg-2 no-underline hover:text-fg-1 transition-colors"
        >
          pricing
        </Link>
        <Link
          href="#faq"
          className="font-sans text-sm text-fg-2 no-underline hover:text-fg-1 transition-colors"
        >
          questions
        </Link>
        <BookButton style={{ padding: "10px 20px", fontSize: 14 }}>
          Start a session
        </BookButton>
      </div>
      <MobileMenu />
    </nav>
  );
}
