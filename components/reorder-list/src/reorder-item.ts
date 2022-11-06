import { ReorderListElement } from './reorder-list.js'

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

    list = (): ReorderListElement =>
        this.closest(ReorderListElement.defaultElementName)

    connectedCallback() {
        this.setAttribute('role', 'option')

        this.#setDefaultFocusability()
    }

    #setDefaultFocusability = () => {
        const items = this.list().items()
        const noOtherItemIsFocusable = null == items.find((it) => it.getAttribute('tabindex') === '0')
        if (this === items[0] && noOtherItemIsFocusable) {
            this.setAttribute('tabindex', '0')
        } else {
            this.setAttribute('tabindex', '-1')
        }
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
