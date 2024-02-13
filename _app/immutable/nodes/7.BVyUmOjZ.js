import{_ as p}from"../chunks/preload-helper.BQ24v_F8.js";import{s as r,n as o,o as i}from"../chunks/scheduler.Ce_0Mfso.js";import{S as d,i as h,s as u,m as g,l as m,d as c,h as j,n as y,f as w,o as f,p as b,q as x,r as v}from"../chunks/index.QmGHi4hh.js";import{R as q}from"../chunks/Readme.BbztUA8r.js";const T=`<h1 id="the-typewritten-text-element">The typewritten-text Element</h1>
<p hidden><strong><a href="https://auroratide.github.io/web-components/typewritten-text">View this page with live demos!</a></strong></p>
<p>The <code>typewritten-text</code> element represents text that should be typed out one letter at a time when displayed.</p>
<p><img src="./demo.gif" alt="Text is automatically typed out one letter at a time"></p>
<wc-demo id="main-demo">
	<p>This <typewritten-text paused>typewriter effect</typewritten-text> is achieved using <typewritten-text paused>custom elements!</typewritten-text></p>
	<div slot="actions">
		<button class="run">Run</button>
	</div>
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
<wc-demo id="markup-demo">
	<p>This works with <typewritten-text paused> <strong>other</strong> <em>markdown</em> <span class="special">elements</span> </typewritten-text> as well!</p>
	<div slot="actions">
		<button class="run">Run</button>
	</div>
</wc-demo>
<pre><code class="language-html">This works with <span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">paused</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>other<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">em</span>&gt;</span>markdown<span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;special&quot;</span>&gt;</span>elements<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span> as well!
</code></pre>
<p><strong>Note:</strong> <code>typewritten-text</code> has text-level semantics, meaning it can contain anything that a <code>span</code> can contain. See <a href="https://html.spec.whatwg.org/#phrasing-content-2">Phrasing Content</a>.</p>
<h3 id="adjust-timing">Adjust Timing</h3>
<p>Use <code>type-speed</code> or <code>erase-speed</code> to adjust timing. The time provided is number of milliseconds between each letter.</p>
<wc-demo id="speed-demo">
	<ul>
		<li><typewritten-text type-speed="200" erase-speed="30">Slow to type, fast to erase</typewritten-text></li>
		<li><typewritten-text type-speed="30" erase-speed="200">Fast to type, slow to erase</typewritten-text></li>
	</ul>
	<div slot="actions">
		<button class="run">Run</button>
	</div>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">type-speed</span>=<span class="hljs-string">&quot;200&quot;</span> <span class="hljs-attr">erase-speed</span>=<span class="hljs-string">&quot;30&quot;</span>&gt;</span>Slow to type, fast to erase<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">type-speed</span>=<span class="hljs-string">&quot;30&quot;</span> <span class="hljs-attr">erase-speed</span>=<span class="hljs-string">&quot;200&quot;</span>&gt;</span>Fast to type, slow to erase<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<h3 id="start-paused">Start Paused</h3>
<p>When <code>paused</code> is specified, it will start paused until invoked by <strong>javascript</strong>.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some <span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">paused</span>&gt;</span>text to type out!<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<h3 id="repeat">Repeat</h3>
<p>Use <code>repeat</code> to automatically type and erase the phrase. The <code>repeat-interval</code> attribute can be used to adjust how long between typing and erasing.</p>
<wc-demo id="repeat-demo">
	<p><typewritten-text repeat repeat-interval="1000">It just keeps typing.</typewritten-text></p>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">repeat</span> <span class="hljs-attr">repeat-interval</span>=<span class="hljs-string">&quot;1000&quot;</span>&gt;</span>It just keeps typing.<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
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
<td><code>paused</code></td>
<td>-</td>
<td>Whether the animation should start paused</td>
</tr>
<tr>
<td><code>type-speed</code></td>
<td>80</td>
<td>Time between each letter in milliseconds</td>
</tr>
<tr>
<td><code>erase-speed</code></td>
<td>50</td>
<td>Time between completion and restart during a repeat loop in milliseconds</td>
</tr>
<tr>
<td><code>repeat</code></td>
<td>-</td>
<td>Whether the animation should repeat itself after it types or erases</td>
</tr>
<tr>
<td><code>repeat-interval</code></td>
<td>1000</td>
<td>Amount of time between typing and erasing when in repeat mode</td>
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
<td><code>--cursor-width</code></td>
<td>0.125em</td>
<td>How wide the cursor is</td>
</tr>
<tr>
<td><code>--cursor-style</code></td>
<td>solid</td>
<td>Whether the cursor is solid, dashed, dotted, etc; can be any border-style value</td>
</tr>
<tr>
<td><code>--cursor-color</code></td>
<td>currentColor</td>
<td>Color of the cursor</td>
</tr>
<tr>
<td><code>--cursor-interval</code></td>
<td>0.7s</td>
<td>The duration of the blink animation</td>
</tr>
</tbody>
</table>
<p>The cursor can be arbitrarily customized with the following CSS selector:</p>
<pre><code class="language-css">typewritten-text <span class="hljs-selector-class">.cursor</span><span class="hljs-selector-class">.current</span><span class="hljs-selector-pseudo">::after</span> { }
</code></pre>
<h3 id="example-fancy-cursor">Example Fancy Cursor</h3>
<wc-demo id="cursor-demo">
	<p>Here's a <typewritten-text paused>fancy cursor.</typewritten-text></p>
	<div slot="actions">
		<button class="run">Run</button>
	</div>
</wc-demo>
<pre><code class="language-css">typewritten-text <span class="hljs-selector-class">.cursor</span><span class="hljs-selector-class">.current</span><span class="hljs-selector-pseudo">::after</span> {
	<span class="hljs-attribute">border-inline-end</span>: none;
	<span class="hljs-attribute">border-block-end</span>: <span class="hljs-number">0.125em</span> solid red;
	<span class="hljs-attribute">width</span>: <span class="hljs-number">1ch</span>;
	inset-inline-end: -<span class="hljs-number">1ch</span>;
}
</code></pre>
<h2 id="javascript-api">Javascript API</h2>
<p>The element exposes some useful methods to enable custom animation. Once you have obtained a reference to a <code>TypewrittenTextElement</code> element:</p>
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
<td><code>type()</code></td>
<td>Start typing characters until the end</td>
</tr>
<tr>
<td><code>typeOne()</code></td>
<td>Type one character</td>
</tr>
<tr>
<td><code>erase()</code></td>
<td>Start erasing characters until the beginning</td>
</tr>
<tr>
<td><code>eraseOne()</code></td>
<td>Erase one character</td>
</tr>
<tr>
<td><code>pause()</code></td>
<td>Pause the animation cycle if it is currently running</td>
</tr>
<tr>
<td><code>resume()</code></td>
<td>If paused while typing, continue typing and vice versa; if paused as a result of reaching the end of either typing or erasing, will perform the opposite action.</td>
</tr>
<tr>
<td><code>switchDirection()</code></td>
<td>Switch from typing to erasing or vice versa; can be done in the middle of typing or erasing</td>
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
<li><code>elem.paused</code></li>
<li><code>elem.typeSpeed</code></li>
<li><code>elem.eraseSpeed</code></li>
</ul>
<p>Other readonly attributes are provided:</p>
<ul>
<li><code>elem.length</code>: The total number of typeable characters</li>
<li><code>elem.position</code>: The numerical position of the character to type next</li>
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
<td><code>type</code></td>
<td>Anytime a character is typed into view</td>
</tr>
<tr>
<td><code>typed</code></td>
<td>When the full phrase becomes fully typed</td>
</tr>
<tr>
<td><code>typing</code></td>
<td>When it starts typing after having been paused</td>
</tr>
<tr>
<td><code>erase</code></td>
<td>Anytime a character is removed from view</td>
</tr>
<tr>
<td><code>erased</code></td>
<td>When the full phrase becomes erased</td>
</tr>
<tr>
<td><code>erasing</code></td>
<td>When it starts erasing after having been paused</td>
</tr>
<tr>
<td><code>resume</code></td>
<td>When the animation is started</td>
</tr>
<tr>
<td><code>paused</code></td>
<td>When the animation is paused</td>
</tr>
</tbody>
</table>
<h3 id="element-class">Element Class</h3>
<p>The element interface can be accessed in javascript as well, perhaps to be created manually or for typescript type notation.</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">TypewrittenTextElement</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@auroratide/typewritten-text&#x27;</span>
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
<p><code>typewritten-text</code> works by <strong>cloning</strong> its inner content into a <code>mirror</code> slot, within which each letter is wrapped with a <code>span</code>. The following is an example before-and-after of what the resulting markup looks like once the element has finished rendering:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span>&gt;</span>Hey<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span>

<span class="hljs-comment">&lt;!-- ...becomes... --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span>&gt;</span>Hey<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;mirror&quot;</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;cursor current&quot;</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;word&quot;</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;char&quot;</span>&gt;</span>H<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;char&quot;</span>&gt;</span>e<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;char&quot;</span>&gt;</span>y<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span>
</code></pre>
<p>As a result, a selector like <code>typewritten-text &gt; span</code> will have unexpected results.</p>
<p>This architecture has the following explicit goals:</p>
<ul>
<li>Preserve, as much as possible, the way the web developer has specified the usage of the element. This means not overriding the default slot of <code>typewritten-text</code>.</li>
<li>Allow the use of semantic markup within <code>typewritten-text</code> so it acts as much as possible like a native text-level element.</li>
<li>Prevent layout shift as a result of characters coming into view; the entire content will exist, but will be invisible until typed.</li>
<li>Allow CSS customizations of the inner markup to apply. This would not be true if the content was cloned into the element's shadow dom.</li>
</ul>
<h2 id="showcases">Showcases</h2>
<p>Using the Javascript and Styling interfaces allows you to do all sorts of things.</p>
<h3 id="typewriter-cycle">Typewriter Cycle</h3>
<p>You can cycle between different phrases by attaching listeners to the <code>typed</code> and <code>erased</code> events.</p>
<p><strong><a href="https://codepen.io/auroratide/pen/BaZWWwQ">View the Typewriter Cycle demo on Codepen!</a></strong></p>
<wc-demo id="cycle-demo">
	<div class="sentence">
		<p>Have you tried our</p>
		<ul class="typewriter-cycle">
			<li><typewritten-text class="active">fresh salads? 🥗</typewritten-text></li>
			<li><typewritten-text paused>hearty burgers? 🍔</typewritten-text></li>
			<li><typewritten-text paused>delicious pies? 🥧</typewritten-text></li>
		</ul>
	</div>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sentence&quot;</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Have you tried our<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;typewriter-cycle&quot;</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;active&quot;</span>&gt;</span>fresh salads? 🥗<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">paused</span>&gt;</span>hearty burgers? 🍔<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">paused</span>&gt;</span>delicious pies? 🥧<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<pre><code class="language-css"><span class="hljs-selector-class">.sentence</span> <span class="hljs-selector-tag">p</span> { <span class="hljs-attribute">display</span>: inline; }

<span class="hljs-selector-class">.typewriter-cycle</span> {
	<span class="hljs-attribute">display</span>: inline-block;
	<span class="hljs-attribute">position</span>: relative;
	<span class="hljs-attribute">width</span>: <span class="hljs-number">20ch</span>;
	<span class="hljs-attribute">list-style</span>: none;
	<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
	<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.typewriter-cycle</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:not</span>(<span class="hljs-selector-pseudo">:first</span>-child) {
	<span class="hljs-attribute">position</span>: absolute;
	inset: <span class="hljs-number">0</span>;
}

typewritten-text { <span class="hljs-attribute">font-weight</span>: bold; }
typewritten-text<span class="hljs-selector-pseudo">:not</span>(<span class="hljs-selector-class">.active</span>) <span class="hljs-selector-class">.cursor</span><span class="hljs-selector-pseudo">::after</span> {
	<span class="hljs-attribute">visibility</span>: hidden;
}
</code></pre>
<pre><code class="language-js"><span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&quot;.typewriter-cycle&quot;</span>).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">cycle</span>) =&gt;</span> {
	<span class="hljs-keyword">const</span> items = cycle.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&quot;typewritten-text&quot;</span>)
	<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; items.<span class="hljs-property">length</span>; ++i) {
		<span class="hljs-keyword">const</span> cur = items[i]
		<span class="hljs-keyword">const</span> next = items[(i + <span class="hljs-number">1</span>) % items.<span class="hljs-property">length</span>]

		cur.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;typed&quot;</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> cur.<span class="hljs-title function_">erase</span>(), cur.<span class="hljs-property">repeatInterval</span>))
		cur.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;erased&quot;</span>, <span class="hljs-function">() =&gt;</span> {
			cur.<span class="hljs-property">classList</span>.<span class="hljs-title function_">remove</span>(<span class="hljs-string">&quot;active&quot;</span>)
			next.<span class="hljs-property">classList</span>.<span class="hljs-title function_">add</span>(<span class="hljs-string">&quot;active&quot;</span>)
			<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> next.<span class="hljs-title function_">type</span>(), next.<span class="hljs-property">repeatInterval</span>)
		})
	}
})
</code></pre>
<h3 id="dialog">Dialog</h3>
<p>Dialog is often portrayed as typewritten text in games. Using the <code>typed</code> event, you can chain several together.</p>
<p><strong><a href="https://codepen.io/auroratide/pen/rNwyYyW">View the Dialog demo on Codepen!</a></strong></p>
<wc-demo id="dialog-demo">
	<section id="janet" style="--bubble: oklch(83% 0.041 227);">
		<figure>
			<img src="https://i.imgur.com/W1l95nt.png" alt="A girl with brown hair and blue eyes." />
			<figcaption>Janet</figcaption>
		</figure>
		<blockquote><typewritten-text type-speed="45" paused>Hi! I'm <strong>Janet</strong>, the new gal on the team. What's your name?</typewritten-text></blockquote>
	</section>
	<section id="dinesh" class="flipped" style="--bubble: oklch(80% 0.024 34);">
		<blockquote><typewritten-text type-speed="50" paused>I'm <strong>Dinesh</strong>, the UI designer. The first thing you should know is our team lead is always <em>at least</em> five minutes late.</typewritten-text></blockquote>
		<figure>
			<img src="https://i.imgur.com/HVReWxe.png" alt="A boy with black hair and brown eyes." />
			<figcaption>Dinesh</figcaption>
		</figure>
	</section>
	<div slot="actions">
		<button class="rerun">Rerun</button>
	</div>
</wc-demo>
<pre><code class="language-js"><span class="hljs-keyword">const</span> janet = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;#janet typewritten-text&quot;</span>)
<span class="hljs-keyword">const</span> dinesh = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;#dinesh typewritten-text&quot;</span>)

janet?.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;typed&quot;</span>, <span class="hljs-function">() =&gt;</span> {
	timeout = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> dinesh?.<span class="hljs-title function_">type</span>(), dinesh?.<span class="hljs-property">repeatInterval</span>)
})
</code></pre>
`,k=""+new URL("../assets/demo.BbQyX9Y4.gif",import.meta.url).href,_=()=>{document.querySelectorAll("wc-demo").forEach(n=>{const s=n.querySelector(".run"),t=n.querySelectorAll("typewritten-text");t.forEach(l=>{l.addEventListener("paused",()=>{(s==null?void 0:s.textContent)==="Pause"&&(s.textContent="Run")}),l.addEventListener("typed",()=>{l.classList.add("typed")}),l.addEventListener("resumed",()=>{l.classList.remove("typed")})});const a=()=>{t.forEach(l=>l.resume())},e=()=>{t.forEach(l=>l.pause())};s==null||s.addEventListener("click",()=>{(s==null?void 0:s.textContent)==="Run"?(s.textContent="Pause",a()):(s.textContent="Run",e())})})},S=()=>{document.querySelectorAll(".typewriter-cycle").forEach(n=>{const s=n.querySelectorAll("typewritten-text");for(let t=0;t<s.length;++t){const a=s[t],e=s[(t+1)%s.length];a.addEventListener("typed",()=>setTimeout(()=>a.erase(),a.repeatInterval)),a.addEventListener("erased",()=>{a.classList.remove("active"),e.classList.add("active"),setTimeout(()=>e.type(),e.repeatInterval)})}})},E=()=>{const n=document.querySelector("#janet typewritten-text"),s=document.querySelector("#dinesh typewritten-text"),t=document.querySelector("#dialog-demo .rerun");let a=0;n==null||n.addEventListener("typed",()=>{a=setTimeout(()=>s==null?void 0:s.type(),s==null?void 0:s.repeatInterval)}),t==null||t.addEventListener("click",()=>{clearTimeout(a),s==null||s.pause(),n==null||n.reset(),s==null||s.reset(),n==null||n.type()})};function A(n){let s,t,a;return t=new q({props:{html:T,assets:[{replace:"./demo.gif",with:k}]}}),{c(){s=u(),g(t.$$.fragment),this.h()},l(e){m("svelte-i80zog",document.head).forEach(c),s=j(e),y(t.$$.fragment,e),this.h()},h(){document.title="The typewritten-text Element"},m(e,l){w(e,s,l),f(t,e,l),a=!0},p:o,i(e){a||(b(t.$$.fragment,e),a=!0)},o(e){x(t.$$.fragment,e),a=!1},d(e){e&&c(s),v(t,e)}}}function C(n){return p(()=>Promise.resolve({}),__vite__mapDeps([0]),import.meta.url),p(()=>import("../chunks/define.BFzeFfcw.js"),__vite__mapDeps([]),import.meta.url),i(()=>{_(),S(),E()}),[]}class P extends d{constructor(s){super(),h(this,s,C,A,r,{})}}export{P as component};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["../assets/style.yDHeHSfA.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
