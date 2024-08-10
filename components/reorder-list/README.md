# The reorder-list Elements

<p hidden><strong><a href="https://auroratide.github.io/web-components/reorder-list">View this page with live demos!</a></strong></p>

The `reorder-list` and `reorder-item` elements represent an ordered list of items that can be reordered. They are built with accessibility in mind and implement the WAI-ARIA guidelines for [rearrangable listboxes](https://www.w3.org/WAI/ARIA/apg/example-index/listbox/listbox-rearrangeable.html).

<!--DEMO
<wc-demo>
	<reorder-list>
		<reorder-item>Apple</reorder-item>
		<reorder-item>Orange</reorder-item>
		<reorder-item>Banana</reorder-item>
		<reorder-item>Lime</reorder-item>
		<reorder-item>Blueberry</reorder-item>
		<reorder-item>Plum</reorder-item>
	</reorder-list>
</wc-demo>
/DEMO-->

```html
<reorder-list>
	<reorder-item>Apple</reorder-item>
	<reorder-item>Orange</reorder-item>
	<reorder-item>Banana</reorder-item>
	<reorder-item>Lime</reorder-item>
	<reorder-item>Blueberry</reorder-item>
	<reorder-item>Plum</reorder-item>
</reorder-list>
```

## Installation

You can import through CDN:

```html
<script type="module" src="https://unpkg.com/@auroratide/reorder-list/lib/define.js"></script>
```

Or, you may install through [NPM](https://www.npmjs.com/package/@auroratide/reorder-list) and include it as part of your build process:

```
$ npm i @auroratide/reorder-list
```

```javascript
import '@auroratide/reorder-list/lib/define.js'
```

## Usage

`reorder-list` and `reorder-item` are **markup elements** that you can use in your HTML document. To use them together, it is best to follow these guidelines:

* `reorder-item` elements **must** be _direct_ descendents of a `reorder-list` element. This is similar to how `li` must directly descend `ol`.

## Orientation

By default, `orientation` is "vertical", meaning you drag items up and down. Setting `orientation` to "horizontal" will allow you to reorder items left and right instead.

<!--DEMO
<wc-demo id="horizontal-demo">
	<reorder-list orientation="horizontal">
		<reorder-item>Apple</reorder-item>
		<reorder-item>Orange</reorder-item>
		<reorder-item>Banana</reorder-item>
		<reorder-item>Kiwi</reorder-item>
	</reorder-list>
</wc-demo>
<style>
	#horizontal-demo reorder-list {
		list-style: none;
		gap: 0.5em;
	}
	#horizontal-demo reorder-item {
		border: 0.0625em solid #2573C1;
		border-radius: 0.125em;
		padding: 0.25em 1em;
	}
</style>
/DEMO-->

```html
<reorder-list orientation="horizontal">
	<reorder-item>Apple</reorder-item>
	<reorder-item>Orange</reorder-item>
	<reorder-item>Banana</reorder-item>
	<reorder-item>Kiwi</reorder-item>
</reorder-list>
```

**Note**: Bidirectional reordering is not possible with this component. `reorder-list` is for _lists_, whereas bidirectional reordering would be for a grid of some kind; they are different semantics.

## Ignoring Reorder Trigger

You may have an element within a `reorder-item` that you do not want triggering a reorder. For instance, an `input` element should not start dragging, and it should instead focus on the `input`.

Use the `data-ignore-reorder` attribute on any element within `reorder-item` in order to make that element not start dragging.

<!--DEMO
<wc-demo id="ignore-reorder">
	<reorder-list>
		<reorder-item>Drag: <input data-ignore-reorder type="text" value="Apple" /></reorder-item>
		<reorder-item>Drag: <input data-ignore-reorder type="text" value="Orange" /></reorder-item>
		<reorder-item>Drag: <input data-ignore-reorder type="text" value="Banana" /></reorder-item>
		<reorder-item>Drag: <input data-ignore-reorder type="text" value="Kiwi" /></reorder-item>
	</reorder-list>
</wc-demo>
/DEMO-->

