export class ReorderItemElement extends HTMLElement {
    static defaultElementName = 'reorder-item'

    static html = `
        <slot></slot>
    `

    static css = `
        :host {
            display: block;
        }
    `

    constructor() {
        super()

        this.#createRoot()
    }

    connectedCallback() {
        this.setAttribute('role', 'option')
    }

    #createRoot = () => {
        const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' })

        const style = document.createElement('style')
        style.innerHTML = ReorderItemElement.css

        const template = document.createElement('template')
        template.innerHTML = ReorderItemElement.html

        root.appendChild(style)
        root.appendChild(template.content)

        return root
    }
}
