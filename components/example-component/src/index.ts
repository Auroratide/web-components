export class ExampleComponentElement extends HTMLElement {
    static defaultElementName = 'example-component'

    static html = `
        <button id="decrease">Decrease</button>
        <span id="value">0</span>
        <button id="increase">Increase</button>
    `

    static css = `
        #value {
            font-weight: bold;
        }
    `

    static get observedAttributes() {
        return ['value']
    }

    constructor() {
        super()

        this.#createRoot()
    }

    get value() {
        return parseInt(this.getAttribute('value') ?? '0')
    }
    set value(value) {
        this.setAttribute('value', value.toString())
    }

    decrease = () => {
        this.value -= 1
    }

    increase = () => {
        this.value += 1
    }

    connectedCallback() {
        this.shadowRoot!
            .querySelector('#decrease')!
            .addEventListener('click', this.decrease)
        
        this.shadowRoot!
            .querySelector('#increase')!
            .addEventListener('click', this.increase)
        
        this.#updateValue()
    }

    attributeChangedCallback() {
        this.#updateValue()
    }

    #updateValue = () => {
        this.shadowRoot!.querySelector('#value')!.textContent = this.value.toString()
    }

    #createRoot = () => {
        const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' })

        const style = document.createElement('style')
        style.innerHTML = ExampleComponentElement.css

        const template = document.createElement('template')
        template.innerHTML = ExampleComponentElement.html

        root.appendChild(style)
        root.appendChild(template.content)

        return root
    }
}
