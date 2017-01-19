---
title: <refresh>
type: references
order: 2.7
version: 0.10
---

# &lt;refresh&gt;

<span class="weex-version">v0.6.1+</span>

`<refresh>` 为 `<scroller>` 和 `<list>` 提供下拉加载功能。用法与特性与 `<loading>` 类似，`<scroller>` 和 `<list>` 的子组件，且只能在被 `<scroller>` 和 `<list>` 包含时才能被正确的渲染。

一个简单例子：

```html
<template>
  <list>
    <header>
      <div class="center">
        <text style="text-align:center">I am the header</text>
      </div>
    </header>
    <refresh onpullingdown='onpullingdown' onrefresh="onrefresh" display="{{refreshDisplay}}" style="width:750;flex-direction: row;justify-content: center;">
      <loading-indicator style="height:160;width:160;color:#3192e1"></loading-indicator>
    </refresh>
    <cell class="row" repeat="i in staffs" index="{{$index}}">
      <div class="item">
        <text>{{i.name}}</text>
      </div>
    </cell>
  </list>
</template>

<style>
  .row {
    width: 750;
  }
  .item {
    justify-content: center;
    border-bottom-width: 2;
    border-bottom-color: #c0c0c0;
    height: 100;
    padding:20;
  }
  .center {
    border-bottom-width: 2;
    border-bottom-color: #cccccc;
    height: 100;
    padding:20;
    background-color:#FFFFFF;
    justify-content: center;
  }
</style>

<script>
  module.exports = {
    data: {
      staffs:[],
      refreshDisplay: 'show',
      loadingDisplay: 'show',
      loadingText: 'pull up to load more',
      refreshText: 'pull down to refresh'
    },
    created:function() {
      this.refreshDisplay='show'
      this.staffs=[{name:'inns'},{name:'connon'},{name:'baos'},{name:'anna'},{name:'dolley'},{name:'lucy'},{name:'john'}, {name:'lily'},{name:'locke'},{name:'jack'},{name:'danny'},{name:'rose'},{name:'harris'},{name:'lotus'},{name:'louis'}];
    },
    methods:{
      onrefresh:function(e){
        this.refreshDisplay='show';
        this.staffs=[{name:'anna'},{name:'baos'},{name:'connon'},{name:'inns'}];
        this.refreshDisplay='hide'
      },
      onpullingdown:function(e){
        console.log('onpullingdown triggered.');
        console.log('dy:'+e.dy);
        console.log('headerHeight:'+e.headerHeight);
        console.log('maxHeight:'+e.maxHeight);
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/64cb982f67186c76f9f27fe3000a2fe8)

## 子组件

- [`<text>`](./text.html)
- [`<image>`](./image.html)
- `<loading-indicator>`: `<refresh>` 和 `<loading>` 组件的子组件，拥有默认的动画效果的实现。

## 特性

- `display {string}`：可选值为 `show` 或者 `hide`，仅隐藏 `<indicator>`，`<loading>` 其他子组件依然可见，`<loading>` 事件仍会被触发。

## 样式

支持所有通用样式。

- 盒模型
- `flexbox` 布局
- `position`
- `opacity`
- `background-color`

查看 [组件通用样式](../common-style.html)

## 事件

- `refresh`： 当 `<scroller>`/`<list>` 被下拉时触发。
- `pullingdown`：仅在 Android 支持。当 `<scroller>`/`<list>` 被下拉时触发，可以从事件的参数对象中获取 dy，headerHeight，maxHeight

## 约束

- `<refresh>` 不支持 `remove`，v0.9 版本会修复。
- `display` 值为 `show` 或 `hide`。仅隐藏 `<indicator>`，`<refresh>` 其他子组件依然可见，`refresh` 事件仍会被触发。

  如果需要 `<refresh>` hide 时隐藏文案并不再触发事件，有两种解决方法：

  1. 修改提示文案，并在 `refresh` 事件中添加判断逻辑；
  2. v0.9+ 可通过 `remove` 解决。

- 只能通过 `display` 特性进行展示和隐藏，且必须成对出现，即设置 `display="show"`,必须有对应的 `display="hide"`。

## 示例

```html
<template>
  <scroller onloadmore="onloadmore" loadmoreoffset="1000">
    <refresh onrefresh="onrefresh" display="{{refreshDisplay}}">
      <text id="refreshText">{{refreshText}}</text>
    </refresh>
    <div repeat="v in items">
      <text style="font-size: 40; color: #000000">{{v.item}}</text>
    </div>
    <loading onloading="onloading" display="{{loadingDisplay}}">
      <text id="loadingText">{{loadingText}}</text>
    </loading>
  </scroller>
</template>

<script>
  module.exports = {
    data: {
      refreshDisplay: 'show',
      loadingDisplay: 'show',
      loadingText: 'pull up to load more',
      refreshText: 'pull down to refresh',
      items: []
    },
    created: function () {
      for (var i = 0; i < 30; i++) {
        this.items.push({
          'item': 'test data' + i
        });
      }
    },
    methods: {
      onrefresh: function () {
        var vm = this;
        vm.refreshDisplay = 'show'
        if (vm.items.length > 50) {
          vm.refreshText = "no more data!"
          vm.refreshDisplay = 'hide'
          return;
        }
        var len = vm.items.length;
        for (var i = len; i < (len + 20); i++) {
          vm.items.unshift({
            'item': 'test data ' + i
          });
        }
        vm.refreshDisplay = 'hide'
      },
      onloading: function () {
        var vm = this;
        vm.loadingDisplay = 'show'
        if (vm.items.length > 30) {
          vm.loadingText = "no more data!"
          vm.loadingDisplay = 'hide'
          return;
        }

        var len = vm.items.length;
        for (var i = len; i < (len + 20); i++) {
          vm.items.push({
            'item': 'test data ' + i
          });
        }
        vm.loadingDisplay = 'hide'
      },
      onloadmore: function () {
        console.log("into--[onloadmore]")
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/80c027d6bfb337195c25cc0ba9317ea5)

更多示例可查看 [`<list>`](./list.html)
