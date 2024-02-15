import type { FlipCardElement } from "@auroratide/flip-card"

export const setupFlipCardDemos = () => {
	document.querySelectorAll(".flip-card-demo").forEach((demo) => {
		const cards = demo.querySelectorAll<FlipCardElement>("flip-card")
		const button = demo.querySelector("button")

		button?.addEventListener("click", () => {
			cards.forEach((card) => card.flip())
		})
	})
}
