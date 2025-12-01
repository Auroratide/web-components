var b=Object.defineProperty;var w=s=>{throw TypeError(s)};var g=(s,e,t)=>e in s?b(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var l=(s,e,t)=>g(s,typeof e!="symbol"?e+"":e,t),y=(s,e,t)=>e.has(s)||w("Cannot "+t);var a=(s,e,t)=>(y(s,e,"read from private field"),t?t.call(s):e.get(s)),d=(s,e,t)=>e.has(s)?w("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);var u,p,c,v,m;const o=class o extends HTMLElement{constructor(){super();l(this,"previous",()=>{this.selected=this.selected<=0?this.length-1:this.selected-1});l(this,"next",()=>{this.selected=(this.selected+1)%this.length});l(this,"jump",t=>{this.selected=t});l(this,"slides",()=>Array.from(this.querySelectorAll('[slot="slide"]')));l(this,"nav",()=>this.shadowRoot.querySelector('[part="nav"]'));d(this,u,()=>{a(this,p).call(this),a(this,c).call(this)});d(this,p,()=>{const t=this.nav();t.innerHTML="",this.slides().forEach((n,i)=>{const h=document.createElement("button");h.textContent=(i+1).toString(),h.addEventListener("click",()=>this.jump(i)),h.part.add("nav-item");const f=document.createElement("li");f.appendChild(h),t.appendChild(f)})});d(this,c,()=>{const t=Array.from(this.nav().querySelectorAll("button"));this.slides().forEach((n,i)=>{n.setAttribute("aria-hidden",(i!==this.selected).toString()),n.setAttribute("tabindex",i===this.selected?"0":"-1"),t[i].part.toggle("nav-selected",i===this.selected)}),a(this,v).call(this).style.transform=`translateX(${this.selected*-100}%)`,this.dispatchEvent(new CustomEvent("slide-show:change",{detail:{to:this.selected}}))});d(this,v,()=>this.shadowRoot.querySelector(".slides"));d(this,m,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),n=document.createElement("style");n.innerHTML=o.css;const i=document.createElement("template");return i.innerHTML=o.html,t.appendChild(n),t.appendChild(i.content),t});a(this,m).call(this)}static get observedAttributes(){return["selected"]}get selected(){return parseInt(this.getAttribute("selected")??"0")}set selected(t){this.setAttribute("selected",t.toString())}get length(){return this.slides().length}connectedCallback(){var t,n;(t=this.shadowRoot.querySelector("#prev"))==null||t.addEventListener("click",this.previous),(n=this.shadowRoot.querySelector("#next"))==null||n.addEventListener("click",this.next),a(this,u).call(this)}attributeChangedCallback(){a(this,c).call(this)}};u=new WeakMap,p=new WeakMap,c=new WeakMap,v=new WeakMap,m=new WeakMap,l(o,"defaultElementName","slide-show"),l(o,"html",`
		<div class="slide-container">
			<div class="slides" style="transform: translateX(0%);">
				<slot name="slide"></slot>
			</div>
		</div>
		<div class="nav">
			<button id="prev" part="button">Prev</button>
			<ol part="nav"></ol>
			<button id="next" part="button">Next</button>
		</div>
	`),l(o,"css",`
		:host {
			display: block;
			position: relative;
			margin: auto;
		}

		.slides {
			position: relative;
			display: flex;
			flex-direction: row;
			transition: transform var(--slide-show-transition-duration, 0.4s) var(--slide-show-transition-function, ease-out);
			width: var(--slide-show-slide-width, 100%);
			left: calc((100% - var(--slide-show-slide-width, 100%)) / 2);
		}

		::slotted([slot="slide"]) {
			flex: 0 0 100%;
		}

		.slide-container {
			position: relative;
			overflow: hidden;
		}

		.nav {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		[part="nav"] {
			list-style: none;
			padding: 0;
			display: flex;
			flex: 1;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			gap: 0.5em;
		}

		[part="nav-selected"] {
			font-weight: bold;
		}
	`);let r=o;window.customElements.get(r.defaultElementName)||window.customElements.define(r.defaultElementName,r);
