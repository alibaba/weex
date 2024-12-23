<style scoped>
.ume-mask {
  position: absolute;
  width: 750px;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  bottom: 0;
  left: 0;
  /* right: 0; */
  z-index: 200;
  align-items: center;
  justify-content: center;
}
.ume-modal-wrapper {
  width: 560px;
  background-color: #ffffff;
  border-radius: 6px;
  z-index: 250;
}
.modal-close {
  position: absolute;
  width: 90px;
  height: 70px;
  line-height: 55px;
  text-align: center;
  top: 0;
  right: 0;
  font-size: 50px;
  color: #999999;
}
.modal-body {
  padding: 48px;
}
.modal-content-primary {
  font-size: 36px;
  color: #333333;
  line-height: 58px;
  text-align: center;
}
.modal-content-second {
  font-size: 30px;
  color: #666666;
  text-align: center;
}
.modal-title {
  padding-bottom: 24px;
  align-items: center;
}
.modal-title-name {
  font-size: 36px;
  line-height: 58px;
  color: #333333;
}
.modal-btnWrapper {
  flex-direction: row;
  justify-content: space-around;
  border-top-width: 1px;
  border-top-color: #eeeeee;
  border-top-style: solid;
  overflow: hidden;
}
.modal-btn-name {
  line-height: 99px;
  text-align: center;
  color: #41b24e;
  font-size: 34px;
  width: 280px;
  flex: 1;
}
.modal-btn-no-name {
  color: #666666;
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: #eeeeee;
}
</style>

<template>
  <div v-if="visible" class="ume-mask" :style="modalStyle" @click="toCancel">
    <div class="ume-modal-wrapper" @click="nothing">
      <div class="modal-body" @click="toCopy">
        <slot name="title"
          ><div v-if="title.length > 0" class="modal-title">
            <text class="modal-title-name">{{ title }}</text>
          </div></slot
        >
        <slot name="content"
          ><div class="modal-content-item">
            <text
              :class="[
                title.length > 0
                  ? 'modal-content-second'
                  : 'modal-content-primary',
              ]"
              >{{ content }}</text
            >
          </div></slot
        >
      </div>
      <slot name="footer">
        <div class="modal-btnWrapper">
          <text
            v-if="cancelText.length > 0"
            @click="toCancel"
            class="modal-btn-name modal-btn-no-name"
            >{{ cancelText }}</text
          >
          <text @click="toOk" class="modal-btn-name">{{ okText }}</text>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
/**
 * ume-modal
 * @desc modal
 * @param { boolean } [value=false] - 对话框是否显示
 * @param { string } [title=''] - 对话框标题，如果使用slot自定义页头，则title无效
 * @param { string } [cancelText=''] - 取消按钮文字
 * @param { okText } [okText='确定'] - 确定按钮文字
 * @param { content } [content=''] - 对话框内容，如果使用slot自定义内容，则content无效
 */
export default {
  name: 'ume-modal',
  components: {},
  props: {
    modalStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    value: {
      type: Boolean,
      default: false,
    },
    copy: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '',
    },
    okText: {
      type: String,
      default: '确定',
    },
    content: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visible: this.value,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  created() {},
  methods: {
    toCancel() {
      this.$emit('onCancel');
    },
    toOk() {
      this.$emit('onOk');
    },
    toCopy() {
      // this.$emit('onCopy');
      weex.requireModule('clipboard').setString(this.content);
      weex.requireModule('modal').toast({ message: 'copy' });
    },
    // 避免点击穿透
    nothing() {},
  },
};
</script>
