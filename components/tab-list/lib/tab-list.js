import { TabItemElement } from './tab-item.js'
import { TabPanelElement } from './tab-panel.js'

export class TabListElement extends HTMLElement {
    static defaultElementName = 'tab-list'

    static html = `
        <slot></slot>
    `

    static css = ``

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

        window.customElements.whenDefined(TabItemElement.defaultElementName).then(() => {
            this.updateSelected()
        })
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
