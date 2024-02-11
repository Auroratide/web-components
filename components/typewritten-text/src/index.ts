import { nextCharEvent, pausedEvent, phraseRemovedEvent, phraseTypedEvent, prevCharEvent, startedEvent } from "./events.js"
import { TypewrittenTextMirror } from "./mirror.js"

export class TypewrittenText extends HTMLElement {
	static defaultElementName = "typewritten-text"
	static defaultLetterInterval = 100
	static defaultPhraseInterval = 1000

	static html = `
		<span hidden><slot></slot></span>
		<slot name="mirror"></slot>
	 `

	static css = `
		#value {
			font-weight: bold;
		}
	 `

	static get observedAttributes() {
		return ["paused"]
	}

	currentPosition: number
	mirror: TypewrittenTextMirror | null
	direction: "forward" | "backward"

	constructor() {
		super()

		this.#createRoot()

		this.currentPosition = 0
		this.mirror = null
		this.direction = "forward"
	}

	connectedCallback() {
		if (!this.mirror) this.createMirror()

		this.insertMirror()
		this.tick()

		const mainSlot = this.shadowRoot.querySelector("slot") as HTMLSlotElement
		const mirrorSlot = this.shadowRoot.querySelector("slot[name=\"mirror\"]") as HTMLSlotElement

		mainSlot.addEventListener("slotchange", this.reset)
		mirrorSlot.addEventListener("slotchange", () => {
			if (mirrorSlot.assignedNodes().length === 0) {
				this.reset()
			}
		})
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "paused") {
			if (newValue === null || newValue === undefined) {
				this.dispatchEvent(startedEvent())
				this.tick()
			} else {
				this.dispatchEvent(pausedEvent())
			}
		}
	}

	get letterInterval(): number | undefined {
		return parseInt(this.getAttribute("letter-interval")) || TypewrittenText.defaultLetterInterval
	}
	set letterInterval(value: number | undefined | null) {
		if (value == null) {
			this.removeAttribute("letter-interval")
		} else {
			this.setAttribute("letter-interval", value.toString())
		}
	}

	get phraseInterval(): number | undefined {
		return parseInt(this.getAttribute("phrase-interval")) || TypewrittenText.defaultPhraseInterval
	}
	set phraseInterval(value: number | undefined | null) {
		if (value == null) {
			this.removeAttribute("phrase-interval")
		} else {
			this.setAttribute("phrase-interval", value.toString())
		}
	}

	get paused(): boolean { return this.hasAttribute("paused") }
	set paused(value: boolean) {
		if (value) {
			this.setAttribute("paused", "")
		} else {
			this.removeAttribute("paused")
		}
	}

	get repeat() { return this.hasAttribute("repeat") }
	set repeat(value) {
		if (value) {
			this.setAttribute("repeat", "")
		} else {
			this.removeAttribute("repeat")
		}
	}

	get length() {
		return this.mirror.querySelectorAll(".typewritten-text_character").length
	}

	typeNext = () => {
		if (this.currentPosition < this.length) {
			this.dispatchEvent(nextCharEvent(this.currentPosition))
			this.currentPosition += 1

			if (this.currentPosition === this.length)
				this.dispatchEvent(phraseTypedEvent())
		}
	}

	backspace = () => {
		if (this.currentPosition > 0) {
			this.currentPosition -= 1
			this.dispatchEvent(prevCharEvent(this.currentPosition))

			if (this.currentPosition === 0)
				this.dispatchEvent(phraseRemovedEvent())
		}
	}

	start = () => this.paused = false
	pause = () => this.paused = true

	tick = () => {
		if (this.paused)
			return

		const reversed = this.forceTick()

		if (!reversed || this.repeat) {
			setTimeout(this.tick, reversed ? this.phraseInterval : this.letterInterval)
		} else {
			this.pause()
		}
	}

	reverse = () => {
		this.direction = this.direction === "forward" ? "backward" : "forward"
	}

	reset = () => {
		this.currentPosition = 0
		this.direction = "forward"
		this.mirror.remove()
		this.createMirror()
		this.insertMirror()
	}

	forceTick = () => {
		if (this.direction === "forward") {
			this.typeNext()
		} else {
			this.backspace()
		}

		const reversed = this.currentPosition <= 0 || this.currentPosition >= this.length

		if (reversed) this.reverse()
		return reversed
	}

	divideIntoCharacters = (node: ChildNode = this) => {
		const isAlphanumeric = ch => /[a-zA-Z0-9_]/.test(ch)
		return [...node.childNodes].map(n => {
			if (n.nodeType === Node.TEXT_NODE) {
				const characters = [...n.textContent]
				let wordStarted = false
				const result = characters.reduce((acc, ch) => {
					let wordSpan = ""

					if (!wordStarted && isAlphanumeric(ch)) {
						wordStarted = true
						wordSpan = "<span class=\"typewritten-text_word\">"
					} else if (wordStarted && !isAlphanumeric(ch)) {
						wordStarted = false
						wordSpan = "</span>"
					}

					return `${acc}${wordSpan}<span aria-hidden="true" class="typewritten-text_character">${ch}</span>`
				}, "")

				if (wordStarted) {
					return `${result}</span>`
				} else {
					return result
				}
			} else {
				const nn = n.cloneNode(false) as HTMLElement
				nn.innerHTML = this.divideIntoCharacters(n)
				return nn.outerHTML
			}
		}).join("")
	}

	createMirror = () => {
		this.mirror = new TypewrittenTextMirror(this)
		this.mirror.slot = "mirror"
		this.mirror.innerHTML = "<span class=\"typewritten-text_start typewritten-text_current\"></span>" + this.divideIntoCharacters()
	}

	insertMirror = () => {
		this.appendChild(this.mirror)
	}

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = TypewrittenText.css

		const template = document.createElement("template")
		template.innerHTML = TypewrittenText.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}