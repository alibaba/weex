<!--
  * `components` option to require sub components
  * use attribute to pass props to sub components
  * see `./include/sub.vue` source code for more details
-->

<template>
  <list>
    <cell v-for="(item,i) in items" :key="i" >
      <text>{{item.title}}</text>
      <item :title="'a'"></item>
    </cell>
  </list>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        items: [
          {title: 'A', url: 'a'},
          {title: 'B', url: 'b'},
          {title: 'C', url: 'c'}
        ]
      }
    },
    components: {
      item: require('./include/sub.vue')
    }
  }
</script>
