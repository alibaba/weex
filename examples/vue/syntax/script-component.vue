<!--
  * `components` option to require sub components
  * use attribute to pass props to sub components
  * see `./include/sub.vue` source code for more details
-->

<template>
  <list>
    <cell v-for="item in items">
      <text>{{item.title}}</text>
      <item :title="'a'"></item>
    </cell>
  </list>
</template>

<script>
  module.exports = {
    data: {
      items: [
        {title: 'A', url: 'a'},
        {title: 'B', url: 'b'},
        {title: 'C', url: 'c'}
      ]
    },
    components: {
      item: require('./include/sub.vue')
    }
  }
</script>
