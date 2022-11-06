import { ReorderItemElement } from './reorder-item.js'

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

    items = (): ReorderItemElement[] =>
        Array.from(this.querySelectorAll(ReorderItemElement.defaultElementName))

    connectedCallback() {
        this.setAttribute('role', 'listbox')

        this.addEventListener('keydown', this.#handleNav)
    }

    #handleNav = (e: KeyboardEvent) => {
        const keys = this.#keysForOrientation()
        if (keys.includes(e.key)) {
            const items = this.items()
            let currentFocusable = items.findIndex((it) => it.getAttribute('tabindex') === '0')
            if (currentFocusable < 0) {
                currentFocusable = 0
            }
            const nextFocusable = Math.max(0,
                Math.min(items.length - 1,
                    currentFocusable + (e.key === keys[0] ? -1 : 1)
                )
            )

            if (currentFocusable !== nextFocusable) {
                e.preventDefault()

                this.#changeFocus(items, items[nextFocusable])
            }
        }
    }

    #keysForOrientation = () => {
        return ['ArrowUp', 'ArrowDown']
    }

    #changeFocus = (items: ReorderItemElement[], newItem: ReorderItemElement) => {
        items.forEach((item) => {
            item.setAttribute('tabindex', '-1')
        })

        newItem.setAttribute('tabindex', '0')
        newItem.focus()
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
