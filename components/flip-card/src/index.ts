export class FlipCardElement extends HTMLElement {
	static defaultElementName = "flip-card"

	static html = `
		<div class="flip-container">
			<div class="front face">
				<slot name="front"></slot>
			</div>
			<div class="back face">
				<slot name="back"></slot>
			</div>
			<div class="top edge" part="edge"></div>
			<div class="right edge" part="edge"></div>
			<div class="bottom edge" part="edge"></div>
			<div class="left edge" part="edge"></div>
		</div>
	`

	static css = `
		:host {
			--_duration: var(--flip-duration, 0.75s);
			--_perspective: var(--flip-perspective, 100em);
			--_height: var(--flip-height, 20em);
			--_depth: var(--card-depth, 0.25em);

			display: block;
			perspective: var(--_perspective);
			transform-style: preserve-3d;
		}

		::slotted(*) {
			display: block;
			width: 100%;
			height: 100%;
		}

		.flip-container {
			--flip-duration: 0.75s;
			--flip-height: 20em;
			--flip-depth: 0.25em;
			--flip-border-radius: 0;
			--flip-edge-color: black;

			width: 100%;
			height: 100%;
			position: relative;
			transform-style: preserve-3d;
		}

		.face {
			width: 100%;
			height: 100%;
			backface-visibility: hidden;
		}

		.front {
			transform: rotateY(0deg);
		} .back {
			position: absolute;
			inset: 0;
			transform: translateZ(calc(-1 * var(--_depth))) rotateY(180deg);
		}

		.edge {
			position: absolute;
		}

		.right, .left {
			width: var(--_depth);
			height: 100%;
			inset-block: 0;
		} .right {
			inset-inline-end: 0;
			transform: rotateY(270deg);
			transform-origin: right center;
		} .left {
			inset-inline-start: 0;
			transform: rotateY(90deg);
			transform-origin: left center;
		}

		.top, .bottom {
			width: 100%;
			height: var(--flip-depth);
			inset-inline: 0;
		} .top {
			inset-block-start: 0;
			transform: rotateX(270deg);
			transform-origin: center top;
		} .bottom {
			inset-block-end: 0;
			transform: rotateX(90deg);
			transform-origin: center bottom;
		}

		:host(:not([facedown])) .flip-container {
			animation: flip-to-front linear var(--_duration) 1 both;
		}
		:host([facedown]) .flip-container {
			animation: flip-to-back linear var(--_duration) 1 both;
		}

		@keyframes flip-to-back {
			0% {
				transform: translateZ(0em) rotateY(0deg);
				animation-timing-function: ease-in;
			}
			50% {
				transform: translateZ(var(--_height)) rotateY(-90deg);
				animation-timing-function: linear;
			}
			100% {
				transform: translateZ(calc(-1 * var(--_depth))) rotateY(-180deg);
				animation-timing-function: ease-out;
			}
		}
	
		@keyframes flip-to-front {
			0% {
				transform: translateZ(calc(-1 * var(--_depth))) rotateY(-180deg);
				animation-timing-function: ease-in;
			}
			50% {
				transform: translateZ(var(--_height)) rotateY(-270deg);
				animation-timing-function: linear;
			}
			100% {
				transform: translateZ(0em) rotateY(-360deg);
				animation-timing-function: ease-out;
			}
		}

		@media (prefers-reduced-motion: reduce) {
			.flip-container {
				animation-duration: 0s !important;
			}
		}
	 `

	static get observedAttributes() {
		return ["facedown"]
	}

	constructor() {
		super()

		this.#createRoot()
	}

	get facedown() { return this.hasAttribute("facedown") }
	set facedown(value: boolean) { this.toggleAttribute("facedown", value) }

	get cornerAccuracy() { return parseInt(this.getAttribute("corner-accuracy") ?? "3") }
	set cornerAccuracy(value: number) { this.setAttribute("corner-accuracy", value.toString()) }

	flip() { this.facedown = !this.facedown }

	#front: HTMLElement
	#back: HTMLElement

	connectedCallback() {
		this.#front = this.shadowRoot!.querySelector<HTMLElement>(".front")
		this.#back = this.shadowRoot!.querySelector<HTMLElement>(".back")

		this.#setAccessibleText(this.facedown)
	}

	attributeChangedCallback(attribute: string, oldValue: string, newValue: string) {
		this.#attributeCallbacks[attribute]?.(newValue, oldValue)
	}

	#attributeCallbacks = {
		facedown: (newValue: string | undefined | null) => {
			this.#setAccessibleText(newValue != null)
		},
	}

	#setAccessibleText(facedown: boolean) {
		this.#front?.setAttribute("aria-hidden", facedown.toString())
		this.#back?.setAttribute("aria-hidden", (!facedown).toString())
	}

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = FlipCardElement.css

		const template = document.createElement("template")
		template.innerHTML = FlipCardElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
