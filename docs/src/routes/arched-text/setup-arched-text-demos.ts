import type { ArchedTextElement } from "@auroratide/arched-text"

export const setupArchedTextDemos = () => {
	document.querySelectorAll(".arch-amount-demo").forEach((demo) => {
		const text = demo.querySelector<ArchedTextElement>("arched-text")
		const input = demo.querySelector("input")

		input?.addEventListener("input", (e) => {
			const newValue = (e.target as HTMLInputElement).value
			text?.setAttribute("amount", newValue)
		})
	})
}
