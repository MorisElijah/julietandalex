"use client";

import { useEffect, useState } from "react";
import { site } from "../config/site";

/**
 * Opening screen. Browsers never allow a page to play sound until the visitor
 * taps/clicks something, so this one tap is what lets the song (and, on phones
 * in battery-saver mode, the videos) start automatically.
 */
export default function IntroGate() {
  const [state, setState] = useState<"open" | "closing" | "gone">("open");

  // Keep the page from scrolling behind the opening screen.
  useEffect(() => {
    if (state === "gone") return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [state]);

  const start = () => {
    // These play() calls must happen right here, inside the tap, to be allowed.
    const audio = document.querySelector<HTMLAudioElement>("audio[data-birthday-music]");
    if (audio?.paused) audio.play().catch(() => {});
    document.querySelectorAll("video").forEach((v) => {
      v.muted = true;
      v.loop = true;
      v.play().catch(() => {});
    });
    setState("closing");
    window.setTimeout(() => setState("gone"), 700);
  };

  if (state === "gone") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Open the birthday celebration"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[var(--ink)] px-6 text-center text-white transition-opacity duration-700 ${
        state === "closing" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(216,27,134,.6),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(33,102,255,.55),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(255,200,87,.18),transparent_55%)]" />

      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[.35em] text-[var(--gold)]">November 10 + November 13</p>
        <h1 className="mt-5 font-display text-[clamp(4.5rem,22vw,11rem)] leading-[.8]">
          <span className="block text-[var(--coral)]">JULIET</span>
          <span className="block text-2xl tracking-[.3em] text-white/80 md:text-4xl">&amp;</span>
          <span className="block text-[var(--teal)]">ALEX</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xs text-sm font-semibold text-white/75 md:max-w-md md:text-base">
          {site.people.juliet.fullName} &amp; {site.people.alex.fullName}
        </p>

        <button
          type="button"
          onClick={start}
          autoFocus
          className="intro-pulse mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--gold)] px-8 py-5 text-base font-black uppercase tracking-[.2em] text-[var(--ink)] shadow-2xl transition active:scale-95"
        >
          <span aria-hidden="true">▶</span> Tap to open
        </button>
        <p className="mt-5 text-xs font-bold uppercase tracking-[.25em] text-white/60">Turn your sound on 🔊</p>
      </div>
    </div>
  );
}
