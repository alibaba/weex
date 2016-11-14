<!--
  * v-if="flag": display or not by the truthy/falsy result
-->

<template>
  <div>
    <text class="btn" @click="toggle">Toggle</text>
    <text v-if="flag" class="title">I'm ON</text>
    <text v-if="!flag" class="title">I'm Off</text>
  </div>
</template>

<style>
  .title {font-size: 48px;}
  .btn {font-size: 36px; text-align: center; color: white; background-color: gray; padding: 20px; border-radius: 5px;}
</style>

<script>
  module.exports = {
    data: {
      flag: true
    },
    methods: {
      toggle: function (e) {
        this.flag = !this.flag
      }
    }
  }
</script>
