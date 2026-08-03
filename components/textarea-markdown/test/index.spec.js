import { fixture, expect, oneEvent, waitUntil } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"
import "../lib/define.js"

const isApple = () => "userAgentData" in navigator
	? navigator.userAgentData.platform.toLowerCase().includes('mac')
	: /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)

const deepActiveElement = () => {
	let el = document.activeElement
	while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement
	return el
}

const shiftTab = async () => {
	await sendKeys({ down: "Shift" })
	await sendKeys({ press: "Tab" })
	await sendKeys({ up: "Shift" })
}

const undo = (el) => {
	el.focus()
	document.execCommand("undo")
}

const redo = (el) => {
	el.focus()
	document.execCommand("redo")
}

const shortcut = async (key, ...extraModifiers) => {
	const modifiers = [isApple() ? "Meta" : "Control", ...extraModifiers]
	try {
		for (const m of modifiers) await sendKeys({ down: m })
		await sendKeys({ press: key })
	} finally {
		for (const m of [...modifiers].reverse()) await sendKeys({ up: m })
	}
}

describe("textarea-markdown", () => {
	const milliseconds = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
	const focusStart = (container) => container.querySelector("#start").focus()
	const getLabel = (container) => container.querySelector("label")
	const getTextarea = (container) => container.querySelector("textarea-markdown")
	const getButton = (container) => container.querySelector("button")
	const getInnerTextarea = (container) => getTextarea(container).shadowRoot?.querySelector("textarea")
	const getMenuButton = (container, name) => getTextarea(container).shadowRoot?.querySelector(`[aria-label="${name}"]`)

	const submitForm = (form) => {
		return new Promise((resolve, reject) => {
			form.addEventListener("submit", (e) => {
				e.preventDefault()
				// console.log(Object.fromEntries(new FormData(e.target).entries()))
				const mdValue = new FormData(e.target).get("md")

				resolve(mdValue)
			}, { once: true })

			getTextarea(form).addEventListener("invalid", (e) => {
				e.preventDefault()
				const message = e.target.validationMessage

				reject(message)
			}, { once: true })

			form.querySelector("#submit").click()
		})
	}

	const resetForm = async (form) => {
		const submitEvent = oneEvent(form, "reset")
		form.querySelector("#reset").click()
		await submitEvent
	}
	
	describe("forms", () => {
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

		it("resets in a form correctly", async () => {
			const form = await fixture(`
				<form>
					<label for="md">Markdown</label>
					<textarea-markdown id="md" name="md">Some Value</textarea-markdown>
					<button id="submit" type="submit">Submit</button>
					<button id="reset" type="reset">Reset</button>
				</form>
			`)

			const textarea = getTextarea(form)
			const innerTextarea = getInnerTextarea(form)
			innerTextarea.focus()
			await sendKeys({ type: "New Value" })
			const mdValue = await submitForm(form)
			expect(mdValue).to.equal("Some ValueNew Value")

			await resetForm(form)
			const mdValueAfterReset = await submitForm(form)
			expect(mdValueAfterReset).to.equal("Some Value")
		})

		it("respects validity", async () => {
			const form = await fixture(`
				<form>
					<label for="md">Markdown</label>
					<textarea-markdown id="md" name="md" required></textarea-markdown>
					<button id="submit" type="submit">Submit</button>
				</form>
			`)

			const error = await submitForm(form).catch((e) => e)
			expect(error).to.equal("Please fill out this field.")

			getTextarea(form).value = "Hello!"
			const value = await submitForm(form).catch((e) => e)
			expect(value).to.equal("Hello!")
		})

		it("custom validity", async () => {
			const form = await fixture(`
				<form>
					<label for="md">Markdown</label>
					<textarea-markdown id="md" name="md">has text</textarea-markdown>
					<button id="submit" type="submit">Submit</button>
				</form>
			`)

			const textarea = getTextarea(form)
			textarea.setCustomValidity("it bork")

			const error = await submitForm(form).catch((e) => e)
			expect(error).to.equal("it bork")
		})
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
			expect(textarea.defaultValue).to.equal("Original Value")
			expect(textarea.textContent).to.equal("Original Value")
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
			expect(textarea.defaultValue).to.equal("New Value")
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
			expect(textarea.defaultValue).to.equal("Original Value")
			expect(textarea.textContent).to.equal("Original Value")
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

			it("keyboard shortcut - bold", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">hello world</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				innerTextarea.focus()
				innerTextarea.selectionStart = 6
				innerTextarea.selectionEnd = 11
				await shortcut("b")

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("hello **world**")
			})

			it("keyboard shortcut - italic", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">hello world</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				innerTextarea.focus()
				innerTextarea.selectionStart = 6
				innerTextarea.selectionEnd = 11
				await shortcut("i")

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("hello _world_")
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

			it("no space in the header", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">###header</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				const headerButton = getMenuButton(form, "Header")
				innerTextarea.focus()

				headerButton.click()
				let submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("####header")

				headerButton.click()
				submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("header")

				headerButton.click()
				submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("## header")
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

			it("cancelling a current list", async () => {
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
				await sendKeys({ press: "Enter" })
				await sendKeys({ type: "next" })

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("- first\nnext")
			})

			it("toggling many lines at once", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">first\nsecond\nthird\nfourth</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				const unorderedListButton = getMenuButton(form, "Unordered List")
				innerTextarea.focus()
				innerTextarea.selectionStart = 2
				innerTextarea.selectionEnd = 18
				unorderedListButton.click()
				
				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("- first\n- second\n- third\nfourth")
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

			it("keyboard shortcut", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">first\nsecond\nthird\nfourth</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				innerTextarea.focus()
				innerTextarea.selectionStart = 2
				innerTextarea.selectionEnd = 18
				await shortcut("8", "Shift")
				
				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("- first\n- second\n- third\nfourth")
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

			it("cancelling a current list", async () => {
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
				await sendKeys({ press: "Enter" })
				await sendKeys({ type: "next" })

				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("1. first\nnext")
			})

			it("toggling many lines at once", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">first\nsecond\nthird\nfourth</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				const orderedListButton = getMenuButton(form, "Ordered List")
				innerTextarea.focus()
				innerTextarea.selectionStart = 2
				innerTextarea.selectionEnd = 18
				orderedListButton.click()
				
				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("1. first\n2. second\n3. third\nfourth")
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

			it("keyboard shortcut", async () => {
				const form = await fixture(`
					<form>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md">first\nsecond\nthird\nfourth</textarea-markdown>
						<button id="submit" type="submit">Submit</button>
					</form>
				`)

				const innerTextarea = getInnerTextarea(form)
				innerTextarea.focus()
				innerTextarea.selectionStart = 2
				innerTextarea.selectionEnd = 18
				await shortcut("7", "Shift")
				
				const submittedValue = await submitForm(form)
				expect(submittedValue).to.equal("1. first\n2. second\n3. third\nfourth")
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

			// note: do not use to.equal, the comparison hangs indefinitely if it fails
			expect(deepActiveElement() === innerTextarea).to.be.true
		})

		it("toolbar uses arrows for navigation", async () => {
			const form = await fixture(`
				<form>
					<button id="start">start</button>
					<label for="md">Markdown</label>
					<textarea-markdown id="md" name="md"></textarea-markdown>
					<button id="submit" type="submit">Submit</button>
				</form>
			`)

			const textarea = getTextarea(form)
			const headerButton = getMenuButton(form, "Header")
			const boldButton = getMenuButton(form, "Bold")
			const italicButton = getMenuButton(form, "Italic")
			const innerTextarea = getInnerTextarea(form)

			focusStart(form)
			await sendKeys({ press: "Tab" })
			expect(deepActiveElement() === headerButton).to.be.true

			await sendKeys({ press: "ArrowRight" })
			expect(deepActiveElement() === boldButton).to.be.true

			await sendKeys({ press: "ArrowRight" })
			expect(deepActiveElement() === italicButton).to.be.true

			await sendKeys({ press: "ArrowLeft" })
			expect(deepActiveElement() === boldButton).to.be.true

			await sendKeys({ press: "Tab" })
			expect(deepActiveElement() === innerTextarea).to.be.true

			await shiftTab()
			expect(deepActiveElement() === boldButton).to.be.true
		})

		it("textbox matches label", async () => {
			const form = await fixture(`
				<form>
					<label for="md">Markdown</label>
					<textarea-markdown id="md" name="md"></textarea-markdown>
					<button id="submit" type="submit">Submit</button>
				</form>
			`)

			const innerTextarea = getInnerTextarea(form)
			expect(innerTextarea.getAttribute("aria-label")).to.equal("Markdown")

			const label = getLabel(form)
			label.textContent = "Updated Label"
			await waitUntil(() => {
				return innerTextarea.getAttribute("aria-label") === "Updated Label"
			}, "Accessible name did not update")
		})
	})

	describe("disabled", () => {
		it("with the attribute", async () => {
			const form = await fixture(`
				<form>
					<label for="md">Markdown</label>
					<textarea-markdown id="md" name="md" disabled></textarea-markdown>
					<button id="submit" type="submit">Submit</button>
				</form>
			`)

			const textarea = getTextarea(form)
			const innerTextarea = getInnerTextarea(form)
			innerTextarea.focus()
			await sendKeys({ type: "New Value" })
			const mdValue = await submitForm(form)

			expect(mdValue).to.equal(null) // disabled, see https://www.w3.org/TR/REC-html40-971218/interact/forms.html#h-17.12.1
		})

		it("in a fieldset", async () => {
			const form = await fixture(`
				<form>
					<fieldset disabled>
						<label for="md">Markdown</label>
						<textarea-markdown id="md" name="md"></textarea-markdown>
					</fieldset>
					<button id="submit" type="submit">Submit</button>
				</form>
			`)

			const textarea = getTextarea(form)
			const innerTextarea = getInnerTextarea(form)
			innerTextarea.focus()
			await sendKeys({ type: "New Value" })
			const mdValue = await submitForm(form)

			expect(mdValue).to.equal(null)
		})
	})

	describe("events", () => {
		it("change", async () => {
			const form = await fixture(`
				<form>
					<label for="md">Markdown</label>
					<textarea-markdown id="md" name="md"></textarea-markdown>
					<button id="submit" type="submit">Submit</button>
				</form>
			`)

			const textarea = getTextarea(form)

			const emittedPromise = new Promise((resolve) => {
				textarea.addEventListener("change", (e) => {
					resolve(e)	
				})
			})

			const innerTextarea = getInnerTextarea(form)
			innerTextarea.focus()
			await sendKeys({ type: "New Value" })
			getButton(form).focus()
			
			const emitted = await emittedPromise
			
			expect(emitted.target.value).to.equal("New Value")
		})

		it("input", async () => {
			const form = await fixture(`
				<form>
					<label for="md">Markdown</label>
					<textarea-markdown id="md" name="md"></textarea-markdown>
					<button id="submit" type="submit">Submit</button>
				</form>
			`)

			const textarea = getTextarea(form)

			let emitted = []
			textarea.addEventListener("input", (e) => {
				emitted.push(e)
			})

			const innerTextarea = getInnerTextarea(form)
			innerTextarea.focus()
			await sendKeys({ type: "New Value" })

			expect(emitted.length).to.equal(9)
		})

		it("menu button causes change", async () => {
			const form = await fixture(`
				<form>
					<label for="md">Markdown</label>
					<textarea-markdown id="md" name="md">hello</textarea-markdown>
					<button id="submit" type="submit">Submit</button>
				</form>
			`)

			const textarea = getTextarea(form)

			const emittedPromise = new Promise((resolve) => {
				textarea.addEventListener("change", (e) => {
					resolve(e)	
				})
			})

			const innerTextarea = getInnerTextarea(form)
			const headerButton = getMenuButton(form, "Header")
			innerTextarea.focus()
			headerButton.click()

			const submittedValue = await submitForm(form)
			expect(submittedValue).to.equal("## hello")
			getButton(form).focus()
			
			const emitted = await emittedPromise
			expect(emitted.target.value).to.equal("## hello")
		})
	})

	describe("undoing", () => {
		it("buttons are undoable", async () => {
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

			undo(innerTextarea)

			let submittedValue = await submitForm(form)
			expect(submittedValue).to.equal("hello world")

			redo(innerTextarea)

			submittedValue = await submitForm(form)
			expect(submittedValue).to.equal("hello **world**")
		})
	})
})
