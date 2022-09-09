/**
 * @typedef {import('./tab-list').TabListElement} TabListElement
 * @typedef {import('./tab-panel').TabPanelElement} TabPanelElement
 */

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
     * @member {string}
     */
    get for() { return this.getAttribute('for') }
    set for(value) { this.setAttribute('for', value) }

    /**
     * tab-panel element corresponding to this item
     * @readonly
     * @member {TabPanelElement}
     */
    get panel() {
        return document.querySelector(`#${this.for}`)
    }

    /**
     * tab-list element containing this item
     * @readonly
     * @member {TabListElement}
     */
    get list() {
        return this.closest('tab-list')
    }

    /**
     * Whether this tab is the currently selected tab
     * @member {boolean}
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

    /**
     * @private
     * @param {KeyboardEvent} e
     */
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
