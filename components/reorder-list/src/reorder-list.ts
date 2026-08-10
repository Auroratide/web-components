import { COMMIT, changeEvent, commitEvent, type ReorderListChangeEventDetail } from "./events.js"
import { ReorderHandleElement, nameOf } from "./reorder-handle.js"
import { ReorderItemElement } from "./reorder-item.js"

export type Orientation = "vertical" | "horizontal"

declare global {
	interface Node {
		/** Not yet in lib.dom; an atomic move that preserves focus and state. */
		moveBefore?: (node: Node, before: Node | null) => void,
	}
}

const ANNOUNCER_ATTRIBUTE = "data-reorder-list-announcer"

/**
 * Every list shares one live region, and it lives at the end of the document
 * rather than in a shadow root. Two reasons: live regions inside shadow DOM are
 * not reliably observed by assistive technology, and an inline region is read
 * as ordinary content when browsing the page, interrupting the list it belongs
 * to. At the end of the document it is out of the way of everything.
 */
const announcer = (): HTMLElement | null => {
	if (typeof document === "undefined") {
		return null
	}

	const existing = document.querySelector<HTMLElement>(`[${ANNOUNCER_ATTRIBUTE}]`)
	if (existing != null) {
		return existing
	}

	const created = document.createElement("div")
	created.setAttribute(ANNOUNCER_ATTRIBUTE, "")
	created.setAttribute("aria-live", "polite")
	created.setAttribute("aria-atomic", "true")

	// inline, since no shadow stylesheet reaches it and author CSS might
	created.style.cssText = [
		"position: absolute",
		"width: 1px",
		"height: 1px",
		"margin: -1px",
		"padding: 0",
		"border: 0",
		"overflow: hidden",
		"white-space: nowrap",
		"clip-path: inset(50%)",
	].join(";")

	document.body.appendChild(created)

	return created
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

	/**
	 * What a keyboard reorder announces. Replace to translate:
	 * `ReorderListElement.announcementFor = (name, position, total) => ...`
	 */
	static announcementFor = (name: string, position: number, total: number) =>
		`${name}, position ${position} of ${total}`

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

		// established now rather than at the first announcement: a live region
		// populated as it is inserted is unreliably announced
		announcer()

		this.addEventListener("keydown", this.#handleNav)
		this.addEventListener(COMMIT, this.#announceCommit)
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

		const item = this.#originatingItem(e)
		if (item == null) {
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

		// A plain arrow only moves between handles, so a list of items with their
		// own interactive content can be skimmed without tabbing through it all.
		if (!e.altKey) {
			items[newIndex].handle()?.focus()
			return
		}

		window.clearTimeout(this.#debouncedCommit ?? -1)
		this.#startCommitTracking(item)
		this.reorder(curIndex, newIndex, items)
		this.#debouncedCommit = window.setTimeout(this.#endCommitTracking, ReorderListElement.COMMIT_DEBOUNCE_MS)

		// Only the keyboard announces: a drag reorders on every boundary it
		// crosses, and reorder() is shared by all three callers. Navigating needs
		// no announcement, since focusing a handle reads out its name already.
		this.#announce(item, newIndex, items.length)
	}

	/**
	 * Every settled reorder is worth speaking, however it was made: dragging with
	 * a screen reader running is ordinary. Announcing at the commit rather than
	 * on each change is what keeps a drag from flooding the region.
	 */
	#announceCommit = (e: Event) => {
		const { item, oldIndex, newIndex } = (e as CustomEvent<ReorderListChangeEventDetail>).detail
		if (oldIndex !== newIndex) {
			this.#announce(item, newIndex, this.items().length)
		}
	}

	#announce = (item: ReorderItemElement, index: number, total: number) => {
		const region = announcer()
		const message = ReorderListElement.announcementFor(nameOf(item), index + 1, total)

		// a keyboard move announces as it goes, so its commit has nothing to add
		if (region != null && region.textContent !== message) {
			region.textContent = message
		}
	}

	/**
	 * The item a key belongs to, but only when the key came from that item's
	 * handle. Interactive content within an item keeps its own arrow behaviour,
	 * and a nested list handles its own items.
	 */
	#originatingItem = (e: Event): ReorderItemElement | null => {
		const path = e.composedPath()
		const index = path.findIndex((node) => node instanceof ReorderItemElement)
		if (index < 0) {
			return null
		}

		const item = path[index] as ReorderItemElement
		const fromHandle = path.slice(0, index).some((node) =>
			node instanceof ReorderHandleElement || node === item.defaultHandle(),
		)

		return fromHandle && item.list() === this ? item : null
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
