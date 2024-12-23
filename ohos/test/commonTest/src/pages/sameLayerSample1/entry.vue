<template>
  <div style="overflow-y: auto; margin-top: 60px">
    <h5>自定义web组件示例:</h5>
     <hl-web
      class="common-style"
      style="width: 100%; height:500px; padding: 20px"
      :src="webSrc"
      @pagestart="onPageStart"
      @pagefinish="onPageFinish"
      @error="onError" 
    ></hl-web>
    <h5>自定义Textarea组件示例:</h5>
    <hl-textarea
      class="common-style"
      style="padding: 20px; width: 65%; height: 250px"
      :hosUniqueProps="textAreaArgs"
      :placeholder="placeholder"
    ></hl-textarea>
    <div class="margin"></div>
    <h5>自定义Lottie组件示例:</h5>
    <hl-lottie
      ref="mylottie"
      class="common-style"
      style="padding: 20px; width: 65%; height: 250px"
      :loop="lottieLoop"
      :autoplay="lottieAutoPlay"
      :speed="speed"
      :sourceUrl="sourceUrl"
      @createFinish="onLottieCreateFinish"
      @onLoopComplete="onLottieLoopComplete"
      @onComplete="onLottieComplete"
    />
    <h5>自定义Richtext组件示例:</h5>
    <div class="margin"></div>
    <hl-richtext
      class="common-style"
      style="padding: 20px; width: 65%; height: 250px"
      :hosUniqueProps="textArgs"
      :text="text"
    ></hl-richtext>
    <div class="margin"></div>
    <h5>自定义Video组件示例:</h5>
    <hl-video
      class="common-style"
      style="width: 100%; height:500px; padding: 20px"
      :hosUniqueProps="videoArgs"
      :src="src"
      :controls="controls"
      :muted="muted"
      :loop="loop"
      :autoPlay="autoPlay"
      @onPlay="onVideoPlay"
    ></hl-video>
    <div class="margin"></div>
    <h5>自定义Button组件示例:</h5>
    <hl-button
      class="common-style"
      style="padding: 20px; width: 65%; height: 140px"
      :text="textbutton"
      :loading="loading"
      :stateEffect = "stateEffect"
      @onTap="onTap"
    ></hl-button>
    <div class="margin"></div>
    <h5>自定义Slider组件示例:</h5>
    <hl-slider
      class="common-style"
      style="padding: 20px; width: 65%; height: 280px"
      :value= "value"
      :step= "step"
      :min= "min"
      :max= "max"
      @onChange = "onChange"
    >
    </hl-slider>
    <div class="margin"></div>
  </div>
</template>

<script>


import button from "@/components/button.vue";

export default {
  computed: {
    button() {
      return button
    },
  },
  data() {
    return {
      textArgs: {
        backgroundColor: "#ff60cb42",
        onClick: this.onRichtextclick,
      },
      text: "<font color='#9295A0' size=7>根据实名制要求，需提交使用人证件信息，我们将通过加密等方式保护此信息，且仅在办理相关手续时使用，点击保存表示您已阅读并同意</font><a href=https://dl.rsscc.cn/faq/policyagreement/hbgjserviceagreement.html><font color='#216CFF' size=7>《服务协议》</font></a><font color='#9295A0'>。</font></a>",
      videoArgs: {
        onPause: this.onVideoPause,
      },
      src: "https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      controls: true,
      muted: false,
      loop: false,
      autoPlay: true,
      speed:1,
      lottieLoop: true,
      lottieAutoPlay: true,
      sourceUrl: 'https://gray.umetrip.com/assets/json/car_order_animation.json',
      placeholder: "请输入...",
      textAreaArgs: {
        backgroundColor: "#ff60cb42",
        onClick: this.onTextareaInput,
      },
      textbutton: "mpharmony",
      loading: false,
      stateEffect: true,
      value: 50,
      step: 10,
      min: 0,
      max: 100,
      webSrc:"https://m.changyoyo.com/finance/apply/output/v_k1/index.html?params=eyJtb2JpbGUiOiIxNTUzNDAzMzYxOSIsIm91dFRva2VuSWQiOiIxNTUzNDAzMzYxOV9vdXQiLCJwYXJ0bmVySWQiOiJTODg4OTE4NyIsInN0b3JlSWQiOiJaSFgwMDEiLCJjaGFubmVsU291cmNlIjoiMDIwMTI4MTMiLCJtZXJTaWduIjoiZTU2ZmFhODhjYzk2ZDhjOTdmNDhmMmUyZjYzYmZkMjRkOThkODU1YyIsImZpZWxkTXNnIjoiMTIyNzA0MDkxIiwiY2FsbGJhY2tVcmwiOiIifQ%3D%3D",
    };
  },
  methods: {
    onPageStart: function(e) {
      console.log("hl-web_onPageStart-->", e);
    },
    onPageFinish: function(e) {
        console.log("hl-web_onPageFinish-->", e);
    },
    onError: function(e) {
        console.log("hl-web_onError-->", e);
    },
    onTextareaInput (e) {
      console.log("【WEB】TextArea组件输入!", e);
    },
    onRichtextclick(e) {
      console.log("【WEB】富文本组件被点击了!", e);
      this.text =
        "<p align=left><font size=14 color='#999999'>我已阅读并同意</font> <a href=https://baidu.com><font size=14 color='#1188FF'> 《循环额度贷款合同》</font></a></p>";
    },
    onVideoPlay(res) {
      console.log("【WEB】视频开始播放!", res);
      setTimeout(() => {
        console.log("【WEB】视频静音!");
        this.muted = true;
      }, 5000);
    },
    onVideoPause(res) {
      console.log("【WEB】视频暂停播放!", res)
    },
    onLottieLoopComplete() {
      console.log("【Lottie】 loopCompelte!")
    },
    onLottieCreateFinish() {
      console.log("【Lottie】 create");
      this.$refs.mylottie.play(() => {
        console.log('【Lottie】 play end')
      });
      setTimeout(() => {
          this.speed = 2
          this.$refs.mylottie.setDirection(-1)
          this.$refs.mylottie.isAnimationPlaying((res) => {
            console.log('【Lottie】 playing', res)
          })
          }, 2000)
    },
    onLottieComplete() {
      console.log("【Lottie】 complete");
    },
    onTap(res) {
      this.loading = !this.loading
      this.textbutton = 'clicked'
      console.log("【WEB】按钮组件被点击了!", res);
    },
    onChange(res) {
      console.log("【WEB】滑块组件被改变了!", res);
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
</style>
