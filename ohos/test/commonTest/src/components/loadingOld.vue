<style scoped>
.ume-loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 100px;
  bottom: 0;
  /*background-color: rgba(0, 0, 0, 0.4);*/
  z-index: 10;
  align-items: center;
  justify-content: center;
}
.loadEffect {
  width: 266px;
  height: 266px;
}
.loadingItem {
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background-color: #41b24e;
  position: absolute;
  transition-property: opacity;
  transition-duration: 2s;
}
.item1 {
  left: 0;
  top: 133px;
  margin-top: -21px;
}
.item2 {
  left: 37px;
  top: 37px;
}
.item3 {
  left: 133px;
  top: 0;
  margin-left: -21px;
}
.item4 {
  top: 37px;
  right: 37px;
}
.item5 {
  right: 0;
  top: 133px;
  margin-top: -21px;
}
.item6 {
  right: 37px;
  bottom: 37px;
}
.item7 {
  bottom: 0;
  left: 133px;
  margin-left: -21px;
}
.item8 {
  bottom: 37px;
  left: 37px;
}
</style>

<template>
  <div class="ume-loading" v-if="visible">
    <div class="loadEffect">
      <text
        v-for="(item, index) in loadingItem"
        ref="loadingItem"
        :style="{ opacity: opacity[index] }"
        :class="['loadingItem', 'item' + (index + 1)]"
        :key="index"
      ></text>
    </div>
  </div>
</template>
<script>
const animation = weex.requireModule('animation');
let intervalId = [];
export default {
  name: 'ume-loading',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loadingItem: new Array(8),
      opacity: [],
    };
  },
  mounted() {
    if (this.visible) {
      this.init();
    }
  },
  watch: {
    visible(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (!newVal) {
          this.clear();
        } else {
          this.$nextTick(() => {
            this.init();
          });
        }
      }
    },
  },
  methods: {
    init() {
      const { loadingItem } = this.$refs;
      if (loadingItem) {
        loadingItem.forEach((item, index) => {
          this.opacity[index] = 1;
          this.$forceUpdate();
          this.setAnimation(item, index);
        });
        // console.log(
        //   `loading interval产生的intervalId: ${JSON.stringify(intervalId)}`,
        // );
      }
    },
    setAnimation(item, index) {
      // animation.transition(item, {
      //   styles: {
      //     opacity: 0.2
      //   },
      //   duration: 1040,
      //   delay: 130 * (index + 1),
      //   timingFunction: 'linear'
      // }, () => {
      //   animation.transition(item, {
      //     styles: {
      //       opacity: 1
      //     },
      //     duration: 0
      //   }, () => {
      //     this.setAnimation(item, index)
      //   })
      // })
      intervalId[index] = setInterval(() => {
        animation.transition(
          item,
          {
            styles: {
              opacity: 0.2,
            },
            duration: 1040,
            delay: 130 * index,
            timingFunction: 'ease',
          },
          () => {
            animation.transition(item, {
              styles: {
                opacity: 1,
              },
            });
          },
        );
      }, 1040);
    },
    clear() {
      for (let i = 0; i < intervalId.length; i++) {
        if (intervalId[i]) {
          clearInterval(intervalId[i]);
          // console.log(
          //   `loading component的intervalId: ${intervalId[i]} cleared`,
          // );
        }
      }
      intervalId = [];
    },
  },
  beforeDestroy() {
    // console.log('umeloading component beforeDestroy');
    this.clear();
  },
};
</script>
