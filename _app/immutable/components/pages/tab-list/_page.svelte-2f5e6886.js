import{_ as o}from"../../../chunks/preload-helper-aa6bc0ce.js";import{S as r,i as b,s as h,a as d,k as u,I as m,h as t,c as g,l as j,m as f,b as i,A as l}from"../../../chunks/index-9cce3746.js";const y=`<h1>The tab-list Elements</h1>
<p hidden><strong><a href="https://auroratide.github.io/web-components/tab-list">View this page with live demos!</a></strong></p>
<p>The <code>tab-list</code>, <code>tab-item</code>, and <code>tab-panel</code> elements together represent content that is presented one panel at a time. They are built with accessibility in mind and implement the WAI-ARIA guidelines for <a href="https://w3c.github.io/aria-practices/#tabpanel">tabs</a>.</p>
<ul>
<li>A <code>tab-list</code> represents a set of tabs, where only one tab's contents may be presented at a time.</li>
<li>A <code>tab-item</code> represents a reference of a single panel of information in a tab list.</li>
<li>A <code>tab-panel</code> represents a panel of information.</li>
</ul>
<wc-demo>
    <tab-list aria-label="Learn about fruits">
        <tab-item for="example-1-tab-1" selected>Apples</tab-item>
        <tab-item for="example-1-tab-2">Oranges</tab-item>
        <tab-item for="example-1-tab-3">Bananas</tab-item>
    </tab-list>
    <tab-panel id="example-1-tab-1">
        <p>Apples are usually red, but sometimes they can be green.</p>
    </tab-panel>
    <tab-panel id="example-1-tab-2">
        <p>Oranges are, well, orange!</p>
    </tab-panel>
    <tab-panel id="example-1-tab-3">
        <p>Bananas are yellow and usually curved.</p>
    </tab-panel>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">tab-list</span> <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Learn about fruits&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab-item</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;example-1-tab-1&quot;</span> <span class="hljs-attr">selected</span>&gt;</span>Apples<span class="hljs-tag">&lt;/<span class="hljs-name">tab-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab-item</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;example-1-tab-2&quot;</span>&gt;</span>Oranges<span class="hljs-tag">&lt;/<span class="hljs-name">tab-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab-item</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;example-1-tab-3&quot;</span>&gt;</span>Bananas<span class="hljs-tag">&lt;/<span class="hljs-name">tab-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tab-list</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tab-panel</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;example-1-tab-1&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Apples are usually red, but sometimes they can be green.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tab-panel</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tab-panel</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;example-1-tab-2&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Oranges are, well, orange!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tab-panel</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tab-panel</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;example-1-tab-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Bananas are yellow and usually curved.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tab-panel</span>&gt;</span>
</code></pre>
<h2>Installation</h2>
<p>You can import through CDN:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;module&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/@auroratide/tab-list/lib/define.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>Or, you may install through <a href="https://www.npmjs.com/package/@auroratide/tab-list">NPM</a> and include it as part of your build process:</p>
<pre><code>$ npm i @auroratide/tab-list
</code></pre>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@auroratide/tab-list/lib/define.js&#x27;</span>
</code></pre>
<h2>Usage</h2>
<p><code>tab-list</code>, <code>tab-item</code>, and <code>tab-panel</code> are <strong>markup elements</strong> that you can use in your HTML document. To use them together, it is best to follow these guidelines:</p>
<ul>
<li><code>tab-item</code> elements <strong>must</strong> be contained within a <code>tab-list</code>. They need not be <em>direct</em> descendents.</li>
<li><code>tab-panel</code> must define a unique <code>id</code>.</li>
<li><code>tab-item</code> must define the <code>for</code> attribute, whose value is the <code>id</code> of its corresponding <code>tab-panel</code>.</li>
</ul>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">tab-list</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- tab-item must be in a tab-list, and defines \`for\` to be
         the corresponding tab-panel id --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab-item</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;tab-panel-id&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tab-list</span>&gt;</span>
<span class="hljs-comment">&lt;!-- tab-panel defines an id --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tab-panel</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;tab-panel-id&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Any content you want<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tab-panel</span>&gt;</span>
</code></pre>
<p>The following are good accessibility practices:</p>
<ul>
<li><code>tab-list</code> should be labelled with a name representing the collection of tabs, either with <code>aria-label</code> or <code>aria-labelledby</code>.</li>
<li><code>tab-panel</code> elements can theoretically be anywhere on the page, though it's best if they are the next focusable item after the <code>tab-list</code>.</li>
</ul>
<h3>Vertical Tab List</h3>
<p>By default, tabs are listed horizontally, and they can be navigated with the <kbd>left</kbd> and <kbd>right</kbd> arrow keys.</p>
<p>By setting the <code>orientation</code> attribute to <code>&quot;vertical&quot;</code>, you can make a vertical tab list. This makes it navigable with the <kbd>up</kbd> and <kbd>down</kbd> arrow keys instead.</p>
<wc-demo>
    <tab-list orientation="vertical" aria-label="Learn about vegetables">
        <tab-item for="example-2-tab-1" selected>Tomatoes</tab-item>
        <tab-item for="example-2-tab-2">Carrots</tab-item>
        <tab-item for="example-2-tab-3">Squashes</tab-item>
    </tab-list>
    <tab-panel id="example-2-tab-1">
        <p>Tomatoes are red. People like to tell you they are fruit and not vegetables.</p>
    </tab-panel>
    <tab-panel id="example-2-tab-2">
        <p>Carrots are orange, and also a root.</p>
    </tab-panel>
    <tab-panel id="example-2-tab-3">
        <p>Some squashes are yellow, and they come in all shapes and sizes.</p>
    </tab-panel>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">tab-list</span> <span class="hljs-attr">orientation</span>=<span class="hljs-string">&quot;vertical&quot;</span> <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Learn about vegetables&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab-item</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;example-2-tab-1&quot;</span> <span class="hljs-attr">selected</span>&gt;</span>Tomatoes<span class="hljs-tag">&lt;/<span class="hljs-name">tab-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab-item</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;example-2-tab-2&quot;</span>&gt;</span>Carrots<span class="hljs-tag">&lt;/<span class="hljs-name">tab-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab-item</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;example-2-tab-3&quot;</span>&gt;</span>Squashes<span class="hljs-tag">&lt;/<span class="hljs-name">tab-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tab-list</span>&gt;</span>
</code></pre>
<h3>Setting a selected tab</h3>
<p>You can set the <code>selected</code> attribute on one <code>tab-item</code> in a <code>tab-list</code>. This will mark that item as selected and show its panel.</p>
<wc-demo>
    <tab-list aria-label="Learn about fruits">
        <tab-item for="example-3-tab-1">Apples</tab-item>
        <tab-item for="example-3-tab-2">Oranges</tab-item>
        <tab-item for="example-3-tab-3" selected>Bananas</tab-item>
    </tab-list>
    <tab-panel id="example-3-tab-1">
        <p>Apples are usually red, but sometimes they can be green.</p>
    </tab-panel>
    <tab-panel id="example-3-tab-2">
        <p>Oranges are, well, orange!</p>
    </tab-panel>
    <tab-panel id="example-3-tab-3">
        <p>Bananas are yellow and usually curved.</p>
    </tab-panel>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">tab-item</span> <span class="hljs-attr">selected</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;example-3-tab-3&quot;</span>&gt;</span>Bananas<span class="hljs-tag">&lt;/<span class="hljs-name">tab-item</span>&gt;</span>
</code></pre>
<p><strong>Note</strong>: Only one <code>tab-item</code> can be selected at a time! If you attempt to set multiple as selected, only the first selected tabl's panel will be shown.</p>
<h3>All Attributes</h3>
<p>For <code>tab-list</code>:</p>
<table>
<thead>
<tr>
<th>Attribute</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>orientation</code></td>
<td>Either <code>&quot;horizontal&quot;</code> or <code>&quot;vertical&quot;</code>. Represents whether the tab list should be presented horizontally or vertically, and affects whether they are navigated with the <kbd>left</kbd>/<kbd>right</kbd> or <kbd>up</kbd>/<kbd>down</kbd> keys respectively. <code>&quot;horizontal&quot;</code> by default.</td>
</tr>
</tbody>
</table>
<p>For <code>tab-item</code>:</p>
<table>
<thead>
<tr>
<th>Attribute</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>for</code></td>
<td><strong>Required.</strong> Should be the same as the <code>id</code> of the tab's respective panel.</td>
</tr>
<tr>
<td><code>selected</code></td>
<td>Either present or not. Represents whether this tab's panel should be shown.</td>
</tr>
</tbody>
</table>
<h2>CSS Customization</h2>
<p>Since these are native custom elements, they can be styled the same way as regular HTML elements.</p>
<p>Of note:</p>
<ul>
<li><code>tab-item[selected]</code> will style the currently selected tab.</li>
<li><code>tab-list[orientation=&quot;vertical&quot;]</code> can style vertical tab lists.</li>
<li><code>tab-panel[hidden]</code> styles hidden tabs, in case you want transitions.</li>
</ul>
<p>Here's an example of a fully customized tab list:</p>
<wc-demo id="fancy">
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
                    <li>\xBD cup butter</li>
                    <li>3 tablespoons flour</li>
                    <li>\xBD cup white sugar</li>
                    <li>\xBD cup brown sugar</li>
                    <li>\xBC water</li>
                    <li>A double-crust pie pastry</li>
                </ul>
            </tab-panel>
            <tab-panel id="example-4-tab-2">
                <p>Ingredients for making orange sorbet:</p>
                <ul>
                    <li>2 cups orange juice pulp</li>
                    <li>1\xBD cup almond milk</li>
                    <li>1 tablespoon orange zest</li>
                    <li>1 tablespoon lemon juice</li>
                    <li>\xBC teaspoon salt</li>
                    <li>1 teaspoon vanilla extract</li>
                    <li>\xBD teaspoon sweetener</li>
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
    #fancy .tab-container {
        box-shadow: 0 2px 4px hsla(0, 0%, 0%, 0.25);
    }
    #fancy tab-list {
        background: hsl(210, 68%, 45%);
        gap: 0;
    }
    #fancy tab-item {
        border: none;
        border-radius: 0;
        background: hsl(210, 68%, 45%);
        color: hsl(0, 0%, 100%);
        padding: 12px 24px;
        border-right: 2px solid hsl(210, 82%, 25%);
    }
    #fancy tab-item:hover:not([selected]),
    #fancy tab-item:focus:not([selected]) {
        background: hsl(210, 82%, 25%);
    }
    #fancy tab-item[selected] {
        background: hsl(0, 0%, 100%);
        border-color: transparent;
        color: hsl(0, 0%, 0%);
    }
    #fancy .tab-panels-container { display: grid; }
    #fancy tab-panel {
        grid-area: 1 / 1;
        border: none;
        padding: 12px 24px 24px;
        opacity: 1;
        transition: opacity 0.2s ease-in-out;
        background: hsl(0, 0%, 100%);
    }
    #fancy tab-panel[hidden] {
        display: block;
        opacity: 0;
    }
    #fancy tab-panel *:last-child {
        margin: 0;
    }
</style>
<pre><code class="language-css"><span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.tab-container</span> {
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">2px</span> <span class="hljs-number">4px</span> <span class="hljs-built_in">hsla</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0%</span>, <span class="hljs-number">0%</span>, <span class="hljs-number">0.25</span>);
}

tab-list {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">hsl</span>(<span class="hljs-number">210</span>, <span class="hljs-number">68%</span>, <span class="hljs-number">45%</span>);
    <span class="hljs-attribute">gap</span>: <span class="hljs-number">0</span>;
}

tab-item {
    <span class="hljs-attribute">border</span>: none;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">hsl</span>(<span class="hljs-number">210</span>, <span class="hljs-number">68%</span>, <span class="hljs-number">45%</span>);
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">hsl</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0%</span>, <span class="hljs-number">100%</span>);
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">12px</span> <span class="hljs-number">24px</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">2px</span> solid <span class="hljs-built_in">hsl</span>(<span class="hljs-number">210</span>, <span class="hljs-number">82%</span>, <span class="hljs-number">25%</span>);
}

tab-item<span class="hljs-selector-pseudo">:hover</span><span class="hljs-selector-pseudo">:not</span>(<span class="hljs-selector-attr">[selected]</span>),
tab-item<span class="hljs-selector-pseudo">:focus</span><span class="hljs-selector-pseudo">:not</span>(<span class="hljs-selector-attr">[selected]</span>) {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">hsl</span>(<span class="hljs-number">210</span>, <span class="hljs-number">82%</span>, <span class="hljs-number">25%</span>);
}

tab-item<span class="hljs-selector-attr">[selected]</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">hsl</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0%</span>, <span class="hljs-number">100%</span>);
    <span class="hljs-attribute">border-color</span>: transparent;
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">hsl</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0%</span>, <span class="hljs-number">0%</span>);
}

<span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.tab-panels-container</span> { <span class="hljs-attribute">display</span>: grid; }
tab-panel {
    <span class="hljs-attribute">grid-area</span>: <span class="hljs-number">1</span> / <span class="hljs-number">1</span>;
    <span class="hljs-attribute">border</span>: none;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">12px</span> <span class="hljs-number">24px</span> <span class="hljs-number">24px</span>;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">transition</span>: opacity <span class="hljs-number">0.2s</span> ease-in-out;
}

tab-panel<span class="hljs-selector-attr">[hidden]</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}
</code></pre>
<h2>Accessibility</h2>
<p>This custom element is built with accessibility in mind! It follows the WAI-ARIA guidelines for <a href="https://w3c.github.io/aria-practices/#tabpanel">tabs</a> (the <code>tablist</code>, <code>tab</code>, and <code>tabpanel</code> roles).</p>
<ul>
<li>When focus enters the tab list, the currently active tab item is focused.</li>
<li><kbd>Left</kbd> and <kbd>Right</kbd> can be used to navigate the tabs.</li>
<li><kbd>Enter</kbd> or <kbd>Space</kbd> select the currently focused tab.</li>
</ul>
<h2>Not (yet) Implemented</h2>
<p>The following features are desired of tab lists, but are not yet implemented:</p>
<ul>
<li>Auto-opening a panel when its corresponding tab receives focus.</li>
<li>Native support for removable tabs.</li>
<li>Tabs that open popup menus.</li>
</ul>
`;function w(p){let s,n;return{c(){s=d(),n=u("article"),this.h()},l(a){m('[data-svelte="svelte-vr2uw0"]',document.head).forEach(t),s=g(a),n=j(a,"ARTICLE",{});var c=f(n);c.forEach(t),this.h()},h(){document.title="The tab-list Element"},m(a,e){i(a,s,e),i(a,n,e),n.innerHTML=y},p:l,i:l,o:l,d(a){a&&t(s),a&&t(n)}}}function x(p){return o(()=>import("../../../chunks/define-db7340a9.js"),[],import.meta.url),[]}class v extends r{constructor(s){super(),b(this,s,x,w,h,{})}}export{v as default};
