import adapter from "@sveltejs/adapter-static"

const dev = process.env.NODE_ENV === "development"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: dev ? "" : "/web-components",
		},
	},
}

export default config
