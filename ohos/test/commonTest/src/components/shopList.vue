<style scoped>
.recommend_list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.recommend_item_first {
  flex-direction: row;
  padding: 0 32px;
}
.recommend_item {
  flex-direction: row;
  padding: 60px 32px 0;
}
.recommend_item_place {
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0 8px;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  color: #ffffff;
  border-top-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.recommend_item_right {
  margin-left: 30px;
  flex: 1;
  width: 436px;
}
.recommend_item_name {
  font-size: 32px;
  color: #333333;
}
.recommend_item_desc {
  margin-top: 2px;
  line-height: 37px;
  font-size: 26px;
  color: #999999;
}
.recommend_item_discount {
  flex-direction: row;
  margin-top: 7px;
}
.recommend_item_discount_image {
  position: absolute;
  left: 0;
}
.recommend_item_discount_name {
  background-color: #fff5e5;
  padding: 0 6px 0 22px;
  border-radius: 4px;
  font-size: 22px;
  color: #ff9c00;
  margin-left: 16px;
  border-radius: 4px;
  height: 32px;
  line-height: 32px;
}
.recommend_item_pageview {
  position: absolute;
  bottom: 0;
  font-size: 24px;
  color: #999999;
}
.no_more_tip {
  flex-direction: row;
  width: 750px;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 30px;
}
.no_more_tip_line {
  width: 20px;
  height: 3px;
  background-color: #cccccc;
}
.no_more_tip_name {
  margin: 0 20px;
  font-size: 26px;
  color: #cccccc;
}
</style>

<template>
  <list
    class="recommend_list"
    @loadmore="loadmore"
    loadmoreoffset="20"
    show-scrollbar="false"
  >
    <cell :style="{ height: height }"></cell>
    <cell
      v-for="(item, index) in shopList"
      :key="index"
      :class="[index == 0 ? 'recommend_item_first' : 'recommend_item']"
      @click="toDetail(index)"
    >
      <div class="recommend_item_left">
        <image
          :src="item.image"
          style="width: 220px; height: 170px; border-radius: 6px"
        ></image>
        <text class="recommend_item_place">{{ item.terminalFloor }}</text>
      </div>
      <div class="recommend_item_right">
        <text class="recommend_item_name">{{ item.shopName }}</text>
        <text class="recommend_item_desc">{{ item.mainTrade }}</text>
        <div v-if="item.discount" class="recommend_item_discount">
          <text class="recommend_item_discount_name">{{ item.discount }}</text>
          <image
            class="recommend_item_discount_image"
            src="../../images/discount.png"
            style="width: 32px; height: 32px"
          ></image>
        </div>
        <text class="recommend_item_pageview">{{ item.browse }}</text>
      </div>
    </cell>
    <cell v-if="nextPage == 0" class="no_more_tip">
      <text class="no_more_tip_line"></text>
      <text class="no_more_tip_name">没有更多商户了</text>
      <text class="no_more_tip_line"></text>
    </cell>
  </list>
</template>
<script>
import { createLink, getQuery } from '../utils/index';

const navigator = weex.requireModule('navigator');
let airportCode;
export default {
  props: {
    shopList: {
      type: Array,
      default() {
        return [];
      },
    },
    nextPage: {
      type: Number,
      default: 1,
    },
    height: {
      type: String,
      default: '0px',
    },
  },
  created() {
    airportCode = getQuery('airportCode', weex.config.bundleUrl || '');
  },
  methods: {
    loadmore() {
      // console.log('触发loadmore');
      this.$emit('loadmore');
    },
    toDetail(index) {
      const item = this.shopList[index];
      const url = createLink('detail', {
        shopId: item.shopId,
        airportCode,
      });
      navigator.push({
        url,
        animated: 'true',
      });
    },
  },
};
</script>