```html
<reorder-list>
	<reorder-item>Drag: <input data-ignore-reorder type="text" value="Apple" /></reorder-item>
	<reorder-item>Drag: <input data-ignore-reorder type="text" value="Orange" /></reorder-item>
	<reorder-item>Drag: <input data-ignore-reorder type="text" value="Banana" /></reorder-item>
	<reorder-item>Drag: <input data-ignore-reorder type="text" value="Kiwi" /></reorder-item>
</reorder-list>
```

## CSS Customization

Since these are native custom elements, they can be styled the same way as regular HTML elements.

Of note:

* `reorder-item[data-dragging]` will style the currently dragged item.

Here's an example of a customized list meant to look like reorderable cards.

<!--DEMO
<wc-demo id="fancy">
	<reorder-list>
		<reorder-item>
			<strong>Cobb Salad</strong>
			<ul>
					<li>chicken</li>
					<li>egg</li>
					<li>tomato</li>
			</ul>
		</reorder-item>
		<reorder-item>
			<strong>Fried Rice</strong>
			<ul>
					<li>rice</li>
					<li>shrimp</li>
					<li>egg</li>
			</ul>
		</reorder-item>
		<reorder-item>
			<strong>Chimichanga</strong>
			<ul>
					<li>chicken</li>
					<li>beans</li>
			</ul>
		</reorder-item>
		<reorder-item>
			<strong>Banana Pancake</strong>
			<ul>
					<li>breakfast</li>
					<li>banana</li>
			</ul>
		</reorder-item>
		<reorder-item>
			<strong>Philly Cheese Sandwich</strong>
			<ul>
					<li>steak</li>
					<li>cheese</li>
					<li>bread</li>
			</ul>
		</reorder-item>
	</reorder-list>
</wc-demo>
<style>
	#fancy reorder-list {
		list-style: none;
		background: #ddd;
		border-radius: 0.5em;
		width: min(400px, 100%);
		padding: 0.5em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
	#fancy reorder-item {
		background: #fff;
		border-radius: 0.25em;
		padding: 0.5em;
		box-shadow: 0 0.1em 0.15em #0002;
	}
	#fancy ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
		padding: 0;
		margin: 0;
		font-size: 90%;
		color: #2573C1;
	}
</style>
/DEMO-->

```css
reorder-list {
	list-style: none;
	background: #ddd;
	border-radius: 0.5em;
	width: min(400px, 100%);
	padding: 0.5em;
	display: flex;
	flex-direction: column;
	gap: 0.5em;
}

reorder-item {
	background: #fff;
	border-radius: 0.25em;
	padding: 0.5em;
	box-shadow: 0 0.1em 0.15em #0002;
}

reorder-item ul {
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	gap: 0.5em;
	padding: 0;
	margin: 0;
	font-size: 90%;
	color: #2573C1;
}
```

## Events

The `reorder-list` element dispatches the following events:

| Name | When Triggered |
| ------------- | ------------- |
| `change` | Whenever an item in the list is reordered |
| `commit` | At the end of an item being dragged |

Both events contain a reference to the item that was reordered, its previous position in the list, and its new position.

```js
list.addEventListener('change', e => {
	console.log(e.detail.item)
	console.log(e.detail.oldIndex)
	console.log(e.detail.newIndex)
})
```

The difference between `change` and `commit` is the `change` event happens any time an element changes order, including in the middle of a drag. The `commit` event only triggers at the end of a drag, so the old index in that event's details will represent the position of that item prior to the drag being started.

## Accessibility

This custom element is build with accessibility in mind! It follows the WAI-ARIA guidelines for [rearrangable listboxes](https://www.w3.org/WAI/ARIA/apg/example-index/listbox/listbox-rearrangeable.html) (the `listbox` and `option` roles).

* When focus enters the list, focus goes to the currently active list item.
* <kbd>Up</kbd> and <kbd>Down</kbd> can be used to navigate the list, focusing on an element that will be reordered.
* <kbd>Alt</kbd> + <kbd>Up</kbd>/<kbd>Down</kbd> moves the currently selected list item up or down in the order.
* If orientation is horizontal, then <kbd>Left</kbd> and <kbd>Right</kbd> are used instead.
