<!--
  * class name with data binding
-->

<template>
  <div @click="update">
    <text class="a">Hello</text>
    <text class="b">Hello</text>
    <text :class="['a', x]">Hello</text>
  </div>
</template>

<style>
  .a {font-size: 48px;}
  .b {color: #ff0000;}
</style>

<script>
  module.exports = {
    data: {
      x: ''
    },
    methods: {
      update: function (e) {
        this.x = 'b'
      }
    }
  }
</script>
