import{_ as o}from"../chunks/C1FmrZbK.js";import{s as p,n as c}from"../chunks/p4Z6_urL.js";import{S as d,i,d as r,a as h,t as m,b as u,c as b,m as g,f as j,j as w,k as f,g as x,o as k,n as y}from"../chunks/BJ0JgjBn.js";import{R as v}from"../chunks/DNMEPfIK.js";const _=`<h1 id="the-textarea-markdown-element">The textarea-markdown Element</h1>
<p hidden><strong><a href="https://components.auroratide.com/textarea-markdown">View this page with live demos!</a></strong></p>
<p>The <code>textarea-markdown</code> element represents a textarea which supports <a href="https://www.markdownguide.org/">Markdown Syntax</a>. This component is built with accessibility in mind: it is form-associated, works with customary labels, and uses the WAI-ARIA guidelines for the <a href="https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/">toolbar pattern</a>.</p>
<aside class="markdown-alert markdown-alert-warning"><p class="markdown-alert-title"><svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg><span>Warning</span></p><p>This component is still in active development and may not implement all the things necessary for an element to be fully form-associated and accessible. If you decide to use this, be sure to update often!</p>
</aside>
<wc-demo>
	<label for="example-01">Some Label</label>
	<textarea-markdown id="example-01" placeholder="Type some text" rows="6"></textarea-markdown>
</wc-demo>
<style>
	label, toggle-switch {
		vertical-align: middle;
	}
</style>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;example-01&quot;</span>&gt;</span>Some Label<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">textarea-markdown</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;example-01&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Type some text&quot;</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">&quot;6&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">textarea-markdown</span>&gt;</span>
</code></pre>
<h2 id="installation">Installation</h2>
<p>You can import through CDN:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;module&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/@auroratide/textarea-markdown/lib/define.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>Or, you may install through <a href="https://www.npmjs.com/package/@auroratide/textarea-markdown">NPM</a> and include it as part of your build process:</p>
<pre><code>$ npm i @auroratide/textarea-markdown
</code></pre>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@auroratide/textarea-markdown/lib/define.js&#x27;</span>
</code></pre>
<h2 id="usage">Usage</h2>
<p><code>textarea-markdown</code> is an <strong>inline markup element</strong> that you can use in your HTML document. It is a form control, meaning it is appropriate to properly <a href="https://html.spec.whatwg.org/#the-label-element">label</a> it like so:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;example-02&quot;</span>&gt;</span>Character Description<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">textarea-markdown</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;example-02&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea-markdown</span>&gt;</span>
</code></pre>
<p>You can start initialize the input with some text as well:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;example-03&quot;</span>&gt;</span>Character Description<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">textarea-markdown</span> <span class="hljs-attr">checked</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;example-03&quot;</span>&gt;</span>
She has **orange** hair and _green_ eyes.
<span class="hljs-tag">&lt;/<span class="hljs-name">textarea-markdown</span>&gt;</span>
</code></pre>
<wc-demo>
<label for="example-03">Character Description</label>
<textarea-markdown checked id="example-03" rows="6">
She has **orange** hair and _green_ eyes.
</textarea-markdown>
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
<td><code>placeholder</code></td>
<td>-</td>
<td>Hint text to show when there is no value.</td>
</tr>
<tr>
<td><code>rows</code></td>
<td>-</td>
<td>Number of rows to include in the textarea.</td>
</tr>
<tr>
<td><code>cols</code></td>
<td>-</td>
<td>Numer of columns to include in the textarea.</td>
</tr>
<tr>
<td><code>disabled</code></td>
<td>-</td>
<td>Whether the textarea can be edited.</td>
</tr>
<tr>
<td><code>required</code></td>
<td>-</td>
<td>Whether the textarea is required for form submission.</td>
</tr>
</tbody>
</table>
<h3 id="css-customization">CSS Customization</h3>
<p>The <code>textarea-markdown</code> is composed of a <strong>menu</strong> with <strong>buttons</strong> and a <strong>textarea</strong> which can be individually customized:</p>
<ul>
<li><code>menu</code>: List of markdown controls.</li>
<li><code>button</code>: A single button that controls markdown formatting.</li>
<li><code>textarea</code>: The editable input field.</li>
</ul>
<p>Here's an example showing how to use CSS to customize the appearance:</p>
<wc-demo>
	<label id="fancy-textarea-label" for="fancy-textarea">Fancy Textarea</label>
	<textarea-markdown id="fancy-textarea" rows="6"></textarea-markdown>
	<style>
		#fancy-textarea-label {
			display: block;
			margin-block-end: 0.333em;
		}
		#fancy-textarea {
			border: 0.0625em solid oklch(1 0 0 / 0.5);
			border-radius: 0.25em;
		}
		#fancy-textarea:focus {
			border: 0.0625em solid var(--t-primary-b);
		}
		#fancy-textarea::part(menu) {
			background-color: oklch(1 0 0 / 0.125);
			padding: 0.25em 0.5em;
		}
		#fancy-textarea::part(button) {
			border-radius: 0.25em;
			background: none;
			font-size: 87.5%;
		}
		#fancy-textarea::part(button):hover {
			background: oklch(0 0 0 / 0.25);
		}
		#fancy-textarea::part(textarea) {
			border: none;
		}
	</style>
</wc-demo>
<pre><code class="language-css"><span class="hljs-selector-tag">textarea</span>-markdown {
	<span class="hljs-attribute">border</span>: <span class="hljs-number">0.0625em</span> solid <span class="hljs-built_in">oklch</span>(<span class="hljs-number">1</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">0.5</span>);
	<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.25em</span>;
}

<span class="hljs-selector-tag">textarea</span>-markdown<span class="hljs-selector-pseudo">:focus</span> {
	<span class="hljs-attribute">border</span>: <span class="hljs-number">0.0625em</span> solid <span class="hljs-built_in">var</span>(--t-primary-b);
}

<span class="hljs-selector-tag">textarea</span>-markdown<span class="hljs-selector-pseudo">::part</span>(<span class="hljs-selector-tag">menu</span>) {
	<span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">1</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">0.125</span>);
	<span class="hljs-attribute">padding</span>: <span class="hljs-number">0.25em</span> <span class="hljs-number">0.5em</span>;
}

<span class="hljs-selector-tag">textarea</span>-markdown<span class="hljs-selector-pseudo">::part</span>(<span class="hljs-selector-tag">button</span>) {
	<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.25em</span>;
	<span class="hljs-attribute">background</span>: none;
	<span class="hljs-attribute">font-size</span>: <span class="hljs-number">87.5%</span>;
}

<span class="hljs-selector-tag">textarea</span>-markdown<span class="hljs-selector-pseudo">::part</span>(<span class="hljs-selector-tag">button</span>)<span class="hljs-selector-pseudo">:hover</span> {
	<span class="hljs-attribute">background</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">0.25</span>);
}

<span class="hljs-selector-tag">textarea</span>-markdown<span class="hljs-selector-pseudo">::part</span>(<span class="hljs-selector-tag">textarea</span>) {
	<span class="hljs-attribute">border</span>: none;
}
</code></pre>
<h3 id="events">Events</h3>
<p>The <code>textarea-markdown</code> element dispatches the following events:</p>
<table>
<thead>
<tr>
<th>Name</th>
<th>When Triggered</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>change</code></td>
<td>Whenever the value of the textarea changes, or when one of the tools is invoked.</td>
</tr>
<tr>
<td><code>input</code></td>
<td>Whenever a change occurs in the textarea through the user interface.</td>
</tr>
</tbody>
</table>
<p>The value of the text field can be accessed with <code>event.target.value</code>.</p>
<h3 id="toolbar">Toolbar</h3>
<p>As of this version, the toolbar is static and provides the following options:</p>
<table>
<thead>
<tr>
<th>Tool</th>
<th>Shortcut</th>
<th>Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td>Header</td>
<td>-</td>
<td>Switches between a level 2, level 3, and level 4 header.</td>
</tr>
<tr>
<td>Bold</td>
<td>Ctrl+B</td>
<td>Makes the selected text bold.</td>
</tr>
<tr>
<td>Italic</td>
<td>Ctrl+I</td>
<td>Makes the selected text italic.</td>
</tr>
<tr>
<td>Bullets</td>
<td>Ctrl+Shift+8</td>
<td>Starts a bulleted list.</td>
</tr>
<tr>
<td>Numbers</td>
<td>Ctrl+Shift+7</td>
<td>Starts a numbered list.</td>
</tr>
</tbody>
</table>
<h2 id="accessibility">Accessibility</h2>
<p>This custom element is build with accessibility in mind! It follows the WAI-ARIA guidelines for the <a href="https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/">toolbar pattern</a>.</p>
<ul>
<li>When focus is on the toolbar, <kbd>Left</kbd> and <kbd>Right</kbd> navigate between the options.</li>
<li>The textarea is form-associated, so it participates in form submission and can be labeled the same way as inputs.</li>
</ul>
`;function q(l){let t,s,n;return s=new v({props:{html:_}}),{c(){t=k("div"),y(s.$$.fragment),this.h()},l(a){t=w(a,"DIV",{class:!0});var e=f(t);x(s.$$.fragment,e),e.forEach(r),this.h()},h(){j(t,"class","textarea-markdown-page svelte-1nez1p8")},m(a,e){b(a,t,e),g(s,t,null),n=!0},p:c,i(a){n||(u(s.$$.fragment,a),n=!0)},o(a){m(s.$$.fragment,a),n=!1},d(a){a&&r(t),h(s)}}}function A(l){return o(()=>import("../chunks/ICI1fHfy.js"),[],import.meta.url),[]}class W extends d{constructor(t){super(),i(this,t,A,q,p,{})}}export{W as component};
