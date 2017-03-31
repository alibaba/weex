---
title: <refresh> & <loading>
type: references
order: 2.7
version: 2.1
---

# refresh & loading

<span class="weex-version">v0.6.1+</span>

## Loading Components

To be rendered properly, the refresh/loading Components must appear inside the Scroller Component or the List Component.

### Child Components

Any other components, like the text and img components, can be put inside the refresh component. And there is a special component named loading-indicator used only inside the refresh or the loading components.

* loading-indicator is a child component implemented with default animation effect for the refresh component.

### Attributes

* display has value of show or hide.


### Styles
common styles: check out [common styles for components](../common-style.html)

### Events

* onloading triggered when loading


#### Restrictions
* refresh/loading does not support remove action,  Weex 0.9 will fix it.
* refresh/loading despite setting with display='hide', the refresh/loading view will still appear when scrolling due to known issues. it can be fixed with a another display='hide' when the refresh/loading should be hidden.
* refresh/loading can only be hidden or displayed with an attribute display with value of show or hide. And there should be a statement of display='hide' when display='show' shows up in an event function, or your scroller may not response to user inputs.

#### Example

```html
<template>
  <scroller class="scroller">
    <div class="cell" v-for="num in lists">
      <div class="panel">
        <text class="text">{{num}}</text>
      </div>
    </div>
    <loading class="loading" @loading="onloading" :display="showLoading">
      <text class="indicator">Loading ...</text>
    </loading>
  </scroller>
</template>

<script>
  const modal = weex.requireModule('modal')
  const LOADMORE_COUNT = 4

  export default {
    data () {
      return {
        showLoading: 'hide',
        lists: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      onloading (event) {
        modal.toast({ message: 'loading', duration: 1 })
        this.showLoading = 'show'
        setTimeout(() => {
          const length = this.lists.length
          for (let i = length; i < length + LOADMORE_COUNT; ++i) {
            this.lists.push(i + 1)
          }
          this.showLoading = 'hide'
        }, 1500)
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
    border-color: #DDDDDD;
    background-color: #F5F5F5;
  }
  .text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
  }
  .loading {
    justify-content: center;
  }
  .indicator {
    color: #888888;
    font-size: 42px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
  }
</style>
```

## Refresh Components

To be rendered properly, the refresh/loading Components must appear inside the Scroller Component or the List Component.

### Child Components

Any other components, like the text and img components, can be put inside the refresh component. And there is a special component named loading-indicator used only inside the refresh or the loading components.

* loading-indicator is a child component implemented with default animation effect for the refresh component.

### Attributes
* display has value of show or hide, default value is show.

Other attributes please check out the [common attributes](../common-attrs.html).


### Styles
common styles: check out [common styles for components](../common-style.html)

### Events
* onrefresh triggered when the scroller has been pulled down
* onpullingdown available on Android. triggered when the scroller has been pulled down. you can get dy, headerHeight, maxHeight from onpullingdowns event object.

### Restrictions

* refresh/loading does not support remove action, may support in Weex 0.9.
* refresh/loading despite setting with display='hide', the refresh/loading view will still appear when scrolling due to known issues. it can be fixed with a another display='hide' when the refresh/loading should be hidden.
* refresh/loading can only be hidden or displayed with an attribute display with value of show or hide. And there should be a statement of display='hide' when display='show' shows up in an event function, or your scroller may not response to user inputs.

### example

```html
<template>
  <scroller class="scroller">
    <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
      <text class="indicator">Refreshing ...</text>
    </refresh>
    <div class="cell" v-for="num in lists">
      <div class="panel">
        <text class="text">{{num}}</text>
      </div>
    </div>
  </scroller>
</template>

<script>
  const modal = weex.requireModule('modal')

  export default {
    data () {
      return {
        refreshing: false,
        lists: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      onrefresh (event) {
        console.log('is refreshing')
        modal.toast({ message: 'refresh', duration: 1 })
        this.refreshing = true
        setTimeout(() => {
          this.refreshing = false
        }, 2000)
      },
      onpullingdown (event) {
        console.log('is onpulling down')
        modal.toast({ message: 'pulling down', duration: 1 })
      }
    }
  }
</script>

<style scoped>
  .indicator {
    color: #888888;
    font-size: 42px;
    text-align: center;
  }
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
    border-color: #DDDDDD;
    background-color: #F5F5F5;
  }
  .text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
  }
</style>
```

[try it](../../examples/refresh.html)