import { ratio, site } from "../config/site";
import MediaFrame from "./MediaFrame";

const b = site.beatrice;

/** Kenyan flag stripe: black, red, green with white fimbriation. */
function FlagStripe() {
  return (
    <div aria-hidden="true" className="flex h-3 w-full flex-col">
      <span className="flex-[3] bg-black" />
      <span className="flex-1 bg-white" />
      <span className="flex-[3] bg-[#bb0000]" />
      <span className="flex-1 bg-white" />
      <span className="flex-[3] bg-[#006600]" />
    </div>
  );
}

function BoardingPass() {
  return (
    <div className="reveal relative overflow-hidden rounded-[1.75rem] bg-[#fffaf0] text-[var(--ink)] shadow-[0_30px_80px_-20px_rgba(0,0,0,.55)]">
      <div className="flex items-center justify-between bg-[var(--gold)] px-5 py-3 text-[10px] font-black uppercase tracking-[.25em] md:px-7 md:text-xs">
        <span>Boarding pass</span>
        <span>Family Airways</span>
      </div>

      <div className="px-5 pb-5 pt-6 md:px-7">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.25em] opacity-50">From</p>
            <p className="font-display text-6xl leading-none md:text-7xl">{b.from.code}</p>
            <p className="text-xs font-bold opacity-70">{b.from.city}</p>
          </div>

          <div data-plane-track className="relative mb-7 h-6 flex-1">
            <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-[var(--ink)]/30" />
            <span data-plane className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl leading-none text-[#006600]" aria-hidden="true">
              ✈
            </span>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-[.25em] opacity-50">To</p>
            <p className="font-display text-6xl leading-none text-[#bb0000] md:text-7xl">{b.to.code}</p>
            <p className="text-xs font-bold opacity-70">{b.to.city}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
          {b.pass.map((row) => (
            <div key={row.label}>
              <p className="text-[10px] font-black uppercase tracking-[.25em] opacity-50">{row.label}</p>
              <p className="text-base font-extrabold leading-tight md:text-lg">{row.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tear line with ticket notches */}
      <div className="relative">
        <div className="mx-5 border-t-2 border-dashed border-[var(--ink)]/20" />
        <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#0c3326]" />
        <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#0c3326]" />
      </div>

      <div className="flex items-center justify-between gap-4 px-5 py-5 md:px-7">
        <p className="font-display text-3xl leading-none text-[#006600]">KARIBU SANA</p>
        <div
          aria-hidden="true"
          className="h-10 w-28 opacity-80"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--ink) 0 2px, transparent 2px 4px, var(--ink) 4px 7px, transparent 7px 9px, var(--ink) 9px 10px, transparent 10px 13px)"
          }}
        />
      </div>
    </div>
  );
}

export default function WelcomeBeatrice() {
  return (
    <section id="beatrice" className="relative overflow-hidden bg-[#0c3326] text-white">
      <FlagStripe />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,200,87,.28),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(187,0,0,.25),transparent_40%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40">
        <span className="inline-flex rounded-full bg-[var(--gold)] px-4 py-2 text-xs font-extrabold uppercase tracking-[.2em] text-[var(--ink)]">
          {b.arrival}
        </span>

        <p className="reveal mt-8 text-2xl font-extrabold italic text-[var(--gold)] md:text-4xl">{b.greeting},</p>
        <h2 className="section-title reveal mt-2 font-display text-white">
          AUNT<br />BEATRICE
        </h2>

        <div className="mt-12 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <BoardingPass />

            <p className="reveal mt-10 text-lg font-semibold leading-8 md:text-xl md:leading-9">{b.note}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {b.chips.map((chip, i) => (
                <span
                  key={chip}
                  className={`reveal rounded-full px-4 py-2 text-sm font-extrabold ${
                    i % 2 ? "bg-white text-[#0c3326]" : "border-2 border-[var(--gold)] text-[var(--gold)]"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8">
              {b.media.map((item, i) => (
                <figure
                  key={item.path}
                  data-pop
                  className={`relative w-[86%] bg-white p-3 text-[var(--ink)] shadow-[0_25px_60px_-15px_rgba(0,0,0,.6)] md:w-auto md:p-4 ${
                    i === 0
                      ? "self-start -rotate-3"
                      : i === 1
                        ? "-mt-6 self-end rotate-3 md:mt-24"
                        : "-mt-6 self-start -rotate-2 md:col-span-2 md:mx-auto md:-mt-10 md:w-[50%]"
                  }`}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: ratio(item) }}>
                    <MediaFrame item={item} sizes="(max-width: 768px) 86vw, 30vw" />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>

        <p className="reveal mt-20 text-center font-display text-[clamp(3.5rem,14vw,9rem)] leading-[.85] text-[var(--gold)] md:mt-28">
          WELCOME HOME,<br />WE LOVE YOU!
        </p>
      </div>

      <FlagStripe />
    </section>
  );
}
