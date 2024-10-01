# The tab-list Elements

<p hidden><strong><a href="https://auroratide.github.io/web-components/tab-list">View this page with live demos!</a></strong></p>

The `tab-list`, `tab-item`, and `tab-panel` elements together represent content that is presented one panel at a time. They are built with accessibility in mind and implement the WAI-ARIA guidelines for [tabs](https://w3c.github.io/aria-practices/#tabpanel).

* A `tab-list` represents a set of tabs, where only one tab's contents may be presented at a time.
* A `tab-item` represents a reference of a single panel of information in a tab list.
* A `tab-panel` represents a panel of information.

<!--DEMO
<wc-demo>
    <tab-list aria-label="Learn about fruits">
        <tab-item for="example-1-tab-1" selected>Apples</tab-item>
        <tab-item for="example-1-tab-2">Oranges</tab-item>
        <tab-item for="example-1-tab-3">Bananas</tab-item>
    </tab-list>
    <tab-panel id="example-1-tab-1">
        <p>Apples are usually red, but sometimes they can be green.</p>
    </tab-panel>
    <tab-panel id="example-1-tab-2">
        <p>Oranges are, well, orange!</p>
    </tab-panel>
    <tab-panel id="example-1-tab-3">
        <p>Bananas are yellow and usually curved.</p>
    </tab-panel>
</wc-demo>
/DEMO-->

```html
<tab-list aria-label="Learn about fruits">
    <tab-item for="example-1-tab-1" selected>Apples</tab-item>
    <tab-item for="example-1-tab-2">Oranges</tab-item>
    <tab-item for="example-1-tab-3">Bananas</tab-item>
</tab-list>
<tab-panel id="example-1-tab-1">
    <p>Apples are usually red, but sometimes they can be green.</p>
</tab-panel>
<tab-panel id="example-1-tab-2">
    <p>Oranges are, well, orange!</p>
</tab-panel>
<tab-panel id="example-1-tab-3">
    <p>Bananas are yellow and usually curved.</p>
</tab-panel>
```

## Installation

You can import through CDN:

```html
<script type="module" src="https://unpkg.com/@auroratide/tab-list/lib/define.js"></script>
```

Or, you may install through [NPM](https://www.npmjs.com/package/@auroratide/tab-list) and include it as part of your build process:

```
$ npm i @auroratide/tab-list
```

```javascript
import '@auroratide/tab-list/lib/define.js'
```

## Usage

`tab-list`, `tab-item`, and `tab-panel` are **markup elements** that you can use in your HTML document. To use them together, it is best to follow these guidelines:

* `tab-item` elements **must** be contained within a `tab-list`. They need not be _direct_ descendents.
* `tab-panel` must define a unique `id`.
* `tab-item` must define the `for` attribute, whose value is the `id` of its corresponding `tab-panel`.

```html
<tab-list>
    <!-- tab-item must be in a tab-list, and defines `for` to be
         the corresponding tab-panel id -->
    <tab-item for="tab-panel-id">
</tab-list>
<!-- tab-panel defines an id -->
<tab-panel id="tab-panel-id">
    <p>Any content you want</p>
</tab-panel>
```

The following are good accessibility practices:

* `tab-list` should be labelled with a name representing the collection of tabs, either with `aria-label` or `aria-labelledby`.
* `tab-panel` elements can theoretically be anywhere on the page, though it's best if they are the next focusable item after the `tab-list`.

### Automatic Activation

By default, a tab must be clicked in order for its panel to be revealed. With automatic activation, a tab only needs to acquire focus to show its tab. In general, [WAI-ARIA recommends automatic activation](https://w3c.github.io/aria-practices/#kbd_selection_follows_focus) for the best accessibility, unless animations induce lag.

You can enable automatic activation by setting the `activation` attribute to `"automatic"` on the tab list element.

<!--DEMO
<wc-demo>
    <tab-list activation="automatic" aria-label="Learn about vegetables">
        <tab-item for="example-5-tab-1" selected>Tomatoes</tab-item>
        <tab-item for="example-5-tab-2">Carrots</tab-item>
        <tab-item for="example-5-tab-3">Squashes</tab-item>
    </tab-list>
    <tab-panel id="example-5-tab-1">
        <p>Tomatoes are red. People like to tell you they are fruit and not vegetables.</p>
    </tab-panel>
    <tab-panel id="example-5-tab-2">
        <p>Carrots are orange, and also a root.</p>
    </tab-panel>
    <tab-panel id="example-5-tab-3">
        <p>Some squashes are yellow, and they come in all shapes and sizes.</p>
    </tab-panel>
</wc-demo>
/DEMO-->

```html
<tab-list activation="automatic" aria-label="Learn about vegetables">
    <tab-item for="example-5-tab-1" selected>Tomatoes</tab-item>
    <tab-item for="example-5-tab-2">Carrots</tab-item>
    <tab-item for="example-5-tab-3">Squashes</tab-item>
</tab-list>
```

### Vertical Tab List

By default, tabs are listed horizontally, and they can be navigated with the <kbd>left</kbd> and <kbd>right</kbd> arrow keys.

By setting the `orientation` attribute to `"vertical"`, you can make a vertical tab list. This makes it navigable with the <kbd>up</kbd> and <kbd>down</kbd> arrow keys instead.

<!--DEMO
<wc-demo>
    <tab-list orientation="vertical" aria-label="Learn about vegetables">
        <tab-item for="example-2-tab-1" selected>Tomatoes</tab-item>
        <tab-item for="example-2-tab-2">Carrots</tab-item>
        <tab-item for="example-2-tab-3">Squashes</tab-item>
    </tab-list>
    <tab-panel id="example-2-tab-1">
        <p>Tomatoes are red. People like to tell you they are fruit and not vegetables.</p>
    </tab-panel>
    <tab-panel id="example-2-tab-2">
        <p>Carrots are orange, and also a root.</p>
    </tab-panel>
    <tab-panel id="example-2-tab-3">
        <p>Some squashes are yellow, and they come in all shapes and sizes.</p>
    </tab-panel>
</wc-demo>
/DEMO-->

```html
<tab-list orientation="vertical" aria-label="Learn about vegetables">
    <tab-item for="example-2-tab-1" selected>Tomatoes</tab-item>
    <tab-item for="example-2-tab-2">Carrots</tab-item>
    <tab-item for="example-2-tab-3">Squashes</tab-item>
</tab-list>
```

### Setting a selected tab

You can set the `selected` attribute on one `tab-item` in a `tab-list`. This will mark that item as selected and show its panel.

<!--DEMO
<wc-demo>
    <tab-list aria-label="Learn about fruits">
        <tab-item for="example-3-tab-1">Apples</tab-item>
        <tab-item for="example-3-tab-2">Oranges</tab-item>
        <tab-item for="example-3-tab-3" selected>Bananas</tab-item>
    </tab-list>
    <tab-panel id="example-3-tab-1">
        <p>Apples are usually red, but sometimes they can be green.</p>
    </tab-panel>
    <tab-panel id="example-3-tab-2">
        <p>Oranges are, well, orange!</p>
    </tab-panel>
    <tab-panel id="example-3-tab-3">
        <p>Bananas are yellow and usually curved.</p>
    </tab-panel>
</wc-demo>
/DEMO-->

```html
<tab-item selected for="example-3-tab-3">Bananas</tab-item>
```

**Note**: Only one `tab-item` can be selected at a time! If you attempt to set multiple as selected, only the first selected tabl's panel will be shown.

### All Attributes

For `tab-list`:

| Attribute | Description |
| ------------- | ------------- |
| `orientation` | Either `"horizontal"` or `"vertical"`. Represents whether the tab list should be presented horizontally or vertically, and affects whether they are navigated with the <kbd>left</kbd>/<kbd>right</kbd> or <kbd>up</kbd>/<kbd>down</kbd> keys respectively. `"horizontal"` by default. |
| `activation` | Either `"manual"` or `"automatic"`. Represents whether a click (manual) or focus (automatic) is required to show a tab's panel. `"manual"` by default. |

For `tab-item`:

| Attribute | Description |
| ------------- | ------------- |
| `for` | **Required.** Should be the same as the `id` of the tab's respective panel.
| `selected` | Either present or not. Represents whether this tab's panel should be shown. |

## CSS Customization

Since these are native custom elements, they can be styled the same way as regular HTML elements.

Of note:

* `tab-item[selected]` will style the currently selected tab.
* `tab-list[orientation="vertical"]` can style vertical tab lists.
* `tab-panel[hidden]` styles hidden tabs, in case you want transitions.

Here's an example of a fully customized tab list:

<!--DEMO
<wc-demo id="fancy">
    <div class="tab-container">
        <tab-list aria-label="Fruit dessert recipes">
            <tab-item for="example-4-tab-1" selected>Apples</tab-item>
            <tab-item for="example-4-tab-2">Oranges</tab-item>
            <tab-item for="example-4-tab-3">Bananas</tab-item>
        </tab-list>
        <div class="tab-panels-container">
            <tab-panel id="example-4-tab-1">
                <p>Ingredients for making apple pie:</p>
                <ul>
                    <li>8 Granny Smith apples</li>
                    <li>½ cup butter</li>
                    <li>3 tablespoons flour</li>
                    <li>½ cup white sugar</li>
                    <li>½ cup brown sugar</li>
                    <li>¼ water</li>
                    <li>A double-crust pie pastry</li>
                </ul>
            </tab-panel>
            <tab-panel id="example-4-tab-2">
                <p>Ingredients for making orange sorbet:</p>
                <ul>
                    <li>2 cups orange juice pulp</li>
                    <li>1½ cup almond milk</li>
                    <li>1 tablespoon orange zest</li>
                    <li>1 tablespoon lemon juice</li>
                    <li>¼ teaspoon salt</li>
                    <li>1 teaspoon vanilla extract</li>
                    <li>½ teaspoon sweetener</li>
                </ul>
            </tab-panel>
            <tab-panel id="example-4-tab-3">
                <p>Ingredients for making banana pudding:</p>
                <ul>
                    <li>14 bananas</li>
                    <li>5 ounce packet instant vanilla pudding</li>
                    <li>2 cups milk</li>
                    <li>14 ounce can condensed milk</li>
                    <li>1 tablespoon vanilla extract</li>
                    <li>12 ounces frozen whipped topping</li>
                    <li>16 ounces vanilla wafers</li>
                </ul>
            </tab-panel>
        </div>
    </div>
</wc-demo>
<style>
    #fancy .tab-container {
        box-shadow: 0 0.125em 0.25em oklch(0% 0 0 / 0.25);
    }
    #fancy tab-list {
        background: var(--t-primary-a);
        gap: 0;
    }
    #fancy tab-item {
        border: none;
        border-radius: 0;
        background: var(--t-primary-a);
        color: var(--t-fg-b);
        padding: 0.625em 1.125em;
        border-right: 0.125em solid oklch(38% 0.125 250);
    }
    #fancy tab-item:hover:not([selected]),
    #fancy tab-item:focus:not([selected]) {
        background: oklch(38% 0.125 250);
    }
    #fancy tab-item[selected] {
        background: var(--t-bg-a);
        border-color: transparent;
        color: var(--t-fg-b);
    }
    #fancy .tab-panels-container { display: grid; }
    #fancy tab-panel {
        grid-area: 1 / 1;
        border: none;
        padding: 0.625em 1.125em 1.125em;
        opacity: 1;
        transition: opacity 0.2s ease-in-out;
        background: var(--t-bg-a);
    }
    #fancy tab-panel[hidden] {
        display: block;
        opacity: 0;
    }
    #fancy tab-panel *:last-child {
        margin: 0;
    }
	 #fancy tab-panel p {
	     margin-block: 1.25em;
	 }
