<template>
  <div
    :dataRole="dataRole"
    class="container"
    :style="{ height: height, backgroundColor: backgroundColor }">
    <text
      v-if="!rightItemSrc"
      naviItemPosition="right"
      :style="{ color: rightItemColor }"
      class="right-text"
      v-on:click="onclickrightitem">{{rightItemTitle}}</text>
    <image
      v-if="rightItemSrc"
      naviItemPosition="right"
      :src="rightItemSrc"
      class="right-image"
      v-on:click="onclickrightitem"></image>
    <text
      v-if="!leftItemSrc"
      naviItemPosition="left"
      :style="{ color: leftItemColor }"
      class="left-text"
      v-on:click="onclickleftitem">{{leftItemTitle}}</text>
    <image
      v-if="leftItemSrc"
      naviItemPosition="left"
      :src="leftItemSrc"
      class="left-image"
      v-on:click="onclickleftitem"></image>
    <text
      naviItemPosition="center"
      :style="{ color: titleColor }"
      class="center-text">{{title}}</text>
  </div>
</template>

<style>
  .container {
    flex-direction: row; 
    position: fixed; 
    top: 0; 
    left: 0; 
    right: 0; 
    width: 750;
  }
  .right-text {
    position: absolute; 
    bottom: 28; 
    right: 32; 
    text-align: right;
    font-size: 32; 
    font-family: 'Open Sans', sans-serif;
  }
  .left-text {
    position: absolute; 
    bottom: 28; 
    left :32; 
    text-align :left;  
    font-size: 32; 
    font-family: 'Open Sans', sans-serif;
  }
  .center-text {
    position: absolute; 
    bottom: 25; 
    left: 172; 
    right: 172;
    text-align: center; 
    font-size: 36; 
    font-weight: bold;
  }
  .left-image {
    position: absolute; 
    bottom: 20; 
    left: 28; 
    width: 50; 
    height: 50;
  }
  .right-image {
    position: absolute; 
    bottom: 20; 
    right: 28; 
    width: 50; 
    height: 50;
  }
</style>

<script>
  module.exports = {
    props: {
      dataRole: { default: 'navbar' },
      //导航条背景色
      backgroundColor: { default: 'black' },
      //导航条高度
      height: { default: 88 },
      //导航条标题 
      title: { default: '' },
      //导航条标题颜色
      titleColor: { default: 'black' },
      //右侧按钮图片
      rightItemSrc: { default: '' },
      //右侧按钮标题
      rightItemTitle: { default: '' },
      //右侧按钮标题颜色
      rightItemColor: { default: 'black' },
      //左侧按钮图片
      leftItemSrc: { default: '' },
      //左侧按钮标题
      leftItemTitle: { default: '' },
      //左侧按钮颜色
      leftItemColor: { default: 'black' }
    },
    methods: {
      onclickrightitem: function (e) {
        this.$emit('naviBarRightItemClick');
      },
      onclickleftitem: function (e) {
        this.$emit('naviBarLeftItemClick');
      }
    }
  }
</script>
