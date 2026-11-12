"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "../config/site";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [volume]);

  // Autoplay the song. Browsers (especially on phones) block sound until the
  // visitor interacts with the page, so if the first attempt is blocked we start
  // it on their first tap/click/key press instead.
  useEffect(() => {
    if (!site.music.autoplay) return;
    const audio = audioRef.current;
    if (!audio) return;

    const events = ["pointerdown", "touchend", "click", "keydown"] as const;
    const startOnGesture = (e: Event) => {
      // A tap on the player itself is handled by its own play/pause button.
      if (playerRef.current?.contains(e.target as Node)) return cleanup();
      cleanup();
      if (audio.paused) audio.play().catch(() => {});
    };
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, startOnGesture, true));

    audio.play().catch(() => {
      events.forEach((e) => window.addEventListener(e, startOnGesture, { capture: true, passive: true }));
    });
    return cleanup;
  }, []);

  // Stop the song when the visitor leaves: closing the tab/browser, switching
  // apps on a phone, or minimising. Phones often keep a "closed" browser alive
  // in the background, so without this the music would keep playing.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let resumeOnReturn = false;

    const stop = () => {
      if (!audio.paused) {
        resumeOnReturn = true;
        audio.pause();
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        stop();
      } else if (resumeOnReturn) {
        resumeOnReturn = false;
        audio.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", stop);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", stop);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        // Browser autoplay policies can block playback until the user interacts.
      }
    } else {
      audio.pause();
    }
  };

  return (
    <div ref={playerRef} className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full border border-white/20 bg-[var(--ink)]/90 p-2 text-white shadow-2xl backdrop-blur-md">
      <audio ref={audioRef} data-birthday-music src={site.music.path} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause birthday music" : "Play birthday music"}
        aria-pressed={playing}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--ink)] font-black transition hover:scale-105"
      >
        {playing ? "Ⅱ" : "▶"}
      </button>
      <div className="hidden pr-3 sm:block">
        <p className="text-[10px] font-black uppercase tracking-[.18em] opacity-60">Now playing</p>
        <p className="max-w-[190px] truncate text-xs font-extrabold">{site.music.title}</p>
      </div>
      <label className="sr-only" htmlFor="music-volume">Music volume</label>
      <input
        id="music-volume"
        aria-label="Music volume"
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="hidden w-20 accent-[var(--gold)] sm:block"
      />
    </div>
  );
}
