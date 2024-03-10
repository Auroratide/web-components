import { fixture, expect } from "@open-wc/testing"
import "../lib/define.js"

describe("img-zoom", () => {
	describe("zooming", () => {
		it("via buttons", async () => {
			const elem = await fixture(`
				<img-zoom>
					<img src="" alt="image" />
				</img-zoom>
			`)

			const zoomIn = elem.shadowRoot.querySelector("#zoom-in")
			const zoomOut = elem.shadowRoot.querySelector("#zoom-out")
			const dialog = elem.shadowRoot.querySelector("dialog")

			expect(dialog.open).to.be.false

			await zoomIn.click()
			expect(dialog.open).to.be.true

			await zoomOut.click()
			expect(dialog.open).to.be.false
		})

		it("via javascript", async () => {
			const elem = await fixture(`
				<img-zoom>
					<img src="" alt="image" />
				</img-zoom>
			`)

			const dialog = elem.shadowRoot.querySelector("dialog")

			expect(dialog.open).to.be.false

			elem.zoomIn()
			expect(dialog.open).to.be.true

			elem.zoomOut()
			expect(dialog.open).to.be.false
		})

		it("disabled", async () => {
			const elem = await fixture(`
				<img-zoom disabled>
					<img src="" alt="image" />
				</img-zoom>
			`)

			const zoomIn = elem.shadowRoot.querySelector("#zoom-in")
			const dialog = elem.shadowRoot.querySelector("dialog")

			expect(dialog.open).to.be.false

			await zoomIn.click()
			expect(dialog.open).to.be.false

			elem.disabled = false
			await zoomIn.click()
			expect(dialog.open).to.be.true
		})
	})
})
