/**
 * Represents a reference of a single panel of information in a tab list.
 * @extends HTMLElement
 */
export class TabItemElement extends HTMLElement {
    static defaultElementName = 'tab-item'

    static html = `
        <slot></slot>
    `

    static css = `
        :host {
            border: 1px solid black;
            border-bottom: 0;
            padding: 1px 4px;
            cursor: pointer;
        }

        :host([selected]) {
            background-color: yellow;
        }

        :host(:hover),
        :host(:focus) {
            background-color: lightgray;
        }
    `

    static get observedAttributes() {
        return ['for', 'selected']
    }

    constructor() {
        super()

        this.#createRoot()
    }

    /**
     * Id of the tab-panel this item references
     * @returns {string}
     */
    get for() { return this.getAttribute('for') }
    set for(value) { this.setAttribute('for', value) }

    /**
     * tab-panel element corresponding to this item
     * @returns {import('./tab-panel').TabPanelElement}
     */
    get panel() {
        return document.querySelector(`#${this.for}`)
    }

    /**
     * tab-list element containing this item
     * @returns {import('./tab-list').TabListElement}
     */
    get list() {
        return this.closest('tab-list')
    }

    /**
     * Whether this tab is the currently selected tab
     * @returns {boolean}
     */
    get selected() { return this.hasAttribute('selected') }
    set selected(value) { this.toggleAttribute('selected', value) }

    connectedCallback() {
        this.setAttribute('role', 'tab')

        this.addEventListener('click', this.#onClick)
        this.addEventListener('keydown', this.#onKeyPress)
    }

    attributeChangedCallback(name) {
        this.setAttribute('aria-controls', this.for)
        this.setAttribute('aria-selected', this.selected.toString())
        this.setAttribute('tabindex', this.selected ? '0' : '-1')
        
        if (name === 'selected') {
            this.list.updateSelected(this.selected ? this : undefined)
        }
    }

    #onClick = () => {
        this.selected = true
    }

    #onKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            this.selected = true
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
