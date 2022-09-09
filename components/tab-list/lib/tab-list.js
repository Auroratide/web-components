import { TabItemElement } from './tab-item.js'

/**
 * Represents a set of tabs, where only one tab's contents may be presented at a time.
 * @extends HTMLElement
 */
export class TabListElement extends HTMLElement {
    static defaultElementName = 'tab-list'

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
        return ['orientation']
    }

    constructor() {
        super()

        this.#createRoot()
    }

    /**
     * Whether the tab is horizontal or vertical. Determines whether Left/Right or Up/Down navigates the tabs.
     * @member {'horizontal' | 'vertical'}
     */
    get orientation() {
        return this.getAttribute('orientation') ?? 'horizontal'
    }
    set orientation(value) {
        return this.setAttribute('orientation', value)
    }

    /**
     * List of tab-items in this list.
     * @returns {import('./tab-item').TabItemElement[]}
     */
    tabs = () => {
        return Array.from(this.querySelectorAll(TabItemElement.defaultElementName))
    }

    /**
     * List of tab-panels associated with this list.
     * @returns {import('./tab-panel').TabPanelElement[]}
     */
    panels = () => {
        return this.tabs().map((tab) => tab.panel)
    }

    /**
     * Find the currently selected tab-item element.
     * @returns {import('./tab-item').TabItemElement | undefined}
     */
    selected = () => {
        return this.tabs().find((tab) => tab.hasAttribute('selected'))
    }

    /**
     * Updates the visibility state of tab-panels based on the currently selected tab.
     * @param {import('./tab-item').TabItemElement | undefined} toSelect
     */
    updateSelected = (toSelect) => {
        toSelect = toSelect ?? this.selected()

        this.tabs().forEach((tab) => {
            if (tab !== toSelect) {
                tab.removeAttribute('selected')
            }
        })
        
        this.panels().forEach((panel) => {
            if (panel !== undefined)
                panel.hidden = true
        })

        if (toSelect?.panel !== undefined) {
            toSelect.panel.hidden = false
        }
    }

    connectedCallback() {
        this.setAttribute('role', 'tablist')
        this.addEventListener('keydown', this.#handleNavigation)

        window.customElements.whenDefined(TabItemElement.defaultElementName).then(() => {
            this.updateSelected()
        })
    }

    attributeChangedCallback() {
        if (this.orientation === 'vertical') {
            this.setAttribute('aria-orientation', 'vertical')
        } else {
            this.removeAttribute('aria-orientation')
        }
    }

    /**
     * @param {KeyboardEvent} e
     */
    #handleNavigation = (e) => {
        const keys = this.#keysForOrientation()
        if (keys.includes(e.key)) {
            e.preventDefault()

            const tabs = this.tabs()
            const focused = tabs.find((tab) => tab.getAttribute('tabindex') === '0')
            const focusedIndex = tabs.indexOf(focused)

            focused.setAttribute('tabindex', '-1')

            const nextIndex = (((focusedIndex + (e.key === keys[0] ? -1 : 1)) % tabs.length) + tabs.length) % tabs.length

            tabs[nextIndex].setAttribute('tabindex', '0')
            tabs[nextIndex].focus()
        }
    }

    #keysForOrientation = () => {
        return this.orientation === 'vertical'
            ? ['ArrowUp', 'ArrowDown']
            : ['ArrowLeft', 'ArrowRight']
    }

    #createRoot = () => {
        const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' })

        const style = document.createElement('style')
        style.innerHTML = this.constructor.css

        const template = document.createElement('template')
        template.innerHTML = this.constructor.html

        root.appendChild(style)
        root.appendChild(template.content)

        return root
    }
}
