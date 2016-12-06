# &lt;wxc-tabbar&gt;
<span class="weex-version">0.5</span>

### Summary

The "wxc-tabbar" tag implements a specialized component that corresponds to the radio-style selection. It displays tabs at the bottom of the window for selecting between the different modes and for displaying different weex pages for that mode.

### Child Components

This component supports no child components.

### Attributes

- `tab-items`: This attribute contains an array of tabitem objects, each of which corresponds to the radio-style selection. The order of the items in this attribute corresponds to the order of the items onscreen. You can configure the appearance of tabbar by setting tabitem. Each tabitem properties can be described as follows.
  + index: &lt;integer&gt; This attribute must be set to identify the order of the item.
  + title: &lt;string&gt; The item’s title. If null, a title is not displayed.
  + titleColor: &lt;color&gt;The item’s titleColor. Default is black color.  
  + image: &lt;string&gt;The icon displayed when the tabitem is unselected. If null, the icon is not displayed.
  + selectedImage:  &lt;string&gt;The icon displayed when the tabitem is selected. If null, the icon is not displayed.
  + src: &lt;string&gt;The  custom weex page to display.
  + icon: &lt;string&gt;This is a special attribute. Be careful, You need to set the property even if it is empty.
  + visibility: &lt;string&gt;`visible` | `hidden`. This attribute must be set to identify the display status. Default value is `visible`.         

+ `selected-color`: &lt;color&gt; The color of the title when it is selected. Default is red color.
+ `unselected-color`: &lt;color&gt; The color of the title when it is unselected. Default is black color.  
                 
Other attributes please check out the [common attributes](../references/common-attrs.md).

### Styles

**common styles**: check out [common styles for components](../references/common-style.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

- `tabBar.onClick`: triggered when the tabitem is selected. You need to register the observer in ready or create block.

### Example

`require('weex-components')` should be used with webpack, see [example](https://github.com/alibaba/weex/blob/example/examples/component/tabbar/tabbar-demo.we) for more detail.

```html
<template>
  <div style="flex-direction: column;">
    <wxc-tabbar tab-items = {{tabItems}}></wxc-tabbar>
  </div>
</template>

<script>
  require('weex-components');
  module.exports = {
    data: {
      tabItems: [
        {
          index: 0,
          title: '...',
          titleColor: '#000000',
          icon: '',
          image: '...',
          selectedImage: '...',
          src: '...',
          visibility: 'visible',
        },
        {
          index: 1,
          title: '...',
          titleColor: '#000000',
          icon: '',
          image: '...',
          selectedImage: '...',
          src: '...',
          visibility: 'hidden',
        }
      ],
    },
    methods: {
      ready: function (e) {
        var vm = this;
        vm.$on('tabBar.onClick',function(e){
          var index = e.detail.index;
       	  ....
        });
      },
    }
  }
</script>
```
