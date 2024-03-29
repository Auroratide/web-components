module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:svelte/recommended",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "mocha"],
	rules: {
		"indent": ["error", "tab", { "SwitchCase": 1 }],
		"quotes": ["error", "double"],
		"comma-dangle": ["error", "always-multiline"],
		"semi": ["error", "never"],
		"@typescript-eslint/no-non-null-assertion": "off",
		"svelte/no-at-html-tags": "off",
		"no-console": ["error"],
		"mocha/no-skipped-tests": "warn",
		"mocha/no-exclusive-tests": "error",
	},
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		extraFileExtensions: [".svelte"],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
		mocha: true,
	},
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
			},
		},
	],
}
