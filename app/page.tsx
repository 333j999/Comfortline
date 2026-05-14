import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { How } from "@/components/How";
import { Sessions } from "@/components/Sessions";
import { Quotes } from "@/components/Quotes";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Closing } from "@/components/Closing";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Reveal>
        <How />
      </Reveal>
      <Reveal>
        <Sessions />
      </Reveal>
      <Reveal>
        <Quotes />
      </Reveal>
      <Reveal>
        <Pricing />
      </Reveal>
      <Reveal>
        <FAQ />
      </Reveal>
      <Reveal>
        <Closing />
      </Reveal>
      <Reveal>
        <Footer />
      </Reveal>
    </>
  );
}
