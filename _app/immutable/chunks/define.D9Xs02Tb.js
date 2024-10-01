var r=Object.defineProperty;var d=e=>{throw TypeError(e)};var p=(e,t,s)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var c=(e,t,s)=>p(e,typeof t!="symbol"?t+"":t,s),u=(e,t,s)=>t.has(e)||d("Cannot "+s);var i=(e,t,s)=>(u(e,t,"read from private field"),s?s.call(e):t.get(e)),h=(e,t,s)=>t.has(e)?d("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s);var l;const n=class n extends HTMLElement{constructor(){super();h(this,l,()=>{const s=this.shadowRoot??this.attachShadow({mode:"open"}),a=document.createElement("style");a.innerHTML=n.css;const m=document.createElement("template");return m.innerHTML=n.html,s.appendChild(a),s.appendChild(m.content),s});i(this,l).call(this)}};l=new WeakMap,c(n,"defaultElementName","major-point"),c(n,"html",`
		<strong><slot></slot></strong>
	`),c(n,"css",`
		:host {
			display: block;
			margin-block: 1em;
		}

		strong { font-weight: inherit; }
	`);let o=n;window.customElements.get(o.defaultElementName)||window.customElements.define(o.defaultElementName,o);
