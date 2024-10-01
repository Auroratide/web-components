import type { Action } from "svelte/action"

export const animatedDetails: Action<HTMLDetailsElement> = (node) => {
	const summary = node.querySelector(":scope > summary")
	const links = node.querySelectorAll("a")

	const open = () => node.open = true
	const close = () => {
		node.dataset.closing = ""
		node.setAttribute("aria-expanded", "false")

		const target = node.querySelector(":scope > summary ~ *")
		target?.addEventListener("animationend", () => {
			delete node.dataset.closing
			node.removeAttribute("aria-expanded")
			node.open = false
		}, { once: true })
	}

	const handleClick = (e: Event) => {
		e.preventDefault()
		if (!node.open) open()
		else close()
	}

	summary?.addEventListener("click", handleClick)

	const handleNav = () => {
		close()
	}

	links.forEach((link) => link.addEventListener("click", handleNav))

	return {
		destroy: () => {
			summary?.removeEventListener("click", handleClick)
			links.forEach((link) => link.removeEventListener("click", handleNav))
		},
	}
}
