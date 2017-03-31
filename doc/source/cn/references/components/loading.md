---
title: <loading>
type: references
order: 2.7
version: 2.1
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
  <scroller class="scroller">
    <div class="cell" v-for="num in lists">
      <div class="panel">
        <text class="text">{{num}}</text>
      </div>
    </div>
    <loading class="loading" @loading="onloading" :display="showLoading">
      <text class="indicator">Loading ...</text>
    </loading>
  </scroller>
</template>

<script>
  const modal = weex.requireModule('modal')
  const LOADMORE_COUNT = 4

  export default {
    data () {
      return {
        showLoading: 'hide',
        lists: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      onloading (event) {
        modal.toast({ message: 'loading', duration: 1 })
        this.showLoading = 'show'
        setTimeout(() => {
          const length = this.lists.length
          for (let i = length; i < length + LOADMORE_COUNT; ++i) {
            this.lists.push(i + 1)
          }
          this.showLoading = 'hide'
        }, 1500)
      }
    }
  }
</script>

<style scoped>
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
  .loading {
    justify-content: center;
  }
  .indicator {
    color: #888888;
    font-size: 42px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
  }
</style>
```
