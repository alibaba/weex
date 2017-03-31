---
title: <a>
type: references
order: 2.1
version: 2.1
---

# &lt;a&gt;

`<a>` 组件定义了指向某个页面的一个超链接. 此组件的作用和用法与HTML5中的 [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) 非常类似，区别在于 Weex 的 `<a>` 组件**不能**直接在里面添加文本（字符串），如果要展示文本，应该添加 `<text>` 组件。

## 子组件

此组件支持除了自己外的所有 Weex 组件作为子组件。

## 特性

- `href {string}`：定义了超链接的 URL。

## 样式

`<a>` 支持所有通用样式。

- 盒模型
- `flexbox` 布局
- `position`
- `opacity`
- `background-color`

查看 [组件通用样式](../common-style.html)。

## 事件

`<a>` 支持所有通用事件。

- `click`
  **注意：**我们不能保证 `click` 事件和 `href` 跳转的执行顺序。建议不要使用 `click` 事件来处理 `href` 跳转前的逻辑处理。
- `longpress`
- `appear`
- `disappear`

查看 [通用事件](../common-event.html)。

## 约束

1. **不能**直接在 `<a>` 中添加文本。
  错误示例，“click” 无法被正常渲染。

  ```html
  <template>
    <div class="wrapper">
      <a href="http://dotwe.org/raw/dist/a468998152ee680413588c38bd61c29e.js">
        click
      </a>
    </div>
  </template>

  <style>
  .wrapper {
    text-align: center;
  }
  </style>
  ```

[体验一下](http://dotwe.org/0a22d65138691a208e3fb1f8f6392b38)

2. 请不要为 `<a>` 添加 `click` 事件。我们不能确保 `click` 事件和 `href` 跳转的执行顺序。

## 示例

```html
<template>
  <div class="wrapper">
    <a class="button" href="http://dotwe.org/raw/dist/3e0e40f9ddad79f98cd236753965ffd8.js">
      <text class="text">Jump</text>
    </a>
  </div>
</template>

<style scoped>
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .button {
    width: 450px;
    margin-top: 30px;
    margin-left: 150px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #F5F5F5
  }
  .text {
    font-size: 60px;
    color: #666666;
    text-align: center;
  }
</style>
```

[try it](../../../examples/a.html)
