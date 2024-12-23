<template>
  <scroller class="demo-scroll-to-element">
    <div style="align-items: center">
      <textarea rows="8"  v-model="animationSpeedValue"></textarea>
      <div class="btn" @click="animated">Animation_timingFunction</div>
      <div class="container"><div class="test-element" ref="element"></div></div>
        <textarea rows="8"  v-model="animationValue"></textarea>
      <text class="btn" @click="transition">Animation_transition</text>
      <image
        ref="test"
        style="width: 500px; height: 500px"
        src="../../images/logo.png"
      ></image>
      <div class="btn" @click="setInvaildItem">传入不合法的key-value</div>
      <div class="btn" @click="getItemForNotInvaild">getItem中传入不合法的值</div>
     <textarea rows="3"  v-model="setValue"></textarea>
      <text class="btn" @click="setString">clipboard_setString</text>
      <text class="btn" @click="getString">clipboard_getString</text>
     <textarea rows="5"  v-model="scrollToElementValue"></textarea>
      <text class="btn" @click="moveToElementList"
        >scrollToElement_target</text>
      <text class="btn" @click="moveToElementScroller">
       scrollToElement_scroll
      </text>
      <text class="btn" @click="getElementInfo_target">getComponentRect_target</text>
      <text class="btn" @click="getElementInfo_mytest">getComponentRect_mytest</text>
      <text class="btn">target元素信息：{{ elementInfo_target }}</text>
      <text class="btn">mytest元素信息：{{ elementInfo_mytest }}</text>

      <text class="btn" @click="getViewportInfo"
        >获取视口容器布局(dom-getComponentRect)</text
      >
      <text class="btn">{{ viewportInfo }}</text>
      <input type="text" class="input" ref="mytest">
      <text class="btn" @click="getLayoutInfo">获取当前布局方向</text>
      <text class="btn" @click="getInputLayoutInfo">获取input标签布局方向</text>
      <text class="btn">{{ layoutInfo }}</text>

      <text class="btn" @click="addEvent">添加事件</text>
      <text class="btn">事件触发次数{{ count }}</text>
      <text class="btn" @click="removeEvent">清除事件</text>

      <text class="btn" @click="buttonClicked">点击跳转new</text>
      <text class="btn" @click="jumpPage('navigator_pop')">点击跳转</text>

      <text class="btn" @click="toast">Modal_toast</text>
      <text class="btn" @click="alert">Modal_alert</text>
      <text>alert回调: {{ alertCallBackInfo }}</text>
      <text class="btn" @click="confirm">Modal_confirm</text>
      <text>confirm回调: {{ confirmCallBackInfo }}</text>
      <text class="btn" @click="prompt">Modal_prompt</text>
      <text>prompt回调: {{ promptCallBackInfo }}</text>
      
      <input  v-model="setItemKey"/>
      <input  v-model="setItemValue"/>
      <text class="btn" @click="setItem">存储一个数据</text>
      <text>setItem回调: {{ setItemBackInfo }}</text>
      <text class="btn" @click="getItem">根据键名获取数据</text>
      <text>getItem回调: {{ getItemBackInfo }}</text>
      <text class="btn" @click="removeItem">根据键名删除数据</text>
      <text>removeItem回调: {{ removeItemBackInfo }}</text>
      <text class="btn" @click="length">获取数据总数</text>
      <text>length回调: {{ lengthBackInfo }}</text>
      <text class="btn" @click="getAllKeys">获取所有数据的键名</text>
      <text>getAllKeys回调: {{ getAllKeysBackInfo }}</text>

      <text class="btn" @click="enableFullScreenHeight()">获取全屏高度</text>
      <text>全屏高度: {{ height }}</text>
      <div class="test-elememt" ref="target">这是测试元素</div>
      <div class="list-item" ref="target">1-target</div>
      <div class="list-item">2</div>
      <div class="list-item">3</div>
      <div class="list-item">4</div>
      <div class="list-item">5</div>
      <div class="list-item">6</div>
      <div class="list-item">7</div>
      <div class="list-item" ref="targeter" :style="{backgroundColor:'blue'}">测试跳转target节点</div>
      <div class="list-item">9</div>
      <div class="list-item">10</div>
      <div class="list-item">11</div>
      <div class="list-item">12</div>
      <div class="list-item">13</div>
      <div class="list-item">14</div>
      <div class="list-item">15</div>
      <div class="list-item">16</div>
      <div class="list-item">17</div>
      <div class="list-item" ref="scroller" :style="{backgroundColor:'red'}">测试跳转scroller节点</div>
      <div class="list-item">19</div>
      <div class="list-item">20</div>
      <div class="list-item">21</div>
      <div class="list-item">22</div>
      <div class="list-item">23</div>
      <div class="list-item">24</div>
      <div class="list-item">25</div>
    </div>
  </scroller>
