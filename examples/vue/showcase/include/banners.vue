<template>
  <div>
    <div v-if="direction==='row'" style="flex-direction:row">
      <div v-for="(item,i) in ds" :key="i" :style="{ width: width, height: height, marginLeft: (i % ds.length ? space : 0) }">
        <banner :width="width" :height="height" :src="item.img" :href="item.url"></banner>
      </div>
    </div>
    <div v-if="direction==='column'">
      <div v-for="(item,i) in ds" :key="i" :style="{ width: width, height: height, marginTop: (i % ds.length ? space : 0) }">
        <banner :width="width" :height="height" :src="item.img" :href="item.url"></banner>
      </div>
    </div>
  </div>
</template>
<script>
  module.exports = {
    components: {
      banner: require('./banner.vue')
    },
    props: ['ds', 'width', 'height', 'space', 'direction']
  };
</script>
