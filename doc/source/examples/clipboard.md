---
title: clipboard
type: example
layout: example
web_bundle_url: ../js/examples/clipboard.web.js
---

```html
<template>
  <div>
    <div class="div">
      <text class="text" @click="onItemClick">{{message}}</text>
    </div>
    <div class="div">
      <text class="text" @click="setContent">Click to copy: {{tobecopied}}</text>
    </div>
  </div>
</template>

<script>
  const clipboard = weex.requireModule('clipboard')

  export default {
    data () {
      return {
        tobecopied: 'yay!',
        message: 'nothing.'
      }
    },

    methods: {
      setContent () {
        clipboard.setString(this.tobecopied)
      },
      onItemClick () {
        this.message = 'clicked! '
        clipboard.getString(ret => {
          this.message = 'text from clipboard:' + ret.data
        })
      }
    }
  }
</script>

<style scoped>
  .div {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 750px;
    height: 90px;
    padding-left: 30px;
    padding-right: 30px;

    border-bottom-width: 1px;
    border-style: solid;
    border-color: #DDDDDD;
  }
  .text {
    width: 750px;
    height: 90px;
  }
</style>
```