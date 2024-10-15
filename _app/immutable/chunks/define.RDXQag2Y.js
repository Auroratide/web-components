var b=Object.defineProperty;var f=o=>{throw TypeError(o)};var v=(o,e,t)=>e in o?b(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var a=(o,e,t)=>v(o,typeof e!="symbol"?e+"":e,t),g=(o,e,t)=>e.has(o)||f("Cannot "+t);var r=(o,e,t)=>(g(o,e,"read from private field"),t?t.call(o):e.get(o)),l=(o,e,t)=>e.has(o)?f("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t);import{i as w}from"./Button.UlP2FrO1.js";var d,h,m;const i=class i extends HTMLElement{constructor(){super();l(this,d,{icon:t=>{var c;w(t)&&((c=r(this,h).call(this))==null||c.forEach(s=>{s.setAttribute("icon",t)}))}});l(this,h,()=>{var t;return(t=this.shadowRoot)==null?void 0:t.querySelectorAll("vector-icon")});l(this,m,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),c=document.createElement("style");c.innerHTML=i.css;const s=document.createElement("template");return s.innerHTML=i.html,t.appendChild(c),t.appendChild(s.content),t});r(this,m).call(this)}static get observedAttributes(){return["icon"]}get icon(){return this.getAttribute("icon")}set icon(t){this.setAttribute("icon",t)}attributeChangedCallback(t,c,s){var u,p;(p=(u=r(this,d))[t])==null||p.call(u,s,c)}};d=new WeakMap,h=new WeakMap,m=new WeakMap,a(i,"defaultElementName","icon-divider"),a(i,"html",`
		<div role="separator">
			<vector-icon></vector-icon>
			<vector-icon></vector-icon>
			<vector-icon></vector-icon>
		</div>
	`),a(i,"css",`
		:host { display: block; }

		div {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1.5em;
		}

		vector-icon:nth-child(2) {
			font-size: 2em;
		}		
	`);let n=i;window.customElements.get(n.defaultElementName)||window.customElements.define(n.defaultElementName,n);
