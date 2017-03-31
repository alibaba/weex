<!--
  * components
  * props
  * data
  * computed
  * methods
  * lifecycle
-->

<template>
  <div>
    <text class="title">Please check out the source code.</text>
    <!-- <item ref="sub"></item> -->
  </div>
</template>

<style>
  .title {font-size: 48px;}
</style>

<script>
  module.exports = {
    // // import sub components
    // components: {
    //   item: require('./components/sub.vue')
    // },

    // // for sub component only
    // props: ['a', 'b'],

    // for root component only
    data: {
      x: 1,
      y: 2
    },
    // // for sub component only
    // data: function () {
    //   return {
    //     x: 1,
    //     y: 2
    //   }
    // }

    methods: {
      foo: function () {
        console.log('foo')
      }
    },

    computed: {
      z: function () {
        return this.x + this.y
      }
    },

    init: function () {},
    created: function () {},
    mounted: function () {}
  }
</script>
