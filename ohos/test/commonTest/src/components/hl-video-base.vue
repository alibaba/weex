<template>
  <BaseSameLayer
    :hosSameLayerArgs="hosSameLayerArgs"
    embedType="video"
  ></BaseSameLayer>
</template>

<script>
import BaseSameLayer from "./baseSameLayer.vue";

export default {
  name: "HlVideo",
  components: {
    BaseSameLayer,
  },
  props: {
    hosUniqueProps: {
      type: Object,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    controls: {
      type: Boolean,
      required: false,
    },
    autoPlay: {
      type: Boolean,
      required: false,
    },
    muted: {
      type: Boolean,
      required: false,
    },
    loop: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    hosSameLayerArgs() {
      // 对象中的键值和原生自定义组件支持的属性和方法保持一致
      return {
        ...this.hosUniqueProps, // 鸿蒙原生组件独有属性和方法示例
        src: this.src, // 多端支持公共属性示例
        controls: this.controls,
        autoPlay: this.autoPlay,
        muted: this.muted,
        loop: this.loop,
        onPlay: this.handleOnPlay, // 多端支持公共监听方法示例
      };
    },
  },
  methods: {
    handleOnPlay(res) {
      this.$emit("onPlay", res);
    },
    // 自定义拓展其它逻辑
  },
};
</script>
