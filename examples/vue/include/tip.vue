<!-- Inspired by bootstrap http://getbootstrap.com/ -->
<template>
  <div :class="['tip', 'tip-' + type]">
    <text :class="['tip-txt', 'tip-txt-' + type]">{{value}}</text>
  </div>
</template>

<script>
  module.exports = {
    props: {
      type: { default: 'success' },
      value: { default: '' }
    }
  }
</script>

<style>
  .tip {
    padding-left: 36px;
    padding-right: 36px;
    padding-top: 36px;
    padding-bottom: 36px;
    border-radius: 10px;
  }
  
  .tip-txt{
    font-size: 28px;
  }

  .tip-success {
    background-color: #dff0d8;
    border-color: #d6e9c6;
  }

  .tip-txt-success {
    color: #3c763d;
  }

  .tip-info {
    background-color: #d9edf7;
    border-color: #bce8f1;
  }

  .tip-txt-info {
    color: #31708f;
  }

  .tip-warning {
    background-color: #fcf8e3;
    border-color: #faebcc;
  }

  .tip-txt-warning {
    color: #8a6d3b;
  }

  .tip-danger {
    background-color: #f2dede;
    border-color: #ebccd1;
  }

  .tip-txt-danger {
    color: #a94442;
  }
</style>
