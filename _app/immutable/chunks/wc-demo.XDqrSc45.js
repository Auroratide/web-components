class t extends HTMLElement{constructor(){super(),this.hidden=!1;const e=this.querySelector('[slot="actions"]')!=null;this.attachShadow({mode:"open"}).innerHTML=`
			<style>
				:host {
					display: block;
					border-radius: 0.25em;
					margin-block: 2em;
				}

				.align-end {
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}

				figure { margin: 0; }

				figcaption {
					border: 0.125em solid var(--t-primary-a);
					background: var(--t-primary-a);
					padding: 0.25em 1em;
					letter-spacing: 0.05ch;
					color: var(--t-fg-b);
					border-radius: 0.25em 0.25em 0 0;
					font-weight: 700;
				}

				.content {
					background: var(--t-bg-b);
					padding: 0;
					border-radius: 0 0 0.25em 0.25em;
				}

				.smaller { font-size: 0.825em; }

				section {
					padding: 1.25em 1.25em;
				}

				footer {
					border-block-start: 0.0625em solid var(--t-bg-a);
					padding: 0.375em;
					font-size: 0.875em;
				}

				footer[hidden] {
					display: none;
				}
			</style>
			<figure>
				<figcaption><span class="smaller">Demo</span></figcaption>
				<div class="content">
					<section>
						<slot></slot>
					</section>
					<footer class="align-end"${e?"":" hidden"}>
						<slot name="actions"></slot>
					</footer>
				</div>
			</figure>
		`}}window.customElements.get("wc-demo")||window.customElements.define("wc-demo",t);export{t as WcDemoElement};
