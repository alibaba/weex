<template>
  <div>
    <embed
      class="embed-element"
      :id="embedId"
      type="native/video"
    />
  </div>
</template>

<script>
const weexModule = weex.requireModule("weexModule");

export default {
  name: "HlVideoTest",
  props: {
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
  data() {
    return {
      embedId: `video_${Math.floor(Math.random() * 100000)}_${Date.now()}`, // 生成embed元素的唯一ID
      isTransferScheduled: false, // 添加一个标志来检查是否已经安排了transferPropsAndListeners的调用
    };
  },
  created() {
    console.log("[weex] hl-video created!");
    this.transferPropsAndListeners(); // 组件创建时调用
  },
  methods: {
    transferPropsAndListeners() {
      // 构建一个包含所需信息的对象
      const args = {
        componentId: this.embedId,
        src: this.src, // 要播放视频的资源地址
        controls: this.controls, // 是否显示播放控件
        muted: this.muted, // 是否静音
        loop: this.loop,
        autoPlay: this.autoPlay,
        onPlay: this.handleOnPlay,
        onPause: this.handleOnPause,
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
    handleOnPlay(res) {
      this.$emit("onPlay", res);
    },
    handleOnPause(res) {
      this.$emit("onPause", res);
    },
  },
  watch: {
    src(newSrc, oldSrc) {
      if (newSrc !== oldSrc) {
        this.scheduleTransfer(); // 当src属性变化时重新调用
      }
    },
    muted(newMuted, oldMuted) {
      if (newMuted !== oldMuted) {
        this.scheduleTransfer(); // 当muted属性变化时重新调用
      }
    },
    controls(newControls, oldControls) {
      if (newControls !== oldControls) {
        this.scheduleTransfer(); // 当controls属性变化时重新调用
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