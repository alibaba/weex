---
title: <list>
type: references
order: 2.4
version: 0.10
---

# &lt;list&gt;

`<list>` 组件是提供垂直列表功能的核心组件，拥有平滑的滚动和高效的内存管理，非常适合用于长列表的展示。最简单的使用方法是在 `<list>` 标签内使用一组由简单数组 `repeat` 生成的 `<cell>` 标签填充。

一个最简例子：

```html
<template>
  <list class="list">
    <cell class="row" repeat="item in rows" index="{{$index}}">
      <text class="item-title">row {{item.id}}</text>
    </cell>
  </list>
</template>

<style></style>

<script>
module.exports = {
  data: {
    rows:[
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
      {id: 5}
    ]
  }
}
</script>
```

[体验一下](http://dotwe.org/bcaf48a63b49750b828d2d23762d4a15)

![mobile_preview](../images/list_2.jpg)

## 子组件

`<list>` 组件支持更多高级功能，由以下子组件提供：

- `<cell>`

  用于定义列表中的子列表项，类似于 HTML 中的 `ul` 之于 `li`。Weex 会对 `<cell>` 进行高效的内存回收以达到更好的性能。

  使用文档请查看 [`<cell>`](./cell.html)。

- `header` <sup class="wx-v">0.6.1+</sup>

  当 `<header>` 到达屏幕顶部时，吸附在屏幕顶部。

- `<refresh>`

  用于给列表添加下拉刷新的功能。

  使用文档请查看 [`<refresh>`](./refresh.html)

- `<loading>`

  `<loading>` 用法与特性和 `<refresh>` 类似，用于给列表添加上拉加载更多的功能。

  使用文档请查看 [`<loading>`](./loading.html)

**注意：**

`<list>` 的子组件只能包括以上四种组件或是 `fix` 定位的组件，其他形式的组件将不能被正确的渲染。

一个错误的示范，此例子无法在客户端正常渲染，因为 `<list>` 子组件是 `<div>`：

```html
<template>
  <list class="list">
    <div class="row" repeat="item in rows" index="{{$index}}">
      <text class="item-title">row {{item.id}}</text>
    </div>
  </list>
</template>

<style></style>

<script>
module.exports = {
  data: {
    rows:[
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
      {id: 5}
    ]
  }
}
</script>
```

## 特性

- `loadmoreoffset {number}`：默认值为 0，触发 `loadmore` 事件所需要的垂直偏移距离（设备屏幕底部与 `<list>` 底部之间的距离）。当 `<list>` 的滚动条滚动到足够接近 `<list>` 底部时将会触发 `loadmore` 这个事件。

  ![mobile_preview](../images/list_4.jpg)

## 样式

- 通用样式：支持所有通用样式

  - 盒模型
  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](../common-style.html)

## 事件

- `loadmore` <sup class="wx-v">0.5+</sup>：如果列表滚动到底部将会立即触发这个事件，你可以在这个事件的处理函数中加载下一页的列表项。

  [体验一下](http://dotwe.org/bc445ede8746a31360e3607d210304c5)

- 通用事件

  支持所有通用事件：

  - `click`
  - `longpress`
  - `appear`
  - `disappear`

  查看 [通用事件](../common-event.html)

## 扩展

### scrollToElement(node, options)

滚动到列表某个指定项是常见需求，`<list>` 拓展了该功能支持滚动到指定 `<cell>`。通过 `dom` module 访问，更多信息可参考 [dom module](../modules/dom.html) 。

#### 参数

- `node {node}`：指定目标节点。
- `options {Object}`：
  - `offset {number}`：一个到其可见位置的偏移距离，默认是 0

#### 示例

```html
<template>
  <list class="list">
    <cell>
      <div onclick="go" style="width: 750;height: 50; position: fixed; left: 0; right: 0; bottom: 0; background-color: #eeeeee;">
        <text style="text-align: center;">
          Go to 50th line.
        </text>
      </div>
    </cell>
    <cell class="row" repeat="item in rows" id="item-{{$index}}">
      <text class="item-title">row {{item.id}}</text>
    </cell>
  </list>
</template>

<script>
var dom = require('@weex-module/dom')

module.exports = {
  data: {
    rows: []
  },
  created: function () {
    for (var i = 0; i < 100; i++) {
      this.rows.push({
        id: i
      })
    }
  },
  methods: {
    go: function () {
      var el = this.$el('item-49')

      dom.scrollToElement(el, {
        offset: 0
      })
    }
  }
}
</script>
```

[体验一下](http://dotwe.org/65d91cb47d0e348c5750d2248d59b6bd)

## 约束

1. **不允许**相同方向的 `<list>` 或者 `<scroller>` 互相嵌套，换句话说就是嵌套的 `<list>`/`<scroller>` 必须是不同的方向。

  举个例子，**不允许**一个垂直方向的 `<list>` 嵌套的一个垂直方向的 `<scroller>` 中，但是一个垂直方向的 `<list>` 是可以嵌套的一个水平方向的 list 或者 `<scroller>` 中的。

2. `<list>` 为根节点时无需设置高度，但是内嵌 `<list>` 高度**必须可计算**，你可以使用 `flex` 或 `postion` 将 `<list>` 设为一个响应式高度（例如全屏显示）, 也可以显式设置 `<list>` 组件的 `height` 样式。

## 示例

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