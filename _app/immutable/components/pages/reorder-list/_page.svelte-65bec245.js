import{_ as o}from"../../../chunks/preload-helper-b21cceae.js";import{S as d,i as c,s as h,a as m,k as u,J as g,h as a,c as b,l as j,m as f,b as i,B as l}from"../../../chunks/index-4befff42.js";const y=`<h1>The reorder-list Elements</h1>
<p hidden><strong><a href="https://auroratide.github.io/web-components/reorder-list">View this page with live demos!</a></strong></p>
<p>The <code>reorder-list</code> and <code>reorder-item</code> elements represent an ordered list of items that can be reordered. They are built with accessibility in mind and implement the WAI-ARIA guidelines for <a href="https://www.w3.org/WAI/ARIA/apg/example-index/listbox/listbox-rearrangeable.html">rearrangable listboxes</a>.</p>
<wc-demo>
    <reorder-list>
        <reorder-item>Apple</reorder-item>
        <reorder-item>Orange</reorder-item>
        <reorder-item>Banana</reorder-item>
        <reorder-item>Lime</reorder-item>
        <reorder-item>Blueberry</reorder-item>
        <reorder-item>Plum</reorder-item>
    </reorder-list>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">reorder-list</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Apple<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Orange<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Banana<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Lime<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Blueberry<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Plum<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-list</span>&gt;</span>
</code></pre>
<h2>Installation</h2>
<p>You can import through CDN:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;module&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/@auroratide/reorder-list/lib/define.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>Or, you may install through <a href="https://www.npmjs.com/package/@auroratide/reorder-list">NPM</a> and include it as part of your build process:</p>
<pre><code>$ npm i @auroratide/reorder-list
</code></pre>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@auroratide/reorder-list/lib/define.js&#x27;</span>
</code></pre>
<h2>Usage</h2>
<p><code>reorder-list</code> and <code>reorder-item</code> are <strong>markup elements</strong> that you can use in your HTML document. To use them together, it is best to follow these guidelines:</p>
<ul>
<li><code>reorder-item</code> elements <strong>must</strong> be <em>direct</em> descendents of a <code>reorder-list</code> element. This is similar to how <code>li</code> must directly descend <code>ol</code>.</li>
</ul>
<h2>CSS Customization</h2>
<p>Since these are native custom elements, they can be styled the same way as regular HTML elements.</p>
<p>Of note:</p>
<ul>
<li><code>reorder-item[data-dragging]</code> will style the currently dragged item.</li>
</ul>
<p>Here's an example of a customized list meant to look like reorderable cards.</p>
<wc-demo id="fancy">
    <reorder-list>
        <reorder-item>
            <strong>Cobb Salad</strong>
            <ul>
                <li>chicken</li>
                <li>egg</li>
                <li>tomato</li>
            </ul>
        </reorder-item>
        <reorder-item>
            <strong>Fried Rice</strong>
            <ul>
                <li>rice</li>
                <li>shrimp</li>
                <li>egg</li>
            </ul>
        </reorder-item>
        <reorder-item>
            <strong>Chimichanga</strong>
            <ul>
                <li>chicken</li>
                <li>beans</li>
            </ul>
        </reorder-item>
        <reorder-item>
            <strong>Banana Pancake</strong>
            <ul>
                <li>breakfast</li>
                <li>banana</li>
            </ul>
        </reorder-item>
        <reorder-item>
            <strong>Philly Cheese Sandwich</strong>
            <ul>
                <li>steak</li>
                <li>cheese</li>
                <li>bread</li>
            </ul>
        </reorder-item>
    </reorder-list>
</wc-demo>
<style>
    #fancy reorder-list {
        list-style: none;
        background: #ddd;
        border-radius: 0.5em;
        width: min(400px, 100%);
        padding: 0.5em;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
    #fancy reorder-item {
        background: #fff;
        border-radius: 0.25em;
        padding: 0.5em;
        box-shadow: 0 0.1em 0.15em #0002;
    }
    #fancy ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
        padding: 0;
        margin: 0;
        font-size: 90%;
        color: #2573C1;
    }
</style>
<pre><code class="language-css">reorder-list {
    <span class="hljs-attribute">list-style</span>: none;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ddd</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-built_in">min</span>(<span class="hljs-number">400px</span>, <span class="hljs-number">100%</span>);
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
    <span class="hljs-attribute">gap</span>: <span class="hljs-number">0.5em</span>;
}

reorder-item {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.25em</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0.1em</span> <span class="hljs-number">0.15em</span> <span class="hljs-number">#0002</span>;
}

reorder-item <span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">list-style</span>: none;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-wrap</span>: wrap;
    <span class="hljs-attribute">gap</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">90%</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#2573C1</span>;
}
</code></pre>
<h2>Events</h2>
<p>The <code>reorder-list</code> element dispatches the following events:</p>
<table>
<thead>
<tr>
<th>Name</th>
<th>When Triggered</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>reorder-list:change</code></td>
<td>Whenever an item in the list is reordered</td>
</tr>
</tbody>
</table>
<p>The <code>reorder-list:change</code> event contains a reference to the item that was reordered, its previous position in the list, and its new position.</p>
<pre><code class="language-js">list.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;reorder-list:change&#x27;</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(e.<span class="hljs-property">detail</span>.<span class="hljs-property">item</span>)
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(e.<span class="hljs-property">detail</span>.<span class="hljs-property">oldIndex</span>)
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(e.<span class="hljs-property">detail</span>.<span class="hljs-property">newIndex</span>)
})
</code></pre>
<h2>Accessibility</h2>
<p>This custom element is build with accessibility in mind! It follows the WAI-ARIA guidelines for <a href="https://www.w3.org/WAI/ARIA/apg/example-index/listbox/listbox-rearrangeable.html">rearrangable listboxes</a> (the <code>listbox</code> and <code>option</code> roles).</p>
<ul>
<li>When focus enters the list, focus goes to the currently active list item.</li>
<li><kbd>Up</kbd> and <kbd>Down</kbd> can be used to navigate the list, focusing on an element that will be reordered.</li>
<li><kbd>Alt</kbd> + <kbd>Up</kbd>/<kbd>Down</kbd> moves the currently selected list item up or down in the order.</li>
</ul>
`;function w(r){let e,n;return{c(){e=m(),n=u("article"),this.h()},l(s){g("svelte-1pq5n9w",document.head).forEach(a),e=b(s),n=j(s,"ARTICLE",{});var p=f(n);p.forEach(a),this.h()},h(){document.title="The reorder-list Element"},m(s,t){i(s,e,t),i(s,n,t),n.innerHTML=y},p:l,i:l,o:l,d(s){s&&a(e),s&&a(n)}}}function x(r){return o(()=>import("../../../chunks/define-a3c3ba96.js"),[],import.meta.url),[]}class v extends d{constructor(e){super(),c(this,e,x,w,h,{})}}export{v as default};
