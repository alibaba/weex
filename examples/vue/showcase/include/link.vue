<template>
  <text @click="clickHandler">{{text}}</text>
</template>
<script>
  var modal = weex.requireModule('modal')
  module.exports = {
    props: ['text', 'href'],
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
