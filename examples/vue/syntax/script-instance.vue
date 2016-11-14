<!--
  * access data/props
  * access computed
  * call methods
  * get config
  * listen and fire component events
  * parent component and sub components
  * find element
-->

<template>
  <div>
    <text id="title" class="title">Please check out the source code.</text>
    <!-- <subcomponent ref="sub"></subcomponent> -->
  </div>
</template>

<style>
  .title {font-size: 48px;}
</style>

<script>
  module.exports = {
    data: {
      x: 1,
      y: 2
    },
    methods: {
      foo: function () {
        console.log('foo')
      },
      test: function () {

        // access data/props
        console.log(this.x)

        // access computed
        console.log(this.z)

        // call methods
        this.foo()

        // get config
        console.log(this.$getConfig())

        // listen and fire component events
        this.$emit('custom')
        this.$on('custom', this.foo)
        this.$off('custom', this.foo)

        // // parent component and sub components
        // this.$parent.$emit('custom')
        // this.$refs['sub'].$emit('custom')

        // // find element
        // var dom = require('@weex-module/dom')
        // dom.scrollToElement(this.$el('title'), {offset: 0})
      }
    },
    computed: {
      z: function () {
        return this.x + this.y
      }
    },
    mounted: function () {
      this.test()
    }
  }
</script>
