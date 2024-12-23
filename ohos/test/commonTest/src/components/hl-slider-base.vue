<template>
  <BaseSameLayer
      :hosSameLayerArgs="hosSameLayerArgs"
      embedType="slider"
  ></BaseSameLayer>
</template>


<script>
import BaseSameLayer from "./baseSameLayer.vue";

export default {
  name: "HlSlider",
  components: {
    BaseSameLayer,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      require: true,
    },
    max:{
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
  },
  computed: {
    hosSameLayerArgs() {
      return {
        value: this.value,
        min: this.min,
        max: this.max,
        step: this.step,
        handleOnChange: this.handleOnChange,
      }
    }
  },
  created() {
    console.log("[web] hl-slider created!");
  },
  methods: {
    // 自定义拓展其它逻辑
    handleOnChange(res) {
      console.log("[web] handleOnChange ", res);
      this.$emit("onChange", res);
    },
  },
};
</script>

<style scoped>
</style>