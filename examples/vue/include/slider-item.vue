<template>
  <image class="slider-item" :src="image"></image>
</template>

<script>
  module.exports = {
    props: {
      image: { default: '' },
      link: { default: '' },
    }
  };
</script>

<style>
  .slider-item {
    width: 348px;
    height: 400px;
  }
</style>
