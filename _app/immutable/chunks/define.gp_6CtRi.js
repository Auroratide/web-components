var v=Object.defineProperty;var b=t=>{throw TypeError(t)};var A=(t,n,e)=>n in t?v(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var s=(t,n,e)=>A(t,typeof n!="symbol"?n+"":n,e),y=(t,n,e)=>n.has(t)||b("Cannot "+e);var c=(t,n,e)=>(y(t,n,"read from private field"),e?e.call(t):n.get(t)),a=(t,n,e)=>n.has(t)?b("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(t):n.set(t,e);var u,m,f,p;const i=class i extends HTMLElement{constructor(){super();s(this,"build",()=>{var l;if(!this.for)return;const e=document.querySelectorAll(`#${this.for} :is(h1, h2, h3, h4, h5, h6)`),r=C(e),o=E(r),h=g(o);(l=c(this,m).call(this))==null||l.replaceChildren(h)});a(this,u,{for:()=>{this.build()}});a(this,m,()=>{var e;return(e=this.shadowRoot)==null?void 0:e.querySelector("#root")});a(this,f,()=>{this.hasAttribute("role")||this.setAttribute("role","navigation")});a(this,p,()=>{const e=this.shadowRoot??this.attachShadow({mode:"open"}),r=document.createElement("style");r.innerHTML=i.css;const o=document.createElement("template");return o.innerHTML=i.html,e.appendChild(r),e.appendChild(o.content),e});c(this,p).call(this)}static get observedAttributes(){return["for"]}get for(){return this.getAttribute("for")}set for(e){this.setAttribute("for",e)}connectedCallback(){c(this,f).call(this)}attributeChangedCallback(e,r,o){var h,l;(l=(h=c(this,u))[e])==null||l.call(h,o,r)}};u=new WeakMap,m=new WeakMap,f=new WeakMap,p=new WeakMap,s(i,"defaultElementName","table-of-contents"),s(i,"html",`
		<div id="root"></div>
	`),s(i,"css",`
		:host { display: block; }

		ol {
			list-style: none;
			padding: 0;
			margin: 0;
		} ol ol {
			padding-inline-start: 0.75em;
		} li {
			line-height: 1.15em;
			margin: 0;
		} a {
			display: block;
			margin-block-end: 0.5em;
		}
	`);let d=i;function w(t){return parseInt(t.nodeName[1])}function C(t){return Array.from(t).map(n=>({id:n.id,level:w(n),content:n.textContent}))}function E(t){if(t.length===0)return[];const n=t[0].level,e=[];for(const r of t)[...Array(r.level-n).keys()].reduce(o=>L(k(o)),e).push({...r});return e}const k=t=>t[t.length-1],L=t=>(t.children==null&&(t.children=[]),t.children);function g(t){const n=document.createElement("ol");return t.forEach(e=>{const r=document.createElement("li");r.dataset.level=e.level.toString();const o=document.createElement("a");o.href=`#${e.id}`,o.textContent=e.content,o.setAttribute("part","anchor"),r.appendChild(o),e.children!=null&&r.appendChild(g(e.children)),n.appendChild(r)}),n}window.customElements.get(d.defaultElementName)||window.customElements.define(d.defaultElementName,d);
