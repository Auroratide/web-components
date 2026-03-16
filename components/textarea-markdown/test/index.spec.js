import { fixture, expect, oneEvent } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"
import "../lib/define.js"

describe("textarea-markdown", () => {
	const milliseconds = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
	const getLabel = (container) => container.querySelector("label")
	const getTextarea = (container) => container.querySelector("textarea-markdown")
	const getInnerTextarea = (container) => getTextarea(container).shadowRoot?.querySelector("textarea")
	const getMenuButton = (container, name) => getTextarea(container).shadowRoot?.querySelector(`[aria-label="${name}"]`)
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

	describe("using them menu", () => {
		describe("inline styles", () => {
			it("at cursor location", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md"></textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				const boldButton = getMenuButton(form, "Bold")
				innerTextarea.focus()
				await sendKeys({ type: "hello " })
				boldButton.click()
				await sendKeys({ type: "world" })

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("hello **world**")
			})

			it("highlighted selection", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">hello world</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				const boldButton = getMenuButton(form, "Bold")
				innerTextarea.focus()
				innerTextarea.selectionStart = 6
				innerTextarea.selectionEnd = 11
				boldButton.click()

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("hello **world**")
			})

			it("undoing inline styles", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">hello **world**</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				const boldButton = getMenuButton(form, "Bold")
				innerTextarea.focus()
				innerTextarea.selectionStart = 8
				innerTextarea.selectionEnd = 13
				boldButton.click()

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("hello world")
			})
		})

		describe("header", () => {
			it("at cursor location", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md"></textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				const headerButton = getMenuButton(form, "Header")
				innerTextarea.focus()
				await sendKeys({ type: "hello" })
				headerButton.click()

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("## hello")
			})

			it("multiple clicks", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md"></textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				const headerButton = getMenuButton(form, "Header")
				innerTextarea.focus()

				headerButton.click()
				let submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("## ")

				headerButton.click()
				submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("### ")

				headerButton.click()
				submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("#### ")

				headerButton.click()
				submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("")
			})

			it("highlighted selection", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">hello\n\nworld</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				const headerButton = getMenuButton(form, "Header")
				innerTextarea.focus()
				innerTextarea.selectionStart = 7
				innerTextarea.selectionEnd = 12
				headerButton.click()

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("hello\n\n## world")
			})
		})

		describe("unordered lists", () => {
			it("at cursor location", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md"></textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				const unorderedListButton = getMenuButton(form, "Unordered List")
				innerTextarea.focus()
				await sendKeys({ type: "hello" })
				unorderedListButton.click()

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("- hello")
			})

			it("creating a new line while in a list", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">- first</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				innerTextarea.focus()
				innerTextarea.selectionStart = 7
				innerTextarea.selectionEnd = 7
				await sendKeys({ press: "Enter" })
				await sendKeys({ type: "next" })

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("- first\n- next")
			})

			it("undoing", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">- hello</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				const unorderedListButton = getMenuButton(form, "Unordered List")
				innerTextarea.focus()
				innerTextarea.selectionStart = 4
				innerTextarea.selectionEnd = 4
				unorderedListButton.click()

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("hello")
			})
		})

		describe("ordered lists", () => {
			it("at cursor location", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md"></textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				const orderedListButton = getMenuButton(form, "Ordered List")
				innerTextarea.focus()
				await sendKeys({ type: "hello" })
				orderedListButton.click()

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("1. hello")
			})

			it("creating a new line while in a list", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">1. first</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				innerTextarea.focus()
				innerTextarea.selectionStart = 8
				innerTextarea.selectionEnd = 8
				await sendKeys({ press: "Enter" })
				await sendKeys({ type: "next" })

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("1. first\n2. next")
			})

			it("undoing", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">1. hello</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				const orderedListButton = getMenuButton(form, "Ordered List")
				innerTextarea.focus()
				innerTextarea.selectionStart = 4
				innerTextarea.selectionEnd = 4
				orderedListButton.click()

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("hello")
			})
		})
	})

	describe("accessibility", () => {
		it("focuses the right thing when the associated label is selected", async () => {
			const form = await fixture(`
				<form>
					<label for="md">Markdown</label>
					<textarea-markdown id="md" name="md"></textarea-markdown>
					<button id="submit" type="submit">Submit</button>
				</form>
			`)

			const label = getLabel(form)
			const textarea = getTextarea(form)
			const innerTextarea = getInnerTextarea(form)

			label.click()

			expect(textarea.shadowRoot?.activeElement).to.equal(innerTextarea)
		})
	})
})
