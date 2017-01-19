---
title: <wxc-tabbar>
type: references
order: 2.17
version: 0.10
---

# &lt;wxc-tabbar&gt;

The `wxc-tabbar` is a custom component, which belongs to the `weex-components` node package, implements a specialized component that corresponds to the radio-style selection. It displays tabs at the bottom of the window for switching between different tab pages.

Usage: You can use this component by a `require` statement, `require('weex-components');`, in the script tag. e.g.

```html
<template>
  <div style="flex-direction: column;">
    <wxc-tabbar tab-items = {{tabItems}}></wxc-tabbar>
  </div>
</template>

<script>
  require('weex-components');
  // Other javascript statements.
</script>
```

Before requiring `weex-components'`, you need to specify `weex-components` dependency in your project's package.json file. e.g.

```json
"dependencies": {
  "weex-components": "^0.2.0"
}
```

## Child Components

`wxc-tabbar` has no child components.


## Attributes

* `selected-index` : &lt;number&gt; default value is 0
* `selected-color`: &lt;color&gt; The color of the title when it is selected. Default is red color.
* `unselected-color`: &lt;color&gt; The color of the title when it is unselected. Default is black color.
* `tab-items` This attribute accepts an array of `tabitem` objects, each of which corresponds to the tab pages. And the order of the items equals to the order of the tab pages onscreen. You can configure the appearance of tabbar by setting the tabitem object's properties. Each tabitem properties are listed as below:
  * `index`: &lt;integer&gt; This attribute is required, and it specifies the order of the item.
  * `title`: &lt;string&gt; The item’s title. and it is optional. The tile will not be displayed if empty or not provided.
  * `titleColor`: &lt;color&gt;The item’s titleColor. Default is black color.
  * `image`: &lt;string&gt;The icon displayed when the tabitem is unselected. The image will not be displayed if empty or not provided.
  * `selectedImage` : &lt;string&gt;The icon displayed when the tabitem is selected. The icon will not be displayed if empty or not provided.
  * `src` : &lt;string&gt; The weex page for the tab page.
  * `visibility`: &lt;string&gt;visible | hidden. This attribute specifies display status of the tab page. Default value is visible.

Other attributes please check out the [common attributes](../common-attrs.html).

## Styles
common styles: check out [common styles](../common-style.html) for components

* support flexbox related styles
* support box model related styles
* support position related styles
* support opacity, background-color etc.

## Events
* `tabBar.onClick`: triggered when the tabitem is selected. You need to register the observer in ready or create block.
e.g.


```html
<template&gt;
  <div style="flex-direction: column;"&gt;
    <wxc-tabbar tab-items = {{tabItems}}&gt;</wxc-tabbar&gt;
  </div&gt;
</template&gt;

<script>
  require('weex-components');
  module.exports = {
    data: {
      },
    methods: {
      ready: function (e) {
        var vm = this;
        vm.$on('tabBar.onClick',function(e){
          var index = e.detail.index;
        });
      },
    }
  }
</script>
```

## Example
You should checkout the playground's `tabbar` example.
