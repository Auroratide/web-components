import { fixture, expect } from "@open-wc/testing"
import { CHANGED, COMMIT } from "../lib/events"
import { ReorderItemElement } from "../lib"
import "../lib/define.js"

/**
 * https://stackoverflow.com/questions/7208161/focus-next-element-in-tab-index
 * Removed the form constraint.
 */
const pressTab = () => {
	//add all elements we want to include in our selection
	var focussableElements = "a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex=\"-1\"])"
	if (document.activeElement) {
		var focussable = Array.prototype.filter.call(document.querySelectorAll(focussableElements),
			function (element) {
				//check for visibility while always include the current activeElement
				return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
			})
		var index = focussable.indexOf(document.activeElement)
		if(index > -1) {
			var nextElement = focussable[index + 1] || focussable[0]
			nextElement.focus()
		}
	}
}

const arrow = (direction) => ({
	key: `Arrow${direction}`,
	code: `Arrow${direction}`,
})

const alt = () => ({
	altKey: true,
})

const press = (key, ...modifiers) => {
	document.activeElement.dispatchEvent(new KeyboardEvent("keydown", {
		key: key.key,
		code: key.code,
		bubbles: true,
		cancelable: true,
		...modifiers.reduce((all, cur) => ({
			...all,
			...cur,
		}), {}),
	}))
}

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

describe("reorder-list", () => {
	beforeEach(() => {
		ReorderItemElement.START_DRAG_DELAY_MS = 10
	})

	describe("aria-requirements", () => {
		it("roles", async () => {
			const container = await fixture(`
				<reorder-list>
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
				</reorder-list>
			`)

			expect(container.getAttribute("role")).to.equal("listbox")
			container.querySelectorAll("reorder-item").forEach((item) => {
				expect(item.getAttribute("role")).to.equal("option")
			})
		})

		it("aria-selected and tabindex", async () => {
			const container = await fixture(`
				<reorder-list>
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
				</reorder-list>
			`)

			const items = container.querySelectorAll("reorder-item")

			expect(items[0].getAttribute("aria-selected")).to.equal("true")
			expect(items[0].getAttribute("tabindex")).to.equal("0")

			expect(items[1].getAttribute("aria-selected")).to.equal("false")
			expect(items[1].getAttribute("tabindex")).to.equal("-1")
		})

		it("aria-orientation", async () => {
			const list = await fixture(`
				<reorder-list orientation="horizontal">
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
				</reorder-list>
			`)

			expect(list.getAttribute("aria-orientation")).to.equal("horizontal")

			list.orientation = "vertical"
			expect(list.getAttribute("aria-orientation")).to.equal("vertical")
		})
	})

	describe("keyboard navigation", () => {
		it("tabbing through", async () => {
			const container = await fixture(`<div>
				<button id="focus-start">Focusable</button>
				<reorder-list>
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
				</reorder-list>
				<button id="focus-end">Focusable</button>
			</div>`)
            
			container.querySelector("#focus-start").focus()

			pressTab()
			expect(document.activeElement).to.equal(
				container.querySelectorAll("reorder-item")[0],
			)

			// The second item does NOT receive focus
			pressTab()
			expect(document.activeElement).to.equal(
				container.querySelector("#focus-end"),
			)
		})

		it("up/down navigation (vertical)", async () => {
			const container = await fixture(`
				<reorder-list>
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
					<reorder-item>Banana</reorder-item>
				</reorder-list>
			`)

			const items = container.querySelectorAll("reorder-item")
			items[0].focus()

			press(arrow("Down"))
			expect(document.activeElement).to.equal(items[1])

			press(arrow("Down"))
			expect(document.activeElement).to.equal(items[2])

			press(arrow("Down"))
			expect(document.activeElement).to.equal(items[2])

			press(arrow("Up"))
			expect(document.activeElement).to.equal(items[1])

			press(arrow("Up"))
			expect(document.activeElement).to.equal(items[0])
		})

		it("reordering an item (vertical)", async () => {
			const container = await fixture(`
				<reorder-list>
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
					<reorder-item>Banana</reorder-item>
				</reorder-list>
			`)

			let items = container.querySelectorAll("reorder-item")
			items[0].focus()

			press(arrow("Down"), alt())
			items = container.querySelectorAll("reorder-item")
			expect(document.activeElement).to.equal(items[1])
			expect(items[0].textContent).to.equal("Orange")
			expect(items[1].textContent).to.equal("Apple")

			press(arrow("Down"))
			press(arrow("Up"), alt())
			items = container.querySelectorAll("reorder-item")
			expect(document.activeElement).to.equal(items[1])
			expect(items[0].textContent).to.equal("Orange")
			expect(items[1].textContent).to.equal("Banana")
			expect(items[2].textContent).to.equal("Apple")
		})

		it("left/right navigation (horizontal)", async () => {
			const container = await fixture(`
				<reorder-list orientation="horizontal">
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
					<reorder-item>Banana</reorder-item>
				</reorder-list>
			`)

			const items = container.querySelectorAll("reorder-item")
			items[0].focus()

			press(arrow("Right"))
			expect(document.activeElement).to.equal(items[1])

			press(arrow("Right"))
			expect(document.activeElement).to.equal(items[2])

			press(arrow("Right"))
			expect(document.activeElement).to.equal(items[2])

			press(arrow("Left"))
			expect(document.activeElement).to.equal(items[1])

			press(arrow("Left"))
			expect(document.activeElement).to.equal(items[0])
		})

		it("reordering an item (horizontal)", async () => {
			const container = await fixture(`
				<reorder-list orientation="horizontal">
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
					<reorder-item>Banana</reorder-item>
				</reorder-list>
			`)

			let items = container.querySelectorAll("reorder-item")
			items[0].focus()

			press(arrow("Right"), alt())
			items = container.querySelectorAll("reorder-item")
			expect(document.activeElement).to.equal(items[1])
			expect(items[0].textContent).to.equal("Orange")
			expect(items[1].textContent).to.equal("Apple")

			press(arrow("Right"))
			press(arrow("Left"), alt())
			items = container.querySelectorAll("reorder-item")
			expect(document.activeElement).to.equal(items[1])
			expect(items[0].textContent).to.equal("Orange")
			expect(items[1].textContent).to.equal("Banana")
			expect(items[2].textContent).to.equal("Apple")
		})

		it("clicking on an item", async () => {
			const container = await fixture(`<div>
				<button id="focus-start">Focusable</button>
				<reorder-list>
					<reorder-item>Apple</reorder-item>
					<reorder-item>Orange</reorder-item>
					<reorder-item>Banana</reorder-item>
				</reorder-list>
				<button id="focus-end">Focusable</button>
			</div>`)

			container.querySelector("#focus-start").focus()

			await tap(container.querySelectorAll("reorder-item")[1])

			expect(document.activeElement).to.equal(
				container.querySelectorAll("reorder-item")[1],
			)
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

			expect(document.activeElement).not.to.eq(firstItem)
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

		it("committing", async () => {
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
