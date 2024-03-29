import { fixture, expect } from "@open-wc/testing"
import { CHANGED } from "../lib/events.js"
import "../lib/define.js"

/**
 * @param {Element} node 
 */
const asTabContainer = (node) => ({
	node: node,
	list: () => node.querySelector("tab-list"),
	tab: (name) => node.querySelector(`tab-item[for="${name}"]`),
	panel: (name) => node.querySelector(`#${name}`),
})

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

const enter = () => ({
	key: "Enter",
	code: "Enter",
})

const space = () => ({
	key: " ",
	code: "Space",
})

const home = () => ({
	key: "Home",
	code: "Home",
})

const end = () => ({
	key: "End",
	code: "End",
})

const press = (key) => {
	document.activeElement.dispatchEvent(new KeyboardEvent("keydown", {
		key: key.key,
		code: key.code,
		bubbles: true,
		cancelable: true,
	}))
}

describe("tab-list", () => {
	describe("aria requirements", () => {
		it("roles", async () => {
			const container = asTabContainer(await fixture(`<div>
                <tab-list>
                    <tab-item for="first" selected>First</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
            </div>`))
    
			expect(container.node.querySelector("tab-list").getAttribute("role")).to.equal("tablist")
			expect(container.node.querySelector("tab-item").getAttribute("role")).to.equal("tab")
			expect(container.node.querySelector("tab-panel").getAttribute("role")).to.equal("tabpanel")
		})

		it("aria-controls", async () => {
			const container = asTabContainer(await fixture(`<div>
                <tab-list>
                    <tab-item for="first" selected>First</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
            </div>`))
    
			expect(container.tab("first").getAttribute("aria-controls")).to.equal("first")
		})

		it("aria-selected", async () => {
			const container = asTabContainer(await fixture(`<div>
                <tab-list>
                    <tab-item for="first" selected>First</tab-item>
                    <tab-item for="second">First</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
                <tab-panel id="second"><p>Content of second.</p></tab-panel>
            </div>`))
    
			expect(container.tab("first").getAttribute("aria-selected")).to.equal("true")
			expect(container.tab("second").getAttribute("aria-selected")).to.equal("false")
		})

		it("aria-orientation", async () => {
			const container = asTabContainer(await fixture(`<div>
                <tab-list orientation="vertical">
                    <tab-item for="first" selected>First</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
            </div>`))

			expect(container.list().getAttribute("aria-orientation")).to.equal("vertical")
		})
	})

	it("standard tab selection", async () => {
		const container = asTabContainer(await fixture(`<div>
            <tab-list>
                <tab-item for="first" selected>First</tab-item>
                <tab-item for="second">Second</tab-item>
            </tab-list>
            <tab-panel id="first">
                <p>Content of first.</p>
            </tab-panel>
            <tab-panel id="second">
                <p>Content of second.</p>
            </tab-panel>
        </div>`))

		expect(container.panel("first").hidden).to.be.false
		expect(container.panel("second").hidden).to.be.true

		await container.tab("second").click()

		expect(container.panel("first").hidden).to.be.true
		expect(container.panel("second").hidden).to.be.false
	})

	describe("keyboard navigation", () => {
		it("tabbing through", async () => {
			const container = asTabContainer(await fixture(`<div>
                <button id="focus-start">Focusable</button>
                <tab-list>
                    <tab-item for="first">First</tab-item>
                    <tab-item for="second" selected>Second</tab-item>
                    <tab-item for="third">Third</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
                <tab-panel id="second"><p>Content of second.</p></tab-panel>
                <tab-panel id="third"><p>Content of third.</p></tab-panel>
            </div>`))
    
			container.node.querySelector("#focus-start").focus()
    
			pressTab()
			expect(document.activeElement).to.equal(container.tab("second"))
    
			pressTab()
			expect(document.activeElement).to.equal(container.panel("second"))
		})

		it("left/right navigation", async () => {
			const container = asTabContainer(await fixture(`<div>
                <tab-list>
                    <tab-item for="first">First</tab-item>
                    <tab-item for="second" selected>Second</tab-item>
                    <tab-item for="third">Third</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
                <tab-panel id="second"><p>Content of second.</p></tab-panel>
                <tab-panel id="third"><p>Content of third.</p></tab-panel>
            </div>`))
    
			container.tab("second").focus()
			expect(document.activeElement).to.equal(container.tab("second"))

			press(arrow("Left"))
			expect(document.activeElement).to.equal(container.tab("first"))

			press(arrow("Left"))
			expect(document.activeElement).to.equal(container.tab("third"))

			press(arrow("Right"))
			expect(document.activeElement).to.equal(container.tab("first"))

			press(arrow("Right"))
			expect(document.activeElement).to.equal(container.tab("second"))
		})

		it("selecting a tab", async () => {
			const container = asTabContainer(await fixture(`<div>
                <tab-list>
                    <tab-item for="first">First</tab-item>
                    <tab-item for="second" selected>Second</tab-item>
                    <tab-item for="third">Third</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
                <tab-panel id="second"><p>Content of second.</p></tab-panel>
                <tab-panel id="third"><p>Content of third.</p></tab-panel>
            </div>`))

			container.tab("second").focus()

			press(arrow("Left"))
			press(enter())
			pressTab()
			expect(document.activeElement).to.equal(container.panel("first"))

			container.tab("first").focus()
			press(arrow("Left"))
			press(space())
			pressTab()
			expect(document.activeElement).to.equal(container.panel("third"))
		})

		it("vertical orientation", async () => {
			const container = asTabContainer(await fixture(`<div>
                <tab-list orientation="vertical">
                    <tab-item for="first">First</tab-item>
                    <tab-item for="second" selected>Second</tab-item>
                    <tab-item for="third">Third</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
                <tab-panel id="second"><p>Content of second.</p></tab-panel>
                <tab-panel id="third"><p>Content of third.</p></tab-panel>
            </div>`))

			container.tab("second").focus()

			press(arrow("Up"))
			expect(document.activeElement).to.equal(container.tab("first"))

			press(arrow("Up"))
			expect(document.activeElement).to.equal(container.tab("third"))

			press(arrow("Down"))
			expect(document.activeElement).to.equal(container.tab("first"))

			press(arrow("Down"))
			expect(document.activeElement).to.equal(container.tab("second"))

			press(arrow("Left"))
			expect(document.activeElement).to.equal(container.tab("second"))

			press(arrow("Right"))
			expect(document.activeElement).to.equal(container.tab("second"))
		})

		it("Home and End", async () => {
			const container = asTabContainer(await fixture(`<div>
                <tab-list>
                    <tab-item for="first" selected>First</tab-item>
                    <tab-item for="second">Second</tab-item>
                    <tab-item for="third">Third</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
                <tab-panel id="second"><p>Content of second.</p></tab-panel>
                <tab-panel id="third"><p>Content of third.</p></tab-panel>
            </div>`))

			container.tab("first").focus()
			expect(document.activeElement).to.equal(container.tab("first"))

			press(end())
			expect(document.activeElement).to.equal(container.tab("third"))

			press(home())
			expect(document.activeElement).to.equal(container.tab("first"))
		})
	})

	describe("activation", () => {
		it("automatic activation", async () => {
			const container = asTabContainer(await fixture(`<div>
                <tab-list activation="automatic">
                    <tab-item for="first" selected>First</tab-item>
                    <tab-item for="second">Second</tab-item>
                    <tab-item for="third">Third</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
                <tab-panel id="second"><p>Content of second.</p></tab-panel>
                <tab-panel id="third"><p>Content of third.</p></tab-panel>
            </div>`))

			container.tab("second").focus()
			expect(document.activeElement).to.equal(container.tab("second"))

			press(arrow("Left"))
			expect(container.panel("second").hidden).to.be.true
			expect(container.panel("first").hidden).to.be.false

			press(arrow("Left"))
			expect(container.panel("first").hidden).to.be.true
			expect(container.panel("third").hidden).to.be.false
		})
	})

	describe("events", () => {
		it("tabs are selected", async () => {
			const container = asTabContainer(await fixture(`<div>
                <tab-list>
                    <tab-item for="first" selected>First</tab-item>
                    <tab-item for="second">Second</tab-item>
                    <tab-item for="third">Third</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
                <tab-panel id="second"><p>Content of second.</p></tab-panel>
                <tab-panel id="third"><p>Content of third.</p></tab-panel>
            </div>`))

			let emitted = undefined
			container.list().addEventListener(CHANGED, e => {
				emitted = e.detail
			})

			container.tab("second").click()

			expect(emitted.from).to.equal(container.tab("first"))
			expect(emitted.to).to.equal(container.tab("second"))

			container.tab("third").click()

			expect(emitted.from).to.equal(container.tab("second"))
			expect(emitted.to).to.equal(container.tab("third"))

			container.tab("first").click()

			expect(emitted.from).to.equal(container.tab("third"))
			expect(emitted.to).to.equal(container.tab("first"))
		})

		it("the active tab is unselected", async () => {
			const container = asTabContainer(await fixture(`<div>
                <tab-list>
                    <tab-item for="first" selected>First</tab-item>
                    <tab-item for="second">Second</tab-item>
                    <tab-item for="third">Third</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
                <tab-panel id="second"><p>Content of second.</p></tab-panel>
                <tab-panel id="third"><p>Content of third.</p></tab-panel>
            </div>`))

			let emitted = undefined
			container.list().addEventListener(CHANGED, e => {
				emitted = e.detail
			})

			container.tab("first").selected = false

			// The first tab remains selected
			expect(emitted).to.be.undefined
		})
	})
})
