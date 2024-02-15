var E=Object.defineProperty;var X=(r,e,t)=>e in r?E(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var b=(r,e,t)=>(X(r,typeof e!="symbol"?e+"":e,t),t),A=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)};var o=(r,e,t)=>(A(r,e,"read from private field"),t?t.call(r):e.get(r)),n=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)},l=(r,e,t,a)=>(A(r,e,"write to private field"),a?a.call(r,t):e.set(r,t),t);var d=(r,e,t)=>(A(r,e,"access private method"),t);var m,f,c,u,_,g,S,v,Z,y,R,w;const s=class s extends HTMLElement{constructor(){super();n(this,g);n(this,v);n(this,y);n(this,m,void 0);n(this,f,void 0);n(this,c,void 0);n(this,u,void 0);n(this,_,{facedown:t=>{d(this,g,S).call(this,t!=null),d(this,y,R).call(this)},"corner-accuracy":t=>{d(this,v,Z).call(this,parseInt(t))}});n(this,w,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),a=document.createElement("style");a.innerHTML=s.css;const i=document.createElement("template");return i.innerHTML=s.html,t.appendChild(a),t.appendChild(i.content),t});o(this,w).call(this)}static get observedAttributes(){return["facedown","corner-accuracy"]}get facedown(){return this.hasAttribute("facedown")}set facedown(t){this.toggleAttribute("facedown",t)}get cornerAccuracy(){return parseInt(this.getAttribute("corner-accuracy")??"4")}set cornerAccuracy(t){this.setAttribute("corner-accuracy",t.toString())}flip(){this.facedown=!this.facedown}recalculateBorderRadius(){var t;(t=o(this,c))==null||t.style.setProperty("--_radius",getComputedStyle(this).borderRadius)}connectedCallback(){l(this,m,this.shadowRoot.querySelector(".front")),l(this,f,this.shadowRoot.querySelector(".back")),l(this,c,this.shadowRoot.querySelector(".container")),l(this,u,this.shadowRoot.querySelectorAll(".corner")),d(this,g,S).call(this,this.facedown),d(this,v,Z).call(this,this.cornerAccuracy),this.recalculateBorderRadius()}attributeChangedCallback(t,a,i){var k,p;(p=(k=o(this,_))[t])==null||p.call(k,i,a)}};m=new WeakMap,f=new WeakMap,c=new WeakMap,u=new WeakMap,_=new WeakMap,g=new WeakSet,S=function(t){var a,i;(a=o(this,m))==null||a.setAttribute("aria-hidden",t.toString()),(i=o(this,f))==null||i.setAttribute("aria-hidden",(!t).toString())},v=new WeakSet,Z=function(t){var a;(a=o(this,u))==null||a.forEach(i=>{i.style.setProperty("--_n",t.toString()),i.replaceChildren(...Array.from({length:t}).map((k,p)=>{const Y=document.createElement("div");return Y.style.setProperty("--_i",p.toString()),Y.setAttribute("part","edge"),Y}))})},y=new WeakSet,R=function(){o(this,c)&&(o(this,c).style.animation=this.facedown?"var(--_animation-back)":"var(--_animation-front)")},w=new WeakMap,b(s,"defaultElementName","flip-card"),b(s,"html",`
		<div class="container">
			<div class="front face">
				<slot name="front"></slot>
			</div>
			<div class="back face">
				<slot name="back"></slot>
			</div>
			<div class="top edge" part="edge"></div>
			<div class="top-right corner"></div>
			<div class="right edge" part="edge"></div>
			<div class="bottom-right corner"></div>
			<div class="bottom edge" part="edge"></div>
			<div class="bottom-left corner"></div>
			<div class="left edge" part="edge"></div>
			<div class="top-left corner"></div>
		</div>
	`),b(s,"css",`
		:host {
			--_duration: var(--flip-duration, 0.75s);
			--_height: var(--flip-height, 20em);
			--_depth: var(--card-depth, 0.15em);
			--_animation-front: var(--flip-to-front-animation, flip-to-front linear var(--_duration) 1 both);
			--_animation-back: var(--flip-to-back-animation, flip-to-back linear var(--_duration) 1 both);

			display: block;
			perspective: 100em;
			transform-style: preserve-3d;
		}

		::slotted(*) {
			display: block;
			width: 100%;
			height: 100%;
			border-radius: inherit;
		}

		.container {
			width: 100%;
			height: 100%;
			position: relative;
			transform-style: preserve-3d;
			border-radius: inherit;
		}

		.face {
			width: 100%;
			height: 100%;
			backface-visibility: hidden;
			border-radius: inherit;
		}

		.front {
			transform: rotateY(0deg);
		} .back {
			position: absolute;
			inset: 0;
			transform: translateZ(calc(-1 * var(--_depth))) rotateY(180deg);
		}

		slot { border-radius: inherit; }

		.edge { position: absolute; }

		.right, .left {
			width: var(--_depth);
			height: calc(100% - 2 * var(--_radius));
			inset-block: var(--_radius);
		} .right {
			inset-inline-end: 0;
			transform: rotateY(270deg);
			transform-origin: right center;
		} .left {
			inset-inline-start: 0;
			transform: rotateY(90deg);
			transform-origin: left center;
		}

		.top, .bottom {
			width: calc(100% - 2 * var(--_radius));;
			height: var(--flip-depth);
			inset-inline: var(--_radius);
		} .top {
			inset-block-start: 0;
			transform: rotateX(270deg);
			transform-origin: center top;
		} .bottom {
			inset-block-end: 0;
			transform: rotateX(90deg);
			transform-origin: center bottom;
		}

		.corner {
			position: absolute;
			transform-style: preserve-3d;
		} .corner > * {
			position: absolute;
			inset-block-end: 0;
			width: var(--_depth);
			height: calc(2 * var(--_radius) * sin(45deg / var(--_n)));
			transform-origin: bottom center;
			transform:
				translateZ(calc(var(--_radius) * cos(var(--_i) * 90deg / var(--_n))))
				translateY(calc(-1 * var(--_radius) * sin(var(--_i) * 90deg / var(--_n))))
				rotateX(calc(45deg * (2 * var(--_i) + 1) / var(--_n)));
		}

		.top-right {
			inset-block-start: 0;
			inset-inline-end: 0;

			transform:
				rotateY(90deg)
				translateZ(calc(-1 * var(--_radius)))
				translateY(var(--_radius));
		} .bottom-right {
			inset-block-end: 0;
			inset-inline-end: 0;

			transform:
				rotateY(90deg)
				rotateX(270deg)
				translateZ(calc(-1 * var(--_radius)))
				translateY(var(--_radius));
		} .bottom-left {
			inset-block-end: 0;
			inset-inline-start: 0;

			transform:
				rotateY(90deg)
				rotateX(180deg)
				translateZ(calc(-1 * var(--_radius)))
				translateY(var(--_radius));
		} .top-left {
			inset-block-start: 0;
			inset-inline-start: 0;

			transform:
				rotateY(90deg)
				rotateX(90deg)
				translateZ(calc(-1 * var(--_radius)))
				translateY(var(--_radius));
		}

		:host(:not([facedown])) .container {
			transform: rotateY(0deg);
		} :host([facedown]) .container {
			transform: rotateY(-180deg);
		}

		@keyframes flip-to-back {
			0% {
				transform: translateZ(0em) rotateY(0deg);
				animation-timing-function: ease-in;
			} 50% {
				transform: translateZ(var(--_height)) rotateY(-90deg);
				animation-timing-function: ease-out;
			} 100% {
				transform: translateZ(calc(-1 * var(--_depth))) rotateY(-180deg);
				animation-timing-function: ease-out;
			}
		}

		@keyframes flip-to-front {
			0% {
				transform: translateZ(calc(-1 * var(--_depth))) rotateY(-180deg);
				animation-timing-function: ease-in;
			} 50% {
				transform: translateZ(var(--_height)) rotateY(-270deg);
				animation-timing-function: ease-out;
			} 100% {
				transform: translateZ(0em) rotateY(-360deg);
				animation-timing-function: ease-out;
			}
		}

		@media (prefers-reduced-motion: reduce) {
			.container {
				animation-duration: 0s !important;
			}
		}
	`);let h=s;window.customElements.get(h.defaultElementName)||window.customElements.define(h.defaultElementName,h);
