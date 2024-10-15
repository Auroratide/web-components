import { fixture, expect, waitUntil } from "@open-wc/testing"
import "../lib/define.js"

describe("arched-text", () => {
	it("accessible text", async () => {
		const elem = await fixture("<arched-text>My text</arched-text>")
		const accessibleText = elem.shadowRoot.textContent

		expect(accessibleText.trim()).to.contain("My text")
	})

	it("changing the text", async () => {
		const elem = await fixture("<arched-text>My text</arched-text>")
		elem.innerHTML = "New text"

		await waitUntil(() => {
			const accessibleText = elem.shadowRoot.textContent
	
			return accessibleText.includes("New text")
		})
	})
})
