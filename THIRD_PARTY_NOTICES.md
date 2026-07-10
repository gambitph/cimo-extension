# Third-Party Notices

This extension bundles or depends on the following open-source components.

## Cimo image converter (GPL-2.0-or-later)

Image conversion logic is shared with the [Cimo WordPress plugin](https://github.com/gambitph/cimo).

- **License:** GNU General Public License v2.0 or later
- **Source:** https://github.com/gambitph/cimo
- **Pinned revision:** `30366954d6da1ccd0c2d7e2dd66eeb009050baa1`

The converter source used at build time is installed from that repository and bundled into the extension package. Corresponding source code is available at the URL above.

## Other dependencies

Runtime dependencies are listed in `package.json`. Their licenses are available in `node_modules/<package>/LICENSE` after running `npm install`.

Notable bundled libraries include:

| Package | License |
|---------|---------|
| React | MIT |
| Radix UI | MIT |
| Tailwind CSS | MIT |
| Lucide React | ISC |
| browser-image-compression | MIT |

For a full license report after install, run:

```bash
npx license-checker --production --summary
```
