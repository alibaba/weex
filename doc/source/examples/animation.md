---
title: animation
type: example
layout: example
web_bundle_url: ../js/examples/animation.web.js
---

```html
<template>
  <div class="wrapper">
    <div ref="test" @click="move" class="box"></div>
  </div>
</template>

<script>
  const animation = weex.requireModule('animation')
  const modal = weex.requireModule('modal')

  export default {
    methods: {
      move () {
        var testEl = this.$refs.test;
        animation.transition(testEl, {
          styles: {
            color: '#FF0000',
            transform: 'translate(250px, 100px)',
            transformOrigin: 'center center'
          },
          duration: 800, //ms
          timingFunction: 'ease',
          delay: 0 //ms
        }, function () {
          modal.toast({ message: 'animation finished.' })
        })
      }
    }
  }
</script>

<style scoped>
  .box {
    width: 250px;
    height: 250px;
    background-color: #DDD;
  }
</style>
```