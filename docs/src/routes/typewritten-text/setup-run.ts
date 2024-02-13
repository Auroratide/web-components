import type { TypewrittenTextElement } from "@auroratide/typewritten-text"

export const setupRun = (name: string) => {
	const button = document.querySelector(`#${name} .run`)
	const typewriters = document.querySelectorAll<TypewrittenTextElement>(`#${name} typewritten-text`)

	typewriters.forEach((elem) => {
		elem.addEventListener("paused", () => {
			if (button?.textContent === "Pause")
				button.textContent = "Run"
		})

		elem.addEventListener("typed", () => {
			elem.classList.add("typed")
		})

		elem.addEventListener("resumed", () => {
			elem.classList.remove("typed")
		})
	})

	const resumeAll = () => {
		typewriters.forEach((elem) => elem.resume())
	}

	const pauseAll = () => {
		typewriters.forEach((elem) => elem.pause())
	}

	button?.addEventListener("click", () => {
		if (button?.textContent === "Run") {
			button.textContent = "Pause"
			resumeAll()
		} else {
			button.textContent = "Run"
			pauseAll()
		}
	})
}