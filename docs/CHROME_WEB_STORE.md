# Chrome Web Store Listing

Use this document when submitting **Cimo - Media Optimizer** to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).

## Privacy policy URL

Host this file publicly and paste the URL into the store listing:

```
https://github.com/gambitph/cimo-extension/blob/main/docs/PRIVACY.md
```

If you enable GitHub Pages on this repo, you can instead use a cleaner URL such as:

```
https://gambitph.github.io/cimo-extension/PRIVACY
```

## Support URL

```
https://github.com/gambitph/cimo-extension/issues
```

## Category

**Productivity**

## Single purpose

This extension has a single purpose: **optimize images to WebP format locally in the browser**.

## Short description (max 132 characters)

```
Optimize images to WebP locally in your browser. No uploads, no servers — your files never leave your device.
```

(Character count: 99)

## Detailed description

```
Cimo - Media Optimizer converts PNG, JPG, GIF, and WEBP images to WebP format — entirely on your device.

FEATURES
• Convert images to WebP with one click or drag-and-drop
• Adjustable WebP quality slider
• Optional max dimension to resize large images before conversion
• Automatic download after optimization
• See file size reduction instantly

PRIVACY FIRST
All image processing happens locally in the extension popup. No uploads. No servers. No tracking. Your files never leave your device.

FREE VERSION
• Images only
• One file at a time

Built by the team behind Cimo, the WordPress media optimizer plugin.
```

## Data safety / privacy practices (Chrome Web Store form)

Answer the dashboard questionnaire as follows:

| Question | Answer |
|----------|--------|
| Does your extension collect user data? | **No** |
| Is data sold to third parties? | **No** |
| Is data used for purposes unrelated to the extension's single purpose? | **No** |
| Is data transferred off the user's device? | **No** |
| Is data encrypted in transit? | **N/A** (no data transferred) |
| Can users request data deletion? | **N/A** (no data collected) |

**Certification:** The developer certifies that the extension's data use complies with the Chrome Web Store Developer Program Policies.

## Permissions justification

This extension requests **no permissions**. No justification is required.

## Screenshots (you must create these)

Chrome Web Store requires at least **one screenshot**. Capture these from the extension popup:

1. **Empty state** — drop zone with "Upload a file" and Select Image button
2. **Settings open** — quality slider and max dimension field visible
3. **Result state** — completed optimization with size reduction stats

Recommended size: **1280×800** or **640×400** PNG.

Save screenshots to `docs/store-assets/` before submitting (not generated automatically).

## Build and upload

```bash
npm install
npm run build
```

Upload the ZIP from `release/`:

```
release/crx-cimo-chrome-extension-<version>.zip
```

Before each release:

1. Bump `version` in `package.json` (Chrome uses this as the extension version)
2. Run `npm run build`
3. Test the unpacked `dist/` folder in `chrome://extensions`
4. Upload the new ZIP to the Developer Dashboard

## Pre-submission checklist

- [ ] Chrome Web Store developer account registered ($5 one-time)
- [ ] `npm run build` succeeds
- [ ] Extension tested on a clean Chrome profile
- [ ] Screenshots captured and ready to upload
- [ ] Privacy policy URL added to listing
- [ ] Support URL added to listing
- [ ] Data safety form completed (no data collected)
- [ ] Version bumped in `package.json` if re-submitting an update

## Updating the shared Cimo converter

The converter is pinned to a specific commit in `package.json`. To update:

```bash
# Change the commit hash in package.json, then:
npm install
npm run build
# Test thoroughly before publishing
```

Record the new commit hash in `THIRD_PARTY_NOTICES.md`.
