import { commitEvent } from "./events.js"
import { ReorderHandleElement } from "./reorder-handle.js"
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

		:host([data-has-handle]) {
			cursor: auto;
			touch-action: auto;
		}
		
		:host([data-dragging]) {
			opacity: 0.5;
			cursor: grabbing;
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

	startDragging = (handle: HTMLElement = this.handles()[0]) => {
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
	}

	#attachTouchListeners = () => {
		const hasHandlesNow = this.handles().length > 0
		if ((this.dataset.hasHandle || !this.#initialized) && !hasHandlesNow) {
			delete this.dataset.hasHandle
			this.addEventListener("pointerdown", this.#onTouchStart)
		}

		if ((!this.dataset.hasHandle || !this.#initialized) && hasHandlesNow) {
			this.dataset.hasHandle = ""
			this.removeEventListener("pointerdown", this.#onTouchStart)
		}

		this.#initialized = true
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
