import { fixture, expect } from '@open-wc/testing'
import './define.js'

/**
 * @param {Element} node 
 */
const asTabContainer = (node) => ({
    tab: (name) => node.querySelector(`tab-item[for="${name}"]`),
    panel: (name) => node.querySelector(`#${name}`),
})

describe('tab-list', () => {
    it('roles', async () => {
        const elem = await fixture(`<tab-list></tab-list>`)

        expect(elem.getAttribute('role')).to.equal('tablist')
    })

    it('standard tab selection', async () => {
        const container = asTabContainer(await fixture(`<div>
            <tab-list>
                <tab-item for="first" selected>First</tab-item>
                <tab-item for="second">Second</tab-item>
            </tab-list>
            <tab-panel id="first">
                <p>Content of first.</p>
            </tab-panel>
            <tab-panel id="second">
                <p>Content of second.</p>
            </tab-panel>
        </div>`))

        expect(container.panel('first').hidden).to.be.false
        expect(container.panel('second').hidden).to.be.true

        await container.tab('second').click()

        expect(container.panel('first').hidden).to.be.true
        expect(container.panel('second').hidden).to.be.false
    })
})
