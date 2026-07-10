# Cimo - Media Optimizer

A Chrome extension that optimizes images to WebP format locally in your browser. No uploads, no servers — your files never leave your device.

## Features

- Convert PNG, JPG, GIF, and WEBP images to WebP
- Adjustable WebP quality slider
- Optional max dimension to resize large images
- Automatic download after optimization
- One image at a time

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open Chrome and go to `chrome://extensions/`, enable **Developer mode**, and load the unpacked extension from the `dist` directory.

4. Build for production:

```bash
npm run build
```

The uploadable ZIP for the Chrome Web Store is written to `release/`.

## Project Structure

- `src/popup/` — Extension popup UI
- `src/components/` — React components (drop zone, settings, results)
- `src/shims/` — WordPress dependency shims for the shared Cimo converter
- `manifest.config.js` — Chrome extension manifest
- `public/` — Extension icons
- `docs/` — Privacy policy and Chrome Web Store listing guide

## Shared converter

Image conversion uses the same `ImageConverter` class as the main [Cimo](https://github.com/gambitph/cimo) WordPress plugin, installed as a pinned Git dependency:

```json
"cimo": "github:gambitph/cimo#develop"
```

The extension imports from `@cimo/shared/converters`, which resolves to `node_modules/cimo/src/shared/converters`. WordPress dependencies (`@wordpress/hooks`, `@wordpress/i18n`) are shimmed in `src/shims/` for the extension environment.

To update the converter to a newer Cimo commit, change the hash in `package.json`, run `npm install`, test, and update `THIRD_PARTY_NOTICES.md`.

## Chrome Web Store

See [docs/CHROME_WEB_STORE.md](docs/CHROME_WEB_STORE.md) for:

- Store listing copy (short and detailed descriptions)
- Data safety form answers
- Privacy policy URL
- Submission checklist

**Privacy policy:** [docs/PRIVACY.md](docs/PRIVACY.md)

## Privacy

All image processing happens locally in the extension popup. No network requests are made and no files are sent to external servers. See [docs/PRIVACY.md](docs/PRIVACY.md) for the full privacy policy.

## License

GPL-2.0-or-later. See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Documentation

- [CRXJS Vite Plugin](https://crxjs.dev/vite-plugin)
- [Radix UI Themes](https://www.radix-ui.com/themes)
