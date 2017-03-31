<template>
  <div v-if="!ds.isHide">
    <div class="big-banner-container">
      <banner :width="NUMBER_750" :height="NUMBER_200" :src="ds.bigBannerImg" :href="ds.bigBannerUrl"></banner>
    </div>
    <banners direction="row" :ds="ds.smallBannerItems" :width="NUMBER_373" :height="NUMBER_224" :space="NUMBER_4"></banners>
  </div>
</template>

<style>
  .title {
    width: 750;
    height: 100;
  }
  .big-banner-container{
    margin-bottom:4;
  }
</style>

<script>
  module.exports = {
    components: {
      banners: require('./banners.vue'),
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
        NUMBER_750: 750,
        NUMBER_200: 200,
        NUMBER_373: 373,
        NUMBER_224: 224,
        NUMBER_4: 4
      }
    }
  }
</script>
