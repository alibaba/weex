<template>
  <div class="scroller">
    <text class="nav">pushState页面</text>
    <text >{{ message }}</text>
  </div>
</template>

<script>
import { initPushStateEvent } from "@/utils/index.js";

export default {
  data() {
    return {
      message: ''
    }
  }, 
  created() {
    initPushStateEvent();
    window.addEventListener('pushState',(e) => {
      console.log("addEventListener pushState params = ", JSON.stringify(e));   // {"isTrusted":false,"arguments":{"0":{},"1":"","2":"?text=apple"}}
      this.message = e.arguments['2'];
    })
  },
  beforeDestroy() {
    window.removeEventListener('pushState', (e)=>{
      console.log("removeEventListener pushState params = ", JSON.stringify(e));
    })
  },
}
</script>

<style lang="less" scoped>

.nav {
  color: rgb(255, 60, 0);
  font-size: 40px;
}
.scroller {
  position: absolute;
  top: 0px;
  bottom: 0px;
  padding: 100px;
  background-color: #ffffd2;
}
</style>
