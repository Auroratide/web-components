import { changeEvent } from "./events.js"
import { TabItemElement } from "./tab-item.js"
import type { TabPanelElement } from "./tab-panel.js"

export type Orientation = "horizontal" | "vertical"
export type Activation = "manual" | "automatic"

/**
 * Represents a set of tabs, where only one tab's contents may be presented at a time.
 */
export class TabListElement extends HTMLElement {
	static defaultElementName = "tab-list"

	static html = `
        <slot></slot>
    `

	static css = `
        :host {
            display: flex;
            flex-wrap: wrap;
        }

        :host([orientation="vertical"]) {
            flex-direction: column;
            width: 50%;
        }
    `

	static get observedAttributes() {
		return ["orientation"]
	}

	constructor() {
		super()

		this.#createRoot()
	}

	/**
     * Whether the tab is horizontal or vertical. Determines whether Left/Right or Up/Down navigates the tabs.
     */
	get orientation(): Orientation {
		return this.getAttribute("orientation") as Orientation ?? "horizontal"
	}
	set orientation(value: Orientation) {
		this.setAttribute("orientation", value)
	}

	/**
     * Determines whether a tab shows upon tab click (manual) or focus (automatic).
     */
	get activation(): Activation {
		return this.getAttribute("activation") as Activation ?? "manual"
	}
	set activation(value: Activation) {
		this.setAttribute("activation", value)
	}

	/**
     * List of tab-items in this list.
     */
	tabs = (): TabItemElement[] => {
		return Array.from(this.querySelectorAll(TabItemElement.defaultElementName))
	}

	/**
     * List of tab-panels associated with this list.
     */
	panels = (): TabPanelElement[] => {
		return this.tabs().map((tab) => tab.panel)
	}

	/**
     * Find the currently selected tab-item element.
     */
	selected = (): TabItemElement | undefined => {
		return this.tabs().find((tab) => tab.hasAttribute("selected"))
	}

	/**
     * Updates the visibility state of tab-panels based on the currently selected tab.
     */
	updateSelected = (toSelect?: TabItemElement) => {
		const previousSelected = this.tabs().find((tab) => tab.hasAttribute("selected") && tab !== toSelect)
		toSelect = toSelect ?? previousSelected

		this.tabs().forEach((tab) => {
			if (tab !== toSelect) {
				tab.removeAttribute("selected")
			}
		})
        
		this.panels().forEach((panel) => {
			if (panel !== undefined)
				panel.hidden = true
		})

		if (toSelect?.panel !== undefined) {
			toSelect.panel.hidden = false
		}

		if (toSelect !== previousSelected) {
			this.dispatchEvent(changeEvent(previousSelected, toSelect))
		}
	}

	connectedCallback() {
		this.setAttribute("role", "tablist")
		this.addEventListener("keydown", this.#handleNavigation)

		window.customElements.whenDefined(TabItemElement.defaultElementName).then(() => {
			this.updateSelected()
		})
	}

	attributeChangedCallback() {
		if (this.orientation === "vertical") {
			this.setAttribute("aria-orientation", "vertical")
		} else {
			this.removeAttribute("aria-orientation")
		}
	}

	#handleNavigation = (e) => {
		const keys = this.#keysForOrientation()
		if (keys.includes(e.key)) {
			e.preventDefault()

			const tabs = this.tabs()
			const { index: previousIndex } = this.#unfocusActiveTab(tabs)

			let nextIndex = 0
			if (e.key === "Home") {
				nextIndex = 0
			} else if (e.key === "End") {
				nextIndex = tabs.length - 1
			} else {
				nextIndex = this.#mod(previousIndex + (e.key === keys[0] ? -1 : 1), tabs.length)
			}

			this.#focusNextTab(tabs[nextIndex])
		}
	}

	#keysForOrientation = () => {
		const arrowKeys = this.orientation === "vertical"
			? ["ArrowUp", "ArrowDown"]
			: ["ArrowLeft", "ArrowRight"]

		return [...arrowKeys, "Home", "End"]
	}

	#unfocusActiveTab = (tabs) => {
		if (tabs.includes(document.activeElement)) {
			const tab = document.activeElement
			const index = tabs.indexOf(tab)
			tab.setAttribute("tabindex", "-1")

			return { tab, index }
		}
	}

	#focusNextTab = (tab) => {
		tab?.setAttribute("tabindex", "0")
		tab?.focus()
	}

	#mod = (x, n) => ((x % n) + n) % n

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = TabListElement.css

		const template = document.createElement("template")
		template.innerHTML = TabListElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
