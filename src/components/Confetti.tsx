"use client";

import { useEffect, useState } from "react";

type Piece = { left: number; top: number; size: number; rotate: number; delay: number; glyph: string };

export default function Confetti() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    const glyphs = ["✦", "✧", "●", "◆", "★"];
    setPieces(Array.from({ length: 38 }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 8 + Math.random() * 14,
      rotate: Math.random() * 360,
      delay: Math.random() * 2,
      glyph: glyphs[i % glyphs.length]
    })));
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute opacity-70"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: p.size,
            transform: `rotate(${p.rotate}deg)`,
            animation: `floaty 4s ease-in-out ${p.delay}s infinite alternate`
          }}
        >
          {p.glyph}
        </span>
      ))}
      <style>{`@keyframes floaty { from { translate: 0 0; } to { translate: 0 -22px; } }`}</style>
    </div>
  );
}
