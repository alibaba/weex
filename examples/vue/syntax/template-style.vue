<!--
  * inline style with data binding
-->

<template>
  <div @click="update">
    <text style="font-size: 48px; color: #0000ff">Hello</text>
    <text :style="{ fontSize: size, color: color }">Hello</text>
  </div>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        size: 32,
        color: '#ff0000'
      }
    },
    methods: {
      update: function (e) {
        this.size = 48
        console.log('this.size', this.size)
      }
    }
  }
</script>
