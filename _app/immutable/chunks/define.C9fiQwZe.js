var y=Object.defineProperty;var u=s=>{throw TypeError(s)};var f=(s,t,e)=>t in s?y(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var c=(s,t,e)=>f(s,typeof t!="symbol"?t+"":t,e),b=(s,t,e)=>t.has(s)||u("Cannot "+e);var i=(s,t,e)=>(b(s,t,"read from private field"),e?e.call(s):t.get(s)),n=(s,t,e)=>t.has(s)?u("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e);var p,d,m,h;const o=class o extends HTMLElement{constructor(){super();n(this,p,()=>{this.hasAttribute("role")||this.setAttribute("role","presentation")});n(this,d,()=>{var e;(e=i(this,m).call(this))==null||e.addEventListener("animationend",()=>{this.remove()},{once:!0})});n(this,m,()=>{var e;return(e=this.shadowRoot)==null?void 0:e.querySelector("#ripple")});n(this,h,()=>{const e=this.shadowRoot??this.attachShadow({mode:"open"}),l=document.createElement("style");l.innerHTML=o.css;const r=document.createElement("template");return r.innerHTML=o.html,e.appendChild(l),e.appendChild(r.content),e});i(this,h).call(this)}static triggerAt({x:e,y:l}){const r=document.createElement(this.defaultElementName);return r.style.setProperty("--ripple-x",`${e}px`),r.style.setProperty("--ripple-y",`${l}px`),document.body.appendChild(r),r}connectedCallback(){i(this,p).call(this),i(this,d).call(this)}};p=new WeakMap,d=new WeakMap,m=new WeakMap,h=new WeakMap,c(o,"defaultElementName","navigation-ripple"),c(o,"html",`
		<div id="ripple" aria-hidden="true"></div>
	`),c(o,"css",`
		:host {
			display: block;
			pointer-events: none;
			overflow: visible;
		}

		@keyframes ripple {
			to {
				transform: scale(4);
				opacity: 0;
			}
		}

		#ripple {
			position: absolute;
			top: calc(var(--ripple-y) - 0.5em);
			left: calc(var(--ripple-x) - 0.5em);
			inline-size: 1em;
			block-size: 1em;
			background: var(--t-primary-a);
			border-radius: 100%;
			transform: scale(0);
			opacity: 1;
			animation: ripple 0.25s ease-out;
		}
	`);let a=o;window.customElements.get(a.defaultElementName)||window.customElements.define(a.defaultElementName,a);
