# The flip-card Element

<p hidden><strong><a href="https://auroratide.github.io/web-components/flip-card">View this page with live demos!</a></strong></p>

The `flip-card` element represents content with a front side and a back side, with one side presented at a time.

<!--DEMO
<wc-demo class="flip-card-demo">
	<flip-card class="default">
		<section slot="front">
			<p>The front!</p>
		</section>
		<section slot="back">
			<p>The back!</p>
		</section>
	</flip-card>
	<div slot="actions">
		<button>Flip!</button>
	</div>
</wc-demo>
/DEMO-->

```html
<flip-card>
	<section slot="front">
		<p>The front!</p>
	</section>
	<section slot="back">
		<p>The back!</p>
	</section>
</flip-card>
```


## Installation

You can import through CDN:

```html
<script type="module" src="https://unpkg.com/@auroratide/flip-card/lib/define.js"></script>
```

Or, you may install through [NPM](https://www.npmjs.com/package/@auroratide/flip-card) and include it as part of your build process:

```
$ npm i @auroratide/flip-card
```

```javascript
import "@auroratide/flip-card/lib/define.js"
```


## Usage

`flip-card` is a **markup element** that can be used in your HTML. When you use it, you must specify a **front** slot and a **back** slot, using the `slot` attribute on the direct descendents.

```html
<flip-card>
	<section slot="front">
		<p>The front!</p>
	</section>
	<section slot="back">
		<p>The back!</p>
	</section>
</flip-card>
```

### Controlling the visible side

By default, the front of the card is show, and the backside is hidden. Using the `facedown` attribute, you can make the backside show instead.

<!--DEMO
<wc-demo class="flip-card-demo">
	<flip-card class="default" facedown>
		<section slot="front">
			<p>The front!</p>
		</section>
		<section slot="back">
			<p>The back!</p>
		</section>
	</flip-card>
	<div slot="actions">
		<button>Flip!</button>
	</div>
</wc-demo>
/DEMO-->

```html
<flip-card facedown>
	<!-- ... -->
</flip-card>
```

### Flipping the card

You can flip a card with Javascript by either setting its `facedown` property, or by calling the `flip()` method on the element.

```js
const card = document.querySelector("flip-card")

card.facedown = true

card.flip()
```

## Customizing the Card

Since it's Just HTML<sup>TM</sup>, you can use good ol' CSS to customize the card, with a few special things you can do.

```css
flip-card {
	width: 15em;
	height: 20em;
}
```

### Card Edges

Like in real life, these cards have some thickness! The effect is subtle, but makes a great difference in how the flip feels.

* The `--card-depth` CSS propery lets you customize the card's thickness.
* The `::part(edge)` CSS selector lets you customize the edge's color and other properties.

<!--DEMO
<wc-demo class="flip-card-demo">
	<flip-card class="coin">
		<section slot="front">
			<p>Heads</p>
		</section>
		<section slot="back">
			<p>Tails</p>
		</section>
	</flip-card>
	<div slot="actions">
		<button>Flip!</button>
	</div>
</wc-demo>
/DEMO-->

```css
flip-card {
	--card-depth: 1em;
}

flip-card::part(edge) {
	background-color: oklch(20% 0.066 255);
}
```

### Rounded corners

* Use the `border-radius` CSS property to make rounded corners, but it must be a single absolute length.
* The `--corner-granularity` CSS property is an integer that represents how smooth the 3D curve is on a card's rounded corners. Higher is smoother; default is `4`.
* Call `recreateBorderRadius()` anytime the card's sizes or border-radius's sizes change.

`border-radius` on the card rounds the corners (mostly) like you would expect. It's a bit of a magic trick to make the card's edge rounded, as curved 3D surfaces don't exist in HTML/CSS. As a result there are some limitations.

The following won't look very good unless the card's thickness is 0.

* Percentage-based border radius (e.g. `border-radius: 50%`)
* Different border radii for different corners (e.g. `border-radius: 1em 0.5em`)
* Elliptical border radius (e.g. `border-radius: 1em / 0.5em`)
* Dynamically changing the border radius on the fly

Additionally, because curved 3D surfaces don't exist, the element must _simulate_ a curved surface using lots of small flat surfaces. You can use the `--corner-granularity` CSS property to control how smooth the border-radius looks edge-on. In general, if you have a large border radius, you want a bigger `--corner-granularity`. It is an integer.

For example, the first coin has low corner granularity, and the second coin has high corner granularity.

<!--DEMO
<wc-demo class="flip-card-demo">
	<div class="card-container" style="--flip-duration: 2s;">
		<flip-card class="coin" style="--corner-granularity: 3;">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
		<flip-card class="coin" style="--corner-granularity: 16;">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
	</div>
	<div slot="actions">
		<button>Flip!</button>
	</div>
</wc-demo>
/DEMO-->

```css
flip-card {
	--corner-granularity: 16;
	border-radius: 5em;
}
```

Finally, there is an escape hatch! If you find yourself dynamically changing the dimensions of the card or its border radius, you can manually call the `recreateBorderRadius()` method to reformat the corners. It's up to you to decide when this is needed, but if you have an unchanging card, then it probably isn't needed at all.

### Flip height and duration

The following apply to the default animation.

* The `--flip-height` CSS property customizes how high the card lifts off the surface. The default is 
* The `--flip-duration` CSS property customizes how long the flip lasts.

<!--DEMO
<wc-demo class="flip-card-demo">
	<flip-card class="default long-and-high">
		<section slot="front">
			<p>Front</p>
		</section>
		<section slot="back">
			<p>Back</p>
		</section>
	</flip-card>
	<div slot="actions">
		<button>Flip!</button>
	</div>
</wc-demo>
/DEMO-->

```css
flip-card {
	--flip-height: 40em;
	--flip-duration: 1.5s;
}
```

### 3D perspective

By default, each card lives in its own 3D context. That's just to make it super easy to get a single `flip-card` working.

However, if you have multiple cards, you may find it looks wrong. That's because in reality, we view the world in a single **perspective**: our own perspective.

As such, to get the most realistic card flips when there are multiple cards, you may want to put them all in the same 3D perspective context. You can do this with two steps:

1. Apply `perspective: none` CSS to every `flip-card` element.
2. Make all your `flip-card` elements direct children of a container with non-zero `perspective`.

<!--DEMO
<wc-demo class="flip-card-demo">
	<div class="card-container">
		<flip-card class="default">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
		<flip-card class="default">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
		<flip-card class="default">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
		<flip-card class="default">
			<section slot="front">
				<p>Front</p>
			</section>
			<section slot="back">
				<p>Back</p>
			</section>
		</flip-card>
	</div>
	<div slot="actions">
		<button>Flip!</button>
	</div>
</wc-demo>
/DEMO-->

```css
.card-container {
	perspective: 125em;
	perspective-origin: center;
}

.card-container flip-card {
	perspective: none;
}
```

### Fully custom animations

You can use the `setFlipToFrontAnimation()` and `setFlipToBackAnimation()` methods in Javascript to give the card a different flip animation.

Here's an example for a vertical flip, rather than a horizontal flip.

<!--DEMO
<wc-demo class="flip-card-demo">
	<flip-card class="default vertical-flip">
		<section slot="front">
			<p>The front!</p>
		</section>
		<section slot="back">
			<p>The back!</p>
		</section>
	</flip-card>
	<div slot="actions">
		<button>Flip!</button>
	</div>
</wc-demo>
/DEMO-->

```js
card.setFlipToFrontAnimation(
	[ {
		transform: "translateZ(calc(-1 * var(--_depth))) rotateX(180deg)",
	}, {
		transform: "translateZ(var(--_height)) rotateX(270deg)",
	}, {
		transform: "translateZ(0em) rotateX(360deg)",
	} ],
	{
		easing: "ease-in-out",
	},
)

card.setFlipToBackAnimation(
	[ {
		transform: "translateZ(0em) rotateX(0deg)",
	}, {
		transform: "translateZ(var(--_height)) rotateX(90deg)",
	}, {
		transform: "translateZ(calc(-1 * var(--_depth))) rotateX(180deg)",
	} ],
	{
		easing: "ease-in-out",
	},
)
```

(and a dash of CSS too, to orient the backside properly at rest)

```css
flip-card > [slot="back"] {
	transform: scale(-1);
}
```


The `flip-card` component uses the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) to perform animations, rather than CSS. This confers some advantages, such as being able to generate animations on the fly or apply easing to the entire animation rather than just keyframes. It's also necessary in order to penetrate the Shadow DOM properly.

