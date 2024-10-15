# The arched-text Element

<p hidden><strong><a href="https://components.auroratide.com/arched-text">View this page with live demos!</a></strong></p>

The `arched-text` element represents text shaped into an arch.

<!--DEMO
<wc-demo>
	<p style="margin-block-start: 1em;"><arched-text amount="0.5" style="font-size: 2em;">This text is arched!</arched-text></p>
</wc-demo>
/DEMO-->

```html
<arched-text>This text is arched!</arched-text>
```

## Installation

You can import through CDN:

```html
<script type="module" src="https://unpkg.com/@auroratide/arched-text/lib/define.js"></script>
```

Or, you may install through [NPM](https://www.npmjs.com/package/@auroratide/arched-text) and include it as part of your build process:

```
$ npm i @auroratide/arched-text
```

```javascript
import '@auroratide/arched-text/lib/define.js'
```

## Usage

`arched-text` is a **markup element** that can be used in your HTML. It only accepts text as children.

You can use the `amount` attribute to adjust the amount of arching. It is a decimal number from 0 to 1.

* The minumum value of 0 means no arching, basically just flat text.
* The maximum value of 1 means infinite arching, which... doesn't actually render anything. Probably for the best.
* By default it is 0.33333.

```html
<arched-text>Default arch</arched-text>
<arched-text amount="0.6667">More arching</arched-text>
<arched-text amount="0.1">Less arching</arched-text>
```

<!--DEMO
<wc-demo>
	<p><arched-text>Default arch</arched-text></p>
	<p><arched-text amount="0.6667">More arching</arched-text></p>
	<p><arched-text amount="0.1">Less arching</arched-text></p>
</wc-demo>
/DEMO-->

## Accessibility

The element represents its textual content. That's it, I don't have anything else to say 🙂
