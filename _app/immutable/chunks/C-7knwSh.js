var B=Object.defineProperty;var H=e=>{throw TypeError(e)};var D=(e,o,t)=>o in e?B(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t;var c=(e,o,t)=>D(e,typeof o!="symbol"?o+"":o,t),R=(e,o,t)=>o.has(e)||H("Cannot "+t);var i=(e,o,t)=>(R(e,o,"read from private field"),t?t.call(e):o.get(e)),s=(e,o,t)=>o.has(e)?H("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(e):o.set(e,t),T=(e,o,t,n)=>(R(e,o,"write to private field"),n?n.call(e,t):o.set(e,t),t);function G({duration:e=400}={}){return(o,t)=>{const n=K(t,o);return[{keyframes:[{transform:`translate(${n.tx}px, ${n.ty}px) scale(${n.scale})`},{transform:"translate(0px, 0px) scale(1)"}],options:{duration:e}}]}}function J({duration:e=400}={}){return()=>[{keyframes:[{opacity:0},{opacity:1}],options:{duration:e}}]}function q(e){const o=e.naturalWidth/e.naturalHeight;let t=e.clientHeight*o,n=e.clientHeight;return t>e.clientWidth&&(t=e.clientWidth,n=e.clientWidth/o),[t,n]}function $(e){const o=e.getBoundingClientRect();return[o.left+o.width/2,o.top+o.height/2]}function K(e,o){const t=e instanceof HTMLImageElement?e:e.querySelector("img"),n=o instanceof HTMLImageElement?o:o.querySelector("img");if(t==null||n==null)return{scale:1,tx:0,ty:0};const[a]=q(t),[l]=q(n),[h,F]=$(t),[N,I]=$(n),O=l/a,W=N-h,j=I-F;return{scale:O,tx:W,ty:j}}var x,E,m,p,d,u,A,f,C,g,y,M,k,z,L,v,w,S;const r=class r extends HTMLElement{constructor(){super();s(this,x,G({duration:400}));s(this,E,J({duration:400}));s(this,m,new MutationObserver(()=>{i(this,g).call(this)}));c(this,"zoomIn",()=>{i(this,d).call(this).showModal(),i(this,M).call(this)});c(this,"zoomOut",()=>{i(this,d).call(this).close()});s(this,p,()=>this.shadowRoot.querySelector("#zoom-in"));s(this,d,()=>this.shadowRoot.querySelector("#modal"));s(this,u,()=>this.shadowRoot.querySelector("#content"));s(this,A,()=>this.shadowRoot.querySelector("slot"));s(this,f,()=>i(this,A).call(this).assignedElements()[0]);s(this,C,{disabled:t=>{i(this,p).call(this).disabled=t!=null}});s(this,g,()=>{var n;const t=(n=i(this,f).call(this))==null?void 0:n.cloneNode(!0);t&&("alt"in t&&(t.alt+=" (zoomed)"),t.setAttribute("part","content"),i(this,u).call(this).replaceChildren(t))});s(this,y,()=>{const t=i(this,w).call(this,i(this,f).call(this)),n=i(this,w).call(this,i(this,u).call(this).firstElementChild);if(!(t==null||n==null))return P()?i(this,E).call(this,t,n):i(this,x).call(this,t,n)});s(this,M,()=>{i(this,L).call(this);const t=i(this,y).call(this),n=a=>i(this,u).call(this).animate(a.keyframes,{easing:r.defaultAnimation,...a.options,fill:"none",composite:"add"});Array.isArray(t)?t==null||t.forEach(n):n(t)});s(this,k,()=>{i(this,v).call(this);const t=i(this,y).call(this),n=a=>{var l;return i(this,u).call(this).animate(a.keyframes,{...a.options,easing:Q(((l=a.options)==null?void 0:l.easing)??r.defaultAnimation),fill:"none",direction:"reverse",composite:"add"})};Array.isArray(t)?t==null||t.forEach(n):n(t)});s(this,z);s(this,L,()=>{T(this,z,document.body.style.overflow),document.body.style.overflow="hidden"});s(this,v,()=>document.body.style.overflow=i(this,z));s(this,w,t=>t instanceof HTMLImageElement?t:t.querySelector("img"));s(this,S,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),n=document.createElement("style");n.innerHTML=r.css;const a=document.createElement("template");return a.innerHTML=r.html,t.appendChild(n),t.appendChild(a.content),t});i(this,S).call(this)}static get observedAttributes(){return["disabled"]}get disabled(){return this.hasAttribute("disabled")}set disabled(t){this.toggleAttribute("disabled",t)}connectedCallback(){i(this,p).call(this).addEventListener("click",this.zoomIn),i(this,d).call(this).addEventListener("close",i(this,k)),i(this,m).observe(this,{attributes:!0,childList:!0,subtree:!0}),i(this,g).call(this)}disconnectedCallback(){i(this,p).call(this).removeEventListener("click",this.zoomIn),i(this,d).call(this).removeEventListener("close",i(this,k)),i(this,m).disconnect(),i(this,v).call(this)}attributeChangedCallback(t,n,a){var l,h;(h=(l=i(this,C))[t])==null||h.call(l,a,n)}};x=new WeakMap,E=new WeakMap,m=new WeakMap,p=new WeakMap,d=new WeakMap,u=new WeakMap,A=new WeakMap,f=new WeakMap,C=new WeakMap,g=new WeakMap,y=new WeakMap,M=new WeakMap,k=new WeakMap,z=new WeakMap,L=new WeakMap,v=new WeakMap,w=new WeakMap,S=new WeakMap,c(r,"defaultElementName","img-zoom"),c(r,"defaultAnimation","cubic-bezier(0.25, 1, 0.5, 1)"),c(r,"html",`
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
	`),c(r,"css",`
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
	`);let b=r;const P=()=>{var e,o;return((o=(e=window==null?void 0:window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:o.matches)??!1},Q=e=>{const o={linear:"linear",ease:"cubic-bezier(0.75, 0, 0.75, 0.9)","ease-in":"cubic-bezier(0, 0, 0.58, 1)","ease-out":"cubic-bezier(0.42, 0, 1, 1)","ease-in-out":"ease-in-out"};if(o[e]!=null)return o[e];const t=e.match(/cubic-bezier\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/);if(t){const n=parseFloat(t[1]),a=parseFloat(t[2]),l=parseFloat(t[3]),h=parseFloat(t[4]);return`cubic-bezier(${1-l}, ${1-h}, ${1-n}, ${1-a})`}return console.warn("inverted linear() or steps() functions not yet supported; using same function instead"),e};window.customElements.get(b.defaultElementName)||window.customElements.define(b.defaultElementName,b);
