<style src="../assets/css/global.css"></style>
<style scoped>
.airport_list_wrapper {
  position: fixed;
  left: 0;
  width: 750px;
  top: 0;
  bottom: 0;
  background-color: #fff;
  transform: translateX(750px);
  z-index: 100;
}
.scroll {
  flex: 1;
}
.search_line {
  height: 88px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  margin-top: 10px;
}
.search_box {
  box-sizing: border-box;
  width: 586px;
  height: 68px;
  padding: 0 30px;
  background-color: #f5f5f5;
  border-radius: 100px;
  align-items: center;
}
.search_input {
  margin-left: 10px;
  height: 42px;
  line-height: 42px;
  flex: 1;
  font-size: 28px;
  color: #333;
  background-color: #f5f5f5;
  caret-color: #6d7dff;
}
.cancel {
  font-size: 34px;
  color: #333;
}
.search_result {
  margin-top: 10px;
  padding: 0 32px;
}
.result_item {
  height: 86px;
  line-height: 86px;
  font-size: 32px;
  color: #333;
}
.no_result {
  margin-top: 300px;
  align-items: center;
}
.no_result_text {
  font-size: 36px;
  color: #666;
}
.select_line {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.select_option {
  height: 80px;
  line-height: 80px;
  justify-content: center;
  align-items: center;
}

.option_name {
  font-size: 30px;
  color: #999;
}
.option_name_selected {
  font-size: 30px;
  color: #6d7dff;
}
.option_line_wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
}
.option_line {
  background-color: #6d7dff;
  width: 40px;
  height: 5px;
  border-radius: 3px;
}
.history_box {
  padding: 0 48px 0 32px;
  margin-top: 20px;
}
.first_line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding-right: 12px;
}
.history_name {
  font-size: 30px;
  color: #333;
}
.history_clear {
  align-items: center;
  justify-content: center;
}
.history_clear_name {
  font-size: 28px;
  color: #666;
}
.second_line {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
}
.history_item {
  margin-top: 14px;
  box-sizing: border-box;
  width: 210px;
  padding: 0 20px;
  height: 65px;
  line-height: 65px;
  background-color: #f5f5f5;
  border-radius: 4px;
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-right: 12px;
}
.airport_list {
  padding: 0 60px 0 32px;
}
.airport_item {
  margin-top: 40px;
}
.item_label {
  font-size: 28px;
  color: #666;
}
.item_name {
  font-size: 32px;
  color: #333;
}
.item_first {
  margin-top: 20px;
}
.item_later {
  margin-top: 40px;
}
.item_sub_name {
  font-size: 24px;
  color: #999;
}
.index_wrapper {
  position: absolute;
  top: 150px;
  bottom: 0;
  right: 0;
  width: 60px;
}
.indexItem {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
}
.indexItem_deactiveIndex {
  font-size: 22px;
  color: #999;
}
.indexItem_activeIndex {
  font-size: 22px;
  background-color: #333;
  text-align: center;
  color: #fff;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
}
</style>

