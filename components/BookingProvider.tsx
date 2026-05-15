"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { BookingDialog } from "./BookingDialog";
import { InfoDialog } from "./InfoDialog";

type ModalType = "booking" | "privacy" | "terms" | null;

type Ctx = {
  open: () => void;
  openPrivacy: () => void;
  openTerms: () => void;
  close: () => void;
  type: ModalType;
};

const ModalCtx = createContext<Ctx>({
  open: () => {},
  openPrivacy: () => {},
  openTerms: () => {},
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

const TERMS = {
  eyebrow: "terms",
  title: "what comfort line is, and isn't.",
  paragraphs: [
    "comfort line is anonymous emotional support. our listeners are trained to hold space — to listen without judgement and without pushing. they are not therapists, counsellors, or medical professionals.",
    "this is not a substitute for therapy or licensed mental health care. if you need clinical support, please reach out to a qualified professional. comfort line is here for the in-between.",
    "if you're in immediate danger or crisis, please contact your local emergency line or a crisis helpline. comfort line is not built for emergencies, and we cannot guarantee real-time availability.",
    "by booking a session, you confirm that you understand the above.",
    "we may end a session early, or decline a future one, if it puts you or our listener at risk. we'll always tell you why.",
    "refunds are available within 24 hours of booking if you haven't started your session. once a session has happened, refunds are case-by-case — message us and we'll talk it through.",
  ],
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<ModalType>(null);

  const open        = useCallback(() => setType("booking"), []);
  const openPrivacy = useCallback(() => setType("privacy"), []);
  const openTerms   = useCallback(() => setType("terms"),   []);
  const close       = useCallback(() => setType(null),      []);

  return (
    <ModalCtx.Provider value={{ open, openPrivacy, openTerms, close, type }}>
      {children}
      {type === "booking" && <BookingDialog onClose={close} />}
      {type === "privacy" && <InfoDialog {...PRIVACY} onClose={close} />}
      {type === "terms"   && <InfoDialog {...TERMS}   onClose={close} />}
    </ModalCtx.Provider>
  );
}
