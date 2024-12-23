<style scoped>
.pickerWrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 750px;
}
.ume-mask {
  position: absolute;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  width: 750px;
  background-color: rgba(0, 0, 0, 0.6);
}
.ume-picker {
  background-color: #ffffff;
  position: absolute;
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
    <div class="ume-mask" @click="cancelFn"></div>
    <div class="ume-picker">
      <div class="ume-picker-ht">
        <text class="ume-picker-cancel" @click="cancelFn">取消</text>
        <text class="ume-picker-confirm" @click="confirmFn">确定</text>
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
import { findIndex } from '../utils/index.js';
import { scroll } from '../utils/scroll.js';
import cron from '../utils/cron.js';

const animation = weex.requireModule('animation');
let touchstart;
let touchmove;
let touchend;
let showStart;
let showEnd;
let result;
const range = 5;
export default {
  name: 'ume-date-picker',
  props: {
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
    inOptions(newVal, oldVal) {
      if (newVal !== oldVal && this.visibility) {
        this.options = newVal;
        this.preHandleData();
        // this.getData() // 更新pickList和curIndex数据
        // let pickerContent = this.$refs.pickerContent
        // let result = scroll(this.defaults, pickerContent, this.curIndex, this.pickList)
        // for (let index = 0; index < this.pickList.length; index++) {
        //   result.initPos(index)
        // }
        this.$nextTick(() => {
          // nextTick dom更新了
          this.initTouch();
        });
      }
    },
    visibility(newVal) {
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
    // this.getData()
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
      const midYear = value[0];
      if (endYear - startYear > range) {
        showEnd = midYear + range > endYear ? endYear : midYear + range;
        showStart = midYear - range < startYear ? startYear : midYear - range;
        this.getData(
          new Date(`${showStart}/01/01`),
          new Date(`${showEnd}/12/31`),
        );
      } else {
        showStart = startYear;
        showEnd = endYear;
        this.getData(start, end);
      }
    },
    getRemainData() {
      const endYear = this.options.end.getFullYear();
      const startYear = this.options.start.getFullYear();
      if (showStart > startYear || showEnd < endYear) {
        const lastStart = showStart;
        const lastEnd = showEnd;
        showEnd = showEnd + range > endYear ? endYear : showEnd + range;
        showStart =
          showStart - range < startYear ? startYear : showStart - range;
        if (showStart < lastStart) {
          this.getData(
            new Date(`${showStart}/01/01`),
            new Date(`${lastStart - 1}/12/31`),
            0,
          );
        }
        if (showEnd > lastEnd) {
          this.getData(
            new Date(`${lastEnd + 1}/01/01`),
            new Date(`${showEnd}/12/31`),
            1,
          );
        }
        result.updateData({
          curIndex: this.curIndex,
          pickList: this.pickList,
        });
        const { pickerContent } = this.$refs;
        const { offset } = result.initPos(0);
        animation.transition(pickerContent[0], {
          styles: {
            transform: `translate(0, ${offset}px)`,
          },
          duration: 0,
        });
        this.$forceUpdate();
      }
    },
    getData(start, end, type = 1) {
      const expr = '* * *';
      let year;
      let month;
      let date;
      const findBy = (array, key, value) => {
        for (let i = 0; i < array.length; i++) {
          const obj = array[i];
          if (obj[key] === value) {
            return obj;
          }
        }
      };
      const schedule = cron.parse(expr, start, end);
      let obj;
      const days = [];
      do {
        obj = schedule.next();
        year = obj.value.getFullYear();
        month = obj.value.getMonth() + 1;
        date = obj.value.getDate();
        let Y = findBy(days, 'value', year);
        if (!Y) {
          Y = {
            label: `${year}年`,
            value: year,
            children: [],
          };
          days.push(Y);
        }
        let M = findBy(Y.children, 'value', month);
        if (!M) {
          M = {
            label: `${month}月`,
            value: month,
            children: [],
          };
          Y.children.push(M);
        }
        M.children.push({
          label: `${date}日`,
          value: date,
        });
      } while (!obj.done);
      this.pickList[0] =
        type === 1
          ? [...this.pickList[0], ...days]
          : [...days, ...this.pickList[0]];
      this.curIndex[0] = findIndex(
        this.pickList[0],
        'value',
        this.options.value[0],
      );
      const months = this.pickList[0][this.curIndex[0]].children;
      this.pickList[1] = months;
      this.curIndex[1] = findIndex(
        this.pickList[1],
        'value',
        this.options.value[1],
      );
      const dates = this.pickList[1][this.curIndex[1]].children;
      this.pickList[2] = dates;
      this.curIndex[2] = findIndex(
        this.pickList[2],
        'value',
        this.options.value[2],
      );
    },
    initTouch() {
      const { pickerContent } = this.$refs;
      result = scroll(
        this.defaults,
        this.$refs.pickerGroup,
        pickerContent,
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
      // let results = []
      // this.pickList.forEach((item, index) => {
      //   let curIndex = this.curIndex[index]
      //   results.push(item[curIndex].value)
      // })
      this.$emit('pickerConfirm', this.options.value, this.curIndex);
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
      touchend(event, index).then(({ offset, curIndex, translate }) => {
        if (index === 1 && curIndex !== this.curIndex[index]) {
          // 如果是月，并且月份有改动默认将日置为第一个
          this.curIndex[2] = 0;
          translate[2] = 200;
          animation.transition(pickerContent[2], {
            styles: {
              transform: 'translate(0, 200px)',
            },
            duration: 300,
          });
        }
        this.curIndex[index] = curIndex;
        const days = this.pickList[0];
        const months = days[this.curIndex[0]].children;
        const dates = months[this.curIndex[1]].children;
        this.pickList[1] = months;
        this.pickList[2] = dates;
        this.$forceUpdate();
        animation.transition(pickerContent[index], {
          styles: {
            transform: `translate(0, ${offset}px)`,
          },
          duration: 300,
        });
        const results = [];
        this.pickList.forEach((item, innerIndex) => {
          const curIndexInner = this.curIndex[innerIndex];
          results.push(item[curIndexInner].value);
        });
        this.options.value = results;
        if (index === 0) {
          this.getRemainData();
        }
      });
    },
  },
};
</script>
