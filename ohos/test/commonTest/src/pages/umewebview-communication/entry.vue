<style scoped>
.test {
  padding: 0 32px;
}
.web {
  flex: 1;
}
.weex_btn {
  width: 400px;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  color: #6d7dff;
  text-align: center;
  font-size: 32px;
  border-style: solid;
  border-color: #6d7dff;
  border-width: 1px;
}
</style>

<template>
  <div class="webview_wrapper" style="background-color: #fff">
    <navbar
      v-if="isWeex"
      :title="title"
      :statusbarHeight="statusbarHeight"
      backgroundColor="#fff"
      textColor="#333"
      leftButton="../../images/back.png"
      :useDefaultReturn="false"
      @leftButtonClicked="goBack"
    ></navbar>
    <div
      class="test"
      :style="{ marginTop: isWeex ? 90 + statusbarHeight + 'px' : '0px' }"
      @click="testSend"
    >
      <text class="weex_btn">向h5_test.html发送数据</text>
    </div>
    <div
      class="test"
      :style="{ marginTop: isWeex ? 90 + statusbarHeight + 'px' : '0px' }"
      @click="testSend1"
    >
      <text class="weex_btn">向h5_test1.html发送数据</text>
    </div>
    <div class="test">
      <text style="font-size: 32px">来自h5_test.html的数据:</text>
      <text style="font-size: 32px">{{ testFromH5 }}</text>
      <text style="font-size: 32px">来自h5_test1.html的数据:</text>
      <text style="font-size: 32px">{{ test1FromH5 }}</text>
      <text style="font-size: 32px">以下是内嵌的webview页面：</text>
    </div>
    <web
      class="web"
      ref="webview1"
      src="../../web/test.html"
      @message="onMessage1"
      @pagestart="onpagestart"
      @pagefinish="onpagefinish"
    ></web>
    <web
      class="web"
      ref="webview2"
      src="../../web/test1.html"
      @message="onMessage2"
      @pagestart="onpagestart"
      @pagefinish="onpagefinish"
    ></web>
  </div>
</template>
<script>
// import { getQuery, isWeex } from '../../utils/index';
import {
  getQuery,
  isWeex,
  setAutoFullscreenNew,
  closeFullscreen,
  changeTitle,
  } from "@/utils/jsapi.js";
import navbar from "../../components/navbar.vue";

const webview = weex.requireModule("webview");
const navigator = weex.requireModule("navigator");
const modal = weex.requireModule('modal');
export default {
  components: {
    navbar,
  },
  data() {
    return {
      isWeex,
      title: '',
      url: '',
      testFromH5: '',
      test1FromH5: '',
      canGoBack: false,
      statusbarHeight: 40,
      bottomHeight: 0,
      fullHeight: 1300,
    };
  },
  mounted() {
    this.url = getQuery("src", weex.config.bundleUrl);
    this.title = getQuery("title", weex.config.bundleUrl);
    // weex设全屏，h5关全屏
    if (isWeex) {
      setAutoFullscreenNew({
        isOpen: true,
        showStatusMsg: true,
        statusMsgColor: 1,
      }).then((data) => {
        this.fullHeight = data.fullHeight;
        this.bottomHeight = data.bottomHeight;
        this.statusbarHeight = data.statusbarHeight;
      });
    } else {
      // 200200 weexWeb mini
      closeFullscreen();
      changeTitle({
        backgroundColor: "#ffffff",
        titleWordColor: "#000000",
        titleContent: "webview",
        topColor: 1,
        btnColor: 1,
      });
      document.title = "webview";
    }
  },
  methods: {
    onMessage1(e) {
      // console.log('recieve data from webview');
      const data = e.data || {};
      this.testFromH5 = JSON.stringify(data);
    },
    onMessage2(e) {
      // console.log('recieve data from webview');
      const data = e.data || {};
      this.test1FromH5 = JSON.stringify(data);
    },
    testSend() {
      const webviewRef = this.$refs.webview1;
      webview.postMessage(webviewRef, {
        title: '我是来自weex_1的数据hello',
      });
    },
    testSend1() {
      const webviewRef = this.$refs.webview2;
      webview.postMessage(webviewRef, {
        title: '我是来自weex_2的数据hello',
      });
    },
    goBack() {
      if (this.canGoBack) {
        const webviewRef = this.$refs.webview1;
        webview.goBack(webviewRef);
      } else {
        navigator.pop({}, () => {});
      }
      // const webviewRef = this.$refs.webview1;
      // webview.goBack(webviewRef);
    },
    onpagestart() {
      // console.log(`page start url${ e.url}`);
    },
    onpagefinish(e) {
      // const params = {
      //   url: e.url,
      //   canGoBack: e.canGoBack,
      //   canGoForward: e.canGoForward,
      //   title: e.title,
      // };
      // console.log(`page finish url${ JSON.stringify(params)}`);
      this.canGoBack = e.canGoBack;
    },
  },
};
</script>
