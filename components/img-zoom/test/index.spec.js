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

	describe("DOM Manipulation", () => {
		it("img is changed", async () => {
			const elem = await fixture(`
				<img-zoom>
					<img src="/original.png" alt="image" />
				</img-zoom>
			`)

			const zoomIn = elem.shadowRoot.querySelector("#zoom-in")
			const dialog = elem.shadowRoot.querySelector("dialog")

			elem.innerHTML = "<img src=\"/changed.png\" alt=\"image\" />"

			await zoomIn.click()
			expect(dialog.querySelector("img").getAttribute("src")).to.eq("/changed.png")
		})

		it("source in picture is changed", async () => {
			const elem = await fixture(`
				<img-zoom>
					<picture>
						<source srcset="/original.png" type="image/png" />
						<img src="/original.png" alt="image" />
					</picture>
				</img-zoom>
			`)

			const zoomIn = elem.shadowRoot.querySelector("#zoom-in")
			const dialog = elem.shadowRoot.querySelector("dialog")

			elem.querySelector("picture").innerHTML = `
				<source srcset="/changed.png" type="image/png" />
				<img src="/changed.png" alt="image" />
			`

			await zoomIn.click()
			expect(dialog.querySelector("source").getAttribute("srcset"))
				.to.eq("/changed.png")
			expect(dialog.querySelector("img").getAttribute("src"))
				.to.eq("/changed.png")
		})
	})
})
