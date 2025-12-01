import{_ as l}from"../chunks/C1FmrZbK.js";import{s as o,n as p,o as c}from"../chunks/p4Z6_urL.js";import{S as h,i,a as r,t as g,b as d,m as j,g as u,n as m}from"../chunks/BJ0JgjBn.js";import{R as f}from"../chunks/CtTzQs9K.js";import{b}from"../chunks/2fh9akDk.js";const q=`<h1 id="the-table-of-contents-element">The table-of-contents Element</h1>
<p hidden><strong><a href="https://components.auroratide.com/table-of-contents">View this page with live demos!</a></strong></p>
<p>The <code>table-of-contents</code> element represents a navigable list of headings for some content. This component is able to automatically generate links needed to navigate to all the different headings in an article.</p>
<wc-demo>
	<table-of-contents for="first-demo" aria-label="Demo for Table of Contents Element"></table-of-contents>
	<section id="first-demo">
		<h2 id="one">One</h2>
		<h3 id="one-one">One One</h3>
		<h3 id="one-two">One Two</h3>
		<h2 id="two">Two</h2>
	</section>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">table-of-contents</span>
	<span class="hljs-attr">for</span>=<span class="hljs-string">&quot;main-content&quot;</span>
	<span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Table of Contents&quot;</span>
&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">table-of-contents</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;main-content&quot;</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;one&quot;</span>&gt;</span>One<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;one-one&quot;</span>&gt;</span>One One<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;one-two&quot;</span>&gt;</span>One Two<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;two&quot;</span>&gt;</span>Two<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
</code></pre>
<h2 id="installation">Installation</h2>
<p>You can import through CDN:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;module&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/@auroratide/table-of-contents/lib/define.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>Or, you may install through <a href="https://www.npmjs.com/package/@auroratide/table-of-contents">NPM</a> and include it as part of your build process:</p>
<pre><code>$ npm i @auroratide/table-of-contents
</code></pre>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@auroratide/table-of-contents/lib/define.js&#x27;</span>
</code></pre>
<h2 id="usage">Usage</h2>
<p><code>table-of-contents</code> is a <strong>markup element</strong> that you can use in your HTML document.</p>
<p>The <code>for</code> attribute can be set to the <code>id</code> of an element on the page. If you supply this, the <code>table-of-contents</code> will automatically generate a list of links to headings in the chosen element.</p>
<p>For this, your content must conform to the following:</p>
<ul>
<li>Headings in your content are defined with the <code>h1</code> through <code>h6</code> tags.</li>
<li>Headings do not skip levels (<a href="https://webaim.org/techniques/semanticstructure/#headings">this is good accessibility practice anyway</a>).</li>
<li>Each heading has an <code>id</code> defined that uniquely identifies it.</li>
<li>The first heading can be of any level, as long as no heading afterward is higher than it.
<ul>
<li>For instance, if your content starts with an <code>h2</code>, there should not be an <code>h1</code> later in the document.</li>
</ul>
</li>
</ul>
<p>The following is a example of what a good heading structure looks like:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;main-content&quot;</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;one&quot;</span>&gt;</span>One<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;one-one&quot;</span>&gt;</span>One One<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;one-two&quot;</span>&gt;</span>One Two<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;one-two-one&quot;</span>&gt;</span>One Two One<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;two&quot;</span>&gt;</span>Two<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;two-one&quot;</span>&gt;</span>Two One<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;two-one-one&quot;</span>&gt;</span>Two One One<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;two-two&quot;</span>&gt;</span>Two Two<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
</code></pre>
<h3 id="labelling-the-table-of-contents">Labelling the Table of Contents</h3>
<p>The table of contents represents a <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role">navigation landmark</a>. Therefore, it is good accessibility practice to label it.</p>
<p>This can be done with <code>aria-label</code>.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">table-of-contents</span>
	<span class="hljs-attr">for</span>=<span class="hljs-string">&quot;main-content&quot;</span>
	<span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Table of Contents&quot;</span>
&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">table-of-contents</span>&gt;</span>
</code></pre>
<h3 id="manually-rebuilding-the-list">Manually Rebuilding the List</h3>
<p>The <code>table-of-contents</code> element does <strong>not</strong> automatically react to changes in your document structure.</p>
<p>Instead, the element provides a Javascript <code>build()</code> method so that you may define your own reaction logic, should it be needed. The <code>build()</code> method regenerates the list of links for the identified section.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> toc = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;table-of-contents&quot;</span>)

toc.<span class="hljs-title function_">build</span>()
</code></pre>
<h3 id="fallback-list">Fallback List</h3>
<p>Children of the <code>table-of-contents</code> may serve as a fallback in case Javascript is disabled, fails, or takes a long time to execute. This is optional, but enhances the accessibility of your page.</p>
<p>Once the list generation occurs, the visible content is replaced with the new list. The fallback list will continue to exist in the DOM.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">table-of-contents</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;main-content&quot;</span> <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Contents&quot;</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#one&quot;</span>&gt;</span>One<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#two&quot;</span>&gt;</span>Two<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table-of-contents</span>&gt;</span>
</code></pre>
<h2 id="css-customization">CSS Customization</h2>
<p>Since these are native custom elements, they can be styled the same way as regular HTML elements.</p>
<p>The <code>anchor</code> <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part">part</a> exposes the links generated by the component.</p>
<pre><code class="language-css"><span class="hljs-selector-tag">table</span>-of-contents<span class="hljs-selector-pseudo">::part</span>(anchor) {
	<span class="hljs-attribute">color</span>: red;
}
</code></pre>
<h2 id="accessibility">Accessibility</h2>
<p>This custom element is built with accessibility in mind! A table of contents is a navigational landmark, and therefore the <code>table-of-contents</code> element gets granted the <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role">navigation role</a>.</p>
<p>The best practice is to label your table of contents so readers know the content it is for. You may use <code>aria-label</code> or <code>aria-labelledby</code> for this.</p>
`;function w(t){let s,n;return s=new f({props:{html:q}}),{c(){m(s.$$.fragment)},l(a){u(s.$$.fragment,a)},m(a,e){j(s,a,e),n=!0},p,i(a){n||(d(s.$$.fragment,a),n=!0)},o(a){g(s.$$.fragment,a),n=!1},d(a){r(s,a)}}}function y(t){return l(()=>import("../chunks/gp_6CtRi.js"),[],import.meta.url),c(()=>{b()}),[]}class $ extends h{constructor(s){super(),i(this,s,y,w,o,{})}}export{$ as component};
