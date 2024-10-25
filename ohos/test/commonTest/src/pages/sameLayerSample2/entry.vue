<template>
  <div style="overflow-y: auto; margin-top: 40px">
    <h5>自定义Web组件示例:</h5>
    <hl-web-test
      v-if="isShow"
      style="width: 100%;height: 500px;padding: 20px;margin-bottom: 100px;margin-top: 10px;"
      :src="webSrc"
      @pagestart="onPageStart"
      @pagefinish="onPageFinish"
      @error="onError"
      @receivedtitle="onReceivedtitle"
      @message="onMessage"
      ref="hlweb"
    />
    <div style="display: flex; flex-direction: row; align-items: center">
      <h3>加载地址:</h3>
      <input
        type="text"
        v-model="inputSrc"
        style="flex: 1;margin: 0 10px;border-bottom: 1px solid #333;height: 0.6rem;"
      />
      <button class="btn-web" @click="setSrc">确定</button>
    </div>
    <div class="btn-group">
      <text class="font-title">webview测试</text>
      <text class="btn" @click="onGoBack">goBack</text>
      <text class="btn" @click="onGoForward">forward</text>
      <text class="btn" @click="onReload">reload</text>
      <input type="text" v-model="message" style="margin: 0 10px;border-bottom: 1px solid #333;"/>
      <text class="btn" @click="onPostMessage">postMessage</text>
    </div>
    <h5>自定义Textarea组件示例:</h5>
    <hl-textarea-test
      class="common-style"
      style="padding: 20px; width: 65%; height: 250px"
      :placeholder="placeholder"
      :backgroundColor="backgroundColor"
      @nativeOnInput="onTextareaInput"
    ></hl-textarea-test>
    <div class="margin"></div>
    <h5>自定义Lottie组件示例:</h5>
    <hl-lottie-test
      ref="mylottie"
      class="common-style"
      style="padding: 20px; width: 65%; height: 250px"
      :loop="lottieLoop"
      :autoplay="lottieAutoPlay"
      :speed="speed"
      :sourceJson="sourceJson"
      @createFinish="onLottieCreateFinish"
    />
    <h5>自定义Richtext组件示例:</h5>
    <hl-richtext-test
      class="common-style"
      style="padding: 20px; width: 65%; height: 250px"
      :text="text1"
    ></hl-richtext-test>
    <div class="margin"></div>
    <h5>自定义Richtext组件示例:</h5>
    <hl-richtext-test
      class="common-style"
      style="padding: 20px; width: 65%; height: 250px"
      :text="text2"
    ></hl-richtext-test>
    <div class="margin"></div>
    <h5>自定义Richtext组件示例:</h5>
    <hl-richtext-test
      class="common-style"
      style="padding: 20px; width: 65%; height: 250px"
      :text="text3"
    ></hl-richtext-test>
    <div class="margin"></div>
    <h5>自定义Richtext组件示例:</h5>
    <hl-richtext-test
      class="common-style"
      style="padding: 20px; width: 65%; height: 250px"
      :text="text"
      :backgroundColor="backgroundColor"
      @nativeOnClick="onRichtextclick"
    ></hl-richtext-test>
    <div class="margin"></div>
    <h5>自定义Video组件示例:</h5>
    <hl-video-test
     style="width: 100%; height:500px; padding: 20px; margin-bottom: 100px; margin-top: 10px"
      :src="src"
      :controls="controls"
      :muted="muted"
      :loop="loop"
      :autoPlay="autoPlay"
      @onPlay="onVideoPlay"
      @onPause="onVideoPause"
    ></hl-video-test>
  </div>
</template>

<script>
import HlRichtextTest from "../../components/hl-richtext.vue";
import HlVideoTest from "../../components/hl-video.vue";
import HlLottieTest from "../../components/hl-lottie.vue";
import boat from "../../assets/json/Boat_Loader.json";
import HlTextareaTest from "../../components/hl-textarea.vue";
import HlWebTest from "../../components/hl-web.vue";
const webview = weex.requireModule("webview");

