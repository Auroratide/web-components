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
	
			expect(accessibleText(elem)).to.equal("Front")
	
			await elem.flip()
			expect(accessibleText(elem)).to.equal("Back")
	
			await elem.flip()
			expect(accessibleText(elem)).to.equal("Front")
		})

		it("using the property", async () => {
			const elem = await fixture(`
				<flip-card>
					<section slot="front">Front</section>
					<section slot="back">Back</section>
				</flip-card>
			`)
	
			expect(accessibleText(elem)).to.equal("Front")
	
			elem.facedown = true
			expect(accessibleText(elem)).to.equal("Back")
	
			elem.facedown = false
			expect(accessibleText(elem)).to.equal("Front")
		})

		it("using attributes", async () => {
			const elem = await fixture(`
				<flip-card>
					<section slot="front">Front</section>
					<section slot="back">Back</section>
				</flip-card>
			`)
	
			expect(accessibleText(elem)).to.equal("Front")
	
			elem.toggleAttribute("facedown", true)
			expect(accessibleText(elem)).to.equal("Back")
	
			elem.toggleAttribute("facedown", false)
			expect(accessibleText(elem)).to.equal("Front")
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
