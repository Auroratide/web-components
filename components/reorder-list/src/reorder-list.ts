import { changeEvent } from "./events.js"
import { ReorderItemElement } from "./reorder-item.js"

export class ReorderListElement extends HTMLElement {
	static defaultElementName = "reorder-list"

	static html = `
        <slot></slot>
    `

	static css = `
        :host {
            display: block;
            list-style: disc;
            padding-left: 1em;
        }
    `

	constructor() {
		super()

		this.#createRoot()
	}

	items = (): ReorderItemElement[] =>
		Array.from(this.querySelectorAll(ReorderItemElement.defaultElementName))

	current = (): ReorderItemElement =>
		this.querySelector(`${ReorderItemElement.defaultElementName}[tabindex="0"]`)

	connectedCallback() {
		this.setAttribute("role", "listbox")

		this.addEventListener("keydown", this.#handleNav)
	}

	reorder = (curIndex: number, newIndex: number, list: ReorderItemElement[] = this.items()) => {
		const item = list[curIndex]
		if (curIndex < newIndex) {
			list[newIndex].after(item)
		} else {
			this.insertBefore(item, list[newIndex])
		}

		this.dispatchEvent(changeEvent(item, curIndex, newIndex))

		list[curIndex].focus()
	}

	changeFocus = (newItem: ReorderItemElement, list: ReorderItemElement[] = this.items()) => {
		list.forEach((item) => {
			item.setAttribute("aria-selected", "false")
		})

		newItem.setAttribute("aria-selected", "true")
		newItem.focus()
	}

	#handleNav = (e: KeyboardEvent) => {
		const keys = this.#keysForOrientation()
		if (keys.includes(e.key)) {
			const items = this.items()
			items.indexOf(this.current())
			let currentFocusable = items.indexOf(this.current())
			if (currentFocusable < 0) {
				currentFocusable = 0
			}

			const nextFocusable = Math.max(0,
				Math.min(items.length - 1,
					currentFocusable + (e.key === keys[0] ? -1 : 1),
				),
			)

			if (e.altKey && currentFocusable !== nextFocusable) {
				e.preventDefault()

				this.reorder(currentFocusable, nextFocusable, items)
			} else if (currentFocusable !== nextFocusable) {
				e.preventDefault()

				this.changeFocus(items[nextFocusable], items)
			}
		}
	}

	#keysForOrientation = () => {
		return ["ArrowUp", "ArrowDown"]
	}

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = ReorderListElement.css

		const template = document.createElement("template")
		template.innerHTML = ReorderListElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
