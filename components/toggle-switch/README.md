# The toggle-switch Element

<p hidden><strong><a href="https://components.auroratide.com/toggle-switch">View this page with live demos!</a></strong></p>

The `toggle-switch` element represents a control that is either on or off. This component is built with accessibility in mind and implements the WAI-ARIA [switch role](https://www.w3.org/TR/wai-aria-1.1/#switch).

<!--DEMO
<wc-demo>
    <label for="example-01">Active?</label>
    <toggle-switch id="example-01"></toggle-switch>
    <p id="example-01-output">Off</p>
</wc-demo>
<style>
    label, toggle-switch {
        vertical-align: middle;
    }
</style>
/DEMO-->

```html
<label for="example-01">Active?</label>
<toggle-switch id="example-01"></toggle-switch>
```

**Note**: The on/off semantic is slightly different from the checked/unchecked semantic of input checkboxes. Additionally, checkboxes can have a third indeterminant value that does not make sense for a toggle switch.

## Installation

You can import through CDN:

```html
<script type="module" src="https://unpkg.com/@auroratide/toggle-switch/lib/define.js"></script>
```

Or, you may install through [NPM](https://www.npmjs.com/package/@auroratide/toggle-switch) and include it as part of your build process:

```
$ npm i @auroratide/toggle-switch
```

```javascript
import '@auroratide/toggle-switch/lib/define.js'
```

## Usage

`toggle-switch` is an **inline markup element** that you can use in your HTML document. It is a form control, meaning it is appropriate to properly [label](https://html.spec.whatwg.org/#the-label-element) it like so:

```html
<label for="example-02">Can upload cat images: </label>
<toggle-switch id="example-02"></toggle-switch>
```

By default, the switch starts in the **off** position. You can have it start in the **on** state instead using the `checked` attribute:

```html
<label for="example-03">Can upload cat images: </label>
<toggle-switch checked id="example-03"></toggle-switch>
```

<!--DEMO
<wc-demo>
    <label for="example-03">Can upload cat images: </label>
    <toggle-switch checked id="example-03"></toggle-switch>
</wc-demo>
/DEMO-->

### Attributes

| Attribute | Default | Description |
| ------------- | --------- | ------------- |
| `checked` | - | Whether the switch is on or not |
| `disabled` | - | Whether the switch can change states |

### CSS Customization

The `toggle-switch` is composed of a **slider** and a **track** which can be individually customized:

* `slider`, the element that slides when toggled
* `track`, the element upon which the slider slides

Additionally, using the `checked` state, you can apply special styling for when the toggle is on.

Here's an example showing how to use CSS to make this look like a Material UI switch:

<!--DEMO
<wc-demo>
    <label for="fancy-switch">Fancy Switch</label>
    <toggle-switch id="fancy-switch"></toggle-switch>
    <style>
        #fancy-switch {
            height: 1em;
				margin-inline: 1em;
        }
        #fancy-switch::part(track) {
            height: 0.75em;
            border-radius: 1em;
            background-color: oklch(70% 0.005 255);
            margin: 0.125em 0;
        }
        #fancy-switch::part(slider) {
            width: 1em;
            height: 1em;
            border-radius: 50%;
            background-color: oklch(97.5% 0.005 255);
            box-shadow: 0.0625em 0.0625em 0.125em oklch(0% 0 0 / 0.25);
            margin: -0.125em 0;
        }
        #fancy-switch[checked]::part(track) {
            background-color: oklch(64% 0.142 250);
        }
    </style>
</wc-demo>
/DEMO-->

```css
toggle-switch {
    height: 1em;
}

toggle-switch::part(track) {
    height: 0.75em;
    border-radius: 1em;
    background-color: oklch(70% 0.005 255);
    margin: 0.125em 0;
}

toggle-switch::part(slider) {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: oklch(97.5% 0.005 255);
    box-shadow: 0.0625em 0.0625em 0.125em oklch(0% 0 0 / 0.25);
    margin: -0.125em 0;
}

toggle-switch[checked]::part(track) {
    background-color: oklch(64% 0.142 250);
}
```

## Javascript API

The element exposes a function to programmatically toggle its state:

| Method | Description |
| ------------- | ------------- |
| `toggle()` | Change from off to on, or from on to off |

### Properties

Each attribute can be accessed as a Javascript property.

* `elem.checked`
* `elem.disabled`

### Events

The `toggle-switch` element dispatches the following events:

| Name | When Triggered |
| ------------- | ------------- |
| `toggle-switch:change` | Any time the state changes (on to off, or off to on) |

The `toggle-switch:change` event contains the checked state in its details:

```js
elem.addEventListener('toggle-switch:change', e => {
    console.log(e.detail.checked)
})
```

## Accessibility

This custom element is built with accessibility in mind! It follows the WAI-ARIA guidelines for the [switch role](https://www.w3.org/TR/wai-aria-1.1/#switch).

* The element can be focused
* The element can be toggled with <kbd>Enter</kbd> or <kbd>Space</kbd>
