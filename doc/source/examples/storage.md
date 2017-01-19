---
title: storage
type: example
layout: example
web_bundle_url: ../js/examples/storage.web.js
---

```html
<template>
  <div class="list">
    <div class="group center">
      <div class="panel"><text class="text">{{state}}</text></div>
    </div>
    <div class="group">
      <div class="panel"><text class="text" @click="setItem">set</text></div>
      <div class="panel"><text class="text" @click="getItem">get</text></div>
      <div class="panel"><text class="text" @click="removeItem">remove</text></div>
      <div class="panel"><text class="text" @click="getAll">all</text></div>
    </div>
  </div>
</template>

<script>
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')

  export default {
    data () {
      return {
        keys: '[]',
        length: 0,
        state: '----'
      }
    },
    methods: {
      setItem () {
        storage.setItem('name', 'Hanks', event => {
          this.state = 'set success'
          console.log('set success')
        })
      },
      getItem () {
        storage.getItem('name', event => {
          console.log('get value:', event.data)
          this.state = 'value: ' + event.data
        })
      },
      removeItem () {
        storage.removeItem('name', event => {
          console.log('delete value:', event.data)
          this.state = 'deleted'
        })
      },
      getAll () {
        storage.getAllKeys(event => {
          // modal.toast({ message: event.result })
          if (event.result === 'success') {
            modal.toast({
              message: 'props: ' + event.data.join(', ')
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .panel {
    height: 100px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
  .group {
    flex-direction: row;
    justify-content: space-between;
    width: 650px;
    margin-left: 50px;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .center {
    justify-content: center;
  }
  .text {
    font-size: 50px;
    text-align: center;
    padding-left: 25px;
    padding-right: 25px;
    color: #41B883;
  }
  .small {
    font-size: 32px;
    padding-left: 35px;
    padding-right: 35px;
    color: #41B883;
  }
</style>
```