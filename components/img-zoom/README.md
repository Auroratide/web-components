# The img-zoom Element

<p hidden><strong><a href="https://components.auroratide.com/img-zoom">View this page with live demos!</a></strong></p>

The `img-zoom` element represents an image that can be enlarged to fill the screen on demand.

<!--DEMO
<wc-demo id="main-demo">
   <img-zoom style="width: 50%">
      <img src="./fruit.png" alt="Apples and such arranged on a table." width="1920" height="1470" />
   </img-zoom>
</wc-demo>
/DEMO-->

```html
<img-zoom>
   <img
      src="fruit.png"
      alt="Apples and such arranged on a table."
      width="1920"
      height="1470"
   />
</img-zoom>
```

## Installation

You can import through CDN:

```html
<script type="module" src="https://unpkg.com/@auroratide/img-zoom/lib/define.js"></script>
```

Or, you may install through [NPM](https://www.npmjs.com/package/@auroratide/img-zoom) and include it as part of your build process:

```
$ npm i @auroratide/img-zoom
```

```javascript
import '@auroratide/img-zoom/lib/define.js'
```

## Usage

`img-zoom` is an **inline markup element** that you can use in your HTML document. It must have _exactly one_ child which is either an `img` element or a `picture` element with a fallback `img` defined.

**Using img:**

```html
<img-zoom>
   <img src="fruit.png" alt="Apples and such arranged on a table." width="1920" height="1470" />
</img-zoom>
```

**Using picture:**

```html
<img-zoom>
   <picture>
      <source srcset="fruit.webp" type="image/webp" />
      <img src="fruit.png" alt="Apples and such arranged on a table." width="1920" height="1470" />
   </picture>
</img-zoom>
```

<!--DEMO
<wc-demo id="picture-demo">
   <p>This demo uses the <code>picture</code> element.</p>
   <img-zoom style="width: 50%;">
      <picture>
         <source srcset="./fruit.webp" type="image/webp" />
         <img src="./fruit.png" alt="Apples and such arranged on a table." width="1920" height="1470" />
      </picture>
   </img-zoom>
</wc-demo>
/DEMO-->

### Disabling Interaction

The `disabled` attribute disables zoom interaction. Not super sure if this is useful, but the feature's there just in case.

```html
<img-zoom disabled>
   <img src="fruit.png" alt="" />
</img-zoom>
```

## Customization

Since it's Just HTML<sup>TM</sup>, you can use good ol' CSS.

```css
img-zoom {
	box-shadow: 0 0 0.5em 0.5em oklch(0% 0 0 / 0.33);
}
```

## Accessibility

This custom element is built with accessibility in mind! It treats the zoomed image like a [dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

* Keyboard operation
   * When the image has focus, <kbd>Enter</kbd> will open the zoomed image.
   * When opened, focus is automatically placed on a Close button that will close the zoomed image.
   * <kbd>Escape</kbd> will also exit the zoomed image.
* Tab trapping: While zoomed, the tabbing order will remain within the image until dismissed.
* Reduced Motion: The animation is simplified for people who prefer reduced motion.
