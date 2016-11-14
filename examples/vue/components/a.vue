<template>
  <scroller>
    <panel title="Hyperlink" type="primary">
      <a href="http://g.tbcdn.cn/ali-wireless-h5/res/0.0.16/hello.js">
        <tip type="info" style="margin-bottom: 20px;"
          value="Click me to see how 'A' element opens a new world."></tip>
      </a>
    </panel>
  </scroller>
</template>

<script>
  module.exports = {
    data: {
      img: '//gw.alicdn.com/tps/i2/TB1DpsmMpXXXXabaXXX20ySQVXX-512-512.png_400x400.jpg'
    },
    components: {
      panel: require('weex-vue-components/panel.vue'),
      tip: require('weex-vue-components/tip.vue')
    }
  }
</script>
