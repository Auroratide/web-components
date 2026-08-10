import { fixture, expect } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"
import { CHANGED, COMMIT } from "../lib/events"
import { ReorderItemElement } from "../lib"
import "../lib/define.js"

const deepActiveElement = () => {
	let el = document.activeElement
	while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement
	return el
}

const describeElement = (el) => el == null
	? "nothing"
	: `<${el.localName}>${el.textContent?.trim().slice(0, 20) ?? ""}`

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

/**
 * A list whose items each carry an explicit handle. Until the default handle
 * exists, this is the only shape with a keyboard affordance.
 */
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

const itemNames = (container) => Array.from(
	container.querySelectorAll("reorder-item"),
).map((item) => item.querySelector("span, a").textContent.trim())

const handlesOf = (container) => container.querySelectorAll("reorder-handle")

describe("reorder-list", () => {
	beforeEach(() => {
		ReorderItemElement.START_DRAG_DELAY_MS = 10
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

		it("plain arrows also reorder", async () => {
			const container = await fixture(listMarkup(["Apple", "Orange", "Banana"]))

			handlesOf(container)[0].focus()

			await press("ArrowDown")
			expect(itemNames(container)).to.deep.equal(["Orange", "Apple", "Banana"])

			await press("ArrowUp")
			expect(itemNames(container)).to.deep.equal(["Apple", "Orange", "Banana"])
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
})
