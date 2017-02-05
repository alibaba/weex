<!--
  * `<slot>` will let the sub component contains the parent's children
  * see `./include/btn.vue` source code for more details
-->

<template>
  <div>
    <btn>
      <text>Click!</text>
    </btn>
  </div>
</template>

<script>
  module.exports = {
    components: {
      btn: require('./include/btn.vue')
    }
  }
</script>
