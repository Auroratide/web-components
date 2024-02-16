var L=Object.defineProperty;var X=(e,r,t)=>r in e?L(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t;var w=(e,r,t)=>(X(e,typeof r!="symbol"?r+"":r,t),t),E=(e,r,t)=>{if(!r.has(e))throw TypeError("Cannot "+t)};var o=(e,r,t)=>(E(e,r,"read from private field"),t?t.call(e):r.get(e)),s=(e,r,t)=>{if(r.has(e))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(e):r.set(e,t)},n=(e,r,t,a)=>(E(e,r,"write to private field"),a?a.call(e,t):r.set(e,t),t);var d=(e,r,t)=>(E(e,r,"access private method"),t);const q="flipping",B="flipped";var m,f,u,v,h,p,k,b,P,Y,R,A,C,y,T,S;const c=class c extends HTMLElement{constructor(){super();s(this,b);s(this,Y);s(this,A);s(this,y);s(this,m,{keyframes:[{transform:"translateZ(calc(-1 * var(--_depth))) rotateY(-180deg)"},{transform:"translateZ(var(--_height)) rotateY(-270deg)"},{transform:"translateZ(0em) rotateY(-360deg)"}],options:{easing:"ease-in-out"}});s(this,f,{keyframes:[{transform:"translateZ(0em) rotateY(0deg)"},{transform:"translateZ(var(--_height)) rotateY(-90deg)"},{transform:"translateZ(calc(-1 * var(--_depth))) rotateY(-180deg)"}],options:{easing:"ease-in-out"}});s(this,u,void 0);s(this,v,void 0);s(this,h,void 0);s(this,p,void 0);s(this,k,{facedown:t=>{d(this,y,T).call(this,q),d(this,b,P).call(this,t!=null),d(this,A,C).call(this)}});s(this,S,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),a=document.createElement("style");a.innerHTML=c.css;const i=document.createElement("template");return i.innerHTML=c.html,t.appendChild(a),t.appendChild(i.content),t});o(this,S).call(this)}static get observedAttributes(){return["facedown"]}get facedown(){return this.hasAttribute("facedown")}set facedown(t){this.toggleAttribute("facedown",t)}flip(){this.facedown=!this.facedown}setFlipToFrontAnimation(t,a){n(this,m,{keyframes:t,options:a})}setFlipToBackAnimation(t,a){n(this,f,{keyframes:t,options:a})}recreateBorderRadius(){var t;(t=o(this,h))==null||t.style.setProperty("--_radius",getComputedStyle(this).borderRadius),d(this,Y,R).call(this)}connectedCallback(){n(this,u,this.shadowRoot.querySelector(".front")),n(this,v,this.shadowRoot.querySelector(".back")),n(this,h,this.shadowRoot.querySelector(".container")),n(this,p,this.shadowRoot.querySelectorAll(".corner")),d(this,b,P).call(this,this.facedown),this.recreateBorderRadius()}attributeChangedCallback(t,a,i){var l,_;(_=(l=o(this,k))[t])==null||_.call(l,i,a)}};m=new WeakMap,f=new WeakMap,u=new WeakMap,v=new WeakMap,h=new WeakMap,p=new WeakMap,k=new WeakMap,b=new WeakSet,P=function(t){var a,i;(a=o(this,u))==null||a.setAttribute("aria-hidden",t.toString()),(i=o(this,v))==null||i.setAttribute("aria-hidden",(!t).toString())},Y=new WeakSet,R=function(){var a;const t=parseInt(getComputedStyle(this).getPropertyValue("--_granularity"));(a=o(this,p))==null||a.forEach(i=>{i.replaceChildren(...Array.from({length:t}).map((l,_)=>{const Z=document.createElement("div");return Z.style.setProperty("--_i",_.toString()),Z.setAttribute("part","edge"),Z}))})},A=new WeakSet,C=function(){var l;const t=I(getComputedStyle(this).getPropertyValue("--_duration")),a=this.facedown?o(this,f):o(this,m),i=(l=o(this,h))==null?void 0:l.animate(a.keyframes,{duration:t,fill:"both",...a.options});i==null||i.addEventListener("finish",()=>{i.commitStyles(),d(this,y,T).call(this,B)},{once:!0})},y=new WeakSet,T=function(t){this.dispatchEvent(new CustomEvent(t,{detail:{facedown:this.facedown}}))},S=new WeakMap,w(c,"defaultElementName","flip-card"),w(c,"html",`
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
	`),w(c,"css",`
		:host {
			--_duration: var(--flip-duration, 0.75s);
			--_height: var(--flip-height, 20em);
			--_depth: var(--card-depth, 0.15em);
			--_granularity: var(--corner-granularity, 4);

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
			width: calc(100% - 2 * var(--_radius));
			height: var(--_depth);
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
			height: calc(2 * var(--_radius) * sin(45deg / var(--_granularity)));
			transform-origin: bottom center;
			transform:
				translateZ(calc(var(--_radius) * cos(var(--_i) * 90deg / var(--_granularity))))
				translateY(calc(-1 * var(--_radius) * sin(var(--_i) * 90deg / var(--_granularity))))
				rotateX(calc(45deg * (2 * var(--_i) + 1) / var(--_granularity)));
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

		@media (prefers-reduced-motion: reduce) {
			.container {
				--_duraction: 0s;
			}
		}
	`);let g=c;const I=e=>parseFloat(e)*(e.endsWith("ms")?1:1e3);window.customElements.get(g.defaultElementName)||window.customElements.define(g.defaultElementName,g);
