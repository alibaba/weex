---
title: <indicator>
type: references
order: 2.11
version: 2.1
---

# &lt;indicator&gt;

`<indicator>` 组件用于显示轮播图指示器效果，必须充当 [`<slider>`](./slider.html) 组件的子组件使用。

## 子组件

`<indicator>` 组件没有任何子组件。

## 样式

`<indicator>` 组件有一些私有样式，如下：

- `item-color {color}`：设置项的颜色，可以是颜色的名称，例如 `red`；也可以是 16 进制的颜色，例如 `#RRGGBB`。

- `item-selected-color {color}`：被选中时的颜色，可以是颜色的名称，`red`；也可以是 16 进制的颜色，例如 `#RRGGBB`。

- `item-size {number}`：元素的个数。

- 通用样式
  - 盒模型
  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](../common-style.html)

**注意 1：**

这里需要注意一点，`<indicator>` 的 `position` 不仅依赖 `top`、`left`、`bottom` 和 `right` 样式，同时会参考 `width`和 `height` 样式。`<indicator>` 默认的宽高继承于 `<slider>`，如果 `<slider>` 未设置宽高，需要显式的给 `<indicator>` 设置宽高值。

**注意 2：**

`background-color` 不推荐使用，建议使用 `item-color` 和 `item-selected-color` 代替。


## 事件

支持所有通用事件。

- `click`
- `longpress`
- `appear`
- `disappear`

查看 [通用事件](../common-event.html)

## 约束

1. 不支持子组件。

## 示例

```html
<template>
  <div>
    <slider class="slider" interval="4500" @change="onchange">
      <div class="frame" v-for="img in imageList">
        <image class="image" resize="cover" :src="img.src"></image>
        <text class="title">{{img.title}}</text>
      </div>
      <indicator class="indicator"></indicator>
    </slider>
  </div>
</template>

<style>
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
  .title {
    position: absolute;
    top: 20px;
    left: 20px;
    padding-left: 20px;
    width: 200px;
    color: #FFFFFF;
    font-size: 36px;
    line-height: 60px;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .frame {
    width: 700px;
    height: 700px;
    position: relative;
  }
  .indicator {
    width: 700px;
    height: 700px;
    item-color: green;
    item-selected-color: red;
    item-size: 50px;
    top: 200px;
    left: 200px;
  }
</style>

<script>
  export default {
    data () {
      return {
        imageList: [
          { title: 'item A', src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
          { title: 'item B', src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
          { title: 'item C', src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'}
        ]
      }
    },
    methods: {
      onchange (event) {
        console.log('changed:', event.index)
      }
    }
  }
</script>
```

[try it](../../../examples/indicator.html)
