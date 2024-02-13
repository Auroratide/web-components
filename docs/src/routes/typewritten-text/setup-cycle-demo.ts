import type { TypewrittenTextElement } from "@auroratide/typewritten-text"

export const setupCycleDemo = () => {
	document.querySelectorAll(".typewriter-cycle").forEach((cycle) => {
		const items = cycle.querySelectorAll<TypewrittenTextElement>("typewritten-text")
		for (let i = 0; i < items.length; ++i) {
			const cur = items[i]
			const next = items[(i + 1) % items.length]

			cur.addEventListener("typed", () => setTimeout(() => cur.erase(), cur.repeatInterval))
			cur.addEventListener("erased", () => {
				cur.classList.remove("active")
				next.classList.add("active")
				setTimeout(() => next.type(), next.repeatInterval)
			})
		}
	})
}
