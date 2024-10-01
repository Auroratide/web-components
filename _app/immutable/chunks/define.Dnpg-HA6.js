var m=Object.defineProperty;var p=s=>{throw TypeError(s)};var g=(s,e,t)=>e in s?m(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var a=(s,e,t)=>g(s,typeof e!="symbol"?e+"":e,t),f=(s,e,t)=>e.has(s)||p("Cannot "+t);var n=(s,e,t)=>(f(s,e,"read from private field"),t?t.call(s):e.get(s)),o=(s,e,t)=>e.has(s)?p("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);import{c as A}from"./events.C44j2o98.js";const h="checked",k="disabled";var c,d,l;const i=class i extends HTMLElement{constructor(){super();a(this,"toggle",()=>{this.disabled||(this.checked=!this.checked)});o(this,c,t=>{switch(t.key){case" ":case"Enter":t.preventDefault(),this.toggle();break}});o(this,d,(t=!1)=>{this.setAttribute("aria-checked",this.checked.toString()),t&&this.dispatchEvent(A(this.checked))});o(this,l,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),u=document.createElement("style");u.innerHTML=i.css;const b=document.createElement("template");return b.innerHTML=i.html,t.appendChild(u),t.appendChild(b.content),t});n(this,l).call(this)}static get observedAttributes(){return[h]}get checked(){return this.hasAttribute(h)}set checked(t){this.toggleAttribute(h,t)}get disabled(){return this.hasAttribute(k)}set disabled(t){this.toggleAttribute(k,t)}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","switch"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),n(this,d).call(this,!1),this.addEventListener("click",this.toggle),this.addEventListener("keydown",n(this,c))}disconnectedCallback(){this.removeEventListener("click",this.toggle),this.removeEventListener("keydown",n(this,c))}attributeChangedCallback(t){t===h&&n(this,d).call(this,!0)}};c=new WeakMap,d=new WeakMap,l=new WeakMap,a(i,"defaultElementName","toggle-switch"),a(i,"html",`
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
	`),a(i,"formAssociated",!0);let r=i;window.customElements.get(r.defaultElementName)||window.customElements.define(r.defaultElementName,r);
