import{_ as o}from"../chunks/preload-helper.C1FmrZbK.js";import{s as l,n as c,o as i}from"../chunks/scheduler.uMbUtuGX.js";import{S as r,i as p,c as d,a as h,m as u,t as f,n as m,o as g}from"../chunks/index.Dz7ClLEz.js";import{R as b}from"../chunks/Readme.CF4HCArv.js";import{s as j}from"../chunks/setup-flip-card-demos.e7UggXcj.js";const y=`<h1 id="the-flip-card-element">The flip-card Element</h1>
<p hidden><strong><a href="https://components.auroratide.com/flip-card">View this page with live demos!</a></strong></p>
<p>The <code>flip-card</code> element represents content with a front side and a back side, with one side presented at a time.</p>
<wc-demo class="flip-card-demo">
	<flip-card class="default">
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
	<flip-card class="default" facedown>
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
	<flip-card class="coin">
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
<ul>
<li>Use the <code>border-radius</code> CSS property to make rounded corners, but it must be a single absolute length.</li>
<li>The <code>--corner-granularity</code> CSS property is an integer that represents how smooth the 3D curve is on a card's rounded corners. Higher is smoother; default is <code>4</code>.</li>
<li>Call <code>recreateBorderRadius()</code> anytime the card's sizes or border-radius's sizes change.</li>
</ul>
<p><code>border-radius</code> on the card rounds the corners (mostly) like you would expect. It's a bit of a magic trick to make the card's edge rounded, as curved 3D surfaces don't exist in HTML/CSS. As a result there are some limitations.</p>
<p>The following won't look very good unless the card's thickness is 0.</p>
<ul>
<li>Percentage-based border radius (e.g. <code>border-radius: 50%</code>)</li>
<li>Different border radii for different corners (e.g. <code>border-radius: 1em 0.5em</code>)</li>
<li>Elliptical border radius (e.g. <code>border-radius: 1em / 0.5em</code>)</li>
<li>Dynamically changing the border radius on the fly</li>
</ul>
<p>Additionally, because curved 3D surfaces don't exist, the element must <em>simulate</em> a curved surface using lots of small flat surfaces. You can use the <code>--corner-granularity</code> CSS property to control how smooth the border-radius looks edge-on. In general, if you have a large border radius, you want a bigger <code>--corner-granularity</code>. It is an integer.</p>
<p>For example, the first coin has low corner granularity, and the second coin has high corner granularity.</p>
<wc-demo class="flip-card-demo">
	<div class="card-container" style="--flip-duration: 2s;">
		<flip-card class="coin" style="--corner-granularity: 3;">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
		<flip-card class="coin" style="--corner-granularity: 16;">
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
<pre><code class="language-css">flip-card {
	<span class="hljs-attr">--corner-granularity</span>: <span class="hljs-number">16</span>;
	<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5em</span>;
}
</code></pre>
<p>Finally, there is an escape hatch! If you find yourself dynamically changing the dimensions of the card or its border radius, you can manually call the <code>recreateBorderRadius()</code> method to reformat the corners. It's up to you to decide when this is needed, but if you have an unchanging card, then it probably isn't needed at all.</p>
<h3 id="flip-height-and-duration">Flip height and duration</h3>
<p>The following apply to the default animation.</p>
<ul>
<li>The <code>--flip-height</code> CSS property customizes how high the card lifts off the surface. The default is</li>
<li>The <code>--flip-duration</code> CSS property customizes how long the flip lasts.</li>
</ul>
<wc-demo class="flip-card-demo">
	<flip-card class="default long-and-high">
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
		<flip-card class="default">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
		<flip-card class="default">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
		<flip-card class="default">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
		<flip-card class="default">
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
<p>You can use the <code>setFlipToFrontAnimation()</code> and <code>setFlipToBackAnimation()</code> methods in Javascript to give the card a different flip animation.</p>
<p>Here's an example for a vertical flip, rather than a horizontal flip.</p>
<wc-demo class="flip-card-demo">
	<flip-card class="default vertical-flip">
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
<pre><code class="language-js">card.<span class="hljs-title function_">setFlipToFrontAnimation</span>(
	[ {
		<span class="hljs-attr">transform</span>: <span class="hljs-string">&quot;translateZ(calc(-1 * var(--_depth))) rotateX(180deg)&quot;</span>,
	}, {
		<span class="hljs-attr">transform</span>: <span class="hljs-string">&quot;translateZ(var(--_height)) rotateX(270deg)&quot;</span>,
	}, {
		<span class="hljs-attr">transform</span>: <span class="hljs-string">&quot;translateZ(0em) rotateX(360deg)&quot;</span>,
	} ],
	{
		<span class="hljs-attr">easing</span>: <span class="hljs-string">&quot;ease-in-out&quot;</span>,
	},
)

card.<span class="hljs-title function_">setFlipToBackAnimation</span>(
	[ {
		<span class="hljs-attr">transform</span>: <span class="hljs-string">&quot;translateZ(0em) rotateX(0deg)&quot;</span>,
	}, {
		<span class="hljs-attr">transform</span>: <span class="hljs-string">&quot;translateZ(var(--_height)) rotateX(90deg)&quot;</span>,
	}, {
		<span class="hljs-attr">transform</span>: <span class="hljs-string">&quot;translateZ(calc(-1 * var(--_depth))) rotateX(180deg)&quot;</span>,
	} ],
	{
		<span class="hljs-attr">easing</span>: <span class="hljs-string">&quot;ease-in-out&quot;</span>,
	},
)
</code></pre>
<p>(and a dash of CSS too, to orient the backside properly at rest)</p>
<pre><code class="language-css">flip-card &gt; <span class="hljs-selector-attr">[slot=<span class="hljs-string">&quot;back&quot;</span>]</span> {
	<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(-<span class="hljs-number">1</span>);
}
</code></pre>
<p>The <code>flip-card</code> component uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API">Web Animations API</a> to perform animations, rather than CSS. This confers some advantages, such as being able to generate animations on the fly or apply easing to the entire animation rather than just keyframes. It's also necessary in order to penetrate the Shadow DOM properly.</p>
<p>Each method has the same interface as the Element's <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/animate">animate()</a> method:</p>
<ul>
<li>The first parameter is a list of keyframes. The <code>offset</code> property is equivalent to defining percentage in CSS's equivalent <code>@keyframes</code>. See <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats">Keyframe Formats</a> for details.</li>
<li>The second parameter are options, such as number of iterations or easing. See <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#parameters">KeyframeEffect's object parameter</a> for details.</li>
</ul>
<h3 id="all-customization-options-in-a-single-list">All customization options in a single list</h3>
<table>
<thead>
<tr>
<th>Name</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--card-depth</code></td>
<td><code>0.15em</code></td>
<td>How thick the card's edge is.</td>
</tr>
<tr>
<td><code>--flip-height</code></td>
<td><code>20em</code></td>
<td>How high the card travels vertically when flipped.</td>
</tr>
<tr>
<td><code>--flip-duration</code></td>
<td><code>0.75s</code></td>
<td>How long it takes the card to complete a flip.</td>
</tr>
<tr>
<td><code>--flip-duration</code></td>
<td><code>0.75s</code></td>
<td>How long it takes the card to complete a flip.</td>
</tr>
<tr>
<td><code>--corner-granularity</code></td>
<td><code>4</code></td>
<td>How smooth the card's corner edges should be when rounded. Higher is smoother.</td>
</tr>
<tr>
<td><code>setFlipToFrontAnimation()</code></td>
<td>a horizontal flip</td>
<td>Animation to play when flipping the card from being face down to being face up. Parameters are keyframes and options.</td>
</tr>
<tr>
<td><code>setFlipToBackAnimation()</code></td>
<td>a horizontal flip</td>
<td>Animation to play when flipping the card from being face up to being face down. Parameters are keyframes and options.</td>
</tr>
</tbody>
</table>
<h2 id="events">Events</h2>
<p>The <code>flip-card</code> element dispatches the following events:</p>
<table>
<thead>
<tr>
<th>Name</th>
<th>When Triggered</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>flipping</code></td>
<td>Whenever the card begins to flip.</td>
</tr>
<tr>
<td><code>flipped</code></td>
<td>Whenever the card's flip animation ends.</td>
</tr>
</tbody>
</table>
<p>Both events contain in their details a property <code>facedown</code> indicating to which side the card is flipping or flipped.</p>
<pre><code class="language-js">card.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;flipping&#x27;</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
	<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(e.<span class="hljs-property">detail</span>.<span class="hljs-property">facedown</span>)
})
</code></pre>
<h2 id="accessibility">Accessibility</h2>
<p>This custom element is built with accessibility in mind!</p>
<ul>
<li>Screenreaders only announce the side that is visible.</li>
<li>Screenreaders announce &quot;Frontside&quot; or &quot;Backside&quot; to denote which side is visible.</li>
<li>Tabbable elements on the non-facing side of the card cannot be focused until the card is flipped.</li>
<li>The flip animation is disabled for people who <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion">prefer reduced motion</a>.</li>
</ul>
<h3 id="labelling-cards">Labelling Cards</h3>
<p>The <code>flip-card</code> element does not prescribe a specific way to accessibly label the card's content, as the best way to do this depends on the card's context. Possibilities include:</p>
<ul>
<li>Wrapping the card in an <code>article</code> element if its contents are self-contained.</li>
<li>Labelling the card with text within the card itself using <code>aria-labelledby</code>, with <code>role=&quot;region&quot;</code>.</li>
<li>Simply putting a heading element above the card.</li>
<li>Wrapping the card in a <code>figure</code> element and using <code>figcaption</code> to label it.</li>
</ul>
<h3 id="announcing-when-the-card-flips">Announcing when the card flips</h3>
<p>If you attach <code>aria-live=&quot;polite&quot;</code> to the <code>flip-card</code>, then flipping the card will announce the new side's contents to screen readers. As this may not always be desired behaviour, it is up to you to discern whether adding <code>aria-live</code> will make your content more accessible.</p>
`;function w(e){let t,s;return t=new b({props:{html:y}}),{c(){d(t.$$.fragment)},l(n){h(t.$$.fragment,n)},m(n,a){u(t,n,a),s=!0},p:c,i(n){s||(f(t.$$.fragment,n),s=!0)},o(n){m(t.$$.fragment,n),s=!1},d(n){g(t,n)}}}function v(e){return o(()=>import("../chunks/define.DdJp3656.js"),[],import.meta.url),i(()=>{j()}),[]}class F extends r{constructor(t){super(),p(this,t,v,w,l,{})}}export{F as component};
