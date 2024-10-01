import { NavigationRippleElement } from "./navigation-ripple.js"

export function setupNavigationRipple() {
	document.body.addEventListener("click", (e: MouseEvent) => {
		if (isAnchor(e.target)) {
			NavigationRippleElement.triggerAt({
				x: e.clientX,
				y: e.clientY,
			})
		}
	})
}

function isAnchor(target: EventTarget | null): target is HTMLAnchorElement {
	return target != null
		&& "nodeName" in target
		&& (target.nodeName as string).toLowerCase() === "a"
}
