import { fixture, expect } from '@open-wc/testing'
import '../lib/define.js'

describe('reorder-list', () => {
    it('increases', async () => {
        const elem = await fixture(`<reorder-list></reorder-list>`)
        const button = elem.shadowRoot.querySelector('#increase')
        const currentValue = () => elem.shadowRoot.querySelector('#value').textContent

        expect(currentValue()).to.equal('0')

        await button.click()
        expect(currentValue()).to.equal('1')

        await button.click()
        expect(currentValue()).to.equal('2')
    })

    it('decreases', async () => {
        const elem = await fixture(`<reorder-list value="7"></reorder-list>`)
        const button = elem.shadowRoot.querySelector('#decrease')
        const currentValue = () => elem.shadowRoot.querySelector('#value').textContent

        expect(currentValue()).to.equal('7')

        await button.click()
        expect(currentValue()).to.equal('6')

        await button.click()
        expect(currentValue()).to.equal('5')
    })
})
