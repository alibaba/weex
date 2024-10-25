<template>
  <scroller class="scroller">
    <div class="wrapper">
      <text class="nav">singlePage4页面</text>
      <div class="btn-group">
        <text class="font-title">navigator</text>
        <text class="btn" @click="jumpPage('singlePage5')">push(singlePage5)</text>
        <text class="btn" @click="navigatorPop()">pop</text>
      </div>
    </div>
  </scroller>
</template>

<script>
import { pushPage } from "@/utils/index.js";

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
