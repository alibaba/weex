<template>
    <div>
      <div @touchstart="touchstartParent">
        <h1>weex 手势事件：</h1>
        <div class="container" @stopPropagation="stopPropagation">
          <text class="titel">stopPropagation阻止冒泡，父组件事件不生效</text>
          <div class="btn" @touchstart="touchstart">touchstart</div>
          <div class="btn" @touchend="touchend">touchend</div>
          <div class="btn" @touchmove="touchmove">touchmove</div>
  
          <div class="btn" @panstart="panstart">panstart</div>
          <div class="btn" @panmove="panmove">panmove</div>
          <div class="btn" @panend="panend">panend</div>
          <div class="btn" @horizontalpan="horizontalpan">horizontalpan</div>
          <div class="btn" @verticalpan="verticalpan">verticalpan</div>
  
          <div class="btn" @swipe="swipe">swipe</div>
          <div class="btn" @longpress="longpress">longpress</div>
        </div>

        <div class="container">
          <text class="titel">无stopPropagation阻止冒泡，父组件事件生效</text>
          <div class="btn" @touchstart="touchstart">touchstart</div>
          <div class="btn" @touchend="touchend">touchend</div>
          <div class="btn" @touchmove="touchmove">touchmove</div>
  
          <div class="btn" @panstart="panstart">panstart</div>
          <div class="btn" @panmove="panmove">panmove</div>
          <div class="btn" @panend="panend">panend</div>
          <div class="btn" @horizontalpan="horizontalpan">horizontalpan</div>
          <div class="btn" @verticalpan="verticalpan">verticalpan</div>
  
          <div class="btn" @swipe="swipe">swipe</div>
          <div class="btn" @longpress="longpress">longpress</div>
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
    margin-top: 80px;
  }

  .titel {
    margin: 50px 20px;
  }
  </style>  