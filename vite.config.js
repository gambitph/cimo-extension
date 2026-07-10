import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import zip from 'vite-plugin-zip-pack'
import manifest from './manifest.config.js'
import { name, version } from './package.json'

const __dirname = path.dirname( fileURLToPath( import.meta.url ) )
const cimoSharedConverters = path.resolve( __dirname, 'node_modules/cimo/src/shared/converters' )

export default defineConfig( {
	resolve: {
		alias: {
			'@': `${path.resolve( __dirname, 'src' )}`,
			'@cimo/shared/converters': cimoSharedConverters,
			'@wordpress/hooks': path.resolve( __dirname, 'src/shims/wordpress-hooks.js' ),
			'@wordpress/i18n': path.resolve( __dirname, 'src/shims/wordpress-i18n.js' ),
		},
	},
	plugins: [
		react(),
		crx( { manifest } ),
		zip( { outDir: 'release', outFileName: `crx-${name}-${version}.zip` } ),
	],
	server: {
		cors: {
			origin: [
				/chrome-extension:\/\//,
			],
		},
	},
} )
