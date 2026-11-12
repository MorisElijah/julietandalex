import { ratio, site } from "../config/site";
import MediaFrame from "./MediaFrame";

const l = site.lydia;
const [hero, wide, side] = [l.media[0], l.media[1], l.media[2]];

function Photo({ item, className = "" }: { item: (typeof l.media)[number]; className?: string }) {
  return (
    <div
      data-pop
      style={{ aspectRatio: ratio(item) }}
      className={`relative overflow-hidden rounded-[1.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,.6)] ring-4 ring-white/80 md:rounded-[2rem] ${className}`}
    >
      <MediaFrame item={item} sizes="(max-width: 768px) 50vw, 30vw" />
    </div>
  );
}

export default function ComingSoonLydia() {
  return (
    <section id="lydia" className="relative overflow-hidden bg-[#1532b8] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(255,79,163,.45),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(123,77,255,.5),transparent_45%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#ff4fa3] px-4 py-2 text-xs font-extrabold uppercase tracking-[.2em]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          {l.badge}
        </span>

        <p className="reveal mt-8 text-xl font-extrabold italic text-[#ffb3d6] md:text-3xl">{l.kicker}…</p>
        <h2 className="section-title reveal mt-2 font-display">
          AUNT<br />LYDIA
        </h2>

        <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            {/* Patient-chart / prescription card — a nod to Aunt Lydia being a nurse. */}
            <div className="reveal relative overflow-hidden rounded-[1.75rem] bg-white text-[var(--ink)] shadow-[0_30px_80px_-20px_rgba(0,0,0,.55)]">
              <div className="flex items-center justify-between gap-3 bg-[#0e9f8e] px-5 py-3 text-white md:px-7">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="relative h-7 w-7 rounded-md bg-white">
                    <span className="absolute left-1/2 top-1/2 h-4 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-[#e11d48]" />
                    <span className="absolute left-1/2 top-1/2 h-1.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-[#e11d48]" />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[.25em] md:text-xs">Birthday Clinic · Patient chart</span>
                </div>
                <span className="font-display text-3xl leading-none">Rx</span>
              </div>

              <div className="px-5 pb-6 pt-5 md:px-7">
                {/* Heartbeat line */}
                <svg viewBox="0 0 300 48" className="h-10 w-full" aria-hidden="true">
                  <path
                    className="ecg-line"
                    d="M0 24 H70 L82 24 L90 8 L100 40 L110 2 L120 44 L128 24 H170 L178 18 L186 30 L194 24 H300"
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="mt-3 text-[10px] font-black uppercase tracking-[.3em] opacity-50">Status</p>
                <p className="mt-1 font-display text-5xl leading-none text-[#0e9f8e] sm:text-6xl md:text-7xl">COMING SOON</p>

                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t-2 border-dashed border-[var(--ink)]/15 pt-5">
                  {[
                    ["Patient", "Nurse Lydia"],
                    ["Condition", "Birthday approaching"],
                    ["Prescription", "Cake, rest & lots of love"],
                    ["Dosage", "As often as needed"]
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-[10px] font-black uppercase tracking-[.25em] opacity-50">{label}</p>
                      <p className="text-base font-extrabold leading-tight md:text-lg">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-[#e11d48]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[.1em] text-[#e11d48]">
                    Refills: unlimited
                  </span>
                  <span className="border-t-2 border-[var(--ink)]/30 pt-1 text-right text-sm font-semibold italic opacity-70">
                    Signed, the whole family
                  </span>
                </div>
              </div>
            </div>

            <p className="reveal mt-10 text-lg font-semibold leading-8 md:text-xl md:leading-9">{l.note}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {l.chips.map((chip, i) => (
                <span
                  key={chip}
                  className={`reveal rounded-full px-4 py-2 text-sm font-extrabold ${
                    i % 2 ? "bg-white text-[#1532b8]" : "border-2 border-[#ffb3d6] text-[#ffb3d6]"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-2 items-start gap-4 md:gap-6">
              <Photo item={hero} className="-rotate-2" />
              <Photo item={side} className="mt-10 rotate-2 md:mt-20" />
              <Photo item={wide} className="col-span-2 -mt-2 md:mx-auto md:w-[85%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
