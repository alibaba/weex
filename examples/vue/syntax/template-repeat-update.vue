<!--
  * track-by="primary": diff array by this as the primary key, default is the index
  * use `Vue.set(list, index, value)` to set a item value, do not use `list[index] = value`
  * use `list.splice()`, `list.push()`, `list.pop()`, `list.shift()`, `list.unshift()`, `list.sort()`, `list.reverse()`, do not use `list.length = x`
-->

<template>
  <div>
    <text class="title">Track by</text>
    <text class="subtitle" v-for="item in list" track-by="item.key">{{$index}}-{{item.text}}</text>
    <text class="btn" @click="update">Update</text>
    <text class="btn" @click="mutate">Mutate</text>
  </div>
</template>

<style>
  .title {font-size: 48px;}
  .subtitle {font-size: 36px;}
  .btn {font-size: 36px; text-align: center; color: white; background-color: gray; padding: 20px; border-radius: 5px;}
</style>

<script>
  module.exports = {
    data: {
      list: [
        {key: 1, text: 'a'},
        {key: 2, text: 'a'},
        {key: 3, text: 'b'},
        {key: 4, text: 'c'},
        {key: 5, text: 'a'}
      ],
      flag: true
    },
    methods: {
      update: function (e) {
        // equals to `this.list.text = 'foo'`
        // DO NOT USE: `this.list[2] = {key: 3, text: 'foo'}}`
        Vue.set(this.list, 2, {key: 3, text: 'foo'})
      },
      mutate: function (e) {
        if (this.list.length % 2) {
          this.list.push({key: 'x', text: 'bar'})
        }
        else {
          this.list.pop()
        }
      }
    }
  }
</script>
