import { commitEvent } from "./events.js"
import { ReorderHandleElement, nameOf } from "./reorder-handle.js"
import { ReorderListElement } from "./reorder-list.js"

export class ReorderItemElement extends HTMLElement {
	static defaultElementName = "reorder-item"

	static html = `
		<slot></slot>
	`

	static css = `
		:host {
			display: list-item;
			touch-action: none;
			cursor: grab;
		}

		:host(:not([data-has-handle])) {
			position: relative;
		}

		:host([data-has-handle]) {
			cursor: auto;
			touch-action: auto;
		}

		:host([data-dragging]) {
			opacity: 0.5;
			cursor: grabbing;
		}

		/*
		 * The default handle is a keyboard affordance only: the whole item is
		 * already draggable by pointer, and an overlay that caught clicks would
		 * block any link or button inside the item. It stays invisible so that
		 * existing layouts are undisturbed, appearing only once focused.
		 */
		button[part~="handle"] {
			position: absolute;
			inset: 0;
			margin: 0;
			padding: 0;
			border: none;
			background: none;
			font: inherit;
			color: inherit;
			opacity: 0;
			pointer-events: none;
			border-radius: 0.125em;
			outline: 0.125em solid currentColor;
			outline-offset: 0.125em;
		}

		button[part~="handle"]:focus-visible {
			opacity: 1;
		}
	`

	static START_DRAG_DELAY_MS = 150

