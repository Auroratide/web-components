import{_ as p}from"../chunks/preload-helper.BQ24v_F8.js";import{s as c,n as i,o as d}from"../chunks/scheduler.Ce_0Mfso.js";import{S as h,i as m,s as u,m as g,l as y,d as r,h as j,n as w,f as x,o as f,p as b,q as v,r as T}from"../chunks/index.QmGHi4hh.js";import{g as _}from"../chunks/globals.D0QH3NT1.js";import{R as q}from"../chunks/Readme.BbztUA8r.js";const k=`<h1 id="the-typewritten-text-element">The typewritten-text Element</h1>
<p hidden><strong><a href="https://auroratide.github.io/web-components/typewritten-text">View this page with live demos!</a></strong></p>
<p>The <code>typewritten-text</code> element represents text that should be typed out one letter at a time when displayed.</p>
<p><img src="./demo.gif" alt="Text is automatically typed out one letter at a time"></p>
<wc-demo id="main-demo">
	<p>This <typewritten-text paused>typewriter effect</typewritten-text> is achieved using <typewritten-text paused>custom elements!</typewritten-text></p>
	<button class="run">Run</button>
</wc-demo>
<pre><code class="language-html">This <span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">paused</span>&gt;</span>typewriter effect<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span> is achieved
using <span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">paused</span>&gt;</span>custom elements!<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span>
</code></pre>
<h2 id="installation">Installation</h2>
<p>You can import through CDN:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;https://unpkg.com/@auroratide/typewritten-text/lib/style.css&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;module&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/@auroratide/typewritten/lib/define.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>Or, you may install through <a href="https://www.npmjs.com/package/@auroratide/typewritten-text">NPM</a> and include it as part of your build process:</p>
<pre><code>$ npm i @auroratide/typewritten-text
</code></pre>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@auroratide/typewritten-text/lib/style.css&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@auroratide/typewritten-text/lib/define.js&#x27;</span>
</code></pre>
<p><strong>Note</strong>: How you import into your project depends on its configuration. The <code>style.css</code> file should be imported with your root CSS, and the <code>define.js</code> file should imported with your root Javascript.</p>
<h2 id="usage">Usage</h2>
<p><code>typewritten-text</code> is an <strong>inline markup element</strong> that you can use in your HTML document.</p>
<pre><code class="language-html">Some <span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span>&gt;</span>text to type out!<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span>
</code></pre>
<p>Since this is Just HTML<sup>TM</sup>, you can use <code>typewritten-text</code> with other markup tags:</p>
<pre><code class="language-html">This works with <span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">paused</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>other<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">em</span>&gt;</span>markdown<span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;special&quot;</span>&gt;</span>elements<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span> as well!
</code></pre>
<wc-demo id="markup-demo">
	<p>This works with <typewritten-text paused> <strong>other</strong> <em>markdown</em> <span class="special">elements</span> </typewritten-text> as well!</p>
	<button class="run">Run</button>
</wc-demo>
<style>
	.special {
		font-size: 1.25em;
		color: oklch(45% 0.1 20);
	}
</style>
<p><strong>Note:</strong> <code>typewritten-text</code> has text-level semantics, meaning it can contain anything that a <code>span</code> can contain. See <a href="https://html.spec.whatwg.org/#phrasing-content-2">Phrasing Content</a>.</p>
<h3 id="repeat-indefinitely">Repeat Indefinitely</h3>
<p>This types and backspaces the text on a loop.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some <span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">repeat</span>&gt;</span>text to type out!<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<h3 id="adjust-timing">Adjust Timing</h3>
<p>The time provided is number of milliseconds between each letter.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some <span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">letter-interval</span>=<span class="hljs-string">&quot;400&quot;</span>&gt;</span>text to type out!<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p>The <code>phrase-interval</code> is the time between when the text is typed out and when it starts to be removed during a repetition loop.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some <span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">repeat</span> <span class="hljs-attr">phrase-interval</span>=<span class="hljs-string">&quot;2000&quot;</span>&gt;</span>text to type out!<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<h3 id="start-paused">Start Paused</h3>
<p>This will start paused until invoked by <strong>javascript</strong>.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some <span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">paused</span>&gt;</span>text to type out!<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<h3 id="all-attributes">All Attributes</h3>
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
<td><code>repeat</code></td>
<td>-</td>
<td>Whether the text should type itself repeatedly on a loop</td>
</tr>
<tr>
<td><code>letter-interval</code></td>
<td>100</td>
<td>Time between each letter in milliseconds</td>
</tr>
<tr>
<td><code>phrase-interval</code></td>
<td>1000</td>
<td>Time between completion and restart during a repeat loop in milliseconds</td>
</tr>
<tr>
<td><code>paused</code></td>
<td>-</td>
<td>Whether the animation should start paused</td>
</tr>
</tbody>
</table>
<h2 id="style-api">Style API</h2>
<p>Since <code>typewritten-text</code> is Just HTML<sup>TM</sup>, you can style it the same way you style any HTML tag.</p>
<pre><code class="language-css">typewritten-text {
    <span class="hljs-attribute">color</span>: red;
}
</code></pre>
<p><strong>Note</strong>: Depending on what you want to do, you may run into some <a href="#implementation-gotchas">Implementation Gotchas</a>.</p>
<h3 id="cursor">Cursor</h3>
<p>The blinking cursor can be customized with either CSS variables or directly via selectors.</p>
<table>
<thead>
<tr>
<th>Variable</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--typewritten-text_cursor-width</code></td>
<td>0.125em</td>
<td>How wide the cursor is</td>
</tr>
<tr>
<td><code>--typewritten-text_cursor-style</code></td>
<td>solid</td>
<td>Whether the cursor is solid, dashed, dotted, etc; can be any border-style value</td>
</tr>
<tr>
<td><code>--typewritten-text_cursor-color</code></td>
<td>currentColor</td>
<td>Color of the cursor</td>
</tr>
<tr>
<td><code>--typewriten-text_cursor-interval</code></td>
<td>700ms</td>
<td>The duration of the blink animation</td>
</tr>
</tbody>
</table>
<p>The cursor can be arbitrarily customized with the following CSS selectors:</p>
<pre><code class="language-css"><span class="hljs-selector-class">.typewritten-text_character</span><span class="hljs-selector-pseudo">::after</span>,
<span class="hljs-selector-class">.typewritten-text_start</span><span class="hljs-selector-pseudo">::after</span> { }
</code></pre>
<p>The <code>*_start</code> selector represents the start of the text and can be used to style the initial cursor differently than the cursor-in-motion. For example, to hide the cursor while the animation is paused and yet show it at the start, you can do:</p>
<pre><code class="language-css">typewritten-text<span class="hljs-selector-attr">[paused]</span> <span class="hljs-selector-class">.typewritten-text_character</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">visibility</span>: hidden;
}
</code></pre>
<h2 id="javascript-api">Javascript API</h2>
<p>The element exposes some useful methods to enable custom animation. Once you have obtained a reference to a <code>TypewrittenText</code> element:</p>
<pre><code class="language-js"><span class="hljs-keyword">const</span> elem = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&#x27;typewritten-text&#x27;</span>)
</code></pre>
<p>You can use the following methods:</p>
<table>
<thead>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>start()</code></td>
<td>Start the animation cycle if it is currently paused</td>
</tr>
<tr>
<td><code>pause()</code></td>
<td>Pause the animation cycle if it is currently running</td>
</tr>
<tr>
<td><code>typeNext()</code></td>
<td>Manually type the next character</td>
</tr>
<tr>
<td><code>backspace()</code></td>
<td>Manually remove one character</td>
</tr>
<tr>
<td><code>tick()</code></td>
<td>Run one frame of the animation; only works if not paused</td>
</tr>
<tr>
<td><code>forceTick()</code></td>
<td>Run one frame of the animation regardless of paused state</td>
</tr>
<tr>
<td><code>reverse()</code></td>
<td>Reverse the direction of the animation</td>
</tr>
<tr>
<td><code>reset()</code></td>
<td>Completely resets the element and animation; may be useful if the content within the element is dynamic</td>
</tr>
</tbody>
</table>
<h3 id="properties">Properties</h3>
<p>Each attribute can be accessed as a Javascript property.</p>
<ul>
<li><code>elem.repeat</code></li>
<li><code>elem.paused</code></li>
<li><code>elem.letterInterval</code></li>
<li><code>elem.phraseInterval</code></li>
</ul>
<p>One additional property is provided:</p>
<ul>
<li><code>elem.length</code>: The total number of typeable characters</li>
</ul>
<h3 id="events">Events</h3>
<p>The <code>typewritten-text</code> element dispatches the following events:</p>
<table>
<thead>
<tr>
<th>Name</th>
<th>When Triggered</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>typewritten-text:nextchar</code></td>
<td>Anytime a character is typed into view</td>
</tr>
<tr>
<td><code>typewritten-text:prevchar</code></td>
<td>Anytime a character is removed from view</td>
</tr>
<tr>
<td><code>typewritten-text:phrasetyped</code></td>
<td>When the full phrase becomes fully typed</td>
</tr>
<tr>
<td><code>typewritten-text:phraseremoved</code></td>
<td>When the full phrase becomes untyped</td>
</tr>
<tr>
<td><code>typewritten-text:started</code></td>
<td>When the animation is started</td>
</tr>
<tr>
<td><code>typewritten-text:paused</code></td>
<td>When the animation is paused</td>
</tr>
</tbody>
</table>
<h3 id="element-class">Element Class</h3>
<p>The element interface can be accessed in javascript as well.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">TypewrittenText</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@auroratide/typewritten-text&#x27;</span>
</code></pre>
<h2 id="accessibility">Accessibility</h2>
<p>This custom element is built with accessibility in mind!</p>
<ul>
<li>The <code>typewritten-text</code> element always represents its textual content regardless of visibility state. Screenreaders should read the text in its entirety.</li>
<li>The textual content can be copied and pasted regardless of visibility state.</li>
<li>The blinking cursor animation is disabled for people who <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion">prefer reduced motion</a></li>
</ul>
<h2 id="implementation-gotchas">Implementation Gotchas</h2>
<p>It is possible the non-trivial implementation of <code>typewritten-text</code> can lead to unexpected complications with advanced customization.</p>
<p>Most notably, <code>typewritten-text</code> works by <strong>cloning</strong> its inner content into a separate custom element called <code>typewritten-text-mirror</code>, within which each letter is wrapped with a <code>span</code> denoted with the class <code>typewritten-text_character</code>. The following is an example before-and-after of what the resulting markup looks like once the element has finished rendering:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span>&gt;</span>Hey<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span>

<span class="hljs-comment">&lt;!-- ...becomes... --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span>&gt;</span>Hey<span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text-mirror</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;mirror&quot;</span> <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Hey&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;typewritten-text_word&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;typewritten-text_character&quot;</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;typewritten-text_character&quot;</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>H<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;typewritten-text_character&quot;</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>e<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;typewritten-text_character&quot;</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>y<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text-mirror</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span>
</code></pre>
<p>The only part that becomes visible to the viewer is the contents of <code>typewritten-text-mirror</code>. As a result, a selector like <code>typewritten-text &gt; span</code> will have unexpected results.</p>
<p>This architecture has the following explicit goals:</p>
<ul>
<li>Preserve, as much as possible, the way the web developer has specified the usage of the element. This means not overriding the inner content of <code>typewritten-text</code>.</li>
<li>Allow the use of semantic markup within <code>typewritten-text</code> so it acts as much as possible like a native text-level element</li>
<li>Enable typing each individual character regardless of its formatting, allowing for size- and position-independence.</li>
</ul>
`,S=""+new URL("../assets/demo.BbQyX9Y4.gif",import.meta.url).href,{document:o}=_;function A(l){let e,s,n;return s=new q({props:{html:k,assets:[{replace:"./demo.gif",with:S}]}}),{c(){e=u(),g(s.$$.fragment),this.h()},l(t){y("svelte-i80zog",o.head).forEach(r),e=j(t),w(s.$$.fragment,t),this.h()},h(){o.title="The typewritten-text Element"},m(t,a){x(t,e,a),f(s,t,a),n=!0},p:i,i(t){n||(b(s.$$.fragment,t),n=!0)},o(t){v(s.$$.fragment,t),n=!1},d(t){t&&r(e),T(s,t)}}}function E(l){p(()=>Promise.resolve({}),__vite__mapDeps([0]),import.meta.url),p(()=>import("../chunks/define.DKPkWol_.js"),__vite__mapDeps([]),import.meta.url);const e=s=>{var n;(n=document.querySelector(`#${s} .run`))==null||n.addEventListener("click",()=>{document.querySelectorAll(`#${s} typewritten-text`).forEach(t=>{t.start()})})};return d(()=>{e("main-demo"),e("markup-demo")}),[]}class I extends h{constructor(e){super(),m(this,e,E,A,c,{})}}export{I as component};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["../assets/style.DM1gH6IL.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
