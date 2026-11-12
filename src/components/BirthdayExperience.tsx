"use client";

import { ratio, site } from "../config/site";
import MediaFrame from "./MediaFrame";
import SmoothScroll from "./SmoothScroll";
import AnimatedBirthday from "./AnimatedBirthday";
import Confetti from "./Confetti";
import MusicPlayer from "./MusicPlayer";
import WelcomeBeatrice from "./WelcomeBeatrice";
import ComingSoonLydia from "./ComingSoonLydia";
import IntroGate from "./IntroGate";

const media = site.media;
const julietMedia = media.filter((m) => m.path.includes("/juliet/"));
const alexMedia = media.filter((m) => m.path.includes("/alex/"));
const togetherMedia = media.filter((m) => m.path.includes("/together/"));
const togetherImages = togetherMedia.filter((m) => m.type === "image");
// Portrait photos go in the swipe row; wide group shots, the rest and the videos go in the grid below.
const togetherSwipe = togetherImages.filter((m) => !m.wide).slice(0, 3);
const togetherMore = [
  ...togetherImages.filter((m) => !togetherSwipe.includes(m)),
  ...togetherMedia.filter((m) => m.type === "video")
];

function ThemeBadge({ children, tone }: { children: React.ReactNode; tone: "pink" | "blue" | "gold" }) {
  const cls = tone === "pink" ? "bg-[var(--coral)]" : tone === "blue" ? "bg-[var(--blue)]" : "bg-[var(--gold)]";
  return <span className={`inline-flex rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[.2em] ${cls}`}>{children}</span>;
}

