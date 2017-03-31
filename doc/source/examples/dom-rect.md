---
title: dom-rect
type: example
layout: example
web_bundle_url: ../js/examples/dom-rect.web.js
---

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