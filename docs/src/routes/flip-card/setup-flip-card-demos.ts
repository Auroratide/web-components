import type { FlipCardElement } from "@auroratide/flip-card"

export const setupFlipCardDemos = () => {
	document.querySelectorAll(".flip-card-demo").forEach((demo) => {
		const cards = demo.querySelectorAll<FlipCardElement>("flip-card")
		const button = demo.querySelector("button")

		button?.addEventListener("click", () => {
			cards.forEach((card) => card.flip())
		})
	})

	customElements.whenDefined("flip-card").then(() => {
		document.querySelectorAll<FlipCardElement>(".vertical-flip").forEach((card) => {
			card.setFlipToFrontAnimation(
				[ {
					transform: "translateZ(calc(-1 * var(--_depth))) rotateX(180deg)",
				}, {
					transform: "translateZ(var(--_height)) rotateX(270deg)",
				}, {
					transform: "translateZ(0em) rotateX(360deg)",
				} ],
				{
					easing: "ease-in-out",
				},
			)

			card.setFlipToBackAnimation(
				[ {
					transform: "translateZ(0em) rotateX(0deg)",
				}, {
					transform: "translateZ(var(--_height)) rotateX(90deg)",
				}, {
					transform: "translateZ(calc(-1 * var(--_depth))) rotateX(180deg)",
				} ],
				{
					easing: "ease-in-out",
				},
			)
		})
	})
}
