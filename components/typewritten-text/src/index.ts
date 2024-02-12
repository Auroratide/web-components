import { TYPING, TYPE, TYPED, ERASING, ERASE, ERASED } from "./events.js"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type Direction = "typing" | "erasing"

export class TypewrittenTextElement extends HTMLElement {
	static defaultElementName = "typewritten-text"

	static html = `
		<span class="visually-hidden no-copy"><slot></slot></span>
		<span aria-hidden="true"><slot name="mirror"></slot></span>
	`

	static css = `
		:host { display: inline; }

		.visually-hidden {
			clip: rect(1px, 1px, 1px, 1px);
			clip-path: inset(50%);
			height: 1px;
			width: 1px;
			margin: -1px;
			overflow: hidden;
			padding: 0;
			position: absolute;
		}

		.no-copy { user-select: none; }
	`

	static get observedAttributes() {
		return ["paused"]
	}

	#mirror: HTMLElement | undefined
	#position = 0
	#direction: Direction = "typing"
	#chars: NodeListOf<HTMLElement> | [] = []
	#cursors: NodeListOf<HTMLElement> | [] = []

	constructor() {
		super()

		this.#createRoot()
	}

	get paused() { return this.hasAttribute("paused") }
	set paused(value: boolean) { this.toggleAttribute("paused", value) }

	get typeSpeed() { return this.#getNumAttribute("type-speed", 80) }
	set typeSpeed(value: number) { this.setAttribute("type-speed", value.toString()) }

	get eraseSpeed() { return this.#getNumAttribute("erase-speed", 50) }
	set eraseSpeed(value: number) { this.setAttribute("erase-speed", value.toString()) }

	get position() { return this.#position }
	get length() { return this.#chars.length }

	async type() { await this.#run("typing") }
	async typeOne() {
		if (this.#position >= this.length) return

		this.#chars[this.#position].hidden = false
		this.#emit(TYPE)

		this.#updateCursorPosition("typing")

		this.#position += 1

		if (this.#isAtEnd("typing")) this.#emit(TYPED)
	}

	async erase() { await this.#run("erasing") }
	async eraseOne() {
		if (this.#position <= 0) return

		this.#position -= 1
		this.#chars[this.#position].hidden = true
		this.#emit(ERASE)

		this.#updateCursorPosition("erasing")

		if (this.#isAtEnd("erasing")) this.#emit(ERASED)
	}

	switchDirection() {
		this.#direction = this.#direction === "typing" ? "erasing" : "typing"
	}

	pause() { this.paused = true }
	resume() {
		if (this.#direction === "erasing")
			this.erase()
		else
			this.type()
	}

	reset() {		
		this.paused = true
		this.#position = 0
		this.#running = false
		this.#direction = "typing"
		
		this.#mirrorSlot.assignedNodes().forEach((node: HTMLElement) => node.remove())
		this.#createMirror()
	}

	connectedCallback() {
		if (!this.#mirror) this.#createMirror()

		if (!this.paused) {
			this.resume()
		}

		this.#mainSlot.addEventListener("slotchange", this.#onMainSlotChange)
		this.#mirrorSlot.addEventListener("slotchange", this.#onMirrorSlotChange)
	}

	disconnectedCallback() {
		this.#mainSlot.removeEventListener("slotchange", this.#onMainSlotChange)
		this.#mainSlot.removeEventListener("slotchange", this.#onMirrorSlotChange)
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "paused" && newValue == null) {
			this.resume()
		}
	}

	get #mainSlot() { return this.shadowRoot?.querySelector("slot") as HTMLSlotElement }
	get #mirrorSlot() { return this.shadowRoot?.querySelector("slot[name=\"mirror\"]") as HTMLSlotElement }

	#onMainSlotChange = () => this.reset()
	#onMirrorSlotChange = () => {
		if (this.#mirrorSlot.assignedNodes().length === 0) {
			this.reset()
		}
	}

	#createMirror() {
		this.#mirror = document.createElement("span")
		this.#mirror.slot = "mirror"
		this.#mirror.innerHTML = "<span class=\"cursor current\"></span>" + this.#splitNode()

		this.appendChild(this.#mirror)

		this.#chars = this.#mirror?.querySelectorAll(".char") ?? []
		this.#cursors = this.#mirror?.querySelectorAll(".cursor") ?? []
	}

	#splitNode(node: ChildNode = this): string {
		return [...node.childNodes].map((n: HTMLElement) => {
			if (n.nodeType === Node.TEXT_NODE) {
				return this.#splitTextIntoWords(n.textContent)
			} else {
				const nn = n.cloneNode(false) as HTMLElement
				nn.innerHTML = this.#splitNode(n)
				return nn.outerHTML
			}
		}).join("")
	}

	#splitTextIntoWords(text: string): string {
		return text
			.split(/(\s)/g)
			.map((word) => `<span class="word">${this.#splitTextIntoChars(word)}</span>`)
			.join("")
	}

	#splitTextIntoChars(text: string): string {
		return [...text]
			.map((char) => `<span class="char cursor" hidden>${char}</span>`)
			.join("")
	}

	#emit(type: string) {
		this.dispatchEvent(new CustomEvent(type, {
			detail: {
				position: this.#position,
				length: this.length,
			},
		}))
	}

	#getNumAttribute = (name: string, def: number) => {
		const n = parseFloat(this.getAttribute(name))
		return isNaN(n) ? def : n
	}

	#running = false
	async #run(direction: Direction) {
		if (this.#running) return

		this.#running = true
		this.paused = false
		this.#direction = direction

		this.#emit(this.#direction === "typing" ? TYPING : ERASING)
		while (!this.paused && !this.#isAtEnd()) {
			await (this.#direction === "typing" ? this.typeOne() : this.eraseOne())
			await wait(this.typeSpeed)
		}

		if (this.#isAtEnd()) this.switchDirection()

		this.paused = true
		this.#running = false
	}

	#updateCursorPosition(direction: Direction) {
		const forCurrent = direction === "typing" ? "add" : "remove"
		const forPrevious = direction === "typing" ? "remove" : "add"

		this.#cursors[this.#position + 1]?.classList[forCurrent]("current")
		this.#cursors[this.#position]?.classList[forPrevious]("current")
	}

	#isAtEnd = (direction?: Direction) =>
		this.#position === ((direction ?? this.#direction === "typing") ? this.length : 0)

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = TypewrittenTextElement.css

		const template = document.createElement("template")
		template.innerHTML = TypewrittenTextElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}

/**
 * @deprecated Use TypewrittenTextElement instead
 */
export const TypewrittenText = TypewrittenTextElement
