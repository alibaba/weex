<template>
  <div>
    <embed
      class="embed-element"
      :id="embedId"
      type="native/button"
    />
  </div>
</template>

<script>
const weexModule = weex.requireModule("weexModule");

export default {
  name: "HlButton",
  props: {
    text: {
      type: String,
      required: false,
    },
    loading: {
      type: Boolean,
      require: true
    },
    stateEffect: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      embedId: `button_${Math.floor(Math.random() * 100000)}_${Date.now()}`, // 生成embed元素的唯一ID
      isTransferScheduled: false, // 添加一个标志来检查是否已经安排了transferPropsAndListeners的调用
    };
  },
  created() {
    console.log("[web] hl-button created!");
    this.transferPropsAndListeners(); // 组件创建时调用
  },
  methods: {
    transferPropsAndListeners() {
      console.log("[web] transferPropsAndListeners ", this.onTap);
      // 构建一个包含所需信息的对象
      const args = {
        componentId: this.embedId,
        text: this.text,
        loading:this.loading,
        onTap: this.handleOnTap,
        stateEffect: this.stateEffect
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
    handleOnTap(res) {
      console.log("[web] handleOnTap ", res);
      this.$emit("onTap", res);
    },
  },
  watch: {
    text(newText, oldText) {
      if (newText !== oldText) {
        this.scheduleTransfer(); // 当text属性变化时重新调用
      }
    },
    loading(newText, oldText) {
      if (newText !== oldText) {
        this.scheduleTransfer(); // 当loading属性变化时重新调用
      }
    },
    stateEffect(newstateEffect, oldstateEffect) {
      if (newstateEffect!== oldstateEffect){
        this.scheduleTransfer(); // 当width属性变化时重新调用
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