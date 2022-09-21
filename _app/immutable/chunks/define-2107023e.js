var x=Object.defineProperty;var C=(n,i,t)=>i in n?x(n,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[i]=t;var o=(n,i,t)=>(C(n,typeof i!="symbol"?i+"":i,t),t),N=(n,i,t)=>{if(!i.has(n))throw TypeError("Cannot "+t)};var r=(n,i,t)=>(N(n,i,"read from private field"),t?t.call(n):i.get(n)),a=(n,i,t)=>{if(i.has(n))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(n):i.set(n,t)};const H="tab-list:change",L=(n,i)=>new CustomEvent(H,{detail:{from:n,to:i}});var m,f,p,b;class d extends HTMLElement{constructor(){super();a(this,m,()=>{this.selected=!0});a(this,f,t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.selected=!0)});a(this,p,()=>{this.list.activation==="automatic"&&(this.selected=!0)});a(this,b,()=>{var c;const t=(c=this.shadowRoot)!=null?c:this.attachShadow({mode:"open"}),s=document.createElement("style");s.innerHTML=this.constructor.css;const e=document.createElement("template");return e.innerHTML=this.constructor.html,t.appendChild(s),t.appendChild(e.content),t});r(this,b).call(this)}static get observedAttributes(){return["for","selected"]}get for(){return this.getAttribute("for")}set for(t){this.setAttribute("for",t)}get panel(){return document.querySelector(`#${this.for}`)}get list(){return this.closest("tab-list")}get selected(){return this.hasAttribute("selected")}set selected(t){this.toggleAttribute("selected",t)}connectedCallback(){this.setAttribute("role","tab"),this.addEventListener("click",r(this,m)),this.addEventListener("keydown",r(this,f)),this.addEventListener("focus",r(this,p))}attributeChangedCallback(t){this.setAttribute("aria-controls",this.for),this.setAttribute("aria-selected",this.selected.toString()),this.setAttribute("tabindex",this.selected?"0":"-1"),t==="selected"&&this.list.updateSelected(this.selected?this:void 0)}}m=new WeakMap,f=new WeakMap,p=new WeakMap,b=new WeakMap,o(d,"defaultElementName","tab-item"),o(d,"html",`
        <slot></slot>
    `),o(d,"css",`
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
    `);var E,w,A,g,v,y;class l extends HTMLElement{constructor(){super();o(this,"tabs",()=>Array.from(this.querySelectorAll(d.defaultElementName)));o(this,"panels",()=>this.tabs().map(t=>t.panel));o(this,"selected",()=>this.tabs().find(t=>t.hasAttribute("selected")));o(this,"updateSelected",t=>{const s=this.tabs().find(e=>e.hasAttribute("selected")&&e!==t);t=t!=null?t:s,this.tabs().forEach(e=>{e!==t&&e.removeAttribute("selected")}),this.panels().forEach(e=>{e!==void 0&&(e.hidden=!0)}),(t==null?void 0:t.panel)!==void 0&&(t.panel.hidden=!1),t!==s&&this.dispatchEvent(L(s,t))});a(this,E,t=>{const s=r(this,w).call(this);if(s.includes(t.key)){t.preventDefault();const e=this.tabs(),{index:c}=r(this,A).call(this,e);let u=0;t.key==="Home"?u=0:t.key==="End"?u=e.length-1:u=r(this,v).call(this,c+(t.key===s[0]?-1:1),e.length),r(this,g).call(this,e[u])}});a(this,w,()=>[...this.orientation==="vertical"?["ArrowUp","ArrowDown"]:["ArrowLeft","ArrowRight"],"Home","End"]);a(this,A,t=>{if(t.includes(document.activeElement)){const s=document.activeElement,e=t.indexOf(s);return s.setAttribute("tabindex","-1"),{tab:s,index:e}}});a(this,g,t=>{t==null||t.setAttribute("tabindex","0"),t==null||t.focus()});a(this,v,(t,s)=>(t%s+s)%s);a(this,y,()=>{var c;const t=(c=this.shadowRoot)!=null?c:this.attachShadow({mode:"open"}),s=document.createElement("style");s.innerHTML=this.constructor.css;const e=document.createElement("template");return e.innerHTML=this.constructor.html,t.appendChild(s),t.appendChild(e.content),t});r(this,y).call(this)}static get observedAttributes(){return["orientation"]}get orientation(){var t;return(t=this.getAttribute("orientation"))!=null?t:"horizontal"}set orientation(t){return this.setAttribute("orientation",t)}get activation(){var t;return(t=this.getAttribute("activation"))!=null?t:"manual"}set activation(t){return this.setAttribute("activation",t)}connectedCallback(){this.setAttribute("role","tablist"),this.addEventListener("keydown",r(this,E)),window.customElements.whenDefined(d.defaultElementName).then(()=>{this.updateSelected()})}attributeChangedCallback(){this.orientation==="vertical"?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation")}}E=new WeakMap,w=new WeakMap,A=new WeakMap,g=new WeakMap,v=new WeakMap,y=new WeakMap,o(l,"defaultElementName","tab-list"),o(l,"html",`
        <slot></slot>
    `),o(l,"css",`
        :host {
            display: flex;
            flex-wrap: wrap;
        }

        :host([orientation="vertical"]) {
            flex-direction: column;
            width: 50%;
        }
    `);var k;class h extends HTMLElement{constructor(){super();a(this,k,()=>{var c;const t=(c=this.shadowRoot)!=null?c:this.attachShadow({mode:"open"}),s=document.createElement("style");s.innerHTML=this.constructor.css;const e=document.createElement("template");return e.innerHTML=this.constructor.html,t.appendChild(s),t.appendChild(e.content),t});r(this,k).call(this)}static get observedAttributes(){return[]}connectedCallback(){this.setAttribute("role","tabpanel"),this.setAttribute("tabindex","0")}}k=new WeakMap,o(h,"defaultElementName","tab-panel"),o(h,"html",`
        <slot></slot>
    `),o(h,"css",`
        :host {
            border: 1px solid black;
            padding: 4px;
        }

        :host(:not([hidden])) {
            display: block;
        }
    `);window.customElements.get(l.defaultElementName)||window.customElements.define(l.defaultElementName,l);window.customElements.get(d.defaultElementName)||window.customElements.define(d.defaultElementName,d);window.customElements.get(h.defaultElementName)||window.customElements.define(h.defaultElementName,h);
