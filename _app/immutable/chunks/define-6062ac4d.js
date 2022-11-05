var H=Object.defineProperty;var L=(n,i,t)=>i in n?H(n,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[i]=t;var o=(n,i,t)=>(L(n,typeof i!="symbol"?i+"":i,t),t),M=(n,i,t)=>{if(!i.has(n))throw TypeError("Cannot "+t)};var r=(n,i,t)=>(M(n,i,"read from private field"),t?t.call(n):i.get(n)),a=(n,i,t)=>{if(i.has(n))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(n):i.set(n,t)};const R="tab-list:change",D=(n,i)=>new CustomEvent(R,{detail:{from:n,to:i}});var m,f,p,b;const w=class extends HTMLElement{constructor(){super();a(this,m,()=>{this.selected=!0});a(this,f,t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.selected=!0)});a(this,p,()=>{this.list.activation==="automatic"&&(this.selected=!0)});a(this,b,()=>{var d;const t=(d=this.shadowRoot)!=null?d:this.attachShadow({mode:"open"}),s=document.createElement("style");s.innerHTML=w.css;const e=document.createElement("template");return e.innerHTML=w.html,t.appendChild(s),t.appendChild(e.content),t});r(this,b).call(this)}static get observedAttributes(){return["for","selected"]}get for(){return this.getAttribute("for")}set for(t){this.setAttribute("for",t)}get panel(){return document.querySelector(`#${this.for}`)}get list(){return this.closest("tab-list")}get selected(){return this.hasAttribute("selected")}set selected(t){this.toggleAttribute("selected",t)}connectedCallback(){this.setAttribute("role","tab"),this.addEventListener("click",r(this,m)),this.addEventListener("keydown",r(this,f)),this.addEventListener("focus",r(this,p))}attributeChangedCallback(t){this.setAttribute("aria-controls",this.for),this.setAttribute("aria-selected",this.selected.toString()),this.setAttribute("tabindex",this.selected?"0":"-1"),t==="selected"&&this.list.updateSelected(this.selected?this:void 0)}};let c=w;m=new WeakMap,f=new WeakMap,p=new WeakMap,b=new WeakMap,o(c,"defaultElementName","tab-item"),o(c,"html",`
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
    `);var A,g,v,E,y,k;const x=class extends HTMLElement{constructor(){super();o(this,"tabs",()=>Array.from(this.querySelectorAll(c.defaultElementName)));o(this,"panels",()=>this.tabs().map(t=>t.panel));o(this,"selected",()=>this.tabs().find(t=>t.hasAttribute("selected")));o(this,"updateSelected",t=>{const s=this.tabs().find(e=>e.hasAttribute("selected")&&e!==t);t=t!=null?t:s,this.tabs().forEach(e=>{e!==t&&e.removeAttribute("selected")}),this.panels().forEach(e=>{e!==void 0&&(e.hidden=!0)}),(t==null?void 0:t.panel)!==void 0&&(t.panel.hidden=!1),t!==s&&this.dispatchEvent(D(s,t))});a(this,A,t=>{const s=r(this,g).call(this);if(s.includes(t.key)){t.preventDefault();const e=this.tabs(),{index:d}=r(this,v).call(this,e);let u=0;t.key==="Home"?u=0:t.key==="End"?u=e.length-1:u=r(this,y).call(this,d+(t.key===s[0]?-1:1),e.length),r(this,E).call(this,e[u])}});a(this,g,()=>[...this.orientation==="vertical"?["ArrowUp","ArrowDown"]:["ArrowLeft","ArrowRight"],"Home","End"]);a(this,v,t=>{if(t.includes(document.activeElement)){const s=document.activeElement,e=t.indexOf(s);return s.setAttribute("tabindex","-1"),{tab:s,index:e}}});a(this,E,t=>{t==null||t.setAttribute("tabindex","0"),t==null||t.focus()});a(this,y,(t,s)=>(t%s+s)%s);a(this,k,()=>{var d;const t=(d=this.shadowRoot)!=null?d:this.attachShadow({mode:"open"}),s=document.createElement("style");s.innerHTML=x.css;const e=document.createElement("template");return e.innerHTML=x.html,t.appendChild(s),t.appendChild(e.content),t});r(this,k).call(this)}static get observedAttributes(){return["orientation"]}get orientation(){var t;return(t=this.getAttribute("orientation"))!=null?t:"horizontal"}set orientation(t){this.setAttribute("orientation",t)}get activation(){var t;return(t=this.getAttribute("activation"))!=null?t:"manual"}set activation(t){this.setAttribute("activation",t)}connectedCallback(){this.setAttribute("role","tablist"),this.addEventListener("keydown",r(this,A)),window.customElements.whenDefined(c.defaultElementName).then(()=>{this.updateSelected()})}attributeChangedCallback(){this.orientation==="vertical"?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation")}};let l=x;A=new WeakMap,g=new WeakMap,v=new WeakMap,E=new WeakMap,y=new WeakMap,k=new WeakMap,o(l,"defaultElementName","tab-list"),o(l,"html",`
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
    `);var C;const N=class extends HTMLElement{constructor(){super();a(this,C,()=>{var d;const t=(d=this.shadowRoot)!=null?d:this.attachShadow({mode:"open"}),s=document.createElement("style");s.innerHTML=N.css;const e=document.createElement("template");return e.innerHTML=N.html,t.appendChild(s),t.appendChild(e.content),t});r(this,C).call(this)}static get observedAttributes(){return[]}connectedCallback(){this.setAttribute("role","tabpanel"),this.setAttribute("tabindex","0")}};let h=N;C=new WeakMap,o(h,"defaultElementName","tab-panel"),o(h,"html",`
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
