<template>
  <div>
    <text class="title" v-for="value in list">{{value}}</text>
  </div>
</template>

<style>
  .title {font-size: 48px;}
</style>

<script>
  var initMessage
  module.exports = {
    data: {
      list: ['Lifecycle List']
    },
    init: function () {
      initMessage = 'component init: nothing more happen even the data initialization'
    },
    created: function () {
      this.list.push(initMessage)
      this.list.push('component created: data observed')
    },
    mounted: function () {
      this.list.push('component mounted: virtual dom generated')
    }
  }
</script>
