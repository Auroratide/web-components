var y=Object.defineProperty;var k=(s,e,t)=>e in s?y(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var r=(s,e,t)=>(k(s,typeof e!="symbol"?e+"":e,t),t),C=(s,e,t)=>{if(!e.has(s))throw TypeError("Cannot "+t)};var a=(s,e,t)=>(C(s,e,"read from private field"),t?t.call(s):e.get(s)),d=(s,e,t)=>{if(e.has(s))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(s):e.set(s,t)};var u,m,p;class l extends HTMLElement{constructor(){super();d(this,u,()=>{this.selected=!0});d(this,m,t=>{(t.key==="Enter"||t.key===" ")&&(this.selected=!0)});d(this,p,()=>{var o;const t=(o=this.shadowRoot)!=null?o:this.attachShadow({mode:"open"}),i=document.createElement("style");i.innerHTML=this.constructor.css;const n=document.createElement("template");return n.innerHTML=this.constructor.html,t.appendChild(i),t.appendChild(n.content),t});a(this,p).call(this)}static get observedAttributes(){return["for","selected"]}get for(){return this.getAttribute("for")}set for(t){this.setAttribute("for",t)}get panel(){return document.querySelector(`#${this.for}`)}get list(){return this.closest("tab-list")}get selected(){return this.hasAttribute("selected")}set selected(t){this.toggleAttribute("selected",t)}connectedCallback(){this.setAttribute("role","tab"),this.addEventListener("click",a(this,u)),this.addEventListener("keyup",a(this,m))}attributeChangedCallback(t){this.setAttribute("aria-controls",this.for),this.setAttribute("aria-selected",this.selected.toString()),this.setAttribute("tabindex",this.selected?"0":"-1"),t==="selected"&&this.list.updateSelected(this.selected?this:void 0)}}u=new WeakMap,m=new WeakMap,p=new WeakMap,r(l,"defaultElementName","tab-item"),r(l,"html",`
        <slot></slot>
    `),r(l,"css",`
        :host {
            border: 1px solid black;
            border-bottom: 0;
            border-radius: 4px 4px 0 0;
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
    `);var b;class c extends HTMLElement{constructor(){super();d(this,b,()=>{var o;const t=(o=this.shadowRoot)!=null?o:this.attachShadow({mode:"open"}),i=document.createElement("style");i.innerHTML=this.constructor.css;const n=document.createElement("template");return n.innerHTML=this.constructor.html,t.appendChild(i),t.appendChild(n.content),t});a(this,b).call(this)}static get observedAttributes(){return[]}connectedCallback(){this.setAttribute("role","tabpanel"),this.setAttribute("tabindex","0")}}b=new WeakMap,r(c,"defaultElementName","tab-panel"),r(c,"html",`
        <slot></slot>
    `),r(c,"css",`
        :host {
            border: 1px solid black;
            padding: 4px;
        }

        :host(:not([hidden])) {
            display: block;
        }
    `);var f,g,w;class h extends HTMLElement{constructor(){super();r(this,"tabs",()=>Array.from(this.querySelectorAll(l.defaultElementName)));r(this,"panels",()=>this.tabs().map(t=>t.panel));r(this,"selected",()=>this.tabs().find(t=>t.hasAttribute("selected")));r(this,"updateSelected",t=>{t=t!=null?t:this.selected(),this.tabs().forEach(i=>{i!==t&&i.removeAttribute("selected")}),this.panels().forEach(i=>{i!==void 0&&(i.hidden=!0)}),(t==null?void 0:t.panel)!==void 0&&(t.panel.hidden=!1)});d(this,f,t=>{const i=a(this,g).call(this);if(i.includes(t.key)){const n=this.tabs(),o=n.find(x=>x.getAttribute("tabindex")==="0"),E=n.indexOf(o);o.setAttribute("tabindex","-1");const A=((E+(t.key===i[0]?-1:1))%n.length+n.length)%n.length;n[A].setAttribute("tabindex","0"),n[A].focus()}});d(this,g,()=>this.orientation==="vertical"?["ArrowUp","ArrowDown"]:["ArrowLeft","ArrowRight"]);d(this,w,()=>{var o;const t=(o=this.shadowRoot)!=null?o:this.attachShadow({mode:"open"}),i=document.createElement("style");i.innerHTML=this.constructor.css;const n=document.createElement("template");return n.innerHTML=this.constructor.html,t.appendChild(i),t.appendChild(n.content),t});a(this,w).call(this)}static get observedAttributes(){return["orientation"]}get orientation(){var t;return(t=this.getAttribute("orientation"))!=null?t:"horizontal"}set orientation(t){return this.setAttribute("orientation",t)}connectedCallback(){this.setAttribute("role","tablist"),this.addEventListener("keydown",a(this,f)),window.customElements.whenDefined(l.defaultElementName).then(()=>{this.updateSelected()})}attributeChangedCallback(t){this.orientation==="vertical"?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation")}}f=new WeakMap,g=new WeakMap,w=new WeakMap,r(h,"defaultElementName","tab-list"),r(h,"html",`
        <slot></slot>
    `),r(h,"css",`
        :host {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            padding: 0 4px;
        }
    `);window.customElements.get(h.defaultElementName)||window.customElements.define(h.defaultElementName,h);window.customElements.get(l.defaultElementName)||window.customElements.define(l.defaultElementName,l);window.customElements.get(c.defaultElementName)||window.customElements.define(c.defaultElementName,c);
