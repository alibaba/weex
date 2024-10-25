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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
}
.header_left {
  height: 88px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-right: 32px;
  padding-left: 26px;
  border-radius: 6px;
  border-width: 2px;
  border-style: solid;
  border-color: #eeeeee;
}
.search_input {
  flex: 1;
  margin-left: 8px;
}
.header_right {
  font-size: 34px;
  color: #333333;
}
.getCurrentPos {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  margin-top: 20px;
  height: 100px;
}
.getCurrentPos_name {
  font-size: 36px;
  color: #333333;
}
.getCurrentPos_repos {
  font-size: 32px;
  color: #41b24e;
}
.currentPos {
  flex-direction: row;
  background-color: rgba(245, 246, 247, 0.6);
  padding: 40px 32px;
}
.currentPos_name {
  font-size: 32px;
  color: #999999;
}
.currentPos_label {
  font-size: 32px;
  color: #41b24e;
}
.select_province {
  height: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
}
.select_province_name {
  font-size: 36px;
  color: #333333;
}
.select_province_no {
  font-size: 32px;
  color: #41b24e;
  margin-right: 12px;
}
.select_circle {
  width: 34px;
  height: 34px;
  border-radius: 17px;
  border-width: 1px;
  border-style: solid;
  border-color: #cccccc;
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
  top: 20px;
  right: 32px;
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
  <div
    class="geolocation_wrapper"
    ref="pageGeolocation"
    @stopPropagation="stopPropagation"
    shouldStopPropagationInterval="1000000"
    shouldStopPropagationInitResult="false"
  >
    <div class="geolocation_header">
      <div class="header_left">
        <image
          src="../../images/search.png"
          style="width: 30px; height: 30px"
        />
        <input
          class="search_input input"
          v-model="province"
          placeholder="请输入省份名称"
          return-key-type="search"
          @return="search"
        />
      </div>
      <text class="header_right medium" @click="cancel">取消</text>
    </div>
    <div class="getCurrentPos">
      <text class="getCurrentPos_name">当前位置</text>
      <text class="getCurrentPos_repos" @click="getLocation">重新定位</text>
    </div>
    <div class="currentPos">
      <!--  using &lt replace <, and &gt replace >: -->
      <text
        class="currentPos_name"
        v-for="(item, index) in currentPos"
        :key="index"
        @click="reSelect(index)"
        >{{ index &lt; 2 ? item + '-' : item }}</text
      >
      <text class="currentPos_name" v-if="currentPos.length == 0"
        >无法定位到当前城市</text
      >
      <text class="currentPos_label" v-if="!completed">{{ currentGuide }}</text>
    </div>
    <div class="select_province">
      <text class="select_province_name medium">{{ currentLabel }}</text>
      <!--<div v-if="curChooseIndex == 3 && showList && showList.length > 0"
        style="flex-direction: row; align-items: center;" @click="selectNo">
        <text class="select_province_no">暂不选择</text>
        <div>
          <text v-if="chooseStreet" class="select_circle"></text>
          <image v-else src="../../images/agree_icon_active.png"
          style="width: 34px; height:34px;" />
        </div>
      </div>-->
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
      <list class="province_guide">
        <cell
          v-for="(item, index) in guideList"
          :class="[
            index == curGuideIndex
              ? 'province_guide_item_active'
              : 'province_guide_item',
          ]"
          :key="index"
          @click="chooseGuide(index)"
        >
          <text
            :class="[
              'medium',
              index == curGuideIndex
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
const pleaseList = ['', '请选择城市', '请选择县'];
const labelList = ['选择省份/地区', '选择城市', '选择区/县'];
let code;
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    address: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      curChooseIndex: 0,
      province: '',
      currentPos: [],
      provinceList: [],
      showList: [],
      showIndex: [],
      curGuideIndex: 0,
      completed: false,
      chooseStreet: true,
    };
  },
  computed: {
    guideList() {
      const list = [];
      if (this.showList && this.showList.length > 0) {
        this.showList.forEach((element) => {
          list.push(element.initials);
        });
      }
      return list;
    },
    currentGuide() {
      if (this.showList && this.showList.length > 0) {
        return pleaseList[this.curChooseIndex];
      } else {
        return '';
      }
    },
    currentLabel() {
      if (this.showList && this.showList.length > 0) {
        return labelList[this.curChooseIndex];
      } else {
        return '';
      }
    },
  },
  watch: {
    isShow(newVal) {
      this._animate(newVal);
    },
    address(newVal) {
      this.currentPos = newVal;
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
    stopPropagation() {
      return true;
    },
    getData() {
      const url = 'wallet/addrlistqry';
      fetchHeader('post', url, {}, {}, this).then((res) => {
        this.provinceList = res.provinceH5s;
        this.showList = [...this.provinceList];
      });
    },
    getLocation() {
      const callback = () => {
        this.completed = false;
        this.curChooseIndex = 0;
        this.showList = [...this.provinceList];
      };
      this.$emit('getLocation', callback);
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
      this.curGuideIndex = index;
      const ref = this.$refs[`province_list${index}`];
      const el = ref ? ref[0] : null;
      if (el) {
        dom.scrollToElement(el, {
          offset: 0,
        });
      }
    },
    search() {
      const value = this.province;
      for (let i = 0; i < this.showList.length; i++) {
        const list = this.showList[i].list || [];
        const subIndex = list.findIndex((item) => {
          return item.name.includes(value);
        });
        if (subIndex !== -1) {
          this.chooseGuide(i);
          break;
        }
      }
    },
    cancel() {
      this.$emit('hide');
    },
    confirm(index, subIndex) {
      if (this.curChooseIndex === 0) {
        // 如果开始选择，就把定位/默认的位置置为空
        this.currentPos = [];
      }
      const subList = this.showList[index].list[subIndex];
      this.currentPos[this.curChooseIndex] = subList.name;
      this.showIndex[this.curChooseIndex] = {
        index,
        subIndex,
      };
      const curChooseIndex = this.curChooseIndex + 1;
      if (curChooseIndex < 3) {
        this.showList = subList.list;
        if (!this.showList || this.showList.length === 0) {
          code = subList.code;
          this.completed = true;
          this.$emit('confirm', this.currentPos, code);
        }
        this.curChooseIndex = curChooseIndex;
      } else if (curChooseIndex === 3) {
        // 目前就到区/县
        this.completed = true;
        this.$emit('confirm', this.currentPos, subList.code);
      }
    },
    reSelect(historyIndex) {
      this.completed = false;
      this.curGuideIndex = 0;
      if (historyIndex === 0) {
        this.currentPos = [];
        this.showList = [...this.provinceList];
      } else {
        this.currentPos.splice(historyIndex);
        let curList = this.provinceList;
        let curIndex = 0;
        let subList;
        do {
          const { index, subIndex } = this.showIndex[curIndex];
          subList = curList[index].list[subIndex];
          curList = subList.list;
          curIndex++;
        } while (curIndex < this.currentPos.length);
        this.showList = curList;
      }
      this.curChooseIndex = historyIndex;
    },
    selectNo() {
      this.chooseStreet = !this.chooseStreet;
      if (!this.chooseStreet) {
        this.$emit('confirm', this.currentPos, code);
      }
    },
  },
};
</script>
