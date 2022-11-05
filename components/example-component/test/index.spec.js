import { fixture, expect } from '@open-wc/testing'
import '../lib/define.js'

describe('example-component', () => {
    it('increases', async () => {
        const elem = await fixture(`<example-component></example-component>`)
        const button = elem.shadowRoot.querySelector('#increase')
        const currentValue = () => elem.shadowRoot.querySelector('#value').textContent

        expect(currentValue()).to.equal('0')

        await button.click()
        expect(currentValue()).to.equal('1')

        await button.click()
        expect(currentValue()).to.equal('2')
    })

    it('decreases', async () => {
        const elem = await fixture(`<example-component value="7"></example-component>`)
        const button = elem.shadowRoot.querySelector('#decrease')
        const currentValue = () => elem.shadowRoot.querySelector('#value').textContent

        expect(currentValue()).to.equal('7')

        await button.click()
        expect(currentValue()).to.equal('6')

        await button.click()
        expect(currentValue()).to.equal('5')
    })
})
