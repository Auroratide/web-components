function $(){}function K(t,n){for(const e in n)t[e]=n[e];return t}function L(t){return t()}function H(){return Object.create(null)}function p(t){t.forEach(L)}function q(t){return typeof t=="function"}function ft(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function R(t){return Object.keys(t).length===0}function W(t,...n){if(t==null)return $;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function dt(t,n,e){t.$$.on_destroy.push(W(n,e))}function _t(t,n,e,i){if(t){const r=D(t,n,e,i);return t[0](r)}}function D(t,n,e,i){return t[1]&&i?K(e.ctx.slice(),t[1](i(n))):e.ctx}function ht(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const u=[],l=Math.max(n.dirty.length,r.length);for(let o=0;o<l;o+=1)u[o]=n.dirty[o]|r[o];return u}return n.dirty|r}return n.dirty}function mt(t,n,e,i,r,u){if(r){const l=D(n,e,i,u);t.p(l,r)}}function pt(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function yt(t){return t&&q(t.destroy)?t.destroy:$}let A=!1;function Q(){A=!0}function U(){A=!1}function V(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function X(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let c=0;c<n.length;c++){const f=n[c];f.claim_order!==void 0&&s.push(f)}n=s}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let s=0;s<n.length;s++){const c=n[s].claim_order,f=(r>0&&n[e[r]].claim_order<=c?r+1:V(1,r,y=>n[e[y]].claim_order,c))-1;i[s]=e[f]+1;const a=f+1;e[a]=s,r=Math.max(a,r)}const u=[],l=[];let o=n.length-1;for(let s=e[r]+1;s!=0;s=i[s-1]){for(u.push(n[s-1]);o>=s;o--)l.push(n[o]);o--}for(;o>=0;o--)l.push(n[o]);u.reverse(),l.sort((s,c)=>s.claim_order-c.claim_order);for(let s=0,c=0;s<l.length;s++){for(;c<u.length&&l[s].claim_order>=u[c].claim_order;)c++;const f=c<u.length?u[c]:null;t.insertBefore(l[s],f)}}function Y(t,n){if(A){for(X(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function Z(t,n,e){t.insertBefore(n,e||null)}function tt(t,n,e){A&&!e?Y(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function w(t){t.parentNode.removeChild(t)}function G(t){return document.createElement(t)}function nt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function T(t){return document.createTextNode(t)}function gt(){return T(" ")}function xt(){return T("")}function bt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function et(t){return Array.from(t.childNodes)}function O(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function P(t,n,e,i,r=!1){O(t);const u=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const o=t[l];if(n(o)){const s=e(o);return s===void 0?t.splice(l,1):t[l]=s,r||(t.claim_info.last_index=l),o}}for(let l=t.claim_info.last_index-1;l>=0;l--){const o=t[l];if(n(o)){const s=e(o);return s===void 0?t.splice(l,1):t[l]=s,r?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,o}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function it(t,n,e,i){return P(t,r=>r.nodeName===n,r=>{const u=[];for(let l=0;l<r.attributes.length;l++){const o=r.attributes[l];e[o.name]||u.push(o.name)}u.forEach(l=>r.removeAttribute(l))},()=>i(n))}function wt(t,n,e){return it(t,n,e,G)}function rt(t,n){return P(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>T(n),!0)}function $t(t){return rt(t," ")}function M(t,n,e){for(let i=e;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===n)return i}return t.length}function At(t,n){const e=M(t,"HTML_TAG_START",0),i=M(t,"HTML_TAG_END",e);if(e===i)return new C(void 0,n);O(t);const r=t.splice(e,i-e+1);w(r[0]),w(r[r.length-1]);const u=r.slice(1,r.length-1);for(const l of u)l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new C(u,n)}function vt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function Et(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function Nt(t,n=document.body){return Array.from(n.querySelectorAll(t))}class lt{constructor(n=!1){this.is_svg=!1,this.is_svg=n,this.e=this.n=null}c(n){this.h(n)}m(n,e,i=null){this.e||(this.is_svg?this.e=nt(e.nodeName):this.e=G(e.nodeName),this.t=e,this.c(n)),this.i(i)}h(n){this.e.innerHTML=n,this.n=Array.from(this.e.childNodes)}i(n){for(let e=0;e<this.n.length;e+=1)Z(this.t,this.n[e],n)}p(n){this.d(),this.h(n),this.i(this.a)}d(){this.n.forEach(w)}}class C extends lt{constructor(n,e=!1){super(e),this.e=this.n=null,this.l=n}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let e=0;e<this.n.length;e+=1)tt(this.t,this.n[e],n)}}let m;function h(t){m=t}function z(){if(!m)throw new Error("Function called outside component initialization");return m}function Tt(t){z().$$.on_mount.push(t)}function St(t){z().$$.after_update.push(t)}const _=[],k=[],x=[],B=[],F=Promise.resolve();let E=!1;function I(){E||(E=!0,F.then(J))}function jt(){return I(),F}function N(t){x.push(t)}const v=new Set;let g=0;function J(){const t=m;do{for(;g<_.length;){const n=_[g];g++,h(n),st(n.$$)}for(h(null),_.length=0,g=0;k.length;)k.pop()();for(let n=0;n<x.length;n+=1){const e=x[n];v.has(e)||(v.add(e),e())}x.length=0}while(_.length);for(;B.length;)B.pop()();E=!1,v.clear(),h(t)}function st(t){if(t.fragment!==null){t.update(),p(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(N)}}const b=new Set;let d;function Ht(){d={r:0,c:[],p:d}}function Mt(){d.r||p(d.c),d=d.p}function ct(t,n){t&&t.i&&(b.delete(t),t.i(n))}function Ct(t,n,e,i){if(t&&t.o){if(b.has(t))return;b.add(t),d.c.push(()=>{b.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function kt(t){t&&t.c()}function Bt(t,n){t&&t.l(n)}function ot(t,n,e,i){const{fragment:r,on_mount:u,on_destroy:l,after_update:o}=t.$$;r&&r.m(n,e),i||N(()=>{const s=u.map(L).filter(q);l?l.push(...s):p(s),t.$$.on_mount=[]}),o.forEach(N)}function ut(t,n){const e=t.$$;e.fragment!==null&&(p(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function at(t,n){t.$$.dirty[0]===-1&&(_.push(t),I(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Lt(t,n,e,i,r,u,l,o=[-1]){const s=m;h(t);const c=t.$$={fragment:null,ctx:null,props:u,update:$,not_equal:r,bound:H(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(s?s.$$.context:[])),callbacks:H(),dirty:o,skip_bound:!1,root:n.target||s.$$.root};l&&l(c.root);let f=!1;if(c.ctx=e?e(t,n.props||{},(a,y,...S)=>{const j=S.length?S[0]:y;return c.ctx&&r(c.ctx[a],c.ctx[a]=j)&&(!c.skip_bound&&c.bound[a]&&c.bound[a](j),f&&at(t,a)),y}):[],c.update(),f=!0,p(c.before_update),c.fragment=i?i(c.ctx):!1,n.target){if(n.hydrate){Q();const a=et(n.target);c.fragment&&c.fragment.l(a),a.forEach(w)}else c.fragment&&c.fragment.c();n.intro&&ct(t.$$.fragment),ot(t,n.target,n.anchor,n.customElement),U(),J()}h(s)}class qt{$destroy(){ut(this,1),this.$destroy=$}$on(n,e){const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!R(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{$ as A,_t as B,Y as C,mt as D,pt as E,ht as F,yt as G,q as H,dt as I,C as J,Nt as K,At as L,qt as S,gt as a,tt as b,$t as c,Mt as d,xt as e,ct as f,Ht as g,w as h,Lt as i,St as j,G as k,wt as l,et as m,bt as n,Tt as o,Et as p,T as q,rt as r,ft as s,Ct as t,vt as u,kt as v,Bt as w,ot as x,ut as y,jt as z};
