var L=Object.defineProperty;var M=(e,r,t)=>r in e?L(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t;var k=(e,r,t)=>(M(e,typeof r!="symbol"?r+"":r,t),t),R=(e,r,t)=>{if(!r.has(e))throw TypeError("Cannot "+t)};var s=(e,r,t)=>(R(e,r,"read from private field"),t?t.call(e):r.get(e)),o=(e,r,t)=>{if(r.has(e))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(e):r.set(e,t)},d=(e,r,t,a)=>(R(e,r,"write to private field"),a?a.call(e,t):r.set(e,t),t);var c=(e,r,t)=>(R(e,r,"access private method"),t);const X="flipping",q="flipped";var v,b,g,u,m,p,y,Y,_,E,A,T,S,C,w,P,Z;const h=class h extends HTMLElement{constructor(){super();o(this,_);o(this,A);o(this,S);o(this,w);o(this,v,{keyframes:[{transform:"translateZ(calc(-1 * var(--_depth))) rotateY(-180deg)"},{transform:"translateZ(var(--_height)) rotateY(-270deg)"},{transform:"translateZ(0em) rotateY(-360deg)"}],options:{easing:"ease-in-out"}});o(this,b,{keyframes:[{transform:"translateZ(0em) rotateY(0deg)"},{transform:"translateZ(var(--_height)) rotateY(-90deg)"},{transform:"translateZ(calc(-1 * var(--_depth))) rotateY(-180deg)"}],options:{easing:"ease-in-out"}});o(this,g,void 0);o(this,u,void 0);o(this,m,void 0);o(this,p,void 0);o(this,y,void 0);o(this,Y,{facedown:t=>{c(this,w,P).call(this,X),c(this,_,E).call(this,t!=null),c(this,S,C).call(this)}});o(this,Z,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),a=document.createElement("style");a.innerHTML=h.css;const i=document.createElement("template");return i.innerHTML=h.html,t.appendChild(a),t.appendChild(i.content),t});s(this,Z).call(this)}static get observedAttributes(){return["facedown"]}get facedown(){return this.hasAttribute("facedown")}set facedown(t){this.toggleAttribute("facedown",t)}flip(){this.facedown=!this.facedown}setFlipToFrontAnimation(t,a){d(this,v,{keyframes:t,options:a})}setFlipToBackAnimation(t,a){d(this,b,{keyframes:t,options:a})}recreateBorderRadius(){var t;(t=s(this,p))==null||t.style.setProperty("--_radius",getComputedStyle(this).borderRadius),c(this,A,T).call(this)}connectedCallback(){d(this,g,this.shadowRoot.querySelector("#side-label-text")),d(this,u,this.shadowRoot.querySelector(".front")),d(this,m,this.shadowRoot.querySelector(".back")),d(this,p,this.shadowRoot.querySelector(".container")),d(this,y,this.shadowRoot.querySelectorAll(".corner")),c(this,_,E).call(this,this.facedown),this.recreateBorderRadius()}attributeChangedCallback(t,a,i){var n,l;(l=(n=s(this,Y))[t])==null||l.call(n,i,a)}};v=new WeakMap,b=new WeakMap,g=new WeakMap,u=new WeakMap,m=new WeakMap,p=new WeakMap,y=new WeakMap,Y=new WeakMap,_=new WeakSet,E=function(t){var a,i,n,l;(a=s(this,u))==null||a.setAttribute("aria-hidden",t.toString()),(i=s(this,m))==null||i.setAttribute("aria-hidden",(!t).toString()),(n=s(this,u))==null||n.toggleAttribute("inert",t),(l=s(this,m))==null||l.toggleAttribute("inert",!t),s(this,g)&&(s(this,g).textContent=t?"(Backside)":"(Frontside)")},A=new WeakSet,T=function(){var a;const t=parseInt(getComputedStyle(this).getPropertyValue("--_granularity"));(a=s(this,y))==null||a.forEach(i=>{i.replaceChildren(...Array.from({length:t}).map((n,l)=>{const x=document.createElement("div");return x.style.setProperty("--_i",l.toString()),x.setAttribute("part","edge"),x}))})},S=new WeakSet,C=function(){var n;const t=F()?0:B(getComputedStyle(this).getPropertyValue("--_duration")),a=this.facedown?s(this,b):s(this,v),i=(n=s(this,p))==null?void 0:n.animate(a.keyframes,{fill:"both",...a.options,duration:t});i==null||i.addEventListener("finish",()=>{i.commitStyles(),c(this,w,P).call(this,q)},{once:!0})},w=new WeakSet,P=function(t){this.dispatchEvent(new CustomEvent(t,{detail:{facedown:this.facedown}}))},Z=new WeakMap,k(h,"defaultElementName","flip-card"),k(h,"html",`
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
	`),k(h,"css",`
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
	`);let f=h;const B=e=>parseFloat(e)*(e.endsWith("ms")?1:1e3),F=()=>{var e,r;return((r=(e=window==null?void 0:window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:r.matches)??!1};window.customElements.get(f.defaultElementName)||window.customElements.define(f.defaultElementName,f);
