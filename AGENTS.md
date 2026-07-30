# AGENTS.md

This repository is a reusable FastStore v4 + VTEX Content Platform demo starter.

## Core Rules

- Use Node 24.
- Use Yarn.
- Keep `discovery.config.js` on `contentSource.type = "CP"`.
- Do not add `cms-sync`; use `yarn generate-schema` for local schema generation.
- Do not read, edit, or commit `.faststore/`.
- Do not commit secrets, `vtex.env`, `.env`, tokens, app keys, or account-specific credentials.
- Do not add custom Next.js routes or middleware unless a FastStore-specific extension point requires it.
- Register all custom CMS sections in `src/components/index.tsx` with a default export object only.
- Keep `$componentKey` aligned between `src/components/index.tsx` and `cms/faststore/components/*.jsonc`.
- Do not hand-edit `cms/faststore/schema.json`; regenerate it.

## Intended Starter Scope

Keep the base starter generic and fast to fork:

- Content Platform section schemas.
- FastStore section overrides and generic demo components.
- Token-first theme customization.
- Localization readiness.
- Safe docs and recipes for future demos.

## Phase 2 Scope

These richer flows are intentionally opt-in and should not be wired into the base without an explicit request:

- Jersey customizer.
- Stadium tour booking.
- Checkout attachments.
- Catalog rewrites.
- Checkout rewrites.

Document new Phase 2 work under `docs/phase-2-demo-flows.md` before implementing it.

## Design Extraction

For branded demos, start from screenshots and convert visual findings into tokens:

- Colors.
- Typography.
- Spacing.
- Border radius.
- Buttons.
- Product cards.
- PLP/PDP layout density.

Apply those findings primarily in `src/themes/custom-theme.scss`. Keep component CSS generic unless the component itself owns a reusable pattern.

## Content Platform Workflow

1. Edit a section in `src/components/sections/*`.
2. Edit the matching schema in `cms/faststore/components/*.jsonc`.
3. Register the section in `src/components/index.tsx`.
4. Run `yarn generate-schema`.
5. Verify schema keys.
6. Upload to Content Platform only after the target account, workspace, and project are confirmed.

## Validation

Before pushing meaningful changes:

```bash
yarn generate-schema
yarn build
```

If build cannot run because credentials or a VTEX account are missing, report that clearly.
