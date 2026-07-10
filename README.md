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

## Project Structure

- `src/popup/` — Extension popup UI
- `src/components/` — React components (drop zone, settings, results)
- `src/shims/` — WordPress dependency shims for the shared Cimo converter
- `manifest.config.js` — Chrome extension manifest
- `public/` — Extension icons

## Shared converter

Image conversion uses the same `ImageConverter` class as the main [Cimo](https://github.com/gambitph/cimo) WordPress plugin, installed as a Git dependency:

```json
"cimo": "github:gambitph/cimo#develop"
```

The extension imports from `@cimo/shared/converters`, which resolves to `node_modules/cimo/src/shared/converters`. WordPress dependencies (`@wordpress/hooks`, `@wordpress/i18n`) are shimmed in `src/shims/` for the extension environment.

To update the converter to a newer Cimo commit:

```bash
npm update cimo
```

## Privacy

All image processing happens locally in the extension popup. No network requests are made and no files are sent to external servers.

## Documentation

- [CRXJS Vite Plugin](https://crxjs.dev/vite-plugin)
- [Radix UI Themes](https://www.radix-ui.com/themes)
