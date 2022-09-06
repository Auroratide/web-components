import { sveltekit } from '@sveltejs/kit/vite';
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown'
import hljs from 'highlight.js'

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		port: 3000,
	},
	plugins: [ mdPlugin({
		mode: Mode.HTML,
		markdownIt: {
			html: true,
			highlight: (str, lang) => {
				if (lang && hljs.getLanguage(lang)) {
					try {
						return hljs.highlight(str, { language: lang }).value
					} catch (_) { }
				}

				return ''
			}
		},
	}), sveltekit() ]
};

export default config;
