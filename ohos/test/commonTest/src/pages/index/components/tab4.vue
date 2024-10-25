<template>
  <div class="tab5_wrapper">
    <scroller
      class="tab5_content"
      :style="{
        height: contentHeight + 'px',
      }"
    >
      <text class="font-title">(weex&h5)</text>
      <text class="btn" @click="openDialog">点击拉起鸿蒙模态框</text>
      
    </scroller>
  </div>
</template>
<script>
import { callNative, isWeex } from '@/utils/index.js'
import compMixin from '../../../mixin/compMixin';

export default {
  mixins: [compMixin],
  props: {
    contentHeight: {
      type: Number,
      default: 0,
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
    };
  },
  methods: {
    openDialog() {
      callNative('metaReceived', {}, (r)=>{});
    },
  },
};
</script>
<style scoped>
.br {
  border-width: 12px;
  border-color: red;
}
.tab5_wrapper {
  align-items: center;
  justify-content: center;
  width: 750px;
}

.tab5_content {
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
  line-height: 30px;
}
</style>
