# Design Extraction Workflow

Use this workflow when a demo must inherit the look and feel of an existing site.

## Inputs

Capture screenshots for the target brand:

- Home page desktop and mobile.
- PLP desktop and mobile.
- PDP desktop and mobile.
- Search results if different from PLP.
- Cart and checkout where available.
- Header, footer, promotional bars, and product cards.

Store raw screenshots in `_design/screenshots/`.

## Extraction

Use Claude Design, Figma, browser DevTools, or an equivalent visual analysis tool to extract:

- Primary, secondary, accent, neutral, success, warning, and danger colors.
- Body and display font families.
- Font sizes, weights, line heights, and text casing.
- Grid max width and page gutters.
- Button height, radius, border, hover, and active states.
- Product card density, image ratio, price hierarchy, and badges.
- Header height, nav density, search treatment, and footer structure.

Save exports, prompts, notes, or HTML previews in `_design/claude-design-export/`.

## Token Mapping

Translate findings into `src/themes/custom-theme.scss`.

Map brand decisions to FastStore tokens first:

- `--fs-color-main-*`
- `--fs-color-accent-*`
- `--fs-color-neutral-*`
- `--fs-text-face-body`
- `--fs-text-weight-*`
- `--fs-grid-max-width`
- `--fs-grid-padding`
- `--fs-border-radius`
- Component token groups such as button, navbar, product card, alert, and footer tokens.

Use `_design/tokens/example-brand.scss` as a copyable starting point.

## Quality Bar

Before considering the theme ready:

- Home, PLP, PDP, search, and cart should feel like the same brand.
- The palette should not rely on a single hue only.
- Product cards should be readable at mobile and desktop widths.
- Text should not overlap cards, hero media, or buttons.
- Buttons and form fields should keep stable dimensions across languages.
- Token changes should avoid store-specific hardcoding in generic components.
