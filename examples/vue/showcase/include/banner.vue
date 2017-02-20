<template>
  <image :style="{ width: width, height: height }" :src="src" :image-quality="quality"
    @click="clickHandler"></image>
</template>
<script>
  var modal = weex.requireModule('modal')
  module.exports = {
    props: ['width', 'height', 'src', 'href'],
    data: function () {
      return {
        quality: 'normal'
      }
    },
    methods: {
      clickHandler: function () {
        modal.toast({
          message: 'click',
          duration: 1
        });
      }
    }
  };
</script>
