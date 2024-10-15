import{_ as r}from"../chunks/preload-helper.C1FmrZbK.js";import{s as l,n as p}from"../chunks/scheduler.uMbUtuGX.js";import{S as o,i,c as d,a as c,m,t as h,n as g,o as j}from"../chunks/index.Dz7ClLEz.js";import{R as u}from"../chunks/Readme.z-hmKDw4.js";const b=`<h1 id="the-reorder-list-elements">The reorder-list Elements</h1>
<p hidden><strong><a href="https://components.auroratide.com/reorder-list">View this page with live demos!</a></strong></p>
<p>The <code>reorder-list</code> and <code>reorder-item</code> elements represent an ordered list of items that can be reordered. They are built with accessibility in mind and implement the WAI-ARIA guidelines for <a href="https://www.w3.org/WAI/ARIA/apg/example-index/listbox/listbox-rearrangeable.html">rearrangable listboxes</a>.</p>
<wc-demo>
	<p>Press and hold to drag items. Or, tab into the list and use <kbd>Alt</kbd> + <kbd>Up/Down</kbd>.</p>
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
<h2 id="installation">Installation</h2>
<p>You can import through CDN:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;module&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/@auroratide/reorder-list/lib/define.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>Or, you may install through <a href="https://www.npmjs.com/package/@auroratide/reorder-list">NPM</a> and include it as part of your build process:</p>
<pre><code>$ npm i @auroratide/reorder-list
</code></pre>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@auroratide/reorder-list/lib/define.js&#x27;</span>
</code></pre>
<h2 id="usage">Usage</h2>
<p><code>reorder-list</code> and <code>reorder-item</code> are <strong>markup elements</strong> that you can use in your HTML document. To use them together, it is best to follow these guidelines:</p>
<ul>
<li><code>reorder-item</code> elements <strong>must</strong> be <em>direct</em> descendents of a <code>reorder-list</code> element. This is similar to how <code>li</code> must directly descend <code>ol</code>.</li>
</ul>
<h2 id="orientation">Orientation</h2>
<p>By default, <code>orientation</code> is &quot;vertical&quot;, meaning you drag items up and down. Setting <code>orientation</code> to &quot;horizontal&quot; will allow you to reorder items left and right instead.</p>
<wc-demo id="horizontal-demo">
	<reorder-list orientation="horizontal">
		<reorder-item>Apple</reorder-item>
		<reorder-item>Orange</reorder-item>
		<reorder-item>Banana</reorder-item>
		<reorder-item>Kiwi</reorder-item>
	</reorder-list>
</wc-demo>
<style>
	#horizontal-demo reorder-list {
		display: flex;
		flex-direction: row;
		list-style: none;
		gap: 0.5em;
		padding: 0;
	}
	#horizontal-demo reorder-item {
		border: 0.0625em solid #2573C1;
		border-radius: 0.125em;
		padding: 0.25em 1em;
	}
</style>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">reorder-list</span> <span class="hljs-attr">orientation</span>=<span class="hljs-string">&quot;horizontal&quot;</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Apple<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Orange<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Banana<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Kiwi<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-list</span>&gt;</span>
</code></pre>
<p><strong>Note</strong>: Bidirectional reordering is not possible with this component. <code>reorder-list</code> is for <em>lists</em>, whereas bidirectional reordering would be for a grid of some kind; they are different semantics.</p>
<h2 id="ignoring-reorder-trigger">Ignoring Reorder Trigger</h2>
<p>You may have an element within a <code>reorder-item</code> that you do not want triggering a reorder. For instance, an <code>input</code> element should not start dragging, and it should instead focus on the <code>input</code>.</p>
<p>Use the <code>data-ignore-reorder</code> attribute on any element within <code>reorder-item</code> in order to make that element not start dragging.</p>
<wc-demo id="ignore-reorder">
	<reorder-list>
		<reorder-item>Drag: <input data-ignore-reorder type="text" value="Apple" /></reorder-item>
		<reorder-item>Drag: <input data-ignore-reorder type="text" value="Orange" /></reorder-item>
		<reorder-item>Drag: <input data-ignore-reorder type="text" value="Banana" /></reorder-item>
		<reorder-item>Drag: <input data-ignore-reorder type="text" value="Kiwi" /></reorder-item>
	</reorder-list>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">reorder-list</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Drag: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">data-ignore-reorder</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;Apple&quot;</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Drag: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">data-ignore-reorder</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;Orange&quot;</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Drag: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">data-ignore-reorder</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;Banana&quot;</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Drag: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">data-ignore-reorder</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;Kiwi&quot;</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-list</span>&gt;</span>
</code></pre>
<h2 id="css-customization">CSS Customization</h2>
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
		background: var(--t-bg-a);
		border-radius: 0.5em;
		width: min(400px, 100%);
		padding: 0.75em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
	#fancy reorder-item {
		background: var(--t-bg-b);
		border-radius: 0.25em;
		padding: 0.5em;
		box-shadow: 0 0.1em 0.15em #0002;
	}
	#fancy ul {
		list-style: none;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5em;
		padding: 0;
		margin: 0;
		font-size: 90%;
		color: var(--t-primary-b);
	}
</style>
<pre><code class="language-css">reorder-list {
	<span class="hljs-attribute">list-style</span>: none;
	<span class="hljs-attribute">background</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">22%</span> <span class="hljs-number">0.021</span> <span class="hljs-number">255</span>);
	<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.5em</span>;
	<span class="hljs-attribute">width</span>: <span class="hljs-built_in">min</span>(<span class="hljs-number">400px</span>, <span class="hljs-number">100%</span>);
	<span class="hljs-attribute">padding</span>: <span class="hljs-number">0.5em</span>;
	<span class="hljs-attribute">display</span>: flex;
	<span class="hljs-attribute">flex-direction</span>: column;
	<span class="hljs-attribute">gap</span>: <span class="hljs-number">0.5em</span>;
}

reorder-item {
	<span class="hljs-attribute">background</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">27%</span> <span class="hljs-number">0.02</span> <span class="hljs-number">255</span>);
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
	<span class="hljs-attribute">color</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">64%</span> <span class="hljs-number">0.142</span> <span class="hljs-number">250</span>);
}
</code></pre>
<h2 id="events">Events</h2>
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
<td><code>change</code></td>
<td>Whenever an item in the list is reordered</td>
</tr>
<tr>
<td><code>commit</code></td>
<td>At the end of an item being dragged</td>
</tr>
</tbody>
</table>
<p>Both events contain a reference to the item that was reordered, its previous position in the list, and its new position.</p>
<pre><code class="language-js">list.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;change&#x27;</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
	<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(e.<span class="hljs-property">detail</span>.<span class="hljs-property">item</span>)
	<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(e.<span class="hljs-property">detail</span>.<span class="hljs-property">oldIndex</span>)
	<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(e.<span class="hljs-property">detail</span>.<span class="hljs-property">newIndex</span>)
})
</code></pre>
<p>The difference between <code>change</code> and <code>commit</code> is the <code>change</code> event happens any time an element changes order, including in the middle of a drag. The <code>commit</code> event only triggers at the end of a drag, so the old index in that event's details will represent the position of that item prior to the drag being started.</p>
<h2 id="nesting-lists">Nesting Lists</h2>
<p>Nothing stops you from putting lists inside of lists.</p>
<wc-demo id="nested-demo">
	<reorder-list orientation="horizontal">
		<reorder-item>
			<strong>Fruit</strong>
			<reorder-list>
				<reorder-item>Apple</reorder-item>
				<reorder-item>Orange</reorder-item>
				<reorder-item>Banana</reorder-item>
				<reorder-item>Kiwi</reorder-item>
			</reorder-list>
		</reorder-item>
		<reorder-item>
			<strong>Vegetable</strong>
			<reorder-list>
				<reorder-item>Tomato</reorder-item>
				<reorder-item>Carrot</reorder-item>
				<reorder-item>Squash</reorder-item>
				<reorder-item>Lettuce</reorder-item>
			</reorder-list>
		</reorder-item>
		<reorder-item>
			<strong>Grain</strong>
			<reorder-list>
				<reorder-item>Wheat</reorder-item>
				<reorder-item>Barley</reorder-item>
				<reorder-item>Rye</reorder-item>
				<reorder-item>Rice</reorder-item>
			</reorder-list>
		</reorder-item>
	</reorder-list>
</wc-demo>
<style>
	#nested-demo > reorder-list {
		flex-direction: row;
		list-style: none;
		gap: 0.5em;
		padding: 0;
	} #nested-demo > reorder-list strong {
		display: block;
		text-align: center;
	} #nested-demo > reorder-list > reorder-item {
		background: var(--t-bg-a);
		padding: 0.75em;
		border-radius: 0.25em;
		flex: 1;
	}
	#nested-demo reorder-list reorder-list {
		list-style: none;
		border-radius: 0.5em;
		width: min(400px, 100%);
		padding: 0.5em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin: 0;
	} #nested-demo reorder-list reorder-list reorder-item {
		background: var(--t-bg-b);
		border-radius: 0.25em;
		padding: 0.5em;
		box-shadow: 0 0.1em 0.15em #0002;
	}
</style>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">reorder-list</span> <span class="hljs-attr">orientation</span>=<span class="hljs-string">&quot;horizontal&quot;</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Fruit<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">reorder-list</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Apple<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Orange<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Banana<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Kiwi<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
		<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-list</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Vegetable<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">reorder-list</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Tomato<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Carrot<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Squash<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Lettuce<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
		<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-list</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Grain<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">reorder-list</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Wheat<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Barley<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Rye<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>Rice<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
		<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-list</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-list</span>&gt;</span>
</code></pre>
<h2 id="accessibility">Accessibility</h2>
<p>This custom element is build with accessibility in mind! It follows the WAI-ARIA guidelines for <a href="https://www.w3.org/WAI/ARIA/apg/example-index/listbox/listbox-rearrangeable.html">rearrangable listboxes</a> (the <code>listbox</code> and <code>option</code> roles).</p>
<ul>
<li>When focus enters the list, focus goes to the currently active list item.</li>
<li><kbd>Up</kbd> and <kbd>Down</kbd> can be used to navigate the list, focusing on an element that will be reordered.</li>
<li><kbd>Alt</kbd> + <kbd>Up</kbd>/<kbd>Down</kbd> moves the currently selected list item up or down in the order.</li>
<li>If orientation is horizontal, then <kbd>Left</kbd> and <kbd>Right</kbd> are used instead.</li>
</ul>
`;function f(n){let s,a;return s=new u({props:{html:b}}),{c(){d(s.$$.fragment)},l(t){c(s.$$.fragment,t)},m(t,e){m(s,t,e),a=!0},p,i(t){a||(h(s.$$.fragment,t),a=!0)},o(t){g(s.$$.fragment,t),a=!1},d(t){j(s,t)}}}function y(n){return r(()=>import("../chunks/define.B7uxw3BH.js"),[],import.meta.url),[]}class q extends o{constructor(s){super(),i(this,s,y,f,l,{})}}export{q as component};
