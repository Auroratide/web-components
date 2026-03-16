export class TextareaMarkdownElement extends HTMLElement {
	static readonly formAssociated = true
	static defaultElementName = "textarea-markdown"

	static html = `
		<div>
			<menu id="menu" part="menu">
				<li><button type="button" id="bold" aria-label="Bold">B</button></li>
				<li><button type="button" id="italic" aria-label="Italic">I</button></li>
			</menu>
			<textarea id="textarea"></textarea>
		</div>
	`

	static css = `
		:host {
			display: block;
		}

		menu {
			box-sizing: border-box;
			list-style: none;
			display: flex;
			padding: 0;
			justify-content: flex-end;
			gap: 0.25em;
			margin: 0 0 0.25em 0;
		}

		button {
			font-size: 1em;
			line-height: 1;
			inline-size: 1.5em;
			block-size: 1.5em;
			cursor: pointer;
		}

		textarea {
			box-sizing: border-box;
			font-size: 1em;
			display: block;
			inline-size: 100%;
		}

		#bold { font-weight: bold; }
		#italic { font-style: italic; }
	`

	static get observedAttributes() {
		return ["placeholder", "rows", "cols"]
	}

	#internals = this.attachInternals()
	#textContentObserver = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type === "childList" && this.value !== this.textContent) {
				this.#setValue(this.textContent)
			}
		}
	})

	#menu: {
		bold: HTMLButtonElement,
		italic: HTMLButtonElement,
	}
	#textarea: HTMLTextAreaElement

	constructor() {
		super()

		this.#createRoot()
	}

	get name(): string | null { return this.getAttribute("name") }
	set name(value: string | null) { this.setAttribute("name", value) }

	get placeholder(): string | null { return this.getAttribute("placeholder") }
	set placeholder(value: string | null) { this.setAttribute("placeholder", value) }

	get rows(): number | null {
		const value = this.getAttribute("rows")
		return value ? parseInt(value) : null
	}
	set rows(value: number | null) { this.setAttribute("rows", value?.toString()) }

	get cols(): number | null {
		const value = this.getAttribute("cols")
		return value ? parseInt(value) : null
	}
	set cols(value: number | null) { this.setAttribute("cols", value?.toString()) }

	get form(): HTMLFormElement | null { return this.#internals.form }
	get validity(): ValidityState | null { return this.#internals.validity }
	get validationMessage(): string | null { return this.#internals.validationMessage }
	get willValidate(): boolean { return this.#internals.willValidate }

	checkValidity(): boolean { return this.#internals.checkValidity() }
	reportValidity(): boolean { return this.#internals.reportValidity() }

	formDisabledCallback(disabled: boolean) { this.toggleAttribute("disabled", disabled) }
	formResetCallback() {
		this.#setValue("")
	}

	get value(): string | null { return this.#textarea.value }
	set value(value: string | null) {
		this.#setValue(value ?? "")
	}

	connectedCallback() {
		this.#menu = {
			bold: this.shadowRoot?.querySelector("#bold"),
			italic: this.shadowRoot?.querySelector("#italic"),
		}
		this.#textarea = this.shadowRoot?.querySelector("#textarea")

		this.#textarea.value = this.textContent
		this.#internals.setFormValue(this.#textarea.value)

		this.#textarea?.setAttribute("placeholder", this.placeholder)
		this.#textarea?.setAttribute("rows", this.rows?.toString())
		this.#textarea?.setAttribute("cols", this.cols?.toString())

		this.#textarea.addEventListener("change", this.#onChange)
		this.#textarea.addEventListener("input", this.#onInput)

		this.#menu.bold.addEventListener("pointerdown", this.#toggleBold)
		this.#menu.bold.addEventListener("click", this.#toggleBold)
		this.#menu.italic.addEventListener("pointerdown", this.#toggleItalic)
		this.#menu.italic.addEventListener("click", this.#toggleItalic)

		this.#textContentObserver.observe(this, {
			attributes: false,
			childList: true,
			subtree: false,
		})
	}

	disconnectedCallback() {
		this.#textarea.removeEventListener("change", this.#onChange)
		this.#textarea.removeEventListener("input", this.#onInput)
		this.#menu.bold.removeEventListener("pointerdown", this.#toggleBold)
		this.#menu.bold.removeEventListener("click", this.#toggleBold)
		this.#menu.italic.removeEventListener("pointerdown", this.#toggleItalic)
		this.#menu.italic.removeEventListener("click", this.#toggleItalic)

		this.#textContentObserver.disconnect()
	}

	attributeChangedCallback(attribute: string, oldValue: string, newValue: string) {
		this.#attributeCallbacks[attribute]?.(newValue, oldValue)
	}

	#attributeCallbacks = {
		"value": (newValue: string | undefined | null) => {
			this.#setValue(newValue)
		},
		"placeholder": (newValue: string | undefined | null) => {
			this.#textarea?.setAttribute("placeholder", newValue)
		},
		"rows": (newValue: string | undefined | null) => {
			this.#textarea?.setAttribute("rows", newValue)
		},
		"cols": (newValue: string | undefined | null) => {
			this.#textarea?.setAttribute("cols", newValue)
		},
	}

	#onChange = (e: Event) => {
		const target = e.target as HTMLTextAreaElement
		this.#setValue(target.value)
	}

	#onInput = (e: Event) => {
		const target = e.target as HTMLTextAreaElement
		this.#setValue(target.value)
	}

	#toggleInlineStyle = (style: string) => (e: Event) => {
		e.preventDefault()
		const start = this.#textarea.selectionStart
		const end = this.#textarea.selectionEnd
		const value = this.#textarea.value

		const alreadyStyled = value.slice(start - style.length, start) === style && value.slice(end, end + style.length) === style

		// TODO: figure out how to make this undoable
		if (alreadyStyled) {
			this.#setValue(value.slice(0, start - style.length) + value.slice(start, end) + value.slice(end + style.length))
			this.#textarea.selectionStart = start - style.length
			this.#textarea.selectionEnd = end - style.length
		} else {
			this.#setValue(value.slice(0, start) + style + value.slice(start, end) + style + value.slice(end))
			this.#textarea.selectionStart = start + style.length
			this.#textarea.selectionEnd = end + style.length
		}

		this.#textarea.focus()
	}

	#toggleBold = this.#toggleInlineStyle("**")
	#toggleItalic = this.#toggleInlineStyle("_")

	#setValue = (value: string) => {
		this.#internals.setFormValue(value)
		this.#textarea.value = value
		this.textContent = value
	}

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = TextareaMarkdownElement.css

		const template = document.createElement("template")
		template.innerHTML = TextareaMarkdownElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
