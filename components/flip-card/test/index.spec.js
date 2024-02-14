import { fixture, expect } from "@open-wc/testing"
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
})
