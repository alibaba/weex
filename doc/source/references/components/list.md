---
title: <list>
type: references
order: 2.5
version: 2.1
---

# List

<span class="weex-version">v0.6.1+</span>

The List component, which inherits from Scroller component, is a core component, and it provides the most popular features for using a list of items.

It can provide excellent experience and performance while still maintaining smooth scroll and low memory usage.

**example**

```html
<template>
  <list class="list">
    <cell class="cell" v-for="num in lists">
      <div class="panel">
        <text class="text">{{num}}</text>
      </div>
    </cell>
  </list>
</template>

<script>
  export default {
    data () {
      return {
        lists: ['A', 'B', 'C', 'D', 'E']
      }
    }
  }
</script>

<style scoped>
  .panel {
    width: 600px;
    height: 300px;
    margin-left: 75px;
    margin-top: 35px;
    margin-bottom: 35px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
  .text {
    font-size: 88px;
    text-align: center;
    color: #41B883;
  }
</style>
```

### Child Components

Notes: The list now supports the following child components: cell, header, refresh, loading and fixed-position components. Other kinds of components will not be guaranteed to be displayed correctly.

* cell 0.6.1 defines the attributes and behavior of the cells that appear in list. 
* header 0.6.1 sticks to the top when it reaches the top of the screen.
* refresh 0.6.1 used inside list to add pull-down-to-refresh functionality.
* loading 0.6.1 used inside list to add pull-up-to-load-more functionality.


### Attributes

* show-scrollbar: true/false whether show the scroll bar or not, default value is true
* scroll-direction: <string> define scroll direction of component, horizontal or vertical
* loadmoreoffset : <number> default value is 0. The loadmore event will be triggered when the list is loadmoreoffset left to reach the bottom of the list view. e.g. a list has total content length of 1000, and the loadmoreoffset is set to 400, the loadmore event will be triggered when 600 has beed scrolled and there is less than 400 left.
* loadmoreretry : <number> default value 0，whether to reset loadmore related UI when loadmore failed, will be deprecated in further release.

Please checkout [Scroller Component Attributes](./scroller.html) to have a look at the inherited attributes from direct parent.

### Styles

common styles: check out [common styles for components](../common-style.html)

* support flexbox related styles
* support box model related styles
* support position related styles
* support opacity, background-color etc.

### Events

onloadmore  0.5 used with loadmoreoffset attribute. if the view has less than loadmoreoffset to scroll down, the onloadmore event will be triggered.

common events: check out the [common events](../common-event.html)

* support onclick event. Check out [common events](../common-event.html)
* support onappear / ondisappear event. Check out [common events](../common-event.html)


### API

All cells or cell's subcomponents in list support the scrollToElement API in [dom module](../modules/dom.html)

#### Difference between loading child component and onloadmore event

loading is a child component that can response to the onloading  event, and this event can only be triggered when the  scroller/list has been scrolled down to the bottom.
onloadmore is an event that will be triggered when the rest of the scroller/list is less than loadmoreoffset long.

### Restrictions

Nested lists or scrollers within the same direction are not supported. In other words. nested lists/scroller must have different directions.
For example, a vertical list nested in a vertical list or scroller is not allowed. However, a vertical list nested in a horizontal list or scroller is legal.

### Example

```html
<template>
  <list class="list" @loadmore="fetch" loadmoreoffset="10">
    <cell class="cell" v-for="num in lists">
      <div class="panel">
        <text class="text">{{num}}</text>
      </div>
    </cell>
  </list>
</template>

<script>
  const modal = weex.requireModule('modal')
  const LOADMORE_COUNT = 4

  export default {
    data () {
      return {
        lists: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      fetch (event) {
        modal.toast({ message: 'loadmore', duration: 1 })

        setTimeout(() => {
          const length = this.lists.length
          for (let i = length; i < length + LOADMORE_COUNT; ++i) {
            this.lists.push(i + 1)
          }
        }, 800)
      }
    }
  }
</script>

<style scoped>
  .panel {
    width: 600px;
    height: 250px;
    margin-left: 75px;
    margin-top: 35px;
    margin-bottom: 35px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
  .text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
  }
</style>
```

[try it](../../examples/list.html)