import type { TypewrittenTextElement } from "@auroratide/typewritten-text"

export const setupDialogDemo = () => {
	const janet = document.querySelector<TypewrittenTextElement>("#janet typewritten-text")
	const dinesh = document.querySelector<TypewrittenTextElement>("#dinesh typewritten-text")
	const rerun = document.querySelector("#dialog-demo .rerun")

	let timeout = 0

	janet?.addEventListener("typed", () => {
		timeout = setTimeout(() => dinesh?.type(), dinesh?.repeatInterval)
	})

	rerun?.addEventListener("click", () => {
		clearTimeout(timeout)
		dinesh?.pause()
		janet?.reset()
		dinesh?.reset()
		janet?.type()
	})
}
