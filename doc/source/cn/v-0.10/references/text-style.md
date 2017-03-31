---
title: 文本样式
type: references
order: 1.7
version: 0.10
---

# 文本样式

<span class="weex-version">v0.5+</span>

文本类组件共享一些通用样式, 这类组件目前包括 [`<text>`](./components/text.html) 和 [`<input>`](./components/input.html)。

## 属性

- `color {color}`：文字颜色。

  可选值为色值，支持 RGB（ `rgb(255, 0, 0)` ）；RGBA（ `rgba(255, 0, 0, 0.5)` ）；十六进制（ `#ff0000` ）；精简写法的十六进制（ `#f00` ）；色值关键字（`red`）。

- `lines {number}`: 指定文本行数。仅在 `<text>` 组件中支持。默认值是 `0` 代表不限制行数。

- `font-size {number}`：文字大小。

- `font-style {string}`：字体类别。可选值 `normal` | `italic`，默认为 `normal`。

- `font-weight {string}`：字体粗细程度。可选值 `normal` | `bold`，默认为 `normal`。

- `text-decoration {string}`：字体装饰，可选值 `none` | `underline` | `line-through`，默认值为 `none`。

- `text-align {string}`：对齐方式。可选值 `left` | `center` | `right`，默认值为 `left`。目前暂不支持 `justify`, `justify-all`。

- `font-family {string}`：设置字体。
  
  这个设置 **不保证** 在不同平台，设备间的一致性。如所选设置在平台上不可用，将会降级到平台默认字体。

- `text-overflow {string}`：设置内容超长时的省略样式。可选值 `clip` | `ellipsis`

## 其它参考

- [颜色关键字列表](./references/color-names.html)。
