import { FLIPPING, FLIPPED } from "./events.js"

export class FlipCardElement extends HTMLElement {
	static defaultElementName = "flip-card"

	static html = `
		<p class="visually-hidden" id="side-label-text">(Frontside)</p>
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
			--_height: var(--flip-height, 20em);
			--_depth: var(--card-depth, 0.15em);
			--_granularity: var(--corner-granularity, 4);

			display: block;
			perspective: 100em;
			transform-style: preserve-3d;
		}

		::slotted(*) {
			display: block;
			width: 100%;
			height: 100%;
			border-radius: inherit;
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
			width: calc(100% - 2 * var(--_radius));
			height: var(--_depth);
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
			height: calc(2 * var(--_radius) * sin(45deg / var(--_granularity)));
			transform-origin: bottom center;
			transform:
				translateZ(calc(var(--_radius) * cos(var(--_i) * 90deg / var(--_granularity))))
				translateY(calc(-1 * var(--_radius) * sin(var(--_i) * 90deg / var(--_granularity))))
				rotateX(calc(45deg * (2 * var(--_i) + 1) / var(--_granularity)));
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
			transform: rotateY(0deg);
		} :host([facedown]) .container {
			transform: rotateY(-180deg);
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

	flip() { this.facedown = !this.facedown }

	#flipToFrontAnimation: AnimationDescription = {
		keyframes: [ {
			transform: "translateZ(calc(-1 * var(--_depth))) rotateY(-180deg)",
		}, {
			transform: "translateZ(var(--_height)) rotateY(-270deg)",
		}, {
			transform: "translateZ(0em) rotateY(-360deg)",
		} ],
		options: {
			easing: "ease-in-out",
		},
	}
	setFlipToFrontAnimation(keyframes: AnimationDescription["keyframes"], options?: AnimationDescription["options"]) {
		this.#flipToFrontAnimation = { keyframes, options }
	}

	#flipToBackAnimation: AnimationDescription = {
		keyframes: [ {
			transform: "translateZ(0em) rotateY(0deg)",
		}, {
			transform: "translateZ(var(--_height)) rotateY(-90deg)",
		}, {
			transform: "translateZ(calc(-1 * var(--_depth))) rotateY(-180deg)",
		} ],
		options: {
			easing: "ease-in-out",
		},
	}
	setFlipToBackAnimation(keyframes: AnimationDescription["keyframes"], options?: AnimationDescription["options"]) {
		this.#flipToBackAnimation = { keyframes, options }
	}

	recreateBorderRadius() {
		this.#container?.style.setProperty("--_radius", getComputedStyle(this).borderRadius)
		this.#createCorners()
	}

	#label: HTMLElement
	#front: HTMLElement
	#back: HTMLElement
	#container: HTMLElement
	#corners: NodeListOf<HTMLElement>

	connectedCallback() {
		this.#label = this.shadowRoot!.querySelector<HTMLElement>("#side-label-text")
		this.#front = this.shadowRoot!.querySelector<HTMLElement>(".front")
		this.#back = this.shadowRoot!.querySelector<HTMLElement>(".back")
		this.#container = this.shadowRoot!.querySelector<HTMLElement>(".container")
		this.#corners = this.shadowRoot!.querySelectorAll<HTMLElement>(".corner")

		this.#setAccessibleSide(this.facedown)
		this.recreateBorderRadius()
	}

	attributeChangedCallback(attribute: string, oldValue: string, newValue: string) {
		this.#attributeCallbacks[attribute]?.(newValue, oldValue)
	}

	#attributeCallbacks = {
		"facedown": (newValue: string | undefined | null) => {
			this.#emit(FLIPPING)
			this.#setAccessibleSide(newValue != null)
			this.#animate()
		},
	}

	#setAccessibleSide(facedown: boolean) {
		this.#front?.setAttribute("aria-hidden", facedown.toString())
		this.#back?.setAttribute("aria-hidden", (!facedown).toString())

		this.#front?.toggleAttribute("inert", facedown)
		this.#back?.toggleAttribute("inert", !facedown)

		if (!this.#label) return
		this.#label.textContent = facedown ? "(Backside)" : "(Frontside)"
	}

	#createCorners() {
		const granularity = parseInt(getComputedStyle(this).getPropertyValue("--_granularity"))
		this.#corners?.forEach((corner) => {
			corner.replaceChildren(...Array.from({ length: granularity }).map((_, i) => {
				const cornerPart = document.createElement("div")
				cornerPart.style.setProperty("--_i", i.toString())
				cornerPart.setAttribute("part", "edge")
				return cornerPart
			}))
		})
	}

	#animate() {
		const duration = prefersReducedMotion()
			? 0
			: cssTimeToMs(getComputedStyle(this).getPropertyValue("--_duration"))

		const animationToPlay = this.facedown ? this.#flipToBackAnimation : this.#flipToFrontAnimation
		const animation = this.#container?.animate(animationToPlay.keyframes, {
			fill: "both",
			...animationToPlay.options,
			duration,
		})

		animation?.addEventListener("finish", () => {
			animation.commitStyles()
			this.#emit(FLIPPED)
		}, { once: true })
	}

	#emit(event: string) {
		this.dispatchEvent(new CustomEvent(event, {
			detail: {
				facedown: this.facedown,
			},
		}))
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

type AnimationDescription = {
	keyframes: Keyframe[] | PropertyIndexedKeyframes,
	options?: Omit<KeyframeAnimationOptions, "duration">,
}

const cssTimeToMs = (time: string) => parseFloat(time) * (time.endsWith("ms") ? 1 : 1000)

const prefersReducedMotion = () => window?.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