</style>
/DEMO-->

```css
div.tab-container {
	box-shadow: 0 0.125em 0.25em oklch(0% 0 0 / 0.25);
}

tab-list {
	background: oklch(55% 0.119 250);
	gap: 0;
}

tab-item {
	border: none;
	border-radius: 0;
	background: oklch(55% 0.119 250);
	color: oklch(97.5% 0.005 255);
	padding: 0.625em 1.125em;
	border-right: 0.125em solid oklch(38% 0.125 250);
}

tab-item:hover:not([selected]),
tab-item:focus:not([selected]) {
	background: oklch(38% 0.125 250);
}

tab-item[selected] {
	background: oklch(22% 0.021 255);
	border-color: transparent;
	color: oklch(80% 0.005 255);
}

div.tab-panels-container { display: grid; }
tab-panel {
	grid-area: 1 / 1;
	border: none;
	padding: 0.625em 1.125em 1.125em;
	opacity: 1;
	transition: opacity 0.2s ease-in-out;
}

tab-panel[hidden] {
	display: block;
	opacity: 0;
}
```

## Events

The `tab-list` element dispatches the following events:

| Name | When Triggered |
| ------------- | ------------- |
| `tab-list:change` | Whenever the currently selected tab changes |

The `tab-list:change` event contains references to the previously selected tab and the newly selected tab:

```js
tabList.addEventListener('tab-list:change', e => {
    console.log(e.detail.from)
    console.log(e.detail.to)
})
```

## Accessibility

This custom element is built with accessibility in mind! It follows the WAI-ARIA guidelines for [tabs](https://w3c.github.io/aria-practices/#tabpanel) (the `tablist`, `tab`, and `tabpanel` roles).

* When focus enters the tab list, the currently active tab item is focused.
* <kbd>Left</kbd> and <kbd>Right</kbd> can be used to navigate the tabs.
* <kbd>Enter</kbd> or <kbd>Space</kbd> select the currently focused tab.
* <kbd>Home</kbd> goes to the first tab, and <kbd>End</kbd> goes to the last tab.

## Not (yet) Implemented

The following features are desired of tab lists, but are not yet implemented:

* Auto-opening a panel when its corresponding tab receives focus.
* Native support for removable tabs.
* Tabs that open popup menus.
