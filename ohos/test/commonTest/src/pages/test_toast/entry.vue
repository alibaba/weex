<template>
   <scroll class="demo-test-prompt">
    <text class="btn" @click="prompt">Modal_prompt</text>
      <text>prompt回调: {{ promptCallBackInfo }}</text>
    </scroll> 
</template>
<script>
const modal = weex.requireModule("modal");
import { pushPage } from '@/utils/index.js';
export default {
    data() {
        return{
            promptCallBackInfo:"",
        }
    },

     mounted() {},
  methods: {
    jumpPage(page, params = {}) {
      let newParams = params;
      pushPage(page, newParams);
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
}
}
</script>
