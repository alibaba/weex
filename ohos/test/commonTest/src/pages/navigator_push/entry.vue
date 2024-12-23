<template>
  <div
      class="btn"
      @click="buttonClicked"
      @viewappear="onviewappear"
      @viewdisappear="onviewdisappear"
  >点击跳转</div>
</template>
<script>
const navigator = weex.requireModule('navigator')

export default {
  data() {
    return {}
  },
  methods: {
    buttonClicked() {
      navigator.push({
        url: 'resource://rawfile/hanglv/pages/navigator_pop/entry.html',
        animated: "true"
      }, () => {
        console.log('跳转成功')
      })
    },
    onviewappear(event) {

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