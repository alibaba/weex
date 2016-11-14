<template>
  <div>
    <panel title="Box Model" padding-body="0" type="primary">
      <text class="box">Box</text>
    </panel>

    <panel title="border" type="primary">
      <panel title="border-width" type="">
        <div style="flex-direction: row;">
          <style-item style="border-style: solid;border-width: 2px;border-color: #333;" value=""></style-item>
          <style-item style="border-style: solid;border-width: 10px;border-color: #333;" value=""></style-item>
          <style-item style="border-style: solid;border-left-width: 4px;border-color: #333;" value=""></style-item>
          <style-item style="border-style: solid;border-bottom-width: 4px;border-color: #333;" value=""></style-item>
        </div>
      </panel>
      <panel title="border-color" type="">
        <div style="flex-direction: row;">
          <style-item style="border-style: solid;border-width: 4px;border-color: #333;" value=""></style-item>
          <style-item style="border-style: solid;border-width: 4px;border-color: #ddd;" value=""></style-item>
          <style-item style="border-style: solid;border-width: 4px;border-color: red;" value=""></style-item>
        </div>
      </panel>
      <panel title="border-style" type="">
        <tip type="warning" value="just support four edges" style="margin-bottom: 10px;"></tip>
        <div style="flex-direction: row;">
          <style-item style="border-style: solid;border-width: 4px;border-color: #333;" value=""></style-item>
          <style-item style="border-style: dashed;border-width: 4px;border-color: #333;" value="" type=""></style-item>
          <style-item style="border-style: dotted;border-width: 4px;border-color: #333;" value=""></style-item>
        </div>
      </panel>
      <panel title="border-radius" type="">
        <div style="flex-direction: row;">
          <style-item style="width: 75px;border-radius:38px" value=""></style-item>
          <style-item style="border-radius:20px" value=""></style-item>
          <style-item style="border-top-left-radius:20px;border-top-right-radius:20px" value=""></style-item>
          <style-item style="border-bottom-left-radius:20px;border-bottom-right-radius:20px" value=""></style-item>
        </div>
      </panel>
    </panel>
  </div>
</template>

<style>
  .box {
    background-color: #f5f5f5;
    width: 260px;
    height: 260px;
    padding-left: 40px;
    padding-top: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
    margin-left: 40px;
    margin-top: 40px;
    margin-right: 40px;
    margin-bottom: 40px;
    border-width: 40px;
    border-color: #333;
    border-style: solid;
  }
</style>

<script>
  module.exports = {
    components: {
      panel: require('weex-vue-components/panel.vue'),
      tip: require('weex-vue-components/tip.vue'),
      styleItem: require('./style-item.vue')
    }
  }
</script>
