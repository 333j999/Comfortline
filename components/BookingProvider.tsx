"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { BookingDialog } from "./BookingDialog";
import { InfoDialog } from "./InfoDialog";

type ModalType = "booking" | "privacy" | "terms" | "how" | "crisis" | null;

type Ctx = {
  open: () => void;
  openPrivacy: () => void;
  openTerms: () => void;
  openHowItWorks: () => void;
  openCrisis: () => void;
  close: () => void;
  type: ModalType;
};

const ModalCtx = createContext<Ctx>({
  open: () => {},
  openPrivacy: () => {},
  openTerms: () => {},
  openHowItWorks: () => {},
  openCrisis: () => {},
  close: () => {},
  type: null,
});

export function useBooking() {
  return useContext(ModalCtx);
}

const PRIVACY = {
  eyebrow: "privacy",
  title: "what we keep, and what we don't.",
  paragraphs: [
    "your sessions belong to you. we don't sit in on them, store them, or analyse them. nothing you say to your listener is recorded.",
    "the details you share when you book — your name, your contact, what's weighing on you — stay with us. your listener only ever sees a session code, never your name or anything you told us.",
    "we don't sell your data. we don't share it with advertisers. we don't run profiling or analytics on what you tell us. we don't pass anything to third parties.",
    "we use your contact details for two things: confirming your session, and a single soft check-in afterwards. that's it.",
    "you can ask us to delete everything we hold on you at any time. reply to any message from us and we'll clear it the same day.",
    "if you ever feel uneasy about how we're holding your information, tell us. we'll fix it before we do anything else.",
  ],
};

const CRISIS = {
  eyebrow: "if you're in crisis",
  title: "please reach someone trained for this.",
  paragraphs: [
    "comfort line is not built for emergencies. if you're thinking about harming yourself, or you're in immediate danger, please contact someone who can help right now.",
    "UK · Samaritans · call 116 123 · free, 24/7, any reason.",
    "UK · Shout · text 85258 · free, 24/7, text-only.",
    "UK · NHS · call 111 and press option 2 for urgent mental health support.",
    "UK · 999 · if a life is in immediate danger.",
    "US · 988 · call or text the suicide and crisis lifeline.",
    "anywhere else · findahelpline.com · every country's crisis line in one place.",
    "we're here too, when you're ready. but please reach them first.",
  ],
};

const HOW_IT_WORKS = {
  eyebrow: "how it works",
  title: "what to expect when you book.",
  paragraphs: [
    "tell us a little. share what to call you, how to reach you back, and what you'd like to talk about. takes a minute. these details stay with us — your listener never sees them.",
    "we match you with an experienced listener — not a therapist — who'll hold space for the conversation you want to have.",
    "pick the format that feels right: text, a voice note, or a 1-to-1 call. you can switch any time, even mid-session.",
    "we send you a session link at the contact you gave us — usually within an hour, often sooner. you join when you're ready.",
    "no advice unless you ask for it. no homework. no labels. no \"have you tried…\". just space, and someone who listens.",
    "afterwards, we send a single soft check-in. that's it. you decide if and when you want to come back.",
  ],
};

const TERMS = {
  eyebrow: "terms",
  title: "what comfort line is, and isn't.",
  paragraphs: [
    "comfort line is anonymous emotional support. our listeners are experienced in holding space — listening without judgement and without pushing. they are not therapists, counsellors, or medical professionals.",
    "this is not a substitute for therapy or licensed mental health care. if you need clinical support, please reach out to a qualified professional. comfort line is here for the in-between.",
    "if you're in immediate danger or crisis, please contact your local emergency line or a crisis helpline. comfort line is not built for emergencies, and we cannot guarantee real-time availability.",
    "by booking a session, you confirm that you understand the above.",
    "we may end a session early, or decline a future one, if it puts you or our listener at risk. we'll always tell you why.",
    "refunds are available within 24 hours of booking if you haven't started your session. once a session has happened, refunds are case-by-case — message us and we'll talk it through.",
  ],
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<ModalType>(null);

  const open            = useCallback(() => setType("booking"), []);
  const openPrivacy     = useCallback(() => setType("privacy"), []);
  const openTerms       = useCallback(() => setType("terms"),   []);
  const openHowItWorks  = useCallback(() => setType("how"),     []);
  const openCrisis      = useCallback(() => setType("crisis"),  []);
  const close           = useCallback(() => setType(null),      []);

  // Toggle a body class while any modal is open so we can pause the
  // ambient spores + drifting gradients via CSS (they're invisible
  // behind the modal and the GPU work was making scroll choppy).
  useEffect(() => {
    if (type) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [type]);

  return (
    <ModalCtx.Provider
      value={{
        open,
        openPrivacy,
        openTerms,
        openHowItWorks,
        openCrisis,
        close,
        type,
      }}
    >
      {children}
      {type === "booking" && <BookingDialog onClose={close} />}
      {type === "privacy" && <InfoDialog {...PRIVACY}      onClose={close} />}
      {type === "terms"   && <InfoDialog {...TERMS}        onClose={close} />}
      {type === "how"     && <InfoDialog {...HOW_IT_WORKS} onClose={close} />}
      {type === "crisis"  && <InfoDialog {...CRISIS}       onClose={close} />}
    </ModalCtx.Provider>
  );
}
