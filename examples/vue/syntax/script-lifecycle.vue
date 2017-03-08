<template>
  <div>
    <text class="title" v-for="(value, i) in list" :key="i" >{{value}}</text>
  </div>
</template>

<style scoped>
  .title {font-size: 48px;}
</style>

<script>
  var initMessage
  module.exports = {
    data: function () {
      return {
        list: ['Lifecycle List']
      }
    },
    init: function () {
      initMessage = 'component init: nothing more happen even the data initialization'
      console.log('init:', this.list)
    },
    created: function () {
      this.list.push(initMessage)
      this.list.push('component created: data observed')
      console.log('created:', this.list)
    },
    mounted: function () {
      this.list.push('component mounted: virtual dom generated')
      console.log('mounted:', this.list)
    }
  }
</script>
