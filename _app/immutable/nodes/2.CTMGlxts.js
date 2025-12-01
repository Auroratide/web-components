const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../chunks/BxcPM8AB.js","../chunks/BkzQfvds.js","../assets/style.B89jwdWn.css"])))=>i.map(i=>d[i]);
import{_ as a}from"../chunks/C1FmrZbK.js";import{s as o,n as i,o as c}from"../chunks/p4Z6_urL.js";import{S as h,i as m,d as r,a as g,t as d,b as u,c as j,m as b,f,j as w,k as y,g as v,o as x,n as k}from"../chunks/BJ0JgjBn.js";import{s as _}from"../chunks/DlallKuY.js";import{s as q}from"../chunks/e7UggXcj.js";import{b as T}from"../chunks/2fh9akDk.js";import{f as E}from"../chunks/BMJTztQG.js";import{R as A}from"../chunks/CtTzQs9K.js";import{s as z}from"../chunks/AuAQ2cgS.js";const V=`<h1 id="web-components-by-auroratide">Web Components by Auroratide</h1>
<p hidden><strong><a href="https://components.auroratide.com">View this page with live demos!</a></strong></p>
<p>This is just a bunch of highly reusable, fully accessible <strong><a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">web components</a></strong> you can use on your websites! Why web components?</p>
<ul>
<li>It's part of the <a href="https://html.spec.whatwg.org/#custom-elements">HTML Standard</a>, so they work in <a href="https://custom-elements-everywhere.com/">every web framework</a>, or with no framework at all.</li>
<li>They are <a href="https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/">fast and small</a> compared to components in frameworks, since there's zero library overhead.</li>
<li>They facilitate <a href="https://kryogenix.org/code/browser/everyonehasjs.html">progressive enhancement</a>: viewers get a basic view of content before the Javascript makes it functional.</li>
</ul>
<p><small>Made by <a href="https://auroratide.com">Auroratide</a>, a developer with a passion for the web, inclusive design, and storytelling ❤️</small></p>
<h2 id="the-arched-text-element">The arched-text Element</h2>
<p><strong>View</strong>: <a href="https://components.auroratide.com/arched-text">The arched-text Element</a></p>
<p>An element that forms an arch out of text.</p>
<wc-demo>
	<div class="arch-amount-demo">
		<p style="font-size: 2em;">
			<arched-text amount="0.5">This text is arched!</arched-text>
		</p>
		<section class="range-input">
			<input id="arch-demo-amount" type="range" min="0" max="1" value="0.5" step="0.05" />
			<label for="arch-demo-amount">Arch Amount</label>
		</section>
	</div>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">arched-text</span>&gt;</span>This text is arched!<span class="hljs-tag">&lt;/<span class="hljs-name">arched-text</span>&gt;</span>
</code></pre>
<h2 id="the-flip-card-element">The flip-card Element</h2>
<p><strong>View</strong>: <a href="https://components.auroratide.com/flip-card">The flip-card Element</a></p>
<p>An element that flips beautifully between a front and back side.</p>
<wc-demo id="flip-card" class="flip-card-demo">
	<flip-card>
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
<style>
	#flip-card flip-card {
		--card-depth: 0.5em;
		--corner-granularity: 6;
		width: 100%;
		max-width: 10em;
		height: 12.5em;
		border-radius: 0.5em;
	}
	#flip-card flip-card > section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 0.333em solid var(--t-fg-a);
		color: var(--t-fg-b);
		font-size: 1.25em;
		box-shadow: 0.125em 0.125em 0.25em oklch(0% 0 0 / 0.25) inset;
	}
	#flip-card flip-card > [slot="front"] {
		background-color: var(--t-blue-a);
	}
	#flip-card flip-card > [slot="back"] {
		background-color: var(--t-purple-a);
	}
	#flip-card flip-card::part(edge) {
		background-color: var(--t-fg-a);
	}
	#flip-card flip-card p:last-child { margin: 0; }
</style>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">flip-card</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;front&quot;</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The front!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;back&quot;</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The back!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">flip-card</span>&gt;</span>
</code></pre>
<h2 id="the-img-zoom-element">The img-zoom Element</h2>
<p><strong>View</strong>: <a href="https://components.auroratide.com/img-zoom">The img-zoom Element</a></p>
<p>An element that accessibly zooms in on an image when the user wants to see more details.</p>
<wc-demo id="img-zoom" class="img-zoom-demo">
	<img-zoom style="width: 50%">
      <img src="./components/img-zoom/fruit.png" alt="Apples and such arranged on a table." width="1920" height="1470" />
   </img-zoom>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">img-zoom</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">img</span>
		<span class="hljs-attr">src</span>=<span class="hljs-string">&quot;fruit.png&quot;</span>
		<span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Apples and such arranged on a table.&quot;</span>
		<span class="hljs-attr">width</span>=<span class="hljs-string">&quot;1920&quot;</span>
		<span class="hljs-attr">height</span>=<span class="hljs-string">&quot;1470&quot;</span>
	/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">img-zoom</span>&gt;</span>
</code></pre>
<h2 id="the-reorder-list-element">The reorder-list Element</h2>
<p><strong>View</strong>: <a href="https://components.auroratide.com/reorder-list">The reorder-list Element</a></p>
<p>A set of elements (<code>reorder-list</code> and <code>reorder-item</code>) that work together to make a rearrangeable list:</p>
<wc-demo id="reorder-list">
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
	#reorder-list reorder-list {
		list-style: none;
		background: var(--t-bg-a);
		border-radius: 0.5em;
		width: min(400px, 100%);
		padding: 0.75em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
	#reorder-list reorder-item {
		background: var(--t-bg-b);
		border-radius: 0.25em;
		padding: 0.5em;
		box-shadow: 0 0.1em 0.15em #0002;
	}
	#reorder-list ul {
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
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">reorder-list</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Cobb Salad<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Fried Rice<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Chimichanga<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Banana Pancake<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">reorder-item</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Philly Cheese Sandwich<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">reorder-list</span>&gt;</span>
</code></pre>
<h2 id="the-tab-list-element">The tab-list Element</h2>
<p><strong>View</strong>: <a href="https://components.auroratide.com/tab-list">The tab-list Element</a></p>
<p>A set of elements (<code>tab-list</code>, <code>tab-item</code>, and <code>tab-panel</code>) that work together to make a tabbing interface:</p>
<wc-demo id="tab-list">
	<div class="tab-container">
		<tab-list aria-label="Fruit dessert recipes">
			<tab-item for="example-4-tab-1" selected>Apples</tab-item>
			<tab-item for="example-4-tab-2">Oranges</tab-item>
			<tab-item for="example-4-tab-3">Bananas</tab-item>
		</tab-list>
		<div class="tab-panels-container">
			<tab-panel id="example-4-tab-1">
				<p>Ingredients for making apple pie:</p>
				<ul>
					<li>8 Granny Smith apples</li>
					<li>½ cup butter</li>
					<li>3 tablespoons flour</li>
					<li>½ cup white sugar</li>
					<li>½ cup brown sugar</li>
					<li>¼ water</li>
					<li>A double-crust pie pastry</li>
				</ul>
			</tab-panel>
			<tab-panel id="example-4-tab-2">
				<p>Ingredients for making orange sorbet:</p>
				<ul>
					<li>2 cups orange juice pulp</li>
					<li>1½ cup almond milk</li>
					<li>1 tablespoon orange zest</li>
					<li>1 tablespoon lemon juice</li>
					<li>¼ teaspoon salt</li>
					<li>1 teaspoon vanilla extract</li>
					<li>½ teaspoon sweetener</li>
				</ul>
			</tab-panel>
			<tab-panel id="example-4-tab-3">
				<p>Ingredients for making banana pudding:</p>
				<ul>
					<li>14 bananas</li>
					<li>5 ounce packet instant vanilla pudding</li>
					<li>2 cups milk</li>
					<li>14 ounce can condensed milk</li>
					<li>1 tablespoon vanilla extract</li>
					<li>12 ounces frozen whipped topping</li>
					<li>16 ounces vanilla wafers</li>
				</ul>
			</tab-panel>
		</div>
	</div>
</wc-demo>
<style>
	#tab-list .tab-container {
        box-shadow: 0 0.125em 0.25em oklch(0% 0 0 / 0.25);
    }
    #tab-list tab-list {
        background: var(--t-primary-a);
        gap: 0;
    }
    #tab-list tab-item {
        border: none;
        border-radius: 0;
        background: var(--t-primary-a);
        color: var(--t-fg-b);
        padding: 0.625em 1.125em;
        border-right: 0.125em solid oklch(38% 0.125 250);
    }
    #tab-list tab-item:hover:not([selected]),
    #tab-list tab-item:focus:not([selected]) {
        background: oklch(38% 0.125 250);
    }
    #tab-list tab-item[selected] {
        background: var(--t-bg-a);
        border-color: transparent;
        color: var(--t-fg-b);
    }
    #tab-list .tab-panels-container { display: grid; }
    #tab-list tab-panel {
        grid-area: 1 / 1;
        border: none;
        padding: 0.625em 1.125em 1.125em;
        opacity: 1;
        transition: opacity 0.2s ease-in-out;
        background: var(--t-bg-a);
    }
    #tab-list tab-panel[hidden] {
        display: block;
        opacity: 0;
    }
    #tab-list tab-panel *:last-child {
        margin: 0;
    }
	 #tab-list tab-panel p {
	     margin-block: 1.25em;
	 }
</style>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">tab-list</span> <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Fruit dessert recipes&quot;</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">tab-item</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;tab-1&quot;</span> <span class="hljs-attr">selected</span>&gt;</span>Apples<span class="hljs-tag">&lt;/<span class="hljs-name">tab-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">tab-item</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;tab-2&quot;</span>&gt;</span>Oranges<span class="hljs-tag">&lt;/<span class="hljs-name">tab-item</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">tab-item</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;tab-3&quot;</span>&gt;</span>Bananas<span class="hljs-tag">&lt;/<span class="hljs-name">tab-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tab-list</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;tab-panels-container&quot;</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">tab-panel</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;tab-1&quot;</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Ingredients for making apple pie!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">tab-panel</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">tab-panel</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;tab-2&quot;</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Ingredients for making orange sorbet!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">tab-panel</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">tab-panel</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;tab-3&quot;</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Ingredients for making banana pudding!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">tab-panel</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="the-table-of-contents-element">The table-of-contents Element</h2>
<p><strong>View</strong>: <a href="https://components.auroratide.com/table-of-contents">The table-of-contents Element</a></p>
<p>A component that automatically generates a table of contents.</p>
<wc-demo>
	<table-of-contents for="main" aria-label="Demo Table of Contents Element"></table-of-contents>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">table-of-contents</span>
	<span class="hljs-attr">for</span>=<span class="hljs-string">&quot;main&quot;</span>
	<span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Table of Contents&quot;</span>
&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">table-of-contents</span>&gt;</span>
</code></pre>
<h2 id="the-toggle-switch-element">The toggle-switch Element</h2>
<p><strong>View</strong>: <a href="https://components.auroratide.com/toggle-switch">The toggle-switch Element</a></p>
<p>A form control representing something is on or off.</p>
<wc-demo>
	<label for="toggle-switch">Fancy Switch</label>
	<toggle-switch id="toggle-switch"></toggle-switch>
	<style>
		#toggle-switch {
			height: 1em;
			margin-inline: 1em;
			vertical-align: middle;
		}
		#toggle-switch::part(track) {
			height: 0.75em;
			border-radius: 1em;
			background-color: oklch(70% 0.005 255);
			margin: 0.125em 0;
		}
		#toggle-switch::part(slider) {
			width: 1em;
			height: 1em;
			border-radius: 50%;
			background-color: oklch(97.5% 0.005 255);
			box-shadow: 0.0625em 0.0625em 0.125em oklch(0% 0 0 / 0.25);
			margin: -0.125em 0;
		}
		#toggle-switch[checked]::part(track) {
			background-color: oklch(64% 0.142 250);
		}
	</style>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;toggle-switch&quot;</span>&gt;</span>Fancy Switch<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">toggle-switch</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;toggle-switch&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">toggle-switch</span>&gt;</span>
</code></pre>
<h2 id="the-typewritten-text-element">The typewritten-text Element</h2>
<p><strong>View</strong>: <a href="https://components.auroratide.com/typewritten-text">The typewritten-text Element</a></p>
<p>An element that types one letter at a time to the screen.</p>
<wc-demo id="typewritten-text-demo">
	<div class="sentence">
		<p>Have you tried our</p>
		<ul class="typewriter-cycle">
			<li><typewritten-text class="active">fresh salads? 🥗</typewritten-text></li>
			<li><typewritten-text paused>hearty burgers? 🍔</typewritten-text></li>
			<li><typewritten-text paused>delicious pies? 🥧</typewritten-text></li>
		</ul>
	</div>
</wc-demo>
<style>
	#typewritten-text-demo .sentence p { display: inline; }
	#typewritten-text-demo .typewriter-cycle {
		display: inline-block;
		position: relative;
		width: 20ch;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	#typewritten-text-demo .typewriter-cycle li:not(:first-child) {
		position: absolute;
		inset: 0;
	}
	#typewritten-text-demo typewritten-text { font-weight: bold; }
	#typewritten-text-demo typewritten-text:not(.active) .cursor::after {
		visibility: hidden;
	}
</style>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sentence&quot;</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Have you tried our<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;typewriter-cycle&quot;</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span>&gt;</span>fresh salads? 🥗<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">paused</span>&gt;</span>hearty burgers? 🍔<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">typewritten-text</span> <span class="hljs-attr">paused</span>&gt;</span>delicious pies? 🥧<span class="hljs-tag">&lt;/<span class="hljs-name">typewritten-text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
	<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
`;function I(p){let t,n,e;return n=new A({props:{html:V,assets:[{replace:"./components/img-zoom/fruit.png",with:E}]}}),{c(){t=x("div"),k(n.$$.fragment),this.h()},l(s){t=w(s,"DIV",{class:!0});var l=y(t);v(n.$$.fragment,l),l.forEach(r),this.h()},h(){f(t,"class","img-contained svelte-w5efvt")},m(s,l){j(s,t,l),b(n,t,null),e=!0},p:i,i(s){e||(u(n.$$.fragment,s),e=!0)},o(s){d(n.$$.fragment,s),e=!1},d(s){s&&r(t),g(n)}}}function P(p){return a(()=>import("../chunks/BTnfLqC7.js"),[],import.meta.url),a(()=>import("../chunks/DdJp3656.js"),[],import.meta.url),a(()=>import("../chunks/BnObGrAy.js"),[],import.meta.url),a(()=>import("../chunks/B7uxw3BH.js"),[],import.meta.url),a(()=>import("../chunks/B67tN34s.js"),[],import.meta.url),a(()=>import("../chunks/gp_6CtRi.js"),[],import.meta.url),a(()=>import("../chunks/BxcPM8AB.js"),__vite__mapDeps([0,1]),import.meta.url),a(()=>Promise.resolve({}),__vite__mapDeps([2]),import.meta.url),a(()=>import("../chunks/EotpxmhP.js"),[],import.meta.url),c(()=>{z(),q(),_(),T()}),[]}class W extends h{constructor(t){super(),m(this,t,P,I,o,{})}}export{W as component};
