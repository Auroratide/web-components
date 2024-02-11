import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import { plugin as mdPlugin, Mode } from "vite-plugin-markdown"
import MarkdownIt from "markdown-it"
import hljs from "highlight.js"

const unleashTheDemos = (str: string) => str
	.replaceAll("<!--DEMO", "")
	.replaceAll("/DEMO-->", "")


const kebabify = (text: string) => text
	.toLocaleLowerCase()
	.replaceAll(/[^a-z0-9]+/g, "-")
	.replaceAll(/--/g, "-")
	.replaceAll(/^-|-$/g, "")

const idHeaders = (html: string) => html
	.replaceAll(/<h(\d)>(.*?)<\/h\d>/g, (_, level, text) =>
		`<h${level} id="${kebabify(text)}">${text}</h${level}>`
	)

const parseMarkdown = new MarkdownIt({
	html: true,
	highlight: (str, lang) => {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(str, { language: lang }).value
			} catch (_) {
				// ignore
			}
		}

		return ""
	},
})

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [ mdPlugin({
		mode: [Mode.HTML],
		markdown: (str) => idHeaders(parseMarkdown.render(unleashTheDemos(str))),
	}), sveltekit() ],
})