export default {
  data() {
    return {
      text: "<p align=left><font size=14 color='#999999'>我已阅读并同意</font> <a href=https://baidu.com><font size=14 color='#1188FF'> 《循环额度贷款合同》</font></a></p>",
      text1:
        "<span align=left><font size=14 color='#999999'>此机票价格及权益为留学生专享价格，需上传留学生的相关证件：</font><font size=14 color='#333333'>目的地国的学生签证、学生证</font><font size=14 color='#999999'>或</font><font size=14 color='#333333'>入学通知书扫描件</font></span>",
      text2:
        "<font color='#9295A0'>根据实名制要求，需提交使用人证件信息，我们将通过加密等方式保护此信息，且仅在办理相关手续时使用，点击保存表示您已阅读并同意</font><a href=https://dl.rsscc.cn/faq/policyagreement/hbgjserviceagreement.html><font color='#216CFF'>《服务协议》</font></a><font color='#9295A0'>。</font></a>",
      text3:
        '<h1 style="text-align: center;">h1标题</h1>' +
        '<h1 style="text-align: center;"><i>h1斜体</i></h1>' +
        '<h1 style="text-align: center;"><u>h1下划线</u></h1>' +
        '<h2 style="text-align: center;">h2标题</h2>' +
        '<h3 style="text-align: center;">h3标题</h3>' +
        '<p style="text-align: center;">p常规</p><hr/>' +
        '<div style="width: 500px;height: 500px;border: 1px solid;margin: 0auto;">' +
        '<p style="font-size: 35px;text-align: center;font-weight: bold; color: rgb(24,78,228)">字体大小35px,行高45px</p>' +
        '<p style="background-color: #e5e5e5;line-height: 45px;font-size: 35px;text-indent: 2em;">' +
        "<p>这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字</p>",
      backgroundColor: "#ff60cb42",
      placeholder: "请输入...",
      src: "https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      controls: true,
      muted: false,
      loop: false,
      autoPlay: true,
      speed: 1,
      lottieLoop: true,
      lottieAutoPlay: true,
      sourceJson: JSON.stringify(boat),
      webSrc:"https://m.changyoyo.com/finance/apply/output/v_k1/index.html?params=eyJtb2JpbGUiOiIxNTUzNDAzMzYxOSIsIm91dFRva2VuSWQiOiIxNTUzNDAzMzYxOV9vdXQiLCJwYXJ0bmVySWQiOiJTODg4OTE4NyIsInN0b3JlSWQiOiJaSFgwMDEiLCJjaGFubmVsU291cmNlIjoiMDIwMTI4MTMiLCJtZXJTaWduIjoiZTU2ZmFhODhjYzk2ZDhjOTdmNDhmMmUyZjYzYmZkMjRkOThkODU1YyIsImZpZWxkTXNnIjoiMTIyNzA0MDkxIiwiY2FsbGJhY2tVcmwiOiIifQ%3D%3D",
      message: "",
      inputSrc:"resource://rawfile/hanglv/pages/singlePage1/entry.html",
      isShow: true,
    };
  },
  created() {},
  components: {
    HlRichtextTest,
    HlVideoTest,
    HlLottieTest,
    HlTextareaTest,
    HlWebTest,
  },
  methods: {
    setSrc() {
      this.isShow = false;
      this.webSrc = this.inputSrc;
      this.$nextTick(function () {
        this.isShow = true;
      });
    },
    onGoBack() {
      webview.goBack(this.$refs.hlweb);
    },
    onGoForward() {
      webview.goForward(this.$refs.hlweb);
    },
    onReload() {
      webview.reload(this.$refs.hlweb);
    },
    onPostMessage() {
      webview.postMessage(this.$refs.hlweb, { message: this.message });
    },
    onPageStart: function (e) {
      console.log("hl-web_onPageStart-->", e);
    },
    onPageFinish: function (e) {
      console.log("hl-web_onPageFinish-->", e);
    },
    onError: function (e) {
      console.log("hl-web_onError-->", e);
    },
    onReceivedtitle: function () {
      console.log("The receivedtitle method has been called!!!" );
    },
    onMessage(e){
      console.log("message--->",e);
    },
    onRichtextclick(e) {
      console.log("【WEB】富文本组件被点击了!", e);
      this.text = "<p align=left><font size=14 color='#999999'>TEXT内容已修改</font></p>";
    },
    onTextareaInput (e) {
      console.log("【WEB】TextArea组件输入!", e);
    },
    onVideoPlay(res) {
      console.log("【WEB】视频开始播放!", res);
      setTimeout(() => {
        console.log("【WEB】视频静音!");
        this.muted = true;
      }, 5000);
    },
    onVideoPause(res) {
      console.log("【WEB】视频暂停播放!", res);
    },
    onLottieCreateFinish() {
      console.log("【Lottie】 create");
      setTimeout(() => {
        this.speed = 2
        this.$refs.mylottie.isAnimationPlaying((res) => {
          console.log("【Lottie】 playing", res)
        })
      }, 2000)
    },
  },
};
</script>

<style scoped>
.margin {
  margin-top: 40px;
  margin-bottom: 10px;
}

.common-style {
  /* 上下边距为10px，左右居中 */
  margin: 10px auto;
}
.btn {
  width: 500px;
  padding: 20px;
  margin: 20px auto 0;
  border-radius: 10px;
  color: #6d7dff;
  text-align: center;
  font-size: 32px;
  border-style: solid;
  border-color: #6d7dff;
  border-width: 1px;
  opacity: 1;
}
.btn:active {
  opacity: 0.8;
}
.btn-group {
  border-width: 1px;
  border-style: solid;
  border-color: blue;
  border-radius: 10px;
  width: 540px;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
}
.font-title {
  color: #333333;
  font-size: 28px;
  line-height: 35px;
}
.btn-web {
  height: 0.6rem;
  border-radius: 4px;
  color: #6d7dff;
  text-align: center;
  border-style: solid;
  border-color: #6d7dff;
  border-width: 1px;
  opacity: 1;
}
</style>
