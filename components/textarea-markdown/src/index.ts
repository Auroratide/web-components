import { Icon } from "./icons.js"

export class TextareaMarkdownElement extends HTMLElement {
	static readonly formAssociated = true
	static defaultElementName = "textarea-markdown"

	static validationMessages = {
		valueMissing: "Please fill out this field.",
	}

	static html = `
		<div>
			<menu id="menu" part="menu">
				<li><button part="button" type="button" id="header" aria-label="Header">${Icon.header}</button></li>
				<li><button part="button" type="button" id="bold" aria-label="Bold">${Icon.bold}</button></li>
				<li><button part="button" type="button" id="italic" aria-label="Italic">${Icon.italic}</button></li>
				<li><button part="button" type="button" id="unordered-list" aria-label="Unordered List">${Icon.unorderedList}</button></li>
				<li><button part="button" type="button" id="ordered-list" aria-label="Ordered List">${Icon.orderedList}</button></li>
			</menu>
			<textarea part="textarea" id="textarea"></textarea>
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

		:host(:disabled) button {
			opacity: 0.75;
			cursor: not-allowed;
		}

		:host(:disabled) textarea {
			cursor: not-allowed;
		}
	`

	static get observedAttributes() {
		return ["placeholder", "rows", "cols", "disabled", "required"]
	}

