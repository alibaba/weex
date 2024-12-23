<template>
  <div>
    <embed
      class="embed-element"
      :id="embedId"
      type="native/web"
      ref="embedElement"
    />
  </div>
</template>

<script>
const weexModule = weex.requireModule("weexModule");

export default {
  name: "HlWebTest",
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      embedId: `web_${Math.floor(Math.random() * 100000)}_${Date.now()}`, // 生成embed元素的唯一ID
      isTransferScheduled: false, // 添加一个标志来检查是否已经安排了transferPropsAndListeners的调用
    };
  },
  created() {
    this.transferPropsAndListeners(); // 组件创建时调用
  },
  methods: {
    transferPropsAndListeners() {
      // 构建一个包含所需信息的对象
      const args = {
        componentId: this.embedId,
        src: this.src, // 要播放视频的资源地址
        pagestart: this.handlePagestart,
        pagefinish: this.handlePagefinish,
        error: this.handleError,
        receivedtitle: this.handleReceivedtitle,
        message: this.handleMessage,
      };
      // 调用JSbridge方法，传递属性和监听方法到原生组件
      weexModule.callNative("transferSameLayerArgs", args);
    },
    scheduleTransfer() {
      if (!this.isTransferScheduled) {
        this.isTransferScheduled = true;
        this.$nextTick(() => {
          this.transferPropsAndListeners();
          this.isTransferScheduled = false;
        });
      }
    },
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
        name: this.embedId,
      });
    },
    goForward() {
      weexModule.callNative("webHandle", {
        method: "goForward",
        name: this.embedId,
      });
    },
    reload() {
      weexModule.callNative("webHandle", {
        method: "reload",
        name: this.embedId,
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
  watch: {
    src(newSrc, oldSrc) {
      if (newSrc !== oldSrc) {
        this.scheduleTransfer(); // 当src属性变化时重新调用
      }
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