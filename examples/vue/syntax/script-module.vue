<!--
  * `var module = require('@weex-module/module')` to import a native module
  * `module.method(...)` to call a native API
-->

<template>
  <div>
    <text class="btn" @click="test">Toast!</text>
  </div>
</template>

<style>
  .btn {font-size: 36px; text-align: center; color: white; background-color: gray; padding: 20px; border-radius: 5px;}
</style>

<script>
  var modal = require('@weex-module/modal')
  module.exports = {
    methods: {
      test: function () {
        modal.toast({
          message: 'Toast!',
          duration: 3
        })
      }
    }
  }
</script>
