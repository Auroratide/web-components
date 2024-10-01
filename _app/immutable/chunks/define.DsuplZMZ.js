var v=Object.defineProperty;var h=t=>{throw TypeError(t)};var b=(t,e,s)=>e in t?v(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var i=(t,e,s)=>b(t,typeof e!="symbol"?e+"":e,s),m=(t,e,s)=>e.has(t)||h("Cannot "+s);var r=(t,e,s)=>(m(t,e,"read from private field"),s?s.call(t):e.get(t)),u=(t,e,s)=>e.has(t)?h("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s);var c,o;const a=class a extends HTMLElement{constructor(){super();i(this,"decrease",()=>{this.value-=1});i(this,"increase",()=>{this.value+=1});u(this,c,()=>{this.shadowRoot.querySelector("#value").textContent=this.value.toString()});u(this,o,()=>{const s=this.shadowRoot??this.attachShadow({mode:"open"}),d=document.createElement("style");d.innerHTML=a.css;const l=document.createElement("template");return l.innerHTML=a.html,s.appendChild(d),s.appendChild(l.content),s});r(this,o).call(this)}static get observedAttributes(){return["value"]}get value(){return parseInt(this.getAttribute("value")??"0")}set value(s){this.setAttribute("value",s.toString())}connectedCallback(){this.shadowRoot.querySelector("#decrease").addEventListener("click",this.decrease),this.shadowRoot.querySelector("#increase").addEventListener("click",this.increase),r(this,c).call(this)}attributeChangedCallback(){r(this,c).call(this)}};c=new WeakMap,o=new WeakMap,i(a,"defaultElementName","example-component"),i(a,"html",`
		  <button id="decrease">Decrease</button>
		  <span id="value">0</span>
		  <button id="increase">Increase</button>
	 `),i(a,"css",`
		  #value {
				font-weight: bold;
		  }
	 `);let n=a;window.customElements.get(n.defaultElementName)||window.customElements.define(n.defaultElementName,n);
