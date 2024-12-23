<style scoped>
.ume-message-notice {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* top: 500px; */
  align-items: center;
  justify-content: center;
  opacity: 0;
}
.ume-message-notice-content {
  max-width: 440px;
  padding: 24px 40px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  color: #ffffff;
  font-size: 30px;
  line-height: 46px;
  font-weight: bold;
  text-align: center;
}
</style>

<template>
  <div class="ume-message-notice" ref="notice" :style="toastStyle">
    <text class="ume-message-notice-content">{{ content }}</text>
  </div>
</template>
<script>
import { isWeex } from '../utils/index';
import Binding from 'weex-bindingx';

const animation = weex.requireModule('animation');
export default {
  props: {
    toastStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 2.4,
    },
    content: {
      type: String,
      default: '',
    },
    transitionName: {
      type: String,
      default: 'move-up',
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  mounted() {
    this.clearCloseTimer();
    this.appearPopup();
    if (this.duration !== 0) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.duration * 1000);
    }
  },
  methods: {
    clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    },
    appearPopup() {
      // animation.transition(this.$refs.notice, {
      //   styles: {
      //     transform: 'translate(0, 500px)'
      //   },
      //   duration: 500,
      //   timingFunction: 'ease-in'
      // })
      if (isWeex && Binding.isSupportBinding) {
        const { ref } = this.$refs.notice;
        // let offset = Binding.getComputedStyle(ref).translateY
        // console.log('offset: ' + offset)
        const exit_origin = 't>300';
        // let translate_y_origin = `0+(1-0)*min(t,300)/300`
        const translate_y_origin = 'easeInOutSine(t,0,1,300)';
        Binding.bind(
          {
            eventType: 'timing',
            exitExpression: exit_origin,
            props: [
              {
                element: ref,
                property: 'opacity',
                expression: translate_y_origin,
              },
            ],
          },
          (e) => {
            // console.log(e.state, e.state);
            if (e.state === 'end' || e.state === 'exit') {
              // this.$emit('close')
            }
          },
        );
      } else {
        animation.transition(
          this.$refs.notice,
          {
            styles: {
              opacity: '1',
            },
            duration: 300,
            timingFunction: 'ease-out',
          },
          () => {
            // this.$emit('close')
          },
        );
      }
    },
    disappearPopup() {
      // animation.transition(this.$refs.notice, {
      //   styles: {
      //     transform: 'translate(0, 0)'
      //   },
      //   duration: 500,
      //   timingFunction: 'ease-out'
      // }, () => {
      //   this.$emit('close')
      // })
      if (Binding.isSupportBinding) {
        const { ref } = this.$refs.notice;
        const exit_origin = 't>300';
        const translate_y_origin = 'easeInOutSine(t,1,-1,300)';
        Binding.bind(
          {
            eventType: 'timing',
            exitExpression: exit_origin,
            props: [
              {
                element: ref,
                property: 'opacity',
                expression: translate_y_origin,
              },
            ],
          },
          (e) => {
            if (e.state === 'end' || e.state === 'exit') {
              this.timer = null;
              this.$emit('close');
            }
          },
        );
      } else {
        animation.transition(
          this.$refs.notice,
          {
            styles: {
              opacity: '0',
            },
            duration: 300,
            timingFunction: 'ease-out',
          },
          () => {
            this.timer = null;
            this.$emit('close');
          },
        );
      }
    },
    close() {
      this.disappearPopup();
    },
    beforeDestroy() {
      this.clearCloseTimer();
    },
  },
};
</script>
