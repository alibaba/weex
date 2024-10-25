<template>
  <div>
    <div @touchstart="touchstartParent">
      <h1>weex 手势事件：</h1>
      <div @stopPropagation="stopPropagation">
        <div class="btn" @touchstart="touchstart">touchstart</div>
        <div class="btn" @touchstart="touchstart(item)" v-for="item in info" :item="JSON.stringify(item)" :key="item">
          touchstart</div>
        <div class="btn" @touchend="touchend" v-for="(item, index) in items" :keyItem="index" :key="item">touchend</div>
        <div class="btn" @touchmove="touchmove" v-for="item in items" :key="item">touchmove</div>

        <div class="btn" @panstart="panstart" v-for="item in items" :key="item">panstart</div>
        <div class="btn" @panmove="panmove" v-for="item in items" :key="item">panmove</div>
        <div class="btn" @panend="panend" v-for="item in items" :key="item">panend</div>
        <div class="btn" @horizontalpan="horizontalpan" v-for="item in items" :key="item">horizontalpan</div>
        <div class="btn" @verticalpan="verticalpan" v-for="item in items" :key="item">verticalpan</div>

        <div class="btn" @swipe="swipe" v-for="item in items" :key="item">swipe</div>
        <div class="btn" @longpress="longpress" v-for="item in items" :key="item">longpress</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: 'hunly',
      items: [1, 2, 3],
      info: [{ name: 'hunly' }, { name: 'hunly' }, { name: 'hunly' }]
    }
  },
  methods: {
    touchstartParent(event) {
      console.log('touchstartParent', event)
    },
    touchstart(item) {
      console.log('touchstart', item)
    },
    touchend(event) {
      console.log('touchend', event)
    },
    touchmove(event) {
      console.log('touchmove', event)
    },
    panstart(event) {
      console.log('panstart', event)
    },
    panmove(event) {
      console.log('panmove', event)
    },
    panend(event) {
      console.log('panend', event)
    },
    horizontalpan(event) {
      console.log('horizontalpan', event)
    },
    verticalpan(event) {
      console.log('verticalpan', event)
    },
    swipe(event) {
      console.log('swipe.event', event)
    },
    longpress(event) {
      console.log('longpress: ', event)
    },
    stopPropagation() {
      return true
    }
  }
}
</script>
<style scoped>
.btn {
  height: 300px;
  width: 400px;
  border: 1px solid green;
  border-radius: 5px;
}

.container {
  height: 100%;
  width: 100%;
  background-color: #fcc;
}
</style>  