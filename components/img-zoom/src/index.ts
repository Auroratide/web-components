import { pop, fade, type AnimationDescription } from "./animation.js"

export class ImgZoomElement extends HTMLElement {
	static defaultElementName = "img-zoom"

	static defaultAnimation = "cubic-bezier(0.25, 1, 0.5, 1)"

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

		:host(:focus-within) {
			outline: 2px solid Highlight;
			outline: 2px auto -webkit-focus-ring-color;
			outline-offset: 2px;
		}

		::slotted(*) {
			display: block;
			inline-size: 100%;
			block-size: auto;
		}

		button {
			all: unset;
			display: block;
		}
		#zoom-in { cursor: zoom-in; }
		#zoom-out { cursor: zoom-out; }
		#zoom-in:disabled { cursor: auto; }

		dialog {
			position: fixed;
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

		#content img {
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

		@supports not (transition-behavior: allow-discrete) {
			dialog {
				display: flex;
				opacity: 0;
				background: oklch(0% 0 0 / 0);
				pointer-events: none;
				transition:
					opacity 0.4s step-end,
					background 0.4s linear;
			}

			dialog[open] {
				opacity: 1;
				background: oklch(0% 0 0 / 0.5);
				pointer-events: auto;
				transition:
					opacity 0.4s step-start,
					background 0.4s linear;
			}

			dialog::backdrop, dialog[open]::backdrop {
				display: none;
			}
		}
	`

	static get observedAttributes() {
		return ["disabled"]
	}

	#zoomAnimation = pop({ duration: 400 })
	#reducedMotionAnimation = fade({ duration: 400 })
	#observer = new MutationObserver(() => {
		this.#cloneIntoContent()
	})

	constructor() {
		super()

		this.#createRoot()
	}

	get disabled() { return this.hasAttribute("disabled") }
	set disabled(value: boolean) { this.toggleAttribute("disabled", value) }

	zoomIn = () => {
		this.#modal().showModal()
		this.#onOpen()
	}

	zoomOut = () => {
		this.#modal().close()
	}

	#zoomInBtn = () => this.shadowRoot!.querySelector("#zoom-in") as HTMLButtonElement
	#modal = () => this.shadowRoot!.querySelector("#modal") as HTMLDialogElement
	#content = () => this.shadowRoot!.querySelector("#content") as HTMLDivElement
	#slot = () => this.shadowRoot!.querySelector("slot") as HTMLSlotElement
	#slotted = () => this.#slot().assignedElements()[0]

	connectedCallback() {
		this.#zoomInBtn().addEventListener("click", this.zoomIn)
		this.#modal().addEventListener("close", this.#onClose)

		this.#observer.observe(this, {
			attributes: true,
			childList: true,
			subtree: true,
		})

		this.#cloneIntoContent()
	}

	disconnectedCallback() {
		this.#zoomInBtn().removeEventListener("click", this.zoomIn)
		this.#modal().removeEventListener("close", this.#onClose)

		this.#observer.disconnect()
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

	#getAnimation = () => {
		const slotted = this.#findImg(this.#slotted() as HTMLElement)
		const content = this.#findImg(this.#content().firstElementChild as HTMLElement)

		if (slotted == null || content == null) return undefined

		return prefersReducedMotion()
			? this.#reducedMotionAnimation(slotted, content)
			: this.#zoomAnimation(slotted, content)
	}

	#onOpen = () => {
		this.#stopScroll()
		const animations = this.#getAnimation()

		const animate = (animation: AnimationDescription) =>
			this.#content().animate(animation.keyframes, {
				easing: ImgZoomElement.defaultAnimation,
				...animation.options,
				fill: "none",
				composite: "add",
			})

		if (Array.isArray(animations)) {
			animations?.forEach(animate)
		} else {
			animate(animations)
		}
	}

	#onClose = () => {
		this.#resumeScroll()
		const animations = this.#getAnimation()

		const animate = (animation: AnimationDescription) =>
			this.#content().animate(animation.keyframes, {
				...animation.options,
				easing: invertEasing(animation.options?.easing ?? ImgZoomElement.defaultAnimation),
				fill: "none",
				direction: "reverse",
				composite: "add",
			})

		if (Array.isArray(animations)) {
			animations?.forEach(animate)
		} else {
			animate(animations)
		}
	}

	#originalOverflow: string | undefined
	#stopScroll = () => {
		this.#originalOverflow = document.body.style.overflow
		document.body.style.overflow = "hidden"
	}
	#resumeScroll = () => document.body.style.overflow = this.#originalOverflow

	#findImg = (elem: HTMLElement): HTMLImageElement | null =>
		elem instanceof HTMLImageElement ? elem : elem.querySelector("img")

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

const prefersReducedMotion = () => window?.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false

const invertEasing = (easing: string): string => {
	const invertedNamedFunctions = {
		"linear": "linear",
		"ease": "cubic-bezier(0.75, 0, 0.75, 0.9)",
		"ease-in": "cubic-bezier(0, 0, 0.58, 1)",
		"ease-out": "cubic-bezier(0.42, 0, 1, 1)",
		"ease-in-out": "ease-in-out",
	}

	if (invertedNamedFunctions[easing] != null) {
		return invertedNamedFunctions[easing]
	}

	const cubicMatching = easing.match(/cubic-bezier\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/)
	if (cubicMatching) {
		const x1 = parseFloat(cubicMatching[1])
		const y1 = parseFloat(cubicMatching[2])
		const x2 = parseFloat(cubicMatching[3])
		const y2 = parseFloat(cubicMatching[4])

		return `cubic-bezier(${1 - x2}, ${1 - y2}, ${1 - x1}, ${1 - y1})`
	}

	// eslint-disable-next-line no-console
	console.warn("inverted linear() or steps() functions not yet supported; using same function instead")
	return easing
}
