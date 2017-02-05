<template>
  <text
    :value="value"
    :style="{ backgroundColor: bgColor }"
    class="item txt"></text>
</template>

<script>
  module.exports = {
    props: {
      value: { default: '' },
      type: { default: '0' } // 0, 1
    },
    computed: {
      bgColor: function () {
        return this.type == '1' ? '#7BA3A8' : '#BEAD92';
      }
    }
  }
</script>

<style>
  .item {
    margin-right: 10px;
    /*margin-bottom: 10px;*/
    width: 160px;
    height: 75px;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .txt {
    color: #eee;
  }
</style>
