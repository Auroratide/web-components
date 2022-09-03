import { highlightAllUnder } from 'prismjs'
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-markup.min.js'
import 'prismjs/components/prism-css.min.js'

/**
 * @param {Element} node 
 * @param {Symbol} key
 */
export const highlight = (node, key) => {
    let currentKey = key
    highlightAllUnder(node)

    return {
        /**
         * @param {Symbol} key 
         */
        update(key) {
            if (currentKey !== key) {
                currentKey = key
                highlightAllUnder(node)
            }
        }
    }
}
