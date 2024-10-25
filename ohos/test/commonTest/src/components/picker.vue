<style scoped>
.pickerWrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 750px;
}
.ume-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.ume-picker {
  background-color: #ffffff;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 101;
  transition: all 0.3s ease;
}
.ume-picker-ht {
  display: flex;
  padding: 0 32px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 120px;
}
.ume-picker-cancel {
  font-size: 32px;
  color: #666666;
}
.ume-picker-confirm {
  font-size: 32px;
  color: #41b24e;
}
.ume-picker-bd {
  flex-direction: row;
  height: 500px;
}
.ume-picker-group {
  position: relative;
  flex: 1;
  overflow: hidden;
}
.ume-picker-indicator {
  position: absolute;
  left: 0;
  right: 0;
  top: 200px;
  height: 100px;
  z-index: 2;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #eeeeee;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #eeeeee;
}
.ume-picker-content {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
}
.ume-picker-item {
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #666666;
  font-size: 36px;
}
.active {
  color: #41b24e;
}
.ume-picker-mask {
  position: absolute;
  left: 0;
  right: 0;
  height: 200px;
  z-index: 2;
}
.top {
  top: 0;
  background-image: linear-gradient(
    to bottom,
    #ffffff,
    rgba(255, 255, 255, 0.6)
  );
}
.bottom {
  bottom: 0;
  background-image: linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0.6));
}
</style>

<template>
  <div v-if="visibility" class="pickerWrapper">
    <div class="ume-mask" @click="cancelFn" :style="pickerStyle"></div>
    <div class="ume-picker" :style="pickerStyle">
      <div class="ume-picker-ht">
        <text class="ume-picker-cancel" @click="cancelFn">取消</text>
        <text class="ume-picker-confirm" @click="confirmFn">确定</text>
      </div>
      <div class="ume-picker-bd" style="height: 500px" ref="pickerBody">
        <div
          v-for="(group, groupIndex) in pickList"
          :key="groupIndex"
          ref="pickerGroup"
          @touchstart="ontouchstart($event, groupIndex)"
          @touchmove="ontouchmove($event, groupIndex)"
          @touchend="ontouchend($event, groupIndex)"
          class="ume-picker-group"
        >
          <div class="ume-picker-indicator"></div>
          <div ref="pickerContent" class="ume-picker-content">
            <text
              v-for="(item, index) in group"
              :key="index"
              :class="[
                'ume-picker-item',
                index == curIndex[groupIndex] ? 'active' : '',
              ]"
              >{{ item.label }}</text
            >
          </div>
          <div class="ume-picker-mask top"></div>
          <div class="ume-picker-mask bottom"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * @param {array} [pickList=[]] - 二维数组，pickList[i]表示第i列的数据
 * @param {array} [curValue=[]] - 一维数组，curValue[i]表示第i列被选中的值
 * @param {boolean} [visibility=false] - 是否显示
 */
import { findIndex } from '../utils/index.js';
import { scroll } from '../utils/scroll.js';
// import { xlog } from '@/utils/jsapi';
import { xlog } from '@/utils/jsapi.js';

const animation = weex.requireModule('animation');
let touchstart;
let touchmove;
let touchend;
export default {
  name: 'ume-picker',
  props: {
    pickerStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    pickList: {
      type: Array,
      default() {
        return []; // 二维数组
      },
    },
    curValue: {
      type: Array,
      default() {
        return [];
      },
    },
    visibility: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      curIndex: [],
      defaults: {
        offset: 2,
        rowHeight: 100, // 设计稿中的高度，单位是px
        bodyHeight: 500, // 设计稿中的高度，单位是px
      },
      offset: '',
    };
  },
  watch: {
    visibility(newVal) {
      if (newVal) {
        this.getData();
        this.$nextTick(() => {
          // nextTick dom更新了
          this.initTouch();
        });
      }
    },
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      this.pickList.forEach((item, index) => {
        let curIndex = findIndex(item, 'value', this.curValue[index]);
        if (curIndex === -1) {
          curIndex = this.defaults.offset;
        }
        this.curIndex[index] = curIndex;
      });
    },
    initTouch() {
      const { pickerContent } = this.$refs;
      const result = scroll(
        this.defaults,
        this.$refs.pickerGroup,
        // pickerContent,
        this.curIndex,
        this.pickList,
      );
      for (let index = 0; index < this.pickList.length; index++) {
        const { offset } = result.initPos(index);
        animation.transition(pickerContent[index], {
          styles: {
            transform: `translate(0, ${offset}px)`,
          },
          duration: 300,
        });
        touchstart = result.touchstart;
        touchmove = result.touchmove;
        touchend = result.touchend;
      }
    },
    cancelFn() {
      this.$emit('pickerCancel');
    },
    confirmFn() {
      xlog.log('11');
      const results = [];
      this.pickList.forEach((item, index) => {
        const curIndex = this.curIndex[index];
        results.push(item[curIndex].value);
      });
      this.$emit('pickerConfirm', results, this.curIndex);
    },
    ontouchstart(event) {
      touchstart(event);
    },
    ontouchmove(event, index) {
      const { pickerContent } = this.$refs;
      const { offset } = touchmove(event, index);
      animation.transition(pickerContent[index], {
        styles: {
          transform: `translate(0, ${offset}px)`,
        },
        duration: 0,
      });
    },
    ontouchend(event, index) {
      const { pickerContent } = this.$refs;
      touchend(event, index).then(({ offset, curIndex }) => {
        this.curIndex[index] = curIndex;
        this.$forceUpdate();
        animation.transition(pickerContent[index], {
          styles: {
            transform: `translate(0, ${offset}px)`,
          },
          duration: 300,
        });
      });
    },
  },
};
</script>
