var ht=Object.defineProperty;var st=s=>{throw TypeError(s)};var ut=(s,o,t)=>o in s?ht(s,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[o]=t;var l=(s,o,t)=>ut(s,typeof o!="symbol"?o+"":o,t),ot=(s,o,t)=>o.has(s)||st("Cannot "+t);var n=(s,o,t)=>(ot(s,o,"read from private field"),t?t.call(s):o.get(s)),a=(s,o,t)=>o.has(s)?st("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(s):o.set(s,t),h=(s,o,t,e)=>(ot(s,o,"write to private field"),e?e.call(s,t):o.set(s,t),t);const mt="change",lt="commit",ft=(s,o,t)=>new CustomEvent(mt,{detail:{item:s,oldIndex:o,newIndex:t}}),ct=(s,o,t)=>new CustomEvent(lt,{detail:{item:s,oldIndex:o,newIndex:t}});var y,A,C,P,m,F,R,D,$,M,z,N,U,q,w,k,x,Y,G,K;const f=class f extends HTMLElement{constructor(){super();a(this,y,!1);a(this,A,new MutationObserver(()=>{n(this,C).call(this)}));l(this,"list",()=>this.closest(E.defaultElementName));l(this,"handles",()=>this.querySelectorAll(b.defaultElementName));l(this,"defaultHandle",()=>n(this,m)??null);l(this,"handle",()=>this.handles()[0]??n(this,m)??null);l(this,"startDragging",(t=this.handle())=>{t==null||t.focus();for(const r of this.handles())r.dataset.dragging="";const e=setTimeout(()=>n(this,z).call(this),f.START_DRAG_DELAY_MS),i=()=>{clearTimeout(e),document.removeEventListener("pointerup",i),document.removeEventListener("pointercancel",i),document.removeEventListener("contextmenu",i)};document.addEventListener("pointerup",i),document.addEventListener("pointercancel",i),document.addEventListener("contextmenu",i)});a(this,C,()=>{var t;n(this,P).call(this);for(const e of this.handles())(t=e.refreshLabel)==null||t.call(e);n(this,D).call(this)});a(this,P,()=>{const t=this.handles().length>0;n(this,y)&&t===this.hasAttribute("data-has-handle")||(t?(this.dataset.hasHandle="",this.removeEventListener("pointerdown",n(this,M)),n(this,R).call(this)):(delete this.dataset.hasHandle,this.addEventListener("pointerdown",n(this,M)),n(this,F).call(this)),h(this,y,!0))});a(this,m);a(this,F,()=>{var e;if(n(this,m)!=null)return;const t=document.createElement("button");t.type="button",t.setAttribute("part","handle"),t.addEventListener("keydown",n(this,$)),(e=this.shadowRoot)==null||e.insertBefore(t,this.shadowRoot.querySelector("slot")),h(this,m,t),n(this,D).call(this)});a(this,R,()=>{var t;(t=n(this,m))==null||t.remove(),h(this,m,void 0)});a(this,D,()=>{const t=nt(this);n(this,m)!=null&&t.length>0&&n(this,m).setAttribute("aria-label",b.labelFor(t))});a(this,$,t=>{t.key===" "&&t.preventDefault()});a(this,M,t=>{t.target instanceof HTMLElement&&t.target.dataset.ignoreReorder!=null||(t.preventDefault(),t.stopPropagation(),this.startDragging())});a(this,z,t=>{t==null||t.preventDefault(),this.dataset.dragging="",n(this,Y).call(this),document.addEventListener("pointermove",n(this,N)),document.addEventListener("pointerup",n(this,w)),document.addEventListener("pointercancel",n(this,w)),document.addEventListener("touchmove",n(this,k))});a(this,N,t=>{var L,it;t.preventDefault();const e=this.list(),i=(e==null?void 0:e.items())??[],r={index:i.indexOf(this),rect:this.getBoundingClientRect()},c={index:r.index-1,rect:(L=i[r.index-1])==null?void 0:L.getBoundingClientRect()},d={index:r.index+1,rect:(it=i[r.index+1])==null?void 0:it.getBoundingClientRect()};c.rect&&n(this,U).call(this,t,c.rect,r.rect)?e==null||e.reorder(r.index,c.index,i):d.rect&&n(this,q).call(this,t,d.rect,r.rect)&&(e==null||e.reorder(r.index,d.index,i))});a(this,U,(t,e,i)=>{var c;return((c=this.list())==null?void 0:c.orientation)==="horizontal"?t.clientX<Math.min(e.left+i.width,e.right):t.clientY<Math.min(e.top+i.height,e.bottom)});a(this,q,(t,e,i)=>{var c;return((c=this.list())==null?void 0:c.orientation)==="horizontal"?t.clientX>Math.max(e.right-i.width,e.left):t.clientY>Math.max(e.bottom-i.height,e.top)});a(this,w,()=>{delete this.dataset.dragging;for(const t of this.handles())delete t.dataset.dragging;document.removeEventListener("pointermove",n(this,N)),document.removeEventListener("pointerup",n(this,w)),document.removeEventListener("pointercancel",n(this,w)),document.removeEventListener("touchmove",n(this,k)),n(this,G).call(this)});a(this,k,t=>{t.preventDefault()});a(this,x);a(this,Y,()=>{var t;h(this,x,(t=this.list())==null?void 0:t.items().indexOf(this))});a(this,G,()=>{const t=this.list(),e=(t==null?void 0:t.items().indexOf(this))??-1;t==null||t.dispatchEvent(ct(this,n(this,x)??-1,e)),h(this,x,void 0)});a(this,K,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=f.css;const i=document.createElement("template");return i.innerHTML=f.html,t.appendChild(e),t.appendChild(i.content),t});n(this,K).call(this)}connectedCallback(){this.setAttribute("role","listitem"),n(this,A).observe(this,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),n(this,C).call(this)}disconnectedCallback(){n(this,A).disconnect(),h(this,y,!1)}};y=new WeakMap,A=new WeakMap,C=new WeakMap,P=new WeakMap,m=new WeakMap,F=new WeakMap,R=new WeakMap,D=new WeakMap,$=new WeakMap,M=new WeakMap,z=new WeakMap,N=new WeakMap,U=new WeakMap,q=new WeakMap,w=new WeakMap,k=new WeakMap,x=new WeakMap,Y=new WeakMap,G=new WeakMap,K=new WeakMap,l(f,"defaultElementName","reorder-item"),l(f,"html",`
		<slot></slot>
	`),l(f,"css",`
		:host {
			display: list-item;
			touch-action: none;
			cursor: grab;
		}

		:host(:not([data-has-handle])) {
			position: relative;
		}

		:host([data-has-handle]) {
			cursor: auto;
			touch-action: auto;
		}

		:host([data-dragging]) {
			opacity: 0.5;
			cursor: grabbing;
		}

		/*
		 * The default handle is a keyboard affordance only: the whole item is
		 * already draggable by pointer, and an overlay that caught clicks would
		 * block any link or button inside the item. It stays invisible so that
		 * existing layouts are undisturbed, appearing only once focused.
		 */
		button[part~="handle"] {
			position: absolute;
			inset: 0;
			margin: 0;
			padding: 0;
			border: none;
			background: none;
			font: inherit;
			color: inherit;
			opacity: 0;
			pointer-events: none;
			border-radius: 0.125em;
			outline: 0.125em solid currentColor;
			outline-offset: 0.125em;
		}

		button[part~="handle"]:focus-visible {
			opacity: 1;
		}
	`),l(f,"START_DRAG_DELAY_MS",150);let v=f;const dt=s=>s instanceof HTMLElement&&(s.localName===b.defaultElementName||s.localName===E.defaultElementName)?"":s.nodeType===Node.TEXT_NODE?s.textContent??"":Array.from(s.childNodes).map(dt).join(" "),nt=s=>s==null?"":dt(s).replace(/\s+/g," ").trim();var H,X,j,I;const p=class p extends HTMLElement{constructor(){super();l(this,"list",()=>this.closest(E.defaultElementName));l(this,"item",()=>this.closest(v.defaultElementName));a(this,H);l(this,"refreshLabel",()=>{if(n(this,H))return;const t=nt(this.item()??this);t.length>0&&this.setAttribute("aria-label",p.labelFor(t))});a(this,X,t=>{var e;t.target instanceof HTMLElement&&t.target.dataset.ignoreReorder!=null||(t.preventDefault(),t.stopPropagation(),(e=this.item())==null||e.startDragging(this))});a(this,j,t=>{t.key===" "&&t.preventDefault()});a(this,I,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=p.css;const i=document.createElement("template");return i.innerHTML=p.html,t.appendChild(e),t.appendChild(i.content),t});n(this,I).call(this)}connectedCallback(){n(this,H)??h(this,H,this.hasAttribute("aria-label")||this.hasAttribute("aria-labelledby")),this.hasAttribute("role")||this.setAttribute("role","button"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.refreshLabel(),this.addEventListener("pointerdown",n(this,X)),this.addEventListener("keydown",n(this,j))}};H=new WeakMap,X=new WeakMap,j=new WeakMap,I=new WeakMap,l(p,"defaultElementName","reorder-handle"),l(p,"labelFor",t=>`Reorder ${t}`),l(p,"html",`
		<slot></slot>
	`),l(p,"css",`
		:host {
			display: inline-block;
			touch-action: none;
			cursor: grab;
		}

		:host([data-dragging]) {
			cursor: grabbing;
		}
	`);let b=p;const at="data-reorder-list-announcer",rt=()=>{if(typeof document>"u")return null;const s=document.querySelector(`[${at}]`);if(s!=null)return s;const o=document.createElement("div");return o.setAttribute(at,""),o.setAttribute("aria-live","polite"),o.setAttribute("aria-atomic","true"),o.style.cssText=["position: absolute","width: 1px","height: 1px","margin: -1px","padding: 0","border: 0","overflow: hidden","white-space: nowrap","clip-path: inset(50%)"].join(";"),document.body.appendChild(o),o},et=()=>{var o;let s=document.activeElement;for(;((o=s==null?void 0:s.shadowRoot)==null?void 0:o.activeElement)!=null;)s=s.shadowRoot.activeElement;return s};var J,O,Q,V,S,W,g,T,Z,B,_,tt;const u=class u extends HTMLElement{constructor(){super();l(this,"items",()=>Array.from(this.querySelectorAll(`:scope > ${v.defaultElementName}`)));l(this,"current",()=>{var e;const t=(e=et())==null?void 0:e.closest(v.defaultElementName);return(t==null?void 0:t.parentElement)===this?t:null});l(this,"reorder",(t,e,i=this.items())=>{const r=i[t],c=et();n(this,J).call(this,r,t<e?i[e].nextSibling:i[e]),this.dispatchEvent(ft(r,t,e)),c instanceof HTMLElement&&et()!==c&&c.focus()});a(this,J,(t,e)=>{if(typeof this.moveBefore=="function")try{this.moveBefore(t,e);return}catch{}this.insertBefore(t,e)});a(this,O);a(this,Q,t=>{var L;const e=n(this,_).call(this);if(!e.includes(t.key))return;const i=n(this,W).call(this,t);if(i==null)return;const r=this.items(),c=r.indexOf(i),d=Math.max(0,Math.min(r.length-1,c+(t.key===e[0]?-1:1)));if(!(c<0||c===d)){if(t.preventDefault(),t.stopPropagation(),!t.altKey){(L=r[d].handle())==null||L.focus();return}window.clearTimeout(n(this,O)??-1),n(this,Z).call(this,i),this.reorder(c,d,r),h(this,O,window.setTimeout(n(this,B),u.COMMIT_DEBOUNCE_MS)),n(this,S).call(this,i,d,r.length)}});a(this,V,t=>{const{item:e,oldIndex:i,newIndex:r}=t.detail;i!==r&&n(this,S).call(this,e,r,this.items().length)});a(this,S,(t,e,i)=>{const r=rt(),c=u.announcementFor(nt(t),e+1,i);r!=null&&r.textContent!==c&&(r.textContent=c)});a(this,W,t=>{const e=t.composedPath(),i=e.findIndex(d=>d instanceof v);if(i<0)return null;const r=e[i];return e.slice(0,i).some(d=>d instanceof b||d===r.defaultHandle())&&r.list()===this?r:null});a(this,g);a(this,T);a(this,Z,t=>{n(this,g)!=null&&n(this,g)!==t&&n(this,B).call(this),n(this,g)==null&&(h(this,g,t),h(this,T,this.items().indexOf(t)))});a(this,B,()=>{const t=n(this,g);if(t==null)return;const e=this.items().indexOf(t);this.dispatchEvent(ct(t,n(this,T)??-1,e)),h(this,g,void 0),h(this,T,void 0)});a(this,_,()=>this.orientation==="horizontal"?["ArrowLeft","ArrowRight"]:["ArrowUp","ArrowDown"]);a(this,tt,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=u.css;const i=document.createElement("template");return i.innerHTML=u.html,t.appendChild(e),t.appendChild(i.content),t});n(this,tt).call(this)}get orientation(){return this.getAttribute("orientation")??"vertical"}set orientation(t){this.setAttribute("orientation",t)}connectedCallback(){this.setAttribute("role","list"),rt(),this.addEventListener("keydown",n(this,Q)),this.addEventListener(lt,n(this,V))}};J=new WeakMap,O=new WeakMap,Q=new WeakMap,V=new WeakMap,S=new WeakMap,W=new WeakMap,g=new WeakMap,T=new WeakMap,Z=new WeakMap,B=new WeakMap,_=new WeakMap,tt=new WeakMap,l(u,"defaultElementName","reorder-list"),l(u,"COMMIT_DEBOUNCE_MS",1e3),l(u,"announcementFor",(t,e,i)=>`${t}, position ${e} of ${i}`),l(u,"html",`
		<slot></slot>
	`),l(u,"css",`
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
	`);let E=u;window.customElements.get(E.defaultElementName)||window.customElements.define(E.defaultElementName,E);window.customElements.get(v.defaultElementName)||window.customElements.define(v.defaultElementName,v);window.customElements.get(b.defaultElementName)||window.customElements.define(b.defaultElementName,b);
