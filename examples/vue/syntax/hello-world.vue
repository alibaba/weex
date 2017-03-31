<!--
  * <template>: html-like syntax
  * CSS-like inline style
  * <style>: only support single-class selector
  * <script>: define the behavior of component
  * :attr data-binding support
  * @xxx syntax to bind event with a component method
-->

<!--
  notes:
  * <template> only could have just one child
  * the text node is only allowed as the child of <text> as the shorthand of its `value` attribute
  * the style is not inherited from parent (for example: `font-size`)
  * <script> support ECMAScript 5
  * all component options assigns to `module.exports`
-->

<template>
  <div class="wrapper" @click="update">
    <image :src="logoUrl" class="logo"></image>
    <text class="title">Hello {{target}}</text>
  </div>
</template>

<style>
  .wrapper {align-items: center; margin-top: 120px;}
  .title {font-size: 48px;}
  .logo {width: 360px; height: 82px;}
</style>

<script>
  module.exports = {
    data: {
      logoUrl: 'https://alibaba.github.io/weex/img/weex_logo_blue@3x.png',
      target: 'World'
    },
    methods: {
      update: function (e) {
        this.target = 'Weex'
        console.log('target:', this.target)
      }
    }
  }
</script>
