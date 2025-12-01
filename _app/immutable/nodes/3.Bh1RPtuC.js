import{_ as r}from"../chunks/C1FmrZbK.js";import{s as l,n as c,o}from"../chunks/p4Z6_urL.js";import{S as p,i as h,a as i,t as m,b as d,m as u,g,n as x}from"../chunks/BJ0JgjBn.js";import{R as j}from"../chunks/s_ZfC1PQ.js";import{s as f}from"../chunks/AuAQ2cgS.js";const y=`<h1 id="the-arched-text-element">The arched-text Element</h1>
<p hidden><strong><a href="https://components.auroratide.com/arched-text">View this page with live demos!</a></strong></p>
<p>The <code>arched-text</code> element represents text shaped into an arch.</p>
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
<h2 id="installation">Installation</h2>
<p>You can import through CDN:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;module&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/@auroratide/arched-text/lib/define.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>Or, you may install through <a href="https://www.npmjs.com/package/@auroratide/arched-text">NPM</a> and include it as part of your build process:</p>
<pre><code>$ npm i @auroratide/arched-text
</code></pre>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@auroratide/arched-text/lib/define.js&#x27;</span>
</code></pre>
<h2 id="usage">Usage</h2>
<p><code>arched-text</code> is a <strong>markup element</strong> that can be used in your HTML. It only accepts text as children.</p>
<p>You can use the <code>amount</code> attribute to adjust the amount of arching. It is a decimal number from 0 to 1.</p>
<ul>
<li>The minumum value of 0 means no arching, basically just flat text.</li>
<li>The maximum value of 1 means infinite arching, which... doesn't actually render anything. Probably for the best.</li>
<li>By default it is 0.33333.</li>
</ul>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">arched-text</span>&gt;</span>Default arch<span class="hljs-tag">&lt;/<span class="hljs-name">arched-text</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">arched-text</span> <span class="hljs-attr">amount</span>=<span class="hljs-string">&quot;0.6667&quot;</span>&gt;</span>More arching<span class="hljs-tag">&lt;/<span class="hljs-name">arched-text</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">arched-text</span> <span class="hljs-attr">amount</span>=<span class="hljs-string">&quot;0.1&quot;</span>&gt;</span>Less arching<span class="hljs-tag">&lt;/<span class="hljs-name">arched-text</span>&gt;</span>
</code></pre>
<wc-demo>
	<p style="display: flex; flex-wrap: wrap; gap: 2em; margin-block-start: 1em;">
		<arched-text>Default arch</arched-text>
		<arched-text amount="0.6667">More arching</arched-text>
		<arched-text amount="0.1">Less arching</arched-text>
	</p>
</wc-demo>
<h2 id="accessibility">Accessibility</h2>
<p>The element represents its textual content. That's it, I don't have anything else to say 🙂</p>
`;function _(e){let t,s;return t=new j({props:{html:y}}),{c(){x(t.$$.fragment)},l(a){g(t.$$.fragment,a)},m(a,n){u(t,a,n),s=!0},p:c,i(a){s||(d(t.$$.fragment,a),s=!0)},o(a){m(t.$$.fragment,a),s=!1},d(a){i(t,a)}}}function b(e){return r(()=>import("../chunks/BTnfLqC7.js"),[],import.meta.url),o(()=>{f()}),[]}class k extends p{constructor(t){super(),h(this,t,b,_,l,{})}}export{k as component};
