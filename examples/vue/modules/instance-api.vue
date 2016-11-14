<template>
  <scroller>
    <panel title="$getConfig()" type="primary">
      <text>{{config}}</text>
    </panel>
  </scroller>
</template>

<script>
  module.exports = {
    data: {
      config: ''
    },
    components: {
      panel: require('weex-vue-components/panel.vue')
    },
    created: function() {
      var config = this.$getConfig();
      console.log('config', JSON.stringify(config));
      this.config = JSON.stringify(config, null, 2);
    }
  }
</script>
