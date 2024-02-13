import type { TypewrittenTextElement } from "@auroratide/typewritten-text"

export const setupDemos = () => {
	document.querySelectorAll("wc-demo").forEach((demo) => {
		const button = demo.querySelector(".run")
		const typewriters = demo.querySelectorAll<TypewrittenTextElement>("typewritten-text")
	
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
	})
}