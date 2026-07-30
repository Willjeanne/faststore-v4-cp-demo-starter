# Content Platform And Localization

This starter uses VTEX Content Platform, not legacy CMS sync.

## Configuration

`discovery.config.js`:

```js
contentSource: {
  type: 'CP',
  project:
    process.env.CONTENT_PROJECT ||
    process.env.NEXT_PUBLIC_STORE_ID ||
    'starter',
},

localization: {
  enabled: true,
},
```

Use environment variables per demo account instead of committing account-specific values.

## Section Registration

For every CMS section:

1. Add the React component under `src/components/sections/{SectionName}`.
2. Export it through `src/components/index.tsx`.
3. Add or update `cms/faststore/components/cms_component__{sectionname}.jsonc`.
4. Keep `$componentKey` identical in code and schema.
5. Run `yarn generate-schema`.

## Rich Text

Use the native Content Platform rich text widget:

```json
"widget": {
  "ui:widget": "draftjs-rich-text"
}
```

Render rich text through the FastStore RichText component. Avoid ad hoc HTML sanitizers and `dangerouslySetInnerHTML` in CMS sections.

## Upload Checklist

Before uploading a generated schema:

- Confirm the target VTEX account.
- Confirm workspace.
- Confirm `CONTENT_PROJECT`.
- Confirm the user wants to upload.
- Verify that no schema includes credentials or private URLs.

Do not upload from this starter by default.

## Localization Checklist

When preparing a multilingual demo:

- Keep labels in CMS fields when merchants need to edit them.
- Keep component defaults short and neutral.
- Avoid text embedded in images unless the image is intentionally localized.
- Validate long labels in buttons, cards, and navigation.
- Use locale and country defaults from environment variables.
