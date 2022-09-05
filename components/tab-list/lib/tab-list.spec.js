import { fixture, expect } from '@open-wc/testing'
import './define.js'

describe('tab-list', () => {
    it('roles', async () => {
        const elem = await fixture(`<tab-list></tab-list>`)

        expect(elem.getAttribute('role')).to.equal('tablist')
    })
})
