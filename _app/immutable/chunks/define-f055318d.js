var h=Object.defineProperty;var m=(s,t,e)=>t in s?h(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var a=(s,t,e)=>(m(s,typeof t!="symbol"?t+"":t,e),e),v=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)};var i=(s,t,e)=>(v(s,t,"read from private field"),e?e.call(s):t.get(s)),r=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)};var c,o;class n extends HTMLElement{constructor(){super();a(this,"decrease",()=>{this.value-=1});a(this,"increase",()=>{this.value+=1});r(this,c,()=>{this.shadowRoot.querySelector("#value").textContent=this.value});r(this,o,()=>{var d;const e=(d=this.shadowRoot)!=null?d:this.attachShadow({mode:"open"}),l=document.createElement("style");l.innerHTML=this.constructor.css;const u=document.createElement("template");return u.innerHTML=this.constructor.html,e.appendChild(l),e.appendChild(u.content),e});i(this,o).call(this)}static get observedAttributes(){return["value"]}get value(){var e;return parseInt((e=this.getAttribute("value"))!=null?e:"0")}set value(e){this.setAttribute("value",e.toString())}connectedCallback(){this.shadowRoot.querySelector("#decrease").addEventListener("click",this.decrease),this.shadowRoot.querySelector("#increase").addEventListener("click",this.increase),i(this,c).call(this)}attributeChangedCallback(){i(this,c).call(this)}}c=new WeakMap,o=new WeakMap,a(n,"defaultElementName","example-component"),a(n,"html",`
        <button id="decrease">Decrease</button>
        <span id="value">0</span>
        <button id="increase">Increase</button>
    `),a(n,"css",`
        #value {
            font-weight: bold;
        }
    `);window.customElements.get(n.defaultElementName)||window.customElements.define(n.defaultElementName,n);
