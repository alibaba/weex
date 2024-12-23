<template>
  <div>
    <embed
      class="embed-element"
      :id="embedId"
      type="native/slider"
    />
  </div>
</template>

<script>
const weexModule = weex.requireModule("weexModule");

export default {
  name: "HlSlider",
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      require: true
    },
    max:{
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      embedId: `slider_${Math.floor(Math.random() * 100000)}_${Date.now()}`, // 生成embed元素的唯一ID
      isTransferScheduled: false, // 添加一个标志来检查是否已经安排了transferPropsAndListeners的调用
    };
  },
  created() {
    console.log("[weex] hl-slider created!");
    this.transferPropsAndListeners(); // 组件创建时调用
  },
  methods: {
    transferPropsAndListeners() {
      console.log("[weex] transferPropsAndListeners ", this.onChange);
      // 构建一个包含所需信息的对象
      const args = {
        componentId: this.embedId,
        value: this.value,
        min:this.min,
        max:this.max,
        step:this.step,
        onChange: this.handleonChange,
      };
      // 调用JSbridge方法，传递属性和监听方法到原生组件
      native.transferSameLayerArgs(args);
    },
    scheduleTransfer() {
      if (!this.isTransferScheduled) {
        this.isTransferScheduled = true;
        this.$nextTick(() => {
          this.transferPropsAndListeners();
          this.isTransferScheduled = false;
        });
      }
    },
    handleonChange(res) {
      console.log("[weex] handleonChange ", res);
      this.$emit("onChange", res);
    },
  },
  watch: {
    value(oldValue, newValue) {
      if (newValue !== oldValue) {
        this.scheduleTransfer(); // 当value属性变化时重新调用
      }
    },
    min(newText, oldText) {
      if (newText !== oldText) {
        this.scheduleTransfer(); // 当min属性变化时重新调用
      }
    },
    max(newText, oldText) {
      if (newText !== oldText) {
        this.scheduleTransfer(); // 当max属性变化时重新调用
      }
    },
    step(newStep, oldStep) {
      if (newStep !== oldStep) {
        this.scheduleTransfer(); // 当step属性变化时重新调用
      }
    }

  },
};
</script>

<style scoped>
.embed-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>