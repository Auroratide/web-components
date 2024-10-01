var T=Object.defineProperty;var R=e=>{throw TypeError(e)};var C=(e,r,t)=>r in e?T(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t;var w=(e,r,t)=>C(e,typeof r!="symbol"?r+"":r,t),S=(e,r,t)=>r.has(e)||R("Cannot "+t);var s=(e,r,t)=>(S(e,r,"read from private field"),t?t.call(e):r.get(e)),n=(e,r,t)=>r.has(e)?R("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(e):r.set(e,t),l=(e,r,t,a)=>(S(e,r,"write to private field"),a?a.call(e,t):r.set(e,t),t),h=(e,r,t)=>(S(e,r,"access private method"),t);const L="flipping",M="flipped";var b,y,u,m,p,f,_,k,o,Z,E,P,x,Y;const g=class g extends HTMLElement{constructor(){super();n(this,o);n(this,b,{keyframes:[{transform:"translateZ(calc(-1 * var(--_depth))) rotateY(-180deg)"},{transform:"translateZ(var(--_height)) rotateY(-270deg)"},{transform:"translateZ(0em) rotateY(-360deg)"}],options:{easing:"ease-in-out"}});n(this,y,{keyframes:[{transform:"translateZ(0em) rotateY(0deg)"},{transform:"translateZ(var(--_height)) rotateY(-90deg)"},{transform:"translateZ(calc(-1 * var(--_depth))) rotateY(-180deg)"}],options:{easing:"ease-in-out"}});n(this,u);n(this,m);n(this,p);n(this,f);n(this,_);n(this,k,{facedown:t=>{h(this,o,x).call(this,L),h(this,o,Z).call(this,t!=null),h(this,o,P).call(this)}});n(this,Y,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),a=document.createElement("style");a.innerHTML=g.css;const i=document.createElement("template");return i.innerHTML=g.html,t.appendChild(a),t.appendChild(i.content),t});s(this,Y).call(this)}static get observedAttributes(){return["facedown"]}get facedown(){return this.hasAttribute("facedown")}set facedown(t){this.toggleAttribute("facedown",t)}flip(){this.facedown=!this.facedown}setFlipToFrontAnimation(t,a){l(this,b,{keyframes:t,options:a})}setFlipToBackAnimation(t,a){l(this,y,{keyframes:t,options:a})}recreateBorderRadius(){var t;(t=s(this,f))==null||t.style.setProperty("--_radius",getComputedStyle(this).borderRadius),h(this,o,E).call(this)}connectedCallback(){l(this,u,this.shadowRoot.querySelector("#side-label-text")),l(this,m,this.shadowRoot.querySelector(".front")),l(this,p,this.shadowRoot.querySelector(".back")),l(this,f,this.shadowRoot.querySelector(".container")),l(this,_,this.shadowRoot.querySelectorAll(".corner")),h(this,o,Z).call(this,this.facedown),this.recreateBorderRadius()}attributeChangedCallback(t,a,i){var d,c;(c=(d=s(this,k))[t])==null||c.call(d,i,a)}};b=new WeakMap,y=new WeakMap,u=new WeakMap,m=new WeakMap,p=new WeakMap,f=new WeakMap,_=new WeakMap,k=new WeakMap,o=new WeakSet,Z=function(t){var a,i,d,c;(a=s(this,m))==null||a.setAttribute("aria-hidden",t.toString()),(i=s(this,p))==null||i.setAttribute("aria-hidden",(!t).toString()),(d=s(this,m))==null||d.toggleAttribute("inert",t),(c=s(this,p))==null||c.toggleAttribute("inert",!t),s(this,u)&&(s(this,u).textContent=t?"(Backside)":"(Frontside)")},E=function(){var a;const t=parseInt(getComputedStyle(this).getPropertyValue("--_granularity"));(a=s(this,_))==null||a.forEach(i=>{i.replaceChildren(...Array.from({length:t}).map((d,c)=>{const A=document.createElement("div");return A.style.setProperty("--_i",c.toString()),A.setAttribute("part","edge"),A}))})},P=function(){var d;const t=q()?0:X(getComputedStyle(this).getPropertyValue("--_duration")),a=this.facedown?s(this,y):s(this,b),i=(d=s(this,f))==null?void 0:d.animate(a.keyframes,{fill:"both",...a.options,duration:t});i==null||i.addEventListener("finish",()=>{i.commitStyles(),h(this,o,x).call(this,M)},{once:!0})},x=function(t){this.dispatchEvent(new CustomEvent(t,{detail:{facedown:this.facedown}}))},Y=new WeakMap,w(g,"defaultElementName","flip-card"),w(g,"html",`
		<p class="visually-hidden" id="side-label-text">(Frontside)</p>
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
	`),w(g,"css",`
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
	`);let v=g;const X=e=>parseFloat(e)*(e.endsWith("ms")?1:1e3),q=()=>{var e,r;return((r=(e=window==null?void 0:window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:r.matches)??!1};window.customElements.get(v.defaultElementName)||window.customElements.define(v.defaultElementName,v);
