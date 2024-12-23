<style scoped>
.btn {
  width: 686px;
  height: 90px;
  border-radius: 100px;
  background-color: #41b24e;
  justify-content: center;
  align-items: center;
}
.btn_name {
  font-size: 34px;
  color: #ffffff;
}
.green {
  background-color: #41b24e;
  opacity: 1;
}
.gray {
  opacity: 1;
  background-color: #cccccc;
}
.weakGreen {
  opacity: 0.5;
}
</style>

<template>
  <div @click="todo" :class="['btn', typeMap[bgType]]">
    <text class="btn_name"><slot></slot></text>
  </div>
</template>

<script>
/**
 * ume-btn
 * @desc button
 * @param {number} [bgType=0] - 类型，接受 0，1，2，3，4，5，6
 */
export default {
  name: 'ume-btn',
  components: {},
  props: {
    bgType: {
      type: Number,
      // 0:  绿色,一级常态按钮；1: 白色，二级常态按钮；2: 白色，三级常态按钮；3: 灰色,不可点击状态；4: 不可点击较弱状态；5: 取消按钮；6: 确认按钮
      default: 0,
    },
  },
  data() {
    return {
      typeMap: [
        'green',
        'second',
        'third',
        'gray',
        'weakGreen',
        'smallCancel',
        'smallConfirm',
      ],
    };
  },
  methods: {
    todo() {
      this.$emit('onclick');
    },
  },
};
</script>
