<template>
  <scroller>
    <style-box></style-box>
    <style-flex></style-flex>
    <panel title="opacity" type="primary">
      <div style="flex-direction:row;">
        <style-item style="opacity:1" value="1"></style-item>
        <style-item style="opacity:0.9" value="0.9"></style-item>
        <style-item style="opacity:0.5" value="0.5"></style-item>
        <style-item style="opacity:0.2" value="0.2"></style-item>
      </div>
    </panel>
    <panel title="background-color" type="primary">
      <div>
        <style-item class="bg-item" style="background-color: #333;" value="#333"></style-item>
        <style-item class="bg-item" style="background-color: #333333;" value="#333333"></style-item>
        <style-item class="bg-item" style="background-color: rgb(238, 162, 54);" value="rgb()"></style-item>
        <style-item class="bg-item" style="background-color: rgba(238, 162, 54, 0.5);" value="rgba()"></style-item>
        <style-item class="bg-item" style="background-color: red;" value="red"></style-item>
      </div>
    </panel>
  </scroller>
</template>

<style>
  .bg-item {
    width: 690px;
    margin-bottom: 10px;
  }
</style>

<script>
  module.exports = {
    components: {
      panel: require('../include/panel.vue'),
      styleBox: require('./style-box.vue'),
      styleFlex: require('./style-flex.vue'),
      styleItem: require('./style-item.vue')
    }
  }
</script>
