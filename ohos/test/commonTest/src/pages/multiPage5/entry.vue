<template>
  <scroller class="scroller">
    <div class="wrapper">
      <text class="nav">multiPage5页面</text>
      <text class="btn" @click="jumpPage('singlePage4')">push(singlePage4)</text>
      <text class="btn" @click="broadcastPost()">广播发送</text>
      <text class="btn" @click="broadcastOnmessage()">广播监听</text>
      <text class="btn" @click="broadcastClose()">关闭广播</text>
    </div>
  </scroller>
</template>

<script>
import { pushPage } from "@/utils/index.js";
const testbc = new BroadcastChannel('testbc');
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
    broadcastPost() {
      testbc.postMessage('来自multiPage5的消息test message!');
    },
    broadcastOnmessage() {
      testbc.onmessage = (event)=>{
        console.log("multiPage5收到消息：" + JSON.stringify(event.data));
      }
    },
    broadcastClose() {
      testbc.close();
      modal.alert({message:'已关闭广播test', okTitle: '关闭'}, ()=>{})
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
  background-color: #cbf7ff;
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
</style>
