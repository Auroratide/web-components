import {
	TYPING,
	TYPE,
	TYPED,
	ERASING,
	ERASE,
	ERASED,
	PAUSED_ANY,
	RESUMED_ANY,
	NEXT_CHAR,
	PREV_CHAR,
	PHRASE_TYPED,
	PHRASE_REMOVED,
	STARTED,
	PAUSED,
} from "./events.js"

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

	get typeSpeed() {
		if (!this.hasAttribute("type-speed") && this.hasAttribute("letter-interval")) {
			return this.letterInterval
		}

		return this.#getNumAttribute("type-speed", 80)
	}
	set typeSpeed(value: number) { this.setAttribute("type-speed", value.toString()) }

	get eraseSpeed() {
		if (!this.hasAttribute("erase-speed") && this.hasAttribute("letter-interval")) {
			return this.letterInterval
		}

		return this.#getNumAttribute("erase-speed", 50)
	}
	set eraseSpeed(value: number) { this.setAttribute("erase-speed", value.toString()) }

	get repeat() { return this.hasAttribute("repeat") }
	set repeat(value: boolean) { this.toggleAttribute("repeat", value) }

	get repeatInterval() {
		if (!this.hasAttribute("repeat-interval") && this.hasAttribute("phrase-interval")) {
			return this.phraseInterval
		}

		return this.#getNumAttribute("repeat-speed", 1000)
	}
	set repeatInterval(value: number) { this.setAttribute("repeat-interval", value.toString()) }

	get position() { return this.#position }
	get length() { return this.#chars.length }

	async type() { await this.#run("typing") }
	async typeOne() {
		if (this.#position >= this.length) return

		this.#chars[this.#position].hidden = false
		this.#chars[this.#position].classList.add("typewritten-text_revealed")

		this.#emit(TYPE)
		this.#emit(NEXT_CHAR)

		this.#updateCursorPosition("typing")

		this.#position += 1

		if (this.#isAtEnd("typing")) {
			this.#emit(TYPED)
			this.#emit(PHRASE_TYPED)
		}
	}

	async erase() { await this.#run("erasing") }
	async eraseOne() {
		if (this.#position <= 0) return

		this.#position -= 1
		this.#chars[this.#position].hidden = true
		this.#chars[this.#position].classList.remove("typewritten-text_revealed")

		this.#emit(ERASE)
		this.#emit(PREV_CHAR)

		this.#updateCursorPosition("erasing")

		if (this.#isAtEnd("erasing")) {
			this.#emit(ERASED)
			this.#emit(PHRASE_REMOVED)
		}
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
		this.#position = 0
		this.#running = false
		this.#direction = "typing"
		
		this.#mirrorSlot.assignedNodes().forEach((node: HTMLElement) => node.remove())
		this.#createMirror()

		if (!this.paused) {
			this.resume()
		}
	}

	connectedCallback() {
		this.#mainSlot.addEventListener("slotchange", this.#onMainSlotChange)
		this.#mirrorSlot.addEventListener("slotchange", this.#onMirrorSlotChange)
	}

	disconnectedCallback() {
		this.#mainSlot.removeEventListener("slotchange", this.#onMainSlotChange)
		this.#mainSlot.removeEventListener("slotchange", this.#onMirrorSlotChange)
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "paused" && newValue == null) {
			this.#emit(RESUMED_ANY)
			this.#emit(STARTED)
			this.resume()
		}

		if (name === "paused" && newValue != null) {
			this.#emit(PAUSED_ANY)
			this.#emit(PAUSED)
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
		this.#mirror.innerHTML = "<span class=\"cursor current typewritten-text_start typewritten-text_current\"></span>" + this.#splitNode()

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
			.filter((word) => word.length > 0)
			.map((word) => `<span class="word typewritten-text_word">${this.#splitTextIntoChars(word)}</span>`)
			.join("")
	}

	#splitTextIntoChars(text: string): string {
		return [...text]
			.map((char) => `<span class="char cursor typewritten-text_character" hidden>${char}</span>`)
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
		while (!this.paused && (!this.#isAtEnd() || this.repeat)) {
			await (this.#direction === "typing" ? this.typeOne() : this.eraseOne())

			if (!this.#isAtEnd()) {
				await wait(this.#direction === "typing" ? this.typeSpeed : this.eraseSpeed)
			}

			if (this.#isAtEnd() && this.repeat && !this.paused) {
				console.log("IN THE REPEAT BLOCK")
				await wait(this.repeatInterval)
				this.switchDirection()
			}
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

		this.#cursors[this.#position + 1]?.classList[forCurrent]("typewritten-text_current")
		this.#cursors[this.#position]?.classList[forPrevious]("typewritten-text_current")
	}

	#isAtEnd = (direction?: Direction) =>
		this.#position === ((direction ?? this.#direction) === "typing" ? this.length : 0)

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

	/* DEPRECATED STUFF from before v0.2.0 */
	/**
	 * @deprecated Use `type-speed` or `erase-speed` instead
	 */
	get letterInterval() {
		return this.#deprecated("letterInterval", ["type-speed", "erase-speed"], () => this.#getNumAttribute("letter-interval", 100))
	}
	/**
	 * @deprecated Use `type-speed` or `erase-speed` instead
	 */
	set letterInterval(value: number) {
		this.#deprecated("letterInterval", ["type-speed", "erase-speed"], () => this.setAttribute("letter-interval", value.toString()))
	}

	/**
	 * @deprecated Use `repeat-interval` instead
	 */
	get phraseInterval() {
		return this.#deprecated("phraseInterval", ["repeat-interval"], () => this.#getNumAttribute("phrase-interval", 1000))
	}
	/**
	 * @deprecated Use `repeat-interval` instead
	 */
	set phraseInterval(value: number) {
		this.#deprecated("phraseInterval", ["repeat-interval"], () => this.setAttribute("phrase-interval", value.toString()))
	}

	/**
	 * @deprecated Use `position` instead
	 */
	get currentPosition() {
		return this.#deprecated("currentPosition", ["position"], () => this.#position)
	}

	/**
	 * @deprecated Use `typeOne` instead
	 */
	typeNext() {
		this.#deprecated("typeNext", ["typeOne"], () => this.typeOne())
	}

	/**
	 * @deprecated Use `eraseOne` instead
	 */
	backspace() {
		this.#deprecated("backspace", ["eraseOne"], () => this.eraseOne())
	}

	/**
	 * @deprecated Use `resume` instead
	 */
	start() {
		this.#deprecated("start", ["resume"], () => this.resume())
	}

	/**
	 * @deprecated Use `typeOne` or `eraseOne` instead
	 */
	tick() {
		this.#deprecated("tick", ["typeOne", "eraseOne"], () => {
			if (this.paused) return

			if (this.#direction === "typing") {
				this.typeOne()
			} else {
				this.eraseOne()
			}

			if (this.#isAtEnd()) this.switchDirection()
		})
	}

	/**
	 * @deprecated Use `typeOne` or `eraseOne` instead
	 */
	forceTick() {
		this.#deprecated("tick", ["typeOne", "eraseOne"], () => {
			if (this.#direction === "typing") {
				this.typeOne()
			} else {
				this.eraseOne()
			}

			if (this.#isAtEnd()) this.switchDirection()
		})
	}

	/**
	 * @deprecated Use `switchDirection`
	 */
	reverse() {
		this.#deprecated("reverse", ["switchDirection"], () => this.switchDirection())
	}

	#deprecated = <T>(old: string, neww: string[], fn: () => T): T => {
		// eslint-disable-next-line no-console
		console.warn(`typewritten-text: \`${old}\` is deprecated. Use \`${neww.join("`, `")}\` instead.`)
		return fn()
	}
}

/**
 * @deprecated Use `TypewrittenTextElement` instead
 */
export const TypewrittenText = TypewrittenTextElement
