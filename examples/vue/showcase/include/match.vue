<template>
  <div>
    <image v-if="ds.floorTitle" class="title" :src="ds.floorTitle"></image>
    <div class="tm-banner" v-if="ds.isShowTmSpecBanner && ds.tmSpecBanner">
      <banner :width="NUMBER_750" :height="NUMBER_200" :src="ds.tmSpecBanner.img" :href="ds.tmSpecBanner.url"></banner>
    </div>
    <div v-for="(item,i) in ds.bannerItems" :key="i" :style="{ flexDirection: 'row', marginBottom: NUMBER_4 }">
      <div :style="{ marginRight: NUMBER_4 }">
        <banner :width="NUMBER_373" :height="NUMBER_240" :src="item.leftImg" :href="item.leftUrl"></banner>
      </div>
      <div>
        <banner :width="NUMBER_373" :height="NUMBER_240" :src="item.rightImg" :href="item.rightUrl"></banner>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .title {
    width: 750;
    height: 100;
  }
  .tm-banner{
    bottom:4;
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
        NUMBER_750: 750,
        NUMBER_373: 373,
        NUMBER_240: 240,
        NUMBER_200: 200,
        NUMBER_4: 4
      }
    }
  }
</script>
