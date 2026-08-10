import { ReorderItemElement } from "./reorder-item.js"
import { ReorderListElement } from "./reorder-list.js"

const nameableText = (node: Node): string => {
	if (node instanceof HTMLElement && (
		node.localName === ReorderHandleElement.defaultElementName ||
		node.localName === ReorderListElement.defaultElementName
	)) {
		return ""
	}

	return node.nodeType === Node.TEXT_NODE
		? node.textContent ?? ""
		: Array.from(node.childNodes).map(nameableText).join(" ")
}

export class ReorderHandleElement extends HTMLElement {
	static defaultElementName = "reorder-handle"

	static labelFor = (itemText: string) => `Reorder ${itemText}`

	static html = `
		<slot></slot>
	`

	static css = `
		:host {
			display: inline-block;
			touch-action: none;
			cursor: grab;
		}

		:host([data-dragging]) {
			cursor: grabbing;
		}
	`

	constructor() {
		super()

		this.#createRoot()
	}

	list = (): ReorderListElement | null =>
		this.closest(ReorderListElement.defaultElementName)
	item = (): ReorderItemElement | null =>
		this.closest(ReorderItemElement.defaultElementName)

	#authorNamed: boolean | undefined = undefined

	connectedCallback() {
		this.#authorNamed ??= this.hasAttribute("aria-label") || this.hasAttribute("aria-labelledby")

		if (!this.hasAttribute("role")) {
			this.setAttribute("role", "button")
		}

		if (!this.hasAttribute("tabindex")) {
			this.setAttribute("tabindex", "0")
		}

		this.refreshLabel()

		this.addEventListener("pointerdown", this.#onTouchStart)
		this.addEventListener("keydown", this.#onKeyDown)
	}

	/**
	 * Called by the item whenever its content changes, since a handle may connect
	 * before the text it is named after has been parsed.
	 */
	refreshLabel = () => {
		if (this.#authorNamed) {
			return
		}

		const text = nameableText(this.item() ?? this).replace(/\s+/g, " ").trim()
		if (text.length > 0) {
			this.setAttribute("aria-label", ReorderHandleElement.labelFor(text))
		}
	}

	#onTouchStart = (e: PointerEvent) => {
		if (e.target instanceof HTMLElement && e.target.dataset.ignoreReorder != null) {
			return
		}

		e.preventDefault()
		e.stopPropagation()
		this.item()?.startDragging(this)
	}

	#onKeyDown = (e: KeyboardEvent) => {
		// Reordering is driven by the arrow keys, so there is no activation
		// behaviour; Space is swallowed only so a focused handle doesn't scroll.
		if (e.key === " ") {
			e.preventDefault()
		}
	}

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = ReorderHandleElement.css

		const template = document.createElement("template")
		template.innerHTML = ReorderHandleElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
