import{_ as p}from"../chunks/preload-helper.BQ24v_F8.js";import{s as h,n as i,o as r}from"../chunks/scheduler.Ce_0Mfso.js";import{S as d,i as g,s as m,m as u,l as b,d as c,h as j,n as w,f,o as y,p as k,q as x,r as _}from"../chunks/index.QmGHi4hh.js";import{C as v}from"../chunks/events.C44j2o98.js";import{R as q}from"../chunks/Readme.BbztUA8r.js";const T=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global,A=`<h1 id="the-toggle-switch-element">The toggle-switch Element</h1>
<p hidden><strong><a href="https://auroratide.github.io/web-components/toggle-switch">View this page with live demos!</a></strong></p>
<p>The <code>toggle-switch</code> element represents a control that is either on or off. This component is built with accessibility in mind and implements the WAI-ARIA <a href="https://www.w3.org/TR/wai-aria-1.1/#switch">switch role</a>.</p>
<wc-demo>
    <label for="example-01">Active?</label>
    <toggle-switch id="example-01"></toggle-switch>
    <p id="example-01-output">Off</p>
</wc-demo>
<style>
    label, toggle-switch {
        vertical-align: middle;
    }
</style>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;example-01&quot;</span>&gt;</span>Active?<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">toggle-switch</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;example-01&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">toggle-switch</span>&gt;</span>
</code></pre>
<p><strong>Note</strong>: The on/off semantic is slightly different from the checked/unchecked semantic of input checkboxes. Additionally, checkboxes can have a third indeterminant value that does not make sense for a toggle switch.</p>
<h2 id="installation">Installation</h2>
<p>You can import through CDN:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;module&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/@auroratide/toggle-switch/lib/define.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>Or, you may install through <a href="https://www.npmjs.com/package/@auroratide/toggle-switch">NPM</a> and include it as part of your build process:</p>
<pre><code>$ npm i @auroratide/toggle-switch
</code></pre>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@auroratide/toggle-switch/lib/define.js&#x27;</span>
</code></pre>
<h2 id="usage">Usage</h2>
<p><code>toggle-switch</code> is an <strong>inline markup element</strong> that you can use in your HTML document. It is a form control, meaning it is appropriate to properly <a href="https://html.spec.whatwg.org/#the-label-element">label</a> it like so:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;example-02&quot;</span>&gt;</span>Can upload cat images: <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">toggle-switch</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;example-02&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">toggle-switch</span>&gt;</span>
</code></pre>
<p>By default, the switch starts in the <strong>off</strong> position. You can have it start in the <strong>on</strong> state instead using the <code>checked</code> attribute:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;example-03&quot;</span>&gt;</span>Can upload cat images: <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">toggle-switch</span> <span class="hljs-attr">checked</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;example-03&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">toggle-switch</span>&gt;</span>
</code></pre>
<wc-demo>
    <label for="example-03">Can upload cat images: </label>
    <toggle-switch checked id="example-03"></toggle-switch>
</wc-demo>
<h3 id="attributes">Attributes</h3>
<table>
<thead>
<tr>
<th>Attribute</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>checked</code></td>
<td>-</td>
<td>Whether the switch is on or not</td>
</tr>
<tr>
<td><code>disabled</code></td>
<td>-</td>
<td>Whether the switch can change states</td>
</tr>
</tbody>
</table>
<h3 id="css-customization">CSS Customization</h3>
<p>The <code>toggle-switch</code> is composed of a <strong>slider</strong> and a <strong>track</strong> which can be individually customized:</p>
<ul>
<li><code>slider</code>, the element that slides when toggled</li>
<li><code>track</code>, the element upon which the slider slides</li>
</ul>
<p>Additionally, using the <code>checked</code> state, you can apply special styling for when the toggle is on.</p>
<p>Here's an example showing how to use CSS to make this look like a Material UI switch:</p>
<wc-demo>
    <label for="fancy-switch">Fancy Switch</label>
    <toggle-switch id="fancy-switch"></toggle-switch>
    <style>
        #fancy-switch {
            height: 1em;
        }
        #fancy-switch::part(track) {
            height: 0.75em;
            border-radius: 1em;
            background-color: hsl(0, 0%, 67%);
            margin: 0.125em 0;
        }
        #fancy-switch::part(slider) {
            width: 1em;
            height: 1em;
            border-radius: 50%;
            background-color: hsl(0, 0%, 100%);
            box-shadow: 0.0625em 0.0625em 0.125em hsla(0, 0%, 0%, 0.25);
            margin: -0.125em 0;
        }
        #fancy-switch[checked]::part(track) {
            background-color: hsl(211, 69%, 57%);
        }
    </style>
</wc-demo>
<pre><code class="language-css">toggle-switch {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
}

toggle-switch<span class="hljs-selector-pseudo">::part</span>(track) {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0.75em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0%</span>, <span class="hljs-number">67%</span>);
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0.125em</span> <span class="hljs-number">0</span>;
}

toggle-switch<span class="hljs-selector-pseudo">::part</span>(slider) {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0%</span>, <span class="hljs-number">100%</span>);
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0.0625em</span> <span class="hljs-number">0.0625em</span> <span class="hljs-number">0.125em</span> <span class="hljs-built_in">hsla</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0%</span>, <span class="hljs-number">0%</span>, <span class="hljs-number">0.25</span>);
    <span class="hljs-attribute">margin</span>: -<span class="hljs-number">0.125em</span> <span class="hljs-number">0</span>;
}

toggle-switch<span class="hljs-selector-attr">[checked]</span><span class="hljs-selector-pseudo">::part</span>(track) {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">hsl</span>(<span class="hljs-number">211</span>, <span class="hljs-number">69%</span>, <span class="hljs-number">57%</span>);
}
</code></pre>
<h2 id="javascript-api">Javascript API</h2>
<p>The element exposes a function to programmatically toggle its state:</p>
<table>
<thead>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>toggle()</code></td>
<td>Change from off to on, or from on to off</td>
</tr>
</tbody>
</table>
<h3 id="properties">Properties</h3>
<p>Each attribute can be accessed as a Javascript property.</p>
<ul>
<li><code>elem.checked</code></li>
<li><code>elem.disabled</code></li>
</ul>
<h3 id="events">Events</h3>
<p>The <code>toggle-switch</code> element dispatches the following events:</p>
<table>
<thead>
<tr>
<th>Name</th>
<th>When Triggered</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>toggle-switch:change</code></td>
<td>Any time the state changes (on to off, or off to on)</td>
</tr>
</tbody>
</table>
<p>The <code>toggle-switch:change</code> event contains the checked state in its details:</p>
<pre><code class="language-js">elem.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;toggle-switch:change&#x27;</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(e.<span class="hljs-property">detail</span>.<span class="hljs-property">checked</span>)
})
</code></pre>
<h2 id="accessibility">Accessibility</h2>
<p>This custom element is built with accessibility in mind! It follows the WAI-ARIA guidelines for the <a href="https://www.w3.org/TR/wai-aria-1.1/#switch">switch role</a>.</p>
<ul>
<li>The element can be focused</li>
<li>The element can be toggled with <kbd>Enter</kbd> or <kbd>Space</kbd></li>
</ul>
`,{document:o}=T;function C(l){let n,s,t;return s=new q({props:{html:A}}),{c(){n=m(),u(s.$$.fragment),this.h()},l(a){b("svelte-h9oq7s",o.head).forEach(c),n=j(a),w(s.$$.fragment,a),this.h()},h(){o.title="The toggle-switch Element"},m(a,e){f(a,n,e),y(s,a,e),t=!0},p:i,i(a){t||(k(s.$$.fragment,a),t=!0)},o(a){x(s.$$.fragment,a),t=!1},d(a){a&&c(n),_(s,a)}}}function E(l){return p(()=>import("../chunks/define.BEaBwacd.js"),__vite__mapDeps([0,1]),import.meta.url),r(()=>{const n=document.querySelector("#example-01"),s=document.querySelector("#example-01-output");n&&s&&(n==null||n.addEventListener(v,t=>{t.detail.checked?(s.textContent="On",s.classList.add("example-active")):(s.textContent="Off",s.classList.remove("example-active"))}))}),[]}class L extends d{constructor(n){super(),g(this,n,E,C,h,{})}}export{L as component};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["../chunks/define.BEaBwacd.js","../chunks/events.C44j2o98.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
