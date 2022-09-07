/**
 * Represents a panel of information.
 */
export class TabPanelElement extends HTMLElement {
    static defaultElementName = 'tab-panel'

    static html = `
        <slot></slot>
    `

    static css = `
        :host {
            border: 1px solid black;
            padding: 4px;
        }

        :host(:not([hidden])) {
            display: block;
        }
    `

    static get observedAttributes() {
        return []
    }

    constructor() {
        super()

        this.#createRoot()
    }

    connectedCallback() {
        this.setAttribute('role', 'tabpanel')
        this.setAttribute('tabindex', '0')
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
