---
title: 通用事件
type: references
order: 5
version: 2.1
has_chapter_content: true
---

# 通用事件

Weex 提供了通过事件触发动作的能力，例如在用户点击组件时执行 JavaScript。下面列出了可被添加到 Weex 组件上以定义事件动作的属性：

## `click`

当组件上发生点击手势时被触发。

**注意：**

`<input>` 和 `<switch>` 组件目前不支持 `click` 事件，请使用 `change` 或 `input` 事件来代替。

### 事件对象

- `type`: `click`
- `target`: 触发点击事件的目标组件
- `timestamp`: 触发点击事件时的时间戳


## `longpress`

如果一个组件被绑定了 `longpress` 事件，那么当用户长按这个组件时，该事件将会被触发。

**注意：**

`<input>` 和 `<switch>` 组件目前不支持 `click` 事件，请使用 `change` 或 `input` 事件来代替。

### 事件对象
- `type` : `longpress`
- `target` : 触发长按事件的目标组件
- `timestamp` : 长按事件触发时的时间戳

## Appear 事件

如果一个位于某个可滚动区域内的组件被绑定了 `appear` 事件，那么当这个组件的状态变为在屏幕上可见时，该事件将被触发。

### 事件对象

- `type` : `appear`
- `target` : 触发 Appear 事件的组件对象
- `timestamp` : 事件被触发时的时间戳
- `direction` : 触发事件时屏幕的滚动方向，`up` 或 `down`

## Disappear 事件

如果一个位于某个可滚动区域内的组件被绑定了 `disappear` 事件，那么当这个组件被滑出屏幕变为不可见状态时，该事件将被触发。

### 事件对象

- `type` : `disappear`
- `target` : 触发 Disappear 事件的组件对象
- `timestamp` : 事件被触发时的时间戳
- `direction` : 触发事件时屏幕的滚动方向，`up` 或 `down`

## Page 事件

*注意：仅支持 iOS 和 Android，H5 暂不支持。*

Weex 通过 `viewappear` 和 `viewdisappear` 事件提供了简单的页面状态管理能力。

`viewappear` 事件会在页面就要显示或配置的任何页面动画被执行前触发，例如，当调用 `navigator` 模块的 `push` 方法时，该事件将会在打开新页面时被触发。`viewdisappear` 事件会在页面就要关闭时被触发。

与组件的 `appear` 和 `disappear` 事件不同的是，`viewappear` 和 `viewdisappear` 事件关注的是整个页面的状态，所以**它们必须绑定到页面的根元素上**。

特殊情况下，这两个事件也能被绑定到非根元素的body组件上，例如`wxc-navpage`组件。

### 事件对象

- `type` : `viewappear` 或 `viewdisappear`
- `target` : 触发事件的组件对象
- `timestamp` : 事件被触发时的时间戳

## 示例

```html
<template>
  <div>
    <div class="box" @click="onclick" @longpress="onlongpress" @appear="onappear"  @disappear="ondisappear"></div>
  </div>
</template>

<script>
  const modal = weex.requireModule('modal')
  export default {
    methods: {
      onclick (event) {
        console.log('onclick:', event)
        modal.toast({
          message: 'onclick',
          duration: 0.8
        })
      },
      onlongpress (event) {
        console.log('onlongpress:', event)
        modal.toast({
          message: 'onlongpress',
          duration: 0.8
        })
      },
      onappear (event) {
        console.log('onappear:', event)
        modal.toast({
          message: 'onappear',
          duration: 0.8
        })
      },
      ondisappear (event) {
        console.log('ondisappear:', event)
        modal.toast({
          message: 'ondisappear',
          duration: 0.8
        })
      }
    }
  }
</script>

<style scoped>
  .box {
    border-width: 2px;
    border-style: solid;
    border-color: #BBB;
    width: 250px;
    height: 250px;
    margin-top: 250px;
    margin-left: 250px;
    background-color: #EEE;
  }
</style>
```
