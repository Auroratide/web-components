import { fixture, expect, waitUntil } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"
import { CHANGED, COMMIT } from "../lib/events"
import { ReorderItemElement, ReorderListElement } from "../lib"
import "../lib/define.js"

const deepActiveElement = () => {
	let el = document.activeElement
	while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement
	return el
}

// the accessible name first: every handle in a list reads "Drag" otherwise
const describeElement = (el) => el == null
	? "nothing"
	: `<${el.localName}>${el.getAttribute?.("aria-label") ?? el.textContent?.trim().slice(0, 20) ?? ""}`

/**
 * Note: do not use to.equal to compare elements; the deep comparison hangs
 * indefinitely when it fails. Identity plus a readable message instead.
 */
const expectFocus = (expected) => {
	const actual = deepActiveElement()
	expect(actual === expected,
		`expected focus on ${describeElement(expected)}, but it was on ${describeElement(actual)}`,
	).to.be.true
}

const expectNoFocus = (unexpected) => {
	expect(deepActiveElement() === unexpected,
		`expected focus to be anywhere but ${describeElement(unexpected)}`,
	).to.be.false
}

const press = (key) => sendKeys({ press: key })

const pressWith = async (modifier, key) => {
	await sendKeys({ down: modifier })
	try {
		await sendKeys({ press: key })
	} finally {
		await sendKeys({ up: modifier })
	}
}

const altPress = (key) => pressWith("Alt", key)

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const drag = async (item, destination, numberOfSlots = 1) => {
	item.dispatchEvent(new PointerEvent("pointerdown", {
		bubbles: true,
	}))

	await wait(ReorderItemElement.START_DRAG_DELAY_MS + 10)

	for (let i = 0; i < numberOfSlots; ++i) {
		item.dispatchEvent(new PointerEvent("pointermove", {
			clientX: destination.x,
			clientY: destination.y,
			bubbles: true,
		}))

		await wait(1)
	}

	item.dispatchEvent(new PointerEvent("pointerup", {
		bubbles: true,
	}))
}

const tap = async (element) => {
	element.dispatchEvent(new PointerEvent("pointerdown", {
		bubbles: true,
	}))
	await wait(1)
	element.dispatchEvent(new PointerEvent("pointerup", {
		bubbles: true,
	}))
}

/** A list whose items each carry an explicit handle. */
const listMarkup = (names, attributes = "") => `
	<reorder-list ${attributes}>
		${names.map((name) => `
			<reorder-item>
				<reorder-handle>Drag</reorder-handle>
				<span>${name}</span>
			</reorder-item>
		`).join("")}
	</reorder-list>
`

/** A list left to supply its own handles. */
const plainListMarkup = (names, attributes = "") => `
	<reorder-list ${attributes}>
		${names.map((name) => `
			<reorder-item><span>${name}</span></reorder-item>
		`).join("")}
	</reorder-list>
`

const itemNames = (container) => Array.from(
	container.querySelectorAll("reorder-item"),
).map((item) => item.querySelector("span, a").textContent.trim())

const handlesOf = (container) => container.querySelectorAll("reorder-handle")

const defaultHandleOf = (item) => item.shadowRoot?.querySelector("[part~=handle]")

const ANNOUNCER_SELECTOR = "[data-reorder-list-announcer]"

const region = () => document.querySelector(ANNOUNCER_SELECTOR)

