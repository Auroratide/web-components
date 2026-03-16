export class TextareaMarkdownElement extends HTMLElement {
	static readonly formAssociated = true
	static defaultElementName = "textarea-markdown"

	static html = `
		<div>
			<menu id="menu" part="menu">
				<li><button>B</button></li>
				<li><button>I</button></li>
			</menu>
			<textarea id="textarea" part="textarea"></textarea>
		</div>
	`

	static css = `
		:host {
			display: block;
		}

		menu {
			list-style: none;
			display: flex;
		}
	`

	static get observedAttributes() {
		return ["value"]
	}

	#internals = this.attachInternals()
	#textContentObserver = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type === "childList" && this.value !== this.textContent) {
				this.#setValue(this.textContent)
			}
		}
	})

	#menu: HTMLMenuElement
	#textarea: HTMLTextAreaElement

	constructor() {
		super()

		this.#createRoot()
	}

	get name(): string | null { return this.getAttribute("name") }
	set name(value: string | null) { this.setAttribute("name", value) }

	get form(): HTMLFormElement | null { return this.#internals.form }
	get validity(): ValidityState | null { return this.#internals.validity }
	get validationMessage(): string | null { return this.#internals.validationMessage }
	get willValidate(): boolean { return this.#internals.willValidate }

	checkValidity(): boolean { return this.#internals.checkValidity() }
	reportValidity(): boolean { return this.#internals.reportValidity() }

	formDisabledCallback(disabled: boolean) { this.toggleAttribute("disabled", disabled) }
	formResetCallback() {
		
	}

	get value(): string | null { return this.#textarea.value }
	set value(value: string | null) {
		this.#setValue(value ?? "")
	}

	connectedCallback() {
		this.#menu = this.shadowRoot?.querySelector("#menu")
		this.#textarea = this.shadowRoot?.querySelector("#textarea")

		this.#textarea.value = this.textContent
		this.#internals.setFormValue(this.#textarea.value)

		this.#textarea.addEventListener("change", this.#onChange)
		this.#textarea.addEventListener("input", this.#onInput)

		this.#textContentObserver.observe(this, {
			attributes: false,
			childList: true,
			subtree: false,
		})
	}

	disconnectedCallback() {
		this.#textarea.removeEventListener("change", this.#onChange)
		this.#textarea.removeEventListener("input", this.#onInput)
		this.#textContentObserver.disconnect()
	}

	attributeChangedCallback(attribute: string, oldValue: string, newValue: string) {
		this.#attributeCallbacks[attribute]?.(newValue, oldValue)
	}

	#attributeCallbacks = {
		"value": (newValue: string | undefined | null) => {
			this.#setValue(newValue)
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
