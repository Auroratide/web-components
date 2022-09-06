import { sveltekit } from '@sveltejs/kit/vite';
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const unleashTheDemos = (str) => str
	.replaceAll('<!--DEMO', '')
	.replaceAll('/DEMO-->', '')

const parseMarkdown = new MarkdownIt({
	html: true,
	highlight: (str, lang) => {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(str, { language: lang }).value
			} catch (_) { }
		}

		return ''
	},
})

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		port: 3000,
	},
	plugins: [ mdPlugin({
		mode: Mode.HTML,
		markdown: (str) => parseMarkdown.render(unleashTheDemos(str)),
	}), sveltekit() ]
};

export default config;
