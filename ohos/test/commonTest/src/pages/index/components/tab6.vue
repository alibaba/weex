<template>
  <div class="tab6_wrapper">
    <scroller
      class="tab6_content"
      :style="{
        height: contentHeight + 'px',
      }"
	  @scroll="testScroll"
    >
      <text class="font-title">测试用例</text>
      <div class="btn-group">
        <text class="font-title">navigator测试用例</text>
        <text class="btn" @click="jumpPage('singlePage1')">单web实例间跳转</text>
        <text class="btn" @click="jumpPage('multiPage1')">多web实例间跳转</text>
        <text class="btn" @click="jumpPage('multiPage3')">多单web实例间跳转</text>
        <text class="btn" @click="jumpPage('multiPage4')">混合页面间跳转</text>
        <text class="btn" @click="jumpPage('multiPage5')">web实例耗尽场景</text>
        <text class="btn" @click="jumpPage('specialPage')">特殊用例跳转</text>
        <text class="btn" @click="navigatorPop()">pop</text>
      </div>
      <div class="btn-group">
        <text class="font-title">globalEvent</text>
        <text class="btn" @click="addForeground()">监听前台事件</text>
        <text class="btn" @click="removeForeground()">取消监听前台事件</text>
        <text class="btn" @click="addBackground()">监听后台事件</text>
        <text class="btn" @click="removeBackground()">取消监听后台事件</text>
      </div>
      <div class="btn-group">
        <text class="font-title">broadcastChannel</text>
        <text class="btn" @click="broadcastPost()">广播发送</text>
        <text class="btn" @click="broadcastOnmessage()">广播监听</text>
        <text class="btn" @click="broadcastClose()">关闭广播</text>
      </div>
      <div class="btn-group">
        <text class="font-title">pushState</text>
        <text class="btn" @click="jumpPage('pushState', {text:'apple'})">pushState({text:apple})</text>
        <text class="btn" @click="jumpPage('pushState', {text:'banana'})">pushState({text:banana})</text>
      </div>
      <div class="btn-group">
        <text class="font-title">自定义拓展组件</text>
        <text class="btn" @click="jumpPage('sameLayerSample1')">基于Base组件的拓展组件</text>
        <text class="btn" @click="jumpPage('sameLayerSample2')">拓展组件</text>
      </div>
      <div class="btn-group">
        <text class="font-title">WebSockets测试</text>
        <br>
        <input placeholder="输入websocket的url" :value="wsValue" @change="wsChange" @keyboard="wsKeyboard" @blur="onBlur" @focus="onFocus"/>
        <br>
        <input placeholder="输入websocket的协议" :value="protocol" @change="wsProtocolChange"/>
        <br>
        <text class="btn" @click="createWebSocket()">创建webSocket</text>
        <br>
        <input placeholder="输入需要发送的消息" :value="messageValue" @change="wsMessageChange"/>
        <text class="btn" @click="sendData()">发送数据</text>
        <textarea rows="5"  v-model="closeValue"></textarea>
        <text class="btn" @click="closeWebSocket()">关闭webSocket</text>
      </div>
      <div class="btn-group">
        <text class="font-title">scroller测试页面</text>
        <text class="btn" @click="jumpPage('scrollerPage1')">导航栏由无渐变至深色</text>
        <text class="btn" @click="jumpPage('scrollerPage2')">导航栏渐变</text>
      </div>
      <div class="btn-group">
        <text class="btn" @click="jumpPage('list_pageEnable')">list组件pageEnable属性测试</text>
      </div>
      <div class="btn-group">
        <text class="btn" @click="jumpPage('eventForTouch')">weex 手势事件</text>
      </div>
      <div class="btn-group">
        <text class="btn" @click="jumpPage('pick')">weex pick模块</text>
      </div>
    </scroller>
    <!-- 写onCancel会触发点击遮罩层关闭；写:copy="true"会触发copy -->
    <modal
      :value="showModal"
      :copy="true"
      :content="content"
      :cancelText="cancelText"
      okText="确认"
      @onCancel="cancelModal"
      @onOk="closeModal"
    ></modal>
    <umeLoading :visible="showLoading"></umeLoading>
    <toast v-if="showToast" :content="content" @close="closeToast"></toast>
  </div>
</template>
<script>

import { pushPage } from '@/utils/index.js';
import compMixin from '../../../mixin/compMixin';
import { isWeex } from '@/utils/index.js'

const testbc = new BroadcastChannel('testbc');
const globalEvent = weex.requireModule('globalEvent');
const modal = weex.requireModule('modal');
const websocket = weex.requireModule('websocket');

