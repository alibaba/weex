<template>
  <div>
    <embed
      class="embed-element"
      :id="embedId"
      type="native/lottie"
    />
  </div>
</template>

<script>
const weexModule = weex.requireModule('weexModule');

export default {
  name: "HlLottieTest",
  props: {
    sourceJson: {
      type: String,
      required: false,
    },
    sourceUrl: {
      type: String,
      required: false,
    },
    loop: {
      type: [Boolean, Number],
       required: false,
    },
    speed: {
      type: Number,
      required: false,
    },
    autoplay: {
      type: Boolean,
       required: false,
    },
  },

  data() {
    return {
      embedId: `lottie_${Math.floor(Math.random() * 100000)}_${Date.now()}`, // 生成embed元素的唯一ID
      isTransferScheduled: false,
    };
  },
  created() {
    this.transferPropsAndListeners(); 
  },
  methods: {
    play(callback) {
      weexModule.callNative('lottieHandle', {
        method: 'play',
        name: this.embedId,
      }, callback)
    },

    pause() {
      weexModule.callNative('lottieHandle', {
        method: 'pause',
        name: this.embedId,
      })
    },

    stop() {
      weexModule.callNative('lottieHandle', {
        method: 'stop',
        name: this.embedId,
      })
    },

    togglePause() {
      weexModule.callNative('lottieHandle', {
        method: 'togglePause',
        name: this.embedId,
      })
    },

    setSpeed(speed) {
      weexModule.callNative('lottieHandle', {
        method: 'setSpeed',
        name: this.embedId,
        speed,
      })
    },

    setDirection(dir) {
      weexModule.callNative('lottieHandle', {
        method: 'setDirection',
        name: this.embedId,
        dir,
      })
    },

    playFromProgress(from, to, callback) {
      weexModule.callNative('lottieHandle', {
        method: 'playFromProgress',
        name: this.embedId,
        from, to,
      }, callback)
    },

    isAnimationPlaying(callback) {
      weexModule.callNative('lottieHandle', {
        method: 'isAnimationPlaying',
        name: this.embedId,
      }, callback)
    },
  
    handleCreateFinish() {
      this.$emit("createFinish");
    },

    handleEnterFrame() {
      this.$emit("onEnterFrame");
    },

    handleLoopComplete() {
      this.$emit("onLoopComplete");
    },

    handleComplete() {
      this.$emit("onComplete");
    },

    transferPropsAndListeners() {
      // 构建一个包含所需信息的对象
      const args = {
        componentId: this.embedId,
        sourceJson: this.sourceJson,
        sourceUrl: this.sourceUrl,
        loop: this.loop,
        speed: this.speed,
        autoplay: this.autoplay,
        onEnterFrame: this.handleEnterFrame,
        onCreateFinish: this.handleCreateFinish,
        onLoopComplete: this.handleLoopComplete,
        onComplete: this.handleComplete,
      };
      // 调用JSbridge方法，传递属性和监听方法到原生组件
      weexModule.callNative('transferSameLayerArgs', args)
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
  },
  watch: {
    speed(newSpeed, oldSpeed) {
      if (newSpeed !== oldSpeed) {
        this.scheduleTransfer();
        this.setSpeed(newSpeed)
      }
    },
    loop(newLoop, oldLoop) {
      if (newLoop !== oldLoop) {
        this.scheduleTransfer();
      }
    },
    autoplay(newAutoplay, oldAutoplay) {
      if (newAutoplay !== oldAutoplay) {
        this.scheduleTransfer();
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