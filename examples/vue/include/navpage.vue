<template>
  <div class="wrapper">
    <navbar
      :dataRole="dataRole"
      :height="height"
      :backgroundColor="backgroundColor"
      :title="title"
      :titleColor="titleColor"
      :leftItemSrc="leftItemSrc"
      :leftItemTitle="leftItemTitle"
      :leftItemColor="leftItemColor"
      :rightItemSrc="rightItemSrc"
      :rightItemTitle="rightItemTitle"
      :rightItemColor="rightItemColor"
      @naviBarRightItemClick="naviBarRightItemClick"
      @naviBarLeftItemClick="naviBarLeftItemClick"
      ></navbar>
    <div class="wrapper" :style="{ marginTop: height }">
      <slot></slot>
    </div>
  </div>
</template>

<style>
  .wrapper {
    position: absolute; 
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    width: 750;
  }
</style>

<script>
  module.exports = {
    components: {
      navbar: require('./navbar.vue')
    },
    props: {
      dataRole: { default: 'navbar' },
      backgroundColor: { default: 'black' },
      height: { default: 88 },
      title: { default: "" },
      titleColor: { default: 'black' },
      rightItemSrc: { default: '' },
      rightItemTitle: { default: '' },
      rightItemColor: { default: 'black' },
      leftItemSrc: { default: '' },
      leftItemTitle: { default: '' },
      leftItemColor: { default: 'black' }
    },
    methods: {
      naviBarRightItemClick: function (e) {
        this.$emit('naviBarRightItemClick', e)
      },
      naviBarLeftItemClick: function (e) {
        this.$emit('naviBarLeftItemClick', e)
      }
    }
  }
</script>
