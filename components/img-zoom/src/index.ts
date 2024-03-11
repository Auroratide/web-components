export class ImgZoomElement extends HTMLElement {
	static defaultElementName = "img-zoom"

	static html = `
		<button id="zoom-in">
			<slot></slot>
		</button>
		<dialog id="modal">
			<div id="content"></div>
			<form method="dialog">
				<button id="zoom-out" autofocus>
					<span class="visually-hidden">close zoom</span>
				</button>
			</form>
		</dialog>
	`

	static css = `
		:host { display: inline-block; }

		::slotted(*) {
			display: inline-block;
			inline-size: 100%;
			block-size: auto;
		}

		button { all: unset; }
		#zoom-in { cursor: zoom-in; }
		#zoom-out { cursor: zoom-out; }
		#zoom-in:disabled { cursor: auto; }

		dialog {
			inset: 0;
			max-width: none;
			max-height: none;
			inline-size: 100%;
			block-size: 100%;
			margin: 0;
			padding: 0;
			background: none;
			border: none;
			overflow: visible;
			align-items: center;
			justify-content: center;
			transition:
				display 0.4s allow-discrete,
				overlay 0.4s allow-discrete;
		}

		dialog[open] { display: flex; }

		dialog::backdrop {
			background: oklch(0% 0 0 / 0);
			transition:
				background 0.4s linear,
				display 0.4s allow-discrete,
				overlay 0.4s allow-discrete;
		}

		dialog[open]::backdrop {
			background: oklch(0% 0 0 / 0.5);
		}

		@starting-style {
			dialog[open]::backdrop {
				background: oklch(0% 0 0 / 0);
			}
		}

		#zoom-out {
			position: absolute;
			inset: 0;
			display: block;
			inline-size: 100%;
			block-size: 100%;
		}

		#content {
			inline-size: 95dvi;
			block-size: 95dvb;
		}

		#content > * {
			display: block;
			inline-size: 100%;
			block-size: 100%;
			object-fit: contain;
			transform-origin: center center;
		}

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
	`

	static get observedAttributes() {
		return ["disabled"]
	}

	constructor() {
		super()

		this.#createRoot()
	}

	get disabled() { return this.hasAttribute("disabled") }
	set disabled(value: boolean) { this.toggleAttribute("disabled", value) }

	zoomIn = () => {
		this.#modal().showModal()
		const slotted = this.#slotted() as HTMLImageElement
		const content = this.#content().firstElementChild as HTMLImageElement

		const transform = getRelativeTransform(content, slotted)

		this.#content().animate([ {
			transform: transform,
		}, {
			transform: "scale(1) translate(0px, 0px)",
		} ], {
			fill: "both",
			duration: 400,
			easing: "ease-in-out",
		})
	}

	zoomOut = () => {
		this.#modal().close()
	}

	#zoomInBtn = () => this.shadowRoot!.querySelector("#zoom-in") as HTMLButtonElement
	#zoomOutBtn = () => this.shadowRoot!.querySelector("#zoom-out") as HTMLButtonElement
	#modal = () => this.shadowRoot!.querySelector("#modal") as HTMLDialogElement
	#content = () => this.shadowRoot!.querySelector("#content") as HTMLDivElement
	#slot = () => this.shadowRoot!.querySelector("slot") as HTMLSlotElement
	#slotted = () => this.#slot().assignedElements()[0]

	connectedCallback() {
		this.#zoomInBtn().addEventListener("click", this.zoomIn)
		this.#slot().addEventListener("slotchange", this.#cloneIntoContent)
		this.#modal().addEventListener("close", this.#onClose)
	}

	disconnectedCallback() {
		this.#zoomInBtn().removeEventListener("click", this.zoomIn)
		this.#slot().removeEventListener("slotchange", this.#cloneIntoContent)
		this.#modal().removeEventListener("close", this.#onClose)
	}

	attributeChangedCallback(attribute: string, oldValue: string, newValue: string) {
		this.#attributeCallbacks[attribute]?.(newValue, oldValue)
	}

	#attributeCallbacks = {
		"disabled": (newValue: string | undefined | null) => {
			this.#zoomInBtn().disabled = newValue != null
		},
	}

	#cloneIntoContent = () => {
		const cloned = this.#slotted().cloneNode(true) as HTMLElement

		if ("alt" in cloned) cloned.alt += " (zoomed)"
		cloned.setAttribute("part", "content")

		this.#content().replaceChildren(cloned)
	}

	#onClose = () => {
		const slotted = this.#slotted() as HTMLImageElement
		const content = this.#content().firstElementChild as HTMLImageElement

		const transform = getRelativeTransform(content, slotted)

		this.#content().animate([ {
			transform: "scale(1) translate(0px, 0px)",
		}, {
			transform: transform,
		} ], {
			fill: "backwards",
			duration: 400,
			easing: "ease-in-out",
		})
	}

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = ImgZoomElement.css

		const template = document.createElement("template")
		template.innerHTML = ImgZoomElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}

function getContainedSize(el: HTMLImageElement): [number, number] {
	const ratio = el.naturalWidth / el.naturalHeight
	let width = el.clientHeight * ratio
	let height = el.clientHeight

	if (width > el.clientWidth) {
		width = el.clientWidth
		height = el.clientWidth / ratio
	}

	return [width, height]
}

function getCenter(el: HTMLElement): [number, number] {
	const rect = el.getBoundingClientRect()
	return [rect.left + rect.width / 2, rect.top + rect.height / 2]
}

function getRelativeTransform(from: HTMLImageElement, dest: HTMLImageElement): string {
	const [dw] = getContainedSize(dest)
	const [fw] = getContainedSize(from)

	const [dx, dy] = getCenter(dest)
	const [fx, fy] = getCenter(from)

	const r = dw / fw
	const tx = (dx - fx) / r
	const ty = (dy - fy) / r

	return `scale(${r}) translate(${tx}px, ${ty}px)`
}
