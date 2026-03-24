import { ReorderItemElement } from "./reorder-item.js"
import { ReorderListElement } from "./reorder-list.js"

export class ReorderHandleElement extends HTMLElement {
	static defaultElementName = "reorder-handle"

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

	list = (): ReorderListElement =>
		this.closest(ReorderListElement.defaultElementName)
	item = (): ReorderItemElement =>
		this.closest(ReorderItemElement.defaultElementName)

	connectedCallback() {
		this.addEventListener("pointerdown", this.#onTouchStart)
	}

	#onTouchStart = (e: PointerEvent) => {
		if (e.target instanceof HTMLElement && e.target.dataset.ignoreReorder != null) {
			return
		}

		e.preventDefault()
		e.stopPropagation()
		this.item().startDragging()
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
