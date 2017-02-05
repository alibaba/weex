<template>
  <text>{{ title }}</text>
</template>

<script>
  module.exports = {
    props: ['title'],
    data: function () {
      return {title: 'x'}
    }
  }
</script>
