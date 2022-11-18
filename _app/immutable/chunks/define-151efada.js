var H=Object.defineProperty;var L=(n,i,t)=>i in n?H(n,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[i]=t;var o=(n,i,t)=>(L(n,typeof i!="symbol"?i+"":i,t),t),M=(n,i,t)=>{if(!i.has(n))throw TypeError("Cannot "+t)};var r=(n,i,t)=>(M(n,i,"read from private field"),t?t.call(n):i.get(n)),a=(n,i,t)=>{if(i.has(n))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(n):i.set(n,t)};const R="tab-list:change",D=(n,i)=>new CustomEvent(R,{detail:{from:n,to:i}});var m,f,p,b;const w=class extends HTMLElement{constructor(){super();a(this,m,()=>{this.selected=!0});a(this,f,t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.selected=!0)});a(this,p,()=>{var t;((t=this.list)==null?void 0:t.activation)==="automatic"&&(this.selected=!0)});a(this,b,()=>{var d;const t=(d=this.shadowRoot)!=null?d:this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=w.css;const s=document.createElement("template");return s.innerHTML=w.html,t.appendChild(e),t.appendChild(s.content),t});r(this,b).call(this)}static get observedAttributes(){return["for","selected"]}get for(){return this.getAttribute("for")}set for(t){this.setAttribute("for",t)}get panel(){return document.querySelector(`#${this.for}`)}get list(){return this.closest("tab-list")}get selected(){return this.hasAttribute("selected")}set selected(t){this.toggleAttribute("selected",t)}connectedCallback(){this.setAttribute("role","tab"),this.addEventListener("click",r(this,m)),this.addEventListener("keydown",r(this,f)),this.addEventListener("focus",r(this,p))}attributeChangedCallback(t){var e;this.setAttribute("aria-controls",this.for),this.setAttribute("aria-selected",this.selected.toString()),this.setAttribute("tabindex",this.selected?"0":"-1"),t==="selected"&&((e=this.list)==null||e.updateSelected(this.selected?this:void 0))}};let c=w;m=new WeakMap,f=new WeakMap,p=new WeakMap,b=new WeakMap,o(c,"defaultElementName","tab-item"),o(c,"html",`
        <slot></slot>
    `),o(c,"css",`
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
    `);var A,g,v,E,y,k;const x=class extends HTMLElement{constructor(){super();o(this,"tabs",()=>Array.from(this.querySelectorAll(c.defaultElementName)));o(this,"panels",()=>this.tabs().map(t=>t.panel));o(this,"selected",()=>this.tabs().find(t=>t.hasAttribute("selected")));o(this,"updateSelected",t=>{const e=this.tabs().find(s=>s.hasAttribute("selected")&&s!==t);t=t!=null?t:e,this.tabs().forEach(s=>{s!==t&&s.removeAttribute("selected")}),this.panels().forEach(s=>{s!==void 0&&(s.hidden=!0)}),(t==null?void 0:t.panel)!==void 0&&(t.panel.hidden=!1),t!==e&&this.dispatchEvent(D(e,t))});a(this,A,t=>{const e=r(this,g).call(this);if(e.includes(t.key)){t.preventDefault();const s=this.tabs(),{index:d}=r(this,v).call(this,s);let u=0;t.key==="Home"?u=0:t.key==="End"?u=s.length-1:u=r(this,y).call(this,d+(t.key===e[0]?-1:1),s.length),r(this,E).call(this,s[u])}});a(this,g,()=>[...this.orientation==="vertical"?["ArrowUp","ArrowDown"]:["ArrowLeft","ArrowRight"],"Home","End"]);a(this,v,t=>{if(t.includes(document.activeElement)){const e=document.activeElement,s=t.indexOf(e);return e.setAttribute("tabindex","-1"),{tab:e,index:s}}});a(this,E,t=>{t==null||t.setAttribute("tabindex","0"),t==null||t.focus()});a(this,y,(t,e)=>(t%e+e)%e);a(this,k,()=>{var d;const t=(d=this.shadowRoot)!=null?d:this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=x.css;const s=document.createElement("template");return s.innerHTML=x.html,t.appendChild(e),t.appendChild(s.content),t});r(this,k).call(this)}static get observedAttributes(){return["orientation"]}get orientation(){var t;return(t=this.getAttribute("orientation"))!=null?t:"horizontal"}set orientation(t){this.setAttribute("orientation",t)}get activation(){var t;return(t=this.getAttribute("activation"))!=null?t:"manual"}set activation(t){this.setAttribute("activation",t)}connectedCallback(){this.setAttribute("role","tablist"),this.addEventListener("keydown",r(this,A)),window.customElements.whenDefined(c.defaultElementName).then(()=>{this.updateSelected()})}attributeChangedCallback(){this.orientation==="vertical"?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation")}};let l=x;A=new WeakMap,g=new WeakMap,v=new WeakMap,E=new WeakMap,y=new WeakMap,k=new WeakMap,o(l,"defaultElementName","tab-list"),o(l,"html",`
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
    `);var C;const N=class extends HTMLElement{constructor(){super();a(this,C,()=>{var d;const t=(d=this.shadowRoot)!=null?d:this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=N.css;const s=document.createElement("template");return s.innerHTML=N.html,t.appendChild(e),t.appendChild(s.content),t});r(this,C).call(this)}static get observedAttributes(){return[]}connectedCallback(){this.setAttribute("role","tabpanel"),this.setAttribute("tabindex","0")}};let h=N;C=new WeakMap,o(h,"defaultElementName","tab-panel"),o(h,"html",`
        <slot></slot>
    `),o(h,"css",`
        :host {
            border: 1px solid black;
            padding: 4px;
        }

        :host(:not([hidden])) {
            display: block;
        }
    `);window.customElements.get(l.defaultElementName)||window.customElements.define(l.defaultElementName,l);window.customElements.get(c.defaultElementName)||window.customElements.define(c.defaultElementName,c);window.customElements.get(h.defaultElementName)||window.customElements.define(h.defaultElementName,h);
