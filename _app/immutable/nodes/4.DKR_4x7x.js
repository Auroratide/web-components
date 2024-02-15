import{_ as o}from"../chunks/preload-helper.BQ24v_F8.js";import{s as p,n as i,o as r}from"../chunks/scheduler.Ce_0Mfso.js";import{S as d,i as h,s as u,m,l as f,d as c,h as g,n as j,f as b,o as y,p as w,q as k,r as v}from"../chunks/index.QmGHi4hh.js";import{R as T}from"../chunks/Readme.BbztUA8r.js";const _=`<h1 id="the-flip-card-element">The flip-card Element</h1>
<p hidden><strong><a href="https://auroratide.github.io/web-components/flip-card">View this page with live demos!</a></strong></p>
<p>The <code>flip-card</code> element represents content with a front side and a back side, with one side presented at a time.</p>
<wc-demo class="flip-card-demo">
	<flip-card class="default" corner-accuracy="0">
		<section slot="front">
			<p>The front!</p>
		</section>
		<section slot="back">
			<p>The back!</p>
		</section>
	</flip-card>
	<div slot="actions">
		<button>Flip!</button>
	</div>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">flip-card</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;front&quot;</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The front!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;back&quot;</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The back!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">flip-card</span>&gt;</span>
</code></pre>
<h2 id="installation">Installation</h2>
<p>You can import through CDN:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;module&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/@auroratide/flip-card/lib/define.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>Or, you may install through <a href="https://www.npmjs.com/package/@auroratide/flip-card">NPM</a> and include it as part of your build process:</p>
<pre><code>$ npm i @auroratide/flip-card
</code></pre>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;@auroratide/flip-card/lib/define.js&quot;</span>
</code></pre>
<h2 id="usage">Usage</h2>
<p><code>flip-card</code> is a <strong>markup element</strong> that can be used in your HTML. When you use it, you must specify a <strong>front</strong> slot and a <strong>back</strong> slot, using the <code>slot</code> attribute on the direct descendents.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">flip-card</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;front&quot;</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The front!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;back&quot;</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The back!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">flip-card</span>&gt;</span>
</code></pre>
<h3 id="controlling-the-visible-side">Controlling the visible side</h3>
<p>By default, the front of the card is show, and the backside is hidden. Using the <code>facedown</code> attribute, you can make the backside show instead.</p>
<wc-demo class="flip-card-demo">
	<flip-card class="default" facedown corner-accuracy="0">
		<section slot="front">
			<p>The front!</p>
		</section>
		<section slot="back">
			<p>The back!</p>
		</section>
	</flip-card>
	<div slot="actions">
		<button>Flip!</button>
	</div>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">flip-card</span> <span class="hljs-attr">facedown</span>&gt;</span>
	<span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">flip-card</span>&gt;</span>
</code></pre>
<h3 id="flipping-the-card">Flipping the card</h3>
<p>You can flip a card with Javascript by either setting its <code>facedown</code> property, or by calling the <code>flip()</code> method on the element.</p>
<pre><code class="language-js"><span class="hljs-keyword">const</span> card = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&quot;flip-card&quot;</span>)

card.<span class="hljs-property">facedown</span> = <span class="hljs-literal">true</span>

card.<span class="hljs-title function_">flip</span>()
</code></pre>
<h2 id="customizing-the-card">Customizing the Card</h2>
<p>Since it's Just HTML<sup>TM</sup>, you can use good ol' CSS to customize the card, with a few special things you can do.</p>
<pre><code class="language-css">flip-card {
	<span class="hljs-attribute">width</span>: <span class="hljs-number">15em</span>;
	<span class="hljs-attribute">height</span>: <span class="hljs-number">20em</span>;
}
</code></pre>
<h3 id="card-edges">Card Edges</h3>
<p>Like in real life, these cards have some thickness! The effect is subtle, but makes a great difference in how the flip feels.</p>
<ul>
<li>The <code>--card-depth</code> CSS propery lets you customize the card's thickness.</li>
<li>The <code>::part(edge)</code> CSS selector lets you customize the edge's color and other properties.</li>
</ul>
<wc-demo class="flip-card-demo">
	<flip-card class="coin" corner-accuracy="16">
		<section slot="front">
			<p>Heads</p>
		</section>
		<section slot="back">
			<p>Tails</p>
		</section>
	</flip-card>
	<div slot="actions">
		<button>Flip!</button>
	</div>
</wc-demo>
<pre><code class="language-css">flip-card {
	<span class="hljs-attr">--card-depth</span>: <span class="hljs-number">1em</span>;
}

flip-card<span class="hljs-selector-pseudo">::part</span>(edge) {
	<span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">20%</span> <span class="hljs-number">0.066</span> <span class="hljs-number">255</span>);
}
</code></pre>
<h3 id="rounded-corners">Rounded corners</h3>
<p><code>border-radius</code> on the card rounds the corners (mostly) like you would expect. It's a bit of a magic trick to make the card's edge rounded, as curved 3D surfaces don't exist in HTML/CSS. As a result there are some limitations.</p>
<p>The following won't look very good unless the card's thickness is 0.</p>
<ul>
<li>Percentage-based border radius (e.g. <code>border-radius: 50%</code>)</li>
<li>Different border radii for different corners (e.g. <code>border-radius: 1em 0.5em</code>)</li>
<li>Elliptical border radius (e.g. <code>border-radius: 1em / 0.5em</code>)</li>
<li>Dynamically changing the border radius on the fly</li>
</ul>
<h3 id="flip-height-and-duration">Flip height and duration</h3>
<p>The following apply to the default animation.</p>
<ul>
<li>The <code>--flip-height</code> CSS property customizes how high the card lifts off the surface. The default is</li>
<li>The <code>--flip-duration</code> CSS property customizes how long the flip lasts.</li>
</ul>
<wc-demo class="flip-card-demo">
	<flip-card class="default long-and-high" corner-accuracy="0">
		<section slot="front">
			<p>Front</p>
		</section>
		<section slot="back">
			<p>Back</p>
		</section>
	</flip-card>
	<div slot="actions">
		<button>Flip!</button>
	</div>
</wc-demo>
<pre><code class="language-css">flip-card {
	<span class="hljs-attr">--flip-height</span>: <span class="hljs-number">40em</span>;
	<span class="hljs-attr">--flip-duration</span>: <span class="hljs-number">1.5s</span>;
}
</code></pre>
<h3 id="3d-perspective">3D perspective</h3>
<p>By default, each card lives in its own 3D context. That's just to make it super easy to get a single <code>flip-card</code> working.</p>
<p>However, if you have multiple cards, you may find it looks wrong. That's because in reality, we view the world in a single <strong>perspective</strong>: our own perspective.</p>
<p>As such, to get the most realistic card flips when there are multiple cards, you may want to put them all in the same 3D perspective context. You can do this with two steps:</p>
<ol>
<li>Apply <code>perspective: none</code> CSS to every <code>flip-card</code> element.</li>
<li>Make all your <code>flip-card</code> elements direct children of a container with non-zero <code>perspective</code>.</li>
</ol>
<wc-demo class="flip-card-demo">
	<div class="card-container">
		<flip-card class="default" corner-accuracy="0">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
		<flip-card class="default" corner-accuracy="0">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
		<flip-card class="default" corner-accuracy="0">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
		<flip-card class="default" corner-accuracy="0">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
	</div>
	<div slot="actions">
		<button>Flip!</button>
	</div>
</wc-demo>
<pre><code class="language-css"><span class="hljs-selector-class">.card-container</span> {
	<span class="hljs-attribute">perspective</span>: <span class="hljs-number">125em</span>;
	<span class="hljs-attribute">perspective-origin</span>: center;
}

<span class="hljs-selector-class">.card-container</span> flip-card {
	<span class="hljs-attribute">perspective</span>: none;
}
</code></pre>
<h3 id="fully-custom-animations">Fully custom animations</h3>
<p>TODO</p>
<h2 id="events">Events</h2>
<p>TODO</p>
<h2 id="accessibility">Accessibility</h2>
<p>This custom element is build with accessibility in mind!</p>
<p>TODO. Test/consider:</p>
<ul>
<li>What the screenreader reads</li>
<li>Labelling the card so we know it's a card with a front and a back</li>
<li>what if the card contains focusable elements inside? Tabbing order?</li>
<li>aria-live recommendations?</li>
</ul>
<h2 id="other-todo">OTHER TODO</h2>
<ul>
<li>Make corner-accuracy a CSS property so it can be applied en-masse</li>
<li>custom animations in the shadow dom is janky doodle</li>
<li>Add events (flipping, flipped)</li>
</ul>
`,S=()=>{document.querySelectorAll(".flip-card-demo").forEach(e=>{const n=e.querySelectorAll("flip-card"),t=e.querySelector("button");t==null||t.addEventListener("click",()=>{n.forEach(a=>a.flip())})})};function q(e){let n,t,a;return t=new T({props:{html:_}}),{c(){n=u(),m(t.$$.fragment),this.h()},l(s){f("svelte-8ek0hh",document.head).forEach(c),n=g(s),j(t.$$.fragment,s),this.h()},h(){document.title="The flip-card Element"},m(s,l){b(s,n,l),y(t,s,l),a=!0},p:i,i(s){a||(w(t.$$.fragment,s),a=!0)},o(s){k(t.$$.fragment,s),a=!1},d(s){s&&c(n),v(t,s)}}}function C(e){return o(()=>import("../chunks/define.CkHqf4EW.js"),__vite__mapDeps([]),import.meta.url),r(()=>{S()}),[]}class $ extends d{constructor(n){super(),h(this,n,C,q,p,{})}}export{$ as component};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
