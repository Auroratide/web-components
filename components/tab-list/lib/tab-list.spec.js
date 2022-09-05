import { fixture, expect } from '@open-wc/testing'
import './define.js'

/**
 * @param {Element} node 
 */
const asTabContainer = (node) => ({
    node: node,
    tab: (name) => node.querySelector(`tab-item[for="${name}"]`),
    panel: (name) => node.querySelector(`#${name}`),
})

describe('tab-list', () => {
    describe('aria requirements', () => {
        it('roles', async () => {
            const container = asTabContainer(await fixture(`<div>
                <tab-list>
                    <tab-item for="first" selected>First</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
            </div>`))
    
            expect(container.node.querySelector('tab-list').getAttribute('role')).to.equal('tablist')
            expect(container.node.querySelector('tab-item').getAttribute('role')).to.equal('tab')
            expect(container.node.querySelector('tab-panel').getAttribute('role')).to.equal('tabpanel')
        })

        it('aria-controls', async () => {
            const container = asTabContainer(await fixture(`<div>
                <tab-list>
                    <tab-item for="first" selected>First</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
            </div>`))
    
            expect(container.tab('first').getAttribute('aria-controls')).to.equal('first')
        })

        it('aria-selected', async () => {
            const container = asTabContainer(await fixture(`<div>
                <tab-list>
                    <tab-item for="first" selected>First</tab-item>
                    <tab-item for="second">First</tab-item>
                </tab-list>
                <tab-panel id="first"><p>Content of first.</p></tab-panel>
                <tab-panel id="second"><p>Content of second.</p></tab-panel>
            </div>`))
    
            expect(container.tab('first').getAttribute('aria-selected')).to.equal('true')
            expect(container.tab('second').getAttribute('aria-selected')).to.equal('false')
        })
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
