<template>
  <div>
    <embed
      class="embed-element"
      :id="embedId"
      type="native/textarea"
    />
  </div>
</template>

<script>
const weexModule = weex.requireModule("weexModule");

export default {
  name: "HlTextareaTest",
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      embedId: `textarea_${Math.floor(Math.random() * 100000)}_${Date.now()}`, // 生成embed元素的唯一ID
      isTransferScheduled: false, // 添加一个标志来检查是否已经安排了transferPropsAndListeners的调用
    };
  },
  created() {
    console.log("[weex] hl-textarea created!");
    this.transferPropsAndListeners(); // 组件创建时调用
  },
  methods: {
    transferPropsAndListeners() {
      // 构建一个包含所需信息的对象
      const args = {
        componentId: this.embedId,
        placeholder: this.placeholder,
        backgroundColor: this.backgroundColor,
        onChange: this.handleonInput,
      };
      // 调用JSbridge方法，传递属性和监听方法到原生组件
      weexModule.callNative("transferSameLayerArgs", args);
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
    handleonInput(res) {
      console.log("[weex] handleonInput ", res);
      this.$emit("nativeOnInput", res);
    }
  },
  watch: {
    text(newText, oldText) {
      if (newText !== oldText) {
        this.scheduleTransfer(); // 当text属性变化时重新调用
      }
    },
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