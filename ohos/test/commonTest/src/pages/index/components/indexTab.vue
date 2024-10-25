<template>
  <div class="indexTab border-top">
    <div
      v-for="(tabName, index) in tabList"
      :key="index"
      class="tab_item"
      @click="tabSwitch(index + 1)"
    >
      <image :src="getSrc(index + 1)" class="tab_icon" />
      <text :class="[getClass(index + 1)]">{{ tabName }}</text>
      <!-- <text v-if="index + 1 === 4 && isReceiveNotice" class="msg_num">{{
        msgNum
      }}</text> -->
    </div>
  </div>
</template>

<script>
// import { xlog } from '@/utils/jsapi.js';
// const tabList = ['系统', '组件', '数据库', '业务', '研发自测'];
const activeIcon = [
  '../../images/task_active.png',
  '../../images/airplane_search_active.png',
  '../../images/message_active.png',
  '../../images/my_active.png',
  '../../images/task_active.png',
  '../../images/task_active.png',
];
const icon = [
  '../../images/task.png',
  '../../images/airplane_search.png',
  '../../images/message.png',
  '../../images/my.png',
  '../../images/task.png',
  '../../images/task.png',
];
export default {
  props: {
    tabIndex: {
      type: Number,
      default: 1,
    },
    isReceiveNotice: {
      type: Boolean,
      default: false,
    },
    msgNum: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // tabList: ['系统', '组件', '数据库', '业务', '研发自测'],
      tabList: ['API', 'imagePreview', '瀑布流', '半模态', '点评组件','测试用例'],
    };
  },
  methods: {
    getSrc(index) {
      const src =
        this.tabIndex === index ? activeIcon[index - 1] : icon[index - 1];
      return src;
    },
    getClass(tab) {
      if (this.tabIndex === tab) {
        return 'tab_item_name_active';
      } else {
        return 'tab_item_name';
      }
    },
    tabSwitch(index) {
      this.$emit('tabSwitch', index);
    },
  },
};
</script>
<style scoped>
.border-top {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #eeeeee;
}
.indexTab {
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0 0;
}
.tab_item {
  width: 125px;
  align-items: center;
}
.tab_item_name {
  margin-top: 4px;
  font-weight: bold;
  font-size: 20px;
  color: #888888;
}
.tab_item_name_active {
  margin-top: 4px;
  font-weight: bold;
  font-size: 20px;
  color: #6d7dff;
}
.msg_num {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #ff3b33;
  font-size: 22px;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  transform: translate(10px, -10px);
}
.tab_icon {
  width: 48px;
  height: 48px;
}
</style>
