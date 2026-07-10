import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest( {
	manifest_version: 3,
	name: 'Cimo - Media Optimizer',
	short_name: 'Cimo',
	description: 'Optimize images to WebP locally in your browser. No uploads, no servers.',
	version: pkg.version,
	author: {
		name: 'Cimo',
	},
	icons: {
		16: 'public/icon-16.png',
		48: 'public/icon-48.png',
		128: 'public/icon-128.png',
	},
	action: {
		default_icon: {
			16: 'public/icon-16.png',
			48: 'public/icon-48.png',
			128: 'public/icon-128.png',
		},
		default_popup: 'src/popup/index.html',
	},
} )
