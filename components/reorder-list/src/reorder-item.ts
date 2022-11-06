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

    static get observedAttributes() {
        return ['aria-selected']
    }

    constructor() {
        super()

        this.#createRoot()
    }

    list = (): ReorderListElement =>
        this.closest(ReorderListElement.defaultElementName)

    connectedCallback() {
        this.setAttribute('role', 'option')

        if (!this.hasAttribute('aria-selected')) {
            this.#setDefaultFocusability()
        }
    }

    attributeChangedCallback() {
        this.setAttribute('tabindex',
            this.getAttribute('aria-selected') === 'true' ? '0' : '-1'
        )
    }

    #setDefaultFocusability = () => {
        const items = this.list().items()
        const noOtherItemIsFocusable = null == items.find((it) => it.getAttribute('aria-selected') === 'true')
        if (this === items[0] && noOtherItemIsFocusable) {
            this.setAttribute('aria-selected', 'true')
        } else {
            this.setAttribute('aria-selected', 'false')
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