export default {
  mixins: [compMixin],
  props: {
    isFullScreen: {
      type: Boolean,
    },
    toggleFullScreen: {
      type: Function,
      default: () => {},
    },
    contentHeight: {
      type: Number,
      default: 0,
    },
    topHeight: {
      type: Number,
      default: 20,
    },
    statusbarHeight: {
      type: Number,
      default: 20,
    },
    bottomHeight: {
      type: Number,
      default: 0,
    },
    fullHeight: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      isWeex,
      info: '',
      imgArray: [],
      customModal: 0,
      cancelText: '',
      sliderStatus: true, // 是否打开测滑
      wsValue: 'ws://192.168.82.205:8080/websocket/server',
      ws:null,
      protocol: 'custom-protocol',
      closeValue: JSON.stringify({
                    "code": 1000,
                     "reason": "主动关闭"
                   },null,"\t"),
      messageValue: '在吗'
    };
  },
  methods: {
	  testScroll: function(e) {
      console.log('test-------滑动')
    },
    callback(result) {
      this.showModal = true;
      if (result.data) {
        try {
          result.data = JSON.parse(result.data);
        } catch (e) {
          console.log('parse error');
        }
      }
      let result1 = result;
      try {
        result1 = JSON.parse(result);
      } catch (e) {
        result1 = result;
      }
      this.content = JSON.stringify(result1);
    },
    jumpPage(page, params = {}) {
      let newParams = params;
      pushPage(page, newParams);
    },
    addForeground() {
      globalEvent.addEventListener('WXApplicationDidBecomeActiveEvent', ()=>{
        console.log('Foreground callback successfully!');
        this.callback('前台唤醒事件回调成功');
        });
      this.callback('已添加监听');
    },
    removeForeground() {
      globalEvent.removeEventListener('WXApplicationDidBecomeActiveEvent');
      console.log('removeEventListener html callback');
      this.callback('已取消监听');
    },
    addBackground() {
      globalEvent.addEventListener('WXApplicationWillResignActiveEvent', ()=>{
        console.log('Background callback successfully!');
        this.callback('后台监听事件回调成功');
        });
      this.callback('已添加监听');
    },
    removeBackground() {
      globalEvent.removeEventListener('WXApplicationWillResignActiveEvent');
      console.log('removeEventListener html callback');
      this.callback('已取消监听');
    },
    broadcastPost() {
      testbc.postMessage({message:'来自tab6的消息test message!'});
    },
    broadcastOnmessage() {
      testbc.onmessage = (event)=>{
        console.log("tab6收到消息：" + JSON.stringify(event.data));
      }
    },
    broadcastClose() {
      testbc.close();
      modal.alert({message:'已关闭广播', okTitle: '关闭'}, ()=>{})
    },
    navigatorPop() {
      const navigator = weex.requireModule('navigator');
      navigator.pop({
       animated: "true"
      }, event => {
        console.log('callback: ', JSON.stringify(event))
      });
    },

    wsChange(event) {
      this.wsValue = event.value
      console.log('wsValue1:', this.wsValue)
    },
    wsProtocolChange(protocolEvent) {
      this.protocol = protocolEvent.value
      console.log('protocol:', this.protocol)
    },
    wsMessageChange(messageEvent){
      this.messageValue = messageEvent.value
      console.log('wsMessageChange:', this.messageValue)
    },
    wsKeyboard(event) {
      console.log('isShow:', event.isShow)
      console.log('keyboardSize:', event.keyboardSize)
    },
    onFocus(){
      console.log('input onFocus')
    },
    onBlur(){
      console.log('input onBlur')
    },
    createWebSocket() {
      // console.log('websocketServer:', this.wsValue)
      console.log('websocketServer url:', this.wsValue,'  protocol:',this.protocol)
      websocket.WebSocket(this.wsValue, this.protocol)

      websocket.onerror((event) => {
        console.log('onerror', event.data, event)
      })

      websocket.onclose((event) => {
        // console.log('onclose', event.reason, event.code, event.wasClean)
        console.log('onclose:', `Event:\n{\nreason:${event.reason}\ncode:${event.code}\nwasClean:${event.wasClean}\n}`)
      })

      websocket.onopen(function (event) {
        console.log('onopen', event)
      });

      websocket.onmessage(function (event) {
        console.log('onmessage', event.data)
      });

    },
    sendData() {
      // websocket.send('some message.');
      websocket.send(this.messageValue);
    },
    closeWebSocket() {
      console.log('closeWebSocket 参数:',this.closeValue);
      websocket.close(JSON.parse(this.closeValue));
      // websocket.close()
    }
  },
};
</script>
<style scoped>
.br {
  border-width: 12px;
  border-color: red;
}
.tab6_wrapper {
  align-items: center;
  justify-content: center;
  width: 750px;
}

.tab6_content {
  width: 750px;
  background-color: #ffffff;
  align-items: center;
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
</style>