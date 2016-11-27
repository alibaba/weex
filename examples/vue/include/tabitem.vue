<template>
  <div
    :style="{ backgroundColor: backgroundColor }"
    class="container"
    @click="onclickitem">
    <image
      src="http://gtms03.alicdn.com/tps/i3/TB1mdsiMpXXXXXpXXXXNw4JIXXX-640-4.png"
      class="top-line"></image>
    <image
      :src="icon"
      class="tab-icon"></image>
    <text
      :style="{ color: titleColor }"
      class="tab-text">{{title}}</text>
  </div>  
</template>

<style>
  .container {
    flex: 1; 
    flex-direction: column; 
    align-items:center; 
    justify-content:center; 
    height: 88;
  }
  .top-line {
    position: absolute; 
    top: 0; 
    left: 0; 
    right: 0; 
    height: 2;
  }
  .tab-icon {
    margin-top: 5; 
    width: 40; 
    height: 40
  }
  .tab-text {
    margin-top: 5; 
    text-align: center;  
    font-size: 20;
  }
</style>

<script>
  module.exports = {
    props: {
      index: { default: 0 },
      title: { default: '' },
      titleColor: { default: '#000000' },
      icon: { default: '' },
      backgroundColor: { default: '#ffffff' }
    },
    methods: {
      onclickitem: function (e) {
        var params = {
          index: this.index
        };
        this.$emit('tabItemOnClick', params);
      }
    }
  }
</script>
