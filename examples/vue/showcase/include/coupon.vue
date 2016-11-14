<template>
  <div>
    <image v-if="ds.floorTitle" class="title" :src="ds.floorTitle"></image>
    <div class="wrapper">
      <image class="img" :src="currentStatus"></image>
      <div class="my-coupon" @click="handleClick"></div>
      <div class="guides" @click="handleClick"></div>
      <div class="lottery" @click="handleClick"></div>
    </div>
  </div>
</template>

<style>
  .title{
    width:750;
    height:100;
  }
  .wrapper {
    color: #FF4550;
    width: 750;
    height: 230;
  }

  .my-coupon {
    width: 180;
    height: 39;
    position: absolute;
    top: 15;
    right: 149;
  }

  .guides {
    height: 39;
    width: 110;
    position: absolute;
    top: 15;
    right: 32;
  }

  .lottery {
    width: 348;
    height: 76;
    position: absolute;
    top: 132;
    right: 70;
  }

  .info {
    font-size: 18;
    position: absolute;
    top: 84;
    right: 70;
  }

  .img {
    width: 750;
    height: 230;
  }
</style>

<script>
  var modal = require('@weex-module/modal')
  module.exports = {
    props: {
      ds: {
        default: function () {
          return {}
        }
      }
    },
    data: function () {
      return {
        currentStatus: '//img.alicdn.com/tps/i4/TB1cYBKMXXXXXayaXXXkxHk2pXX-750-228.jpg_q75.jpg'
      }
    },
    methods: {
      handleClick: function (e) {
        modal.toast({
            message: 'click',
            duration: 1
        });
      }
    }
  };
</script>