	#initialized = false
	#observer = new MutationObserver(() => {
		this.#onContentChanged()
	})

	constructor() {
		super()

		this.#createRoot()
	}

	list = (): ReorderListElement | null =>
		this.closest<ReorderListElement>(ReorderListElement.defaultElementName)
	handles = (): NodeListOf<ReorderHandleElement> =>
		this.querySelectorAll(ReorderHandleElement.defaultElementName)

	/** The handle this item supplies for itself when the author provides none. */
	defaultHandle = (): HTMLButtonElement | null => this.#defaultHandle ?? null

	connectedCallback() {
		this.setAttribute("role", "listitem")

		this.#observer.observe(this, {
			attributes: false,
			childList: true,
			characterData: true,
			subtree: true,
		})

		this.#onContentChanged()
	}

	disconnectedCallback() {
		this.#observer.disconnect()
		this.#initialized = false
	}

	startDragging = (handle: HTMLElement | null = this.handles()[0] ?? this.#defaultHandle) => {
		handle?.focus()

		for (const handle of this.handles()) {
			handle.dataset.dragging = ""
		}

		const timeout = setTimeout(() => this.#onDragStart(), ReorderItemElement.START_DRAG_DELAY_MS)
		const cancelDrag = () => {
			clearTimeout(timeout)
			document.removeEventListener("pointerup", cancelDrag)
			document.removeEventListener("pointercancel", cancelDrag)
			document.removeEventListener("contextmenu", cancelDrag)
		}

		document.addEventListener("pointerup", cancelDrag)
		document.addEventListener("pointercancel", cancelDrag)
		document.addEventListener("contextmenu", cancelDrag)
	}

	#onContentChanged = () => {
		this.#attachTouchListeners()

		// A handle may connect before the text it names itself after is parsed.
		// Handles not yet upgraded will name themselves when they are.
		for (const handle of this.handles()) {
			handle.refreshLabel?.()
		}

		this.#refreshDefaultHandleLabel()
	}

	#attachTouchListeners = () => {
		const hasHandle = this.handles().length > 0
		if (this.#initialized && hasHandle === this.hasAttribute("data-has-handle")) {
			return
		}

		if (hasHandle) {
			this.dataset.hasHandle = ""
			this.removeEventListener("pointerdown", this.#onTouchStart)
			this.#removeDefaultHandle()
		} else {
			delete this.dataset.hasHandle
			this.addEventListener("pointerdown", this.#onTouchStart)
			this.#createDefaultHandle()
		}

		this.#initialized = true
	}

	#defaultHandle: HTMLButtonElement | undefined = undefined

	#createDefaultHandle = () => {
		if (this.#defaultHandle != null) {
			return
		}

		const handle = document.createElement("button")
		handle.type = "button"
		handle.setAttribute("part", "handle")
		handle.addEventListener("keydown", this.#onDefaultHandleKeyDown)

		this.shadowRoot?.insertBefore(handle, this.shadowRoot.querySelector("slot"))
		this.#defaultHandle = handle

		this.#refreshDefaultHandleLabel()
	}

	#removeDefaultHandle = () => {
		this.#defaultHandle?.remove()
		this.#defaultHandle = undefined
	}

	#refreshDefaultHandleLabel = () => {
		const text = nameOf(this)
		if (this.#defaultHandle != null && text.length > 0) {
			this.#defaultHandle.setAttribute("aria-label", ReorderHandleElement.labelFor(text))
		}
	}

	#onDefaultHandleKeyDown = (e: KeyboardEvent) => {
		if (e.key === " ") {
			e.preventDefault()
		}
	}

	#onTouchStart = (e: PointerEvent) => {
		if (e.target instanceof HTMLElement && e.target.dataset.ignoreReorder != null) {
			return
		}

		e.preventDefault()
		e.stopPropagation()
		this.startDragging()
	}

	#onDragStart = (e?: PointerEvent) => {
		e?.preventDefault()
		this.dataset.dragging = ""

		this.#startCommitTracking()

		document.addEventListener("pointermove", this.#onDragMove)
		document.addEventListener("pointerup", this.#onDragEnd)
		document.addEventListener("pointercancel", this.#onDragEnd)
		document.addEventListener("touchmove", this.#preventScroll)
	}

	#onDragMove = (e: PointerEvent) => {
		e.preventDefault()
		const list = this.list()
		const items = list?.items() ?? []
		const cur = {
			index: items.indexOf(this),
			rect: this.getBoundingClientRect(),
		}
		const prev = {
			index: cur.index - 1,
			rect: items[cur.index - 1]?.getBoundingClientRect(),
		}
		const next = {
			index: cur.index + 1,
			rect: items[cur.index + 1]?.getBoundingClientRect(),
		}

		if (prev.rect && this.#isOverPrevious(e, prev.rect, cur.rect)) {
			list?.reorder(cur.index, prev.index, items)
		} else if (next.rect && this.#isOverNext(e, next.rect, cur.rect)) {
			list?.reorder(cur.index, next.index, items)
		}
	}

	#isOverPrevious = (mouse: MouseEvent, prev: DOMRect, cur: DOMRect): boolean => {
		const orientation = this.list()?.orientation
		return orientation === "horizontal"
			? mouse.clientX < Math.min(prev.left + cur.width, prev.right)
			: mouse.clientY < Math.min(prev.top + cur.height, prev.bottom)
	}

	#isOverNext = (mouse: MouseEvent, next: DOMRect, cur: DOMRect): boolean => {
		const orientation = this.list()?.orientation
		return orientation === "horizontal"
			? mouse.clientX > Math.max(next.right - cur.width, next.left)
			: mouse.clientY > Math.max(next.bottom - cur.height, next.top)
	}

	#onDragEnd = () => {
		delete this.dataset.dragging
		for (const handle of this.handles()) {
			delete handle.dataset.dragging
		}

		document.removeEventListener("pointermove", this.#onDragMove)
		document.removeEventListener("pointerup", this.#onDragEnd)
		document.removeEventListener("pointercancel", this.#onDragEnd)
		document.removeEventListener("touchmove", this.#preventScroll)

		this.#endCommitTracking()
	}

	#preventScroll = (e: TouchEvent) => {
		e.preventDefault()
	}

	#originalPosition: number | undefined = undefined

	#startCommitTracking = () => {
		this.#originalPosition = this.list()?.items().indexOf(this)
	}

	#endCommitTracking = () => {
		const list = this.list()
		const newPosition = list?.items().indexOf(this) ?? -1
		list?.dispatchEvent(commitEvent(this, this.#originalPosition ?? -1, newPosition))
		this.#originalPosition = undefined
	}

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = ReorderItemElement.css

		const template = document.createElement("template")
		template.innerHTML = ReorderItemElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
