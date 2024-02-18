import { fixture, expect, oneEvent } from "@open-wc/testing"
import { FLIPPING, FLIPPED } from "../lib/events.js"
import "../lib/define.js"

describe("flip-card", () => {
	const getTextContent = (elem) => {
		if (elem.nodeName === "STYLE")
			return ""
		if (elem.getAttribute?.("aria-hidden") === "true")
			return ""
		if (elem.nodeName === "SLOT")
			return Array.from(elem.assignedNodes()).map(getTextContent).join("").trim()
		if (elem.nodeType === Node.TEXT_NODE)
			return elem.textContent.trim()

		return Array.from(elem.childNodes).map(getTextContent).join("").trim()
	}

	const accessibleText = (elem) => {
		return getTextContent(elem.shadowRoot)
	}

	const milliseconds = (n) => new Promise(resolve => setTimeout(resolve, n))

	describe("flipping the card", () => {
		it("using Javascript API", async () => {
			const elem = await fixture(`
				<flip-card>
					<section slot="front">Front</section>
					<section slot="back">Back</section>
				</flip-card>
			`)
	
			expect(accessibleText(elem)).to.equal("(Frontside)Front")
	
			await elem.flip()
			expect(accessibleText(elem)).to.equal("(Backside)Back")
	
			await elem.flip()
			expect(accessibleText(elem)).to.equal("(Frontside)Front")
		})

		it("using the property", async () => {
			const elem = await fixture(`
				<flip-card>
					<section slot="front">Front</section>
					<section slot="back">Back</section>
				</flip-card>
			`)
	
			expect(accessibleText(elem)).to.equal("(Frontside)Front")
	
			elem.facedown = true
			expect(accessibleText(elem)).to.equal("(Backside)Back")
	
			elem.facedown = false
			expect(accessibleText(elem)).to.equal("(Frontside)Front")
		})

		it("using attributes", async () => {
			const elem = await fixture(`
				<flip-card>
					<section slot="front">Front</section>
					<section slot="back">Back</section>
				</flip-card>
			`)
	
			expect(accessibleText(elem)).to.equal("(Frontside)Front")
	
			elem.toggleAttribute("facedown", true)
			expect(accessibleText(elem)).to.equal("(Backside)Back")
	
			elem.toggleAttribute("facedown", false)
			expect(accessibleText(elem)).to.equal("(Frontside)Front")
		})
	})

	describe("focus", () => {
		it("skip button on non-visible side", async () => {
			const container = await fixture(`
				<div>
					<button id="start">Start</button>
					<flip-card>
						<section slot="front">
							<button id="front">Front</button>
						</section>
						<section slot="back">
							<button id="back">Back</button>
						</section>
					</flip-card>
					<button id="end">End</button>
				</div>
			`)

			container.querySelector("#start").focus()

			pressTab()
			expect(document.activeElement).to.equal(container.querySelector("#front"))

			pressTab()
			expect(document.activeElement).to.equal(container.querySelector("#end"))
		})

		it("card flipped while focused on visible side", async () => {
			const container = await fixture(`
				<div>
					<button id="start">Start</button>
					<flip-card>
						<section slot="front">
							<button id="front">Front</button>
						</section>
						<section slot="back">
							<button id="back">Back</button>
						</section>
					</flip-card>
					<button id="end">End</button>
				</div>
			`)

			container.querySelector("#start").focus()

			pressTab()
			expect(document.activeElement).to.equal(container.querySelector("#front"))

			container.querySelector("flip-card").flip()

			pressTab()
			expect(document.activeElement).to.equal(container.querySelector("#back"))
		})
	})

	describe("events", () => {
		it("flip card", async () => {
			const elem = await fixture(`
				<flip-card style="--flip-duration: 5ms;">
					<section slot="front">Front</section>
					<section slot="back">Back</section>
				</flip-card>
			`)

			let flippingEvent = oneEvent(elem, FLIPPING)
			elem.flip()

			let { detail } = await flippingEvent
			expect(detail.facedown).to.be.true

			;({ detail } = await oneEvent(elem, FLIPPED))
			expect(detail.facedown).to.be.true

			// now the other way
			flippingEvent = oneEvent(elem, FLIPPING)
			elem.flip()

			;({ detail } = await flippingEvent)
			expect(detail.facedown).to.be.false

			;({ detail } = await oneEvent(elem, FLIPPED))
			expect(detail.facedown).to.be.false
		})

		it("cancelling mid-flip", async () => {
			const elem = await fixture(`
				<flip-card style="--flip-duration: 15ms;">
					<section slot="front">Front</section>
					<section slot="back">Back</section>
				</flip-card>
			`)

			let flippedFacedown = undefined
			elem.addEventListener(FLIPPED, (event) => {
				if (event.detail.facedown) {
					throw new Error("This event should have been cancelled")
				}

				flippedFacedown = event.detail.facedown
			})

			elem.flip()
			expect(flippedFacedown).to.be.undefined

			await milliseconds(5)

			elem.flip()
			const { detail } = await oneEvent(elem, FLIPPED)
			expect(detail.facedown).to.be.false
		})
	})
})

// It feels pretty insane simulating this...
const pressTab = () => {
	const tabOrder = getTabOrder()

	const index = tabOrder.indexOf(document.activeElement)
	if (index > -1) {
		const nextElement = tabOrder[index + 1] || tabOrder[0]
		nextElement.focus()
	} else {
		const allNodes = getAllNodes()
		const index = allNodes.indexOf(document.activeElement)
		if (index > -1) {
			const nextElement = allNodes.slice(index + 1).find((node) => tabOrder.includes(node))
			nextElement?.focus()
		}
	}
}

const getTabOrder = (elem = document.body) => {
	if (isInteractive(elem))
		return [elem]

	if (elem.nodeName === "STYLE" || elem.nodeName === "SCRIPT" || elem.nodeName === "TEMPLATE")
		return []
	if (elem.hasAttribute?.("inert"))
		return []
	if (elem.nodeName === "SLOT")
		return Array.from(elem.assignedNodes()).flatMap(getTabOrder)
	if (elem.shadowRoot)
		return getTabOrder(elem.shadowRoot)

	return Array.from(elem.childNodes).flatMap(getTabOrder)
}

const isInteractive = (element) => {
	return (
		(element.tagName === "A" || element.tagName === "BUTTON" || element.tagName === "INPUT") &&
		!element.disabled &&
		!element.hidden &&
		!element.inert
	)
}

const getAllNodes = (node = document.body, nodes = []) => {
	nodes.push(node)
	nodes.push(...(Array.from(node.childNodes ?? []).map((node) => getAllNodes(node, nodes))))

	return nodes.filter((node) => node?.nodeType === Node.ELEMENT_NODE)
}
