import { Icon } from "./icons.js"

export class TextareaMarkdownElement extends HTMLElement {
	static readonly formAssociated = true
	static defaultElementName = "textarea-markdown"

	static html = `
		<div>
			<menu id="menu" part="menu">
				<li><button type="button" id="header" aria-label="Header">${Icon.header}</button></li>
				<li><button type="button" id="bold" aria-label="Bold">${Icon.bold}</button></li>
				<li><button type="button" id="italic" aria-label="Italic">${Icon.italic}</button></li>
				<li><button type="button" id="unordered-list" aria-label="Unordered List">${Icon.unorderedList}</button></li>
				<li><button type="button" id="ordered-list" aria-label="Ordered List">${Icon.orderedList}</button></li>
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
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
		}

		textarea {
			box-sizing: border-box;
			font-size: 1em;
			display: block;
			inline-size: 100%;
		}
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
		header: HTMLButtonElement,
		bold: HTMLButtonElement,
		italic: HTMLButtonElement,
		unorderedList: HTMLButtonElement,
		orderedList: HTMLButtonElement,
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
	get labels(): NodeList { return this.#internals.labels }
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

	focus(options: FocusOptions) {
		this.#textarea?.focus(options)
	}

	connectedCallback() {
		this.#menu = {
			header: this.shadowRoot?.querySelector("#header"),
			bold: this.shadowRoot?.querySelector("#bold"),
			italic: this.shadowRoot?.querySelector("#italic"),
			unorderedList: this.shadowRoot?.querySelector("#unordered-list"),
			orderedList: this.shadowRoot?.querySelector("#ordered-list"),
		}
		this.#textarea = this.shadowRoot?.querySelector("#textarea")

		this.#textarea.value = this.textContent
		this.#internals.setFormValue(this.#textarea.value)

		if (!this.hasAttribute("tabindex")) {
			this.setAttribute("tabindex", "0")
		}

		this.addEventListener("focus", this.#onFocus)

		this.#syncAttribute("placeholder")
		this.#syncAttribute("rows")
		this.#syncAttribute("cols")

		this.#textarea.addEventListener("change", this.#onChange)
		this.#textarea.addEventListener("input", this.#onInput)

		this.#menu.header.addEventListener("click", this.#toggleHeader)
		this.#menu.bold.addEventListener("click", this.#toggleBold)
		this.#menu.italic.addEventListener("click", this.#toggleItalic)
		this.#menu.unorderedList.addEventListener("click", this.#toggleUnorderedList)
		this.#menu.orderedList.addEventListener("click", this.#toggleOrderedList)

		this.#textContentObserver.observe(this, {
			attributes: false,
			childList: true,
			subtree: false,
		})
	}

	disconnectedCallback() {
		this.#textarea.removeEventListener("change", this.#onChange)
		this.#textarea.removeEventListener("input", this.#onInput)
		this.#menu.header.removeEventListener("click", this.#toggleHeader)
		this.#menu.bold.removeEventListener("click", this.#toggleBold)
		this.#menu.italic.removeEventListener("click", this.#toggleItalic)
		this.#menu.unorderedList.removeEventListener("click", this.#toggleUnorderedList)
		this.#menu.orderedList.removeEventListener("click", this.#toggleOrderedList)
		this.removeEventListener("focus", this.#onFocus)

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
			this.#syncAttribute("placeholder", newValue)
		},
		"rows": (newValue: string | undefined | null) => {
			this.#syncAttribute("rows", newValue)
		},
		"cols": (newValue: string | undefined | null) => {
			this.#syncAttribute("cols", newValue)
		},
	}

	#onChange = (e: Event) => {
		const target = e.target as HTMLTextAreaElement
		this.#setValue(target.value)
	}

	#onInput = (e: InputEvent) => {
		const target = e.target as HTMLTextAreaElement
		this.#setValue(target.value)

		if (e.inputType === "insertLineBreak") {
			this.#continueList()
		}
	}

	#onFocus = () => {
		this.#textarea?.focus()
	}

	#syncAttribute = (attribute: string, value?: string | null | undefined) => {
		if (this.hasAttribute(attribute) || value != null) {
			this.#textarea?.setAttribute(attribute, value ?? this.getAttribute(attribute))
		} else {
			this.#textarea?.removeAttribute(attribute)
		}
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

	#toggleHeader = (e: Event) => {
		e.preventDefault()
		const start = this.#textarea.selectionStart
		const end = this.#textarea.selectionEnd
		const value = this.#textarea.value

		const startOfLine = this.#getStartOfLine()

		const currentHeadingLevel = value.slice(startOfLine).match(/^#+/)?.[0]?.length ?? 0
		if (currentHeadingLevel === 0) {
			this.#setValue(value.slice(0, startOfLine) + "## " + value.slice(startOfLine))
			this.#textarea.selectionStart = start + 3
			this.#textarea.selectionEnd = end + 3
		} else if (currentHeadingLevel >= 4) {
			this.#setValue(value.slice(0, startOfLine) + value.slice(startOfLine + currentHeadingLevel + 1))
			this.#textarea.selectionStart = start - currentHeadingLevel - 1
			this.#textarea.selectionEnd = end - currentHeadingLevel - 1
		} else {
			this.#setValue(value.slice(0, startOfLine) + "#" + value.slice(startOfLine))
			this.#textarea.selectionStart = start + 1
			this.#textarea.selectionEnd = end + 1
		}

		this.#textarea.focus()
	}

	#toggleList = (ordered: boolean) => (e: Event) => {
		e.preventDefault()
		const start = this.#textarea.selectionStart
		const end = this.#textarea.selectionEnd
		const value = this.#textarea.value

		const startOfLine = this.#getStartOfLine()
		const listType = this.#getListType(startOfLine)

		if (listType == null) {
			const newListStart = ordered ? "1. " : "- "

			this.#setValue(value.slice(0, startOfLine) + newListStart + value.slice(startOfLine))
			this.#textarea.selectionStart = start + newListStart.length
			this.#textarea.selectionEnd = end + newListStart.length
		} else {
			this.#setValue(value.slice(0, startOfLine) + value.slice(startOfLine + listType.length))
			this.#textarea.selectionStart = start - listType.length
			this.#textarea.selectionEnd = end - listType.length
		}

		this.#textarea.focus()
	}

	#toggleUnorderedList = this.#toggleList(false)
	#toggleOrderedList = this.#toggleList(true)

	#continueList = () => {
		const start = this.#textarea.selectionStart
		const startOfLine = this.#getStartOfLine(start - 1)
		const listType = this.#getListType(startOfLine)

		const value = this.value

		if (listType) {
			let nextListType = listType
			if (!isNaN(parseInt(listType))) {
				nextListType = `${parseInt(listType) + 1}. `
			}

			this.#setValue(value.slice(0, start) + nextListType + value.slice(start))
			this.#textarea.selectionStart = start + nextListType.length
			this.#textarea.selectionEnd = start + nextListType.length
		}
	}

	#getListType = (startOfLine: number) => {
		const value = this.value
		return value.slice(startOfLine).match(/^(- |\* |\d+\. )/)?.[0]
	}

	#getStartOfLine = (cursorLocation?: number): number => {
		const start = cursorLocation ?? this.#textarea.selectionStart
		const value = this.#textarea.value

		let startOfLine = start - 1
		while (value[startOfLine] !== "\n" && startOfLine > 0) {
			startOfLine -= 1
		}

		return startOfLine <= 0 ? 0 : startOfLine + 1
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
