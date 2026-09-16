# Vision

Pixel-faithful recreation of the [Grillchi](https://grillchi.ir/fa/menu) QR table-menu, rebranded as **Vision** / **ویژن**.

## Name replacements

| Original | New |
|---|---|
| گریل چی / گریلچی / Grillchi / GRILLCHI / Grill Chi | **ویژن** |
| Instagram handle (if present) | **vision.tehran** |

All other copy, prices, dish photos, layout, colors, and motion match the source site. Product names that contained the old brand (e.g. «سالاد گریل چی», «Grillchi Zinger») were updated the same way.

The header wordmark is **ویژن** in the same display type as the original, next to the sage flame mark. Drop a real logo file in `public/` if you later want to replace it.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The default locale is Persian (`/fa`). English: `/en`. Arabic: `/ar`.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new) — Next.js defaults are enough. No `vercel.json` overrides are required.
3. Optional: set `NEXT_PUBLIC_SITE_URL` to your production URL (used for Open Graph / sitemap). See `.env.example`.

Or from the CLI:

```bash
npm i -g vercel
vercel
```

## Stack

- Next.js 15 App Router + TypeScript
- Tailwind CSS (utilities) + the original design tokens in `app/globals.css`
- Framer Motion is available; page enter / float / reveal use the same CSS keyframes as the source
- Zustand for cart, branch, and toast state
- `next/image` for dish photos
- `next/font` — Bodoni Moda, Plus Jakarta Sans, Vazirmatn — plus the original Doran webfont for Persian display type

## Notes

- The source site is a mobile-first QR menu. This clone is constrained to a 480px shell so desktop matches that layout.
- The original `/fa/specials` route 404s; **پیشنهادها** is implemented here as `/specials` using the same promo cards shown on the homepage.
- **اطلاعات تماس** is the branches page (`/branches`). Each branch has Directions, Call, and an Instagram pill styled like the sage contact buttons, pointing at `instagram.com/vision.tehran`.
- Orders are accepted by `POST /api/order` (no kitchen backend). Adding a dish shows the same toast as the original.
- Proprietary Doran font is loaded from `/fonts/Doran.woff2` (copied from the source). If that file is missing, Vazirmatn is the fallback.
