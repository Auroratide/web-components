import { changeEvent, commitEvent } from "./events.js"
import { ReorderHandleElement } from "./reorder-handle.js"
import { ReorderItemElement } from "./reorder-item.js"

export type Orientation = "vertical" | "horizontal"

declare global {
	interface Node {
		/** Not yet in lib.dom; an atomic move that preserves focus and state. */
		moveBefore?: (node: Node, before: Node | null) => void,
	}
}

const deepActiveElement = (): Element | null => {
	let el = document.activeElement
	while (el?.shadowRoot?.activeElement != null) {
		el = el.shadowRoot.activeElement
	}

	return el
}

export class ReorderListElement extends HTMLElement {
	static defaultElementName = "reorder-list"

	static COMMIT_DEBOUNCE_MS = 1000

	static html = `
		<slot></slot>
	`

	static css = `
		:host {
			display: block;
			list-style: disc;
			padding-left: 1em;
		}

		:host([orientation="horizontal"]) {
			display: flex;
			flex-direction: row;
			list-style-position: inside;
		}
	`

	constructor() {
		super()

		this.#createRoot()
	}

	get orientation(): Orientation { return this.getAttribute("orientation") as Orientation ?? "vertical" }
	set orientation(value: Orientation) { this.setAttribute("orientation", value) }

	items = (): ReorderItemElement[] =>
		Array.from(this.querySelectorAll(`:scope > ${ReorderItemElement.defaultElementName}`))

	/** The item currently containing focus, if any. */
	current = (): ReorderItemElement | null => {
		const item = deepActiveElement()?.closest(
			ReorderItemElement.defaultElementName,
		) as ReorderItemElement | null

		return item?.parentElement === this ? item : null
	}

	connectedCallback() {
		this.setAttribute("role", "list")

		this.addEventListener("keydown", this.#handleNav)
	}

	reorder = (curIndex: number, newIndex: number, list: ReorderItemElement[] = this.items()) => {
		const item = list[curIndex]
		const previouslyFocused = deepActiveElement()

		this.#move(item, curIndex < newIndex
			? list[newIndex].nextSibling
			: list[newIndex],
		)

		this.dispatchEvent(changeEvent(item, curIndex, newIndex))

		// Re-inserting a subtree drops focus, unless the move was atomic.
		if (previouslyFocused instanceof HTMLElement && deepActiveElement() !== previouslyFocused) {
			previouslyFocused.focus()
		}
	}

	/**
	 * moveBefore preserves focus and state; insertBefore is the fallback where it
	 * is unavailable, or where the node cannot be moved atomically.
	 */
	#move = (item: ReorderItemElement, before: Node | null) => {
		if (typeof this.moveBefore === "function") {
			try {
				this.moveBefore(item, before)
				return
			} catch {
				// fall through to a plain insertion
			}
		}

		this.insertBefore(item, before)
	}

	#debouncedCommit: number | undefined = undefined

	#handleNav = (e: KeyboardEvent) => {
		const keys = this.#keysForOrientation()
		if (!keys.includes(e.key)) {
			return
		}

		// Only a handle drives reordering, so interactive content within an item
		// keeps its own arrow key behaviour.
		const handle = e.composedPath().find((node) => node instanceof ReorderHandleElement)
		const item = handle?.item()
		if (item == null || item.list() !== this) {
			return
		}

		const items = this.items()
		const curIndex = items.indexOf(item)
		const newIndex = Math.max(0,
			Math.min(items.length - 1,
				curIndex + (e.key === keys[0] ? -1 : 1),
			),
		)

		if (curIndex < 0 || curIndex === newIndex) {
			return
		}

		e.preventDefault()
		e.stopPropagation()

		window.clearTimeout(this.#debouncedCommit ?? -1)
		this.#startCommitTracking(item)
		this.reorder(curIndex, newIndex, items)
		this.#debouncedCommit = window.setTimeout(this.#endCommitTracking, ReorderListElement.COMMIT_DEBOUNCE_MS)
	}

	#trackedItem: ReorderItemElement | undefined = undefined
	#originalPosition: number | undefined = undefined

	#startCommitTracking = (item: ReorderItemElement) => {
		if (this.#trackedItem != null && this.#trackedItem !== item) {
			this.#endCommitTracking()
		}

		if (this.#trackedItem == null) {
			this.#trackedItem = item
			this.#originalPosition = this.items().indexOf(item)
		}
	}

	#endCommitTracking = () => {
		const item = this.#trackedItem
		if (item == null) {
			return
		}

		const newPosition = this.items().indexOf(item)
		this.dispatchEvent(commitEvent(item, this.#originalPosition ?? -1, newPosition))

		this.#trackedItem = undefined
		this.#originalPosition = undefined
	}

	#keysForOrientation = () => {
		return this.orientation === "horizontal"
			? ["ArrowLeft", "ArrowRight"]
			: ["ArrowUp", "ArrowDown"]
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
