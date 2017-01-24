---
title: <a>
type: references
order: 2.1
version: 0.10
---

# &lt;a&gt;

`<a>` 组件定义了指向某个页面的一个超链接. 此组件的作用和用法与HTML5中的 [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) 非常类似，区别在于 Weex 的 `<a>` 组件**不能**直接在里面添加文本（字符串），如果要展示文本，应该添加 `<text>` 组件。

一个简单例子：

```HTML
<template>
  <div class="wrapper">
    <a href="http://dotwe.org/raw/dist/a468998152ee680413588c38bd61c29e.js">
      <text>click</text>
    </a>
  </div>
</template>

<style>
.wrapper {
  text-align: center;
}
</style>
```

[体验一下](http://dotwe.org/f63c78213ef26c25357ffa851537fff3)

## 子组件

此组件支持除了自己外的所有 Weex 组件作为子组件。

## 特性

- `href {string}`：定义了超链接的 URL。

## 样式

`<a>` 支持所有通用样式。

- 盒模型
- `flexbox` 布局
- `position`
- `opacity`
- `background-color`

查看 [组件通用样式](../common-style.html)。

## 事件

`<a>` 支持所有通用事件。

- `click`
  **注意：**我们不能保证 `click` 事件和 `href` 跳转的执行顺序。建议不要使用 `click` 事件来处理 `href` 跳转前的逻辑处理。
- `longpress`
- `appear`
- `disappear`

查看 [通用事件](../common-event.html)。

## 约束

1. **不能**直接在 `<a>` 中添加文本。
  错误示例，“click” 无法被正常渲染。

  ```HTML
  <template>
    <div class="wrapper">
      <a href="http://dotwe.org/raw/dist/a468998152ee680413588c38bd61c29e.js">
        click
      </a>
    </div>
  </template>

  <style>
  .wrapper {
    text-align: center;
  }
  </style>
  ```

[体验一下](http://dotwe.org/0a22d65138691a208e3fb1f8f6392b38)

2. 请不要为 `<a>` 添加 `click` 事件。我们不能确保 `click` 事件和 `href` 跳转的执行顺序。

## 示例

```html
<template>
  <div>
    <list class="list">
      <header class="header">
        <text class="title">Search Results</text>
      </header>
      <refresh style="width: 750; padding: 30;" onrefresh="refreshData" display="{{refreshDisplay}}">
        <text class="text"> ↓ Pull to refresh </text>
        <loading-indicator class="indicator"></loading-indicator>
      </refresh>
      <cell class="row" repeat="item in items" id="item-{{$index}}">
        <div class="lines">
          <text class="item">Repo name: </text><a href="{{item.repo_url}}"><text class="link">{{item.full_name}}</text></a>
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
.lines {
  flex-direction: row;
}
.link {
  color: #008cff;
  text-decoration: underline;
}
</style>

<script>
var dom = require('@weex-module/dom') || {}
var stream = require('@weex-module/stream') || {}
var modal = require('@weex-module/modal') || {}

var SEARCH_URL = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc',
    PAGE_URL = 'http://dotwe.org/raw/dist/f1fa0895d0fa0fd80896e02a589443dd.js'

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
        try {
          var results = res.data.items || []
          
          if (Array.isArray(results)) {
            for(var i = 0; i < results.length; i++) {
              var repo_url = results[i].html_url
              if (repo_url) {
                results[i].repo_url = self.processUrl(repo_url)
              }
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
    },
    processUrl: function (url) {
      var platform = this.$getConfig().env.platform.toLowerCase()
      
      
      if (url) {
        // iOS do not need encode
        if (platform === 'ios') {
          return PAGE_URL + '?weburl=' + url
        } else if (platform === 'web') {
          return url
        } else {
          var encodeUrl = encodeURIComponent(url)
          return PAGE_URL + '?weburl=' + encodeUrl
        }
      }
    }
  }
}
</script>
```

[体验一下](http://dotwe.org/3e8369efb20a169077b5331b45927ed8)。
