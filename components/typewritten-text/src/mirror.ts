import { NEXT_CHAR, PREV_CHAR } from "./events.js"

export class TypewrittenTextMirror extends HTMLElement {
	static elementName = "typewritten-text-mirror"

	mirrorOf: HTMLElement
	characters: HTMLElement[]

	constructor(mirrorOf: HTMLElement) {
		super()

		console.log("IN HERE!!! ")

		this.mirrorOf = mirrorOf
		this.characters = []
	}

	connectedCallback() {
		this.setAttribute("aria-label", this.textContent)
		this.characters = Array.from(this.querySelectorAll(".typewritten-text_character"))

		this.mirrorOf.addEventListener(NEXT_CHAR, this.next)
		this.mirrorOf.addEventListener(PREV_CHAR, this.prev)
	}

	disconnectedCallback() {
		this.mirrorOf.removeEventListener(NEXT_CHAR, this.next)
		this.mirrorOf.removeEventListener(PREV_CHAR, this.prev)
	}

	type = (prevAction: "remove" | "add", curAction: "remove" | "add", e) => {
		const i = e.detail.position

		if (i <= 0) {
			this.querySelector(".typewritten-text_start").classList[prevAction]("typewritten-text_current")
		} else {
			this.characters[i - 1].classList[prevAction]("typewritten-text_current")
		}

		this.characters[i].classList[curAction]("typewritten-text_current", "typewritten-text_revealed")
	}

	next = this.type.bind(this, "remove", "add")
	prev = this.type.bind(this, "add", "remove")
}