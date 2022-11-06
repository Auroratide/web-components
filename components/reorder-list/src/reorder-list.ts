export class ReorderListElement extends HTMLElement {
    static defaultElementName = 'reorder-list'

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
        this.setAttribute('role', 'listbox')
    }

    #createRoot = () => {
        const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' })

        const style = document.createElement('style')
        style.innerHTML = ReorderListElement.css

        const template = document.createElement('template')
        template.innerHTML = ReorderListElement.html

        root.appendChild(style)
        root.appendChild(template.content)

        return root
    }
}
