<style scoped>
.medium {
  font-weight: bold;
}
.input {
  outline: none;
  background: none;
  border: 0px;
  height: 45px;
}
.geolocation_wrapper {
  position: fixed;
  left: 0;
  width: 750px;
  top: 0;
  bottom: 0;
  background-color: #ffffff;
}
.geolocation_header {
  height: 88px;
  align-items: center;
  justify-content: center;
}
.header_name {
  font-size: 34px;
  color: #333333;
}
.header_right {
  position: absolute;
  right: 10px;
  top: 0;
}
.province_list_wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.province_list {
  padding-left: 32px;
  padding-right: 78px;
}
.province_item_label {
  margin-top: 20px;
  height: 40px;
  justify-content: center;
}
.province_item_label_name {
  font-size: 28px;
  color: #999999;
}
.province_list_item {
  height: 120px;
  justify-content: center;
}
.province_list_item_name {
  font-size: 32px;
  color: #333333;
}
.province_guide {
  position: absolute;
  justify-content: center;
  right: 32px;
  transform: translateY(-50%);
}
.province_guide_item {
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
}
.province_guide_item_name {
  font-size: 22px;
  color: #999999;
}
.province_guide_item_active {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  background-color: #333333;
}
.province_guide_item_name_active {
  font-size: 22px;
  color: #ffffff;
}
</style>

<template>
  <div class="geolocation_wrapper" ref="pageGeolocation">
    <div class="geolocation_header">
      <text class="header_name medium">支持银行列表</text>
      <image
        src="../../images/close.png"
        class="header_right"
        style="width: 88px; height: 88px"
        @click="cancel"
      />
    </div>
    <div style="flex: 1">
      <list class="province_list_wrapper">
        <cell
          class="province_list"
          v-for="(item, index) in showList"
          :key="index"
          :ref="'province_list' + index"
        >
          <div class="province_item_label">
            <text class="province_item_label_name">{{ item.initials }}</text>
          </div>
          <div class="province_label_list">
            <div
              class="province_list_item"
              v-for="(subItem, subIndex) in item.list"
              :key="subIndex"
              @click="confirm(index, subIndex)"
            >
              <text class="province_list_item_name">{{ subItem.name }}</text>
            </div>
          </div>
        </cell>
      </list>
      <list ref="guide" class="province_guide" :style="{ top: top }">
        <cell
          v-for="(item, index) in guideList"
          :class="[
            index == curIndex
              ? 'province_guide_item_active'
              : 'province_guide_item',
          ]"
          :key="index"
          @click="chooseGuide(index)"
        >
          <text
            :class="[
              'medium',
              index == curIndex
                ? 'province_guide_item_name_active'
                : 'province_guide_item_name',
            ]"
            >{{ item }}</text
          >
        </cell>
      </list>
    </div>
  </div>
</template>
<script>
// import { fetchHeader } from '../utils/web';
import { fetchHeader } from '@/utils/jsapi.js';

const dom = weex.requireModule('dom') || {};
const animation = weex.requireModule('animation');
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      guideList: [],
      showList: [],
      curIndex: 0,
      top: 20,
    };
  },
  watch: {
    isShow(newVal) {
      this._animate(newVal);
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    const ref = this.$refs.pageGeolocation;
    if (ref) {
      animation.transition(ref, {
        styles: {
          transform: 'translateX(750px)',
        },
        duration: 0, // ms
        timingFunction: 'ease-out',
        delay: 0, // ms
      });
    }
  },
  methods: {
    getData() {
      const url = 'wallet/querycanbindbank';
      fetchHeader('post', url, {}, {}, this).then((res) => {
        this.showList = res.allIsFastPaymentH5List;
        this.showList.forEach((element) => {
          this.guideList.push(element.initials);
        });
        this.$nextTick(() => {
          const ref = this.$refs.pageGeolocation;
          dom.getComponentRect(ref, (data) => {
            if (data.result) {
              const { height } = data.size;
              this.top = `${(height - 88) / 2}px`;
              // console.log(this.top);
            }
          });
        });
      });
    },
    _animate(status) {
      const ref = this.$refs.pageGeolocation;
      animation.transition(ref, {
        styles: {
          transform: `translateX(${status ? 0 : 750}px)`,
        },
        duration: status ? 250 : 300, // ms
        timingFunction: status ? 'ease-in' : 'ease-out',
        delay: 0, // ms
      });
    },
    chooseGuide(index) {
      this.curIndex = index;
      const ref = this.$refs[`province_list${index}`];
      const el = ref ? ref[0] : null;
      if (el) {
        dom.scrollToElement(el, {
          offset: 0,
        });
      }
    },
    cancel() {
      this.$emit('hide');
    },
    // confirm(index, subIndex) {
    // let subList = this.showList[index].list[subIndex]
    // this.currentPos[this.curGuideIndex] = subList.name
    // this.$emit('confirm', this.currentPos, subList.octId)
    // },
  },
};
</script>
