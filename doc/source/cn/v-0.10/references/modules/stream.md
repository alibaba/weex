---
title: stream
type: references
order: 4.7
version: 0.10
---

# stream

## 概述

以下为 stream 相关的 API，用于实现网络请求。

## API
### `fetch(options, callback[,progressCallback])`

发起网络请求

#### 参数

- `options {Object}`：请求的一些选项
  - `method {string}`：HTTP 方法 `GET` 或是 `POST`
  - `url {string}`：请求的 URL
  - `headers {Object}`：HTTP 请求头
  - `type {string}`：请求类型, `json`,`text` 或是 `jsonp` {在原生实现中其实与 json 相同)
  - `body {string}`：HTTP 请求体。
    
    **注意：**
    
    - `body` 参数仅支持 `string` 类型的参数，请勿直接传递 `JSON`，必须先将其转为字符串。
    - `GET` 请求不支持 `body` 方式传递参数，请使用 url 传参。

- `callback {Function}`：响应结果回调，回调函数将收到如下的 `response` 对象：
  - `status {number}`：返回的状态码
  - `ok {boolean}`：如果状态码在 200~299 之间就为真。
  - `statusText {string}`：状态描述文本
  - `data {Object | string}`: 返回的数据，如果请求类型是 `json` 和 `jsonp`，则它就是一个 object ，如果不是，则它就是一个 string。
  - `headers {Object}`：响应头
- `progressCallback {Function}`：关于请求状态的回调。 这个回调函数将在请求完成后就被调用:
  - `readyState {number}`：当前状态 
    state:'1': 请求连接中
    opened:'2': 返回响应头中
    received:'3': 正在加载返回数据
  - `status {number}`：响应状态码.
  - `length {number}`：已经接受到的数据长度. 你可以从响应头中获取总长度
  - `statusText {string}`：状态文本
  - `headers {Object}`：响应头

#### 示例

```html
<template>
  <div class="wrapper">
    <list class="list">
      <header class="header">
        <text class="title">Search Results</text>
      </header>
      <refresh style="width: 750; padding: 30;" onrefresh="refreshData" display="{{refreshDisplay}}">
        <text class="text"> ↓ Pull to refresh </text>
        <loading-indicator class="indicator"></loading-indicator>
      </refresh>
      <cell class="row" repeat="item in items" id="item-{{$index}}">
        <div>
          <text class="item">Repo name: {{item.full_name}}</text>
        </div>
        <div>
          <text class="item">Repo star: {{item.stargazers_count}}</text>
        </div>
      </cell>
      <loading onloading="loadingData" style="width: 750; padding: 30;" display="{{loadingDisplay}}">
        <text class="text">{{loadingText}}</text>
      </loading>
    </list>
    <div class="up" onclick="goToTop">
      <img class="img" src="https://img.alicdn.com/tps/TB1ZVOEOpXXXXcQaXXXXXXXXXXX-200-200.png"></img>
    </div>
  </div>
</template>

<style>
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.list{
  background-color: #ffffff;
  flex: 1;
}
.header {
  height: 80;
  align-items: center;
  justify-content: center;
  background-color: #efefef;
  border-bottom-color: #eeeeee;
  border-bottom-width: 2;
  border-bottom-style: solid;
}
.title {
  text-align: center;
}
.text {
  text-align: center;
}
.row {
  padding: 20;
  border-bottom-color: #eeeeee;
  border-bottom-width: 2;
  border-bottom-style: solid;
}
.up {
  width: 70;
  height: 70;
  position: fixed;
  right: 20;
  bottom: 20;
}
.img {
  width: 70;
  height: 70;
}
</style>

<script>
var dom = require('@weex-module/dom') || {}
var stream = require('@weex-module/stream') || {}
var modal = require('@weex-module/modal') || {}

var SEARCH_URL = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc'

module.exports = {
  data: {
    isLoaded: true,
    page: 1,
    loadingDisplay: 'hide',
    refreshDisplay: 'hide',
    loadingText: 'Loading...',
    items:[]
  },
  created: function () {
    var url = SEARCH_URL + '&page=' + this.page

    this.renderData(url)
    
    this.page++
  },
  methods: {
    renderData: function (url) {
      var self = this

      stream.fetch({
        method: 'GET',
        url: url,
        type:'json'
      }, function(res) {
        self.refreshDisplay = 'hide'
        self.loadingDisplay = 'hide'

        try {
          var results = res.data.items || []
          
          if (Array.isArray(results)) {
            for(var i = 0; i < results.length; i++) {
              self.items.push(results[i])
            }
          }

          self.isLoaded = true
        } catch(e) {}
      },function(res){
          
      })
    },
    loadingData: function (e) {
      var url = SEARCH_URL + '&page=' + this.page
      var self = this
      
      if (self.isLoaded === false) return 
      
      self.loadingDisplay = 'show'
      
      if (self.page <=10 ) {
        self.renderData(url)
        self.page++
      } else {
        self.loadingDisplay = 'hide'
        self.loadingText = 'NO MORE!'
      }
    },
    goToTop: function (e) {
      dom.scrollToElement(this.$el('item-0'), {
        offset: -100
      })
    },
    refreshData: function (e) {
      var url = SEARCH_URL + '&page=1'

      if (this.isLoaded === false) return 
      
      this.refreshDisplay = 'show'

      modal.toast({
        'message': 'Refreshing...', 
        'duration': 1
      })

      this.items = []
      this.page = 1
      this.renderData(url)

      this.refreshDisplay = 'hide'
    }
  }
}
</script>
```

[体验一下](http://dotwe.org/ed524ade679b0fa96e980600c53ea5ce)