---
title: <loading>
type: references
order: 2.6
version: 0.10
---

# &lt;loading&gt;

<span class="weex-version">v0.6.1+</span>

`<loading>` 为 `<scroller>` 和 `<list>` 提供上拉加载功能。用法与特性与 `<refresh>` 类似， 是 `<scroller>` 和 `<list>` 的子组件，且只能在被 `<scroller>` 和 `<list>` 包含时才能被正确的渲染。

## 子组件

- [`<text>`](./text.html)
- [`<image>`](./image.html)
- `<loading-indicator>`: `<refresh>` 和 `<loading>` 组件的子组件，拥有默认的动画效果的实现。

## 特性

- `display {string}`：可选值为 `show` 或者 `hide`，仅隐藏 `<indicator>`，`<loading>` 其他子组件依然可见，`loading` 事件仍会被触发。

## 样式

支持所有通用样式。

- 盒模型
- `flexbox` 布局
- `position`
- `opacity`
- `background-color`

查看 [组件通用样式](../common-style.html)

## 事件

- `loading`：加载时被触发。

## 约束

- `<loading>` 不支持 `remove`，v0.9 版本会修复。
- `display` 值为 `show` 或 `hide`。仅隐藏 `<indicator>`，`<loading>` 其他子组件依然可见，`loading` 事件仍会被触发。

  如果需要 `<loading>` hide 时隐藏文案并不再触发事件，有两种解决方法：

  1. 修改提示文案，并在 `loading` 事件中添加判断逻辑；
  2. v0.9+ 可通过 `remove` 解决。

- 只能通过 `display` 特性进行展示和隐藏，且必须成对出现，即设置 `display="show"`,必须有对应的 `display="hide"`。

## 示例

```html
<template>
  <list>
    <header>
      <div class="center">
        <text style="text-align:center">I am the header</text>
      </div>
    </header>
    <loading onloading="onloading" display="{{loadingDisplay}}" style="width:750;flex-direction: row;justify-content: center;">
      <loading-indicator style="height:160;width:160;color:#3192e1"></loading-indicator>
    </loading>
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
      loadingDisplay: 'show',
      loadingText: 'pull up to load more',
      refreshText: 'pull down to refresh'
    },
    created:function() {
      this.refreshDisplay='show'
      this.staffs=[{name:'inns'},{name:'connon'},{name:'baos'},{name:'anna'},{name:'dolley'},{name:'lucy'},{name:'john'}, {name:'lily'},{name:'locke'},{name:'jack'},{name:'danny'},{name:'rose'},{name:'harris'},{name:'lotus'},{name:'louis'}];
    },
    methods:{
      onloading:function(e){
        console.log('onloading...');
        this.staffs.push({name:'onloading'})
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/6adf7add849f3c9fcdbc776a6c471f02)

更多示例可查看 [`<list>`](./list.html)
