var k=Object.defineProperty;var v=(n,e,t)=>e in n?k(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var r=(n,e,t)=>(v(n,typeof e!="symbol"?e+"":e,t),t),x=(n,e,t)=>{if(!e.has(n))throw TypeError("Cannot "+t)};var a=(n,e,t)=>(x(n,e,"read from private field"),t?t.call(n):e.get(n)),d=(n,e,t)=>{if(e.has(n))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(n):e.set(n,t)};const C="tab-list:change",N=(n,e)=>new CustomEvent(C,{detail:{from:n,to:e}});var u,m,b;class l extends HTMLElement{constructor(){super();d(this,u,()=>{this.selected=!0});d(this,m,t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.selected=!0)});d(this,b,()=>{var o;const t=(o=this.shadowRoot)!=null?o:this.attachShadow({mode:"open"}),i=document.createElement("style");i.innerHTML=this.constructor.css;const s=document.createElement("template");return s.innerHTML=this.constructor.html,t.appendChild(i),t.appendChild(s.content),t});a(this,b).call(this)}static get observedAttributes(){return["for","selected"]}get for(){return this.getAttribute("for")}set for(t){this.setAttribute("for",t)}get panel(){return document.querySelector(`#${this.for}`)}get list(){return this.closest("tab-list")}get selected(){return this.hasAttribute("selected")}set selected(t){this.toggleAttribute("selected",t)}connectedCallback(){this.setAttribute("role","tab"),this.addEventListener("click",a(this,u)),this.addEventListener("keydown",a(this,m))}attributeChangedCallback(t){this.setAttribute("aria-controls",this.for),this.setAttribute("aria-selected",this.selected.toString()),this.setAttribute("tabindex",this.selected?"0":"-1"),t==="selected"&&this.list.updateSelected(this.selected?this:void 0)}}u=new WeakMap,m=new WeakMap,b=new WeakMap,r(l,"defaultElementName","tab-item"),r(l,"html",`
        <slot></slot>
    `),r(l,"css",`
        :host {
            border: 1px solid black;
            border-bottom: 0;
            padding: 1px 4px;
            cursor: pointer;
        }

        :host([selected]) {
            background-color: yellow;
        }

        :host(:hover),
        :host(:focus) {
            background-color: lightgray;
        }
    `);var f,p,w;class c extends HTMLElement{constructor(){super();r(this,"tabs",()=>Array.from(this.querySelectorAll(l.defaultElementName)));r(this,"panels",()=>this.tabs().map(t=>t.panel));r(this,"selected",()=>this.tabs().find(t=>t.hasAttribute("selected")));r(this,"updateSelected",t=>{const i=this.selected();t=t!=null?t:i,this.tabs().forEach(s=>{s!==t&&s.removeAttribute("selected")}),this.panels().forEach(s=>{s!==void 0&&(s.hidden=!0)}),(t==null?void 0:t.panel)!==void 0&&(t.panel.hidden=!1),t!==i&&this.dispatchEvent(N(i,t))});d(this,f,t=>{const i=a(this,p).call(this);if(i.includes(t.key)){t.preventDefault();const s=this.tabs(),o=s.find(y=>y.getAttribute("tabindex")==="0"),A=s.indexOf(o);o.setAttribute("tabindex","-1");const E=((A+(t.key===i[0]?-1:1))%s.length+s.length)%s.length;s[E].setAttribute("tabindex","0"),s[E].focus()}});d(this,p,()=>this.orientation==="vertical"?["ArrowUp","ArrowDown"]:["ArrowLeft","ArrowRight"]);d(this,w,()=>{var o;const t=(o=this.shadowRoot)!=null?o:this.attachShadow({mode:"open"}),i=document.createElement("style");i.innerHTML=this.constructor.css;const s=document.createElement("template");return s.innerHTML=this.constructor.html,t.appendChild(i),t.appendChild(s.content),t});a(this,w).call(this)}static get observedAttributes(){return["orientation"]}get orientation(){var t;return(t=this.getAttribute("orientation"))!=null?t:"horizontal"}set orientation(t){return this.setAttribute("orientation",t)}connectedCallback(){this.setAttribute("role","tablist"),this.addEventListener("keydown",a(this,f)),window.customElements.whenDefined(l.defaultElementName).then(()=>{this.updateSelected()})}attributeChangedCallback(){this.orientation==="vertical"?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation")}}f=new WeakMap,p=new WeakMap,w=new WeakMap,r(c,"defaultElementName","tab-list"),r(c,"html",`
        <slot></slot>
    `),r(c,"css",`
        :host {
            display: flex;
            flex-wrap: wrap;
        }

        :host([orientation="vertical"]) {
            flex-direction: column;
            width: 50%;
        }
    `);var g;class h extends HTMLElement{constructor(){super();d(this,g,()=>{var o;const t=(o=this.shadowRoot)!=null?o:this.attachShadow({mode:"open"}),i=document.createElement("style");i.innerHTML=this.constructor.css;const s=document.createElement("template");return s.innerHTML=this.constructor.html,t.appendChild(i),t.appendChild(s.content),t});a(this,g).call(this)}static get observedAttributes(){return[]}connectedCallback(){this.setAttribute("role","tabpanel"),this.setAttribute("tabindex","0")}}g=new WeakMap,r(h,"defaultElementName","tab-panel"),r(h,"html",`
        <slot></slot>
    `),r(h,"css",`
        :host {
            border: 1px solid black;
            padding: 4px;
        }

        :host(:not([hidden])) {
            display: block;
        }
    `);window.customElements.get(c.defaultElementName)||window.customElements.define(c.defaultElementName,c);window.customElements.get(l.defaultElementName)||window.customElements.define(l.defaultElementName,l);window.customElements.get(h.defaultElementName)||window.customElements.define(h.defaultElementName,h);
