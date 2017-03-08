<!--
  * v-for="item in list": assign item and $index to this
  * v-for="(index, item) in list" assign index and item to this
-->

<template>
  <div>
    <text class="title">Custom item</text>
    <text class="subtitle" v-for="item in list" :key="item.index" >{{item}}</text>
    <text class="title">Custom key and item</text>
    <text class="subtitle" v-for="(v,i) in list" :key="i" >{{i}}-{{v}}</text>
    <text class="title">Array of Object</text>
    <text class="subtitle" v-for="(item, k, index) in list2" :key="index" >> {{index}}-{{item.text}}</text>
  </div>
</template>

<style scoped>
  .title {font-size: 48px;}
  .subtitle {font-size: 36px;}
</style>

<script>
  module.exports = {
    data: function () {
      return {
        list: [
          'a',
          'b',
          'c',
          'd',
          'e'
        ],
        list2: [
          {text: 'a'},
          {text: 'b'},
          {text: 'c'},
          {text: 'd'},
          {text: 'e'}
        ]
      }
    }
  }
</script>
