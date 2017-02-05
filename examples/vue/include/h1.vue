<template>
  <text class="h1">{{value}}</text>
</template>

<style>
  .h1 {font-size: 64px; font-weight: bold;
    padding: 20px; margin-top: 20px; margin-bottom: 20px;
    background-color: #eee;}
</style>

<script>
  exports.props = ['value']
</script>
