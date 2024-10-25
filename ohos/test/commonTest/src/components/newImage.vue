<template>
  <div>
    <image class="image-css" :src="imagesrc1"></image>
  </div>
</template>

<script>
export default {
  props: {
    imagesrc: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      imagesrc1: '',
    };
  },
  mounted() {
    this.imagesrc1 = this.imagesrc;
  },
};
</script>

<style scoped>
.image-css {
  width: 200px;
  height: 300px;
}
</style>
