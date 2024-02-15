export class FlipCardElement extends HTMLElement {
	static defaultElementName = "flip-card"

	static html = `
		<div class="container">
			<div class="front face">
				<slot name="front"></slot>
			</div>
			<div class="back face">
				<slot name="back"></slot>
			</div>
			<div class="top edge" part="edge"></div>
			<div class="top-right corner"></div>
			<div class="right edge" part="edge"></div>
			<div class="bottom-right corner"></div>
			<div class="bottom edge" part="edge"></div>
			<div class="bottom-left corner"></div>
			<div class="left edge" part="edge"></div>
			<div class="top-left corner"></div>
		</div>
	`

	static css = `
		:host {
			--_duration: var(--flip-duration, 0.75s);
			--_perspective: var(--flip-perspective, 100em);
			--_height: var(--flip-height, 20em);
			--_depth: var(--card-depth, 0.15em);

			display: block;
			perspective: var(--_perspective);
			transform-style: preserve-3d;
		}

		::slotted(*) {
			display: block;
			width: 100%;
			height: 100%;
			border-radius: inherit;
		}

		.container {
			width: 100%;
			height: 100%;
			position: relative;
			transform-style: preserve-3d;
			border-radius: inherit;
		}

		.face {
			width: 100%;
			height: 100%;
			backface-visibility: hidden;
			border-radius: inherit;
		}

		.front {
			transform: rotateY(0deg);
		} .back {
			position: absolute;
			inset: 0;
			transform: translateZ(calc(-1 * var(--_depth))) rotateY(180deg);
		}

		slot { border-radius: inherit; }

		.edge { position: absolute; }

		.right, .left {
			width: var(--_depth);
			height: calc(100% - 2 * var(--_radius));
			inset-block: var(--_radius);
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
			width: calc(100% - 2 * var(--_radius));;
			height: var(--flip-depth);
			inset-inline: var(--_radius);
		} .top {
			inset-block-start: 0;
			transform: rotateX(270deg);
			transform-origin: center top;
		} .bottom {
			inset-block-end: 0;
			transform: rotateX(90deg);
			transform-origin: center bottom;
		}

		.corner {
			position: absolute;
			transform-style: preserve-3d;
		} .corner > * {
			position: absolute;
			inset-block-end: 0;
			width: var(--_depth);
			height: calc(2 * var(--_radius) * sin(45deg / var(--_n)));
			transform-origin: bottom center;
			transform:
				translateZ(calc(var(--_radius) * cos(var(--_i) * 90deg / var(--_n))))
				translateY(calc(-1 * var(--_radius) * sin(var(--_i) * 90deg / var(--_n))))
				rotateX(calc(45deg * (2 * var(--_i) + 1) / var(--_n)));
		}

		.top-right {
			inset-block-start: 0;
			inset-inline-end: 0;

			transform:
				rotateY(90deg)
				translateZ(calc(-1 * var(--_radius)))
				translateY(var(--_radius));
		} .bottom-right {
			inset-block-end: 0;
			inset-inline-end: 0;

			transform:
				rotateY(90deg)
				rotateX(270deg)
				translateZ(calc(-1 * var(--_radius)))
				translateY(var(--_radius));
		} .bottom-left {
			inset-block-end: 0;
			inset-inline-start: 0;

			transform:
				rotateY(90deg)
				rotateX(180deg)
				translateZ(calc(-1 * var(--_radius)))
				translateY(var(--_radius));
		} .top-left {
			inset-block-start: 0;
			inset-inline-start: 0;

			transform:
				rotateY(90deg)
				rotateX(90deg)
				translateZ(calc(-1 * var(--_radius)))
				translateY(var(--_radius));
		}

		:host(:not([facedown])) .container {
			animation: flip-to-front linear var(--_duration) 1 both;
		} :host([facedown]) .container {
			animation: flip-to-back linear var(--_duration) 1 both;
		}

		@keyframes flip-to-back {
			0% {
				transform: translateZ(0em) rotateY(0deg);
				animation-timing-function: ease-in;
			} 50% {
				transform: translateZ(var(--_height)) rotateY(-90deg);
				animation-timing-function: ease-out;
			} 100% {
				transform: translateZ(calc(-1 * var(--_depth))) rotateY(-180deg);
				animation-timing-function: ease-out;
			}
		}

		@keyframes flip-to-front {
			0% {
				transform: translateZ(calc(-1 * var(--_depth))) rotateY(-180deg);
				animation-timing-function: ease-in;
			} 50% {
				transform: translateZ(var(--_height)) rotateY(-270deg);
				animation-timing-function: ease-out;
			} 100% {
				transform: translateZ(0em) rotateY(-360deg);
				animation-timing-function: ease-out;
			}
		}

		@media (prefers-reduced-motion: reduce) {
			.container {
				animation-duration: 0s !important;
			}
		}
	`

	static get observedAttributes() {
		return ["facedown", "corner-accuracy"]
	}

	constructor() {
		super()

		this.#createRoot()
	}

	get facedown() { return this.hasAttribute("facedown") }
	set facedown(value: boolean) { this.toggleAttribute("facedown", value) }

	get cornerAccuracy() { return parseInt(this.getAttribute("corner-accuracy") ?? "4") }
	set cornerAccuracy(value: number) { this.setAttribute("corner-accuracy", value.toString()) }

	flip() { this.facedown = !this.facedown }

	recalculateBorderRadius() {
		this.#container?.style.setProperty("--_radius", getComputedStyle(this).borderRadius)
	}

	#front: HTMLElement
	#back: HTMLElement
	#container: HTMLElement
	#corners: NodeListOf<HTMLElement>

	connectedCallback() {
		this.#front = this.shadowRoot!.querySelector<HTMLElement>(".front")
		this.#back = this.shadowRoot!.querySelector<HTMLElement>(".back")
		this.#container = this.shadowRoot!.querySelector<HTMLElement>(".container")
		this.#corners = this.shadowRoot!.querySelectorAll<HTMLElement>(".corner")

		this.#setAccessibleText(this.facedown)
		this.#createCorners(this.cornerAccuracy)
		this.recalculateBorderRadius()
	}

	attributeChangedCallback(attribute: string, oldValue: string, newValue: string) {
		this.#attributeCallbacks[attribute]?.(newValue, oldValue)
	}

	#attributeCallbacks = {
		"facedown": (newValue: string | undefined | null) => {
			this.#setAccessibleText(newValue != null)
		},
		"corner-accuracy": (newValue: string | undefined | null) => {
			this.#createCorners(parseInt(newValue))
		},
	}

	#setAccessibleText(facedown: boolean) {
		this.#front?.setAttribute("aria-hidden", facedown.toString())
		this.#back?.setAttribute("aria-hidden", (!facedown).toString())
	}

	#createCorners(accuracy: number) {
		this.#corners?.forEach((corner) => {
			corner.style.setProperty("--_n", accuracy.toString())
			corner.replaceChildren(...Array.from({ length: accuracy }).map((_, i) => {
				const cornerPart = document.createElement("div")
				cornerPart.style.setProperty("--_i", i.toString())
				cornerPart.setAttribute("part", "edge")
				return cornerPart
			}))
		})
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
