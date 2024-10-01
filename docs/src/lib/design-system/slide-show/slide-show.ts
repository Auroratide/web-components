export class SlideShowElement extends HTMLElement {
	static defaultElementName = "slide-show"

	static html = `
		<div class="slide-container">
			<div class="slides" style="transform: translateX(0%);">
				<slot name="slide"></slot>
			</div>
		</div>
		<div class="nav">
			<button id="prev" part="button">Prev</button>
			<ol part="nav"></ol>
			<button id="next" part="button">Next</button>
		</div>
	`

	static css = `
		:host {
			display: block;
			position: relative;
			margin: auto;
		}

		.slides {
			position: relative;
			display: flex;
			flex-direction: row;
			transition: transform var(--slide-show-transition-duration, 0.4s) var(--slide-show-transition-function, ease-out);
			width: var(--slide-show-slide-width, 100%);
			left: calc((100% - var(--slide-show-slide-width, 100%)) / 2);
		}

		::slotted([slot="slide"]) {
			flex: 0 0 100%;
		}

		.slide-container {
			position: relative;
			overflow: hidden;
		}

		.nav {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		[part="nav"] {
			list-style: none;
			padding: 0;
			display: flex;
			flex: 1;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			gap: 0.5em;
		}

		[part="nav-selected"] {
			font-weight: bold;
		}
	`

	constructor() {
		super()

		this.#createRoot()
	}

	static get observedAttributes() {
		return ["selected"]
	}

	get selected() {
		return parseInt(this.getAttribute("selected") ?? "0")
	}
	set selected(value) {
		this.setAttribute("selected", value.toString())
	}

	get length() {
		return this.slides().length
	}

	previous = () => {
		this.selected = this.selected <= 0 ? this.length - 1 : this.selected - 1
	}

	next = () => {
		this.selected = (this.selected + 1) % this.length
	}

	jump = (n: number) => {
		this.selected = n
	}

	slides = () => Array.from(this.querySelectorAll("[slot=\"slide\"]"))

	nav = () => this.shadowRoot!.querySelector("[part=\"nav\"]")!

	connectedCallback() {
		this.shadowRoot!.querySelector("#prev")?.addEventListener("click", this.previous)
		this.shadowRoot!.querySelector("#next")?.addEventListener("click", this.next)

		this.#updateSlots()
	}

	attributeChangedCallback() {
		this.#updateSelected()
	}

	#updateSlots = () => {
		this.#updateNav()
		this.#updateSelected()
	}

	#updateNav = () => {
		const nav = this.nav()
		nav.innerHTML = ""
		this.slides().forEach((slide, i) => {
			const button = document.createElement("button")
			button.textContent = (i + 1).toString()
			button.addEventListener("click", () => this.jump(i))
			button.part.add("nav-item")

			const li = document.createElement("li")
			li.appendChild(button)
			nav.appendChild(li)
		})
	}

	#updateSelected = () => {
		const navButtons = Array.from(this.nav().querySelectorAll("button"))
		this.slides().forEach((slide, i) => {
			slide.setAttribute("aria-hidden", (i !== this.selected).toString())
			slide.setAttribute("tabindex", i === this.selected ? "0" : "-1")
			navButtons[i].part.toggle("nav-selected", i === this.selected)
		})

		this.#slidesContainer()!.style.transform = `translateX(${this.selected * -100}%)`

		this.dispatchEvent(new CustomEvent("slide-show:change", {
			detail: {
				to: this.selected,
			},
		}))
	}

	#slidesContainer = () => this.shadowRoot!.querySelector(".slides")! as HTMLDivElement

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = SlideShowElement.css

		const template = document.createElement("template")
		template.innerHTML = SlideShowElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
