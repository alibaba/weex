<template>
  <BaseSameLayer
    ref="base"
    :hosSameLayerArgs="hosSameLayerArgs"
    embedType="lottie"
  ></BaseSameLayer>
</template>

<script>
import BaseSameLayer from "./baseSameLayer.vue";
const weexModule = weex.requireModule("weexModule");

export default {
  name: "HlLottie",
  components: {
    BaseSameLayer,
  },
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

  computed: {
    hosSameLayerArgs() {
      return {
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
    },
  },

  methods: {
    play(callback) {
      weexModule.callNative('lottieHandle', {
        method: 'play',
        name: this.$refs.base.embedId,
      }, callback)
    },

    pause() {
      weexModule.callNative('lottieHandle', {
        method: 'pause',
        name: this.$refs.base.embedId,
      })
    },

    stop() {
      weexModule.callNative('lottieHandle', {
        method: 'stop',
        name: this.$refs.base.embedId,
      })
    },

    togglePause() {
      weexModule.callNative('lottieHandle', {
        method: 'togglePause',
        name: this.$refs.base.embedId,
      })
    },

    setSpeed(speed) {
      weexModule.callNative('lottieHandle', {
        method: 'setSpeed',
        name: this.$refs.base.embedId,
        speed,
      })
    },

    setDirection(dir) {
      weexModule.callNative('lottieHandle', {
        method: 'setDirection',
        name: this.$refs.base.embedId,
        dir,
      })
    },

    playFromProgress(from, to, callback) {
      weexModule.callNative('lottieHandle', {
        method: 'playFromProgress',
        name: this.$refs.base.embedId,
        from, to,
      }, callback)
    },

    isAnimationPlaying(callback) {
      weexModule.callNative('lottieHandle', {
        method: 'isAnimationPlaying',
        name: this.$refs.base.embedId,
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
  },
  watch: {
    speed(newSpeed, oldSpeed) {
      if (newSpeed !== oldSpeed) {
        this.setSpeed(newSpeed);
      }
    },
  },
};
</script>

<style scoped>
</style>