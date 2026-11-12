# Juliet & Alex Birthday Experience

## Palette
- Juliet: Hot Coral `#ff4f68` + Magenta `#d81b86`
- Alex: Electric Blue `#2166ff` + Teal `#00c7b7`
- Together: Gold `#ffc857` + Sunset `#ff7a59` + Violet `#7b4dff`
- Ink: `#101018`
- Cream: `#fffaf5`

## Fonts
- Display: Bebas Neue
- Sans: Manrope

## Setup
```bash
npx create-next-app@latest birthday-site --typescript --tailwind --eslint --app --src-dir
cd birthday-site
npm install gsap @gsap/react lenis
npm run dev
```

Or, using this supplied project:
```bash
npm install
npm run dev
```

## Media
Replace the placeholder files in:
- `public/media/juliet/`
- `public/media/alex/`
- `public/media/together/`

Then edit `src/config/site.ts`. The manifest is the single source for names, dates, ages, copy, colors and media paths.

Videos are configured as muted, looping, playsInline, metadata preload, and play/pause through IntersectionObserver.

## Vercel
Push to GitHub, import the repo into Vercel, and deploy. No extra config is needed.

## Animation architecture
- GSAP + ScrollTrigger registered in a client-only module.
- `useGSAP` scopes and cleans animation.
- Lenis is driven from GSAP's ticker and calls `ScrollTrigger.update()` on scroll.
- Desktop gets scrubbed parallax, masks and pinned motion.
- Mobile gets lighter reveal motion.
- Reduced-motion users avoid scrub/parallax.
- Confetti is generated after mount to avoid hydration mismatch.

## Music
The site includes an original 24-second instrumental at `public/media/music/birthday-groove.wav`. The floating player is user-controlled because browsers generally block unrequested audio autoplay. Replace the WAV with your preferred audio file and change `site.music.path` in `src/config/site.ts`.
