<!--
  * <template>: html-like syntax
  * CSS-like inline style
  * <style>: only support single-class selector
  * <script>: define the behavior of component
  * :attr data-binding support
-->

<template>
  <div class="wrapper">
    <image
      :src="logoUrl"
      class="logo"
    ></image>
    <text class="title">Hello {{target}}</text>
  </div>
</template>

<style>
  .wrapper {align-items: center; margin-top: 120px;}
  .title {font-size: 48px;}
  .logo {width: 360px; height: 82px;}
</style>

<script>
  module.exports = {
    data: {
      logoUrl: 'https://alibaba.github.io/weex/img/weex_logo_blue@3x.png',
      target: 'World'
    }
  }
</script>
