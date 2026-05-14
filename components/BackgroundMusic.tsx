"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Background ambient track.
// NOTE: this currently uses a hidden YouTube embed, which has caveats:
//  - Browser autoplay policy means audio is muted until the user clicks anywhere
//  - Hiding the YouTube player is against YouTube ToS section 3
//  - The track is copyrighted; for production launch, swap to a licensed
//    ambient source (Pixabay Music, YouTube Audio Library, Mixkit, etc.)
//
// To change the track: replace VIDEO_ID with another YouTube video ID,
// or rewrite this component to use a self-hosted <audio> element with /public/ambient.mp3
const VIDEO_ID = "9ytiyD_QA2s";
const VOLUME = 50;

export function BackgroundMusic() {
  const playerRef = useRef<any>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as any;

    function makePlayer() {
      if (!w.YT?.Player) return;
      playerRef.current = new w.YT.Player("yt-bg-player", {
        events: {
          onReady: (e: any) => {
            try {
              e.target.setVolume(VOLUME);
              e.target.mute();
              e.target.playVideo();
              setReady(true);
            } catch {}
          },
          // YT.PlayerState.ENDED = 0 — fires when track finishes.
          // Belt-and-braces loop: URL loop=1 is flaky for music videos,
          // so we explicitly replay on ENDED.
          onStateChange: (e: any) => {
            if (e.data === 0) {
              try {
                e.target.seekTo(0);
                e.target.playVideo();
              } catch {}
            }
          },
        },
      });
    }

    if (w.YT?.Player) {
      makePlayer();
    } else {
      const existing = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => {
        existing?.();
        makePlayer();
      };
      if (!document.querySelector('script[src*="iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    }

    const onFirstUserGesture = () => {
      const p = playerRef.current;
      if (!p?.unMute) return;
      try {
        p.unMute();
        p.setVolume(VOLUME);
        p.playVideo();
        setMuted(false);
      } catch {}
    };
    document.addEventListener("click", onFirstUserGesture, { once: true });
    document.addEventListener("keydown", onFirstUserGesture, { once: true });

    return () => {
      document.removeEventListener("click", onFirstUserGesture);
      document.removeEventListener("keydown", onFirstUserGesture);
    };
  }, []);

  const toggle = () => {
    const p = playerRef.current;
    if (!p?.mute) return;
    try {
      if (muted) {
        p.unMute();
        p.setVolume(VOLUME);
        p.playVideo();
      } else {
        p.mute();
      }
      setMuted(!muted);
    } catch {}
  };

  return (
    <>
      {/* Hidden iframe — receives commands via the YT IFrame API */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: -2000,
          left: -2000,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <iframe
          id="yt-bg-player"
          width="1"
          height="1"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&modestbranding=1&playsinline=1&enablejsapi=1`}
          title="ambient"
          allow="autoplay"
        />
      </div>

      <button
        type="button"
        onClick={toggle}
        disabled={!ready}
        aria-label={muted ? "play ambient sound" : "mute ambient sound"}
        className="fixed bottom-6 right-6 z-30 grid place-items-center w-11 h-11 rounded-full transition-all duration-[240ms]"
        style={{
          background: "rgba(18, 21, 42, 0.78)",
          backdropFilter: "blur(20px)",
          color: muted ? "#8A8478" : "#F4C7A1",
          border: `1px solid ${
            muted ? "rgba(237, 231, 218, 0.12)" : "rgba(244, 199, 161, 0.32)"
          }`,
          boxShadow: muted ? "none" : "0 0 24px rgba(244, 199, 161, 0.22)",
          cursor: ready ? "pointer" : "default",
          opacity: ready ? 1 : 0.4,
        }}
      >
        {muted ? (
          <VolumeX size={16} strokeWidth={1.5} />
        ) : (
          <Volume2 size={16} strokeWidth={1.5} />
        )}
      </button>
    </>
  );
}
