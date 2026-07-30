# Phase 2 Demo Flows

These flows are intentionally not part of the base starter. Add them only when a demo needs rich commerce storytelling.

## Jersey Customizer

Source inspiration: Bayern demo.

Recommended approach:

- Keep customization state isolated from generic PDP sections.
- Model name, number, badges, and patches as explicit fields.
- Validate lengths and allowed characters before add-to-cart.
- Use attachments only through the checkout/orderForm contract.
- Keep a no-customization path for ordinary SKU purchase.

## Stadium Tour Booking

Source inspiration: Bayern demo.

Recommended approach:

- Treat booking as a separate purchasable experience.
- Keep date/time selection accessible and mobile safe.
- Separate content-managed storytelling from inventory or schedule logic.
- Use native VTEX cart/orderForm where possible.

## Checkout Attachments

Source inspiration: Bayern demo.

Recommended approach:

- Document every attachment name and field contract.
- Keep checkout attachment writes idempotent.
- Avoid storing secrets or user-sensitive data in frontend state.
- Add regression tests for attachment persistence through cart updates.

## Catalog And Checkout Rewrites

Source inspiration: Bayern demo.

Recommended approach:

- Keep rewrites opt-in per demo account.
- Prefer FastStore native routing before adding custom rewrites.
- Document every rewrite with source path, target path, and business reason.
- Validate root-path behavior for multi-binding stores.

## Migration Into Starter

When one of these flows becomes reusable enough for the starter:

1. Add the flow behind a feature flag or route-level recipe.
2. Add a docs recipe before implementation.
3. Add focused tests for the high-risk path.
4. Keep default demos working without the flow enabled.
