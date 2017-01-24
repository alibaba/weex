---
title: <wxc-navpage>
type: references
order: 2.16
version: 0.10
---

# &lt;wxc-navpage&gt;

### Summary

The "wxc-navpage" tag implements a specialized component that contains a navbar at the top of the window and an embed content page. You can customize the navbar as you like. In addition, you can use `navigator` module to control the page jump, see [navigator module](../modules/navigator.html).

### Child Components

This type of component supports all kinds of weex component as its child components.

### Attributes

- `height`: &lt;length&gt; The height of the navbar. Default value is 88.
- `background-color`: &lt;color&gt;The backgroudColor of the navbar. Default value is `white`.
- `title`: &lt;string&gt; The title of the navbar.
- `title-color`: &lt;color&gt;The color of the navbar title. Default value is `black`.
- `left-item-title`: &lt;string&gt; The title of the leftItem.
-  `left-item-color`: &lt;color&gt; The color of the leftItem title. Default value is `black`.
- `right-item-title`: &lt;string&gt; The title of the rightItem.
-  `right-item-color`: &lt;color&gt; The color of the rightItem title. Default value is `black`.
- `left-item-src`: &lt;string&gt; The imageURL of the leftItem you want to set.
- `right-item-src`: &lt;string&gt; The imageURL of the rightItem you want to set.

Other attributes please check out the [common attributes](../references/common-attrs.html).

### Styles

**common styles**: check out the [common styles](../references/common-attrs.html)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

- `naviBar.leftItem.click`: triggered when the leftItem of navbar is clicked. You need to register the observer in ready or create block.
- `naviBar.rightItem.click`: triggered when the rightItem of navbar is clicked. You need to register the observer in ready or create block.

**common events**: check out the [common events](../references/common-event.html)

- support `click` event. Check out [common events](../references/common-event.html)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.html)

### Example

```html
<template>
  <wxc-navpage height={{...}} background-color="..." title="..." title-color="..." left-item-title="..." left-item-color="..." right-item-src="...">
      <content> ...</content>
  </wxc-navpage>
</template>
<script>
  require('weex-components');
  module.exports = {
    created: function() {
        this.$on('naviBar.rightItem.click',function(e){
           //handle your click event here.
        });

        this.$on('naviBar.leftItem.click',function(e){
          //handle your click event here.
        });
    }
  }
</script>
```
