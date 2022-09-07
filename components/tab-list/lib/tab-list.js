import { TabItemElement } from './tab-item.js'
import { TabPanelElement } from './tab-panel.js'

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
     * @returns {'horizontal' | 'vertical'}
     */
    get orientation() {
        return this.getAttribute('orientation') ?? 'horizontal'
    }

    /**
     * @param {'horizontal' | 'vertical'}
     */
    set orientation(value) {
        return this.setAttribute('orientation', value)
    }

    /**
     * @returns {Array<TabItemElement>}
     */
    tabs = () => {
        return Array.from(this.querySelectorAll(TabItemElement.defaultElementName))
    }

    /**
     * @returns {Array<TabPanelElement>}
     */
    panels = () => {
        return this.tabs().map((tab) => tab.panel)
    }

    /**
     * @returns {TabItemElement | undefined}
     */
    selected = () => {
        return this.tabs().find((tab) => tab.hasAttribute('selected'))
    }

    /**
     * @param {TabItemElement | undefined} toSelect 
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

    attributeChangedCallback(name) {
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
