import { fixture, expect } from '@open-wc/testing'
import '../lib/define.js'

describe('reorder-list', () => {
    describe('aria-requirements', () => {
        it('roles', async () => {
            const container = await fixture(`
                <reorder-list>
                    <reorder-item>Apple</reorder-item>
                    <reorder-item>Orange</reorder-item>
                </reorder-list>
            `)

            expect(container.getAttribute('role')).to.equal('listbox')
            container.querySelectorAll('reorder-item').forEach((item) => {
                expect(item.getAttribute('role')).to.equal('option')
            })
        })
    })
})
