---
title: dom
type: references
order: 3.3
version: 2.1
---

# dom

## Summary

A series of dom apis that sending virtual-dom's messages to the native renderer to update the dom tree. The only API for developers to use in a `.we` file is `scrollToElement` <del>which you can use by calling the `$scrollTo` method</del>. Other APIs mentioned on this page should only be used through the native renderer in the `callNative` process.

## API

### scrollToElement(node, options)

Scroll the page to the specified node. This API should only be used on the element in the `scroller` or `list` component.

<del>This API can be used by calling the VM's method `$scrollTo` **(deprecated)**.</del> You can use `weex.requireModule('dom').scrollToElement` to call this API in your `.we` file.

#### Arguments

* `node`*(Node)*: an element that scrolled into the view.
* `options`*(object)*: some options.
  * `offset`*(number)*: An offset to the visible position, default is `0`.

#### Example

```html
<template>
  <div class="wrapper">
    <scroller class="scroller">
      <div class="row" v-for="(name, index) in rows" :ref="'item'+index">
        <text class="text" :ref="'text'+index">{{name}}</text>
      </div>
    </scroller>
    <div class="group">
      <text @click="goto10" class="button">Go to 10</text>
      <text @click="goto20" class="button">Go to 20</text>
    </div>
  </div>
</template>

<script>
  const dom = weex.requireModule('dom')

  export default {
    data () {
      return {
        rows: []
      }
    },
    created () {
      for (let i = 0; i < 30; i++) {
        this.rows.push('row ' + i)
      }
    },
    methods: {
      goto10 (count) {
        const el = this.$refs.item10[0]
        dom.scrollToElement(el, {})
      },
      goto20 (count) {
        const el = this.$refs.item20[0]
        dom.scrollToElement(el, { offset: 0 })
      }
    }
  }
</script>

<style scoped>
  .scroller {
    width: 700px;
    height: 700px;
    border-width: 3px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    margin-left: 25px;
  }
  .row {
    height: 100px;
    flex-direction: column;
    justify-content: center;
    padding-left: 30px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
  }
  .text {
    font-size: 45px;
    color: #666666;
  }
  .group {
    flex-direction: row;
    /*justify-content: space-around;*/
    justify-content: center;
    margin-top: 60px;
  }
  .button {
    width: 200px;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 40px;
    margin-left: 30px;
    margin-right: 30px;
    text-align: center;
    color: #41B883;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
</style>
```

[try it](../../examples/dom-scroll.html)

### getComponentRect(ref,callback) <span class="api-version">v0.9.4+</span>

You can get the view rectangle information of named element.

An example callback result maybe:

```json
{
  result: true,
  size: {
    bottom: 60,
    height: 15,
    left: 0,
    right: 353,
    top: 45,
    width: 353
  }
}
```

If you want to get the rectangle information of 'weex view' container, you can specify the `ref='viewport'`.

Example Useage:

```html
<template>
  <div class="wrapper">
    <div ref="box" class="box">
      <text class="info">Width: {{size.width}}</text>
      <text class="info">Height: {{size.height}}</text>
      <text class="info">Top: {{size.top}}</text>
      <text class="info">Bottom: {{size.bottom}}</text>
      <text class="info">Left: {{size.left}}</text>
      <text class="info">Right: {{size.right}}</text>
    </div>
  </div>
</template>

<script>
  const dom = weex.requireModule('dom')

  export default {
    data () {
      return {
        size: {
          width: 0,
          height: 0,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      }
    },
    mounted () {
      const result = dom.getComponentRect(this.$refs.box, option => {
        console.log('getComponentRect:', option)
        this.size = option.size
      })
      console.log('return value:', result)
      console.log('viewport:', dom.getComponentRect('viewport'))
    }
  }
</script>

<style scoped>
  .box {
    margin-top: 200px;
    margin-left: 150px;
    width: 450px;
    height: 450px;
    background-color: #DDD;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
  .info {
    font-size: 40px;
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
    color: #41B883;
  }
</style>
```

[try it](../../examples/dom-rect.html)