<template>
  <div
    :class="[
      'airport_list_wrapper',
      visibility ? 'airport_list_show' : 'airport_list_hide',
    ]"
    :style="wrapperStyle"
    ref="airportRoot"
  >
    <div class="search_line">
      <div class="search_box flex_row">
        <image
          src="../../images/airplane_search.png"
          style="width: 30px; height: 30px"
        />
        <input
          v-model="searchValue"
          ref="input"
          class="search_input medium"
          placeholder="搜机场名"
        />
        <image
          src="../../images/airport_delete.png"
          v-if="searchValue.length > 0"
          style="width: 30px; height: 30px"
          @click="reset"
        />
      </div>
      <text class="cancel medium" @click="cancel">取消</text>
    </div>
    <list v-if="searchValue.length > 0" class="scroll" ref="scroll">
      <cell v-for="(item, index) in searchResult" :key="index">
        <div class="search_result" @click="confirm(item, 1)">
          <text class="result_item">{{ item.airportName }}</text>
        </div>
      </cell>
      <cell v-if="showNoResult">
        <div class="no_result">
          <image
            src="../../images/no-result.png"
            style="width: 220px; height: 220px"
          />
          <text class="no_result_text medium">暂无该机场</text>
        </div>
      </cell>
    </list>
    <list v-else class="scroll" @scrollend="scrollend">
      <cell v-if="hasInternal">
        <div class="flex_row select_line">
          <div
            class="select_option"
            v-for="(item, index) in typeName"
            :key="index"
            :style="{ marginLeft: index == 1 ? '150px' : 0 }"
            @click="changeType(index)"
          >
            <text
              :class="[
                index === typeIndex
                  ? 'option_name_selected medium'
                  : 'option_name',
              ]"
              >{{ item }}</text
            >
            <div class="option_line_wrapper">
              <text class="option_line" v-if="index === typeIndex"></text>
            </div>
          </div>
        </div>
      </cell>
      <cell>
        <div class="history_box" v-if="historyList.length > 0">
          <div class="flex_row first_line">
            <text class="history_name medium">历史记录</text>
            <div class="history_clear flex_row" @click="clearHistory">
              <text class="history_clear_name">清空</text>
              <image
                src="../../images/trash.png"
                style="width: 24px; height: 28px; margin-left: 10px"
              />
            </div>
          </div>
          <div class="second_line flex_row">
            <text
              v-for="(item, index) in historyList"
              :key="index"
              class="history_item elipsis"
              @click="setSearch(index, 1)"
              >{{ item }}</text
            >
          </div>
        </div>
      </cell>
      <cell>
        <div
          class="history_box airport_item"
          ref="airportBlockHot"
          v-if="popularList.length > 0"
        >
          <text class="history_name medium">热门选择</text>
          <div class="second_line flex_row">
            <text
              v-for="(item, index) in popularList"
              :key="index"
              class="history_item elipsis"
              @click="confirm(item, 2)"
              >{{
                name == 'airport'
                  ? item.airportName
                  : `${item.cityName} ${item.cityCode}`
              }}</text
            >
          </div>
        </div>
      </cell>
      <!-- 注意这里不直接对airportList对象for in的原因是它不一定是按照A、B、C、D的顺序 -->
      <!-- <cell v-for="(item, index) in airportList" :key="index + typeIndex"
      class="airport_list" @appear="e=>appear(e, index)" @disappear="e=>disappear(e, index)">
        <div class="airport_item" :ref="'airportBlock'+index">
          <text class="item_label medium">{{ index }}</text>
          <text v-for="(subItem, subIndex) in item.list" :key="subIndex"
          :class="['item_name', subIndex==0 ? 'item_first_name' : '']" @click="confirm(subItem, 2)"
          >{{ name == 'airport' ? subItem.airportName
          : `${subItem.cityName} ${subItem.cityCode}` }}</text
        >
        </div>
      </cell> -->
      <cell
        v-for="(item, index) in letterList"
        :key="index + typeIndex"
        class="airport_list"
        @appear="(e) => appear(e, index)"
        @disappear="(e) => disappear(e, index)"
      >
        <div v-if="index > 0" class="airport_item" :ref="'airportBlock' + item">
          <text class="item_label medium">{{ item }}</text>
          <div
            v-for="(subItem, subIndex) in airportList[item].list"
            :key="subIndex"
            :class="[subIndex == 0 ? 'item_first' : 'item_later']"
            @click="confirm(subItem, 2)"
          >
            <text class="item_name">{{
              name == 'airport'
                ? `${subItem.airportAlias} ${subItem.cityCode}`
                : `${subItem.cityName} ${subItem.cityCode}`
            }}</text>
            <text class="item_sub_name">{{
              name == 'airport' ? subItem.airportEnName : subItem.cityEnName
            }}</text>
          </div>
        </div>
      </cell>
    </list>
    <list
      v-if="searchValue.length == 0"
      class="index_wrapper"
      :style="{ top: 100 + topHeight + 'px' }"
    >
      <cell
        v-for="(item, key) in letterList"
        :key="key"
        class="indexItem"
        @click="toIndex(item)"
      >
        <text
          :class="[
            item == curIndex
              ? 'indexItem_activeIndex'
              : 'indexItem_deactiveIndex',
          ]"
          >{{ item }}</text
        >
      </cell>
    </list>
  </div>
