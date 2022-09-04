import{_ as h}from"../../../chunks/preload-helper-aa6bc0ce.js";import{S as r,i as d,s as g,a as p,k as m,J as u,h as o,c as w,l as b,m as f,b as c,A as l}from"../../../chunks/index-949a6768.js";const k=`<h1>The toggle-switch Element</h1>
<p>The <code>toggle-switch</code> element represents a control that is either on or off. This component is built with accessibility in mind and implements the WAI-ARIA <a href="https://www.w3.org/TR/wai-aria-1.1/#switch">switch role</a>.</p>
<wc-demo hidden>
    <label for="example-01">Active?</label>
    <toggle-switch id="example-01"></toggle-switch>
</wc-demo>
<pre><code class="language-html">&lt;label for=&quot;example-01&quot;&gt;Active?&lt;/label&gt;
&lt;toggle-switch id=&quot;example-01&quot;&gt;&lt;/toggle-switch&gt;
</code></pre>
<p><strong>Note</strong>: The on/off semantic is slightly different from the checked/unchecked semantic of input checkboxes. Additionally, checkboxes can have a third indeterminant value that does not make sense for a toggle switch.</p>
<h2>Installation</h2>
<p>You can import through CDN:</p>
<pre><code class="language-html">&lt;script type=&quot;module&quot; src=&quot;https://unpkg.com/@auroratide/toggle-switch/lib/define.js&quot;&gt;&lt;/script&gt;
</code></pre>
<p>Or, you may install through <a href="https://www.npmjs.com/package/@auroratide/toggle-switch">NPM</a> and include it as part of your build process:</p>
<pre><code>$ npm i @auroratide/toggle-switch
</code></pre>
<pre><code class="language-javascript">import '@auroratide/toggle-switch/lib/define.js'
</code></pre>
<h2>Usage</h2>
<p><code>toggle-switch</code> is an <strong>inline markup element</strong> that you can use in your HTML document. It is a form control, meaning it is appropriate to properly <a href="https://html.spec.whatwg.org/#the-label-element">label</a> it like so:</p>
<pre><code class="language-html">&lt;label for=&quot;example-02&quot;&gt;Can upload cat images: &lt;/label&gt;
&lt;toggle-switch id=&quot;example-02&quot;&gt;&lt;/toggle-switch&gt;
</code></pre>
<p>By default, the switch starts in the <strong>off</strong> position. You can have it start in the <strong>on</strong> state instead using the <code>checked</code> attribute:</p>
<pre><code class="language-html">&lt;label for=&quot;example-03&quot;&gt;Can upload cat images: &lt;/label&gt;
&lt;toggle-switch checked id=&quot;example-03&quot;&gt;&lt;/toggle-switch&gt;
</code></pre>
<wc-demo hidden>
    <label for="example-03">Can upload cat images: </label>
    <toggle-switch checked id="example-03"></toggle-switch>
</wc-demo>
<h3>Attributes</h3>
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
<h3>CSS Customization</h3>
<p>The <code>toggle-switch</code> is composed of a <strong>slider</strong> and a <strong>track</strong> which can be individually customized:</p>
<ul>
<li><code>slider</code>, the element that slides when toggled</li>
<li><code>track</code>, the element upon which the slider slides</li>
</ul>
<p>Additionally, using the <code>checked</code> state, you can apply special styling for when the toggle is on.</p>
<p>Here's an example showing how to use CSS to make this look like a Material UI switch:</p>
<wc-demo hidden>
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
    height: 1em;
}

toggle-switch::part(track) {
    height: 0.75em;
    border-radius: 1em;
    background-color: hsl(0, 0%, 67%);
    margin: 0.125em 0;
}

toggle-switch::part(slider) {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: hsl(0, 0%, 100%);
    box-shadow: 0.0625em 0.0625em 0.125em hsla(0, 0%, 0%, 0.25);
    margin: -0.125em 0;
}

toggle-switch[checked]::part(track) {
    background-color: hsl(211, 69%, 57%);
}
</code></pre>
<h2>Javascript API</h2>
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
<h3>Properties</h3>
<p>Each attribute can be accessed as a Javascript property.</p>
<ul>
<li><code>elem.checked</code></li>
<li><code>elem.disabled</code></li>
</ul>
<h3>Events</h3>
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
<pre><code class="language-js">elem.addEventListener('toggle-switch:change', e =&gt; {
    console.log(e.detail.checked)
})
</code></pre>
<h2>Accessibility</h2>
<p>This custom element is built with accessibility in mind! It follows the WAI-ARIA guidelines for the <a href="https://www.w3.org/TR/wai-aria-1.1/#switch">switch role</a>.</p>
<ul>
<li>The element can be focused</li>
<li>The element can be toggled with <kbd>Enter</kbd> or <kbd>Space</kbd></li>
</ul>
`;function y(i){let t,n;return{c(){t=p(),n=m("article"),this.h()},l(e){u('[data-svelte="svelte-836m89"]',document.head).forEach(o),t=w(e),n=b(e,"ARTICLE",{});var s=f(n);s.forEach(o),this.h()},h(){document.title="The toggle-switch Element"},m(e,a){c(e,t,a),c(e,n,a),n.innerHTML=k},p:l,i:l,o:l,d(e){e&&o(t),e&&o(n)}}}function v(i){return h(()=>import("../../../chunks/define-fc384860.js"),[],import.meta.url),[]}class _ extends r{constructor(t){super(),d(this,t,v,y,g,{})}}export{_ as default};
