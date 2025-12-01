var L=Object.defineProperty;var A=s=>{throw TypeError(s)};var k=(s,i,t)=>i in s?L(s,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[i]=t;var m=(s,i,t)=>k(s,typeof i!="symbol"?i+"":i,t),w=(s,i,t)=>i.has(s)||A("Cannot "+t);var h=(s,i,t)=>(w(s,i,"read from private field"),t?t.call(s):i.get(s)),r=(s,i,t)=>i.has(s)?A("Cannot add the same private member more than once"):i instanceof WeakSet?i.add(s):i.set(s,t),y=(s,i,t,e)=>(w(s,i,"write to private field"),e?e.call(s,t):i.set(s,t),t);var f,p,c,b,u,N,l,o,E;const a=class a extends HTMLElement{constructor(){super();r(this,f,{highlight:()=>{h(this,u).call(this)},using:()=>{h(this,c).call(this)}});r(this,p,()=>{this.id&&document.querySelectorAll(`${this.nodeName.toLowerCase()}[using="${this.id}"]`).forEach(e=>{var n;return(n=h(e,c))==null?void 0:n.call(e)})});r(this,c,()=>{var t;(t=h(this,l))==null||t.removeEventListener("slotchange",h(this,o)),y(this,l,this.using?document.querySelector(`#${this.using}`):void 0),h(this,l)&&(h(this,o).call(this),h(this,l).addEventListener("slotchange",h(this,o)))});r(this,b,()=>{if(!this.highlight)return;const[t,e]=this.highlight.split("-");return[parseInt(t),e!=null?parseInt(e):parseInt(t)]});r(this,u,()=>{const t=h(this,N).call(this),e=h(this,b).call(this);t&&e!=null&&!isNaN(e[0])&&!isNaN(e[1])&&t.forEach((n,g)=>{e[0]<=g&&g<=e[1]?n.dataset.highlighted="":delete n.dataset.highlighted})});r(this,N,()=>{var t;return Array.from(((t=this.querySelector('[slot="items"]'))==null?void 0:t.children)??[])});r(this,l);r(this,o,()=>{var e;const t=((e=h(this,l))==null?void 0:e.cloneNode(!0).childNodes)??[];this.replaceChildren(...t),h(this,u).call(this)});r(this,E,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=a.css;const n=document.createElement("template");return n.innerHTML=a.html,t.appendChild(e),t.appendChild(n.content),t});h(this,E).call(this)}static get observedAttributes(){return["highlight","using"]}get highlight(){return this.getAttribute("highlight")}set icon(t){t!=null?this.setAttribute("icon",t):this.removeAttribute("highlight")}get using(){return this.getAttribute("using")}set using(t){this.setAttribute("using",t)}connectedCallback(){h(this,p).call(this),h(this,c).call(this)}attributeChangedCallback(t,e,n){var g,v;(v=(g=h(this,f))[t])==null||v.call(g,n,e)}};f=new WeakMap,p=new WeakMap,c=new WeakMap,b=new WeakMap,u=new WeakMap,N=new WeakMap,l=new WeakMap,o=new WeakMap,E=new WeakMap,m(a,"defaultElementName","point-compilation"),m(a,"html",`
		<figure>
			<figcaption>
				<slot name="title"></slot>
			</figcaption>
			<section>
				<aside class="image">
					<slot name="image"></slot>
				</aside>
				<div class="items">
					<slot name="items"></slot>
				</div>
			</section>
		</figure>
	`),m(a,"css",`
		:host { display: block; }
		figure { margin: 0; }
	`);let d=a;window.customElements.get(d.defaultElementName)||window.customElements.define(d.defaultElementName,d);
