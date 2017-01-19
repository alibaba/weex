---
title: <scroller>
type: references
order: 2.8
version: 0.10
---

# &lt;scroller&gt;
<span class="weex-version">v0.6.1+</span>

A scroller is a component in vertical direction which can have multiple child components in one column. If total height of its child components exceed the height of the scroller, the whole child components will be scrollable.

Notes: A <scroller> can be used as a root element or a embed element. The scroll direction of this component is column, and it can't be changed.


**example**

```html
<template>
  <scroller onloadmore="onloadmore" loadmoreoffset="100">
    <div repeat="{{v in items}}">
      <text style="font-size: 40; color: #000000">{{v.item}}</text>
    </div>
  </scroller>
</template>
<script>
  module.exports = {
    data: {
      items: [],
      triggered:false
    },
    created: function () {
      for (var i = 0; i < 50; i++) {
        this.items.push({'item': 'test data' + i});
      }
    },
    methods: {
      onloadmore:function(){
        if(!this.triggered){
          for (var i = 100; i >= 50; i--) {
            this.items.push({'item':'onloadmore triggered' + i});
          }
        }
        this.triggered=true;
      }
    }
  }
</script>
```

[try it](http://dotwe.org/acf155122b9457211165680b01fae1c2)

## Child Components

Scroller supports all kinds of components, such as div, text, etc.
And there are two special components that can only be used inside scroller component.

* refresh 0.6.1 used inside list to add pull-down-to-refresh functionality. 
* loading 0.6.1 used inside list to add pull-up-to-load-more functionality. 


## Attributes

* show-scrollbar: true/false whether show the scroll bar or not, default value is true
* scroll-direction: <string> define scroll direction of component, horizontal or vertical
* loadmoreoffset : <number> default value is 0. The loadmore event will be triggered when the list is loadmoreoffset left to reach the bottom of the list view. e.g. a list has total content length of 1000, and the loadmoreoffset is set to 400, the loadmore event will be triggered when 600 has beed scrolled and there is less than 400 left.
* loadmoreretry : <number> default value 0，whether to reset loadmore related UI when loadmore failed, will be deprecated in further release.

**example**

```html
<template>
  <scroller onloadmore="onloadmore" loadmoreoffset="100">
  <div repeat="{{v in items}}">
    <text style="font-size: 40; color: #000000">{{v.item}}</text>
  </div>
  </scroller>
</template>
<script>
module.exports = {
  data: {
    items: [],
    triggered:false
  },
  created: function () {
    for (var i = 0; i < 50; i++) {
      this.items.push({'item': 'test data' + i});
    }
  },
  methods: {
    onloadmore:function(){
      if(!this.triggered){
        for (var i = 100; i >= 50; i--) {
        this.items.push({'item':'onloadmore triggered' + i});
        }
      }
      this.triggered=true;
    }
  }
}
</script>
```

[try it](http://dotwe.org/acf155122b9457211165680b01fae1c2)


Please checkout [Scroller Component Attributes]() to have a look at the inherited attributes from direct parent.

Other attributes please check out the [common     attributes](../common-attrs.html).

## Styles

common styles: check out [common styles for components](../common-style.html)

* support flexbox related styles
* support box model related styles
* support position related styles
* support opacity, background-color etc.


## Events

onloadmore  used with loadmoreoffset attribute. if the view has less than loadmoreoffset to scroll down, the onloadmore event will be triggered.

common events: check out the [common events](../common-event.html)

* support onclick event. Check out [common events](../common-event.html)
* support onappear / ondisappear event. Check out [common events](../common-event.html)



## Restrictions

Nested lists or scrollers within the same direction are not supported. In other words. nested lists/scroller must have different directions.
For example, a vertical list nested in a vertical list or scroller is not allowed. However, a vertical list nested in a horizontal list or scroller is legal.

