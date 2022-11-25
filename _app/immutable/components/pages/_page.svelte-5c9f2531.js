import{_ as l}from"../../chunks/preload-helper-b21cceae.js";import{S as c,i as h,s as g,a as m,k as d,J as b,h as t,c as u,l as j,m as w,b as i,B as p}from"../../chunks/index-4befff42.js";const f=`<h1>Web Components by Auroratide</h1>
<p hidden><strong><a href="https://auroratide.github.io/web-components/">View this page with live demos!</a></strong></p>
<p>This is just a bunch of highly reusable, fully accessible <strong><a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">web components</a></strong> you can use on your websites! Why web components?</p>
<ul>
<li>It's part of the <a href="https://html.spec.whatwg.org/#custom-elements">HTML Standard</a>, so they work in <a href="https://custom-elements-everywhere.com/">every web framework</a>, or with no framework at all.</li>
<li>They are <a href="https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/">fast and small</a> compared to components in frameworks, since there's zero library overhead.</li>
<li>They facilitate <a href="https://kryogenix.org/code/browser/everyonehasjs.html">progressive enhancement</a>: viewers get a basic view of content before the Javascript makes it functional.</li>
</ul>
<p>...And many more reasons! Wanna learn more? Join the <a href="https://community.webcomponents.dev/">Web Component Community</a>!</p>
<p><small>Made by <a href="https://auroratide.com">Auroratide</a>, a developer with a passion for the web, inclusive design, and storytelling \u2764\uFE0F</small></p>
<h2>The reorder-list Element</h2>
<p><strong>View</strong>: <a href="https://auroratide.github.io/web-components/reorder-list">The reorder-list Element</a></p>
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
        background: #ddd;
        border-radius: 0.5em;
        width: min(400px, 100%);
        padding: 0.5em;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
    #reorder-list reorder-item {
        background: #fff;
        border-radius: 0.25em;
        padding: 0.5em;
        box-shadow: 0 0.1em 0.15em #0002;
    }
    #reorder-list ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
        padding: 0;
        margin: 0;
        font-size: 90%;
        color: #2573C1;
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
<h2>The tab-list Element</h2>
<p><strong>View</strong>: <a href="https://auroratide.github.io/web-components/tab-list">The tab-list Element</a></p>
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
    #tab-list .tab-container {
        box-shadow: 0 2px 4px hsla(0, 0%, 0%, 0.25);
    }
    #tab-list tab-list {
        background: hsl(210, 68%, 45%);
        gap: 0;
    }
    #tab-list tab-item {
        border: none;
        border-radius: 0;
        background: hsl(210, 68%, 45%);
        color: hsl(0, 0%, 100%);
        padding: 12px 24px;
        border-right: 2px solid hsl(210, 82%, 25%);
    }
    #tab-list tab-item:hover:not([selected]),
    #tab-list tab-item:focus:not([selected]) {
        background: hsl(210, 82%, 25%);
    }
    #tab-list tab-item[selected] {
        background: hsl(0, 0%, 100%);
        border-color: transparent;
        color: hsl(0, 0%, 0%);
    }
    #tab-list .tab-panels-container { display: grid; }
    #tab-list tab-panel {
        grid-area: 1 / 1;
        border: none;
        padding: 12px 24px 24px;
        opacity: 1;
        transition: opacity 0.2s ease-in-out;
        background: hsl(0, 0%, 100%);
    }
    #tab-list tab-panel[hidden] {
        display: block;
        opacity: 0;
    }
    #tab-list tab-panel *:last-child {
        margin: 0;
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
<h2>The toggle-switch Element</h2>
<p><strong>View</strong>: <a href="https://auroratide.github.io/web-components/toggle-switch">The toggle-switch Element</a></p>
<p>A form control representing something is on or off.</p>
<wc-demo>
    <label for="toggle-switch">Fancy Switch</label>
    <toggle-switch id="toggle-switch"></toggle-switch>
    <style>
        #toggle-switch {
            height: 1em;
            vertical-align: middle;
        }
        #toggle-switch::part(track) {
            height: 0.75em;
            border-radius: 1em;
            background-color: hsl(0, 0%, 67%);
            margin: 0.125em 0;
        }
        #toggle-switch::part(slider) {
            width: 1em;
            height: 1em;
            border-radius: 50%;
            background-color: hsl(0, 0%, 100%);
            box-shadow: 0.0625em 0.0625em 0.125em hsla(0, 0%, 0%, 0.25);
            margin: -0.125em 0;
        }
        #toggle-switch[checked]::part(track) {
            background-color: hsl(211, 69%, 57%);
        }
    </style>
</wc-demo>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;toggle-switch&quot;</span>&gt;</span>Fancy Switch<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">toggle-switch</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;toggle-switch&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">toggle-switch</span>&gt;</span>
</code></pre>
`;function y(r){let a,n;return{c(){a=m(),n=d("article"),this.h()},l(s){b("svelte-ueg07q",document.head).forEach(t),a=u(s),n=j(s,"ARTICLE",{});var o=w(n);o.forEach(t),this.h()},h(){document.title="Web Components by Auroratide"},m(s,e){i(s,a,e),i(s,n,e),n.innerHTML=f},p,i:p,o:p,d(s){s&&t(a),s&&t(n)}}}function k(r){return l(()=>import("../../chunks/define-a3c3ba96.js"),[],import.meta.url),l(()=>import("../../chunks/define-151efada.js"),[],import.meta.url),l(()=>import("../../chunks/define-c522fdf3.js"),["../../chunks/define-c522fdf3.js","../../chunks/events-19830ba9.js"],import.meta.url),[]}class x extends c{constructor(a){super(),h(this,a,k,y,g,{})}}export{x as default};
