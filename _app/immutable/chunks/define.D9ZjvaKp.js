var h=Object.defineProperty;var v=(s,e,t)=>e in s?h(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var i=(s,e,t)=>(v(s,typeof e!="symbol"?e+"":e,t),t),b=(s,e,t)=>{if(!e.has(s))throw TypeError("Cannot "+t)};var r=(s,e,t)=>(b(s,e,"read from private field"),t?t.call(s):e.get(s)),u=(s,e,t)=>{if(e.has(s))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(s):e.set(s,t)};var c,o;const a=class a extends HTMLElement{constructor(){super();i(this,"decrease",()=>{this.value-=1});i(this,"increase",()=>{this.value+=1});u(this,c,()=>{this.shadowRoot.querySelector("#value").textContent=this.value.toString()});u(this,o,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),d=document.createElement("style");d.innerHTML=a.css;const l=document.createElement("template");return l.innerHTML=a.html,t.appendChild(d),t.appendChild(l.content),t});r(this,o).call(this)}static get observedAttributes(){return["value"]}get value(){return parseInt(this.getAttribute("value")??"0")}set value(t){this.setAttribute("value",t.toString())}connectedCallback(){this.shadowRoot.querySelector("#decrease").addEventListener("click",this.decrease),this.shadowRoot.querySelector("#increase").addEventListener("click",this.increase),r(this,c).call(this)}attributeChangedCallback(){r(this,c).call(this)}};c=new WeakMap,o=new WeakMap,i(a,"defaultElementName","example-component"),i(a,"html",`
        <button id="decrease">Decrease</button>
        <span id="value">0</span>
        <button id="increase">Increase</button>
    `),i(a,"css",`
        #value {
            font-weight: bold;
        }
    `);let n=a;window.customElements.get(n.defaultElementName)||window.customElements.define(n.defaultElementName,n);
