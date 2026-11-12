"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerGSAP } from "../lib/gsap";

export default function SmoothScroll() {
  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGSAP();
    const lenis = new Lenis({ autoRaf: false, lerp: 0.085 });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return null;
}
