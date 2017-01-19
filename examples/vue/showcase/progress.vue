<template>
  <scroller>
    <panel title="Basic" type="primary">
      <div
        :style="{
          width: fullW,
          borderColor: '#333',
          borderWidth: 1,
          borderStyle: 'solid'
        }">
        <div
          :style="{
            width: w,
            height: 60,
            backgroundColor: '#333'
          }"></div>
      </div>
    </panel>
  </scroller>
</template>

<script>
  var INC = 20;
  module.exports = {
    data: function () {
      return {
        fullW: 600,
        w: 40
      }
    },
    components: {
      panel: require('../include/panel.vue')
    },
    created: function() {
      var me = this;
      setInterval(function () {
        if (me.w >= me.fullW) {
          me.w = 0
        }
        me.w = (me.w + INC >= me.fullW) ? me.fullW : me.w + INC
      }, 33);
    }
  }
</script>
