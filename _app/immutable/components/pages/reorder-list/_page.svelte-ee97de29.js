import{_ as d}from"../../../chunks/preload-helper-b21cceae.js";import{S as p,i as c,s as m,a as h,k as g,J as u,h as a,c as j,l as f,m as y,b as o,B as t}from"../../../chunks/index-4befff42.js";const b=`<h1>The reorder-list Elements</h1>
<p hidden><strong><a href="https://auroratide.github.io/web-components/reorder-list">View this page with live demos!</a></strong></p>
<p>The <code>reorder-list</code> and <code>reorder-item</code> elements represent an ordered list of items that can be reordered.</p>
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
`;function w(l){let s,n;return{c(){s=h(),n=g("article"),this.h()},l(e){u("svelte-1pq5n9w",document.head).forEach(a),s=j(e),n=f(e,"ARTICLE",{});var i=y(n);i.forEach(a),this.h()},h(){document.title="The reorder-list Element"},m(e,r){o(e,s,r),o(e,n,r),n.innerHTML=b},p:t,i:t,o:t,d(e){e&&a(s),e&&a(n)}}}function _(l){return d(()=>import("../../../chunks/define-9aa48dc9.js"),[],import.meta.url),[]}class T extends p{constructor(s){super(),c(this,s,_,w,m,{})}}export{T as default};