	#internals = this.attachInternals()
	#textContentObserver = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type === "childList" && this.value !== this.textContent) {
				this.#setValue(this.textContent)
			}
		}
	})

	#menu = (): {
		header: HTMLButtonElement,
		bold: HTMLButtonElement,
		italic: HTMLButtonElement,
		unorderedList: HTMLButtonElement,
		orderedList: HTMLButtonElement,
	} => {
		return {
			header: this.shadowRoot?.querySelector("#header") as HTMLButtonElement,
			bold: this.shadowRoot?.querySelector("#bold") as HTMLButtonElement,
			italic: this.shadowRoot?.querySelector("#italic") as HTMLButtonElement,
			unorderedList: this.shadowRoot?.querySelector("#unordered-list") as HTMLButtonElement,
			orderedList: this.shadowRoot?.querySelector("#ordered-list") as HTMLButtonElement,
		}
	}

	#textarea = (): HTMLTextAreaElement => {
		return this.shadowRoot?.querySelector("#textarea") as HTMLTextAreaElement
	}

	constructor() {
		super()

		this.#createRoot()
	}

	#setOrUnsetAttribute = (name: string, value: string | null | undefined) => {
		if (value == null) {
			this.removeAttribute(name)
		} else {
			this.setAttribute(name, value)
		}
	}

	get name(): string | null { return this.getAttribute("name") }
	set name(value: string | null) { this.#setOrUnsetAttribute("name", value) }

	get placeholder(): string | null { return this.getAttribute("placeholder") }
	set placeholder(value: string | null) { this.#setOrUnsetAttribute("placeholder", value) }

	get rows(): number | null {
		const value = this.getAttribute("rows")
		return value ? parseInt(value) : null
	}
	set rows(value: number | null) { this.#setOrUnsetAttribute("rows", value?.toString()) }

	get cols(): number | null {
		const value = this.getAttribute("cols")
		return value ? parseInt(value) : null
	}
	set cols(value: number | null) { this.#setOrUnsetAttribute("cols", value?.toString()) }

	get disabled(): boolean { return this.hasAttribute("disabled") }
	set disabled(value: boolean) { this.toggleAttribute("disabled", value) }

	get required(): boolean { return this.hasAttribute("required") }
	set required(value: boolean) { this.toggleAttribute("required", value) }

	get form(): HTMLFormElement | null { return this.#internals.form }
	get labels(): NodeList { return this.#internals.labels }
	get validity(): ValidityState { return this.#internals.validity }
	get validationMessage(): string | null { return this.#internals.validationMessage }
	get willValidate(): boolean { return this.#internals.willValidate }

	checkValidity(): boolean { return this.#internals.checkValidity() }
	reportValidity(): boolean { return this.#internals.reportValidity() }

	#customError = ""

	#validate = () => {
		const flags: ValidityStateFlags = {}
		let message = ""

		if (this.required && (this.value ?? "") === "") {
			flags.valueMissing = true
			message = TextareaMarkdownElement.validationMessages.valueMissing
		}

		if (this.#customError) {
			flags.customError = true
			message = this.#customError
		}

		if (Object.keys(flags).length > 0) {
			this.#internals.setValidity(flags, message, this.#textarea())
		} else {
			this.#internals.setValidity({})
		}
	}

	setCustomValidity(message: string) {
		this.#customError = message
		this.#validate()
	}

	formDisabledCallback(disabled: boolean) {
		const textarea = this.#textarea()
		const menu = this.#menu()

		textarea.disabled = disabled
		Object.values(menu).forEach((button) => {
			button.disabled = disabled
		})
	}
	formResetCallback() {
		this.#setValue(this.defaultValue)
	}

	get value(): string | null { return this.#textarea().value }
	set value(value: string | null) {
		this.#setValue(value ?? "")
	}

	get defaultValue(): string { return this.textContent?.trimStart() ?? "" }
	set defaultValue(value: string) { this.textContent = value }

	connectedCallback() {
		const menu = this.#menu()
		const textarea = this.#textarea()

		textarea.value = this.textContent.trimStart()
		this.#internals.setFormValue(textarea.value)

		this.#syncAttribute("placeholder")
		this.#syncAttribute("rows")
		this.#syncAttribute("cols")

		textarea.addEventListener("change", this.#onChange)
		textarea.addEventListener("input", this.#onInput)

		menu.header.addEventListener("click", this.#toggleHeader)
		menu.bold.addEventListener("click", this.#toggleBold)
		menu.italic.addEventListener("click", this.#toggleItalic)
		menu.unorderedList.addEventListener("click", this.#toggleUnorderedList)
		menu.orderedList.addEventListener("click", this.#toggleOrderedList)

		this.addEventListener("click", this.#onSelfClick)

		this.#textContentObserver.observe(this, {
			attributes: false,
			childList: true,
			subtree: false,
		})
	}

	disconnectedCallback() {
		const menu = this.#menu()
		const textarea = this.#textarea()

		textarea.removeEventListener("change", this.#onChange)
		textarea.removeEventListener("input", this.#onInput)
		menu.header.removeEventListener("click", this.#toggleHeader)
		menu.bold.removeEventListener("click", this.#toggleBold)
		menu.italic.removeEventListener("click", this.#toggleItalic)
		menu.unorderedList.removeEventListener("click", this.#toggleUnorderedList)
		menu.orderedList.removeEventListener("click", this.#toggleOrderedList)

		this.removeEventListener("click", this.#onSelfClick)

		this.#textContentObserver.disconnect()
	}

	attributeChangedCallback(attribute: string, oldValue: string, newValue: string) {
		this.#attributeCallbacks[attribute]?.(newValue, oldValue)
	}

	#attributeCallbacks: Record<string, (newValue: string | undefined | null, oldValue: string | undefined | null) => void> = {
		"placeholder": (newValue: string | undefined | null) => {
			this.#syncAttribute("placeholder", newValue)
		},
		"rows": (newValue: string | undefined | null) => {
			this.#syncAttribute("rows", newValue)
		},
		"cols": (newValue: string | undefined | null) => {
			this.#syncAttribute("cols", newValue)
		},
		"disabled": (newValue: string | undefined | null) => {
			this.#syncAttribute("disabled", newValue)
		},
		"required": (newValue: string | undefined | null) => {
			this.#syncAttribute("required", newValue)
			this.#validate()
		},
	}

	#onSelfClick = (e: Event) => {
		// Allows focusing the label to focus the textarea, while
		// keeping the toolbar first in the tab order
		if (e.composedPath()[0] === this) {
			this.#textarea().focus()
		}
	}

	#onChange = (e: Event) => {
		const target = e.target as HTMLTextAreaElement
		this.#setValue(target.value)

		this.#events.dispatchChange()
	}

	#onInput = (e: InputEvent) => {
		const target = e.target as HTMLTextAreaElement
		this.#setValue(target.value)

		if (e.inputType === "insertLineBreak") {
			this.#continueList()
		}
	}

	#syncAttribute = (attribute: string, value?: string | null | undefined) => {
		if (this.hasAttribute(attribute) || value != null) {
			this.#textarea()?.setAttribute(attribute, value ?? this.getAttribute(attribute) ?? "")
		} else {
			this.#textarea()?.removeAttribute(attribute)
		}
	}

	#toggleInlineStyle = (style: string) => (e: Event) => {
		e.preventDefault()
		const textarea = this.#textarea()

		const start = textarea.selectionStart
		const end = textarea.selectionEnd
		const value = textarea.value

		const alreadyStyled = value.slice(start - style.length, start) === style && value.slice(end, end + style.length) === style

		// TODO: figure out how to make this undoable
		if (alreadyStyled) {
			this.#setValue(value.slice(0, start - style.length) + value.slice(start, end) + value.slice(end + style.length))
			textarea.selectionStart = start - style.length
			textarea.selectionEnd = end - style.length
		} else {
			this.#setValue(value.slice(0, start) + style + value.slice(start, end) + style + value.slice(end))
			textarea.selectionStart = start + style.length
			textarea.selectionEnd = end + style.length
		}

		textarea.focus()
		this.#events.dispatchChange()
	}

	#toggleBold = this.#toggleInlineStyle("**")
	#toggleItalic = this.#toggleInlineStyle("_")

	#toggleHeader = (e: Event) => {
		e.preventDefault()
		const textarea = this.#textarea()

		const start = textarea.selectionStart
		const end = textarea.selectionEnd
		const value = textarea.value

		const startOfLine = this.#getStartOfLine()
		const endOfLine = this.#getEndOfLine()

		const currentHeadingLevel = value.slice(startOfLine).match(/^#+/)?.[0]?.length ?? 0
		const currentHeadingText = value.slice(startOfLine + currentHeadingLevel, endOfLine)?.trimStart()
		if (currentHeadingLevel === 0) {
			this.#setValue(value.slice(0, startOfLine) + "## " + value.slice(startOfLine))
			textarea.selectionStart = start + 3
			textarea.selectionEnd = end + 3
		} else if (currentHeadingLevel >= 4) {
			this.#setValue(value.slice(0, startOfLine) + currentHeadingText + value.slice(endOfLine))
			textarea.selectionStart = start - endOfLine + startOfLine + currentHeadingText.length
			textarea.selectionEnd = end - endOfLine + startOfLine + currentHeadingText.length
		} else {
			this.#setValue(value.slice(0, startOfLine) + "#" + value.slice(startOfLine))
			textarea.selectionStart = start + 1
			textarea.selectionEnd = end + 1
		}

		textarea.focus()
		this.#events.dispatchChange()
	}

	#toggleList = (ordered: boolean) => (e: Event) => {
		e.preventDefault()
		const textarea = this.#textarea()

		const start = textarea.selectionStart
		const end = textarea.selectionEnd
		const value = textarea.value

		const startOfLine = this.#getStartOfLine()
		const listType = this.#getListType(startOfLine)

		if (listType == null) {
			const newListStart = ordered ? "1. " : "- "

			this.#setValue(value.slice(0, startOfLine) + newListStart + value.slice(startOfLine))
			textarea.selectionStart = start + newListStart.length
			textarea.selectionEnd = end + newListStart.length
		} else {
			this.#setValue(value.slice(0, startOfLine) + value.slice(startOfLine + listType.length))
			textarea.selectionStart = start - listType.length
			textarea.selectionEnd = end - listType.length
		}

		textarea.focus()
		this.#events.dispatchChange()
	}

	#toggleUnorderedList = this.#toggleList(false)
	#toggleOrderedList = this.#toggleList(true)

	#continueList = () => {
		const textarea = this.#textarea()

		const start = textarea.selectionStart
		const startOfLine = this.#getStartOfLine(start - 1)
		const listType = this.#getListType(startOfLine)

		const value = this.value ?? ""

		if (listType) {
			let nextListType = listType
			if (!isNaN(parseInt(listType))) {
				nextListType = `${parseInt(listType) + 1}. `
			}

			this.#setValue(value.slice(0, start) + nextListType + value.slice(start))
			textarea.selectionStart = start + nextListType.length
			textarea.selectionEnd = start + nextListType.length
			this.#events.dispatchChange()
		}
	}

	#getListType = (startOfLine: number) => {
		const value = this.value
		return value?.slice(startOfLine).match(/^(- |\* |\d+\. )/)?.[0]
	}

	#getStartOfLine = (cursorLocation?: number): number => {
		const textarea = this.#textarea()
		const start = cursorLocation ?? textarea.selectionStart
		const value = textarea.value

		let startOfLine = start - 1
		while (value[startOfLine] !== "\n" && startOfLine > 0) {
			startOfLine -= 1
		}

		return startOfLine <= 0 ? 0 : startOfLine + 1
	}

	#getEndOfLine = (cursorLocation?: number): number => {
		const textarea = this.#textarea()
		const end = cursorLocation ?? textarea.selectionEnd
		const value = textarea.value

		let endOfLine = end
		while (value[endOfLine] !== "\n" && endOfLine < value.length) {
			endOfLine += 1
		}

		return endOfLine >= value.length ? value.length : endOfLine
	}

	#setValue = (value: string) => {
		// Note: do NOT set textContent in here, two reasons:
		// 1. textContent represents the defaultValue
		// 2. It causes a click bug with the menu buttons, preventing 'click' from being dispatched

		this.#internals.setFormValue(value)
		this.#textarea().value = value
		this.#validate()
	}

	#events = {
		dispatchChange: () => this.dispatchEvent(new Event("change", { bubbles: true })),
		dispatchInput: () => this.dispatchEvent(new Event("input", { bubbles: true })),
	}

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({
			mode: "open",
			delegatesFocus: true,
		})

		const style = document.createElement("style")
		style.innerHTML = TextareaMarkdownElement.css

		const template = document.createElement("template")
		template.innerHTML = TextareaMarkdownElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
