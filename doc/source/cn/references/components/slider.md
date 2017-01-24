---
title: <slider>
type: references
order: 2.11
version: 2.1
---

# &lt;slider&gt;

`<slider>` 组件用于在一个页面中展示多个图片，在前端，这种效果被称为 `轮播图`。

## 子组件

支持任意类型的 Weex 组件作为其子组件。 其中，还支持以下组件作为子组件展示特殊效果：

 - `<indicator>`：用于显示轮播图指示器效果，必须充当 [`<slider>`](./slider.html) 组件的子组件使用。

## 特性

- `auto-play {boolean}`：可选值为 `true`/`false`，默认的是 `false`。

  该值决定是否自动播放轮播。重置 `loadmore` 相关的 UI，值不一样就会重置。

- `interval {number}`：值为毫秒数，此值设定 slider 切换时间间隔。当 `auto-play` 值为 `true` 时生效。

## 样式

- 通用样式：支持所有通用样式

  - 盒模型
  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](../common-style.html)

## 事件

- `change`: 当轮播索引改变时，触发该事件。

  事件中 event 对象属性：
  - `index`：展示的图片索引

- 通用事件

  支持所有通用事件：

  - `click`
  - `longpress`
  - `appear`
  - `disappear`

  查看 [通用事件](../common-event.html)

## 示例

```html
<template>
  <div>
    <slider class="slider" interval="3000" auto-play="true">
      <div class="frame" v-for="img in imageList">
        <image class="image" resize="cover" :src="img.src"></image>
      </div>
    </slider>
  </div>
</template>

<style scoped>
  .image {
    width: 700px;
    height: 700px;
  }
  .slider {
    margin-top: 25px;
    margin-left: 25px;
    width: 700px;
    height: 700px;
    border-width: 2px;
    border-style: solid;
    border-color: #41B883;
  }
  .frame {
    width: 700px;
    height: 700px;
    position: relative;
  }
</style>

<script>
  export default {
    data () {
      return {
        imageList: [
          { src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
          { src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
          { src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'}
        ]
      }
    }
  }
</script>
```

[try it](../../../examples/slider.html)
