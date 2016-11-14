<template>
  <scroller>
    <panel title="Dialog" type="primary">
      <tip type="success" value="It's a weex example template." style="margin-bottom: 20px;"></tip>
      <hn level="1" value="H1"></hn>
      <button type="primary" @click="toast" value="Toast"></button>
      <hn level="2" value="H3"></hn>
      <button type="warning" @click="toast" value="Toast"></button>
    </panel>
    <panel title="Image" type="primary">
      <tip type="warning" value="Weex screen width is 750" style="margin-bottom: 20px;"></tip>
      <image class="img" style="width: 400px; height: 400px;" :src="img"></image>
      <panel title="Image" type="default">
        <text>sub info</text>
      </panel>
    </panel>
  </scroller>
</template>

<script>
  var getBaseURL = require('./include/base-url.js').getBaseURL
  var baseURL = getBaseURL(this)
  var modal = require('@weex-module/modal')
  module.exports = {
    data: {
      img: '//gw.alicdn.com/tps/i2/TB1DpsmMpXXXXabaXXX20ySQVXX-512-512.png_400x400.jpg'
    },
    components: {
      panel: require('weex-vue-components/panel.vue'),
      hn: require('weex-vue-components/hn.vue'),
      tip: require('weex-vue-components/tip.vue'),
      button: require('weex-vue-components/button.vue')
    },
    methods: {
      toast: function() {
        modal.toast({ message: 'a toast', duration: 2 })
      }
    }
  }
</script>
