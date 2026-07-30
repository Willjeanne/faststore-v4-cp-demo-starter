# FastStore V4 CP Demo Starter

Reusable FastStore v4 starter for VTEX Content Platform demos.

The goal is to start a new demo quickly with:

- FastStore v4 and Node 24.
- VTEX Content Platform (`contentSource.type = "CP"`).
- A clean CMS section library ready for home, PLP, PDP, search, and landing pages.
- Localization enabled from day one.
- A repeatable design extraction workflow for turning reference-site screenshots into reusable FastStore tokens.

## Source Inspiration

This starter combines the useful parts of three existing demos without depending on them at runtime:

- `VTEX-US-SE/faststore-usb2c9`: technical FastStore v4 + Content Platform base.
- `Willjeanne/faststore-bayerndemo`: generic editorial and campaign CMS sections.
- `Willjeanne/faststore-franceretail`: design extraction workflow and token-first theming approach.

The Bayern advanced commerce flows are intentionally left for Phase 2:

- Jersey customizer.
- Stadium tour booking.
- Checkout attachments.
- Catalog and checkout rewrites.

## Quick Start

```bash
yarn install
yarn dev
```

Local storefront: `http://localhost:3000`

Production build:

```bash
yarn build
```

Generate the local Content Platform schema:

```bash
yarn generate-schema
```

Upload the schema only after confirming the target VTEX account, workspace, and project.

## Environment

Copy `vtex.env.example` to your local secret manager or shell environment. Do not commit real credentials.

Common variables:

- `NEXT_PUBLIC_STORE_ID`: VTEX account.
- `CONTENT_PROJECT`: Content Platform project id.
- `STORE_URL`: public storefront URL.
- `SECURE_SUBDOMAIN`: secure VTEX domain when needed.
- `CHECKOUT_URL`, `LOGIN_URL`, `ACCOUNT_URL`: optional overrides.
- `NEXT_PUBLIC_DEFAULT_LOCALE`, `NEXT_PUBLIC_DEFAULT_COUNTRY`, `NEXT_PUBLIC_DEFAULT_CURRENCY`, `NEXT_PUBLIC_DEFAULT_SALES_CHANNEL`.

## CMS Sections

Registered in `src/components/index.tsx`:

- `BannerCarousel`
- `MegaMenu`
- `InkAndTonerFinder`
- `ArticleChapo`
- `HeroBanner`
- `CategoryTiles`
- `CountdownBanner`
- `FullWidthShelf`
- `InstagramFeed`
- `LookbookGrid`
- `PullQuote`
- `RelatedArticles`
- `RichTextBlock`
- `SizeGuide`
- `Spacer`
- `StatsBlock`
- `VideoBlock`

Content schemas live in `cms/faststore/components/*.jsonc`. The generated schema lives in `cms/faststore/schema.json`.

## Design Extraction

Use `docs/design-extraction.md` when starting a new branded demo:

1. Capture screenshots for home, PLP, PDP, search, cart, and checkout where available.
2. Run Claude Design, Figma, or another visual extraction tool to identify color, typography, spacing, radius, button, and card patterns.
3. Translate findings into FastStore tokens in `src/themes/custom-theme.scss`.
4. Keep component-specific CSS thin and token-driven.

## Phase 2

Use `docs/phase-2-demo-flows.md` when the starter needs richer sport/club demo flows. These stay opt-in so the base remains fast to fork and safe to deploy.
