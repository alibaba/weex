<style scoped>
.pickerWrapper {
  transform: translate(0, 0);
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
  width: 750px;
  background-color: rgba(0, 0, 0, 0.6);
}
.ume-picker {
  background-color: #ffffff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 750px;
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
  font-size: 32px;
}
.ume-picker-cancel {
  color: #666666;
}
.ume-picker-confirm {
  color: #41b24e;
}
.ume-picker-btnNew {
  width: 100px;
  height: 60px;
  font-size: 40px;
  line-height: 60px;
  text-align: center;
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
        <text class="ume-picker-cancel ume-picker-btnNew" @click="cancelFn">取消</text>
        <text class="ume-picker-confirm ume-picker-btnNew" @click="confirmFn">确定</text>
      </div>
      <div class="ume-picker-bd" style="height: 500px">
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
import { findIndex, getDays } from '../utils/index.js';
import { scroll } from '../utils/scroll.js';

const animation = weex.requireModule('animation');
let touchstart;
let touchmove;
let touchend;
let result;
export default {
  name: 'ume-date-picker',
  props: {
    pickerStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    inOptions: {
      type: Object,
      default() {
        return {};
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
      curIndex: [], // 存取每一列当前选中元素对应的下标
      pickList: [], // 二维数组，分别是年、月、日
      options: {
        value: [], // 当前时间如[2019, 9, 1]
        start: '', // 日历选择器开始时间，可以传数字如2010，也可以传字符串如2010-6-1或者2010/6/1
        end: '', // 日历选择器结束时间，如上
      },
      startTime: '',
      endTime: '',
      defaults: {
        offset: 2, // 默认偏移两个，正中是绿色选中部分
        rowHeight: 100, // 单位是px
        bodyHeight: 500, // 一列中总共显示5项
      },
    };
  },
  watch: {
    inOptions: {
      handler(newVal) {
        if (this.visibility) {
          this.options = newVal;
          this.preHandleData();
          this.$nextTick(() => {
            // nextTick dom更新了
            this.initTouch();
          });
        }
      },
      deep: true,
    },
    visibility(newVal) {
      // 必须要visibility为true之后才有dom
      if (newVal) {
        this.$nextTick(() => {
          // nextTick dom更新了
          this.initTouch();
        });
      }
    },
  },
  created() {
    this.options = this.inOptions;
    this.preHandleData();
  },
  mounted() {},
  methods: {
    preHandleData() {
      this.pickList = [[], [], []];
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const date = now.getDate();
      let start;
      let end;
      start = this.options.start ? this.options.start : year - 10;
      end = this.options.end ? this.options.end : year + 10;
      const value =
        this.options.value && this.options.value.length > 0
          ? this.options.value
          : [year, month, date];
      if (typeof start === 'number') {
        start = new Date(`${start}/01/01`);
      } else if (typeof start === 'string') {
        start = new Date(start.replace(/-/g, '/'));
      }
      if (typeof end === 'number') {
        end = new Date(`${end}/12/31`); // 注意兼容safari,safari支持yyyy/MM/dd HH:mm:ss
      } else if (typeof end === 'string') {
        end = new Date(end.replace(/-/g, '/'));
      }
      this.options = {
        start,
        end,
        value,
      };
      const endYear = end.getFullYear();
      const startYear = start.getFullYear();
      this.getData(startYear, endYear);
    },
    getData(start, end) {
      this.pickList = [[], [], []];
      for (let i = start; i <= end; i++) {
        this.pickList[0].push({
          label: `${i}年`,
          value: i,
        });
      }
      for (let i = 1; i <= 12; i++) {
        this.pickList[1].push({
          label: `${i}月`,
          value: i,
        });
      }
      const days = getDays(this.options.value);
      for (let i = 1; i <= days; i++) {
        this.pickList[2].push({
          label: `${i}日`,
          value: i,
        });
      }
      this.curIndex[0] = findIndex(
        this.pickList[0],
        'value',
        this.options.value[0],
      );
      this.curIndex[1] = findIndex(
        this.pickList[1],
        'value',
        this.options.value[1],
      );
      this.curIndex[2] = findIndex(
        this.pickList[2],
        'value',
        this.options.value[2],
      );
    },
    initTouch() {
      const { pickerContent } = this.$refs;
      if (pickerContent) {
        result = scroll(
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
      }
    },
    cancelFn() {
      this.$emit('pickerCancel');
    },
    confirmFn() {
      this.$emit('pickerConfirm', [...this.options.value], this.curIndex);
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
        const item = this.pickList[index];
        this.options.value[index] = item[curIndex].value;
        if (index === 0 || index === 1) {
          // 选中年或者月之后更新天
          const days = getDays(this.options.value);
          this.pickList[2] = [];
          for (let i = 1; i <= days; i++) {
            this.pickList[2].push({
              label: `${i}日`,
              value: i,
            });
          }
        }
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
