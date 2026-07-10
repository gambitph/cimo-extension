import radixBreakpoints from '@radix-ui/themes/postcss-breakpoints.cjs'
import radixWhitespace from '@radix-ui/themes/postcss-whitespace.cjs'
import tailwindcss from '@tailwindcss/postcss'

export default {
	plugins: [
		radixBreakpoints(),
		radixWhitespace(),
		tailwindcss(),
	],
}
