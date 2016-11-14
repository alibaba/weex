<!--
  * `this.$on(type, handler)`: registers a component event listener
  * `this.$off(type, handler)`: removes a component event listener
  * `this.$emit(type, detail)`: sends component event to itself
-->

<template>
  <div>
    <text class="title" v-for="value in list">{{value}}</text>
  </div>
</template>

<style>
  .title {font-size: 48px;}
</style>

<script>
  module.exports = {
    data: {
      list: []
    },
    mounted: function () {
      function custom(e) {
        this.list.push('custom: ' + JSON.stringify(e))
      }

      this.$emit('custom', {x: 1})

      this.$on('custom', custom)
      this.$emit('custom', {x: 2})

      this.$off('custom', custom)
      this.$emit('custom', {x: 3})
    }
  }
</script>
