<template>
  <div class="wrapper">
    <div class="toolbar" append="tree">
      <button type="primary" size="small" value="back"
        style="margin-left:30px;width:210px; margin-top:5px; margin-bottom:5px"
        @click.native="goback"></button>
      <button type="primary" size="small" value="forward"
        style="margin-left:30px;width:210px; margin-top:5px; margin-bottom:5px"
        @click.native="goforward"></button>
      <button type="primary" size="small" value="refresh"
        style="margin-left:30px;width:210px; margin-top:5px; margin-bottom:5px"
        @click.native="refresh"></button>
    </div>
    <web class="content" ref="webview" src='http://alibaba.github.io/weex/index.html'
      @pagestart="startload" @pagefinish="finishload" @error="failload"></web>
  </div>
</template>

<style>
  .wrapper {
    width: 750;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 0;
    margin-bottom: 70;
  }
  .toolbar {
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70;
  }
</style>

<script>
  var webview = require('@weex-module/webview');
  module.exports = {
    components: {
      button: require('../include/button.vue')
    },
    methods: {
      goback: function() {
        var el = this.$refs.webview
        webview.goBack(el)
      },
      goforward: function() {
        var el = this.$refs.webview
        webview.goForward(el)
      },
      refresh: function() {
        var el = this.$refs.webview
        webview.reload(el)
      },
      startload: function(e) {
      },
      finishload: function(e) {
      },
      failload: function(e) {
      }
    }
  }
</script>
