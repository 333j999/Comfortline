import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/components/BookingProvider";
import { Spores } from "@/components/Spores";
import { Intro } from "@/components/Intro";
import { BackgroundMusic } from "@/components/BackgroundMusic";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "comfort line — you do not have to carry everything alone.",
  description:
    "anonymous text, voice note, and 1-to-1 calls for the nights you just need someone to listen. no therapy. no labels. no fixing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Intro />
        <Spores />
        <BackgroundMusic />
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
