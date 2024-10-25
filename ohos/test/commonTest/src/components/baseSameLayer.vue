<template>
  <div>
    <embed 
      class="embed-element" 
      :id="embedId" 
      :type="`native/${embedType}`" />
  </div>
</template>

<script>
const weexModule = weex.requireModule("weexModule");

export default {
  name: "BaseSameLayer",
  props: {
    hosSameLayerArgs: {
      type: Object,
      required: true,
    },
    embedType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      embedId: `${this.embedType}_${Math.floor(Math.random() * 100000)}_${Date.now()}`, // 生成embed元素的唯一ID
    };
  },
  created() {
    console.log("[sameLayerRendering] web component created.");
    weexModule.callNative("transferSameLayerArgs", {
      componentId: this.embedId,
      ...this.hosSameLayerArgs,
    });
  },
  watch: {
    hosSameLayerArgs: {
      deep: true,
      handler: function (newVal, oldVal) {
        console.log("[sameLayerRendering] web component update.");
        weexModule.callNative("transferSameLayerArgs", {
          componentId: this.embedId,
          ...newVal,
        });
      },
    },
  },
};
</script>

<style scoped>
.embed-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
