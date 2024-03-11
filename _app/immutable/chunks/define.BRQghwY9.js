var I=Object.defineProperty;var O=(e,o,t)=>o in e?I(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t;var r=(e,o,t)=>(O(e,typeof o!="symbol"?o+"":o,t),t),L=(e,o,t)=>{if(!o.has(e))throw TypeError("Cannot "+t)};var n=(e,o,t)=>(L(e,o,"read from private field"),t?t.call(e):o.get(e)),s=(e,o,t)=>{if(o.has(e))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(e):o.set(e,t)},S=(e,o,t,i)=>(L(e,o,"write to private field"),i?i.call(e,t):o.set(e,t),t);var h,d,a,u,p,v,b,w,g,f,z,x,C;const c=class c extends HTMLElement{constructor(){super();r(this,"zoomIn",()=>{n(this,d).call(this).showModal(),n(this,w).call(this)});r(this,"zoomOut",()=>{n(this,d).call(this).close()});s(this,h,()=>this.shadowRoot.querySelector("#zoom-in"));s(this,d,()=>this.shadowRoot.querySelector("#modal"));s(this,a,()=>this.shadowRoot.querySelector("#content"));s(this,u,()=>this.shadowRoot.querySelector("slot"));s(this,p,()=>n(this,u).call(this).assignedElements()[0]);s(this,v,{disabled:t=>{n(this,h).call(this).disabled=t!=null}});s(this,b,()=>{const t=n(this,p).call(this).cloneNode(!0);"alt"in t&&(t.alt+=" (zoomed)"),t.setAttribute("part","content"),n(this,a).call(this).replaceChildren(t)});s(this,w,()=>{n(this,z).call(this);const t=n(this,p).call(this),i=n(this,a).call(this).firstElementChild,l=q(i,t);n(this,a).call(this).animate([{transform:l},{transform:"scale(1) translate(0px, 0px)"}],{fill:"both",duration:400,easing:"ease-in-out"})});s(this,g,()=>{n(this,x).call(this);const t=n(this,p).call(this),i=n(this,a).call(this).firstElementChild,l=q(i,t);n(this,a).call(this).animate([{transform:"scale(1) translate(0px, 0px)"},{transform:l}],{fill:"backwards",duration:400,easing:"ease-in-out"})});s(this,f,void 0);s(this,z,()=>{S(this,f,document.body.style.overflow),document.body.style.overflow="hidden"});s(this,x,()=>document.body.style.overflow=n(this,f));s(this,C,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),i=document.createElement("style");i.innerHTML=c.css;const l=document.createElement("template");return l.innerHTML=c.html,t.appendChild(i),t.appendChild(l.content),t});n(this,C).call(this)}static get observedAttributes(){return["disabled"]}get disabled(){return this.hasAttribute("disabled")}set disabled(t){this.toggleAttribute("disabled",t)}connectedCallback(){n(this,h).call(this).addEventListener("click",this.zoomIn),n(this,u).call(this).addEventListener("slotchange",n(this,b)),n(this,d).call(this).addEventListener("close",n(this,g))}disconnectedCallback(){n(this,h).call(this).removeEventListener("click",this.zoomIn),n(this,u).call(this).removeEventListener("slotchange",n(this,b)),n(this,d).call(this).removeEventListener("close",n(this,g))}attributeChangedCallback(t,i,l){var y,k;(k=(y=n(this,v))[t])==null||k.call(y,l,i)}};h=new WeakMap,d=new WeakMap,a=new WeakMap,u=new WeakMap,p=new WeakMap,v=new WeakMap,b=new WeakMap,w=new WeakMap,g=new WeakMap,f=new WeakMap,z=new WeakMap,x=new WeakMap,C=new WeakMap,r(c,"defaultElementName","img-zoom"),r(c,"html",`
		<button id="zoom-in">
			<slot></slot>
		</button>
		<dialog id="modal">
			<div id="content"></div>
			<form method="dialog">
				<button id="zoom-out" autofocus>
					<span class="visually-hidden">close zoom</span>
				</button>
			</form>
		</dialog>
	`),r(c,"css",`
		:host { display: inline-block; }

		::slotted(*) {
			display: inline-block;
			inline-size: 100%;
			block-size: auto;
		}

		button { all: unset; }
		#zoom-in { cursor: zoom-in; }
		#zoom-out { cursor: zoom-out; }
		#zoom-in:disabled { cursor: auto; }

		dialog {
			position: fixed;
			inset: 0;
			max-width: none;
			max-height: none;
			inline-size: 100%;
			block-size: 100%;
			margin: 0;
			padding: 0;
			background: none;
			border: none;
			overflow: visible;
			align-items: center;
			justify-content: center;
			transition:
				display 0.4s allow-discrete,
				overlay 0.4s allow-discrete;
		}

		dialog[open] { display: flex; }

		dialog::backdrop {
			background: oklch(0% 0 0 / 0);
			transition:
				background 0.4s linear,
				display 0.4s allow-discrete,
				overlay 0.4s allow-discrete;
		}

		dialog[open]::backdrop {
			background: oklch(0% 0 0 / 0.5);
		}

		@starting-style {
			dialog[open]::backdrop {
				background: oklch(0% 0 0 / 0);
			}
		}

		#zoom-out {
			position: absolute;
			inset: 0;
			display: block;
			inline-size: 100%;
			block-size: 100%;
		}

		#content {
			inline-size: 95dvi;
			block-size: 95dvb;
		}

		#content img {
			display: block;
			inline-size: 100%;
			block-size: 100%;
			object-fit: contain;
			transform-origin: center center;
		}

		.visually-hidden {
			clip: rect(1px, 1px, 1px, 1px);
			clip-path: inset(50%);
			height: 1px;
			width: 1px;
			margin: -1px;
			overflow: hidden;
			padding: 0;
			position: absolute;
		}

		@supports not (transition-behavior: allow-discrete) {
			dialog {
				display: flex;
				opacity: 0;
				background: oklch(0% 0 0 / 0);
				pointer-events: none;
				transition:
					opacity 0.4s step-end,
					background 0.4s linear;
			}

			dialog[open] {
				opacity: 1;
				background: oklch(0% 0 0 / 0.5);
				pointer-events: auto;
				transition:
					opacity 0.4s step-start,
					background 0.4s linear;
			}

			dialog::backdrop, dialog[open]::backdrop {
				display: none;
			}
		}
	`);let m=c;function H(e){const o=e.naturalWidth/e.naturalHeight;let t=e.clientHeight*o,i=e.clientHeight;return t>e.clientWidth&&(t=e.clientWidth,i=e.clientWidth/o),[t,i]}function R(e){const o=e.getBoundingClientRect();return[o.left+o.width/2,o.top+o.height/2]}function q(e,o){const t=e instanceof HTMLImageElement?e:e.querySelector("img"),i=o instanceof HTMLImageElement?o:o.querySelector("img");if(t==null||i==null)return"scale(1) translate(0px, 0px)";const[l]=H(i),[y]=H(t),[k,M]=R(i),[T,A]=R(t),E=l/y,N=(k-T)/E,W=(M-A)/E;return`scale(${E}) translate(${N}px, ${W}px)`}window.customElements.get(m.defaultElementName)||window.customElements.define(m.defaultElementName,m);
