import { fixture, expect, oneEvent } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"
import "../lib/define.js"

describe("textarea-markdown", () => {
	const milliseconds = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
	const getTextarea = (container) => container.querySelector("textarea-markdown")
	const getInnerTextarea = (container) => getTextarea(container).shadowRoot?.querySelector("textarea")
	const submitForm = async (form) => {
		let mdValue = ""
		form.addEventListener("submit", (e) => {
			e.preventDefault()
			// console.log(Object.fromEntries(new FormData(e.target).entries()))
			mdValue = new FormData(e.target).get("md")
		}, { once: true })

		const submitEvent = oneEvent(form, "submit")
		form.querySelector("#submit").click()
		await submitEvent

		return mdValue
	}

	it("participates in the form", async () => {
		const form = await fixture(`
			<form>
				<label for="md">Markdown</label>
				<textarea-markdown id="md" name="md">Some Value</textarea-markdown>
				<button id="submit" type="submit">Submit</button>
			</form>
		`)

		const textarea = getTextarea(form)
		const mdValue = await submitForm(form)

		expect(textarea.form).to.equal(form)
		expect(mdValue).to.equal("Some Value")
	})

	describe("different ways to set the value", () => {
		it("value property", async () => {
			const form = await fixture(`
				<form>
					<label for="md">Markdown</label>
					<textarea-markdown id="md" name="md">Original Value</textarea-markdown>
					<button id="submit" type="submit">Submit</button>
				</form>
			`)

			const textarea = getTextarea(form)
			textarea.value = "New Value"

			const submittedValue = await submitForm(form)

			expect(submittedValue).to.equal("New Value")
			expect(textarea.value).to.equal("New Value")
			expect(textarea.textContent).to.equal("New Value")
		})

		it("textContent", async () => {
			const form = await fixture(`
				<form>
					<label for="md">Markdown</label>
					<textarea-markdown id="md" name="md">Original Value</textarea-markdown>
					<button id="submit" type="submit">Submit</button>
				</form>
			`)

			const textarea = getTextarea(form)
			textarea.textContent = "New Value"

			await milliseconds(50) // wait for mutation observer

			const submittedValue = await submitForm(form)

			expect(submittedValue).to.equal("New Value")
			expect(textarea.value).to.equal("New Value")
			expect(textarea.textContent).to.equal("New Value")
		})

		it("typing into the textarea field", async () => {
			const form = await fixture(`
				<form>
					<label for="md">Markdown</label>
					<textarea-markdown id="md" name="md">Original Value</textarea-markdown>
					<button id="submit" type="submit">Submit</button>
				</form>
			`)

			const textarea = getTextarea(form)
			const innerTextarea = getInnerTextarea(form)
			innerTextarea.focus()
			await sendKeys({ type: "New Value" })

			const submittedValue = await submitForm(form)

			expect(submittedValue).to.equal("Original ValueNew Value")
			expect(textarea.value).to.equal("Original ValueNew Value")
			expect(textarea.textContent).to.equal("Original ValueNew Value")
		})
	})
})
