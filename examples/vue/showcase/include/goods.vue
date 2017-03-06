<template>
  <div v-if="!ds.isHide">
    <image v-if="ds.floorTitle" class="title" :src="ds.floorTitle"></image>
    <slider class="slider" show-indicators="true" auto-play="true" interval="3000">
      <div class="pannel" v-for="(item,i) in ds.bannerItems" :key="i" >
        <div>
          <banner style="margin-bottom:4" :width="NUMBER_251" :height="NUMBER_292" :src="item.img1" :href="item.url1"></banner>
          <banner :width="NUMBER_251" :height="NUMBER_292" :src="item.img2" :href="item.url2"></banner>
        </div>
        <div  class="middle-col">
          <banner :width="NUMBER_240" :height="NUMBER_588" :src="item.img3" :href="item.url3"></banner>
        </div>
        <div>
          <banner style="margin-bottom:4" :width="NUMBER_251" :height="NUMBER_292" :src="item.img4" :href="item.url4"></banner>
          <banner :width="NUMBER_251" :height="NUMBER_292" :src="item.img5" :href="item.url5"></banner>
        </div>
      </div>
      <indicator
        style="position:absolute;width:714;height:200;left:10;bottom:-80;itemSize:20;itemColor:#999999;itemSelectedColor:#000000;"></indicator>
    </slider>
  </div>
</template>

<style scoped>
  .title {
    width: 750;
    height: 100;
  }

  .slider {
    height: 652;
  }

  .pannel {
    width: 750;
    height: 592;
    flex-direction: row;
  }

  .middle-col {
    margin-left:4;
    margin-right:4;
    width: 240;
    height: 588;
  }
</style>

<script>
  module.exports = {
    components: {
      banner: require('./banner.vue')
    },
    props: {
      ds: {
        default: function () {
          return {}
        }
      }
    },
    data: function () {
      return {
        NUMBER_251: 251,
        NUMBER_240: 240,
        NUMBER_292: 292,
        NUMBER_588: 588
      }
    }
  }
</script>
