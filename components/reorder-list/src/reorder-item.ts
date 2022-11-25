import { ReorderListElement } from './reorder-list.js'

export class ReorderItemElement extends HTMLElement {
    static defaultElementName = 'reorder-item'

    static html = `
        <slot></slot>
    `

    static css = `
        :host {
            display: list-item;
            touch-action: none;
            cursor: grab;
        }
        
        :host([data-dragging]) {
            opacity: 0.5;
            cursor: grabbing;
        }
    `

    static get observedAttributes() {
        return ['aria-selected']
    }

    static START_DRAG_DELAY_MS = 150

    constructor() {
        super()

        this.#createRoot()
    }

    list = (): ReorderListElement =>
        this.closest(ReorderListElement.defaultElementName)

    connectedCallback() {
        this.setAttribute('role', 'option')
        this.addEventListener('pointerdown', this.#onTouchStart)

        if (!this.hasAttribute('aria-selected')) {
            this.#setDefaultFocusability()
        }
    }

    #onTouchStart = (e: PointerEvent) => {
        e.preventDefault()
        this.list().changeFocus(this)

        const timeout = setTimeout(() => this.#onDragStart(), ReorderItemElement.START_DRAG_DELAY_MS)
        const cancelDrag = () => {
            clearTimeout(timeout)
            document.removeEventListener('pointerup', cancelDrag)
            document.removeEventListener('pointercancel', cancelDrag)
            document.removeEventListener('contextmenu', cancelDrag)
        }

        document.addEventListener('pointerup', cancelDrag)
        document.addEventListener('pointercancel', cancelDrag)
        document.addEventListener('contextmenu', cancelDrag)
    }

    #onDragStart = (e?: PointerEvent) => {
        e?.preventDefault()
        this.dataset.dragging = ''

        document.addEventListener('pointermove', this.#onDragMove)
        document.addEventListener('pointerup', this.#onDragEnd)
        document.addEventListener('pointercancel', this.#onDragEnd)
        document.addEventListener('touchmove', this.#preventScroll)
    }

    #onDragMove = (e: PointerEvent) => {
        e.preventDefault()
        const list = this.list()
        const items = list.items()
        const cur = {
            index: items.indexOf(this),
            rect: this.getBoundingClientRect(),
        }
        const prev = {
            index: cur.index - 1,
            rect: items[cur.index - 1]?.getBoundingClientRect(),
        }
        const next = {
            index: cur.index + 1,
            rect: items[cur.index + 1]?.getBoundingClientRect(),
        }

        if (prev.rect && e.clientY < Math.min(prev.rect.top + cur.rect.height, prev.rect.bottom)) {
            list.reorder(cur.index, prev.index, items)
        } else if (next.rect && e.clientY > Math.max(next.rect.bottom - cur.rect.height, next.rect.top)) {
            list.reorder(cur.index, next.index, items)
        }
    }

    #onDragEnd = () => {
        delete this.dataset.dragging
        document.removeEventListener('pointermove', this.#onDragMove)
        document.removeEventListener('pointerup', this.#onDragEnd)
        document.removeEventListener('pointercancel', this.#onDragEnd)
        document.removeEventListener('touchmove', this.#preventScroll)
    }

    #preventScroll = (e: TouchEvent) => {
        e.preventDefault()
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
