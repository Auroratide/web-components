import{_ as r}from"../chunks/preload-helper.BQ24v_F8.js";import{s as h,n as m}from"../chunks/scheduler.Ce_0Mfso.js";import{S as g,i as u,s as d,e as j,m as f,l as b,d as l,h as w,c as q,a as z,n as _,w as y,f as c,o as v,p as T,q as k,r as $}from"../chunks/index.QmGHi4hh.js";import{R as A}from"../chunks/Readme.BbztUA8r.js";const I=`<h1 id="the-img-zoom-element">The img-zoom Element</h1>
<p hidden><strong><a href="https://auroratide.github.io/web-components/img-zoom">View this page with live demos!</a></strong></p>
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
`,x=""+new URL("../assets/fruit.DBcY37oa.png",import.meta.url).href,E=""+new URL("../assets/fruit.Ipb7VTQf.webp",import.meta.url).href;function R(o){let t,a,n,e;return n=new A({props:{html:I,assets:[{replace:"./fruit.png",with:x},{replace:"./fruit.webp",with:E}]}}),{c(){t=d(),a=j("div"),f(n.$$.fragment),this.h()},l(s){b("svelte-1lg55k8",document.head).forEach(l),t=w(s),a=q(s,"DIV",{class:!0});var i=z(a);_(n.$$.fragment,i),i.forEach(l),this.h()},h(){document.title="The img-zoom Element",y(a,"class","img-contained svelte-w5efvt")},m(s,p){c(s,t,p),c(s,a,p),v(n,a,null),e=!0},p:m,i(s){e||(T(n.$$.fragment,s),e=!0)},o(s){k(n.$$.fragment,s),e=!1},d(s){s&&(l(t),l(a)),$(n)}}}function C(o){return r(()=>import("../chunks/define.DBI_rsMm.js"),__vite__mapDeps([]),import.meta.url),[]}class U extends g{constructor(t){super(),u(this,t,C,R,h,{})}}export{U as component};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
