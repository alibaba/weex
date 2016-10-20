# 样式和类属性
<span class="weex-version">0.4</span>

## 基础语法

CSS样式可以理解为一系列的键值对, 其中的每一对描述了一个特定的样式, 例如组件的宽或者高.

```
width: 400; height: 50; ...
```

键值对的形式是 `prop-name: prop-value`; `.`键名是`prop-name`, 键值是 `prop-value`. 一般情况下,键名按照连接符的方式进行命名, 键值可以是数字(默认的单位是`px`);键和值由`:`分隔,每对键值之间由`;`分隔.

在Weex页面上样式有两种形式:

* `<template>`中标签的`style`属性
* `<style>` 中样式表

### Style属性

在style属性中编写样式, 例如:

```
<template>
  <container style="width: 400; height: 50;">
    ...
  </container>
</template>
```

这段代码的意思是`<container>`组件的宽和高分别为400像素和50像素.

### `<style>` 标签

例如:

```
<style>
  .wrapper {width: 600;}
  .title {width: 400; height: 50;}
  .highlight {color: #ff0000;}
</style>
```

样式表包含了多个样式规则, 每条规则有一个对应的类, 以及由`{...}`包括的多条样式. 例如:
```
.title {width: 400; height: 50;}
```

以上为一条样式规则.

### Class 属性

`<style> `标签的选择器会去匹配` <template>` 标签中的`class`属性, 多个属性值之间由空格分隔. 例如:

```
<template>
  <container class="wrapper">
    <text class="title">...</text>
    <text class="title highlight">...</text>
  </container>
</template>
<style>
  .wrapper {width: 600;}
  .title {width: 400; height: 50;}
  .highlight {color: #ff0000;}
</style>
```

这段代码的含义是`container`组件的宽度是600px, 两个`title`文本的尺寸为`400px`高`50px`宽, 其中第二个文本是红色。


### 注意事项

* 为了简化页面设计和实现, 屏幕的宽度统一为750像素, 不同屏幕会按照比例转化为这一尺寸。
* 标准CSS支持很多样式选择器, 但Weex目前只支持单个类的选择器。
* 标准CSS支持很多的长度单位,Weex目前只支持像素,并且`px`在样式中可以忽略不写, 直接使用对应的数值.更多详情请查看  [通用样式](../references/common-style.md).
* 子元素的样式不会继承自父元素, 这一点与标准CSS不同, 比如`color`和`font-size`等属性.
* 标准CSS包含了非常多的样式属性, 但Weex只支持了其中的一部分, 包括盒模型,flexbox,position等布局属性. 以及`font-size`, `color`等样式.

## 与数据绑定结合

文档 [数据绑定](./data-binding.md) 有`style` 和 `class`属性相关的内容, 相关的内容可以查看该文档. 例如:

```
<template>
  <container>
    <text style="font-size: {{fontSize}};">Alibaba</text>
    <text class="large {{textClass}}">Weex Team</text>
  </container>
</template>
<style>
  .large {font-size: 32;}
  .highlight {color: #ff0000;}
</style>
<script>
  module.exports = {
    data: {
      fontSize: 32,
      textClass: 'highlight'
    }
  }
</script>
```

下一篇： [事件](./events.md).
