<template>
  <scroller>
    <panel title="Dialog" type="primary">
      <tip type="success" value="It's a weex example template." style="margin-bottom: 20px;"></tip>
      <hn level="1" value="H1"></hn>
      <button type="primary" @click.native="toast" value="Toast"></button>
      <hn level="2" value="H3"></hn>
      <button type="warning" @click.native="toast" value="Toast"></button>
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
  var modal = weex.requireModule('modal')
  module.exports = {
    data: function () {
      return {
        img: '//gw.alicdn.com/tps/i2/TB1DpsmMpXXXXabaXXX20ySQVXX-512-512.png_400x400.jpg'
      }
    },
    components: {
      panel: require('./include/panel.vue'),
      hn: require('./include/hn.vue'),
      tip: require('./include/tip.vue'),
      button: require('./include/button.vue')
    },
    methods: {
      toast: function() {
        modal.toast({ message: 'a toast', duration: 2 })
      }
    }
  }
</script>
