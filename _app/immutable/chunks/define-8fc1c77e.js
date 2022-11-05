var v=Object.defineProperty;var b=(s,t,e)=>t in s?v(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var i=(s,t,e)=>(b(s,typeof t!="symbol"?t+"":t,e),e),m=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)};var c=(s,t,e)=>(m(s,t,"read from private field"),e?e.call(s):t.get(s)),u=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)};var n,r;const o=class extends HTMLElement{constructor(){super();i(this,"decrease",()=>{this.value-=1});i(this,"increase",()=>{this.value+=1});u(this,n,()=>{this.shadowRoot.querySelector("#value").textContent=this.value.toString()});u(this,r,()=>{var h;const e=(h=this.shadowRoot)!=null?h:this.attachShadow({mode:"open"}),d=document.createElement("style");d.innerHTML=o.css;const l=document.createElement("template");return l.innerHTML=o.html,e.appendChild(d),e.appendChild(l.content),e});c(this,r).call(this)}static get observedAttributes(){return["value"]}get value(){var e;return parseInt((e=this.getAttribute("value"))!=null?e:"0")}set value(e){this.setAttribute("value",e.toString())}connectedCallback(){this.shadowRoot.querySelector("#decrease").addEventListener("click",this.decrease),this.shadowRoot.querySelector("#increase").addEventListener("click",this.increase),c(this,n).call(this)}attributeChangedCallback(){c(this,n).call(this)}};let a=o;n=new WeakMap,r=new WeakMap,i(a,"defaultElementName","example-component"),i(a,"html",`
        <button id="decrease">Decrease</button>
        <span id="value">0</span>
        <button id="increase">Increase</button>
    `),i(a,"css",`
        #value {
            font-weight: bold;
        }
    `);window.customElements.get(a.defaultElementName)||window.customElements.define(a.defaultElementName,a);
