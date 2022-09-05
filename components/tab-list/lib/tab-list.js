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
            gap: 4px;
            padding: 0 4px;
        }
    `

    static get observedAttributes() {
        return []
    }

    constructor() {
        super()

        this.#createRoot()
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

    /**
     * @param {KeyboardEvent} e
     */
    #handleNavigation = (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const tabs = this.tabs()
            const focused = tabs.find((tab) => tab.getAttribute('tabindex') === '0')
            const focusedIndex = tabs.indexOf(focused)

            focused.setAttribute('tabindex', '-1')

            const nextIndex = (((focusedIndex + (e.key === 'ArrowLeft' ? -1 : 1)) % tabs.length) + tabs.length) % tabs.length

            tabs[nextIndex].setAttribute('tabindex', '0')
            tabs[nextIndex].focus()
        }
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