function Chapter({
  person,
  items,
  reverse = false
}: {
  person: typeof site.people.juliet | typeof site.people.alex;
  items: typeof media;
  reverse?: boolean;
}) {
  const isJuliet = person.name === "Juliet";
  // The first photo is used in the hero, so the collage shows the last three photos.
  const photos = items.filter((m) => m.type === "image").slice(-3);
  const video = items.find((m) => m.type === "video")!;

  return (
    <section
      id={person.name.toLowerCase()}
      className={`relative overflow-hidden py-28 md:py-40 ${isJuliet ? "bg-[var(--cream)]" : "bg-[#eafaff]"}`}
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className={`grid items-center gap-12 md:grid-cols-12 ${reverse ? "md:[direction:rtl]" : ""}`}>
          <div className={`md:col-span-5 ${reverse ? "md:[direction:ltr]" : ""}`}>
            <ThemeBadge tone={isJuliet ? "pink" : "blue"}>{person.birthday}</ThemeBadge>
            <h2 className={`section-title reveal mt-6 font-display ${isJuliet ? "text-[var(--magenta)]" : "text-[var(--blue)]"}`}>
              {person.fullName.split(" ").map((word) => (
                <span key={word} className="block">{word}</span>
              ))}
            </h2>
            <p className="reveal mt-8 max-w-xl text-xl font-semibold leading-tight md:text-3xl">{person.headline}</p>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {person.traits.map((trait) => (
                <div
                  key={trait}
                  className={`reveal rounded-2xl border-2 p-4 text-sm font-extrabold uppercase tracking-wider ${
                    isJuliet ? "border-[var(--coral)]" : "border-[var(--teal)]"
                  }`}
                >
                  {trait}
                </div>
              ))}
            </div>

            <p className="reveal mt-8 max-w-xl text-base leading-7 opacity-75">{person.note}</p>
          </div>

          <div className={`md:col-span-7 ${reverse ? "md:[direction:ltr]" : ""}`}>
            <div className="relative min-h-[560px] md:min-h-[780px]">
              {[0, 1, 2].map((i) => (
                <div
                  key={photos[i].path}
                  data-parallax
                  data-speed={i === 0 ? ".8" : i === 1 ? ".35" : ".55"}
                  data-mask={i !== 2 ? "" : undefined}
                  // Width is set per slot; height follows the photo's own shape.
                  style={{ aspectRatio: ratio(photos[i]) }}
                  className={`absolute overflow-hidden shadow-2xl ${
                    i === 0
                      ? `right-0 top-0 w-[64%] rounded-[2rem] md:w-[52%] ${isJuliet ? "rotate-3" : "-rotate-3"}`
                      : i === 1
                        ? `bottom-0 left-0 w-[58%] rounded-[2rem] md:w-[48%] ${isJuliet ? "-rotate-6" : "rotate-6"}`
                        : "bottom-[17%] right-[15%] w-[38%] rounded-[1.5rem] border-[10px] border-white md:w-[34%]"
                  }`}
                >
                  <MediaFrame item={photos[i]} />
                </div>
              ))}
              <div className={`absolute left-[5%] top-[12%] z-10 rounded-full px-5 py-3 text-xs font-black uppercase tracking-widest ${isJuliet ? "bg-[var(--magenta)] text-white" : "bg-[var(--teal)]"}`}>
                {isJuliet ? "ICONIC" : "UNSTOPPABLE"}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div
              data-pin
              className="relative mx-auto w-full overflow-hidden rounded-[2rem] bg-black"
              style={{ maxWidth: `min(100%, calc(78svh * ${ratio(video)}))` }}
            >
              <div style={{ aspectRatio: ratio(video) }}>
                <MediaFrame item={video} />
              </div>
            </div>
          </div>
          <div className="flex items-end md:col-span-5">
            <p className={`font-display text-5xl leading-none md:text-7xl ${isJuliet ? "text-[var(--coral)]" : "text-[var(--blue)]"}`}>
              {isJuliet ? "KEEP SHINING." : "KEEP GOING."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BirthdayExperience() {
  return (
    <main>
      <SmoothScroll />

      <AnimatedBirthday>
        <div className="grain" />
        <Confetti />
        <MusicPlayer />
        <IntroGate />

        <div className="sticky top-0 z-30 h-1 bg-black/10">
          <div data-progress className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[var(--coral)] via-[var(--gold)] to-[var(--blue)]" />
        </div>

        <div className="marquee border-y-2 border-[var(--ink)] bg-[var(--ink)] py-3 text-white">
          <div className="marquee-track font-display text-3xl tracking-wide">
            <span>{site.marquee.repeat(4)}</span>
            <span aria-hidden="true">{site.marquee.repeat(4)}</span>
          </div>
        </div>

        <section className="relative min-h-[100svh] overflow-hidden bg-[var(--ink)] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(216,27,134,.65),transparent_35%),radial-gradient(circle_at_80%_65%,rgba(0,199,183,.5),transparent_35%)]" />

          <div className="relative mx-auto grid min-h-[100svh] max-w-[1600px] grid-cols-2">
            <div className="relative flex min-h-[100svh] items-end overflow-hidden border-r border-white/20 p-5 pb-24 md:p-10 md:pb-28">
              <div className="absolute inset-0 opacity-80" data-parallax data-speed=".25">
                <MediaFrame item={julietMedia[0]} priority fit="contain" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--magenta)]/95 via-black/20 to-transparent" />
              <div className="relative z-10">
                <p className="font-bold uppercase tracking-[.25em]">November 10</p>
                <p className="mt-2 text-xs font-extrabold uppercase tracking-[.2em] text-white/85 md:text-base">{site.people.juliet.fullName}</p>
                <h1 className="hero-title mt-4 font-display text-[var(--coral)]">JULIET</h1>
              </div>
            </div>

            <div className="relative flex min-h-[100svh] items-end overflow-hidden p-5 pb-24 md:p-10 md:pb-28">
              <div className="absolute inset-0 opacity-80" data-parallax data-speed=".4">
                <MediaFrame item={alexMedia[0]} priority fit="contain" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--blue)]/95 via-black/20 to-transparent" />
              <div className="relative z-10">
                <p className="font-bold uppercase tracking-[.25em]">November 13</p>
                <p className="mt-2 text-xs font-extrabold uppercase tracking-[.2em] text-white/85 md:text-base">{site.people.alex.fullName}</p>
                <h1 className="hero-title mt-4 font-display text-[var(--teal)]">ALEX</h1>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-xs font-black uppercase tracking-[.3em]">
            Scroll to celebrate ↓
          </div>
        </section>

        <Chapter person={site.people.juliet} items={julietMedia} />
        <Chapter person={site.people.alex} items={alexMedia} reverse />

        <section className="relative overflow-hidden bg-[linear-gradient(135deg,var(--magenta),var(--violet)_45%,var(--blue))] py-28 text-white md:py-40">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">
            <ThemeBadge tone="gold">Together</ThemeBadge>
            <h2 className="section-title reveal mt-6 font-display">{site.together.headline}</h2>
            <p className="reveal mt-6 max-w-xl text-xl font-semibold">{site.together.caption}</p>

            <div className="snap-row -mx-5 mt-16 flex items-center gap-5 overflow-x-auto px-5 pb-8 md:mx-0 md:mt-24 md:justify-center md:gap-8 md:overflow-visible md:px-0">
              {togetherSwipe.map((item, i) => (
                <div
                  key={item.path}
                  // Each card takes its photo's shape: fixed height, width from the photo.
                  style={{ aspectRatio: ratio(item), ["--r" as string]: ratio(item) }}
                  className={`relative w-[min(85vw,calc(62svh*var(--r)))] shrink-0 snap-center overflow-hidden rounded-[2rem] md:w-[calc(58vh*var(--r))] ${
                    i === 1 ? "md:translate-y-16" : i === 2 ? "md:-translate-y-8" : ""
                  }`}
                >
                  <MediaFrame item={item} sizes="(max-width: 768px) 80vw, 33vw" />
                </div>
              ))}
            </div>
            <p className="mt-1 text-center text-xs font-black uppercase tracking-[.3em] opacity-70 md:hidden">Swipe for more →</p>

            <div className="mt-16 md:mt-32">
              <p className="reveal font-display text-5xl leading-none md:text-7xl">MORE OF US.</p>
              {togetherMore.filter((m) => m.wide).map((item) => (
                <div
                  key={item.path}
                  data-pop
                  style={{ aspectRatio: ratio(item) }}
                  className="relative mt-8 overflow-hidden rounded-[1.5rem] shadow-2xl md:rounded-[2rem]"
                >
                  <MediaFrame item={item} sizes="100vw" />
                </div>
              ))}
              {/* Masonry columns: every tile keeps its own shape, so nothing is cropped or padded. */}
              <div className="mt-3 columns-2 gap-3 md:mt-6 md:columns-3 md:gap-6">
                {togetherMore.filter((m) => !m.wide).map((item) => (
                  <div
                    key={item.path}
                    data-pop
                    style={{ aspectRatio: ratio(item) }}
                    className="relative mb-3 break-inside-avoid overflow-hidden rounded-[1.5rem] shadow-2xl md:mb-6 md:rounded-[2rem]"
                  >
                    <MediaFrame item={item} sizes="(max-width: 768px) 50vw, 33vw" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <WelcomeBeatrice />

        <section className="bg-[var(--ink)] px-5 py-32 text-white md:px-10 md:py-48">
          <div className="mx-auto max-w-[1200px]">
            <ThemeBadge tone="gold">Another year older</ThemeBadge>
            <div className="mt-16 grid gap-10 md:grid-cols-2">
              {[site.people.juliet, site.people.alex].map((person, i) => (
                <div key={person.name} className="reveal rounded-[2rem] border border-white/20 p-8 md:p-12">
                  <p className="text-sm font-black uppercase tracking-[.2em] opacity-60">{person.birthday}</p>
                  <p className="mt-6 font-display text-[clamp(6rem,15vw,12rem)] leading-none">{person.age}</p>
                  <p className="mt-2 text-2xl font-extrabold">years of being {person.fullName}.</p>
                  <p className="mt-8 text-lg opacity-70">
                    {i === 0 ? "Another lap around the sun. More memories. More magic." : "Another chapter. Bigger dreams. Better stories."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fff1e8] px-5 py-28 md:px-10 md:py-40">
          <div className="mx-auto max-w-[1100px]">
            <ThemeBadge tone="pink">Wishes</ThemeBadge>
            <h2 className="section-title reveal mt-6 font-display text-[var(--magenta)]">{site.wishes.title}</h2>

            <div className="mt-12 grid gap-8 md:grid-cols-12">
              <div className="reveal rounded-[2rem] bg-white p-8 shadow-xl md:col-span-7 md:p-12">
                <p className="text-xl font-semibold leading-8 md:text-2xl md:leading-10">{site.wishes.note}</p>
              </div>

              <div className="grid gap-4 md:col-span-5">
                {site.wishes.wall.map((wish, i) => (
                  <div key={wish} className={`reveal rounded-2xl p-5 font-extrabold ${i % 2 ? "bg-[var(--gold)]" : "bg-[var(--teal)]"}`}>
                    {wish}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[var(--gold)] px-5 py-32 text-center md:px-10 md:py-48">
          <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-[var(--coral)]/30 blur-2xl" />
          <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-[var(--blue)]/30 blur-2xl" />

          <div className="relative mx-auto max-w-5xl">
            <p className="font-black uppercase tracking-[.35em]">November 10 + November 13</p>
            <h2 className="mt-6 font-display text-[clamp(5rem,17vw,14rem)] leading-[.75]">
              HERE&apos;S TO<br />YOU BOTH.
            </h2>
            <p className="mx-auto mt-10 max-w-2xl text-xl font-bold md:text-2xl">
              May the next year be louder, brighter, kinder, funnier and even more unforgettable.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-12 rounded-full border-2 border-[var(--ink)] px-7 py-4 text-sm font-black uppercase tracking-[.2em] transition hover:-translate-y-1"
            >
              Back to top ↑
            </button>
          </div>
        </section>

        <ComingSoonLydia />

        <footer className="bg-[var(--ink)] px-5 py-8 text-center text-xs font-bold uppercase tracking-[.2em] text-white/50">
          Made with love for {site.people.juliet.fullName} &amp; {site.people.alex.fullName} · 2026
        </footer>
      </AnimatedBirthday>
    </main>
  );
}
