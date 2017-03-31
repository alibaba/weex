<template>
  <div
    :style="{ backgroundColor: bgColor }"
    class="item"
    v-on:click="click"
    v-on:touchstart="touchstart"
    v-on:touchend="touchend">
    <slot></slot>
  </div>
</template>

<script>
  module.exports = {
    props:  {
      bgColor: { default: '#ffffff' }
    },
    methods: {
      click: function () {
        this.$emit('click')
      },
      touchstart: function() {
        // FIXME android touch
        // TODO adaptive opposite bgColor
        // this.bgColor = '#e6e6e6';
      },
      touchend: function() {
        // FIXME android touchend not triggered
        // this.bgColor = '#ffffff';
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
