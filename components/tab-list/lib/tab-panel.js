export class TabPanelElement extends HTMLElement {
    static defaultElementName = 'tab-panel'

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

    connectedCallback() {
        this.setAttribute('role', 'tabpanel')
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
