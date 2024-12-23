<template>
  <div
    class="index-wrapper"
    @viewappear="onviewappear"
    @viewdisappear="onviewdisappear"
  >
    <navbar
      :title="isWeex ? tabList[tabIndex - 1] : 'h5标题'"
      :statusbarHeight="statusbarHeight"
      :useDefaultReturn="true"
      :isFullScreen="isFullScreen"
      leftButton="../../images/back_white.png"
      backgroundColor="#6d7dff"
      textColor="#ffffff"
    >
    </navbar>
    <div
      :style="{ height: topH + 'px' }"
      style="background-color: #6d7dff"
    ></div>
    <!-- (750) 主体，可视区 -->
    <div class="main-wrapper" :style="{ height: contentHeight + 'px' }">
      <!-- (750*4) 主体包含4tab，每个宽750，横向排列，点击tab则偏移750*n，被点击的tab移到可视区 -->
      <div class="tab-conbtainer" ref="mainWrapper">
        <tab1
          :contentHeight="contentHeight"
          :topHeight="statusbarHeight"
          :statusbarHeight="statusbarHeight"
          :bottom-height="bottomHeight"
          :full-height="fullHeight"
          :isFullScreen="isFullScreen"
          :toggleFullScreen="toggleFullScreen"
          @callback="callback"
        ></tab1>
        <!-- :bottom-height="botAndTabHeight" -->
        <tab2
          :contentHeight="contentHeight"
          :topHeight="statusbarHeight"
          :statusbarHeight="statusbarHeight"
          :bottomHeight="bottomHeight"
          :fullHeight="fullHeight"
          :airport-code="airportCode"
          :tab-index="tabIndex"
        ></tab2>
        <!-- :bottom-height="botAndTabHeight" -->
        <tab3
          :contentHeight="contentHeight"
          :topHeight="statusbarHeight"
          :statusbarHeight="statusbarHeight"
          :bottomHeight="bottomHeight"
          :fullHeight="fullHeight"
          :airport-code="airportCode"
          :tab-index="tabIndex"
        ></tab3>
        <tab4
          :contentHeight="contentHeight"
          :topHeight="statusbarHeight"
          :statusbarHeight="statusbarHeight"
          :bottomHeight="bottomHeight"
          :fullHeight="fullHeight"
          :airport-code="airportCode"
          :tab-index="tabIndex"
        ></tab4>
        <tab5
          :contentHeight="contentHeight"
          :topHeight="statusbarHeight"
          :statusbarHeight="statusbarHeight"
          :bottomHeight="bottomHeight"
          :fullHeight="fullHeight"
          :airport-code="airportCode"
          :tab-index="tabIndex"
        ></tab5>
        <tab6
          :contentHeight="contentHeight"
          :topHeight="statusbarHeight"
          :statusbarHeight="statusbarHeight"
          :bottomHeight="bottomHeight"
          :fullHeight="fullHeight"
          :airport-code="airportCode"
          :tab-index="tabIndex"
        ></tab6>
      </div>
    </div>
    <!-- 底栏 -->
    <div class="bottom-wrapper" :style="{ bottom: botH + 'px' }">
      <index-tab
        :tab-index="tabIndex"
        @tabSwitch="tabSwitch"
        :is-receive-notice="isReceiveNotice"
        :msg-num="msgNum"
      ></index-tab>
    </div>
    <modal
      :value="showModal"
      :content="content"
      okText="确认"
      @onOk="closeModal"
    ></modal>
    <umeLoading :visible="showLoading"></umeLoading>
    <toast v-if="showToast" :content="content" @close="closeToast"></toast>
  </div>
</template>
<script>
import indexTab from './components/indexTab.vue';