</template>
<script>
import {
  getItem,
  setItem,
  removeItem,
  xlog,
  fetchHeader,
} from '@/utils/jsapi.js';
// import { getItem, setItem, removeItem } from '../utils/index.js';
// import { xlog } from '../utils/jsapi.js';
// import { fetchHeader } from '../utils/web.js';
// import cityList from '../assets/js/cityList.json'
const dom = weex.requireModule('dom');
const animation = weex.requireModule('animation');
let civilCityList = {};
let interCityList = {};
let throttle = true;
let isScroll;

export default {
  name: 'ume-airport-list',
  props: {
    airportListStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    visibility: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: 'airport', // airport: 显示机场名字，city: 显示城市列表
    },
    topHeight: {
      type: Number,
      default: 0,
    },
    bottomHeight: {
      type: Number,
      default: 0,
    },
    airportCode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchValue: '',
      isFocus: false,
      typeIndex: 0,
      typeName: ['国内', '国际港澳台'],
      historyList: [],
      airportList: {},
      curIndex: '',
      searchResult: [],
      showNoResult: false,
      letterList: [],
      popularList: [],
      hasInternal: true,
    };
  },
  computed: {
    wrapperStyle() {
      const { airportListStyle } = this;
      return {
        ...airportListStyle,
        paddingTop: `${this.topHeight}px`,
        paddingBottom: `${this.bottomHeight}px`,
      };
    },
  },
  watch: {
    visibility(newVal) {
      this.init(newVal);
      if (newVal) {
        // 目前还没有改电量的api
        // changeStatusBar(1)
      }
    },
    searchValue(newVal) {
      this.oninput(newVal);
    },
    tabIndex(newVal) {
      if (newVal === 2) {
        this.$nextTick(() => {
          this.init();
        });
      }
    },
    airportCode(newVal) {
      if (newVal) {
        this.findAirport(newVal);
      }
    },
  },
  async created() {
    // let data = await getLocation()
    const data = {};
    const airportTimestamp = await getItem('airportTimestamp');
    if (airportTimestamp && airportTimestamp !== 'undefined') {
      // 如果之前有，说明现在应该是更新
      await this.getStorageData();
      console.log('缓存的国内数据civilCityList', civilCityList);
      console.log('缓存的国际数据interCityList', interCityList);
      if (
        Object.keys(interCityList).length === 0 ||
        Object.keys(civilCityList).length === 0
      ) {
        // 如果国内或者国际的数据被清空了也重新获取数据（h5情况localstorage被清掉）
        this.getData(true, data);
      } else {
        this.assignData(0);
        this.getData(false, data);
      }
    } else {
      // 第一次获取数据
      this.getData(true, data);
    }
    this.historyList = await this.getJson(
      this.name === 'airport' ? 'airportHistory' : 'cityHistory',
    );
  },
  methods: {
    init(newVal) {
      xlog.log('init');
      const root = this.$refs.airportRoot;
      let transform;
      if (newVal) {
        transform = 'translateX(0)';
        this.getJson(
          this.name === 'airport' ? 'airportHistory' : 'cityHistory',
        ).then((data) => {
          this.historyList = data;
        });
      } else {
        transform = 'translateX(750px)';
      }
      animation.transition(root, {
        styles: {
          transform,
        },
        duration: 500,
        timingFunction: 'ease',
        needLayout: false,
        delay: 0,
      });
    },
    async getJson(key, protoValue = []) {
      if (!key) return;
      let data = await getItem(key);
      try {
        if (data && data.length > 0) {
          data = JSON.parse(data) || [];
        } else {
          data = protoValue;
        }
      } catch (error) {
        // console.error(error);
        data = protoValue;
      }
      return data;
    },
    getData(isFirst = true, data = {}) {
      const path =
        'https://www.umetrip.com/gateway/api/web/flightstatus/flightstatus/getairportlist';
      const { latitude, longitude } = data;
      const params = {};
      const timestamp = new Date().getTime();
      if (!isFirst) {
        params.timestamp = timestamp;
      }
      params.latitude = latitude;
      params.longitude = longitude;
      fetchHeader(
        'post',
        path,
        params,
        {},
        {},
        {
          useUrlBase: false,
        },
      ).then((res) => {
        setItem('airportTimestamp', timestamp);
        const obj = res.s2cGetAirlineOpenCityWrapCommon || {};
        const civil = obj.civilCityListOrder || {}; // 国内机场数据
        const inter = obj.interCityListOrder || {}; // 国际机场数据
        this.currentCity = civil.currentCity || {};
        if (isFirst) {
          // console.log('接口返回的国内机场/城市数据：' + JSON.stringify(civil))
          // console.log('接口返回的国际机场/城市数据：' + JSON.stringify(inter))
          // for (const key in civil.defaultCityMap) {
          //   console.log('key', key);
          // }
          interCityList = inter;
          civilCityList = civil;
          this.hasInternal = obj.hasInternal && this.showInternal;
          this.assignData(0);
          this.setStorageData();
        } else {
          // console.log('接口返回的更新数据：' + JSON.stringify(res))
          // 更新逻辑
          const oldCivil = civilCityList.defaultCityMap;
          let oldBlockData;
          let newBlockData;
          for (const key in civil) {
            if (oldCivil[key] && oldCivil[key].list) {
              oldBlockData = oldCivil[key].list;
              newBlockData = civil[key].list;
              for (let i = 0; i < newBlockData.length; i++) {
                const updateKey = newBlockData[i].pinyin;
                if (newBlockData[i].inuse === '1') {
                  // 应该是插入
                  const low = this.binaryInsert(updateKey, oldBlockData);
                  // console.log(`需要插入的low: ${low}`);
                  oldBlockData.splice(low, 0, newBlockData[i]);
                } else {
                  const index = this.binarySearch(updateKey, oldBlockData);
                  // console.log(`需要删除的index: ${index}`);
                  if (index >= 0) {
                    oldBlockData.splice(index, 1);
                  }
                }
              }
            }
          }
          this.setStorageData();
        }
      });
    },
    assignData(index) {
      if (index === 0) {
        this.airportList = civilCityList.defaultCityMap || {};
        this.letterList = [...civilCityList.defaultLetterList] || [];
        this.popularList = civilCityList.popularCityList || [];
      } else {
        this.airportList = interCityList.defaultCityMap || {};
        this.letterList = [...interCityList.defaultLetterList] || [];
        this.popularList = interCityList.popularCityList || [];
      }
      if (this.popularList.length > 0) {
        this.letterList.unshift('热');
      }
      this.curIndex = this.letterList.length > 0 ? this.letterList[0] : '';
    },
    async getStorageData() {
      interCityList = await this.getJson('interCityList', {});
      civilCityList = await this.getJson('civilCityList', {});
    },
    setStorageData() {
      xlog.log('log setItem interCityList civilCityList');
      xlog.info('info setItem interCityList civilCityList');
      setItem('interCityList', JSON.stringify(interCityList));
      setItem('civilCityList', JSON.stringify(civilCityList));
    },
    binarySearch(value = '', list = []) {
      let low = 0;
      let high = list.length - 1;
      while (low <= high) {
        const mid = parseInt((high + low) / 2, 10);
        if (value > list[mid].pinyin) {
          low = mid + 1;
        } else if (value < list[mid].pinyin) {
          high = mid - 1;
        } else {
          return mid;
        }
      }
    },
    binaryInsert(value = '', list = []) {
      let low = 0;
      let high = list.length - 1;
      let res = 0;
      while (low <= high) {
        const mid = parseInt((high + low) / 2, 10);
        if (value > list[mid].pinyin) {
          // 应该插在右边
          low = mid + 1;
          res = mid;
        } else if (value <= list[mid].pinyin) {
          // 应该插在左边
          high = mid - 1;
        }
      }
      return res;
    },
    async setHistory(value) {
      let history = await this.getJson(
        this.name === 'airport' ? 'airportHistory' : 'cityHistory',
      );
      // 保证最新且不重复
      history.unshift(value);
      // 去重，set保证是把后面重复的去掉
      const set = new Set(history);
      history = [...set];
      if (history.length > 6) {
        history = history.slice(0, 6);
      }
      setItem(
        this.name === 'airport' ? 'airportHistory' : 'cityHistory',
        JSON.stringify(history),
      );
    },
    clearHistory() {
      this.historyList = [];
      removeItem(this.name === 'airport' ? 'airportHistory' : 'cityHistory');
    },
    oninput(s) {
      let searchValue = s;
      if (throttle) {
        throttle = false;
        searchValue = searchValue.toUpperCase();
        const { airportList } = this;
        let item;
        let list;
        let index = 0;
        let airportName;
        let cityCode;
        const searchResult = [];
        for (const key in airportList) {
          if (Object.prototype.hasOwnProperty.call(airportList, `${key}`)) {
            item = airportList[key];
            list = item.list || [];
            index = 0;
            while (index < list.length) {
              airportName = list[index].airportName;
              cityCode = list[index].cityCode;
              if (
                airportName.indexOf(searchValue) !== -1 ||
                cityCode.indexOf(searchValue) !== -1
              ) {
                searchResult.push(list[index]);
              }
              index++;
            }
          }
        }
        this.showNoResult = searchResult.length === 0;
        this.searchResult = searchResult;
        throttle = true;
      }
    },
    reset() {
      this.searchValue = '';
    },
    changeType(index) {
      if (index !== this.typeIndex) {
        this.typeIndex = index;
        this.assignData(index);
        // 先加载一部分数据，否则太卡
        // this.airportList = {}
        // this.addInterData(0, 2)
      }
    },
    toIndex(key) {
      // 注意index是字母
      this.curIndex = key;
      this.scrollTo(key);
    },
    cancel() {
      this.$emit('cancel');
      this.searchValue = '';
    },
    setSearch(index, tag) {
      if (tag === 1) {
        this.searchValue = this.historyList[index];
      }
    },
    confirm(item, tag) {
      this.$emit('confirm', item);
      const { searchValue } = this;
      if (tag === 1) {
        this.setHistory(searchValue);
        this.searchValue = '';
        const { input } = this.$refs;
        if (input) {
          input.blur();
        }
      }
    },
    appear(e, key) {
      if (!isScroll) {
        // 第一次是A的情况，direction是null
        // console.log('appear', e.direction, key);
        if (e.direction) {
          this.curIndex = key;
        }
        // let index = this.letterList.findIndex((item) => {
        //   return item === key
        // })
        // let index1
        // if (index !== -1) {
        //   if (e.direction === 'up') {
        //     index1 = [index + 2]
        //   } else if (e.direction === 'down') {
        //     index1 = index - 2
        //   }
        //   if (index1 >= 0 && index1 < this.letterList.length - 2
        // && !this.airportList[this.letterList[index1]]) {
        //     this.addInterData(index1, index1)
        //     if (e.direction === 'down') {
        //       console.log('滚动到' + this.letterList[index])
        //       this.scrollTo(this.letterList[index])
        //     }
        //   }
        // }
      }
    },
    // disappear(e, key) {
    //   console.log('disapper', e.direction, key);
    // },
    addInterData(s, end) {
      let start = s;
      let key;
      while (start <= end) {
        key = this.letterList[start];
        if (this.typeIndex === 1) {
          this.airportList[key] = interCityList[key];
        } else {
          this.airportList[key] = civilCityList[key];
        }
        start++;
      }
      this.sort();
    },
    sort() {
      const keys = Object.keys(this.airportList).sort();
      const result = {};
      keys.forEach((element) => {
        result[element] = this.airportList[element];
      });
      this.airportList = result;
    },
    scrollTo(key) {
      this.$nextTick(() => {
        let ref;
        if (key === '热') {
          ref = this.$refs.airportBlockHot;
        } else {
          ref = this.$refs[`airportBlock${key}`];
          ref = ref && ref[0];
        }
        if (ref) {
          isScroll = true;
          dom.scrollToElement(ref, {
            offset: 0,
          });
        }
      });
    },
    scrollend() {
      // h5没有该事件
      isScroll = false;
    },
    findAirport(airportCode) {
      // 登录时的airportCode
      let item;
      let list;
      let index;
      let cityCode;
      let airportName = '';
      const allCityList = [civilCityList];
      for (let i = 0; i < allCityList.length; i++) {
        const itemList = allCityList[i];
        for (const key in itemList) {
          if (Object.prototype.hasOwnProperty.call(itemList, `${key}`)) {
            item = itemList[key];
            list = item.list || [];
            index = 0;
            while (index < list.length) {
              cityCode = list[index].cityCode;
              if (cityCode === airportCode) {
                airportName = list[index].airportName;
                break;
              }
              index++;
            }
            if (airportName) break;
          }
        }
        if (airportName) break;
      }
      this.$emit('findAirport', airportName);
    },
  },
};
</script>
