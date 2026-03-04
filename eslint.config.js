import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import globals from 'globals'

export default [
	{
		ignores: ['dist', 'node_modules'],
	},

	js.configs.recommended,

	{
		files: ['**/*.{js,jsx}'],

		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.node,
				chrome: 'readonly',
			},
		},

		plugins: {
			react,
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
		},

		settings: {
			react: { version: 'detect' },
		},

		rules: {
			"indent": ["warn", "tab"],
		    'space-in-parens': ['error', 'always'],
			'space-before-function-paren': ['error', 'always'],
			'react/jsx-uses-vars': 'error',

			// No semi-colons because they're a hassle.
			semi: [ 'error', 'never' ],

			// Only use parenthesis on arrow functions that need them since it's a hassle.
			'arrow-parens': [ 'error', 'as-needed' ],

			// Force destructuring assignments to be multiline if they have lots of variables.
			'object-curly-newline': [ 'error', {
				ObjectExpression: {
					multiline: true,
					minProperties: 3,
					consistent: true,
				},
				ObjectPattern: {
					multiline: true,
					minProperties: 3,
					consistent: true,
				},
				// Force strict formatting on import/export
				ImportDeclaration: {
					multiline: true,
					minProperties: 3,
					consistent: false,
				},
				ExportDeclaration: {
					multiline: true,
					minProperties: 3,
					consistent: false,
				},
			} ],

			// Allow assigning same named variables (mainly for function arguments) in inside code-blocks.
			'no-shadow': 'off',

			// For me it's easier to read nested ternary if you add some formatting.
			'no-nested-ternary': 'off',

			// Allow tabs and spaces mixed for aesthetics.
			'no-mixed-spaces-and-tabs': [ 'error', 'smart-tabs' ],

			// Sort to find stuff easier.
			'sort-vars': [ 'error', { ignoreCase: true } ],
			// 'sort-keys': ["error", "asc", {caseSensitive: false, natural: true}],

			// Allow arrays to be consistently vertical or horizontal.
			'array-element-newline': [ 'error', 'consistent' ],

			'jsdoc/no-undefined-types': 'off',

			'@wordpress/no-unguarded-get-range-at': 'off',

			// LF style line breaks.
			'linebreak-style': [ 'error', 'unix' ],

			// Turn this off since it's showing errors when optional chaining "?."
			'no-unused-expressions': 'off',

			// Fix some import errors.
			'import/no-extraneous-dependencies': 'off',
			'import/no-unresolved': 'off',

			// In array spread, ignore unused args if they start with _
			// e.g. const [ _unused, used ] = [ 'a', 'b', 'c' ]
			'no-unused-vars': [ 'error', { varsIgnorePattern: '^_' } ],

			// Require tabbed indentation in jsx.
			'react/jsx-indent': [ 2, 'tab', { indentLogicalExpressions: true } ],

			// Disallow unnecessary JSX expressions when literals alone are sufficient.
			'react/jsx-curly-brace-presence': [ 'error', { props: 'never', children: 'never' } ],
		},
	},
]