describe("reorder-list", () => {
	beforeEach(() => {
		ReorderItemElement.START_DRAG_DELAY_MS = 10

		// the region is a shared, document-level node that outlives each fixture
		if (region() != null) {
			region().textContent = ""
		}
	})

	describe("aria-requirements", () => {
		it("roles", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange"]))

			expect(container.getAttribute("role")).to.equal("list")
			container.querySelectorAll("reorder-item").forEach((item) => {
				expect(item.getAttribute("role")).to.equal("listitem")
			})
			handlesOf(container).forEach((handle) => {
				expect(handle.getAttribute("role")).to.equal("button")
				expect(handle.getAttribute("tabindex")).to.equal("0")
			})
		})

		it("items are not focusable", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange"]))

			container.querySelectorAll("reorder-item").forEach((item) => {
				expect(item.hasAttribute("tabindex"), "items carry no roving tabindex").to.be.false
				expect(item.hasAttribute("aria-selected"), "listitems are not selectable").to.be.false
			})
		})

		it("orientation is behaviour, not semantics", async () => {
			// aria-orientation is not valid on role=list, but the attribute still
			// drives which arrow keys reorder.
			const list = await fixture(listMarkup(["Apple", "Orange"], "orientation='horizontal'"))

			expect(list.hasAttribute("aria-orientation")).to.be.false
			expect(list.orientation).to.equal("horizontal")

			list.orientation = "vertical"
			expect(list.hasAttribute("aria-orientation")).to.be.false
			expect(list.orientation).to.equal("vertical")
		})

		it("a handle is named after its item", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange"]))
			const handles = handlesOf(container)

			expect(handles[0].getAttribute("aria-label")).to.contain("Apple")
			expect(handles[1].getAttribute("aria-label")).to.contain("Orange")

			// the handle's own content is an affordance, not part of the name
			expect(handles[0].getAttribute("aria-label")).to.not.contain("Drag")
		})

		it("an author-provided name wins", async () => {
			const container = await fixture(`
				<reorder-list>
					<reorder-item>
						<reorder-handle aria-label="Move fruit">Drag</reorder-handle>
						<span>Apple</span>
					</reorder-item>
				</reorder-list>
			`)

			expect(handlesOf(container)[0].getAttribute("aria-label")).to.equal("Move fruit")
		})

		it("author-provided role and tabindex win", async () => {
			const container = await fixture(`
				<reorder-list>
					<reorder-item>
						<reorder-handle role="link" tabindex="3">Drag</reorder-handle>
						<span>Apple</span>
					</reorder-item>
				</reorder-list>
			`)

			const handle = handlesOf(container)[0]
			expect(handle.getAttribute("role")).to.equal("link")
			expect(handle.getAttribute("tabindex")).to.equal("3")
		})
	})

	describe("keyboard navigation", () => {
		it("every handle is a tab stop", async () => {
			const container = await fixture(`<div>
				<button id="focus-start">Focusable</button>
				${listMarkup(["Apple", "Orange"])}
				<button id="focus-end">Focusable</button>
			</div>`)

			const handles = handlesOf(container)
			container.querySelector("#focus-start").focus()

			await press("Tab")
			expectFocus(handles[0])

			await press("Tab")
			expectFocus(handles[1])

			await press("Tab")
			expectFocus(container.querySelector("#focus-end"))
		})

		it("reordering an item (vertical)", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange", "Banana"]))
			const appleHandle = handlesOf(container)[0]

			appleHandle.focus()

			await altPress("ArrowDown")
			expect(itemNames(container)).to.deep.equal(["Orange", "Apple", "Banana"])

			await altPress("ArrowDown")
			expect(itemNames(container)).to.deep.equal(["Orange", "Banana", "Apple"])

			await altPress("ArrowUp")
			expect(itemNames(container)).to.deep.equal(["Orange", "Apple", "Banana"])
		})

		it("reordering stops at the ends of the list", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange", "Banana"]))

			handlesOf(container)[0].focus()

			await altPress("ArrowUp")
			expect(itemNames(container)).to.deep.equal(["Apple", "Orange", "Banana"])

			handlesOf(container)[2].focus()

			await altPress("ArrowDown")
			expect(itemNames(container)).to.deep.equal(["Apple", "Orange", "Banana"])
		})

		it("moving an item keeps focus on its handle", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange", "Banana"]))
			const appleHandle = handlesOf(container)[0]

			appleHandle.focus()
			expectFocus(appleHandle)

			// the item is re-inserted in the DOM, which would otherwise drop focus
			await altPress("ArrowDown")
			expectFocus(appleHandle)

			await altPress("ArrowDown")
			expectFocus(appleHandle)
		})

		it("reordering an item (horizontal)", async () => {
			const container = await fixture(
				listMarkup(["Apple", "Orange", "Banana"], "orientation='horizontal'"),
			)

			handlesOf(container)[0].focus()

			await altPress("ArrowRight")
			expect(itemNames(container)).to.deep.equal(["Orange", "Apple", "Banana"])

			await altPress("ArrowRight")
			expect(itemNames(container)).to.deep.equal(["Orange", "Banana", "Apple"])

			await altPress("ArrowLeft")
			expect(itemNames(container)).to.deep.equal(["Orange", "Apple", "Banana"])
		})

		it("the cross-axis arrows do nothing", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange", "Banana"]))

			handlesOf(container)[0].focus()

			await altPress("ArrowRight")
			await altPress("ArrowLeft")
			expect(itemNames(container)).to.deep.equal(["Apple", "Orange", "Banana"])
		})

		// Alt+Arrow reorders; a plain arrow only moves between handles, so a list
		// of link-bearing items can be skimmed without tabbing through each one.
		it("plain arrows move between handles", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange", "Banana"]))
			const handles = handlesOf(container)

			handles[0].focus()

			await press("ArrowDown")
			expectFocus(handles[1])

			await press("ArrowDown")
			expectFocus(handles[2])

			await press("ArrowDown")
			expectFocus(handles[2])

			await press("ArrowUp")
			expectFocus(handles[1])

			expect(itemNames(container), "navigating never reorders").to.deep.equal(
				["Apple", "Orange", "Banana"],
			)
		})

		it("plain arrows step over content within an item", async () => {
			const container = await fixture(`
				<reorder-list>
					<reorder-item>
						<reorder-handle>Drag</reorder-handle>
						<a href="#apple">Apple</a>
					</reorder-item>
					<reorder-item>
						<reorder-handle>Drag</reorder-handle>
						<a href="#orange">Orange</a>
					</reorder-item>
				</reorder-list>
			`)

			const handles = handlesOf(container)
			handles[0].focus()

			await press("ArrowDown")
			expectFocus(handles[1])
		})

		it("plain arrows follow the orientation", async () => {
			const container = await fixture(
				listMarkup(["Apple", "Orange"], "orientation='horizontal'"),
			)
			const handles = handlesOf(container)

			handles[0].focus()

			await press("ArrowDown")
			expectFocus(handles[0])

			await press("ArrowRight")
			expectFocus(handles[1])
		})

		it("space on a handle does not scroll the page", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange"]))

			let event = undefined
			document.addEventListener("keydown", (e) => {
				event = e
			}, { once: true })

			handlesOf(container)[0].focus()
			await press("Space")

			expect(event?.defaultPrevented, "Space should be consumed by the handle").to.be.true
		})
	})

	describe("interactive content", () => {
		const withLinks = `<div>
			<button id="focus-start">Focusable</button>
			<reorder-list>
				<reorder-item>
					<reorder-handle>Drag</reorder-handle>
					<a href="#apple">Apple</a>
				</reorder-item>
				<reorder-item>
					<reorder-handle>Drag</reorder-handle>
					<a href="#orange">Orange</a>
				</reorder-item>
			</reorder-list>
			<button id="focus-end">Focusable</button>
		</div>`

		it("a link inside an item is reachable", async () => {
			const container = await fixture(withLinks)

			const handles = handlesOf(container)
			const links = container.querySelectorAll("a")
			container.querySelector("#focus-start").focus()

			await press("Tab")
			expectFocus(handles[0])

			await press("Tab")
			expectFocus(links[0])

			await press("Tab")
			expectFocus(handles[1])

			await press("Tab")
			expectFocus(links[1])

			await press("Tab")
			expectFocus(container.querySelector("#focus-end"))
		})

		it("arrows on a link do not reorder", async () => {
			const container = await fixture(withLinks)
			const list = container.querySelector("reorder-list")

			let changes = 0
			list.addEventListener(CHANGED, () => {
				changes += 1
			})

			container.querySelectorAll("a")[0].focus()

			await altPress("ArrowDown")
			await press("ArrowDown")

			expect(itemNames(container)).to.deep.equal(["Apple", "Orange"])
			expect(changes, "reordering only responds to keys from a handle").to.equal(0)
		})
	})

	describe("default handle", () => {
		it("an item without a handle provides one", async () => {
			const container = await fixture(plainListMarkup(["Apple", "Orange"]))

			container.querySelectorAll("reorder-item").forEach((item) => {
				const handle = defaultHandleOf(item)
				expect(handle, "a handle-less item supplies its own").to.exist
				expect(handle.localName).to.equal("button")
			})
		})

		it("is named after its item", async () => {
			const container = await fixture(plainListMarkup(["Apple", "Orange"]))
			const items = container.querySelectorAll("reorder-item")

			expect(defaultHandleOf(items[0]).getAttribute("aria-label")).to.contain("Apple")
			expect(defaultHandleOf(items[1]).getAttribute("aria-label")).to.contain("Orange")
		})

		it("is a tab stop", async () => {
			const container = await fixture(`<div>
				<button id="focus-start">Focusable</button>
				${plainListMarkup(["Apple", "Orange"])}
				<button id="focus-end">Focusable</button>
			</div>`)

			const items = container.querySelectorAll("reorder-item")
			container.querySelector("#focus-start").focus()

			await press("Tab")
			expectFocus(defaultHandleOf(items[0]))

			await press("Tab")
			expectFocus(defaultHandleOf(items[1]))

			await press("Tab")
			expectFocus(container.querySelector("#focus-end"))
		})

		it("reorders with alt and the arrow keys", async () => {
			const container = await fixture(plainListMarkup(["Apple", "Orange", "Banana"]))
			const appleHandle = defaultHandleOf(container.querySelectorAll("reorder-item")[0])

			appleHandle.focus()

			await altPress("ArrowDown")
			expect(itemNames(container)).to.deep.equal(["Orange", "Apple", "Banana"])

			await altPress("ArrowDown")
			expect(itemNames(container)).to.deep.equal(["Orange", "Banana", "Apple"])

			expectFocus(appleHandle)
		})

		it("navigates between default handles", async () => {
			const container = await fixture(plainListMarkup(["Apple", "Orange", "Banana"]))
			const items = container.querySelectorAll("reorder-item")

			defaultHandleOf(items[0]).focus()

			await press("ArrowDown")
			expectFocus(defaultHandleOf(items[1]))

			await press("ArrowUp")
			expectFocus(defaultHandleOf(items[0]))

			expect(itemNames(container)).to.deep.equal(["Apple", "Orange", "Banana"])
		})

		it("space does not scroll the page", async () => {
			const container = await fixture(plainListMarkup(["Apple", "Orange"]))

			let event = undefined
			document.addEventListener("keydown", (e) => {
				event = e
			}, { once: true })

			defaultHandleOf(container.querySelector("reorder-item")).focus()
			await press("Space")

			expect(event?.defaultPrevented, "Space should be consumed by the handle").to.be.true
		})

		it("does not intercept pointer events", async () => {
			// The whole item is already draggable by pointer, so the default handle
			// is a keyboard affordance only. An overlay that swallowed clicks would
			// break any link or button inside the item.
			const container = await fixture(plainListMarkup(["Apple"]))
			const handle = defaultHandleOf(container.querySelector("reorder-item"))

			expect(getComputedStyle(handle).pointerEvents).to.equal("none")
		})

		it("leaves the item pointer-draggable", async () => {
			const container = await fixture(plainListMarkup(["Apple"]))
			const item = container.querySelector("reorder-item")

			expect(item.hasAttribute("data-has-handle"),
				"a default handle is not an author handle",
			).to.be.false
		})

		it("is invisible until focused", async () => {
			const container = await fixture(`<div>
				<button id="focus-start">Focusable</button>
				${plainListMarkup(["Apple"])}
			</div>`)

			const handle = defaultHandleOf(container.querySelector("reorder-item"))
			expect(getComputedStyle(handle).opacity, "does not disturb existing layouts").to.equal("0")

			container.querySelector("#focus-start").focus()
			await press("Tab")

			expectFocus(handle)
			expect(getComputedStyle(handle).opacity, "visible once keyboard focus lands").to.equal("1")
		})

		it("an author handle replaces it", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange"]))

			container.querySelectorAll("reorder-item").forEach((item) => {
				expect(defaultHandleOf(item), "an item has one handle, not two").to.not.exist
			})
		})

		it("goes away when an author handle appears", async () => {
			const container = await fixture(plainListMarkup(["Apple", "Orange"]))
			const item = container.querySelectorAll("reorder-item")[0]

			expect(defaultHandleOf(item)).to.exist

			const handle = document.createElement("reorder-handle")
			handle.textContent = "Drag"
			item.prepend(handle)

			await waitUntil(() => defaultHandleOf(item) == null,
				"the default handle should give way to the author's",
			)
		})

		it("comes back when the author handle is removed", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange"]))
			const item = container.querySelectorAll("reorder-item")[0]

			expect(defaultHandleOf(item)).to.not.exist

			item.querySelector("reorder-handle").remove()

			await waitUntil(() => defaultHandleOf(item) != null,
				"the item should be keyboard reorderable again",
			)
		})
	})

	describe("announcements", () => {
		// Under the old listbox pattern a move took focus with it, so the item and
		// its position were re-announced for free. Focus now stays on the handle,
		// and a DOM reorder says nothing on its own.
		const said = () => region().textContent.trim()

		it("has a polite live region", async () => {
			// It exists from the moment a list connects, not from the first
			// announcement: a live region populated in the same breath as it is
			// inserted is unreliably announced.
			await fixture(listMarkup(["Apple", "Orange"]))

			expect(region(), "the list needs somewhere to speak").to.exist
			expect(region().getAttribute("aria-live")).to.equal("polite")
			expect(said(), "silent until something moves").to.equal("")
		})

		it("does not disturb the layout", async () => {
			await fixture(listMarkup(["Apple", "Orange"]))

			expect(region().getBoundingClientRect().height).to.be.at.most(1)
		})

		it("sits outside the list, so browsing it never meets the region", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange"]))

			expect(container.contains(region())).to.be.false
			expect(container.shadowRoot.contains(region())).to.be.false
			expect(region().parentElement).to.equal(document.body)
		})

		it("is one region shared by every list", async () => {
			await fixture(`<div>
				${listMarkup(["Apple", "Orange"])}
				${listMarkup(["Cherry", "Plum"])}
			</div>`)

			expect(document.querySelectorAll(ANNOUNCER_SELECTOR).length).to.equal(1)
		})

		it("announces the new position after a keyboard reorder", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange", "Banana"]))

			handlesOf(container)[0].focus()

			await altPress("ArrowDown")
			expect(said()).to.equal("Apple, position 2 of 3")

			await altPress("ArrowDown")
			expect(said()).to.equal("Apple, position 3 of 3")
		})

		it("announces from a default handle too", async () => {
			const container = await fixture(plainListMarkup(["Apple", "Orange", "Banana"]))

			defaultHandleOf(container.querySelectorAll("reorder-item")[2]).focus()

			await altPress("ArrowUp")
			expect(said()).to.equal("Banana, position 2 of 3")
		})

		it("can be translated", async () => {
			const original = ReorderListElement.announcementFor
			ReorderListElement.announcementFor = (name, position, total) =>
				`${name} : ${position}/${total}`

			try {
				const container = await fixture(listMarkup(["Apple", "Orange"]))

				handlesOf(container)[0].focus()
				await altPress("ArrowDown")

				expect(said()).to.equal("Apple : 2/2")
			} finally {
				ReorderListElement.announcementFor = original
			}
		})

		/**
		 * Every time the region is written, in order. Deliberately not de-duped:
		 * rewriting identical text is still a mutation, and a screen reader may
		 * well speak it twice.
		 */
		const listenToRegion = () => {
			const heard = []
			const observer = new MutationObserver((records) => {
				records.forEach(() => heard.push(said()))
			})

			observer.observe(region(), {
				childList: true,
				characterData: true,
				subtree: true,
			})

			return {
				heard,
				stop: async () => {
					await wait(1)
					observer.disconnect()
					return heard
				},
			}
		}

		it("announces once at the end of a pointer drag", async () => {
			// Dragging with a screen reader running is ordinary, so the outcome is
			// worth speaking. But a drag reorders on every boundary it crosses, and
			// announcing each one would flood the region and lag behind the pointer.
			const container = await fixture(plainListMarkup(["Apple", "Orange", "Banana"]))
			const heard = listenToRegion()

			const boundingBox = container.getBoundingClientRect()
			const itemHeight = boundingBox.height / 3
			const items = container.querySelectorAll("reorder-item")

			await drag(items[0], { y: boundingBox.top + itemHeight * 2 + 2 }, 2)

			expect(itemNames(container), "the drag did reorder").to.deep.equal(
				["Orange", "Banana", "Apple"],
			)
			expect(await heard.stop(), "one announcement, not one per boundary").to.deep.equal(
				["Apple, position 3 of 3"],
			)
		})

		it("does not repeat itself when a keyboard move commits", async () => {
			const previous = ReorderListElement.COMMIT_DEBOUNCE_MS
			ReorderListElement.COMMIT_DEBOUNCE_MS = 10

			try {
				const container = await fixture(listMarkup(["Apple", "Orange", "Banana"]))
				const heard = listenToRegion()

				handlesOf(container)[0].focus()
				await altPress("ArrowDown")
				await wait(50)

				expect(await heard.stop()).to.deep.equal(["Apple, position 2 of 3"])
			} finally {
				ReorderListElement.COMMIT_DEBOUNCE_MS = previous
			}
		})

		it("stays quiet when navigating", async () => {
			// moving focus to a handle announces that handle's own name already
			const container = await fixture(listMarkup(["Apple", "Orange"]))

			handlesOf(container)[0].focus()
			await press("ArrowDown")

			expect(said()).to.equal("")
		})

		it("stays quiet when reordered programmatically", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange", "Banana"]))

			container.reorder(2, 0)

			expect(itemNames(container), "the call did reorder").to.deep.equal(
				["Banana", "Apple", "Orange"],
			)
			expect(said()).to.equal("")
		})
	})

	describe("dragging", () => {
		let previousDragMs = 0
		beforeEach(() => {
			previousDragMs = ReorderItemElement.START_DRAG_DELAY_MS
			ReorderItemElement.START_DRAG_DELAY_MS = 0
		})

		afterEach(() => {
			ReorderItemElement.START_DRAG_DELAY_MS = previousDragMs
		})

		it("dragging an item up", async () => {
			const container = await fixture(`
				<reorder-list>
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
					<reorder-item>Banana</reorder-item>
				</reorder-list>
			`)

			const boundingBox = container.getBoundingClientRect()
			const itemHeight = boundingBox.height / 3
			const epsilon = 2
			let items = container.querySelectorAll("reorder-item")

			await drag(items[1], { y: boundingBox.top + itemHeight - epsilon })
			items = container.querySelectorAll("reorder-item")
			expect(items[0].textContent).to.equal("Orange")
			expect(items[1].textContent).to.equal("Apple")
			expect(items[2].textContent).to.equal("Banana")

			await drag(items[2], { y: boundingBox.top + itemHeight * 2 - epsilon })
			items = container.querySelectorAll("reorder-item")
			expect(items[0].textContent).to.equal("Orange")
			expect(items[1].textContent).to.equal("Banana")
			expect(items[2].textContent).to.equal("Apple")
		})

		it("dragging an item down", async () => {
			const container = await fixture(`
				<reorder-list>
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
					<reorder-item>Banana</reorder-item>
				</reorder-list>
			`)

			const boundingBox = container.getBoundingClientRect()
			const itemHeight = boundingBox.height / 3
			const epsilon = 2
			let items = container.querySelectorAll("reorder-item")

			await drag(items[1], { y: boundingBox.top + itemHeight * 2 + epsilon })
			items = container.querySelectorAll("reorder-item")
			expect(items[0].textContent).to.equal("Apple")
			expect(items[1].textContent).to.equal("Banana")
			expect(items[2].textContent).to.equal("Orange")

			await drag(items[0], { y: boundingBox.top + itemHeight + epsilon })
			items = container.querySelectorAll("reorder-item")
			expect(items[0].textContent).to.equal("Banana")
			expect(items[1].textContent).to.equal("Apple")
			expect(items[2].textContent).to.equal("Orange")
		})

		it("dragging an item left", async () => {
			const container = await fixture(`
				<reorder-list orientation="horizontal">
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
					<reorder-item>Banana</reorder-item>
				</reorder-list>
			`)

			const epsilon = 2
			let items = container.querySelectorAll("reorder-item")

			let appleBound = items[0].getBoundingClientRect()
			await drag(items[1], { x: appleBound.right - epsilon })

			items = container.querySelectorAll("reorder-item")
			expect(items[0].textContent).to.equal("Orange")
			expect(items[1].textContent).to.equal("Apple")
			expect(items[2].textContent).to.equal("Banana")

			appleBound = items[1].getBoundingClientRect()
			await drag(items[2], { x: appleBound.right - epsilon })
			items = container.querySelectorAll("reorder-item")
			expect(items[0].textContent).to.equal("Orange")
			expect(items[1].textContent).to.equal("Banana")
			expect(items[2].textContent).to.equal("Apple")
		})

		it("dragging an item right", async () => {
			const container = await fixture(`
				<reorder-list orientation="horizontal">
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
					<reorder-item>Banana</reorder-item>
				</reorder-list>
			`)

			const epsilon = 10
			let items = container.querySelectorAll("reorder-item")


			let bananaBound = items[2].getBoundingClientRect()
			await drag(items[1], { x: bananaBound.left + epsilon })
			items = container.querySelectorAll("reorder-item")
			expect(items[0].textContent).to.equal("Apple")
			expect(items[1].textContent).to.equal("Banana")
			expect(items[2].textContent).to.equal("Orange")

			bananaBound = items[1].getBoundingClientRect()
			await drag(items[0], { x: bananaBound.left + epsilon })
			items = container.querySelectorAll("reorder-item")
			expect(items[0].textContent).to.equal("Banana")
			expect(items[1].textContent).to.equal("Apple")
			expect(items[2].textContent).to.equal("Orange")
		})

		it("starting drag on an ignored element", async () => {
			const container = await fixture(`
				<reorder-list>
					<reorder-item id="first-item">
						<input id="input" data-ignore-reorder value="Apple" />
					</reorder-item>
					<reorder-item>Orange</reorder-item>
				</reorder-list>
			`)

			const firstItem = container.querySelector("#first-item")
			const input = container.querySelector("#input")
			await tap(input)

			expectNoFocus(firstItem)
		})

		it("tapping a handle focuses it", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange", "Banana"]))
			const handles = handlesOf(container)

			await tap(handles[1])

			expectFocus(handles[1])
		})

		it("using a reorder-handle", async () => {
			const container = await fixture(`
				<reorder-list>
					<reorder-item>
						<span>Apple</span>
						<reorder-handle>Drag</reorder-handle>
					</reorder-item>
					<reorder-item>
						<span>Orange</span>
						<reorder-handle>Drag</reorder-handle>
					</reorder-item>
					<reorder-item>
						<span>Banana</span>
						<reorder-handle>Drag</reorder-handle>
					</reorder-item>
				</reorder-list>
			`)

			const boundingBox = container.getBoundingClientRect()
			const itemHeight = boundingBox.height / 3
			const epsilon = 2
			let items = container.querySelectorAll("reorder-item span")
			let handles = container.querySelectorAll("reorder-handle")

			await drag(handles[1], { y: boundingBox.top + itemHeight - epsilon })
			items = container.querySelectorAll("reorder-item span")
			expect(items[0].textContent).to.equal("Orange")
			expect(items[1].textContent).to.equal("Apple")
			expect(items[2].textContent).to.equal("Banana")

			await drag(handles[2], { y: boundingBox.top + itemHeight * 2 - epsilon })
			items = container.querySelectorAll("reorder-item span")
			expect(items[0].textContent).to.equal("Orange")
			expect(items[1].textContent).to.equal("Banana")
			expect(items[2].textContent).to.equal("Apple")
		})
	})

	describe("events", () => {
		it("reordering", async () => {
			const container = await fixture(`
				<reorder-list>
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
					<reorder-item>Banana</reorder-item>
				</reorder-list>
			`)

			let emitted = undefined
			container.addEventListener(CHANGED, e => {
				emitted = e.detail
			})

			const expectedTarget = container.items()[2]
			container.reorder(2, 1)

			expect(emitted.item).to.equal(expectedTarget)
			expect(emitted.oldIndex).to.equal(2)
			expect(emitted.newIndex).to.equal(1)
		})

		it("dragging", async () => {
			const container = await fixture(`
				<reorder-list>
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
					<reorder-item>Banana</reorder-item>
				</reorder-list>
			`)

			let emitted = undefined
			container.addEventListener(COMMIT, e => {
				emitted = e.detail
			})

			const boundingBox = container.getBoundingClientRect()
			const itemHeight = boundingBox.height / 3
			const epsilon = 2
			let items = container.querySelectorAll("reorder-item")

			await drag(items[0], { y: boundingBox.top + itemHeight * 2 + epsilon }, 2)

			const expectedTarget = container.items()[2]

			expect(emitted.item).to.equal(expectedTarget)
			expect(emitted.oldIndex).to.equal(0)
			expect(emitted.newIndex).to.equal(2)
		})
	})

	describe("hidden items", () => {
		const listWithHidden = (names, hiddenIndexes, hiding = "display: none") => `
			<reorder-list>
				${names.map((name, i) => `
					<reorder-item ${hiddenIndexes.includes(i) ? `style="${hiding}"` : ""}>
						<reorder-handle>Drag</reorder-handle>
						<span>${name}</span>
					</reorder-item>
				`).join("")}
			</reorder-list>
		`

		// No explicit handle
		const plainListWithHidden = (names, hiddenIndexes, hiding = "display: none") => `
			<reorder-list>
				${names.map((name, i) => `
					<reorder-item ${hiddenIndexes.includes(i) ? `style="${hiding}"` : ""}>
						<span>${name}</span>
					</reorder-item>
				`).join("")}
			</reorder-list>
		`

		const isVisible = (el) => el.checkVisibility({
			visibilityProperty: true,
			contentVisibilityAuto: true,
		})

		const visibleNames = (container) => Array.from(
			container.querySelectorAll("reorder-item"),
		).filter(isVisible).map((item) => item.querySelector("span, a").textContent.trim())

		describe("hiding", () => {
			it("the hidden attribute hides an item", async () => {
				const container = await fixture(`
					<reorder-list>
						<reorder-item><span>Apple</span></reorder-item>
						<reorder-item hidden><span>Orange</span></reorder-item>
						<reorder-item><span>Banana</span></reorder-item>
					</reorder-list>
				`)

				const items = container.querySelectorAll("reorder-item")

				expect(isVisible(items[0]), "Apple is visible").to.be.true
				expect(isVisible(items[1]), "Orange is hidden").to.be.false
				expect(isVisible(items[2]), "Banana is visible").to.be.true
			})
		})

		describe("keyboard navigation", () => {
			it("plain arrows skip over a hidden item", async () => {
				const container = await fixture(listWithHidden(["Apple", "Orange", "Banana"], [1]))
				const handles = handlesOf(container)

				handles[0].focus()

				await press("ArrowDown")
				expectFocus(handles[2])

				await press("ArrowUp")
				expectFocus(handles[0])
			})

			it("plain arrows skip over a run of hidden items", async () => {
				const container = await fixture(
					listWithHidden(["Apple", "Orange", "Plum", "Banana"], [1, 2]),
				)
				const handles = handlesOf(container)

				handles[0].focus()

				await press("ArrowDown")
				expectFocus(handles[3])
			})

			it("plain arrows stop at the last visible item", async () => {
				const container = await fixture(listWithHidden(["Apple", "Orange", "Banana"], [2]))
				const handles = handlesOf(container)

				handles[1].focus()

				await press("ArrowDown")
				expectFocus(handles[1])
			})

			it("plain arrows stop at the first visible item", async () => {
				const container = await fixture(listWithHidden(["Apple", "Orange", "Banana"], [0]))
				const handles = handlesOf(container)

				handles[1].focus()

				await press("ArrowUp")
				expectFocus(handles[1])
			})

			it("an item hidden by the hidden attribute is skipped", async () => {
				const container = await fixture(`
					<reorder-list>
						<reorder-item>
							<reorder-handle>Drag</reorder-handle>
							<span>Apple</span>
						</reorder-item>
						<reorder-item hidden>
							<reorder-handle>Drag</reorder-handle>
							<span>Orange</span>
						</reorder-item>
						<reorder-item>
							<reorder-handle>Drag</reorder-handle>
							<span>Banana</span>
						</reorder-item>
					</reorder-list>
				`)
				const handles = handlesOf(container)

				handles[0].focus()

				await press("ArrowDown")
				expectFocus(handles[2])
			})

			// It still takes up space, but it is out of the accessibility tree all
			// the same, so arrowing onto it would land focus on nothing.
			it("an item hidden by visibility is skipped", async () => {
				const container = await fixture(
					listWithHidden(["Apple", "Orange", "Banana"], [1], "visibility: hidden"),
				)
				const handles = handlesOf(container)

				handles[0].focus()

				await press("ArrowDown")
				expectFocus(handles[2])
			})
		})

		describe("keyboard reordering", () => {
			it("alt and an arrow move past a hidden item in one press", async () => {
				const container = await fixture(listWithHidden(["Apple", "Orange", "Banana"], [1]))

				handlesOf(container)[0].focus()

				await altPress("ArrowDown")
				expect(visibleNames(container)).to.deep.equal(["Banana", "Apple"])
				expect(itemNames(container)).to.deep.equal(["Orange", "Banana", "Apple"])

				await altPress("ArrowUp")
				expect(visibleNames(container)).to.deep.equal(["Apple", "Banana"])
				expect(itemNames(container)).to.deep.equal(["Orange", "Apple", "Banana"])
			})

			it("alt and an arrow move past a run of hidden items", async () => {
				const container = await fixture(
					listWithHidden(["Apple", "Orange", "Plum", "Banana"], [1, 2]),
				)

				handlesOf(container)[0].focus()

				await altPress("ArrowDown")
				expect(visibleNames(container)).to.deep.equal(["Banana", "Apple"])
				expect(itemNames(container)).to.deep.equal(["Orange", "Plum", "Banana", "Apple"])
			})

			it("reordering stops at the last visible item", async () => {
				const container = await fixture(listWithHidden(["Apple", "Orange", "Banana"], [2]))

				handlesOf(container)[1].focus()

				// there is nowhere visible to go, so Orange stays put rather than
				// swapping with a hidden Banana and appearing not to move at all
				await altPress("ArrowDown")
				expect(itemNames(container)).to.deep.equal(["Apple", "Orange", "Banana"])
			})

			it("reordering stops at the first visible item", async () => {
				const container = await fixture(listWithHidden(["Apple", "Orange", "Banana"], [0]))

				handlesOf(container)[1].focus()

				await altPress("ArrowUp")
				expect(itemNames(container)).to.deep.equal(["Apple", "Orange", "Banana"])
			})

			it("moving past a hidden item keeps focus on the handle", async () => {
				const container = await fixture(listWithHidden(["Apple", "Orange", "Banana"], [1]))
				const appleHandle = handlesOf(container)[0]

				appleHandle.focus()

				await altPress("ArrowDown")
				expectFocus(appleHandle)
			})
		})

		describe("dragging", () => {
			it("dragging down over a hidden item", async () => {
				const container = await fixture(plainListWithHidden(["Apple", "Orange", "Banana"], [1]))
				const items = container.querySelectorAll("reorder-item")
				const banana = items[2].getBoundingClientRect()

				// A hidden item has a zero-sized rect, so the only boundary worth
				// testing against is the next item that is actually on screen.
				await drag(items[0], { y: banana.bottom - 2 })

				expect(visibleNames(container)).to.deep.equal(["Banana", "Apple"])
				expect(itemNames(container)).to.deep.equal(["Orange", "Banana", "Apple"])
			})

			it("dragging up over a hidden item", async () => {
				const container = await fixture(plainListWithHidden(["Apple", "Orange", "Banana"], [1]))
				const items = container.querySelectorAll("reorder-item")
				const apple = items[0].getBoundingClientRect()

				await drag(items[2], { y: apple.top + 2 })

				expect(visibleNames(container)).to.deep.equal(["Banana", "Apple"])
				expect(itemNames(container)).to.deep.equal(["Banana", "Apple", "Orange"])
			})

			it("dragging over a run of hidden items", async () => {
				const container = await fixture(
					plainListWithHidden(["Apple", "Orange", "Plum", "Banana"], [1, 2]),
				)
				const items = container.querySelectorAll("reorder-item")
				const apple = items[0].getBoundingClientRect()

				await drag(items[3], { y: apple.top + 2 })

				expect(visibleNames(container)).to.deep.equal(["Banana", "Apple"])
				expect(itemNames(container)).to.deep.equal(["Banana", "Apple", "Orange", "Plum"])
			})

			it("a hidden item is not a place to drop", async () => {
				// Only hidden items sit above Orange, so dragging it upwards has
				// nowhere to go; it must not swap into a slot with nothing in it.
				const container = await fixture(plainListWithHidden(["Apple", "Orange", "Banana"], [0]))
				const items = container.querySelectorAll("reorder-item")
				const orange = items[1].getBoundingClientRect()

				await drag(items[1], { y: orange.top - 50 })

				expect(itemNames(container)).to.deep.equal(["Apple", "Orange", "Banana"])
			})

			it("dragging is unaffected by a hidden item elsewhere in the list", async () => {
				const container = await fixture(
					plainListWithHidden(["Apple", "Orange", "Banana", "Plum"], [3]),
				)
				const items = container.querySelectorAll("reorder-item")
				const apple = items[0].getBoundingClientRect()

				await drag(items[1], { y: apple.top + 2 })

				expect(itemNames(container)).to.deep.equal(["Orange", "Apple", "Banana", "Plum"])
			})
		})

		// Indexes reported are relative to the ENTIRE list, not
		// just the visible list
		describe("events", () => {
			it("a keyboard reorder reports indexes into the whole list", async () => {
				const container = await fixture(listWithHidden(["Apple", "Orange", "Banana"], [1]))

				let emitted = undefined
				container.addEventListener(CHANGED, (e) => {
					emitted = e.detail
				})

				handlesOf(container)[0].focus()
				await altPress("ArrowDown")

				expect(emitted.item).to.equal(container.items()[2])
				expect(emitted.oldIndex).to.equal(0)
				expect(emitted.newIndex, "Banana's index in the whole list, not the visible one")
					.to.equal(2)
			})

			it("a keyboard reorder commits indexes into the whole list", async () => {
				const previous = ReorderListElement.COMMIT_DEBOUNCE_MS
				ReorderListElement.COMMIT_DEBOUNCE_MS = 10

				try {
					const container = await fixture(listWithHidden(["Apple", "Orange", "Banana"], [1]))

					let emitted = undefined
					container.addEventListener(COMMIT, (e) => {
						emitted = e.detail
					})

					handlesOf(container)[0].focus()
					await altPress("ArrowDown")
					await wait(50)

					expect(emitted.oldIndex).to.equal(0)
					expect(emitted.newIndex).to.equal(2)
				} finally {
					ReorderListElement.COMMIT_DEBOUNCE_MS = previous
				}
			})

			it("a drag reports indexes into the whole list", async () => {
				const container = await fixture(plainListWithHidden(["Apple", "Orange", "Banana"], [1]))

				let emitted = undefined
				container.addEventListener(COMMIT, (e) => {
					emitted = e.detail
				})

				const items = container.querySelectorAll("reorder-item")
				const banana = items[2].getBoundingClientRect()

				await drag(items[0], { y: banana.bottom - 2 })

				expect(emitted.item).to.equal(container.items()[2])
				expect(emitted.oldIndex).to.equal(0)
				expect(emitted.newIndex).to.equal(2)
			})

			it("reorder() still addresses the whole list", async () => {
				// Filtering is a matter of presentation; the programmatic API keeps
				// speaking about the list as it really is.
				const container = await fixture(listWithHidden(["Apple", "Orange", "Banana"], [1]))

				container.reorder(0, 2)

				expect(itemNames(container)).to.deep.equal(["Orange", "Banana", "Apple"])
			})
		})
	})
})
