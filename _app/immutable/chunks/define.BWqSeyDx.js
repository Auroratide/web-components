var j=Object.defineProperty;var B=(e,o,t)=>o in e?j(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t;var d=(e,o,t)=>(B(e,typeof o!="symbol"?o+"":o,t),t),R=(e,o,t)=>{if(!o.has(e))throw TypeError("Cannot "+t)};var n=(e,o,t)=>(R(e,o,"read from private field"),t?t.call(e):o.get(e)),s=(e,o,t)=>{if(o.has(e))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(e):o.set(e,t)},q=(e,o,t,i)=>(R(e,o,"write to private field"),i?i.call(e,t):o.set(e,t),t);function D({duration:e=400}={}){return(o,t)=>({keyframes:[{transform:G(t,o)},{transform:"scale(1) translate(0px, 0px)"}],options:{duration:e}})}function F({duration:e=400}={}){return()=>({keyframes:[{opacity:0},{opacity:1}],options:{duration:e}})}function A(e){const o=e.naturalWidth/e.naturalHeight;let t=e.clientHeight*o,i=e.clientHeight;return t>e.clientWidth&&(t=e.clientWidth,i=e.clientWidth/o),[t,i]}function T(e){const o=e.getBoundingClientRect();return[o.left+o.width/2,o.top+o.height/2]}function G(e,o){const t=e instanceof HTMLImageElement?e:e.querySelector("img"),i=o instanceof HTMLImageElement?o:o.querySelector("img");if(t==null||i==null)return"scale(1) translate(0px, 0px)";const[c]=A(t),[w]=A(i),[v,I]=T(t),[N,W]=T(i),M=w/c,O=(N-v)/M,$=(W-I)/M;return`scale(${M}) translate(${O}px, ${$}px)`}var z,x,u,a,r,h,m,E,g,b,C,f,y,L,S,k,H;const l=class l extends HTMLElement{constructor(){super();s(this,z,D({duration:400}));s(this,x,F({duration:400}));d(this,"zoomIn",()=>{n(this,a).call(this).showModal(),n(this,C).call(this)});d(this,"zoomOut",()=>{n(this,a).call(this).close()});s(this,u,()=>this.shadowRoot.querySelector("#zoom-in"));s(this,a,()=>this.shadowRoot.querySelector("#modal"));s(this,r,()=>this.shadowRoot.querySelector("#content"));s(this,h,()=>this.shadowRoot.querySelector("slot"));s(this,m,()=>n(this,h).call(this).assignedElements()[0]);s(this,E,{disabled:t=>{n(this,u).call(this).disabled=t!=null}});s(this,g,()=>{const t=n(this,m).call(this).cloneNode(!0);"alt"in t&&(t.alt+=" (zoomed)"),t.setAttribute("part","content"),n(this,r).call(this).replaceChildren(t)});s(this,b,()=>{const t=n(this,k).call(this,n(this,m).call(this)),i=n(this,k).call(this,n(this,r).call(this).firstElementChild);if(!(t==null||i==null))return J()?n(this,x).call(this,t,i):n(this,z).call(this,t,i)});s(this,C,()=>{n(this,L).call(this);const t=n(this,b).call(this);t!=null&&n(this,r).call(this).animate(t.keyframes,{...t.options,fill:"none",easing:"ease-out"})});s(this,f,()=>{n(this,S).call(this);const t=n(this,b).call(this);t!=null&&n(this,r).call(this).animate(t.keyframes,{...t.options,direction:"reverse",fill:"none",easing:"ease-in"})});s(this,y,void 0);s(this,L,()=>{q(this,y,document.body.style.overflow),document.body.style.overflow="hidden"});s(this,S,()=>document.body.style.overflow=n(this,y));s(this,k,t=>t instanceof HTMLImageElement?t:t.querySelector("img"));s(this,H,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),i=document.createElement("style");i.innerHTML=l.css;const c=document.createElement("template");return c.innerHTML=l.html,t.appendChild(i),t.appendChild(c.content),t});n(this,H).call(this)}static get observedAttributes(){return["disabled"]}get disabled(){return this.hasAttribute("disabled")}set disabled(t){this.toggleAttribute("disabled",t)}connectedCallback(){n(this,u).call(this).addEventListener("click",this.zoomIn),n(this,h).call(this).addEventListener("slotchange",n(this,g)),n(this,a).call(this).addEventListener("close",n(this,f))}disconnectedCallback(){n(this,u).call(this).removeEventListener("click",this.zoomIn),n(this,h).call(this).removeEventListener("slotchange",n(this,g)),n(this,a).call(this).removeEventListener("close",n(this,f))}attributeChangedCallback(t,i,c){var w,v;(v=(w=n(this,E))[t])==null||v.call(w,c,i)}};z=new WeakMap,x=new WeakMap,u=new WeakMap,a=new WeakMap,r=new WeakMap,h=new WeakMap,m=new WeakMap,E=new WeakMap,g=new WeakMap,b=new WeakMap,C=new WeakMap,f=new WeakMap,y=new WeakMap,L=new WeakMap,S=new WeakMap,k=new WeakMap,H=new WeakMap,d(l,"defaultElementName","img-zoom"),d(l,"html",`
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
	`),d(l,"css",`
		:host { display: inline-block; }

		:host(:focus-within) {
			outline: 2px solid Highlight;
			outline: 2px auto -webkit-focus-ring-color;
			outline-offset: 2px;
		}

		::slotted(*) {
			display: block;
			inline-size: 100%;
			block-size: auto;
		}

		button {
			all: unset;
			display: block;
		}
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
	`);let p=l;const J=()=>{var e,o;return((o=(e=window==null?void 0:window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:o.matches)??!1};window.customElements.get(p.defaultElementName)||window.customElements.define(p.defaultElementName,p);
