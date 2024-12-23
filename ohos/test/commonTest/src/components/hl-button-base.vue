<template>
    <BaseSameLayer
        :hosSameLayerArgs="hosSameLayerArgs"
        embedType="button"
    ></BaseSameLayer>
</template>

<script>
import BaseSameLayer from "./baseSameLayer.vue";

export default {
  name: "HlButton",
  components: {
    BaseSameLayer,
  },
  props: {
    text: {
      type: String,
      required: false,
    },
    loading: {
      type: Boolean,
      required: true
    },
    stateEffect: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    hosSameLayerArgs() {
      return {
        text: this.text,
        loading: this.loading,
        stateEffect: this.stateEffect,
        handleOnTap: this.handleOnTap,
      }
    }
  },
  methods: {
    // 自定义拓展其它逻辑
    handleOnTap(res) {
      console.log("[web] handleOnTap ", res);
      this.$emit("onTap", res);
    },
  },
};
</script>

<style scoped>
</style>