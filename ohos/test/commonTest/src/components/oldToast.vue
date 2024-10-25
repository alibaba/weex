<style scoped>
.ume-message-notice {
  position: fixed;
  left: 0;
  right: 0;
  top: 500px;
  align-items: center;
}
.ume-message-notice-content {
  padding: 18px 40px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 40px;
  color: #ffffff;
  font-size: 32px;
  text-align: center;
  font-weight: 700;
}
</style>

<template>
  <div class="ume-message-notice" ref="notice">
    <text class="ume-message-notice-content">{{ content }}</text>
  </div>
</template>
<script>
import Binding from 'weex-bindingx';

const animation = weex.requireModule('animation');
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 1,
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
  mounted() {
    this.clearCloseTimer();
    // this.appearPopup()
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
      animation.transition(this.$refs.notice, {
        styles: {
          transform: 'translate(0, 500px)',
        },
        duration: 500,
        timingFunction: 'ease-in',
      });
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
        const offset = Binding.getComputedStyle(ref).translateY;
        // console.log(`offset: ${ offset}`);
        const exit_origin = 't>500';
        const translate_y_origin = `linear(t,${offset},-500,500)`;
        Binding.bind(
          {
            eventType: 'timing',
            exitExpression: exit_origin,
            props: [
              {
                element: ref,
                property: 'transform.translateY',
                expression: translate_y_origin,
              },
            ],
          },
          (e) => {
            if (e.state === 'end' || e.state === 'exit') {
              this.$emit('close');
            }
          },
        );
      } else {
        animation.transition(
          this.$refs.notice,
          {
            styles: {
              transform: 'translate(0, 0)',
            },
            duration: 500,
            timingFunction: 'ease-out',
          },
          () => {
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
