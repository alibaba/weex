<template>
  <text class="h2">{{value}}</text>
</template>

<style>
  .h2 {font-size: 48px; font-weight: bold;
    padding: 20px; margin-top: 20px; margin-bottom: 20px;
    background-color: #eee;}
</style>

<script>
  exports.props = ['value']
</script>
