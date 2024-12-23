<template>
  <div
      class="btn"
      @click="buttonClicked"
      @viewappear="onviewappear"
      @viewdisappear="onviewdisappear"
  >点击返回</div>
</template>
<script>
const navigator = weex.requireModule('navigator')

export default {
  data(){
    return {}
  },
  methods:{
    buttonClicked() {
      navigator.pop({
        animated: "false"
      }, () => {
        console.log('返回成功')
      })
    },
    onviewappear() {

    },
    onviewdisappear() {

    }
  }
}
</script>
<style scoped>
.btn {
  height: 100px;
  width: 300px;
  margin-bottom: 20px;
  margin: 0 auto;
  border: 1px solid green;
  border-radius: 5px;
}
</style>