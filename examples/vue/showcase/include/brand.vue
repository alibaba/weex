<template>
  <div class="container">
    <image v-if="ds.floorTitle" class="title" :src="ds.floorTitle"></image>
    <div style="margin-left:4;margin-right:4">
      <banners direction="column" :ds="bannerItems" :width="NUMBER_742" :height="NUMBER_230" :space="NUMBER_4"></banners>
    </div>
  </div>
</template>
<style>
  .title {
    width: 750;
    height: 100;
  }

  .container {
    margin-bottom: 4;
    background-color:#C0BABC;
  }
</style>
<script>
  module.exports = {
    components: {
      banners: require('./banners.vue')
    },
    props: {
      ds: {
        default: function () {
          return {
            bannerItems: []
          }
        }
      }
    },
    data: function () {
      return {
        NUMBER_742: 742,
        NUMBER_230: 230,
        NUMBER_4: 4
      }
    },
    computed: {
      bannerItems: function () {
        return this.ds.bannerItems.slice(0,8);
      }
    },
    created: function () {
      var bannerItems = this.ds.bannerItems
      bannerItems.sort(function(){
        return Math.random()-0.5;
      });
      for(var i=0;i<bannerItems.length;i++){
        var item =  bannerItems[i];
        if(i%2===0){
          item.img = item.leftImg;
          item.url = item.rightUrl;
        }else{
          item.img = item.rightImg;
          item.url = item.rightUrl;
        }
      }
    }
  }
</script>
