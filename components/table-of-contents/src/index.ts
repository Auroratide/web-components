export class TableOfContentsElement extends HTMLElement {
	static defaultElementName = "table-of-contents"

	static html = `
		<div id="root"></div>
	`

	static css = `
		:host { display: block; }

		ol {
			list-style: none;
			padding: 0;
			margin: 0;
		} ol ol {
			padding-inline-start: 0.75em;
		} li {
			line-height: 1.15em;
			margin: 0;
		} a {
			display: block;
			margin-block-end: 0.5em;
		}
	`

	static get observedAttributes() {
		return ["for"]
	}

	constructor() {
		super()

		this.#createRoot()
	}

	get for(): string | undefined {
		return this.getAttribute("for")
	} set for(value: string) {
		this.setAttribute("for", value)
	}

	build = () => {
		if (!this.for) return

		const headings = document.querySelectorAll<HTMLHeadingElement>(`#${this.for} :is(h1, h2, h3, h4, h5, h6)`)
		const list = buildAbstractList(headings)
		const tree = buildAbstractTree(list)
		const ol = renderTocTree(tree)

		this.#root()?.replaceChildren(ol)
	}

	connectedCallback() {
		this.#setNavRole()
	}

	attributeChangedCallback(attribute: string, oldValue: string, newValue: string) {
		this.#attributeCallbacks[attribute]?.(newValue, oldValue)
	}

	#attributeCallbacks: Record<string, (newValue: string | undefined | null, oldValue: string | undefined | null) => void> = {
		"for": () => {
			this.build()
		},
	}

	#root = () => this.shadowRoot?.querySelector("#root")

	#setNavRole = () => {
		if (!this.hasAttribute("role")) {
			this.setAttribute("role", "navigation")
		}
	}

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = TableOfContentsElement.css

		const template = document.createElement("template")
		template.innerHTML = TableOfContentsElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}

type TocList = {
	level: number,
	id: string,
	content: string,
}[]

function getLevel(el: HTMLHeadingElement): number {
	return parseInt(el.nodeName[1])
}

function buildAbstractList(headings: NodeListOf<HTMLHeadingElement>): TocList {
	return Array.from(headings).map((el) => ({
		id: el.id,
		level: getLevel(el),
		content: el.textContent,
	}))
}

type TocTree = {
	level: number,
	id: string,
	content: string,
	children?: TocTree
}[]

function buildAbstractTree(list: TocList): TocTree {
	if (list.length === 0) return []

	const lowest = list[0].level
	const tree: TocTree = []

	for (const item of list) {
		[...Array(item.level - lowest).keys()]
			.reduce((cur) => children(last(cur)), tree)
			.push({ ...item })
	}

	return tree
}

const last = <T>(l: T[]): T => l[l.length - 1]
const children = (t: TocTree[number]) => {
	if (t.children == null) t.children = []
	return t.children
}

function renderTocTree(tree: TocTree): HTMLOListElement {
	const ol = document.createElement("ol")
	tree.forEach((it) => {
		const li = document.createElement("li")
		li.dataset.level = it.level.toString()
		const a = document.createElement("a")
		a.href = `#${it.id}`
		a.textContent = it.content
		a.setAttribute("part", "anchor")

		li.appendChild(a)

		if (it.children != null) {
			li.appendChild(renderTocTree(it.children))
		}

		ol.appendChild(li)
	})

	return ol
}