Each method has the same interface as the Element's [animate()](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) method:

* The first parameter is a list of keyframes. The `offset` property is equivalent to defining percentage in CSS's equivalent `@keyframes`. See [Keyframe Formats](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats) for details.
* The second parameter are options, such as number of iterations or easing. See [KeyframeEffect's object parameter](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#parameters) for details.

### All customization options in a single list

| Name | Default | Description |
| ------------- | ------------- | ------------- |
| `--card-depth` | `0.15em` | How thick the card's edge is. |
| `--flip-height` | `20em` | How high the card travels vertically when flipped. |
| `--flip-duration` | `0.75s` | How long it takes the card to complete a flip. |
| `--flip-duration` | `0.75s` | How long it takes the card to complete a flip. |
| `--corner-granularity` | `4` | How smooth the card's corner edges should be when rounded. Higher is smoother. |
| `setFlipToFrontAnimation()` | a horizontal flip | Animation to play when flipping the card from being face down to being face up. Parameters are keyframes and options. |
| `setFlipToBackAnimation()` | a horizontal flip | Animation to play when flipping the card from being face up to being face down. Parameters are keyframes and options. |

## Events

The `flip-card` element dispatches the following events:

| Name | When Triggered |
| ------------- | ------------- |
| `flipping` | Whenever the card begins to flip. |
| `flipped` | Whenever the card's flip animation ends. |

Both events contain in their details a property `facedown` indicating to which side the card is flipping or flipped.

```js
card.addEventListener('flipping', e => {
	console.log(e.detail.facedown)
})
```

## Accessibility

This custom element is build with accessibility in mind!

* Screenreaders only announce the side that is visible.
* Screenreaders announce "Frontside" or "Backside" to denote which side is visible.
* Tabbable elements on the non-facing side of the card cannot be focused until the card is flipped.
* The flip animation is disabled for people who [prefer reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

### Labelling Cards

The `flip-card` element does not prescribe a specific way to accessibly label the card's content, as the best way to do this depends on the card's context. Possibilities include:

* Wrapping the card in an `article` element if its contents are self-contained.
* Labelling the card with text within the card itself using `aria-labelledby`, with `role="region"`.
* Simply putting a heading element above the card.
* Wrapping the card in a `figure` element and using `figcaption` to label it.

### Announcing when the card flips

If you attach `aria-live="polite"` to the `flip-card`, then flipping the card will announce the new side's contents to screen readers. As this may not always be desired behaviour, it is up to you to discern whether adding `aria-live` will make your content more accessible.
