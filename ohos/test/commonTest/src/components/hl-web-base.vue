<template>
  <BaseSameLayer
    ref="webElement"
    :hosSameLayerArgs="hosSameLayerArgs"
    embedType="web"
  ></BaseSameLayer>
</template>

<script>
import BaseSameLayer from "./baseSameLayer.vue";
const weexModule = weex.requireModule("weexModule");

export default {
  name: "HlWeb",
  components: {
    BaseSameLayer,
  },
  props: {
    src: {
      type: String,
      required: true,
    },
  },

  computed: {
    hosSameLayerArgs() {
      return {
        src: this.src,
        pagestart: this.handlePagestart,
        pagefinish: this.handlePagefinish,
        error: this.handleError,
        receivedtitle: this.handleReceivedtitle,
        message: this.handleMessage,
      };
    },
  },
  methods: {
    handlePagestart(res) {
      const callBackObj = {
        ...res,
        target: this.$refs.embedElement,
        type: "pagestart",
      };
      this.$emit("pagestart", callBackObj);
    },
    handlePagefinish(res) {
      const callBackObj = {
        ...res,
        target: this.$refs.embedElement,
        type: "pagefinish",
      };
      this.$emit("pagefinish", callBackObj);
    },
    handleError(res) {
      this.$emit("error", res);
    },
    handleReceivedtitle() {
      this.$emit("receivedtitle");
    },
    handleMessage(res) {
      this.$emit("message", res);
    },
    goBack() {
      weexModule.callNative("webHandle", {
        method: "goBack",
        name: this.$refs.$el.webElement.children[0].embedId,
      });
    },
    goForward() {
      weexModule.callNative("webHandle", {
        method: "goForward",
        name: this.$refs.$el.webElement.children[0].embedId,
      });
    },
    reload() {
      weexModule.callNative("webHandle", {
        method: "reload",
        name: this.$refs.$el.webElement.children[0].embedId,
      });
    },
    postMessage(message) {
      weexModule.callNative("webHandle", {
        method: "postMessage",
        name: this.embedId,
        message,
      });
    },
  },
};
</script>

<style scoped>
</style>