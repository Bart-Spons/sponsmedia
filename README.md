# SponsMedia — Finished Themed Build (EN/NL + Blog + Projects)

## Quickstart
```bash
npm install
npm run dev
# http://localhost:3000 -> redirects to /en
```

## What’s included
- EN/NL locales with next-intl + middleware
- Montserrat font, radial gradient background, dotted overlay
- Gold CTAs, ghost buttons, input utility
- Blog index/post routes and Projects index/case routes
- Tailwind theme: colors in `tailwind.config.ts`, global styles in `app/globals.css`

## Customize
- Update copy in `messages/*.json` and page files
- Replace images in `public/placeholders/`

## Redesign (v2)
- Smooth scrolling met **Lenis** (`components/motion/SmoothScroll.tsx`), gekoppeld aan GSAP's ticker zodat ScrollTrigger synchroon loopt
- Animaties met **GSAP** + ScrollTrigger (`@gsap/react` → `useGSAP`)
- Componenten uit **React Bits** (TS + Tailwind) in `components/reactbits/`: BlurText, TrueFocus, ScrollReveal, Magnet
- Kleuren en lettertype: `app/globals.css` en `tailwind.config.ts` (night, deep, frost, haze, gold; Schibsted Grotesk)
- Alle animaties respecteren `prefers-reduced-motion`
