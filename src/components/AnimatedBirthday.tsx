"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGSAP } from "../lib/gsap";

export default function AnimatedBirthday({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const { gsap, ScrollTrigger } = registerGSAP();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    // Phone browsers resize the viewport when the address bar shows/hides while
    // scrolling. Without this, every trigger recalculates mid-scroll and jumps.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      // Scroll progress bar at the top of the page.
      gsap.to("[data-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 }
      });

      if (!reduced) {
        // Each text block reveals as *it* enters the screen (batched so items
        // arriving together stagger nicely), instead of all at once.
        gsap.set(".reveal", { y: 40, autoAlpha: 0 });
        ScrollTrigger.batch(".reveal", {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { y: 0, autoAlpha: 1, duration: .8, stagger: .08, ease: "power3.out", overwrite: true })
        });

        // Gallery cards / polaroids pop in as they arrive.
        gsap.set("[data-pop]", { y: 60, scale: .92, autoAlpha: 0 });
        ScrollTrigger.batch("[data-pop]", {
          start: "top 94%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { y: 0, scale: 1, autoAlpha: 1, duration: .9, stagger: .12, ease: "back.out(1.4)", overwrite: true })
        });

        // Little plane flies UK → Kenya across the boarding pass as you scroll.
        gsap.utils.toArray<HTMLElement>("[data-plane]").forEach((plane) => {
          const track = plane.closest<HTMLElement>("[data-plane-track]");
          if (!track) return;
          gsap.fromTo(plane, { x: 0 }, {
            x: () => track.offsetWidth - plane.offsetWidth,
            ease: "none",
            scrollTrigger: { trigger: track, start: "top 90%", end: "top 35%", scrub: 0.6, invalidateOnRefresh: true }
          });
        });

        mm.add("(min-width: 768px)", () => {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const speed = Number(el.dataset.speed || .2);
            gsap.to(el, {
              yPercent: speed * -20,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
            gsap.fromTo(el, { clipPath: "inset(18% 18% 18% 18% round 24px)" }, {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 85%", end: "top 40%", scrub: true }
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-pin]").forEach((el) => {
            gsap.to(el, {
              scale: .92,
              rotate: -2,
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "+=700",
                pin: true,
                scrub: true
              }
            });
          });
        });

        // Phones: no pinning (it fights touch momentum), but keep motion lively
        // with cheap transform/opacity tweens that play once as things arrive.
        mm.add("(max-width: 767px)", () => {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el, i) => {
            gsap.fromTo(el, { y: 50, autoAlpha: 0, scale: .94 }, {
              y: 0, autoAlpha: 1, scale: 1, duration: .9, delay: (i % 3) * .1, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 95%", once: true }
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-pin]").forEach((el) => {
            gsap.fromTo(el, { scale: .9, autoAlpha: 0 }, {
              scale: 1, autoAlpha: 1, duration: .9, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true }
            });
          });
        });
      }

      // All videos autoplay (muted — browsers only allow silent autoplay) and loop
      // forever. They are never paused when scrolled away, so they're always
      // already playing when you reach them.
      const videos = root.current?.querySelectorAll("video") ?? [];
      const play = (video: HTMLVideoElement) => {
        video.muted = true;
        video.loop = true;
        if (video.paused) video.play().catch(() => {});
      };
      videos.forEach(play);

      // Safety net: if a browser didn't start one (e.g. still loading), start it
      // as soon as it comes on screen.
      const observers: IntersectionObserver[] = [];
      videos.forEach((video) => {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) play(video);
        }, { threshold: 0.15 });
        observer.observe(video);
        observers.push(observer);
      });

      // Phones in Low Power / Data Saver mode block autoplay until the visitor
      // touches the page; any tap (re)starts every video.
      const kick = () => videos.forEach(play);
      window.addEventListener("touchend", kick, { passive: true });
      window.addEventListener("click", kick);

      const refresh = () => ScrollTrigger.refresh();
      const media = root.current?.querySelectorAll("img, video") ?? [];
      media.forEach((node) => {
        node.addEventListener("load", refresh);
        node.addEventListener("loadeddata", refresh);
      });
      window.addEventListener("load", refresh);

      return () => {
        observers.forEach((o) => o.disconnect());
        window.removeEventListener("touchend", kick);
        window.removeEventListener("click", kick);
        media.forEach((node) => {
          node.removeEventListener("load", refresh);
          node.removeEventListener("loadeddata", refresh);
        });
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    }, root);

    return () => ctx.revert();
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}
