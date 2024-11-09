import{_ as o}from"../chunks/preload-helper.C1FmrZbK.js";import{s as i,n as c}from"../chunks/scheduler.uMbUtuGX.js";import{S as r,i as h,e as m,c as g,d as u,f as d,a as j,h as p,j as f,k as b,m as w,t as q,n as z,o as _}from"../chunks/index.Dz7ClLEz.js";import{R as y}from"../chunks/Readme.BAL9kLut.js";import{f as k}from"../chunks/fruit.BMJTztQG.js";const v=`<h1 id="the-img-zoom-element">The img-zoom Element</h1>
<p hidden><strong><a href="https://components.auroratide.com/img-zoom">View this page with live demos!</a></strong></p>
<p>The <code>img-zoom</code> element represents an image that can be enlarged to fill the screen on demand.</p>
<wc-demo id="main-demo">
   <img-zoom style="width: 50%">
      <img src="./fruit.png" alt="Apples and such arranged on a table." width="1920" height="1470" />
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
<h2 id="installation">Installation</h2>
<p>You can import through CDN:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;module&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/@auroratide/img-zoom/lib/define.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>Or, you may install through <a href="https://www.npmjs.com/package/@auroratide/img-zoom">NPM</a> and include it as part of your build process:</p>
<pre><code>$ npm i @auroratide/img-zoom
</code></pre>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@auroratide/img-zoom/lib/define.js&#x27;</span>
</code></pre>
<h2 id="usage">Usage</h2>
<p><code>img-zoom</code> is an <strong>inline markup element</strong> that you can use in your HTML document. It must have <em>exactly one</em> child which is either an <code>img</code> element or a <code>picture</code> element with a fallback <code>img</code> defined.</p>
<p><strong>Using img:</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">img-zoom</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;fruit.png&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Apples and such arranged on a table.&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;1920&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;1470&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">img-zoom</span>&gt;</span>
</code></pre>
<p><strong>Using picture:</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">img-zoom</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">picture</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">source</span> <span class="hljs-attr">srcset</span>=<span class="hljs-string">&quot;fruit.webp&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;image/webp&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;fruit.png&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Apples and such arranged on a table.&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;1920&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;1470&quot;</span> /&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">picture</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">img-zoom</span>&gt;</span>
</code></pre>
<wc-demo id="picture-demo">
   <p>This demo uses the <code>picture</code> element.</p>
   <img-zoom style="width: 50%;">
      <picture>
         <source srcset="./fruit.webp" type="image/webp" />
         <img src="./fruit.png" alt="Apples and such arranged on a table." width="1920" height="1470" />
      </picture>
   </img-zoom>
</wc-demo>
<h3 id="disabling-interaction">Disabling Interaction</h3>
<p>The <code>disabled</code> attribute disables zoom interaction. Not super sure if this is useful, but the feature's there just in case.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">img-zoom</span> <span class="hljs-attr">disabled</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;fruit.png&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">img-zoom</span>&gt;</span>
</code></pre>
<h2 id="customization">Customization</h2>
<p>Since it's Just HTML<sup>TM</sup>, you can use good ol' CSS.</p>
<pre><code class="language-css"><span class="hljs-selector-tag">img</span>-zoom {
	<span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0.5em</span> <span class="hljs-number">0.5em</span> <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">0.33</span>);
}
</code></pre>
<h2 id="accessibility">Accessibility</h2>
<p>This custom element is built with accessibility in mind! It treats the zoomed image like a <a href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/">dialog</a>.</p>
<ul>
<li>Keyboard operation
<ul>
<li>When the image has focus, <kbd>Enter</kbd> will open the zoomed image.</li>
<li>When opened, focus is automatically placed on a Close button that will close the zoomed image.</li>
<li><kbd>Escape</kbd> will also exit the zoomed image.</li>
</ul>
</li>
<li>Tab trapping: While zoomed, the tabbing order will remain within the image until dismissed.</li>
<li>Reduced Motion: The animation is simplified for people who prefer reduced motion.</li>
</ul>
`,T=""+new URL("../assets/fruit.Ipb7VTQf.webp",import.meta.url).href;function $(l){let s,n,t;return n=new y({props:{html:v,assets:[{replace:"./fruit.png",with:k},{replace:"./fruit.webp",with:T}]}}),{c(){s=m("div"),g(n.$$.fragment),this.h()},l(a){s=u(a,"DIV",{class:!0});var e=d(s);j(n.$$.fragment,e),e.forEach(p),this.h()},h(){f(s,"class","img-contained svelte-w5efvt")},m(a,e){b(a,s,e),w(n,s,null),t=!0},p:c,i(a){t||(q(n.$$.fragment,a),t=!0)},o(a){z(n.$$.fragment,a),t=!1},d(a){a&&p(s),_(n)}}}function A(l){return o(()=>import("../chunks/define.lqPXTXtE.js"),[],import.meta.url),[]}class M extends r{constructor(s){super(),h(this,s,A,$,i,{})}}export{M as component};
