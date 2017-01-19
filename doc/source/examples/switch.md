---
title: switch
type: example
layout: example
web_bundle_url: ../js/examples/switch.web.js
---

```html
<template>
  <div>
    <div class="example">
      <text class="label">normal</text>
      <switch></switch>
    </div>
    <div class="example">
      <text class="label">checked</text>
      <switch checked="true"></switch>
    </div>
    <div class="example">
      <text class="label">disabled</text>
      <switch disabled="true" checked="true"></switch>
      <switch disabled="true"></switch>
    </div>
    <div class="example">
      <text class="label">onchange</text>
      <switch @change="onchange"></switch>
      <text class="info">{{checked}}</text>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        checked: false
      }
    },
    methods: {
      onchange (event) {
        console.log(`onchage, value: ${event.value}`)
        this.checked = event.value
      }
    }
  }
</script>

<style scoped>
  .example {
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 60px;
  }
  .label {
    font-size: 40px;
    line-height: 60px;
    width: 350px;
    color: #666;
    text-align: right;
    margin-right: 20px;
  }
  .info {
    font-size: 30px;
    line-height: 60px;
    color: #BBB;
    margin-left: 10px;
  }
</style>
```