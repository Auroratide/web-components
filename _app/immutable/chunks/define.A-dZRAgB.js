var W=Object.defineProperty;var B=(e,o,t)=>o in e?W(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t;var h=(e,o,t)=>(B(e,typeof o!="symbol"?o+"":o,t),t),H=(e,o,t)=>{if(!o.has(e))throw TypeError("Cannot "+t)};var n=(e,o,t)=>(H(e,o,"read from private field"),t?t.call(e):o.get(e)),s=(e,o,t)=>{if(o.has(e))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(e):o.set(e,t)},R=(e,o,t,i)=>(H(e,o,"write to private field"),i?i.call(e,t):o.set(e,t),t);const j="cubic-bezier(0.33, 1, 0.68, 1)";function U({duration:e=400}={}){return(o,t)=>{const i=G(t,o);return[{keyframes:[{transform:`scale(${i.scale})`},{transform:"scale(1)"}],options:{duration:e,easing:"ease-out"}},{keyframes:[{transform:`translate(${i.tx}px, ${i.ty}px)`},{transform:"translate(0px, 0px)"}],options:{duration:e,easing:j}}]}}function D({duration:e=400}={}){return()=>[{keyframes:[{opacity:0},{opacity:1}],options:{duration:e}}]}function T(e){const o=e.naturalWidth/e.naturalHeight;let t=e.clientHeight*o,i=e.clientHeight;return t>e.clientWidth&&(t=e.clientWidth,i=e.clientWidth/o),[t,i]}function q(e){const o=e.getBoundingClientRect();return[o.left+o.width/2,o.top+o.height/2]}function G(e,o){const t=e instanceof HTMLImageElement?e:e.querySelector("img"),i=o instanceof HTMLImageElement?o:o.querySelector("img");if(t==null||i==null)return{scale:1,tx:0,ty:0};const[a]=T(t),[l]=T(i),[u,$]=q(t),[I,F]=q(i),M=l/a,N=(I-u)/M,O=(F-$)/M;return{scale:M,tx:N,ty:O}}var w,x,p,c,d,m,f,E,g,y,C,k,z,A,L,v,S;const r=class r extends HTMLElement{constructor(){super();s(this,w,U({duration:400}));s(this,x,D({duration:400}));h(this,"zoomIn",()=>{n(this,c).call(this).showModal(),n(this,C).call(this)});h(this,"zoomOut",()=>{n(this,c).call(this).close()});s(this,p,()=>this.shadowRoot.querySelector("#zoom-in"));s(this,c,()=>this.shadowRoot.querySelector("#modal"));s(this,d,()=>this.shadowRoot.querySelector("#content"));s(this,m,()=>this.shadowRoot.querySelector("slot"));s(this,f,()=>n(this,m).call(this).assignedElements()[0]);s(this,E,{disabled:t=>{n(this,p).call(this).disabled=t!=null}});s(this,g,()=>{const t=n(this,f).call(this).cloneNode(!0);"alt"in t&&(t.alt+=" (zoomed)"),t.setAttribute("part","content"),n(this,d).call(this).replaceChildren(t)});s(this,y,()=>{const t=n(this,v).call(this,n(this,f).call(this)),i=n(this,v).call(this,n(this,d).call(this).firstElementChild);if(!(t==null||i==null))return J()?n(this,x).call(this,t,i):n(this,w).call(this,t,i)});s(this,C,()=>{n(this,A).call(this);const t=n(this,y).call(this),i=a=>n(this,d).call(this).animate(a.keyframes,{easing:"ease-out",...a.options,fill:"none",composite:"add"});Array.isArray(t)?t==null||t.forEach(i):i(t)});s(this,k,()=>{n(this,L).call(this);const t=n(this,y).call(this),i=a=>{var l;return n(this,d).call(this).animate(a.keyframes,{...a.options,easing:K(((l=a.options)==null?void 0:l.easing)??"ease-out"),fill:"none",direction:"reverse",composite:"add"})};Array.isArray(t)?t==null||t.forEach(i):i(t)});s(this,z,void 0);s(this,A,()=>{R(this,z,document.body.style.overflow),document.body.style.overflow="hidden"});s(this,L,()=>document.body.style.overflow=n(this,z));s(this,v,t=>t instanceof HTMLImageElement?t:t.querySelector("img"));s(this,S,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),i=document.createElement("style");i.innerHTML=r.css;const a=document.createElement("template");return a.innerHTML=r.html,t.appendChild(i),t.appendChild(a.content),t});n(this,S).call(this)}static get observedAttributes(){return["disabled"]}get disabled(){return this.hasAttribute("disabled")}set disabled(t){this.toggleAttribute("disabled",t)}connectedCallback(){n(this,p).call(this).addEventListener("click",this.zoomIn),n(this,m).call(this).addEventListener("slotchange",n(this,g)),n(this,c).call(this).addEventListener("close",n(this,k))}disconnectedCallback(){n(this,p).call(this).removeEventListener("click",this.zoomIn),n(this,m).call(this).removeEventListener("slotchange",n(this,g)),n(this,c).call(this).removeEventListener("close",n(this,k))}attributeChangedCallback(t,i,a){var l,u;(u=(l=n(this,E))[t])==null||u.call(l,a,i)}};w=new WeakMap,x=new WeakMap,p=new WeakMap,c=new WeakMap,d=new WeakMap,m=new WeakMap,f=new WeakMap,E=new WeakMap,g=new WeakMap,y=new WeakMap,C=new WeakMap,k=new WeakMap,z=new WeakMap,A=new WeakMap,L=new WeakMap,v=new WeakMap,S=new WeakMap,h(r,"defaultElementName","img-zoom"),h(r,"html",`
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
	`),h(r,"css",`
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
	`);let b=r;const J=()=>{var e,o;return((o=(e=window==null?void 0:window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:o.matches)??!1},K=e=>{const o={linear:"linear",ease:"cubic-bezier(0.75, 0, 0.75, 0.9)","ease-in":"cubic-bezier(0, 0, 0.58, 1)","ease-out":"cubic-bezier(0.42, 0, 1, 1)","ease-in-out":"ease-in-out"};if(o[e]!=null)return o[e];const t=e.match(/cubic-bezier\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/);if(t){const i=parseFloat(t[1]),a=parseFloat(t[2]),l=parseFloat(t[3]),u=parseFloat(t[4]);return`cubic-bezier(${1-l}, ${1-u}, ${1-i}, ${1-a})`}return console.warn("inverted linear() or steps() functions not yet supported; using same function instead"),e};window.customElements.get(b.defaultElementName)||window.customElements.define(b.defaultElementName,b);
