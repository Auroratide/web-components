var ft=Object.defineProperty;var at=s=>{throw TypeError(s)};var pt=(s,o,t)=>o in s?ft(s,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[o]=t;var l=(s,o,t)=>pt(s,typeof o!="symbol"?o+"":o,t),rt=(s,o,t)=>o.has(s)||at("Cannot "+t);var n=(s,o,t)=>(rt(s,o,"read from private field"),t?t.call(s):o.get(s)),a=(s,o,t)=>o.has(s)?at("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(s):o.set(s,t),h=(s,o,t,e)=>(rt(s,o,"write to private field"),e?e.call(s,t):o.set(s,t),t);const gt="change",dt="commit",bt=(s,o,t)=>new CustomEvent(gt,{detail:{item:s,oldIndex:o,newIndex:t}}),ut=(s,o,t)=>new CustomEvent(dt,{detail:{item:s,oldIndex:o,newIndex:t}});var x,A,C,P,m,F,R,D,V,N,$,M,z,I,y,k,T,U,q,Y;const f=class f extends HTMLElement{constructor(){super();a(this,x,!1);a(this,A,new MutationObserver(()=>{n(this,C).call(this)}));l(this,"list",()=>this.closest(E.defaultElementName));l(this,"handles",()=>this.querySelectorAll(v.defaultElementName));l(this,"defaultHandle",()=>n(this,m)??null);l(this,"handle",()=>this.handles()[0]??n(this,m)??null);l(this,"startDragging",(t=this.handle())=>{t==null||t.focus();for(const r of this.handles())r.dataset.dragging="";const e=setTimeout(()=>n(this,$).call(this),f.START_DRAG_DELAY_MS),i=()=>{clearTimeout(e),document.removeEventListener("pointerup",i),document.removeEventListener("pointercancel",i),document.removeEventListener("contextmenu",i)};document.addEventListener("pointerup",i),document.addEventListener("pointercancel",i),document.addEventListener("contextmenu",i)});a(this,C,()=>{var t;n(this,P).call(this);for(const e of this.handles())(t=e.refreshLabel)==null||t.call(e);n(this,D).call(this)});a(this,P,()=>{const t=this.handles().length>0;n(this,x)&&t===this.hasAttribute("data-has-handle")||(t?(this.dataset.hasHandle="",this.removeEventListener("pointerdown",n(this,N)),n(this,R).call(this)):(delete this.dataset.hasHandle,this.addEventListener("pointerdown",n(this,N)),n(this,F).call(this)),h(this,x,!0))});a(this,m);a(this,F,()=>{var e;if(n(this,m)!=null)return;const t=document.createElement("button");t.type="button",t.setAttribute("part","handle"),t.addEventListener("keydown",n(this,V)),(e=this.shadowRoot)==null||e.insertBefore(t,this.shadowRoot.querySelector("slot")),h(this,m,t),n(this,D).call(this)});a(this,R,()=>{var t;(t=n(this,m))==null||t.remove(),h(this,m,void 0)});a(this,D,()=>{const t=it(this);n(this,m)!=null&&t.length>0&&n(this,m).setAttribute("aria-label",v.labelFor(t))});a(this,V,t=>{t.key===" "&&t.preventDefault()});a(this,N,t=>{t.target instanceof HTMLElement&&t.target.dataset.ignoreReorder!=null||(t.preventDefault(),t.stopPropagation(),this.startDragging())});a(this,$,t=>{t==null||t.preventDefault(),this.dataset.dragging="",n(this,U).call(this),document.addEventListener("pointermove",n(this,M)),document.addEventListener("pointerup",n(this,y)),document.addEventListener("pointercancel",n(this,y)),document.addEventListener("touchmove",n(this,k))});a(this,M,t=>{var st,ot;t.preventDefault();const e=this.list(),i=(e==null?void 0:e.items())??[],r={index:i.indexOf(this),rect:this.getBoundingClientRect()},c=(e==null?void 0:e.nearestVisible(r.index,-1,i))??-1,d=(e==null?void 0:e.nearestVisible(r.index,1,i))??-1,w={index:c,rect:(st=i[c])==null?void 0:st.getBoundingClientRect()},et={index:d,rect:(ot=i[d])==null?void 0:ot.getBoundingClientRect()};w.rect&&n(this,z).call(this,t,w.rect,r.rect)?e==null||e.reorder(r.index,w.index,i):et.rect&&n(this,I).call(this,t,et.rect,r.rect)&&(e==null||e.reorder(r.index,et.index,i))});a(this,z,(t,e,i)=>{var c;return((c=this.list())==null?void 0:c.orientation)==="horizontal"?t.clientX<Math.min(e.left+i.width,e.right):t.clientY<Math.min(e.top+i.height,e.bottom)});a(this,I,(t,e,i)=>{var c;return((c=this.list())==null?void 0:c.orientation)==="horizontal"?t.clientX>Math.max(e.right-i.width,e.left):t.clientY>Math.max(e.bottom-i.height,e.top)});a(this,y,()=>{delete this.dataset.dragging;for(const t of this.handles())delete t.dataset.dragging;document.removeEventListener("pointermove",n(this,M)),document.removeEventListener("pointerup",n(this,y)),document.removeEventListener("pointercancel",n(this,y)),document.removeEventListener("touchmove",n(this,k)),n(this,q).call(this)});a(this,k,t=>{t.preventDefault()});a(this,T);a(this,U,()=>{var t;h(this,T,(t=this.list())==null?void 0:t.items().indexOf(this))});a(this,q,()=>{const t=this.list(),e=(t==null?void 0:t.items().indexOf(this))??-1;t==null||t.dispatchEvent(ut(this,n(this,T)??-1,e)),h(this,T,void 0)});a(this,Y,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=f.css;const i=document.createElement("template");return i.innerHTML=f.html,t.appendChild(e),t.appendChild(i.content),t});n(this,Y).call(this)}connectedCallback(){this.setAttribute("role","listitem"),n(this,A).observe(this,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),n(this,C).call(this)}disconnectedCallback(){n(this,A).disconnect(),h(this,x,!1)}};x=new WeakMap,A=new WeakMap,C=new WeakMap,P=new WeakMap,m=new WeakMap,F=new WeakMap,R=new WeakMap,D=new WeakMap,V=new WeakMap,N=new WeakMap,$=new WeakMap,M=new WeakMap,z=new WeakMap,I=new WeakMap,y=new WeakMap,k=new WeakMap,T=new WeakMap,U=new WeakMap,q=new WeakMap,Y=new WeakMap,l(f,"defaultElementName","reorder-item"),l(f,"html",`
		<slot></slot>
	`),l(f,"css",`
		:host {
			display: list-item;
			touch-action: none;
			cursor: grab;
		}

		:host([hidden]) {
			display: none;
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
	`),l(f,"START_DRAG_DELAY_MS",150);let b=f;const mt=s=>s instanceof HTMLElement&&(s.localName===v.defaultElementName||s.localName===E.defaultElementName)?"":s.nodeType===Node.TEXT_NODE?s.textContent??"":Array.from(s.childNodes).map(mt).join(" "),it=s=>s==null?"":mt(s).replace(/\s+/g," ").trim();var H,G,K,X;const p=class p extends HTMLElement{constructor(){super();l(this,"list",()=>this.closest(E.defaultElementName));l(this,"item",()=>this.closest(b.defaultElementName));a(this,H);l(this,"refreshLabel",()=>{if(n(this,H))return;const t=it(this.item()??this);t.length>0&&this.setAttribute("aria-label",p.labelFor(t))});a(this,G,t=>{var e;t.target instanceof HTMLElement&&t.target.dataset.ignoreReorder!=null||(t.preventDefault(),t.stopPropagation(),(e=this.item())==null||e.startDragging(this))});a(this,K,t=>{t.key===" "&&t.preventDefault()});a(this,X,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=p.css;const i=document.createElement("template");return i.innerHTML=p.html,t.appendChild(e),t.appendChild(i.content),t});n(this,X).call(this)}connectedCallback(){n(this,H)??h(this,H,this.hasAttribute("aria-label")||this.hasAttribute("aria-labelledby")),this.hasAttribute("role")||this.setAttribute("role","button"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.refreshLabel(),this.addEventListener("pointerdown",n(this,G)),this.addEventListener("keydown",n(this,K))}};H=new WeakMap,G=new WeakMap,K=new WeakMap,X=new WeakMap,l(p,"defaultElementName","reorder-handle"),l(p,"labelFor",t=>`Reorder ${t}`),l(p,"html",`
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
	`);let v=p;const lt="data-reorder-list-announcer",ct=()=>{if(typeof document>"u")return null;const s=document.querySelector(`[${lt}]`);if(s!=null)return s;const o=document.createElement("div");return o.setAttribute(lt,""),o.setAttribute("aria-live","polite"),o.setAttribute("aria-atomic","true"),o.style.cssText=["position: absolute","width: 1px","height: 1px","margin: -1px","padding: 0","border: 0","overflow: hidden","white-space: nowrap","clip-path: inset(50%)"].join(";"),document.body.appendChild(o),o},ht=s=>s.checkVisibility({visibilityProperty:!0,contentVisibilityAuto:!0}),nt=()=>{var o;let s=document.activeElement;for(;((o=s==null?void 0:s.shadowRoot)==null?void 0:o.activeElement)!=null;)s=s.shadowRoot.activeElement;return s};var j,O,J,Q,S,W,g,L,Z,B,_,tt;const u=class u extends HTMLElement{constructor(){super();l(this,"items",()=>Array.from(this.querySelectorAll(`:scope > ${b.defaultElementName}`)));l(this,"visibleItems",()=>this.items().filter(ht));l(this,"nearestVisible",(t,e,i=this.items())=>{for(let r=t+e;r>=0&&r<i.length;r+=e)if(ht(i[r]))return r;return-1});l(this,"current",()=>{var e;const t=(e=nt())==null?void 0:e.closest(b.defaultElementName);return(t==null?void 0:t.parentElement)===this?t:null});l(this,"reorder",(t,e,i=this.items())=>{const r=i[t],c=nt();n(this,j).call(this,r,t<e?i[e].nextSibling:i[e]),this.dispatchEvent(bt(r,t,e)),c instanceof HTMLElement&&nt()!==c&&c.focus()});a(this,j,(t,e)=>{if(typeof this.moveBefore=="function")try{this.moveBefore(t,e);return}catch{}this.insertBefore(t,e)});a(this,O);a(this,J,t=>{var w;const e=n(this,_).call(this);if(!e.includes(t.key))return;const i=n(this,W).call(this,t);if(i==null)return;const r=this.items(),c=r.indexOf(i);if(c<0)return;const d=this.nearestVisible(c,t.key===e[0]?-1:1,r);if(!(d<0)){if(t.preventDefault(),t.stopPropagation(),!t.altKey){(w=r[d].handle())==null||w.focus();return}window.clearTimeout(n(this,O)??-1),n(this,Z).call(this,i),this.reorder(c,d,r),h(this,O,window.setTimeout(n(this,B),u.COMMIT_DEBOUNCE_MS)),n(this,S).call(this,i,d,r.length)}});a(this,Q,t=>{const{item:e,oldIndex:i,newIndex:r}=t.detail;i!==r&&n(this,S).call(this,e,r,this.items().length)});a(this,S,(t,e,i)=>{const r=ct(),c=u.announcementFor(it(t),e+1,i);r!=null&&r.textContent!==c&&(r.textContent=c)});a(this,W,t=>{const e=t.composedPath(),i=e.findIndex(d=>d instanceof b);if(i<0)return null;const r=e[i];return e.slice(0,i).some(d=>d instanceof v||d===r.defaultHandle())&&r.list()===this?r:null});a(this,g);a(this,L);a(this,Z,t=>{n(this,g)!=null&&n(this,g)!==t&&n(this,B).call(this),n(this,g)==null&&(h(this,g,t),h(this,L,this.items().indexOf(t)))});a(this,B,()=>{const t=n(this,g);if(t==null)return;const e=this.items().indexOf(t);this.dispatchEvent(ut(t,n(this,L)??-1,e)),h(this,g,void 0),h(this,L,void 0)});a(this,_,()=>this.orientation==="horizontal"?["ArrowLeft","ArrowRight"]:["ArrowUp","ArrowDown"]);a(this,tt,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=u.css;const i=document.createElement("template");return i.innerHTML=u.html,t.appendChild(e),t.appendChild(i.content),t});n(this,tt).call(this)}get orientation(){return this.getAttribute("orientation")??"vertical"}set orientation(t){this.setAttribute("orientation",t)}connectedCallback(){this.setAttribute("role","list"),ct(),this.addEventListener("keydown",n(this,J)),this.addEventListener(dt,n(this,Q))}};j=new WeakMap,O=new WeakMap,J=new WeakMap,Q=new WeakMap,S=new WeakMap,W=new WeakMap,g=new WeakMap,L=new WeakMap,Z=new WeakMap,B=new WeakMap,_=new WeakMap,tt=new WeakMap,l(u,"defaultElementName","reorder-list"),l(u,"COMMIT_DEBOUNCE_MS",1e3),l(u,"announcementFor",(t,e,i)=>`${t}, position ${e} of ${i}`),l(u,"html",`
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
	`);let E=u;window.customElements.get(E.defaultElementName)||window.customElements.define(E.defaultElementName,E);window.customElements.get(b.defaultElementName)||window.customElements.define(b.defaultElementName,b);window.customElements.get(v.defaultElementName)||window.customElements.define(v.defaultElementName,v);
