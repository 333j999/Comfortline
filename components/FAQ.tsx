"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Eyebrow } from "./Eyebrow";

const items = [
  {
    q: "is this therapy?",
    a: "no. comfort line is not therapy or counselling, and our listeners are not therapists. if you need clinical support, please reach out to a licensed professional or a local helpline.",
  },
  {
    q: "does therapy feel preachy, or like they're not really listening?",
    a: "you're not alone in feeling that way. comfort line isn't here to advise you, fix you, or push you toward a worldview. no homework, no labels, no \"have you tried…\". listeners are trained to do one thing: make space, and actually hear you. you set the pace. you decide what's worth saying.",
  },
  {
    q: "how anonymous is anonymous?",
    a: "anonymous to your listener. they only ever see a session code — never your name, your contact, or anything you shared at booking. we only ask for a name and a way to reach you so we can confirm the session and check in afterwards. those details stay with us. nothing is passed on to the listener.",
  },
  {
    q: "what happens after i book?",
    a: "we'll match you with a listener and message you a session link at the contact you gave us — usually within an hour, often much sooner. you join when you're ready. no waiting room, no small talk you didn't sign up for.",
  },
  {
    q: "who are the listeners?",
    a: "trained, vetted humans — not bots. they're trained in active listening and emotional support. they're not allowed to give medical advice, and they're not trying to \"fix\" you. they're here to sit with you.",
  },
  {
    q: "what if i go quiet?",
    a: "that's okay. silence is part of being held. your listener will wait with you for as long as the session lasts. no pressure to fill the space.",
  },
  {
    q: "can i come back to the same listener?",
    a: "yes — after a session, you can ask for the same listener next time without breaking anonymity. they won't know who you are; they'll just hold space again.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section
      id="faq"
      className="px-6 md:px-12 py-[120px] border-t"
      style={{ borderTopColor: "rgba(237,231,218,0.08)" }}
    >
      <div className="mx-auto max-w-[760px]">
        <Eyebrow>questions</Eyebrow>
        <h2
          className="font-display italic text-fg-1 mt-3 mb-12"
          style={{ fontSize: 48, letterSpacing: "-0.02em", lineHeight: 1.05 }}
        >
          what people ask before starting.
        </h2>
        <div className="flex flex-col">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="border-t border-b"
                style={{
                  borderTopColor: "rgba(237,231,218,0.08)",
                  borderBottomColor:
                    i === items.length - 1
                      ? "rgba(237,231,218,0.08)"
                      : "transparent",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full bg-transparent border-none cursor-pointer flex items-center justify-between py-6 text-left font-sans text-[17px] text-fg-1 font-medium gap-4"
                >
                  <span>{it.q}</span>
                  {isOpen ? (
                    <Minus size={20} color="#8A8478" strokeWidth={1.5} />
                  ) : (
                    <Plus size={20} color="#8A8478" strokeWidth={1.5} />
                  )}
                </button>
                <div
                  className="overflow-hidden transition-all duration-[320ms]"
                  style={{
                    maxHeight: isOpen ? 500 : 0,
                    opacity: isOpen ? 1 : 0,
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div
                    className="font-sans text-[15px] text-fg-2 pb-6 max-w-[640px]"
                    style={{ lineHeight: 1.65 }}
                  >
                    {it.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
