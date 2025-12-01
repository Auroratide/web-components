var x=Object.defineProperty;var v=s=>{throw TypeError(s)};var f=(s,e,t)=>e in s?x(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var r=(s,e,t)=>f(s,typeof e!="symbol"?e+"":e,t),C=(s,e,t)=>e.has(s)||v("Cannot "+t);var n=(s,e,t)=>(C(s,e,"read from private field"),t?t.call(s):e.get(s)),g=(s,e,t)=>e.has(s)?v("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);var h,a,w;const o=class o extends HTMLElement{constructor(){super();g(this,h,new MutationObserver(()=>n(this,a).call(this)));g(this,a,()=>{const t=this.shadowRoot.querySelector("svg"),c=this.shadowRoot.querySelector("path"),u=this.shadowRoot.querySelector("title"),p=this.shadowRoot.querySelector("textPath"),b=this.textContent,d=7*b.length,i=this.amount*d/2,m=Math.sqrt(d*d-4*i*i);t.setAttribute("viewBox",`0 0 ${m} ${i+1}`),c.setAttribute("d",`M 0 ${i+1} Q ${m/2} ${-i} ${m} ${i+1}`),u.innerHTML=b,p.setAttribute("textLength",d.toString()),p.innerHTML=b,t.style.inlineSize=`${m/16}em`});g(this,w,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),c=document.createElement("style");c.innerHTML=o.css;const u=document.createElement("template");return u.innerHTML=o.html,t.appendChild(c),t.appendChild(u.content),t});n(this,w).call(this)}static get observedAttributes(){return["amount"]}get amount(){return parseFloat(this.getAttribute("amount")??`${o.DEFAULT_ARCH_AMOUNT}`)}set amount(t){this.setAttribute("amount",t.toString())}connectedCallback(){n(this,a).call(this),n(this,h).observe(this,{subtree:!0,childList:!0})}disconnectedCallback(){n(this,h).disconnect()}attributeChangedCallback(){n(this,a).call(this)}};h=new WeakMap,a=new WeakMap,w=new WeakMap,r(o,"defaultElementName","arched-text"),r(o,"DEFAULT_ARCH_AMOUNT",.33333),r(o,"html",`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {archWidth} {archHeight}" role="presentation">
			<defs>
				<path id="path" />
			</defs>
			<title></title>
			<text fill="currentColor">
				<textPath xlink:href="#path" text-anchor="middle" startOffset="50%"></textPath>
			</text>
		</svg>
	`),r(o,"css",`
		:host, svg {
			display: inline-block;
		}

		svg {
			overflow: visible;
		} text {
			font-size: 1rem;
		}
	`);let l=o;window.customElements.get(l.defaultElementName)||window.customElements.define(l.defaultElementName,l);
