<template>
  <div class="item" ontouchstart="touchstart" ontouchend="touchend"
             style="background-color:{{bgColor}};">
    <content></content>
  </div>
</template>

<script>
  module.exports = {
    data: {
      bgColor: '#ffffff'
    },
    methods: {
      touchstart: function() {
        // FIXME android touch
        // TODO adaptive opposite bgColor
//        this.bgColor = '#e6e6e6';
      },
      touchend: function() {
        // FIXME android touchend not triggered
//        this.bgColor = '#ffffff';
      }
    }
  }
</script>

<style>
  .item {
    padding-top: 25px;
    padding-bottom: 25px;
    padding-left: 35px;
    padding-right: 35px;
    height: 160px;
    justify-content: center;
    /*margin-bottom: 1px; FUTURE */
    border-bottom-width: 1px;
    border-color: #dddddd;
  }
</style>