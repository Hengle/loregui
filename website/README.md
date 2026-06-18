# LoreGUI — Marketing Site

Landing site for **LoreGUI**, a community-built, cross-platform desktop GUI for
[Lore](https://github.com/EpicGames/lore) — Epic Games' next-generation version
control for source code and huge binary assets.

Primary domain: **loregui.com**

> LoreGUI is an independent community project. It is **not affiliated with,
> sponsored by, or endorsed by Epic Games, Inc.** "Lore" is a trademark of Epic
> Games, Inc. LoreGUI is released under the MIT License.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS 3
- No runtime data dependencies — fully static, single landing page

Built to match the design language and conventions of Biloxi Studios' other
sites (shared dark theme, `brand.*` color tokens, Space Grotesk / Inter
typography, and the same `Button` / `Card` / `Container` / `Badge` primitives).

## Local development

```bash
npm install
npm run dev
```

The dev server runs on **http://localhost:3300**.

## Production build

```bash
npm run build   # produces a standalone Next.js build (.next/)
npm run start   # serve the production build on port 3300
```

`next.config.ts` uses `output: "standalone"`, so the build can also be run
directly from `.next/standalone/` in a container.

## Deploy (Vercel-style)

This is a standard Next.js App Router project and deploys to Vercel with zero
extra configuration:

1. Import the repo into Vercel (framework auto-detects as **Next.js**).
2. Build command `next build`, output handled automatically.
3. Add the `loregui.com` domain in **Project → Settings → Domains**.

`vercel.json` ships sensible security headers (HSTS, `X-Frame-Options`,
`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`). The same
headers are mirrored in `next.config.ts` for non-Vercel hosting.

## Project structure

```
loregui-web/
├── next.config.ts          # standalone output + security headers
├── tailwind.config.ts      # LoreGUI brand tokens (shared studio DNA)
├── postcss.config.mjs
├── tsconfig.json
├── vercel.json             # deploy security headers
├── public/
│   └── og-image.svg        # social share card
└── src/
    ├── app/
    │   ├── layout.tsx       # metadata, fonts, <html> shell
    │   ├── page.tsx         # composes the landing sections
    │   ├── globals.css
    │   ├── icon.svg         # favicon (App Router)
    │   ├── robots.ts
    │   └── sitemap.ts
    └── components/
        ├── Header.tsx
        ├── Hero.tsx
        ├── Features.tsx        # 6-card feature grid
        ├── BuiltOnApi.tsx      # "full native API (124 ops)" section
        ├── Screenshots.tsx     # CSS GUI mockups (status / history / branches)
        ├── Install.tsx         # winget / scoop / brew / direct download
        ├── Footer.tsx          # disclaimer + links
        ├── CodeBlock.tsx       # copy-to-clipboard command block
        ├── mockups/            # AppWindow chrome + the three GUI mockups
        ├── icons/              # inline SVG icon set
        └── ui/                 # Button, Card, Container, Badge, GradientText
```

## Placeholders to replace before launch

- **Download / package links** currently point at the Lore GitHub Releases
  page. Repoint them at the real LoreGUI release artifacts when published.
- **Package manager commands** (`winget`, `scoop`, `brew`) use placeholder
  identifiers — update once packages are published.
- **Screenshots** are intentional CSS mockups; swap in real product captures
  when available.
- **og-image / favicon** are simple SVGs — replace with final brand artwork.
```
