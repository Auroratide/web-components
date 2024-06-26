var g=Object.defineProperty;var v=(e,n,t)=>n in e?g(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var s=(e,n,t)=>(v(e,typeof n!="symbol"?n+"":n,t),t),A=(e,n,t)=>{if(!n.has(e))throw TypeError("Cannot "+t)};var c=(e,n,t)=>(A(e,n,"read from private field"),t?t.call(e):n.get(e)),a=(e,n,t)=>{if(n.has(e))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(e):n.set(e,t)};var u,m,f,p;const i=class i extends HTMLElement{constructor(){super();s(this,"build",()=>{var l;if(!this.for)return;const t=document.querySelectorAll(`#${this.for} :is(h1, h2, h3, h4, h5, h6)`),r=w(t),o=C(r),h=b(o);(l=c(this,m).call(this))==null||l.replaceChildren(h)});a(this,u,{for:()=>{this.build()}});a(this,m,()=>{var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("#root")});a(this,f,()=>{this.hasAttribute("role")||this.setAttribute("role","navigation")});a(this,p,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),r=document.createElement("style");r.innerHTML=i.css;const o=document.createElement("template");return o.innerHTML=i.html,t.appendChild(r),t.appendChild(o.content),t});c(this,p).call(this)}static get observedAttributes(){return["for"]}get for(){return this.getAttribute("for")}set for(t){this.setAttribute("for",t)}connectedCallback(){c(this,f).call(this)}attributeChangedCallback(t,r,o){var h,l;(l=(h=c(this,u))[t])==null||l.call(h,o,r)}};u=new WeakMap,m=new WeakMap,f=new WeakMap,p=new WeakMap,s(i,"defaultElementName","table-of-contents"),s(i,"html",`
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
	`);let d=i;function y(e){return parseInt(e.nodeName[1])}function w(e){return Array.from(e).map(n=>({id:n.id,level:y(n),content:n.textContent}))}function C(e){if(e.length===0)return[];const n=e[0].level,t=[];for(const r of e)[...Array(r.level-n).keys()].reduce(o=>k(E(o)),t).push({...r});return t}const E=e=>e[e.length-1],k=e=>(e.children==null&&(e.children=[]),e.children);function b(e){const n=document.createElement("ol");return e.forEach(t=>{const r=document.createElement("li");r.dataset.level=t.level.toString();const o=document.createElement("a");o.href=`#${t.id}`,o.textContent=t.content,o.setAttribute("part","anchor"),r.appendChild(o),t.children!=null&&r.appendChild(b(t.children)),n.appendChild(r)}),n}window.customElements.get(d.defaultElementName)||window.customElements.define(d.defaultElementName,d);
