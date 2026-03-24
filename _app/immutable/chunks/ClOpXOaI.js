var K=Object.defineProperty;var X=o=>{throw TypeError(o)};var U=(o,n,t)=>n in o?K(o,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[n]=t;var c=(o,n,t)=>U(o,typeof n!="symbol"?n+"":n,t),$=(o,n,t)=>n.has(o)||X("Cannot "+t);var s=(o,n,t)=>($(o,n,"read from private field"),t?t.call(o):n.get(o)),r=(o,n,t)=>n.has(o)?X("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(o):n.set(o,t),E=(o,n,t,e)=>($(o,n,"write to private field"),e?e.call(o,t):n.set(o,t),t);const j="change",J="commit",Q=(o,n,t)=>new CustomEvent(j,{detail:{item:o,oldIndex:n,newIndex:t}}),V=(o,n,t)=>new CustomEvent(J,{detail:{item:o,oldIndex:n,newIndex:t}});var x,M;const u=class u extends HTMLElement{constructor(){super();c(this,"list",()=>this.closest(p.defaultElementName));c(this,"item",()=>this.closest(d.defaultElementName));r(this,x,t=>{t.target instanceof HTMLElement&&t.target.dataset.ignoreReorder!=null||(t.preventDefault(),t.stopPropagation(),this.item().startDragging())});r(this,M,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=u.css;const i=document.createElement("template");return i.innerHTML=u.html,t.appendChild(e),t.appendChild(i.content),t});s(this,M).call(this)}connectedCallback(){this.addEventListener("pointerdown",s(this,x))}};x=new WeakMap,M=new WeakMap,c(u,"defaultElementName","reorder-handle"),c(u,"html",`
		<slot></slot>
	`),c(u,"css",`
		:host {
			display: inline-block;
			touch-action: none;
			cursor: grab;
		}
		
		:host([data-dragging]) {
			cursor: grabbing;
		}
	`);let v=u;var g,w,A,L,T,y,D,N,f,C,b,k,S,H,O;const h=class h extends HTMLElement{constructor(){super();r(this,g,!1);r(this,w,new MutationObserver(()=>{s(this,A).call(this)}));c(this,"list",()=>this.closest(p.defaultElementName));c(this,"handles",()=>this.querySelectorAll(v.defaultElementName));c(this,"startDragging",()=>{this.list().changeFocus(this);for(const i of this.handles())i.dataset.dragging="";const t=setTimeout(()=>s(this,T).call(this),h.START_DRAG_DELAY_MS),e=()=>{clearTimeout(t),document.removeEventListener("pointerup",e),document.removeEventListener("pointercancel",e),document.removeEventListener("contextmenu",e)};document.addEventListener("pointerup",e),document.addEventListener("pointercancel",e),document.addEventListener("contextmenu",e)});r(this,A,()=>{const t=this.handles().length>0;(this.dataset.hasHandle||!s(this,g))&&!t&&(delete this.dataset.hasHandle,this.addEventListener("pointerdown",s(this,L))),(!this.dataset.hasHandle||!s(this,g))&&t&&(this.dataset.hasHandle="",this.removeEventListener("pointerdown",s(this,L))),E(this,g,!0)});r(this,L,t=>{t.target instanceof HTMLElement&&t.target.dataset.ignoreReorder!=null||(t.preventDefault(),t.stopPropagation(),this.startDragging())});r(this,T,t=>{t==null||t.preventDefault(),this.dataset.dragging="",s(this,k).call(this),document.addEventListener("pointermove",s(this,y)),document.addEventListener("pointerup",s(this,f)),document.addEventListener("pointercancel",s(this,f)),document.addEventListener("touchmove",s(this,C))});r(this,y,t=>{var G,R;t.preventDefault();const e=this.list(),i=e.items(),a={index:i.indexOf(this),rect:this.getBoundingClientRect()},l={index:a.index-1,rect:(G=i[a.index-1])==null?void 0:G.getBoundingClientRect()},q={index:a.index+1,rect:(R=i[a.index+1])==null?void 0:R.getBoundingClientRect()};l.rect&&s(this,D).call(this,t,l.rect,a.rect)?e.reorder(a.index,l.index,i):q.rect&&s(this,N).call(this,t,q.rect,a.rect)&&e.reorder(a.index,q.index,i)});r(this,D,(t,e,i)=>this.list().orientation==="horizontal"?t.clientX<Math.min(e.left+i.width,e.right):t.clientY<Math.min(e.top+i.height,e.bottom));r(this,N,(t,e,i)=>this.list().orientation==="horizontal"?t.clientX>Math.max(e.right-i.width,e.left):t.clientY>Math.max(e.bottom-i.height,e.top));r(this,f,()=>{delete this.dataset.dragging;for(const t of this.handles())delete t.dataset.dragging;document.removeEventListener("pointermove",s(this,y)),document.removeEventListener("pointerup",s(this,f)),document.removeEventListener("pointercancel",s(this,f)),document.removeEventListener("touchmove",s(this,C)),s(this,S).call(this)});r(this,C,t=>{t.preventDefault()});r(this,b);r(this,k,()=>{E(this,b,this.list().items().indexOf(this))});r(this,S,()=>{const t=this.list(),e=t.items().indexOf(this);t.dispatchEvent(V(this,s(this,b),e)),E(this,b,void 0)});r(this,H,()=>{const t=this.list().items(),e=t.find(i=>i.getAttribute("aria-selected")==="true")==null;this===t[0]&&e?this.setAttribute("aria-selected","true"):this.setAttribute("aria-selected","false")});r(this,O,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=h.css;const i=document.createElement("template");return i.innerHTML=h.html,t.appendChild(e),t.appendChild(i.content),t});s(this,O).call(this)}static get observedAttributes(){return["aria-selected"]}connectedCallback(){this.setAttribute("role","option"),this.hasAttribute("aria-selected")||s(this,H).call(this),s(this,w).observe(this,{attributes:!1,childList:!0,subtree:!0}),s(this,A).call(this)}disconnectedCallback(){s(this,w).disconnect(),E(this,g,!1)}attributeChangedCallback(){this.setAttribute("tabindex",this.getAttribute("aria-selected")==="true"?"0":"-1")}};g=new WeakMap,w=new WeakMap,A=new WeakMap,L=new WeakMap,T=new WeakMap,y=new WeakMap,D=new WeakMap,N=new WeakMap,f=new WeakMap,C=new WeakMap,b=new WeakMap,k=new WeakMap,S=new WeakMap,H=new WeakMap,O=new WeakMap,c(h,"defaultElementName","reorder-item"),c(h,"html",`
		<slot></slot>
	`),c(h,"css",`
		:host {
			display: list-item;
			touch-action: none;
			cursor: grab;
		}

		:host([data-has-handle]) {
			cursor: auto;
			touch-action: auto;
		}
		
		:host([data-dragging]) {
			opacity: 0.5;
			cursor: grabbing;
		}
	`),c(h,"START_DRAG_DELAY_MS",150);let d=h;var F,P,z,B,Y;const m=class m extends HTMLElement{constructor(){super();r(this,F,{orientation:()=>{s(this,B).call(this)}});c(this,"items",()=>Array.from(this.querySelectorAll(`:scope > ${d.defaultElementName}`)));c(this,"current",()=>this.querySelector(`:scope > ${d.defaultElementName}[tabindex="0"]`));c(this,"reorder",(t,e,i=this.items())=>{const a=i[t];t<e?i[e].after(a):this.insertBefore(a,i[e]),this.dispatchEvent(Q(a,t,e)),i[t].focus()});c(this,"changeFocus",(t,e=this.items())=>{e.forEach(i=>{i.setAttribute("aria-selected","false")}),t.setAttribute("aria-selected","true"),t.focus()});r(this,P,t=>{const e=s(this,z).call(this);if(e.includes(t.key)){const i=this.items();i.indexOf(this.current());let a=i.indexOf(this.current());a<0&&(a=0);const l=Math.max(0,Math.min(i.length-1,a+(t.key===e[0]?-1:1)));t.altKey&&a!==l?(t.preventDefault(),t.stopPropagation(),this.reorder(a,l,i)):a!==l&&(t.preventDefault(),t.stopPropagation(),this.changeFocus(i[l],i))}});r(this,z,()=>this.orientation==="horizontal"?["ArrowLeft","ArrowRight"]:["ArrowUp","ArrowDown"]);r(this,B,()=>{this.setAttribute("aria-orientation",this.orientation)});r(this,Y,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=m.css;const i=document.createElement("template");return i.innerHTML=m.html,t.appendChild(e),t.appendChild(i.content),t});s(this,Y).call(this)}static get observedAttributes(){return["orientation"]}get orientation(){return this.getAttribute("orientation")??"vertical"}set orientation(t){this.setAttribute("orientation",t)}attributeChangedCallback(t,e,i){var a,l;(l=(a=s(this,F))[t])==null||l.call(a,i,e)}connectedCallback(){this.setAttribute("role","listbox"),this.addEventListener("keydown",s(this,P))}};F=new WeakMap,P=new WeakMap,z=new WeakMap,B=new WeakMap,Y=new WeakMap,c(m,"defaultElementName","reorder-list"),c(m,"html",`
		<slot></slot>
	`),c(m,"css",`
		:host {
			display: block;
			list-style: disc;
			padding-left: 1em;
		}

		:host([orientation="horizontal"]) {
			display: flex;
			flex-direction: row;
			list-style-position: inside;
		}
	`);let p=m;window.customElements.get(p.defaultElementName)||window.customElements.define(p.defaultElementName,p);window.customElements.get(d.defaultElementName)||window.customElements.define(d.defaultElementName,d);window.customElements.get(v.defaultElementName)||window.customElements.define(v.defaultElementName,v);
