<template>
  <div class="container">
    <image class="banner" :src="ds.topBanner"></image>
    <div class="rule-container">
      <link style="font-size:22px;color:#ffffff;text-align:center;"
        text="帮助" :href="ds.ruleLink"></link>
    </div>
    <div class="announce">
      <image class="announce-hd" :src="ds.announceHdBanner"></image>
      <banners style="margin-left:6;margin-right:6;"
        :ds="ds.bannerItems" direction="row" :width="NUMBER_233"
        :height="NUMBER_172" :space="NUMBER_3">
      </banners>
    </div>
  </div>
</template>

<style>
  .banner {
    width: 750;
    height: 782;
  }

  .share-container {
    position: absolute;
    right: 100;
    top: 15;
    z-index: 100;
    font-size: 20;
    color: #ffffff;
    background-color: #000000;
    border-radius: 17;
    width: 110;
    height: 35;
    justify-content: center;
    align-items: center;
  }

  .rule-container {
    position: absolute;
    right: 22;
    top: 15;
    z-index: 100;
    font-size: 20;
    color: #ffffff;
    background-color: #000000;
    border-radius: 17;
    width: 70;
    height: 35;
    justify-content: center;
  }

  .announce {
    background-color: #f5f3f4;
    width: 716;
    height: 286;
    position: absolute;
    bottom: 17;
    left: 17;
    border-radius: 5;
  }

  .announce-hd {
    width: 700;
    height: 90;
    margin-top: 8;
    margin-bottom: 8;
    margin-left: 5;
    margin-right: 5;
  }
</style>

<script>
  module.exports = {
    components: {
      link: require('./link.vue'),
      banners: require('./banners.vue')
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
        NUMBER_233: 233,
        NUMBER_172: 172,
        NUMBER_3: 3
      }
    }
  };
</script>
