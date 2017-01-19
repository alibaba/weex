<template>
  <scroller>
    <panel title="Hyperlink" type="primary">
      <a href="http://alibaba.github.io/weex/index.html">
        <tip type="info" style="margin-bottom: 20px;"
          value="Click me to see how 'A' element opens a new world."></tip>
      </a>
    </panel>
  </scroller>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        img: '//gw.alicdn.com/tps/i2/TB1DpsmMpXXXXabaXXX20ySQVXX-512-512.png_400x400.jpg'
      }
    },
    components: {
      panel: require('../include/panel.vue'),
      tip: require('../include/tip.vue')
    }
  }
</script>
