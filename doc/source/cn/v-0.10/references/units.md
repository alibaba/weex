---
title: CSS 单位
type: references
order: 1.9
version: 0.10
---

# CSS 单位

## CSS `color` 单位

支持以下写法：

```css
.classA {
  /* 3-chars hex */
  color: #0f0;
  /* 6-chars hex */
  color: #00ff00;
  /* rgba */
  color: rgb(255, 0, 0);
  /* rgba */
  color: rgba(255, 0, 0, 0.5);
  /* transparent */
  color: transparent;
  /* Basic color keywords */
  color: orange;
  /* Extended color keywords */
  color: darkgray;
}
```

### 注意

* 不支持 `hsl()`, `hsla()`, `currentColor`, 8个字符的十六进制颜色。

* `rgb(a,b,c)` 或 `rgba(a,b,c,d)` 的性能比其他颜色格式差很多，请选择合适的颜色格式。

颜色名称可查看 [颜色名称列表](./color-names.md).

## CSS `length` 单位

在 Weex 中，我们只支持 `px` 长度单位。并且它将在 JavaScript 运行时和本机渲染器中解析为数字类型。所以你也可以省略 `px` 单位后缀，直接写数字。

下面这些不同的写法，解析的结果完全相同。

```css
.classA { font-size: 48; line-height: 64; }
.classB { font-size: 48px; line-height: 64px; }
```

不支持类似 `em`，`rem`，`pt` 这样的 CSS 标准中的其他长度单位。

## CSS `number` 单位

仅仅一个数字。用于 [`opacity`](./common-style.md#其他基本样式)，[`lines`](./text-style.md)等。

有时值必须是整数，例如：`lines`。

**注意：**也可以将所有的 `px` `length` 值简化为一个数字。

## CSS `percentage` 单位 (暂不支持)

表示百分比值，如“50％”，“66.7％”等。

它是 CSS 标准的一部分，但 Weex 暂不支持。
