<style scoped>
.ume-new-loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 0;
  background-color: transparent;
  z-index: 10;
  align-items: center;
  justify-content: center;
}
.new-loading-wrapper {
  width: 160px;
  height: 150px;
  opacity: 0.8;
  background-color: #000000;
  border-radius: 12px;
  align-items: center;
  padding-top: 28px;
}
.loading-text {
  font-size: 28px;
  color: #ffffff;
}
.text {
  color: #ffffff;
  font-size: 30;
}
.btn {
  width: 100px;
  height: 100px;
  background-color: #ff0000;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: 50px;
  left: 350px;
  bottom: 300px;
}
.image {
  width: 60px;
  height: 60px;
}
</style>

<template>
  <div
    class="ume-new-loading"
    v-if="visible"
    :style="loadingStyle"
    @click="stopProp"
  >
    <div class="new-loading-wrapper">
      <image
        v-if="isWeex"
        ref="loading"
        src="../../images/loading.png"
        style="width: 48px; height: 48px"
      />
      <image
        v-else
        src="../../images/loading.gif"
        style="width: 48px; height: 48px"
      />
      <text class="loading-text" style="margin-top: 10px">正在加载</text>
    </div>
  </div>
</template>
<script>
import Binding from 'weex-bindingx';
import { isWeex, isAndroid } from '../utils/index';

const animation = weex.requireModule('animation');
let index = 0;
export default {
  name: 'ume-loading',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    loadingStyle: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isWeex,
      isAndroid,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        // console.log('watch visible true');
        if (isWeex) {
          this.$nextTick(() => {
            this.rotate();
          });
        }
      }
    },
  },
  mounted() {
    // // console.log('new loading的mounted执行了！');
    if (isWeex && this.visible) {
      this.rotate();
    }
  },
  beforeDestroy() {
    // console.log('new loading的beforeDestroy执行了！');
  },
  methods: {
    rotate() {
      // console.log('new loading rotate');
      const ref = this.$refs.loading;
      const duration = 2000;
      if (ref) {
        if (Binding.isSupportBinding) {
          Binding.bind(
            {
              eventType: 'timing',
              exitExpression: {
                origin: `t>${duration}`,
              },
              props: [
                {
                  element: ref.ref,
                  property: 'transform.rotateZ',
                  expression: {
                    origin: `linear(t,0,360,${duration})`,
                  },
                },
              ],
            },
            (e) => {
              if (e.state === 'exit') {
                // 回调里再调用rotate不支持
                this.rotate();
                // console.log(
                //   `binding rotate complete: ${
                //     (new Date().getTime() - now) / 1000
                //   }`,
                // );
              }
            },
          );
        } else {
          animation.transition(
            ref,
            {
              styles: {
                transform: `rotateZ(${360 * index}deg)`,
              },
              duration: duration * 2, // 不知道为啥android的duration会被除以2
              timingFunction: 'linear',
              delay: 0,
            },
            () => {
              index++;
              this.rotate();
              // console.log(
              //   `rotate complete: ${(new Date().getTime() - now) / 1000}`,
              // );
            },
          );
        }
      }
    },
    stopProp() {
      // console.log('stopPropagation');
    },
  },
};
</script>
