<template>
  <scroller class="scroller">
    <div class="wrapper">
      <text class="nav">singlePage3页面</text>
      <div class="btn-group">
        <text class="font-title">navigator</text>
        <text class="btn" @click="jumpPage('multiPage15')">push(multiPage15)</text>
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
        <text class="font-title">输入框</text>
        <input>
      </div>
    </div>
  </scroller>
</template>

<script>
import { pushPage } from "@/utils/index.js";
const testbc = new BroadcastChannel('testbc');
const globalEvent = weex.requireModule('globalEvent');
const modal = weex.requireModule('modal');

export default {
  components: {},
  data() {},
  methods: {
    jumpPage(page, params = {}) {
      let newParams = params;
      pushPage(page, newParams);
    },
    navigatorPop() {
      const navigator = weex.requireModule('navigator');
      navigator.pop({
       animated: "true"
      }, event => {
        console.log('callback: ', JSON.stringify(event))
      });
    },
    addForeground() {
      globalEvent.addEventListener('WXApplicationDidBecomeActiveEvent', (res)=>{
        console.log('Foreground callback successfully!');
        modal.toast({message:'前台唤醒事件回调成功', duration:0.5})
      });
      modal.toast({message:'已添加前台监听', duration:0.5})
    },
    removeForeground() {
      globalEvent.removeEventListener('WXApplicationDidBecomeActiveEvent');
      console.log('removeEventListener html callback');
      modal.toast({message:'已取消监听', duration:0.5})
    },
    addBackground() {
      globalEvent.addEventListener('WXApplicationWillResignActiveEvent', (res)=>{
        console.log('Background callback successfully!');
        modal.toast({message:'后台监听事件回调成功', duration:0.5})
      });
      modal.toast({message:'已添加后台监听', duration:0.5})
    },
    removeBackground() {
      globalEvent.removeEventListener('WXApplicationWillResignActiveEvent');
      console.log('removeEventListener html callback');
      modal.toast({message:'已取消监听', duration:0.5})
    },
    broadcastPost() {
      testbc.postMessage('来自singlePage3的消息test message!');
    },
    broadcastOnmessage() {
      testbc.onmessage = (event)=>{
        console.log("singlePage3收到消息：" + JSON.stringify(event.data));
      }
    },
    broadcastClose() {
      testbc.close();
      modal.toast({message:'已关闭广播', duration:0.5})
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  justify-content: center;
  // padding: 40px;
}
.nav {
  color: rgb(255, 60, 0);
  font-size: 40px;
}
.scroller {
  position: absolute;
  // left: 50px;
  // right: 50px;
  top: 0px;
  bottom: 0px;
  padding: 100px;
  background-color: #ffffd2;
  // width: 650px;
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
  line-height: 30px;
}
</style>
