var k=Object.defineProperty;var x=(n,i,t)=>i in n?k(n,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[i]=t;var r=(n,i,t)=>(x(n,typeof i!="symbol"?i+"":i,t),t),C=(n,i,t)=>{if(!i.has(n))throw TypeError("Cannot "+t)};var o=(n,i,t)=>(C(n,i,"read from private field"),t?t.call(n):i.get(n)),a=(n,i,t)=>{if(i.has(n))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(n):i.set(n,t)};const N="tab-list:change",H=(n,i)=>new CustomEvent(N,{detail:{from:n,to:i}});var m,f,p;class c extends HTMLElement{constructor(){super();a(this,m,()=>{this.selected=!0});a(this,f,t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.selected=!0)});a(this,p,()=>{var d;const t=(d=this.shadowRoot)!=null?d:this.attachShadow({mode:"open"}),s=document.createElement("style");s.innerHTML=this.constructor.css;const e=document.createElement("template");return e.innerHTML=this.constructor.html,t.appendChild(s),t.appendChild(e.content),t});o(this,p).call(this)}static get observedAttributes(){return["for","selected"]}get for(){return this.getAttribute("for")}set for(t){this.setAttribute("for",t)}get panel(){return document.querySelector(`#${this.for}`)}get list(){return this.closest("tab-list")}get selected(){return this.hasAttribute("selected")}set selected(t){this.toggleAttribute("selected",t)}connectedCallback(){this.setAttribute("role","tab"),this.addEventListener("click",o(this,m)),this.addEventListener("keydown",o(this,f))}attributeChangedCallback(t){this.setAttribute("aria-controls",this.for),this.setAttribute("aria-selected",this.selected.toString()),this.setAttribute("tabindex",this.selected?"0":"-1"),t==="selected"&&this.list.updateSelected(this.selected?this:void 0)}}m=new WeakMap,f=new WeakMap,p=new WeakMap,r(c,"defaultElementName","tab-item"),r(c,"html",`
        <slot></slot>
    `),r(c,"css",`
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
    `);var b,w,E,A,g,y;class l extends HTMLElement{constructor(){super();r(this,"tabs",()=>Array.from(this.querySelectorAll(c.defaultElementName)));r(this,"panels",()=>this.tabs().map(t=>t.panel));r(this,"selected",()=>this.tabs().find(t=>t.hasAttribute("selected")));r(this,"updateSelected",t=>{const s=this.tabs().find(e=>e.hasAttribute("selected")&&e!==t);t=t!=null?t:s,this.tabs().forEach(e=>{e!==t&&e.removeAttribute("selected")}),this.panels().forEach(e=>{e!==void 0&&(e.hidden=!0)}),(t==null?void 0:t.panel)!==void 0&&(t.panel.hidden=!1),t!==s&&this.dispatchEvent(H(s,t))});a(this,b,t=>{const s=o(this,w).call(this);if(s.includes(t.key)){t.preventDefault();const e=this.tabs(),{index:d}=o(this,E).call(this,e);let u=0;t.key==="Home"?u=0:t.key==="End"?u=e.length-1:u=o(this,g).call(this,d+(t.key===s[0]?-1:1),e.length),o(this,A).call(this,e[u])}});a(this,w,()=>[...this.orientation==="vertical"?["ArrowUp","ArrowDown"]:["ArrowLeft","ArrowRight"],"Home","End"]);a(this,E,t=>{if(t.includes(document.activeElement)){const s=document.activeElement,e=t.indexOf(s);return s.setAttribute("tabindex","-1"),{tab:s,index:e}}});a(this,A,t=>{t==null||t.setAttribute("tabindex","0"),t==null||t.focus()});a(this,g,(t,s)=>(t%s+s)%s);a(this,y,()=>{var d;const t=(d=this.shadowRoot)!=null?d:this.attachShadow({mode:"open"}),s=document.createElement("style");s.innerHTML=this.constructor.css;const e=document.createElement("template");return e.innerHTML=this.constructor.html,t.appendChild(s),t.appendChild(e.content),t});o(this,y).call(this)}static get observedAttributes(){return["orientation"]}get orientation(){var t;return(t=this.getAttribute("orientation"))!=null?t:"horizontal"}set orientation(t){return this.setAttribute("orientation",t)}connectedCallback(){this.setAttribute("role","tablist"),this.addEventListener("keydown",o(this,b)),window.customElements.whenDefined(c.defaultElementName).then(()=>{this.updateSelected()})}attributeChangedCallback(){this.orientation==="vertical"?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation")}}b=new WeakMap,w=new WeakMap,E=new WeakMap,A=new WeakMap,g=new WeakMap,y=new WeakMap,r(l,"defaultElementName","tab-list"),r(l,"html",`
        <slot></slot>
    `),r(l,"css",`
        :host {
            display: flex;
            flex-wrap: wrap;
        }

        :host([orientation="vertical"]) {
            flex-direction: column;
            width: 50%;
        }
    `);var v;class h extends HTMLElement{constructor(){super();a(this,v,()=>{var d;const t=(d=this.shadowRoot)!=null?d:this.attachShadow({mode:"open"}),s=document.createElement("style");s.innerHTML=this.constructor.css;const e=document.createElement("template");return e.innerHTML=this.constructor.html,t.appendChild(s),t.appendChild(e.content),t});o(this,v).call(this)}static get observedAttributes(){return[]}connectedCallback(){this.setAttribute("role","tabpanel"),this.setAttribute("tabindex","0")}}v=new WeakMap,r(h,"defaultElementName","tab-panel"),r(h,"html",`
        <slot></slot>
    `),r(h,"css",`
        :host {
            border: 1px solid black;
            padding: 4px;
        }

        :host(:not([hidden])) {
            display: block;
        }
    `);window.customElements.get(l.defaultElementName)||window.customElements.define(l.defaultElementName,l);window.customElements.get(c.defaultElementName)||window.customElements.define(c.defaultElementName,c);window.customElements.get(h.defaultElementName)||window.customElements.define(h.defaultElementName,h);
