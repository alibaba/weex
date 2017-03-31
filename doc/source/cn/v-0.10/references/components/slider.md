---
title: <slider>
type: references
order: 2.9
version: 0.10
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
      <div class="slider-pages" repeat="item in itemList">
        <image class="img" src="{{item.pictureUrl}}"></image>
        <text class="title">{{item.title}}</text>
      </div>
      <indicator class="indicator"></indicator>
    </slider>
  </div>
</template>

<style>
  .img {
    width: 714;
    height: 150;
  }
  .title {
    position: absolute;
    top: 20;
    left: 20;
    color: #ff0000;
    font-size: 48;
    font-weight: bold;
    background-color: #eeeeee;
  }
  .slider {
    flex-direction: row;
    margin: 18;
    width: 714;
    height: 230;
  }
  .slider-pages {
    flex-direction: row;
    width: 714;
    height: 200;
  }
  .indicator {
    width:714;
    height:200;
    position:absolute;
    top:1;
    left:1;
    item-color: red;
    item-selectedColor: blue;
    item-size: 20;
  }
</style>

<script>
  module.exports = {
    data: {
      itemList: [
        {itemId: '520421163634', title: 'item1', pictureUrl: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
        {itemId: '522076777462', title: 'item2', pictureUrl: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
        {itemId: '522076777462', title: 'iten3', pictureUrl: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'}
      ]
    }
  }
</script>
```

[体验一下](http://dotwe.org/37784d97811f4c91594a9ad6f118c0f7)
