<template>
  <foo>
    <text>{{x}}</text>
  </foo>
</template>

<script>
  module.exports = {
    data: {
      x: 'xxx'
    },
    components: {
      foo: require('./test2.vue')
    }
  }
</script>
