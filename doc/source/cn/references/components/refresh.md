---
title: <refresh>
type: references
order: 2.8
version: 2.1
---

# &lt;refresh&gt;

<span class="weex-version">v0.6.1+</span>

`<refresh>` 为 `<scroller>` 和 `<list>` 提供下拉加载功能。用法与特性与 `<loading>` 类似，`<scroller>` 和 `<list>` 的子组件，且只能在被 `<scroller>` 和 `<list>` 包含时才能被正确的渲染。

## 子组件

- [`<text>`](./text.html)
- [`<image>`](./image.html)
- `<loading-indicator>`: `<refresh>` 和 `<loading>` 组件的子组件，拥有默认的动画效果的实现。

## 特性

- `display {string}`：可选值为 `show` 或者 `hide`，仅隐藏 `<indicator>`，`<refresh>` 其他子组件依然可见，`<refresh>` 事件仍会被触发。

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
  <scroller class="scroller">
    <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
      <text class="indicator">Refreshing ...</text>
    </refresh>
    <div class="cell" v-for="num in lists">
      <div class="panel">
        <text class="text">{{num}}</text>
      </div>
    </div>
  </scroller>
</template>

<script>
  const modal = weex.requireModule('modal')

  export default {
    data () {
      return {
        refreshing: false,
        lists: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      onrefresh (event) {
        console.log('is refreshing')
        modal.toast({ message: 'refresh', duration: 1 })
        this.refreshing = true
        setTimeout(() => {
          this.refreshing = false
        }, 2000)
      },
      onpullingdown (event) {
        console.log('is onpulling down')
        modal.toast({ message: 'pulling down', duration: 1 })
      }
    }
  }
</script>

<style scoped>
  .indicator {
    color: #888888;
    font-size: 42px;
    text-align: center;
  }
  .panel {
    width: 600px;
    height: 250px;
    margin-left: 75px;
    margin-top: 35px;
    margin-bottom: 35px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #F5F5F5;
  }
  .text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
  }
</style>
```

[try it](../../../examples/refresh.html)

更多示例可查看 [`<list>`](./list.html)
