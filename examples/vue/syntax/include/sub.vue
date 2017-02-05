<template>
  <text class="item-txt">{{title}}</text>
</template>

<style>
  .item-txt {
    font-size: 48px;
    color: #555;
  }
</style>

<script>
  module.exports = {
    props: ['url', 'title']
  }
</script>
