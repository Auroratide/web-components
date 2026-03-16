# The textarea-markdown Element

<p hidden><strong><a href="https://components.auroratide.com/textarea-markdown">View this page with live demos!</a></strong></p>

The `textarea-markdown` element represents a textarea which supports [Markdown Syntax](https://www.markdownguide.org/). This component is built with accessibility in mind.

> [!WARNING]
> This component is still in active development and may not implement all the things necessary for an element to be fully form-associated and accessible. If you decide to use this, be sure to update often!

<!--DEMO
<wc-demo>
	<label for="example-01">Some Label</label>
	<textarea-markdown id="example-01" placeholder="Type some text" rows="6"></textarea-markdown>
</wc-demo>
<style>
	label, toggle-switch {
		vertical-align: middle;
	}
</style>
/DEMO-->

```html
<label for="example-01">Some Label</label>
<textarea-markdown id="example-01" placeholder="Type some text" rows="6">
</textarea-markdown>
```

## Installation

You can import through CDN:

```html
<script type="module" src="https://unpkg.com/@auroratide/textarea-markdown/lib/define.js"></script>
```

Or, you may install through [NPM](https://www.npmjs.com/package/@auroratide/textarea-markdown) and include it as part of your build process:

```
$ npm i @auroratide/textarea-markdown
```

```javascript
import '@auroratide/textarea-markdown/lib/define.js'
```

## Usage

`textarea-markdown` is an **inline markup element** that you can use in your HTML document. It is a form control, meaning it is appropriate to properly [label](https://html.spec.whatwg.org/#the-label-element) it like so:

```html
<label for="example-02">Character Description</label>
<textarea-markdown id="example-02"></textarea-markdown>
```

You can start initialize the input with some text as well:

```html
<label for="example-03">Character Description</label>
<textarea-markdown checked id="example-03">
She has **orange** hair and _green_ eyes.
</textarea-markdown>
```

<!--DEMO
<wc-demo>
<label for="example-03">Character Description</label>
<textarea-markdown checked id="example-03" rows="6">
She has **orange** hair and _green_ eyes.
</textarea-markdown>
</wc-demo>
/DEMO-->

### Attributes

| Attribute | Default | Description |
| ------------- | --------- | ------------- |
| `placeholder` | - | Hint text to show when there is no value. |
| `rows` | - | Number of rows to include in the textarea. |
| `cols` | - | Numer of columns to include in the textarea. |
| `disabled` | - | Whether the textarea can be edited. |

### CSS Customization

The `textarea-markdown` is composed of a **menu** with **buttons** and a **textarea** which can be individually customized:

* `menu`: List of markdown controls.
* `button`: A single button that controls markdown formatting.
* `textarea`: The editable input field.

Here's an example showing how to use CSS to customize the appearance:

<!--DEMO
<wc-demo>
	<label id="fancy-textarea-label" for="fancy-textarea">Fancy Textarea</label>
	<textarea-markdown id="fancy-textarea" rows="6"></textarea-markdown>
	<style>
		#fancy-textarea-label {
			display: block;
			margin-block-end: 0.333em;
		}
		#fancy-textarea {
			border: 0.0625em solid oklch(1 0 0 / 0.5);
			border-radius: 0.25em;
		}
		#fancy-textarea:focus {
			border: 0.0625em solid var(--t-primary-b);
		}
		#fancy-textarea::part(menu) {
			background-color: oklch(1 0 0 / 0.125);
			padding: 0.25em 0.5em;
		}
		#fancy-textarea::part(button) {
			border-radius: 0.25em;
			background: none;
			font-size: 87.5%;
		}
		#fancy-textarea::part(button):hover {
			background: oklch(0 0 0 / 0.25);
		}
		#fancy-textarea::part(textarea) {
			border: none;
		}
	</style>
</wc-demo>
/DEMO-->

```css
textarea-markdown {
	border: 0.0625em solid oklch(1 0 0 / 0.5);
	border-radius: 0.25em;
}

textarea-markdown:focus {
	border: 0.0625em solid var(--t-primary-b);
}

textarea-markdown::part(menu) {
	background-color: oklch(1 0 0 / 0.125);
	padding: 0.25em 0.5em;
}

textarea-markdown::part(button) {
	border-radius: 0.25em;
	background: none;
	font-size: 87.5%;
}

textarea-markdown::part(button):hover {
	background: oklch(0 0 0 / 0.25);
}

textarea-markdown::part(textarea) {
	border: none;
}
```