import tab6 from './components/tab6.vue'
import tab5 from './components/tab5.vue'
import tab4 from './components/tab4.vue'
// import imagepreview from './components/imagepreview.vue';
import tab3 from './components/tab3.vue';
import tab2 from './components/tab2.vue';
import tab1 from './components/tab1.vue';
import compMixin from '../../mixin/compMixin';
import {   Broadcast } from '@/utils/index.js'
import {
  isWeb,
  isAndroid,
  // callNative,
  isWeex,
  h5Android,
  isIos,
  xlog,
  isInUmeApp,
  changeTitle,
  setAutoFullscreenNew,
  // setFullscreen,
  // setAutoFullscreen,
  // setAutoFullscreenNew,
} from '@/utils/jsapi.js';
// import { setAutoFullscreenNew } from '../../utils/jsapi';

const navigator = weex.requireModule('navigator');

// import downgrade from '@weex-project/downgrade';
const animation = weex.requireModule('animation');
const modal = weex.requireModule('modal');
const weexModule = weex.requireModule("weexModule");

// const dom = weex.requireModule('dom');
const indexPage = Broadcast('frameworkTest');
const tabList = ['1系统', '2组件', '3业务', '4研发自测不用管', '半模态'];

export default {
  mixins: [compMixin],
  components: {
    indexTab,
    tab1,
    tab2,
    tab3,
    tab4,
    tab5,
    tab6,
  },
  data() {
    return {
      tabIndex: 1,
      content: '',
      isReceiveNotice: false,
      msgNum: 0,
      aps: {},
      airportCode: '',
      tabList,
      isFullScreen: true, // 标识是否是全屏幕情况
      isAndroid,
      h5Android,
      isIos,
      isWeb,
      isInUmeApp,
      fullHeight: 1300,
      bottomHeight: 0,
      statusbarHeight: 0,
      imgUrl:'',
      show: false,
      scalemin: 0.5,
      scalemax: 2
    };
  },
  computed: {
    contentHeight() {
      const h =
        this.fullHeight - this.statusbarHeight - this.bottomHeight - 90 - 100;
      return h;
    },
    borderTopWidth() {
      if (isWeb) {
        return this.isFullScreen ? `${this.statusbarHeight}px` : '0px';
      } else {
        return this.isFullScreen ? `${this.statusbarHeight + 90}px` : '90px';
      }
    },
    topH() {
      // 1 weex h5 全屏：占位div高=navbar+电量栏
      // 2 weex 关全屏（电量栏给客户端）：占位div高=navbar
      // 3 h5 关全屏（电量栏+navbar给客户端）：占位div高=0
      let h;
      if (this.isFullScreen) {
        h = this.statusbarHeight + 88;
      } else if (this.isWeex && !this.isFullScreen) {
        h = 88;
      } else if (this.isWeb && !this.isFullScreen) {
        h = 0;
      }
      return h;
    },
    botH() {
      let h = this.bottomHeight;
      if (!this.isFullScreen) {
        h = 0;
      }
      return h;
    },
  },
  created() {
    xlog.info(111111);
    setAutoFullscreenNew({
      isOpen: true,
      showStatusMsg: true,
      statusMsgColor: 0,
    }).then((data) => {
      this.fullHeight = data.fullHeight;
      this.bottomHeight = data.bottomHeight;
      this.statusbarHeight = data.statusbarHeight;
    });
    // weex安卓底部显隐监听
    if (this.isWeex) {
      weex
        .requireModule('globalEvent')
        .addEventListener('WXFreshLayoutHeight', (data) => {
          const { env } = weex.config;
          const scale = 750 / env.deviceWidth;
          this.bottomHeight = data.bottomHeight * scale;
        });
    }
    this.closeAndroidWeex();
    // this.changeH5Title();
  },


  // 热更新测试用例
  beforeCreate() {
    weexModule.callNative("onCheckForUpdate", {}, (res) => {
      console.log("热更新: onCheckForUpdate");
      console.log("热更新:" + JSON.stringify(res.data));
      if(res.data[0]){
        console.log('热更新: 有最新版本')
      }
      if (res.data[1] > 0) {
        return;
      }
      weexModule.callNative("onUpdateReady", {}, (res) => {

        modal.prompt(
            {
              message: "是否立即更新",
              okTitle: "confirm",
              cancelTitle: "cancel",
            },
            (value) => {
              console.log(
                  "热更新: button：" + value.result + ", input data：" + value.data
              );
              if (value.result === "confirm") {
                console.log('热更新: 按钮确认，等待执行applyUpdate');
                weexModule.callNative("applyUpdate", {}, (res) => {
                  console.log("热更新: 正在执行立即更新");
                });
              }
            }
        );
      });
    });
    weexModule.callNative("onUpdateFailed", {}, (res) => {
      console.log("热更新: 更新失败");
    });
  },

  beforeDestroy() {
    indexPage.close();
  },
  methods: {
    setFullscreen(params) {
      xlog.info('entry param', params);
      setAutoFullscreenNew({
        isOpen: true,
        showStatusMsg: true,
        statusMsgColor: 1,
        ...params,
      }).then((data) => {
        this.fullHeight = data.fullHeight;
        this.bottomHeight = data.bottomHeight;
        this.statusbarHeight = data.statusbarHeight;
      });
    },
    toggleFullScreen(flag) {
      console.log('toggleFullScreen');
      this.isFullScreen = flag;
    },
    changeH5Title() {
      if (!isWeex) {
        changeTitle({
          backgroundColor: '#6d7dff',
          titleWordColor: '#ffffff',
        });
      }
    },
    closeAndroidWeex() {
      // 关闭weex页面
      indexPage.onmessage = (event) => {
        const data = event.data || {};
        if (data.type === 'closeView_all') {
          isAndroid && navigator.pop();
        }
      };
    },
    testLog() {
      xlog.log('=================== 测 console 开始');
      xlog.log('console log');
      xlog.info('console info');
      xlog.info('参1', '参2');
      xlog.info(11111);
      xlog.error('console error');
      xlog.log('====》 测2参');
      xlog.log('字符串1', JSON.stringify({ a: 'json字符串' }));
      xlog.log('字符串1', { a: '测试obj' });
      xlog.log('====》测非字符串');
      xlog.log({ a: '测试obj' });
      xlog.log([1, 2, 3, 4, 5]);
      xlog.log(11111);
      xlog.log('=================== 测 console 结束');
    },
    onviewappear() {
      xlog.log('viewappear');
    },
    onviewdisappear() {
      xlog.log('viewdisappear');
    },
    openModal() {
      this.show = true;
    },
    tabSwitch(index) {
      if(index===4){
        this.openModal()
      } else {
        this.show = false;
      }
      
      if (this.showLoading) {
        return;
      }
      this.tabIndex = index;
      const ref = this.$refs.mainWrapper;
      animation.transition(
        ref,
        {
          styles: {
            transform: `translateX(${-(index - 1) * 750}px)`,
          },
          duration: 10,
          timingFunction: 'ease',
          needLayout: false,
          delay: 0,
        },
        () => {
          // xlog.log('animation finished');
        },
      );
    },
    callback(method, params) {
      this[method](params);
    },
  },
};
</script>
<style src="../../assets/css/global.css"></style>
<style scoped>
.bp {
  border-width: 3px;
  border-color: pink;
}
.br {
  border-width: 5px;
  border-color: red;
}
.bb {
  border-width: 3px;
  border-color: blue;
}
.bg {
  border-width: 3px;
  border-color: green;
}
.index-wrapper {
  background-color: #ffffff;
}
.main-wrapper {
  width: 750px;
  flex: 1;
  overflow: hidden;
}
.tab-conbtainer {
  flex: 1;
  flex-direction: row;
  position: absolute;
}
.bottom-wrapper {
  background-color: #ffffff;
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 750px;
  height: 99px;
}
</style>
