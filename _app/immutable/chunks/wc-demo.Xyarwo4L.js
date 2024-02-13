class e extends HTMLElement{constructor(){super(),this.hidden=!1,this.attachShadow({mode:"open"}).innerHTML=`
			<style>
				:host {
					display: block;
					border: 0.0625em solid var(--c-primary);
					border-radius: 0.25em;
					padding: 0.75em;
					box-shadow: 0.125em 0.125em 0.25em hsla(0, 0%, 0%, 0.15) inset;
					background: var(--c-content-off);
					margin-bottom: 1.5rem;
				}

				.align-end {
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}
			</style>
			<slot></slot>
			<div class="align-end">
				<slot name="actions"></slot>
			</div>
		`}}window.customElements.get("wc-demo")||window.customElements.define("wc-demo",e);export{e as WcDemoElement};
