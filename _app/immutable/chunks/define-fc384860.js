var p=Object.defineProperty;var k=(e,s,t)=>s in e?p(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t;var a=(e,s,t)=>(k(e,typeof s!="symbol"?s+"":s,t),t),m=(e,s,t)=>{if(!s.has(e))throw TypeError("Cannot "+t)};var n=(e,s,t)=>(m(e,s,"read from private field"),t?t.call(e):s.get(e)),o=(e,s,t)=>{if(s.has(e))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(e):s.set(e,t)};const E="toggle-switch:change",f=e=>new CustomEvent(E,{detail:{checked:e}}),d="checked",g="disabled";var c,r,h;class i extends HTMLElement{constructor(){super();a(this,"toggle",()=>{this.disabled||(this.checked=!this.checked)});o(this,c,t=>{switch(t.key){case" ":case"Enter":t.preventDefault(),this.toggle();break}});o(this,r,(t=!1)=>{this.setAttribute("aria-checked",this.checked.toString()),t&&this.dispatchEvent(f(this.checked))});o(this,h,()=>{var b;const t=(b=this.shadowRoot)!=null?b:this.attachShadow({mode:"open"}),l=document.createElement("style");l.innerHTML=this.constructor.css;const u=document.createElement("template");return u.innerHTML=this.constructor.html,t.appendChild(l),t.appendChild(u.content),t});n(this,h).call(this)}static get observedAttributes(){return[d]}get checked(){return this.hasAttribute(d)}set checked(t){this.toggleAttribute(d,t)}get disabled(){return this.hasAttribute(g)}set disabled(t){this.toggleAttribute(g,t)}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","switch"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),n(this,r).call(this,!1),this.addEventListener("click",this.toggle),this.addEventListener("keydown",n(this,c))}disconnectedCallback(){this.removeEventListener("click",this.toggle),this.removeEventListener("keydown",n(this,c))}attributeChangedCallback(t){t===d&&n(this,r).call(this,!0)}}c=new WeakMap,r=new WeakMap,h=new WeakMap,a(i,"defaultElementName","toggle-switch"),a(i,"html",`
        <span part="track">
            <span part="slider"></span>
        </span>
    `),a(i,"css",`
        :host {
            display: inline-block;
            width: 2em;
            height: 1em;
            cursor: pointer;
        }

        span {
            box-sizing: border-box;
            display: inline-block;
            line-height: 1;
        }

        [part="track"] {
            width: 100%;
            height: 100%;
            background-color: #dddddd;
            text-align: left;
            transition: all 0.256s;
        }

        [part="slider"] {
            width: 50%;
            height: 100%;
            background-color: #777777;
            transition: all 0.256s;
            vertical-align: text-top;
        }

        :host([checked]) [part="slider"] {
            transform: translateX(100%);
        }

        :host([disabled]) {
            cursor: not-allowed;
            opacity: 0.5;
        }
    `),a(i,"formAssociated",!0);window.customElements.get(i.defaultElementName)||window.customElements.define(i.defaultElementName,i);
