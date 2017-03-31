---
title: <cell>
type: references
order: 2.5
version: 0.10
---

# &lt;cell&gt;

用于定义列表中的子列表项，类似于 HTML 中的 `ul` 之于 `li`。Weex 会对 `<cell>` 进行高效的内存回收以达到更好的性能，该组件必须作为[`<list>`](./list.html) 组件的子组件, 这是为了优化滚动时的性能。

## 子组件

支持所有 Weex 的组件作为它的子组件。

## 样式

**注意：**

你不能给 `<cell>` 设定`flex`值。 `<cell>`的宽度等于父组件 `<list>` 的宽度，并且 `<cell>` 高度自适应。

- 通用样式：支持所有通用样式

  - 盒模型
  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](../common-style.html)

## 事件

- 通用事件

  支持所有通用事件：

  - `click`
  - `longpress`
  - `appear`
  - `disappear`

  查看 [通用事件](../common-event.html)

## 示例

![mobile_preview](../images/list_3.jpg)

```html
<template>
  <div>
    <list class="list">
      <header class="header">
        <text class="title">Search Results</text>
      </header>
      <refresh style="width: 750; padding: 30;" onrefresh="refreshData">
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
.header {
  padding: 25;
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
.list {
  background-color: #ffffff;
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
    page: 1,
    loadingDisplay: 'show',
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
        try {
          var results = res.data.items || []

          if (Array.isArray(results)) {
            for(var i = 0; i < results.length; i++) {
              self.items.push(results[i])
            }
          }
        } catch(e) {}
      },function(res){

      })
    },
    loadingData: function (e) {
      var url = SEARCH_URL + '&page=' + this.page
      var self = this

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

      modal.toast({
        'message': 'Refreshing...',
        'duration': 1
      })

      this.items = []
      this.page = 1
      this.renderData(url)
    }
  }
}
</script>
```

[体验一下](http://dotwe.org/280fa3dc8e793ea8712451ecdf84fb7b)