</template>

<script>
const animation = weex.requireModule("animation");
const modal = weex.requireModule("modal");
const clipboard = weex.requireModule("clipboard");
const deviceInfo = weex.requireModule("deviceInfo");
const storage = weex.requireModule("storage");
const dom = weex.requireModule("dom");
const globalEvent = weex.requireModule("globalEvent");
const navigator = weex.requireModule("navigator");
import { pushPage } from '@/utils/index.js';
export default {
  data() {
    return {
      animationValue:JSON.stringify({
          styles: {
            with: "100px",
            height: "200px",
            opacity: "0.25",
            backgroundColor: "#FF0000",
            transform: "translate(0px, 0px) rotate(0deg) scale(1)",
            transformOrigin: 'left,top'
          },
          duration: 6000, //ms
          timingFunction: "ease-in-out",
          needLayout: false,
          delay: 300, //ms
        },null,"\t"),
        animationSpeedValue:JSON.stringify({
        timingFunction: "cubic-bezier(0.17,0.67,0.83,0.67)",
        styles: {
            with: "100px",
            height: "100px",
            opacity: "0.5",
            backgroundColor: "#FFCCCC",
            transform: "translateX(500px)",
          },
          duration: 3000, //ms
          needLayout: true,
          delay: 300, //ms
        },null,"\t"),
        scrollToElementValue:JSON.stringify({
          offset:0,
          animated:true,
        },null,"\t"),
        setItemKey:"key",
        setItemValue:"value",
        isAddEvent:false,
        setValue:"111",
      clipboardText: "",
      alertCallBackInfo: "",
      confirmCallBackInfo: "",
      promptCallBackInfo: "",
      setItemBackInfo: "",
      getItemBackInfo: "",
      removeItemBackInfo: "",
      lengthBackInfo: "",
      getAllKeysBackInfo: "",
      height: "",
      elementInfo_target: "",
      elementInfo_mytest:"",
      viewportInfo: "",
      layoutInfo: "",
      count: 0,
    };
  },
  mounted() {},
  methods: {
    jumpPage(page, params = {}) {
      let newParams = params;
      pushPage(page, newParams);
    },
    buttonClicked() {
      navigator.push(
        {
          url: "https://675554.com/resource://rawfile/hanglv/pages/navigator_pop/entry.html?",
          animated: "true",
        },
        () => {
        
          console.log("跳转成功");
        }
      );
    },
   addEvent() {
      let tmp = this;
      if ( !this.isAddEvent ) {
              globalEvent.addEventListener(
                "WXApplicationDidBecomeActiveEvent",
                function (e) {
                  console.log("Foreground callback successfully!");
                  tmp.count++;
                }
              );
              this.isAddEvent = true
      }
    },
    removeEvent() {
      globalEvent.removeEventListener("WXApplicationDidBecomeActiveEvent");
      this.count = 0;
      this.isAddEvent = false
    },
    getLayoutInfo() {
      dom.getLayoutDirection(this.$refs.target, (result) => {
        this.layoutInfo = result;
      });
    },
     getInputLayoutInfo() {
      dom.getLayoutDirection(this.$refs.mytest, (result) => {
        this.layoutInfo = result;
      });
    },   
    getElementInfo_target() {
      dom.getComponentRect(this.$refs.target, (result) => {
        this.elementInfo_target = JSON.stringify(result);
      });
    },
      getElementInfo_mytest() {
      dom.getComponentRect(this.$refs.mytest, (result) => {
        this.elementInfo_mytest = JSON.stringify(result);
      });
    },
    getViewportInfo() {
      dom.getComponentRect("viewport", (result) => {
        this.viewportInfo = JSON.stringify(result);
      });
    },

    transition() {
      animation.transition(
        this.$refs.test,
        JSON.parse(this.animationValue),
        function () {
          modal.toast({ message: "animation finished" });
          // modal.toast({ message: result });
        }
      );
    },

    getString() {
      clipboard.getString((text) => {
        modal.alert(
          { message: "剪贴板内容为：" + text.data, okTitle: "关闭" },
          () => {
            console.log("剪贴板内容为：" + text.data);
          }
        );
      });
    },
    setString() {
      let value = this.setValue
      clipboard.setString(value),
      modal.alert({message:"向系统剪贴板设置："+value+"  成功"});
      },

    moveToElementList() {
      dom.scrollToElement(this.$refs.targeter, 
      JSON.parse(this.scrollToElementValue)
      );
    },
    moveToElementScroller() {
      dom.scrollToElement(this.$refs.scroller,
       JSON.parse(this.scrollToElementValue)
       );
    },

    toast() {
      modal.toast({
        message: "This is a toast",
        duration: 5,
      });
    },

    alert() {
      let tmp = this;
      modal.alert(
        {
          message: "This is a alert",
          okTitle: "确认",
        },
        function () {
          console.log("alert callback");
          tmp.alertCallBackInfo = "alert回调完成";
        }
      );
    },

    confirm() {
      let tmp = this;
      modal.confirm(
        {
          message: "确认？",
          duration: 0.3,
        },
        function (value) {
           modal.toast({message:"confirm callback:"+value})
          console.log("confirm callback", value);
          tmp.confirmCallBackInfo = value;
        }
      );
    },

    prompt() {
      let tmp = this;
      modal.prompt(
        {
          message: "请输入需要显示的值",
          duration: 0.3,
        },
        function (value) {
          modal.toast({message:"prompt callback:"+value})
          console.log("prompt callback", value);
          tmp.promptCallBackInfo = value;
        }
      );
    },

    setItem() {
      let tmp = this;
      let key = this.setItemKey;
      let value = this.setItemValue;

      storage.setItem(key, value, (res) => {
        console.log(
          "WANG weexPreferences setItem callback" + JSON.stringify(res)
        );
        tmp.setItemBackInfo = JSON.stringify(res);
      });
    },

    getItem() {
      let tmp = this;
      let key = this.setItemKey;
      storage.getItem(key, (res) => {
        modal.toast({message:JSON.stringify(res)})
        console.log(
          "WANG weexPreferences getItem callback" + JSON.stringify(res)
        );
        tmp.getItemBackInfo = JSON.stringify(res);
      });
    },

    removeItem() {
      let tmp = this;
      let key = this.setItemKey;
      storage.removeItem(key, (res) => {
        modal.toast({message:JSON.stringify(res)})
        console.log(
          "WANG weexPreferences weex_removeItem callback" + JSON.stringify(res)
        );
        tmp.removeItemBackInfo = JSON.stringify(res);
      });
    },

    length() {
      let tmp = this;
      storage.length((res) => {
        modal.toast({message:JSON.stringify(res)})
        console.log(
          "WANG weexPreferences length callback" + JSON.stringify(res)
        );
        tmp.lengthBackInfo = JSON.stringify(res);
      });
    },

    getAllKeys() {
      let tmp = this;
      storage.getAllKeys((res) => {
        modal.toast({message:JSON.stringify(res)})
        console.log(
          "WANG weexPreferences getAllKeys callback" + JSON.stringify(res)
        );
        tmp.getAllKeysBackInfo = JSON.stringify(res);
      });
    },

    enableFullScreenHeight() {
      let tmp = this;
      deviceInfo.enableFullScreenHeight((height) => {
        tmp.height = height.data;
      });
    },

    getItemForNotInvaild(){
      let key = "";
      storage.getItem(key, (res) => {
        modal.toast({message:JSON.stringify(res)})
        console.log(
          "WANG weexPreferences getItem callback" + JSON.stringify(res)
        );
      });
    },

      setInvaildItem() {
      let key = ''
      let value = null;
      storage.setItem(key, value, (res) => {
        modal.toast({message:"WANG weexPreferences setItem callback"+JSON.stringify(res)})
        console.log(
          "WANG weexPreferences setItem callback" + JSON.stringify(res)
        );
      });
    },
    animated() {
      animation.transition(this.$refs.element, JSON.parse(this.animationSpeedValue),
        function () {
          modal.toast({ message: "animation finished." });
        })
    }
  },
};
</script>

<style scoped>
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
.demo-scroll-to-element {
  width: 100%;
}
.list-item {
  height: 400px;
  width: 100%;
  background-color: #fcc;
}
.input {
  width: 300px;
  height: 100px;
  direction: rtl;
}
.container {
  height: 120px;
  width: 100%;
  position: relative;
}
.test-element {
  position: absolute;
  left: 0;
  top: 0;
  height: 100px;
  width: 100px;
  background-color: #fcc;
}
</style>