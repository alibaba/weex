---
title: 在浏览器中调试
type: guide
order: 4.2
version: 0.10
---

# 如何在浏览器中调试？

由于 weex-html5 可以在现代移动浏览器上运行，因此自然支持在浏览器的开发工具中调试 weex-html5 代码。下面将介绍如何使用浏览器的 devTools 调试和分析 weex-html5 程序。以chrome的调试工具为例：

![chrome's debug tool](https://gw.alicdn.com/mt/TB1V1hIMpXXXXaHXVXXXXXXXXXX-983-730.png)

## Elements

使用 Elements 面板来检查 weex-html5 页面的布局和设计，并操纵 DOM 和 CSS 来自由地做一些开发实验。

## Console

您可以使用 `console.log` 在控制台上记录信息。

## 断点

您可以设置断点来调试代码，断点是调试代码的最有效的方法之一。断点使您能够暂停脚本执行，然后查看该时刻的调用堆栈变量值。

手动断点是您在特定代码行上设置的各个断点。您可以通过 Chrome DevTools GUI 或在代码中插入 debugger 关键字来设置这些断点。

## 找出 bug 的精确位置

一般来说，有三个可能发生错误的地方：渲染器（weex-html5），js 框架（weex-js框架）和变压器（gulp-weex）。

这里有一些方便以找出错误建议，以便你可以快速识别哪个是哪个地方的错误：

* 请检查控制台是否有错误。在调试模式如果有一个错误出现，将会在 console 中打印有关于它的信息。
* 在 bridge/receiver.js，查看是否调用了 `callNative` 函数。
* 是否被认为是 API 的方法被执行。
* 是否调用用于事件触发或执行回调的 `callJS` 方法。

## 其他

更多关于如何调试 H5 页面的信息请查看 [chrome's devTools docs](https://developers.google.com/web/tools/chrome-devtools/?hl=en)






